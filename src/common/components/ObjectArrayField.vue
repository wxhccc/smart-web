<template>
  <ul class="comp-object-array-field">
    <el-row v-if="labelTop" v-bind="handledRowProps" tag="li">
      <el-col
        class="label-col"
        v-for="(item, index) in handledKeyCfgs"
        v-bind="item.colProps"
        :key="index"
      >
        <span class="label-span">{{item.label}}</span>
      </el-col>
    </el-row>
    <el-row
      v-for="(object, oindex) in handledValue"
      v-bind="handledRowProps"
      tag="li"
      :key="oindex + randomKey"
    >
      <el-col
        v-for="(item, index) in handledKeyCfgs"
        v-bind="item.colProps"
        :key="index"
      >
        <ue-form-field-item v-bind="getFieldItem(item, oindex)" :value="object[item.prop]" @input="updateObject(object, item, $event)" :ref="`${item.prop}.field`">
        </ue-form-field-item>
      </el-col>
      <div class="ope-btns">
        <el-button
          :disabled="oindex === handledValue.length - 1"
          type="text"
          icon="el-icon-sort-down"
          @click="objectMove(oindex, +1)"
        ></el-button>
        <el-button
          :disabled="oindex === 0"
          type="text"
          icon="el-icon-sort-up"
          @click="objectMove(oindex, -1)"
        ></el-button>
        <el-button type="text" icon="el-icon-delete" @click="deleteObject(oindex)"></el-button>
      </div>
    </el-row>
    <el-row v-bind="handledRowProps" tag="li">
      <el-col
        v-for="(item, index) in handledKeyCfgs"
        v-bind="item.colProps"
        :key="index"
      ><el-input :placeholder="item.prop" @input="createNewItem(item, $event)"></el-input></el-col>
    </el-row>
  </ul>
</template>
<script>
import { FormFieldItem } from '@wxhccc/ui-extend'
import { cloneDeep, get } from 'lodash'

export default {
  name: 'ObjectArrayField',
  components: {
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    rowProps: Object,
    value: {
      type: Array,
      default: () => ([])
    },
    keyCfgs: {
      type: Array,
      default: () => ([])
    },
    labelTop: Boolean,
    prevProp: {
      type: Array,
      default: () => ([])
    },
    deleteConfirm: Boolean
  },
  data () {
    return {
      randomKey: ''
    }
  },
  computed: {
    initObjectItem () {
      let result = {}
      this.keyCfgs.forEach(item => Object.prototype.hasOwnProperty.call(item, 'prop') && (result[item.prop] = ''))
      return result
    },
    handledRowProps () {
      return Object.assign({ gutter: 10 }, this.rowProps)
    },
    handledKeyCfgs () {
      const avgSpan = Math.floor(24 / this.keyCfgs.length)
      return this.keyCfgs.map(item => Object.assign({ colProps: { span: avgSpan } }, item))
    },
    handledValue: {
      get () { return cloneDeep(this.value) },
      set (val) { this.$emit('input', val) }
    }
  },
  methods: {
    /** utils **/
    swapArray (orgIndex, targIndex) {
      let arr = this.handledValue
      arr[orgIndex] = arr.splice(targIndex, 1, arr[orgIndex])[0]
    },
    /** business **/
    getFieldItem (item, index) {
      const { field, prop, label } = item
      const component = field || 'ElInput'
      const placeholder = '请输入' + label
      return {
        props: label instanceof Object ? label : { ...(!this.labelTop && label ? { label } : {}), rules: [{ required: true, message: placeholder, trigger: 'blur' }] },
        field: field instanceof Object ? field : { component, props: { placeholder } },
        prop,
        prevProp: this.prevProp.concat([index])
      }
    },
    focusNewItem (prop, index) {
      this.$nextTick(() => {
        const inputComp = get(this.$refs, [prop + '.field', index, '$children', 0, '$children', 1, '$children', 0])
        inputComp && inputComp.focus()
      })
    },
    objectMove (index, moveIndex) {
      this.swapArray(index, index + moveIndex)
      this.emitValue()
      this.randomKey = Math.random()
    },
    /** event **/
    createNewItem (item, value) {
      const { prop, isNumber } = item
      this.handledValue = this.handledValue.concat([Object.assign({}, this.initObjectItem, { [prop]: isNumber ? this.parseNumber(value) : value })])
      this.focusNewItem(prop, this.handledValue.length)
    },
    updateObject (object, item, val) {
      const { prop, isNumber } = item
      object[prop] = val && isNumber ? this.parseNumber(val) : val
      this.emitValue()
    },
    parseNumber (val) {
      const { parseFloat, isFinite } = Number
      return isFinite(parseFloat(val)) ? parseFloat(val) : ''
    },
    emitValue () {
      this.$emit('input', this.handledValue)
    },
    deleteObject (index) {
      const deleteFn = () => {
        this.handledValue.splice(index, 1)
        this.emitValue()
      }
      this.deleteConfirm instanceof Promise ? this.deleteConfirm.then(deleteFn) : deleteFn()
    }
  }

}
</script>
<style lang="scss" scoped>
.comp-object-array-field {
  padding-right: 76px;
  li {
    position: relative;
  }
  .ope-btns {
    position: absolute;
    top: 0;
    right: -71px;
    .el-button {
      padding: 7px 0;
      font-size: 16px;
      & + .el-button {
        margin-left: 6px;
      }
    }
  }
  /deep/ .el-input__inner, .label-span {
    padding: 0 8px;
  }
  .ue-form-field-item {
    display: flex;
    margin-right: 0;
  }
}
</style>
