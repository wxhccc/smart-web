import { CommonListPage } from '@wxhccc/ui-extend'
import commonMixin from './commonMixin'
import { Storage } from '@/utils'

const listPageStore = Storage.namespace('listPageStore')

const RMDmixin = () => ({
  computed: {
    // 是否需要动态获取搜索条件项使用数据
    needGetParams () {
      return this.RMD.needGetParams
    },
    // 列表记录修改状态时的参数处理函数
    stateParamsHandle () {
      return this.RMD.stateParamsHandle
    },
    // 处理后的表单组件props
    formProps () {
      return this.RMD.formProps
    },
    // 列表row的主键key
    rowKey () {
      return this.RMD.rowKey || 'id'
    }
  },
  methods: {
  }
})

export default function (useRMD) {
  let mixins = [commonMixin(useRMD)]
  useRMD && mixins.push(RMDmixin())
  return {
    components: {
      [CommonListPage.name]: CommonListPage
    },
    mixins,
    computed: {
      /** utils **/
      // 导出按钮地址
      exportUrl () {
        const { RouteRights, RMD: { filterExportParams, exportRightCheck }, handledApis: { exportPageList }, currentTab } = this
        const api = typeof exportPageList === 'function' ? exportPageList : (exportPageList && typeof exportPageList[currentTab] === 'function' ? exportPageList[currentTab] : null)
        return (!exportRightCheck || RouteRights.includes('export')) && api && filterExportParams ? exportPageList(filterExportParams.call(this, this.searchParams)) : ''
      },
      // 表格组件的配置数据
      tableProps () {
        return this.RMD.table
      },
      // 处理过后的搜索条件数组
      handledFormItems () {
        this.originFormItems = this.RMD.formItems
        return this.originFormItems
      },
      // 当前表格表头数据
      curTableColumns () {
        const { tableColumns } = this.RMD
        if (Array.isArray(tableColumns)) {
          return tableColumns
        } else if (typeof tableColumns === 'object') {
          const { currentTab } = this
          return Array.isArray(tableColumns[currentTab]) ? tableColumns[currentTab] : []
        }
        return []
      },
      // 处理过后的表头项数组
      handledColumns () {
        const { curTableColumns } = this
        let actionColumn = curTableColumns.find(item => (item.action))
        actionColumn && (actionColumn.action = this.curActionBtns)
        return curTableColumns
      },
      // 页面使用按钮集合
      handledActionBtns () {
        const { actionBtns } = this.RMD
        let btns = actionBtns
        typeof btns === 'function' ? (btns = actionBtns.call(this)) : this.actionBtnClickHandle(actionBtns)
        return (typeof btns === 'object' || Array.isArray(btns)) ? btns : []
      },
      // 当前列表使用按钮集合
      curActionBtns () {
        const { currentTab, handledActionBtns } = this
        return Array.isArray(handledActionBtns) ? handledActionBtns : (handledActionBtns && handledActionBtns[currentTab] ? handledActionBtns[currentTab] : [])
      },
      // 搜索条件模块对象
      handledSearchForms () {
        const { searchForms, getTabsSearchForms } = this.RMD
        if (searchForms) {
          return typeof searchForms === 'function' ? searchForms.call(this) : searchForms
        }
        const searchForm = {
          items: this.handledFormItems,
          model: this.formData,
          dynaData: this.itemsParams
        }
        return (typeof getTabsSearchForms === 'function') ? getTabsSearchForms.call(this, searchForm) : searchForm
      },
      // 操作按钮行数据
      handledOperation () {
        const { operation } = this.RMD
        const { currentTab } = this
        if (typeof operation === 'function') {
          return operation.call(this, currentTab)
        } else if (Array.isArray(operation.items) && operation.items.length) {
          operation.items = operation.items.filter(item => {
            const isHide = typeof item.isHide === 'function' ? item.isHide.call(this) : item.isHide
            if (isHide) return false
            item.events && Object.keys(item.events).forEach(eventName => {
              const eventFn = item.events[eventName]
              item.events[eventName] = typeof eventFn === 'string' ? (typeof this[eventFn] === 'function' ? this[eventFn] : () => {}) : item.events[eventName].bind(this)
            })
            typeof item.props === 'function' && (item.props = item.props.call(this))
            return true
          })
          operation.items.length && this.RSD.OPELOCKS && (operation.lockKeys = this.RSD.OPELOCKS)
        }
        return operation
      }
    },
    methods: {
      /** utils **/
      initPageData (constData, dynamicData) {
        return this.$_mixin_initData({
          data: {}, //  数据
          loading: false, // 数据加载标记
          refresh: false, // 刷新列表
          originFormItems: [], // 表单搜索项的原始数据
          itemsParams: {}, // 表单搜索项的数据。
          formData: {}, // 表单域绑定数据
          searchParams: {}, // 存储表单搜索条件数据，处理过后的
          searching: false, // 搜索标记
          sending: false, // 操作按钮请求发送标记
          selectionKeys: [], // 选择栏选中项
          ...constData
        }, {
          currentTab: '', // 当前tab值
          RSD: {}, // 页面独有数据
          RMD: {},
          fetchAccessKey: '',
          ...dynamicData
        })
      },
      // 存储当前路由页面数据
      storePageData () {
        const { $route: { name }, RMD: { storePageData } } = this
        typeof storePageData === 'function' && listPageStore.session(name, storePageData())
      },
      // 获取当前路由页面存储数据
      getPageStoreData () {
        const { name } = this.$route
        return listPageStore.session(name)
      },
      // 存储当前路由页面数据
      refreshPageList () {
        this.refresh = true
      },
      // 回复或清除当前页面缓存数据
      restorePageCacheData () {
        const { $route: { name } } = this
        const { restorePageData } = this.RMD
        const storeData = listPageStore.session(name)
        this.$store.getters.remember ? (typeof restorePageData === 'function' && restorePageData.call(this, storeData)) : listPageStore.session.remove(name)
      },
      // 按钮函数转换
      actionBtnClickHandle (btns) {
        const bindThis = item => {
          const type = typeof item.click
          if (type === 'function') {
            item.click = item.click.bind(this)
          } else if (type === 'string') {
            item.click = this[item.click] || this.doNothing
          }
          return item
        }
        if (Array.isArray(btns)) {
          btns.forEach(bindThis)
        } else if (typeof btns === 'object') {
          Object.values(btns).forEach(tabBtns => tabBtns.forEach(bindThis))
        }
      },
      // 获取路由参数
      initRouteState () {
        this.RMD = this.initRMD()
        this.RSD = this.initRSD()
        this.needGetParams && this.getSearchParams()
        // 当前路由使用数据 routeModuleData
        this.restorePageCacheData()
        this.resetPageState()
      },
      /** business **/
      initRSD () {
        const RSD = this.RMD.RSD || {}
        return Object.assign({
          extraForm: {}, // 传给组件的额外的搜索条件,
          table: {} // 控制表格组件配置属性
        }, RSD)
      },
      // 获取搜素表单项数据
      getSearchParams () {
        const { getSearchParams } = this.handledApis
        const { searchParams, SPpropKeyRename, paramsDataHandler } = this.RMD
        const params = typeof searchParams === 'function' ? searchParams.call(this) : searchParams
        getSearchParams && params && this.$fetch(getSearchParams, params).done(data => {
          typeof paramsDataHandler === 'function' && (data = paramsDataHandler.call(this, data))
          if (Object.keys(data).length) {
            this.handleFormParams(SPpropKeyRename ? SPpropKeyRename(data) : data)
            this.itemsParams = data
          }
        })
      },
      // 处理getSearchParams获取到的数据，提供给searchform使用
      handleFormParams (params) {
        const { formParamsFilter } = this.RMD
        const isFn = typeof formParamsFilter === 'function'
        this.originFormItems && this.originFormItems.forEach(item => {
          let { prop, field: { data } } = item
          if (prop && params[prop] && data) {
            let dataList = params[prop]
            if (Array.isArray(dataList)) {
              dataList = isFn ? formParamsFilter(dataList) : dataList
              data.splice(1, data.length, ...dataList)
            } else if (typeof dataList === 'object') {
              for (let i in dataList) {
                Array.isArray(dataList[i]) && (dataList[i] = isFn ? formParamsFilter(dataList[i]) : dataList[i])
              }
              item.cascader ? (item.cascader = dataList) : this.$set(item, 'cascader', dataList)
            }
          }
        })
      },
      // 获取列表数据，使用getListParamsHandle可处理请求参数，使用pageListFilter可处理返回数据
      getPageListData (params, fetchAccessKey) {
        const { handledApis: { getPageList }, RMD: { getListParamsHandle }, currentTab } = this
        typeof getListParamsHandle === 'function' && (params = getListParamsHandle(params))
        const api = typeof getPageList === 'function' ? getPageList : (getPageList && typeof getPageList[currentTab] === 'function' ? getPageList[currentTab] : null)
        this.fetchAccessKey = fetchAccessKey
        api && this.$fetch(api, params).lock('loading').done(data => {
          if (this.fetchAccessKey !== fetchAccessKey) return
          const { pageListFilter } = this.RMD
          this.data = (typeof pageListFilter === 'function') ? pageListFilter.call(this, data) : data
        })
      },
      // 处理记录状态，例如：禁用/启用
      handleRecordState (row, scope, curBtn) {
        const { rowKey, handledApis: { setRecordState }, stateParamsHandle, RMD: { stateAlias } } = this
        const state = stateAlias || 'state'
        if (!setRecordState || !row[rowKey] || !stateParamsHandle) return
        const loadingKey = curBtn.loadingKey || 'BTNSending'
        this.$set(row, loadingKey, true)
        const newState = stateParamsHandle(row)
        this.$fetch(setRecordState, row[rowKey], newState).lock('sending').done(data => {
          row[state] = newState[state]
        }).finally(() => {
          row[loadingKey] = false
        })
      },
      // 删除记录状态
      deleteRecord (row, scope, curBtn) {
        const { rowKey, handledApis: { deleteRecord } } = this
        if (!deleteRecord) return
        const { deleteParams } = this.RMD
        const params = typeof deleteParams === 'function' ? deleteParams(row) : null
        const { $index } = scope
        const loadingKey = curBtn.loadingKey || 'BTNSending'
        this.$set(row, loadingKey, true)
        this.$fetch(deleteRecord, row[rowKey], params).lock('sending').done(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.data.list.splice($index, 1)
          this.data.total -= 1
        }).faile(e => {
          row[loadingKey] = false
        })
      },
      /** event **/
      // 空事件
      doNothing () {},
      // 跳转到编辑页面或详情页
      skipToDetail (row) {
        const { detailRouteName, detailRouteArgs } = this.RMD
        if (detailRouteName) {
          const args = typeof editRouteParams === 'function' ? detailRouteArgs(row) : { params: { id: row.id } }
          this.skipToRoute({ name: detailRouteName, ...args })
        }
      },
      // 跳转到新增页面
      skipToAdd (row) {
        const { addRouteName, addRouteArgs } = this.RMD
        if (addRouteName) {
          const args = typeof addRouteArgs === 'function' ? addRouteArgs(row) : {}
          this.skipToRoute({ name: addRouteName, ...args })
        }
      }
    }
  }
}
