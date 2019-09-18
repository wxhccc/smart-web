import detailPageMixin from './detailPageMixin'
import { FormFields, FormBtns } from '@wxhccc/ui-extend'
import { cloneDeep } from 'lodash'

export default function (useRMD) {
  return {
    components: {
      [FormFields.name]: FormFields,
      [FormBtns.name]: FormBtns
    },
    mixins: [detailPageMixin(useRMD)],
    computed: {
      handledFieldItems () {
        return this.RMD.fieldItems || []
      }
    },
    methods: {
      /** utils **/
      /** business **/
      // 编辑时先获取页面数据
      getDetailInfo () {
        const { handledParams, handledApis: { getDetailInfo }, RMD: { detailParamsHandle, formDataHandle } } = this
        if (!getDetailInfo) return
        const params = typeof detailParamsHandle === 'function' ? detailParamsHandle(handledParams) : handledParams
        this.$fetch(getDetailInfo, this.id, params).lock('loading').done(data => {
          this[this.infoAlias || 'detailInfo'] = cloneDeep(data)
          this.formData = typeof formDataHandle === 'function' ? formDataHandle(data) : data
        })
      },
      // 提交表单页面数据
      sendDetailInfo () {
        const { updateDetailInfo, addDetailInfo } = this.handledApis
        const api = this.isEdit ? updateDetailInfo : addDetailInfo
        if (!api) return
        const { formDataHandle, onSendSuccess, triggerAfterMessage } = this.RMD
        const params = cloneDeep(this.formData)
        const handleParams = typeof formDataHandle === 'function' ? formDataHandle(params, true) : (this.isEdit ? [this.id, params] : [params])
        this.$fetch(api, ...handleParams).lock('sending').done(data => {
          this.$swMessage(data, data ? '提交成功' : '提交失败', triggerAfterMessage && onSendSuccess)
          !triggerAfterMessage && typeof onSendSuccess === 'function' && onSendSuccess.call(this, data)
        })
      }
      /** event **/
    }
  }
}
