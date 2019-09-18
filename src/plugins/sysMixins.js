import Vue from 'vue'
import { cloneDeep, pick } from 'lodash'
Vue.mixin({
  computed: {
    RouteRights () {
      const { meta } = this.$route
      return meta && Array.isArray(meta.actions) ? meta.actions : []
    },
    '$_' () {
      return {
        cloneDeep,
        pick
      }
    }
  },
  methods: {
    $swMessage (success, message, onClose) {
      let config = {
        type: success ? 'success' : 'error',
        message
      }
      success && typeof onClose === 'function' && (config.onClose = onClose)
      this.$message(config)
    }
  }
})
