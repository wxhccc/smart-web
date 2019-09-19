<template>
  <detail-page-pane 
    :class="['user-edit-page', isEdit ? 'edit-page' : 'add-page']"
    :title="pageTitle"
  >
    <el-alert
      title="特别说明"
      description="数据访问权限用于限制用户在系统中可访问数据的范围"
    >
    </el-alert>
    <el-form class="edit-form" ref="form" :model="formData" v-bind="handledFormProps" :key="id">
      <ue-form-fields
        class="form-item-fields"
        ref="fields"
        :items="handledFieldItems"
        v-model="formData"
      >
        <el-form-item>
          <ue-form-btns
            is-edit
            submit-confirm
            :parent-refs="$refs"
            :cancel="returnToList"
            :submit="sendDetailInfo"
            :sending="sending"
          >
          </ue-form-btns>
        </el-form-item>
      </ue-form-fields>
    </el-form>
  </detail-page-pane>
</template>

<script src="./vindex"></script>
<style lang="scss" scoped>
.user-edit-page {
  .edit-form {
    margin-top: 16px;
  }
  .form-item-fields {
    width: 500px;
  }
  /deep/ .sub-item-panel{
    .el-form-item{
      margin-bottom: 0px;
    }
  }
}
</style>