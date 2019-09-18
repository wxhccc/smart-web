import listPageMixin from '@/common/mixins/listPageMixin'
import { MultiAlert } from '@wxhccc/ui-extend'
import { mapGetters } from 'vuex'
import routesData from './routesData'
import { omit } from 'lodash'

export default {
  name: 'GroupRoleTpl',
  mixins: [listPageMixin(true)],
  components: {
    [MultiAlert.name]: MultiAlert
  },
  data () {
    return this.initPageData({
      slideDialog: {
        show: false,
        data: {}
      }
    }, {

    })
  },
  computed: {
    ...mapGetters([
      'appConfig',
      'switchFilter'
    ]),
    alertInfos () {
      return this.RMD.alertInfos
    }
  },
  created () {
    // this.getRolesOptions()
  },
  methods: {
    /** utils **/
    initRMD () {
      return this.handleRouteMoudleData(routesData[this.$route.name])
    },
    resetPageState () {

    },
    getSingleRow (row) {
      return omit(row, ['children', 'Parent'])
    },
    refreshPageList () {
      this.refresh = true
    },
    /** business **/
    // 删除记录状态
    deleteRecord (row, scope, curBtn) {
      const { rowKey, handledApis: { deleteRecord } } = this
      if (!deleteRecord) return
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      this.$set(row, loadingKey, true)
      this.$fetch(deleteRecord, row[rowKey]).lock('sending').done(data => {
        this.$message({ message: '删除成功', type: 'success' })
        this.refresh = true
      }).finally(e => { row[loadingKey] = false })
    },
    /** event **/
    createNewRecord (row) {
      const data = row.id ? { pid: row.id, pname: row.name, Parent: this.getSingleRow(row) } : {}
      Object.assign(this.slideDialog, { show: true, data })
    },
    editRecord (row) {
      Object.assign(this.slideDialog, { show: true, data: row })
    }
  }

}
