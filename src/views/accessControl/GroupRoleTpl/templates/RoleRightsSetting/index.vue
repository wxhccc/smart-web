<template>
  <ue-drawer
    class="role-rights-setting-slide"
    :visible.sync="handledVisible"
    :title="isEdit ? '修改角色' : `新增${hasParent ? '子' : '' }角色`"
    :container="false"
    body-size="70%"
  >
    <el-form class="rights-form" :model="formData" ref="form" v-bind="formProps" v-loading="loading">
      <ue-form-fields
        class="role-name-item"
        :items="nameFieldItems"
        v-model="formData"
      >
      </ue-form-fields>
      <el-form-item
        class="comp-form-item-field"
        label="角色权限"
        prop="rightIds"
        :rules="rightsRule"
      >
        <ue-tree-field :data="limitAccessRights" v-model="formData.rightIds" v-bind="treeFieldProps"></ue-tree-field>
      </el-form-item>
    </el-form>
    <template #footer>
      <ue-form-btns
        class="form-btns"
        :sending="sending"
        :parent-refs="$refs"
        isEdit
        submitConfirm
        :texts="{confirmWord: roleId ? '确定修改角色权限?' : '确定提交角色信息'}"
        :submit="formDataSubmit"
        :cancel="closePop"
      >
      </ue-form-btns>
    </template>
  </ue-drawer>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.role-rights-setting-slide {
  .rights-form {
    width: 100%;
    padding: 20px;
  }
  .role-name-item {
    width: 100%;
    min-width: 200px;
    max-width: 400px;
  }
  .form-btns {
    margin-left: 20px;
  }
}
</style>
