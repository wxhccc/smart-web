<template>
  <div class="detail-page-pane">
    <el-row :gutter="10">
      <el-alert
        v-if="getInfoFaile"
        title="获取数据失败"
        type="error"
        show-icon>
      </el-alert>
      <template v-else>
        <component :is="twoPane ? 'ElCol' : 'div'" :class="leftPaneClass(twoPane)" v-bind="twoPane && leftColProps">
          <component :is="twoPane ? 'div' : 'ElCol'" :class="leftPaneClass(!twoPane)" v-bind="!twoPane && leftColProps">
            <slot name="title">
              <page-title v-if="title" v-bind="pageTitle"></page-title>
            </slot>
            <slot></slot>
          </component>
        </component>
        <el-col v-if="twoPane" v-bind="rightColProps">
          <div class="page-module-pane">
            <slot name="right"></slot>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
import PageTitle from '@/common/components/PageTitle'
export default {
  name: 'DetailPagePane',
  components: {
    PageTitle
  },
  props: {
    getInfoFaile: Boolean,
    twoPane: Boolean,
    title: {
      type: [Object, String]
    },
    colProps: {
      type: [Number, Object],
      default: 18
    }
  },
  computed: {
    pageTitle () {
      const { title } = this
      return typeof title === 'string' ? { title } : title
    },
    leftColProps () {
      const { colProps } = this
      return typeof colProps === 'number' ? { span: colProps } : colProps
    },
    rightColProps () {
      const { colProps } = this
      if (typeof colProps === 'number') {
        return { span: 24 - colProps }
      }
      let props = {}
      for (let i in colProps) {
        props[i] = 24 - colProps[i]
      }
      return props
    }
  },
  methods: {
    leftPaneClass (twoPane) {
      return {'page-module-pane': !twoPane, 'clearfix': !twoPane }
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-pane {
  .page-module-pane {
    @include page-module-pane;
  }
}
</style>
