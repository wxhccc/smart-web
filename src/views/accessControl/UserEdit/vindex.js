import editPageMixin from '@/common/mixins/editPageMixin'
// import { addUser, editUser } from '@/api/rightMana'
import { getUserInfo, addUser, updateUser, getAcessRoleOptions } from '@/api/access'
import { md5 } from '@/utils' // 用于md5
import { getFormFields } from './dataHandle'

export default {
  components: {
  },
  mixins: [editPageMixin()],
  data () {
    return this.$_mixin_initData({
      sending: false,
      userInfo: {},
      formData: {
      }
    }, {
      isRoles: false,
      infoAlias: 'userInfo',
      listRouteName: 'UserList',
      triggerAfterMessage: true,
      roleOptions: [],
      handledApis: {
        getDetailInfo: getUserInfo,
        addDetailInfo: addUser,
        updateDetailInfo: updateUser
      }
    })
  },
  computed: {
    id () {
      return this.isEdit ? Number(this.$route.params.id) : 0
    },
    pageTitle () {
      return { backRoute: 'UserList', title: this.isEdit ? this.userInfo.account : '新增用户' }
    },
    isEdit () {
      return this.$route.name !== 'UserAdd'
    },
    formConfig () {
      return { roleOptions: this.roleOptions, ...this.$store.getters.appConfig }
    },
    fieldItems () {
      return getFormFields(this.isEdit, this.formConfig, this.formData)
    }
  },
  created () {
    this.getRoleOptions()
  },
  methods: {
    /** utils **/
    resetPageState () {
      this.isEdit && this.getDetailInfo()
    },
    /** business **/
    getRoleOptions () {
      this.$fetch(getAcessRoleOptions).lock('sending').done(data => {
        this.isRoles = true
        this.roleOptions = Array.isArray(data) ? data : []
      })
    },
    formDataHandle (data, isSend) {
      if (isSend) {
        // 如果获取角色选项列表失败，则提交时不提交roleId
        if (!this.isRoles) {
          delete data.roleIds
        }
        return this.isEdit ? [this.id, data] : [Object.assign(data, { password: md5(data.password), confirmPwd: md5(data.confirmPwd) })]
      } else {
        return this.$_.pick(data, ['account', 'nick', 'dataStrategy', 'roleIds'])
      }
    },
    /** events **/
    onSendSuccess (data) {
      data && this.returnToList()
    }
  }
}
