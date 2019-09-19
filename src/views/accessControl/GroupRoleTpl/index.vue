<template>
  <div class="group-role-tpl-page" :class="$route.name | hyphenate">
    <component v-if="RMD.pageTemplate" :is="RMD.pageTemplate" :visible.sync="slideDialog.show" :data="slideDialog.data" :RMD="RMD" :RSD="RSD" @on-send-success="refreshPageList"></component>
    <ue-multi-alert v-if="alertInfos" :data="alertInfos"></ue-multi-alert>
    <ue-common-list-page
      :paged-data="data"
      :row-key="rowKey"
      :loading="loading"
      :refresh.sync="refresh"
      :formProps="formProps"
      :columns="handledColumns"
      :operation="handledOperation"
      created-auto-send
      :search-forms="handledSearchForms"
      :get-paged-data="getPageListData"
      :search-params-handler="handleFormData"
      :extra-form="RSD.extraForm"
    >
    </ue-common-list-page>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.group-list-page {
  /deep/ .record-name-column {
    padding-left: 20px;
  }
}
</style>
