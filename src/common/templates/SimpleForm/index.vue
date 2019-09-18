<template>
  <el-form class="swtpl-simple-form" ref="form" :model="value" v-bind="formProps">
    <ue-form-fields
      :items="fieldItems"
      :value="value"
      @input="$listeners.input"
    >
      <el-form-item class="form-btns-pane line-form-item" label=" ">
        <ue-form-btns
          :is-edit="true"
          :parent-refs="$refs"
          ref-key="form"
          submit-confirm
          :cancel="cancelHandler"
          :submit="submitHandler"
          :sending="sending"
        >
        </ue-form-btns>
      </el-form-item>
    </ue-form-fields>
  </el-form>
</template>
<script>

import { FormFields, FormBtns } from '@wxhccc/ui-extend'
import { commonFormProps } from '@/common'

export default {
  components: {
    [FormFields.name]: FormFields,
    [FormBtns.name]: FormBtns
  },
  props: {
    api: Function,
    inline: Boolean,
    props: Object,
    paramsFilter: Function,
    successSkip: [String, Function],
    immediateSkip: {
      type: Boolean,
      default: true
    },
    cancelSkip: [String, Function],
    primaryKey: [String, Number],
    value: Object,
    fieldItems: Array
  },
  data () {
    return {
      formProps: Object.assign(commonFormProps(this.inline, { labelWidth: '100px' }), this.props),
      sending: false
    }
  },
  methods: {
    /* event */
    submitHandler () {
      const { api, paramsFilter } = this
      if (!api) return
      let formData = this.$_.cloneDeep(this.value)
      typeof paramsFilter === 'function' && (formData = paramsFilter(formData))
      const params = (this.primaryKey ? [this.primaryKey] : []).concat([formData])
      this.$fetch(api, ...params).lock('sending').done(data => {
        this.$swMessage(data, data ? '提交成功' : '提交失败', !this.immediateSkip && this.submitSuccessSkip)
        this.immediateSkip && this.submitSuccessSkip()
        this.$emit('on-success', data)
      })
    },
    submitSuccessSkip () {
      this.skipHandle(this.successSkip)
    },
    skipHandle (fnOrRouteName) {
      fnOrRouteName && (typeof fnOrRouteName === 'function' ? fnOrRouteName() : this.$router.push({ name: fnOrRouteName }))
    },
    cancelHandler () {
      this.skipHandle(this.cancelSkip)
    }
  }
}
</script>
<style lang="scss" scoped>
.swtpl-simple-form {
  .form-btns-pane {
    width: 100%;
  }
}
</style>
