import { Drawer, FormFields, FormBtns, TreeField } from '@wxhccc/ui-extend'
import { addRole, updateRole, getAccessRights } from '@/api/access'
import { roleNamesCreator, rightsRule, formProps } from './dataHandle'
import { pickBy, isEqual } from 'lodash'
import { array2tree } from '@wxhccc/es-util'

export default {
  name: 'RoleRightsSetting',
  mixins: [],
  components: {
    [Drawer.name]: Drawer,
    [FormFields.name]: FormFields,
    [FormBtns.name]: FormBtns,
    [TreeField.name]: TreeField
  },
  props: {
    visible: Boolean,
    RSD: Object,
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      accessRights: [],
      treeFieldProps: {
        inline: true,
        props: { label: 'name' }
      },
      loading: false,
      sending: false,
      formData: this.getInitFormData(),
      formProps,
      rightsRule,
      roleDetailInfo: {}
    }
  },
  computed: {
    handledVisible: {
      get () { return this.visible },
      set (val) { this.$emit('update:visible', val) }
    },
    isEdit () {
      return Boolean(this.data.id)
    },
    roleId () {
      return Number(this.data.id)
    },
    hasParent () {
      return Boolean(this.data.pid)
    },
    activeApi () {
      return this.isEdit ? updateRole : addRole
    },
    nameFieldItems () {
      return roleNamesCreator.call(this, this.isEdit, this.hasParent)
    },
    limitAccessRights () {
      const { rightIds: ids } = this.data.Parent || {}
      const limitRights = Array.isArray(ids) ? this.accessRights.filter(item => ids.includes(item.id)) : this.accessRights
      return array2tree(limitRights)
    }
  },
  created () {
    this.getAccessRights()
  },
  watch: {
    visible (newVal) {
      const { data } = this
      this.formData = newVal
        ? Object.assign(data.Parent ? { pname: data.Parent.name } : {}, this.$_.pick(data, ['pid', 'pname', 'id', 'name', 'rightIds']))
        : this.getInitFormData()
      newVal && setTimeout(() => this.$refs.form.clearValidate(), 200)
    }
  },
  methods: {
    /** utils **/
    getInitFormData () {
      return { name: '', rightIds: [] }
    },
    /** business **/
    paramsFilter (params) {
      return params
    },
    filterRights (originList, accessIds) {
      if (originList.length && accessIds.length) {
        const getAccessItem = (list) => {
          let arr = []
          list.forEach(item => {
            if (accessIds.includes(item.id)) {
              let newItem = pickBy(item, (value, key) => key !== 'children')
              item.children && item.children.length && (newItem.children = getAccessItem(item.children))
              arr.push(newItem)
            }
          })
          return arr
        }
        return getAccessItem(originList)
      }
    },
    getAccessRights () {
      this.$fetch(getAccessRights).lock('loading').done(data => {
        this.accessRights = Array.isArray(data) ? data : []
      })
    },
    formDataSend (api, params) {
      this.$fetch(api, ...params).lock('sending').done(data => {
        this.$swMessage(data, (data ? '提交成功' : '提交失败，请稍后再试'))
        data && this.closePop(true)
      })
    },
    handleFormData () {
      const { formData } = this
      let sendAttrs = ['pid', 'id', 'name']
      !isEqual(formData.rightIds, this.data.rightIds) && sendAttrs.push('rightIds')
      return this.$_.pick(formData, sendAttrs)
    },
    /** event **/
    formDataSubmit () {
      const { roleId, isEdit, activeApi } = this
      const params = isEdit ? [roleId, this.handleFormData()] : [this.handleFormData()]
      this.formDataSend(activeApi, params)
    },
    closePop (sendRefresh) {
      this.handledVisible = false
      sendRefresh === true && this.$emit('on-send-success')
    }
  }

}
