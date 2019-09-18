import { FormFieldItem } from '@wxhccc/ui-extend'
export default {
  components: {
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    config: Object,
    value: null,
    required: Boolean,
    prop: String
  },
  computed: {
    handleValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
  }
}
