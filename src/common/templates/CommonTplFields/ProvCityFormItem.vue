<template>
  <form-item-prov-city-area
    class="swtpl-prov-city-field"
    :value="value"
    @input="val => $emit('input', val)"
    v-bind="$attrs"
    :sourceData="sourceData"
  >
  </form-item-prov-city-area>
</template>
<script>
import { FormItemProvCityArea } from '@/common/components/CommonFormItems'
import { getProvCityData } from '@/api/common'

export default {
  name: 'ProvCityField',
  components: {
    FormItemProvCityArea
  },
  props: {
    area: Boolean,
    value: [String, Object]
  },
  data () {
    return {
      dataSource: {}
    }
  },
  created () {
    (this.area || !this.$store.getters.provCity.province.length) && this.getProvCityData()
  },
  computed: {
    sourceData () {
      return this.area ? this.dataSource : this.$store.getters.provCity
    }
  },
  methods: {
    getProvCityData () {
      const params = this.area ? { type: 'area' } : {}
      this.$fetch(getProvCityData, params).done(data => {
        this.area ? (this.dataSource = data) : this.$store.commit('SET_PROV_CITY_DATA', data)
      })
    }
  }
}
</script>
