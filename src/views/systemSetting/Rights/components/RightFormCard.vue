<template>
  <el-card
    class="swcomp-right-form-card"
  >
    <el-form ref="form" :model="formData" v-bind="formProps" :data-flat="dataChangeFlag">
      <el-form-item v-if="!isEdit" label="父级名称">{{parentName}}</el-form-item>
      <ue-form-fields
        :items="fieldItems"
        v-model="formData"
      >
        <el-form-item class="form-btns-pane line-form-item" label=" ">
          <ue-form-btns
            is-edit
            :parent-refs="$refs"
            is-validate
            :texts="{ sureBtn: '确定' }"
            :cancel="cancelHandler"
            :submit="submitHandler"
          >
          </ue-form-btns>
        </el-form-item>
      </ue-form-fields>
    </el-form>
  </el-card>
</template>

<script>
import { FormFields, FormBtns } from '@wxhccc/ui-extend'
import TplField from './TplField'
import { commonFormProps } from '@/common'
import { createFfiRulesProps, createInputFormItem, createRadiosFormItem, createSelectFormItem, createFormFieldItem } from '@/common'
import { regexRuleCreator } from '@/utils/validate'
import { tree2array } from '@wxhccc/es-util'
import { omit } from 'lodash'

const keyRule = regexRuleCreator('alpha', 'KEY只能是由纯字母组成')
const arrStrRule = regexRuleCreator('alphaArrStr', 'API路由名格式有误')

const createFieldItems = (lockType, lockState, indexField) => {
  const typeFieldOpts = { childComponent: 'ElRadioButton', props: { class: 'right-type-field', disabled: lockType } }
  const stateFieldOpts = { props: { disabled: lockState } }
  return [
    createRadiosFormItem('类型', 'isMenu', [{ label: '菜单', value: true }, { label: '权限点', value: false }], typeFieldOpts),
    ...(!lockState ? [createFormFieldItem(TplField, '模版页', 'template')] : []),
    createInputFormItem(createFfiRulesProps('名称', true), 'name', '用于展示菜单/权限点名称的文字'),
    createInputFormItem(createFfiRulesProps('KEY', true, [keyRule]), 'key', '菜单路由名/权限点关键字'),
    ...(indexField ? [indexField] : []),
    ...(!lockState ? [createInputFormItem('图标', 'icon', { placeholder: '菜单图标', maxlength: 40, disabled: lockState })] : []),
    createInputFormItem(createFfiRulesProps('绑定APIS', false, [arrStrRule]), 'routes', 'API路由名, 多个用英文逗号(,)分隔'),
    createRadiosFormItem('状态', 'state', [{ label: '可用', value: 1 }, { label: '禁用', value: 0 }], stateFieldOpts)
  ]
}
export default {
  name: 'RightFormCard',
  components: {
    [FormFields.name]: FormFields,
    [FormBtns.name]: FormBtns
  },
  props: {
    isEdit: Boolean,
    data: Object,
    node: Object
  },
  data () {
    return {
      formData: {},
      formProps: commonFormProps(false, { labelWidth: '100px' }),
    }
  },
  computed: {
    dataChangeFlag () {
      const { data, node, isEdit } = this
      this.initFormData()
      this.$refs.form && this.$refs.form.clearValidate()
    },
    hasChildren () {
      return Boolean(this.data && this.data.children && this.data.children.length)
    },
    isChildPoint () {
      return this.hasChildren && !this.data.children[0].isMenu
    },
    hasBrother () {
      const { node } = this
      return node && node.parent && node.parent.childNodes.length > 1
    },
    parentName () {
      return (this.data && this.data.name) || '无'
    },
    lockType () {
      const { hasChildren, data, isEdit, hasBrother } = this
      return hasChildren || (isEdit ? (!data.pid || hasBrother) : !data)
    },
    lockState () {
      return this.formData && !this.formData.isMenu
    },
    indexField () {
      if (!this.isEdit || !this.hasChildren || this.lockState) return false
      const children = tree2array(this.data.children)
      let menuChildren = []
      children.forEach(child => {
        child.isMenu && menuChildren.push({ value: child.key, label: child.name })
      })
      return createSelectFormItem({ label: '重定向KEY', prop: 'index', data: menuChildren, allDef: false, placeholder: '请选择子孙菜单' })
    },
    fieldItems () {
      return createFieldItems(this.lockType, this.lockState, this.indexField)
    }
  },
  created () {
    this.initFormData()
  },
  methods: {
    /** utils **/
    /** business **/
    initFormData () {
      if (this.isEdit) {
        this.formData = omit(this.data, 'children')
      } else {
        const curTime = Math.floor(+ new Date() / 1000)
        const { data } = this
        const isMenu = !this.isChildPoint
        this.formData = { id: `${(+new Date() + Math.random()).toFixed(2)}`, pid: data ? data.id : 0, isMenu, state: 1, children: [], orderValue: curTime }
      }
    },
    /** events **/
    submitHandler () {
      this.$emit('on-save', this.data, this.formData, this.isEdit)
      this.cancelHandler()
    },
    cancelHandler () {
      this.$emit('on-close')
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-right-form-card {
  .comp-form-item-fields::v-deep {
    margin-top: 10px;
    padding-right: 10px;
    .form-btns-pane {
      margin-bottom: 0;
    }
    .right-type-field .el-radio-button__inner {
      width: 100px;
    }
  }
}
</style>
