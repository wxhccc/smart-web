<template>
  <el-card
    :class="['swcomp-dict-config-field', 'item-state-' + value.state]"
    shadow="hover"
    v-bind="$attrs"
  >
    <template #header>
      <div class="header-pane">
        <div class="key-type">
          <span class="title">{{value.key}}</span>
          <el-tag class="data-type-tag">{{dataTypeFilter(value.valueType || 0)}}</el-tag>
        </div>
        <div class="operation">
          <el-button class="ope-button edit-btn" @click="$emit('on-edit', value)" size="mini" icon="el-icon-edit"></el-button>
          <el-button class="ope-button delete-btn" @click="handleDelete" type="danger" size="mini" :icon="value.isDelete ? 'el-icon-refresh-left' : 'el-icon-delete'"></el-button>
        </div>
      </div>
    </template>
    <div class="desc-state-pane clearfix">
      <span class="desc">{{value.describe}}</span>
      <el-tag class="state-tag" :type="value.state ? '' : 'info'">{{stateFilter(value.state)}}</el-tag>
      <el-tag v-if="value.isDelete" class="state-tag" type="warning">待删除</el-tag>
    </div>
    <el-popover placement="bottom" width="300">
      <el-button class="expode-bar" slot="reference" icon="el-icon-caret-bottom"></el-button>
      <ue-data-table :columns="columns" :data="value.value"></ue-data-table>
    </el-popover>
  </el-card>
</template>

<script>
import { DataTable } from '@wxhccc/ui-extend'
export default {
  name: 'DictConfigItem',
  components: {
    [DataTable.name]: DataTable
  },
  props: {
    value: Object
  },
  computed: {
    columns () {
      return [{ label: '标题', prop: 'label' }, { label: '值', prop: 'value' }]
    },
    dataTypeFilter () {
      return this.$store.getters.switchFilter('dataType')
    },
    stateFilter () {
      return this.$store.getters.switchFilter('dictItemState')
    }
  },
  methods: {
    handleDelete () {
      const { isDelete } = this.value
      !isDelete ? this.$confirm('删除此项后不会立刻删除，会在提交表单后移除且不可恢复。提交前可随时取消，确定继续操作？').then(() => this.$emit('on-delete', true)).catch(() => {}) : this.$emit('on-delete', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.swcomp-dict-config-field {
  position: relative;
  display: inline-block;
  margin: 0 20px 20px 0;
  width: 300px;
  &.item-state-0 {
    color: #909399;
  }
  /deep/ .el-card__header, /deep/.el-card__body {
    padding: 10px 20px;
  }
  .header-pane {
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    .title {
      margin-right: 10px;
    }
    .operation {
      flex-shrink: 0
    }
  }
  .ope-button  {
    height: 24px;
    padding: 3px 10px;
  }
  .desc {
    line-height: 24px;
  }
  .desc-state-pane {
    margin-bottom: 14px;
  }
  .state-tag {
    float: right;
    margin-left: 12px;
  }
  .expode-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12px;
    padding: 0;
  }
}
</style>
