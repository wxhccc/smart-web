<template>
  <div class="login-page">
    <starry-sky class="stars-bg"></starry-sky>
    <div class="login-form-pane">
      <el-form class="card-box login-form" size="small" ref="loginForm" autoComplete="on" :model="loginForm">
        <ue-form-fields
          :items="fieldItems"
          v-model="loginForm"
        >
        </ue-form-fields>
        <el-checkbox v-model="isRemember" class="remember-checkbox">记住密码</el-checkbox>
        <el-button class="submit-btn" type="primary" :loading="sending" @click.native.prevent="adminLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import StarrySky from '@/common/templates/StarrySky'
import { createInputFormItem } from '@/common'
import { md5 } from '@/utils' // 用于md5
import { FormFields } from '@wxhccc/ui-extend'
import { login } from '@/api/auth'

const requiredRule = (msg) => ([{ required: true, message: msg + '不能为空' }])
const fieldItems = [
  createInputFormItem({ rules: requiredRule('账号') }, 'account', { prefixIcon: 'sw-icon-user', placeholder: '账号', maxLength: 11, autoComplete: 'on' }),
  createInputFormItem({ rules: requiredRule('密码') }, 'password', { prefixIcon: 'sw-icon-lock', placeholder: '密码', type: 'password', autoComplete: 'on' })
]

export default {
  name: 'Login',
  components: {
    StarrySky,
    [FormFields.name]: FormFields
  },
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      fieldItems,
      sending: false,
      isRemember: false
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    /** business **/
    loginSend () {
      const { account, password } = this.loginForm
      const params = { account, password: md5(password) }
      this.$fetch(login, params).lock('sending').done(data => {
        if (data && data.token) {
          this.$store.commit('LOGIN_IN', data.token)
          this.$store.commit('SET_USER_INFO', data )
          this.$router.push({ name: 'AdminIndex' })
          // location.reload()
        }
      })
    },
    /** events **/
    adminLogin () {
      this.$refs.loginForm.validate(res => {
        res && this.loginSend()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: $dark-black;
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .login-form-pane {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    margin-top: -180px;
    margin-left: -180px;
    border: 2px solid $theme-color;
    box-shadow: 0 0 8px 4px transparentize($theme-color, 0.6);
    z-index: 2000;
  }
  .img-title {
    height: 140px;
  }
  .login-form {
    width: 60%;
    margin: 80px auto 0;
  }
  /deep/ .comp-form-item-fields {
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #ffffff;
    }
    .el-form-item {
      margin-bottom: 24px;
      .el-form-item__error {
        padding-top: 5px;
      }
    }
    .el-input {
      .el-input__inner {
        background: transparent;
        -webkit-appearance: none;
        padding-left: 40px;
        color: #ffffff;
      }
      .el-input__prefix {
        line-height: 32px;
        left: 12px;
        .el-input__icon {
          font-size: 16px;
        }
      }
    }
  }
  .remember-checkbox {
    margin-bottom: 20px;
    margin-left: 5px;
  }
  .submit-btn {
    width: 100%;
    margin-bottom: 30px;
  }

}
</style>
