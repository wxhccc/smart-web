import commonMixin from './commonMixin'
import { commonFormProps } from '@/common'
import DetailPagePane from '@/common/templates/DetailPagePane'

export default function (useRMD) {
  return {
    components: {
      DetailPagePane
    },
    mixins: [commonMixin(useRMD)],
    computed: {
      id () {
        return this.$route.params.id || null
      },
      handledFormProps () {
        return commonFormProps(false, this.RMD && this.RMD.formProps ? this.RMD.formProps : {})
      },
      handledParams () {
        return this.RMD.detailParams
      }
    },
    methods: {
      /** utils **/
      /** business **/
      // 编辑时先获取页面数据
      getDetailInfo () {
        const { getDetailInfo } = this.handledApis
        this.infoFetched = true
        getDetailInfo && this.$fetch(getDetailInfo, this.id, this.handledParams).lock('loading').done(data => {
          typeof this.detailInfoHandler && this.detailInfoHandler(data)
        }).faile(e => {
          this.getInfoFaile = true
        })
      }
      /** event **/
    }
  }
}
