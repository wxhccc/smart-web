import listPageMixin from '@/common/mixins/listPageMixin'
import { tbColumnsCreator, formItemsCreator, operationCreator, actionBtnsCreator } from './dataHandle'
import { mapGetters } from 'vuex'
import { getUserList, updateUser } from '@/api/access'
import GroupSettingPop from './components/GroupSettingPop'

export default {
  name: 'UserListPage',
  mixins: [listPageMixin()],
  components: {
    GroupSettingPop
  },
  data () {
    return this.initPageData({
      extraForm: {},
      groupSetting: {
        show: false,
        userInfo: {}
      }
    }, {
      rowKey: 'id',
      operation: operationCreator,
      actionBtns: actionBtnsCreator,
      addRouteName: 'UserAdd',
      detailRouteName: 'UserEdit',
      handledApis: {
        getPageList: getUserList,
        setRecordState: updateUser
      }
    })
  },
  computed: {
    ...mapGetters([
      'appConfig',
      'switchFilter'
    ]),
    tableColumns () {
      const formatters = { state: this.switchFilter('accountState') }
      return tbColumnsCreator(formatters)
    },
    formItems () {
      const stateOptions = Array.isArray(this.appConfig.accountState) ? this.appConfig.accountState : []
      return formItemsCreator(stateOptions)
    }
  },
  methods: {
    /** utils **/
    /** business **/
    stateParamsHandle (row) {
      return { state: 1 ^ row.state }
    },
    /** event **/
    groupSettingHandle (row) {
      Object.assign(this.groupSetting, { show: true, userInfo: row })
    },
    rowDataUpdate (row, params) {
      Object.assign(row, params)
    }
  }

}
