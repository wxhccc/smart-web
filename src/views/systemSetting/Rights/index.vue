<template>
  <div class="right-mana-page">
    <el-row>
      <el-col :xl="10" :lg="11" :sm="12" class="content-col">
        <div class="main-pane">
          <div class="title-pane clearfix">
            <span>权限列表</span>
            <div class="action-buttons fr">
              <el-button class="save-btn" :disabled="!rightsTree.length" type="warning" size="mini" icon="el-icon-plus" @click="saveRightData">提交</el-button>
              <el-button class="add-btn" size="mini" icon="el-icon-plus" @click="addNode({ data: null })"></el-button>
            </div>
          </div>
          <div class="rights-tree-pane">
            <el-scrollbar
              class="sw-el-scrollbar"
            >
              <el-tree
                class="rights-tree"
                ref="rightsTree"
                :data="rightsTree"
                :default-expanded-keys="expandKeys"
                v-bind="treeProps"
                @node-drop="handleNodeDrop"
              >
                <div slot-scope="scope" :class="['right-node', scope.data.isMenu ? 'menu-node': 'point-node']">
                  <i :class="['node-type-icon', scope.data.isMenu ? (scope.data.template ? 'sw-icon-moban' : 'sw-icon-menu') : 'sw-icon-key']"></i>
                  <span :class="['node-name', { 'is-disabled': checkDataPropFalsy(scope.node) }]">
                    <i class="sw-icon-attentionforbid"></i>
                    {{scope.data.name}}
                  </span>
                  <div class="operation-btns fr">
                    <el-button v-if="scope.data.isMenu && scope.node.level <= 3" :type="checkButtonState(scope, formInfo, false)" size="mini" icon="el-icon-plus" @click="addNode(scope)"></el-button>
                    <el-button :type="checkButtonState(scope, formInfo, true)" size="mini" icon="el-icon-edit" @click="editNode(scope)"></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteNode(scope)"></el-button>
                  </div>
                </div>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <right-form-card
          v-if="editFormShow"
          class="right-form-pane"
          v-bind="formInfo"
          @on-close="editFormClose"
          @on-save="rightSaveHanlder"
        >
        </right-form-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script src="./vindex"></script>

<style lang="scss" scoped>
.right-mana-page {
  .title-pane {
    line-height: 30px;
    padding-bottom: 8px;
    border-bottom: 1px solid $light-grey;
  }
  .content-col {
    position: relative;
  }
  .main-pane {
    padding: 8px;
    @include white-bg;
  }
  .save-btn {
    margin-right: 54px;
  }
  .rights-tree-pane {
    height: 500px;
  }
  .right-form-pane {
    @include absolute;
    left: 100%;
    top: 0;
    margin-left: 20px;
    min-height: 400px;
    overflow: visible;
    &:before {
      position: absolute;
      content: '';
      left: -12px;
      top: 40px;
      @include triangle(20px, 12px, $white, left)
    }
  }
  .rights-tree::v-deep {
    margin: 10px 17px 17px 0;
    .el-tree-node__content {
      position: relative;
      height: 32px;
      line-height: 32px;
      margin: 2px 0;
    }
    .right-node {
      width: 100%;
    }
    .node-type-icon {
      margin-right: 12px;
    }
    .node-name {
      i {
        display: none;
        margin-right: 2px;
      }
      &.is-disabled {
        color: #999999;
        i {
          display: inline;
        }
      }
    }
  }
}
</style>
