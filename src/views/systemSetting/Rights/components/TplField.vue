<template>
  <el-row
    class="swcomp-template-field"
  >
    <el-col :span="6">
      <ue-common-field v-model="useTpl" :field="switchField"></ue-common-field>
    </el-col>
    <el-col v-if="useTpl" :span="18">
      <ue-common-field :field="tplField" :value="value" @input="$listeners.input"></ue-common-field>
    </el-col>
  </el-row>
</template>

<script>
import { CommonField } from '@wxhccc/ui-extend'

export default {
  name: 'TplField',
  components: {
    [CommonField.name]: CommonField
  },
  props: {
    value: String
  },
  data () {
    return {
      selfUseTpl: false,
      switchField: {
        component: 'ElSelect',
        data: [
          { label: '不使用', value: false },
          { label: '使用', value: true }
        ]
      },
      tplField: {
        component: 'ElSelect',
        data: this.$store.getters.appConfig.tplPages
      }
    }
  },
  computed: {
    useTpl: {
      get () {
        return this.selfUseTpl || Boolean(this.value)
      },
      set (val) {
        this.selfUseTpl = val
        !val && this.$emit('input', '')
      }
    }
  },
  methods: {
    /** utils **/
    /** business **/
    /** events **/
  }
}
</script>
