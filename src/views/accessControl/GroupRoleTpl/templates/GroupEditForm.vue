<template>
  <ue-drawer
    class="group-edit-form-slide"
    :visible.sync="handledVisible"
    :title="isEdit ? '修改用户组' : `新增${hasParent ? '子' : '' }用户组`" 
    body-size="500px"
    :container="false"
  >
    <simple-form
      ref="sform"
      class="group-edit-form"
      :api="activeApi"
      v-model="formData"
      :primary-key="formData.id"
      :params-filter="paramsFilter"
      :field-items="fieldItems"
      :success-skip="() => closePop(true)"
      :cancel-skip="closePop"
    >
    </simple-form>
  </ue-drawer>
</template>
<script>
import { Drawer } from '@wxhccc/ui-extend'
import SimpleForm from '@/common/templates/SimpleForm'
import { createInputFormItem, createFfiRulesProps, createFormFieldItem } from '@/common'
import { addUserGroup, updateUserGroup } from '@/api/access'

const formItemsCreator = (isEdit, hasParent) => [
  ...(hasParent ? [createInputFormItem('父用户组名称', 'pname', {}, { text: true })] : []),
  createInputFormItem(createFfiRulesProps('用户组名称', true), 'name', { placeholder: '请输入用户组名称', maxlength: 20 })
]

export default {
  name: 'GroupEditFormPop',
  mixins: [],
  components: {
    [Drawer.name]: Drawer,
    SimpleForm
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
      sending: false,
      formData: {}
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
    hasParent () {
      return Boolean(this.data.pid)
    },
    activeApi () {
      return this.isEdit ? updateUserGroup : addUserGroup
    },
    fieldItems () {
      return formItemsCreator.call(this, this.isEdit, this.hasParent)
    }
  },
  watch: {
    visible (newVal) {
      const { data, hasParent } = this
      this.formData = newVal ? Object.assign(hasParent ? { pname: data.Parent.name } : {}, this.$_.pick(data, ['id', 'name', 'pname', 'pid'])) : {}
      !newVal && this.$refs.sform.$refs.form.clearValidate()
    }
  },
  methods: {
    /** events **/
    paramsFilter (params) {
      return params
    },
    /** events **/
    closePop (success) {
      this.handledVisible = false
      success && this.$emit('on-send-success')
    }
  }
}
</script>
<style lang="scss" scoped>
.group-edit-form-slide {
  .group-edit-form {
    padding: 20px;
  }
}
</style>
