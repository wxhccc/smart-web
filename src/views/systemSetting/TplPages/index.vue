<template>
  <div class="tpl-list-page">
    <ue-common-list-page
      :paged-data="data"
      :loading="loading"
      :columns="handledColumns"
      created-auto-send
      :search-forms="handledSearchForms"
      :get-paged-data="getPageListData"
      :extra-form="extraForm"
      :restore="$store.getters.remember"
    >
    </ue-common-list-page>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
</style>
