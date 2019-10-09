<template>
  <div class="configs-mana-page">
    <ue-drawer
      class="dict-item-edit-dialog"
      :visible.sync="dictEditForm.visible"
      :title="isDictItemEdit ? '修改字典项' : '新增字典项'"
    >
      <el-form class="dict-item-form" ref="dictFrom" :model="dictEditForm.data" v-bind="dictFormProps">
        <ue-form-fields :items="dictModuleFieldItems" v-model="dictEditForm.data"></ue-form-fields>
      </el-form>
      <template #footer>
        <ue-form-btns
          class="dict-form-btns"
          is-edit
          :parentRefs="$refs"
          refKey="dictFrom"
          :submit="dictItemSave"
          :cancel="closeDictItem"
          :texts="{sureBtn:'确定'}"
        ></ue-form-btns>
      </template>
    </ue-drawer>
    <el-form class="configs-form-pane" ref="form" :model="formData" v-bind="formProps" v-loading="loading">
      <el-tabs v-model="actTab">
        <el-tab-pane class="config-module base-config" name="base" label="参数配置">
          <ue-form-fields
            :items="baseModuleFieldItems"
            v-model="formData.base"
          >
          </ue-form-fields>
        </el-tab-pane>
        <el-tab-pane class="config-module dict-items" name="dict" label="字典配置">
          <p class="operation-line clearfix">
            <ue-search-input v-model="dictKey" placeholder="搜索标题或key"></ue-search-input>
            <el-button type="primary" icon="el-icon-plus" @click="editDictItem()">新增</el-button>
          </p>
          <div class="dict-list-pane">
            <template v-if="showDictConfigs.length">
              <dict-config-item
                v-for="(item, index) in showDictConfigs"
                :key="index"
                :value="item"
                :is-delete.sync="item.isDelete"
                @on-edit="editDictItem(item)"
                @on-delete="dictItemDelete(item, $event)"
              >
              </dict-config-item>
            </template>
            <p v-else><el-alert :title="dictKey ? '未搜索到任何数据！' : '暂无数据，请添加数据'" :closable="false"></el-alert></p>
          </div>
        </el-tab-pane>
      </el-tabs>
      <ue-form-btns
        submit-only
        submit-confirm
        :parentRefs="$refs"
        refKey="form"
        :submit="formDataSubmit"
        :sending="sending"
      >
      </ue-form-btns>
    </el-form>
  </div>
</template>

<script src="./vindex"></script>

<style lang="scss" scoped>
.dict-item-edit-dialog {
  /deep/ .dict-item-form {
    padding: 20px;
    & > .ue-form-fields > .ue-form-field-item > .el-form-item__content > .ue-form-field {
      width: 320px;
      vertical-align: top;
    }
  }
  .dict-form-btns {
    width: 100%;
    padding-left: 20px;
    border-top: 1px solid $light-grey;
  }
}
.configs-mana-page {
  @include page-module-pane;
  padding-top: 1px;
  .config-module {
    padding-top: 10px;
    border-bottom: 1px dashed $border-color;
  }
  .configs-form-pane {
    position: relative;
  }
  .base-config {
    /deep/ .comp-form-item-field {
      .field-item {
        width: 400px;
        vertical-align: top;
      }
      &.default-avatar {
        .field-item {
          margin: 0 20px 12px 0;
        }
      }
    }
  }
  .dict-items {
    .operation-line {
      margin-top: 0;
      .el-input {
        width: 180px;
      }
      .el-button {
        float: right;
      }
    }
    .dict-list-pane {

    }
  }
  
}
</style>
