<template>
  <component
    :is="componetName"
    class="swtpl-user-group-field"
    v-bind="compProps"
    v-on="$listeners"
    :value="value"
    @input="val => $emit('input', val)"
  >
  </component>
</template>
<script>
import { RemoteCascader } from '@wxhccc/ui-extend'
import { searchLevelGroupList } from '@/api/access'
export default {
  name: 'UserGroupField',
  components: {
    [RemoteCascader.name]: RemoteCascader
  },
  props: {
    cascade: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    !this.cascade && this.fetchAllList()
  },
  computed: {
    componetName () {
      return this.cascade ? 'UeRemoteCascader' : 'ElCascader'
    },
    compProps () {
      return Object.assign(this.cascade ? { load: this.fetchLevelList } : { options: this.options }, this.$attrs)
    }
  },
  methods: {
    fetchLevelList (level, lvlVal, value) {
      return this.getLevelGroupList(level > 0 ? { pid: lvlVal } : {})
    },
    getLevelGroupList (params) {
      return this.$fetch(searchLevelGroupList, params).promise().then(data => Array.isArray(data) ? data : [])
    },
    async fetchAllList () {
      this.options = await this.getLevelGroupList()
    }
  }
}
</script>
