import { getNonStaticRights, updateNonStaticRights } from '@/api/system'
import RightFormCard from './components/RightFormCard'
import { omit, pickBy } from 'lodash'
import { tree2array } from '@wxhccc/es-util'

export default {
  name: 'RightMana',
  components: {
    RightFormCard
  },
  data () {
    return {
      originData: {},
      rightsTree: [],
      expandKeys: [],
      treeProps: {
        props: { label: 'name' },
        nodeKey: 'id',
        draggable: true,
        expandOnClickNode: false,
        emptyText: '暂无权限数据',
        filterNodeMethod: this.filterDelNode,
        allowDrop: this.checkNodeAllowDrop,
        allowDrag: this.checkNodeAllowDrag
      },
      ...this.getInitState(),
      sending: false
    }
  },
  computed: {
  },
  created () {
    this.getRights()
  },
  methods: {
    /** utils **/
    checkDataPropFalsy (node, prop = 'state') {
      let curNode = node
      while (curNode.data[prop]) {
        if (curNode.parent.level > 0) {
          curNode = curNode.parent
        } else {
          return false
        }
      }
      return true
    },
    isNodeEqual (node, compNode) {
      return Object.keys(node).every(key => (key === 'children') || (compNode[key] === node[key]))
    },
    rightTree2array () {
      let nodes = []
      let keyMap = {}
      const { originData, rightsTree } = this
      const getNode = (node, parentId = 0) => {
        if (node.isMenu && !node.isDel) {
          if (keyMap[node.key]) {
            throw new Error(`菜单【${node.name}】的key重复，请修改后提交`)
          } else {
            keyMap[node.key] = 1
          }
        }
        if (!originData[node.id] || !this.isNodeEqual(node, originData[node.id])) {
          let newNode = originData[node.id]
            ? pickBy(node, (value, key) => (key === 'id' || (key !== 'children' && value !== originData[node.id][key])))
            : omit(node, 'children')
          newNode.pid !== parentId && (newNode.pid = parentId)
          nodes.push(newNode)
        }
        if (Array.isArray(node.children) && node.children.length) {
          node.children.forEach(cnode => getNode(cnode, node.id))
        }
      }
      rightsTree.forEach(node => getNode(node, 0))
      return nodes
    },
    /** business **/
    getInitState () {
      return {
        formInfo: {},
        editFormShow: false
      }
    },
    // 缓存接口返回的原始信息
    saveOrginData (data) {
      this.originData = tree2array(data, { returnObject: true })
    },
    // 检测按钮是不是出于焦点状态
    checkButtonState (scope, formInfo, isEdit) {
      return formInfo.data && formInfo.data === scope.data && formInfo.isEdit === isEdit ? 'primary' : ''
    },
    getRights () {
      this.$fetch(getNonStaticRights).done(data => {
        this.saveOrginData(data)
        this.rightsTree = data
      })
    },
    // 权限表单暂存处理
    rightSaveHanlder (oldVal, newVal, isEdit) {
      if (isEdit) {
        Object.assign(oldVal, newVal)
      } else if (!oldVal) {
        this.rightsTree.push(newVal)
      } else {
        oldVal.children.push(newVal)
        this.expandKeys = [newVal.id]
      }
    },
    // 过滤已标记删除的节点
    filterDelNode (value, data, node) {
      return !this.checkDataPropFalsy(node, 'isDel')
    },
    // 检测节点能否拖动，权限点节点不允许拖动
    checkNodeAllowDrag (draggingNode) {
      return draggingNode.data.isMenu
    },
    // 检查节点子元素是否非菜单
    checkNodeChildPoint (nodeChildren) {
      return nodeChildren && nodeChildren.length && !nodeChildren[0].isMenu
    },
    // 检测节点是否能放下
    checkNodeAllowDrop (draggingNode, dropNode, type) {
      const { data: { isMenu: dropIsMenu, children } } = dropNode
      return dropIsMenu && (type !== 'inner' || !this.checkNodeChildPoint(children))
    },
    // 检验并提交权限数据
    sendingRightsModify () {
      this.sending = true
      this.editFormClose()
      let modifyRights = []
      try {
        modifyRights = this.rightTree2array()
      } catch (e) {
        this.$swMessage(false, e.message)
        return
      }
      if (modifyRights.length) {
        this.$fetch(updateNonStaticRights, modifyRights).done(data => {
          this.$swMessage(true, '更新成功')
          this.getRights()
        }).finally(() => { this.sending = false })
      } else {
        this.sending = false
        this.$message('权限未发生变化，无需提交')
      }
    },
    /** events **/
    addNode (scope) {
      this.formInfo = Object.assign({ isEdit: false }, scope)
      this.editFormShow = true
    },
    editNode (scope) {
      this.formInfo = Object.assign({ isEdit: true }, scope)
      this.editFormShow = true
    },
    // 删除节点，原始节点标记为删除，新节点直接删除
    deleteNode (scope) {
      this.$confirm('此操作将删除后此菜单及其子菜单(或此权限)且无法恢复，是否继续？', '系统提示').then(() => {
        this.editFormClose()
        if (typeof scope.data.id === 'string') {
          this.$refs.rightsTree.remove(scope.data)
        } else {
          this.$set(scope.data, 'isDel', true)
          this.$refs.rightsTree.filter()
        }
      }).catch(e => {})
    },
    // 关闭编辑表单
    editFormClose () {
      Object.assign(this.$data, this.getInitState())
    },
    // 提交权限数据
    saveRightData () {
      this.$confirm('确定要提交修改？', '系统提示').then(this.sendingRightsModify).catch(e => {})
    },
    // 处理拖拽节点放下
    handleNodeDrop (draggingNode, dropNode, pos) {
      let { data } = draggingNode
      const { previousSibling: prevNode, nextSibling: nextNode } = dropNode
      if (pos === 'inner') {
        const { data: { orderValue, children } } = dropNode
        data.orderValue = (children && children.length > 1 ? (children[children.length - 2].orderValue) : orderValue) + 10
      } else {
        const { previousSibling, nextSibling } = pos === 'before' ? prevNode : nextNode
        data.orderValue = previousSibling && nextSibling
          ? Math.floor((previousSibling.data.orderValue + nextSibling.data.orderValue) / 2)
          : previousSibling ? previousSibling.data.orderValue + 10 : nextSibling.data.orderValue - 10
      }
    }
  }
}
