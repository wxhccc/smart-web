<template>
  <div class="user-list-page">
    <ue-common-list-page
      :paged-data="data"
      :loading="loading"
      :columns="handledColumns"
      :operation="handledOperation"
      created-auto-send
      :search-forms="handledSearchForms"
      :get-paged-data="getPageListData"
      :extra-form="extraForm"
      :restore="$store.getters.remember"
    >
    </ue-common-list-page>
    <group-setting-pop
      class="group-slide-pane"
      :show.sync="groupSetting.show"
      :user-info="groupSetting.userInfo"
      @on-update-row="rowDataUpdate"
    >
    </group-setting-pop>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
</style>
