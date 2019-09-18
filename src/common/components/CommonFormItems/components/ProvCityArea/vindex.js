import { FormFieldItem } from '@wxhccc/ui-extend'
import { mergeObj } from '@/utils'
import { pick } from 'lodash'
export function distRules (required, message) {
  return (required ? [{ required: true, message, trigger: 'change' }] : [])
}

const distFields = (level, required) => {
  const fieldItem = (prop, message) => ({
    field: {
      component: 'ElSelect',
      data: []
    },
    prop
  })
  if (level === 'province') {
    return [fieldItem('province', '请选择省份')]
  } else if (level === 'city') {
    return [fieldItem('province', '请选择省份'), fieldItem('city', '请选择城市')]
  } else {
    return [fieldItem('province', '请选择省份'), fieldItem('city', '请选择城市'), fieldItem('area', '请选择地区')]
  }
}
/* 默认数据部分，可单独导出 */
export function fieldData (prop, required, config = {}, level = 'city') {
  return mergeObj({
    props: {
      label: '所在地区',
      class: 'form-item-' + level,
      rules: distRules(required, '请选择完整地区')
    },
    prop,
    children: distFields(level, required)
  }, config)
}
export default {
  name: 'FormItemProvCityArea',
  components: {
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    field: Object,
    value: null,
    required: Boolean,
    prop: String,
    level: {
      type: String,
      default: 'city'
    },
    sourceData: Object
  },
  data () {
    return {
      fieldItems: {},
      isCode: this.isValueCode(),
      formData: this.handleCode()
    }
  },
  mounted () {
    this.hanldeSourceData()
  },
  computed: {
    handleField () {
      this.fieldItems = fieldData(this.prop, this.required, this.config, this.level)
      const provField = this.fieldItems.children.find(item => (item.prop === 'province'))
      provField && (provField.field.events = { 'change': this.hanldeProvChange })
      const cityField = this.fieldItems.children.find(item => (item.prop === 'city'))
      cityField && (cityField.field.events = { 'change': this.hanldeCityChange })
      const areaField = this.fieldItems.children.find(item => (item.prop === 'area'))
      areaField && (cityField.field.events = { 'change': this.hanldeAreaChange })
      return this.fieldItems
    },
    cityFieldData () {
      const { city: cityData } = this.sourceData || {}
      const { province } = this.formData
      return cityData && cityData[province] ? cityData[province] : []
    },
    areaFieldData () {
      const { area: areaData } = this.sourceData || {}
      const { city } = this.formData
      return areaData && areaData[city] ? areaData[city] : []
    }
  },
  watch: {
    'value': 'valueChange',
    'sourceData': 'hanldeSourceData'
  },
  methods: {
    isValueCode () {
      return typeof this.value !== 'object'
    },
    handleCode () {
      const code = this.value
      if (!this.isValueCode()) {
        const pickKeys = { province: ['province'], city: ['province', 'city'], area: ['province', 'city', 'area'] }
        return pick(code, pickKeys[this.level] || [])
      }
      const codeStr = code ? String(code) : ''
      return {
        province: codeStr && codeStr.substr(0, 2) + '0000',
        city: codeStr && (codeStr.substr(2, 2) === '00' ? '' : codeStr.substr(0, 4) + '00'),
        area: codeStr && (codeStr.substr(4, 2) === '00' ? '' : codeStr)
      }
    },
    valueChange () {
      this.value && (this.formData = this.handleCode()) && this.hanldeSourceData()
    },
    hanldeSourceData () {
      const { province: provData } = this.sourceData || {}
      if (provData) {
        const provField = this.fieldItems.children.find(item => (item.prop === 'province'))
        provField && (provField.field.data = provData)
        this.setCityData()
        this.setAreaData()
      }
    },
    setCityData () {
      const cityField = this.fieldItems.children.find(item => (item.prop === 'city'))
      cityField && (cityField.field.data = this.cityFieldData)
    },
    emitValue (value) {
      this.isCode ? this.$emit('input', value) : this.$emit('input', Object.assign({}, this.value, this.formData))
    },
    hanldeProvChange (newVal) {
      const { level, formData } = this
      if (level === 'province' || !this.cityFieldData.length) {
        this.emitValue(formData.province)
      } else {
        Object.assign(formData, { city: '', ...(level === 'area' ? { area: '' } : {}) })
        this.emitValue('')
        this.setCityData()
      }
    },
    setAreaData () {
      const areaField = this.fieldItems.children.find(item => (item.prop === 'area'))
      areaField && (areaField.field.data = this.areaFieldData)
    },
    hanldeCityChange (newVal) {
      if (!newVal) return
      const { level, formData } = this
      if (level === 'city' || !this.areaFieldData.length) {
        this.emitValue(formData.city)
      } else {
        Object.assign(formData, { area: '' })
        this.emitValue('')
        this.setAreaData()
      }
    },
    hanldeAreaChange (newVal) {
      if (!newVal) return
      const { formData } = this
      this.emitValue(formData.area)
    }

  }
}
