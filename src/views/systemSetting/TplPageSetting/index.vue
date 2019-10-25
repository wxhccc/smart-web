<template>
  <detail-page-pane 
    class="tpl-setting-page"
    :col-props="24"
    :title="pageTitle"
  >
    <p><label>模版：</label>{{tplName}}</p>
    <!-- <component class="setting-container" v-model="formData" :is="template"></component> -->
    <ue-form-btns
      is-cancel
      :cancel="returnToList"
      :submit="sendDetailInfo"
      :sending="sending"
    >
    </ue-form-btns>
  </detail-page-pane>
</template>

<script>
import editPageMixin from '@/common/mixins/editPageMixin'
import { mapGetters } from 'vuex'
import { getTplPageInfo, updateTplPageInfo } from '@/api/system'

export default {
  name: 'TplPageSetting',
  components: {
    // PostListTpl: () => import('./templates/PostListTpl')
  },
  mixins: [editPageMixin()],
  data () {
    return this.$_mixin_initData({
      loading: false,
      sending: false,
      detailInfo: {},
      formData: {}
    }, {
      isEdit: true,
      listRouteName: 'TplPages',
      triggerAfterMessage: true,
      handledApis: {
        getDetailInfo: getTplPageInfo,
        updateDetailInfo: updateTplPageInfo
      }
    })
  },
  computed: {
    ...mapGetters([
      'appConfig',
      'switchFilter'
    ]),
    id () {
      return Number(this.$route.params.id)
    },
    template () {
      return this.detailInfo.template
    },
    pageTitle () {
      return { backRoute: 'TplPages', title: '页面：' + this.detailInfo.name }
    },
    tplName () {
      return this.switchFilter('tplPages')(this.template)
    }
  },
  created () {
  },
  methods: {
    /** utils **/
    resetPageState () {
      this.getDetailInfo()
    },
    /** business **/
    formDataHandle (data, isSend) {
      if (!isSend) {
        return this.$_.cloneDeep(data.configs)
      } else {
        return [this.id, data]
      }
    },
    /** events **/
    onSendSuccess (data) {
      data && this.returnToList()
    }
  }
}

</script>
<style lang="scss" scoped>
.tpl-setting-page {
  .setting-container {
    margin: 10px 0;
  }
}
</style>