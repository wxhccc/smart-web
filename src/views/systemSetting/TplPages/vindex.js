import listPageMixin from '@/common/mixins/listPageMixin'
import { tbColumnsCreator, formItemsCreator, actionBtnsCreator } from './dataHandle'
import { mapGetters } from 'vuex'
import { getTplPageList } from '@/api/system'

export default {
  name: 'TplPages',
  mixins: [listPageMixin()],
  data () {
    return this.initPageData({
      extraForm: {},
      groupSetting: {
        show: false,
        userInfo: {}
      }
    }, {
      actionBtns: actionBtnsCreator(),
      detailRouteName: 'TplPageSetting',
      handledApis: {
        getPageList: getTplPageList
      }
    })
  },
  computed: {
    ...mapGetters([
      'appConfig',
      'switchFilter'
    ]),
    tableColumns () {
      const formatters = { state: this.switchFilter('accountState'), tplName: this.switchFilter('tplPages') }
      return tbColumnsCreator(formatters)
    },
    formItems () {
      const tplOtptions = Array.isArray(this.appConfig.tplPages) ? this.appConfig.tplPages : []
      return formItemsCreator(tplOtptions)
    }
  },
  methods: {
    /** utils **/
    /** business **/
    /** event **/
  }

}
