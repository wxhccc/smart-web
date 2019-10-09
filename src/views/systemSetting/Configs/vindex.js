import { FormFields, SearchInput, Drawer, FormBtns } from '@wxhccc/ui-extend'
import { commonFormProps } from '@/common'
import { getSystemConfigs, updateSystemConfigs } from '@/api/system'
import { isEqual, merge } from 'lodash'
import { mapToObject } from '@wxhccc/es-util'
import DictConfigItem from './components/DictConfigItem'
import { baseModuleFieldItems, dictItemFieldItems } from './dataHandle'

export default {
  name: 'ConfigsMana',
  components: {
    [Drawer.name]: Drawer,
    [FormFields.name]: FormFields,
    [SearchInput.name]: SearchInput,
    [FormBtns.name]: FormBtns,
    DictConfigItem
  },
  data () {
    return {
      actTab: 'base',
      formProps: commonFormProps(),
      dictFormProps: commonFormProps(true),
      colProps: { md: 12, lg: 9 },
      originData: {},
      dictEditForm: {
        visible: false,
        data: {}
      },
      formData: {
        base: {},
        dict: []
      },
      dictKey: '',
      sending: false,
      loading: false
    }
  },
  computed: {
    baseModuleFieldItems () {
      return baseModuleFieldItems(this.formData.base.defaultAvatar, this.updateDefaultAvatar)
    },
    dictModuleFieldItems () {
      return dictItemFieldItems(this.isDictItemEdit, Boolean(this.dictEditForm.data.valueType), this.$store.getters.appConfig)
    },
    showDictConfigs () {
      const { dictKey, formData: { dict } } = this
      return dictKey ? dict.filter(item => (item.key.indexOf(dictKey) >= 0 || item.describe.indexOf(dictKey) >= 0)) : dict
    },
    isDictItemEdit () {
      return Boolean(this.dictEditForm.data.id)
    }
  },
  created () {
    this.getSystemConfigs()
  },
  methods: {
    /** utils **/
    /** business **/
    // 获取系统配置数据
    getSystemConfigs () {
      this.$fetch(getSystemConfigs).lock('loading').done(data => {
        this.saveOrginData(data)
        this.formData = data
      })
    },
    // 更新系统配置数据
    updateSystemConfigs (params) {
      this.$fetch(updateSystemConfigs, params).lock('sending').done(data => {
        this.$swMessage(true, '保存成功')
        this.getSystemConfigs()
      })
    },
    // 缓存接口返回的原始信息
    saveOrginData (data) {
      let backData = this.$_.cloneDeep(data)
      backData.dict = mapToObject(backData.dict, 'id', item => item)
      this.originData = backData
    },
    // 获取发生变化的数据
    getModifyData () {
      let data = this.$_.cloneDeep(this.formData)
      let { base, dict } = data
      const { base: baseBk, dict: dictBk } = this.originData
      Object.keys(base).forEach(key => {
        if (isEqual(base[key], baseBk[key])) {
          delete base[key]
        }
      })
      data.dict = dict.filter(item => {
        return !(item.isDelete && !item.id) && !(item.id && isEqual(item, dictBk[item.id]))
      })
      return data
    },
    /** events **/
    updateDefaultAvatar (result) {
      this.formData.defaultAvatar = result && result.imgUrl
    },
    formDataSubmit () {
      const params = this.getModifyData()
      Object.keys(params).length ? this.updateSystemConfigs(params) : this.$message('数据未发生变化，无需提交')
    },
    editDictItem (item) {
      Object.assign(this.dictEditForm, { visible: true, data: item ? this.$_.cloneDeep(item) : { valueType: 0, state: 1 }, item })
    },
    dictItemSave () {
      const { item, data } = this.dictEditForm
      item ? this.dictItemUpdate(item, data) : this.formData.dict.push(data)
      this.closeDictItem()
    },
    closeDictItem () {
      Object.assign(this.dictEditForm, { visible: false, data: {} })
    },
    dictItemUpdate (item, newItem) {
      merge(item, newItem)
    },
    dictItemDelete (item, isDelete) {
      isDelete ? this.$set(item, 'isDelete', true) : this.$delete(item, 'isDelete')
    }
  }
}
