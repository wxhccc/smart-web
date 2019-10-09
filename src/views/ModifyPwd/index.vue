<template>
  <detail-page-pane class="pwd-modify-page" title="修改密码">
    <el-form class="card-box pwd-form" ref="form" v-bind="formProps" :model="formData">
      <ue-form-fields
        :items="fieldItems"
        v-model="formData"
      >
      </ue-form-fields>
      <el-form-item>
        <el-button class="submit-btn" type="primary" :loading="sending" @click.native.prevent="pwdModifySubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </detail-page-pane>
</template>

<script>
import editPageMixin from '@/common/mixins/editPageMixin'
import { createInputFormItem, commonFormProps, createFfiRulesProps } from '@/common'
import { md5 } from '@/utils' // 用于md5
import { regexRuleCreator } from '@/utils/validate'
import { passwordsData } from '@/common/components/CommonFormItems'
import { modifyPwd } from '@/api/user'

const pwdFormatRule = {
  props: {
    rules: [regexRuleCreator('password', '密码格式有误，密码需要包含大写字母，小写字母和数字，长度为8-20位')]
  }
}

const fieldItems = (formData) => ([
  createInputFormItem(createFfiRulesProps('原密码', true), 'oldPwd', { placeholder: '请输入原密码',
    type: 'password' })
].concat(passwordsData({}, true, formData, { password: pwdFormatRule, confirmPwd: pwdFormatRule })))

export default {
  name: 'ModifyPwd',
  mixins: [editPageMixin()],
  data () {
    return {
      formProps: commonFormProps(),
      formData: {
        oldpwd: '',
        password: '',
        confirmPwd: ''
      },
      sending: false,
      isRemember: false
    }
  },
  computed: {
    fieldItems () {
      return fieldItems(this.formData)
    }
  },
  created () {
  },
  methods: {
    /** business **/
    pwdModifySend () {
      const { oldPwd, password } = this.formData
      const params = { oldPwd: md5(oldPwd), password: md5(password) }
      this.$fetch(modifyPwd, params).lock('sending').done(data => {
        this.$swMessage(true, '修改成功，需重新登录', () => {
          this.$store.commit('LOGIN_OUT')
        })
      })
    },
    /** events **/
    pwdModifySubmit () {
      this.$refs.form.validate(res => {
        res && this.pwdModifySend()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pwd-modify-page {
  .pwd-form {
    margin-left: 20px;
    padding-top: 12px;
    width: 480px;
  }
  .submit-btn {
    width: 100%;
    margin-bottom: 30px;
  }

}
</style>
