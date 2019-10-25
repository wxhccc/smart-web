<template>
  <ue-drawer class="user-group-setting" :container="false" :visible.sync="visible" title="修改用户所属用户组" body-size="420px">
    <el-form ref="form" :model="formData" v-bind="handledFormProps">
      <el-form-item label="账号:"><span class="text-span">{{userInfo.account}}</span></el-form-item>
      <ue-form-fields :items="fieldItems" v-model="formData"></ue-form-fields>
    </el-form>
    <template #footer>
      <ue-form-btns
        class="action-btns"
        is-edit
        submit-confirm
        :parent-refs="$refs"
        ref-key="form"
        :submit="sendUserRoles"
        :cancel="closePop"
        :sending="sending"
      >
      </ue-form-btns>
    </template>
  </ue-drawer>
</template>
<script>
import { Drawer } from '@wxhccc/ui-extend'
import editPageMixin from '@/common/mixins/editPageMixin'
import { createUserGroupFormItem } from '@/common/templates/CommonTplFields'
import { commonFormProps, createFfiRulesProps } from '@/common'
import { updateUser } from '@/api/access'
import { last } from 'lodash'

export default {
  name: 'GroupSettingPop',
  mixins: [editPageMixin()],
  components: {
    [Drawer.name]: Drawer,
  },
  props: {
    show: Boolean,
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sending: false,
      formProps: { labelWidth: '70px' },
      formData: {
        groupListIds: []
      }
    }
  },
  computed: {
    visible: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    },
    handleValue: {
      get () {
        return this.$_.cloneDeep(this.value)
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    fieldItems () {
      return [
        createUserGroupFormItem(
          createFfiRulesProps('用户组:', '请选择想要加入的用户组'),
          'groupListIds',
          {
            props: { changeOnSelect: true, placeholder: '请选择用户组' }
          }
        )
      ]
    }
  },
  watch: {
    visible (newVal) {
      const { groupListIds } = this.userInfo
      this.formData.groupListIds = newVal && Array.isArray(groupListIds) ? groupListIds.slice(0) : []
      !newVal && this.$refs.form.clearValidate()
    }
  },
  methods: {
    /** events **/
    sendUserRoles () {
      const { id } = this.userInfo
      const params = { groupId: last(this.formData.groupListIds) }
      id && this.$fetch(updateUser, id, params).lock('sending').done(data => {
        this.$swMessage(data, `用户组设置${data ? '成功' : '失败'}`)
        if (data) {
          this.$emit('on-update-row', this.userInfo, { groupId: params.groupId, ...this.formData })
          this.closePop()
        }
      })
    },
    /** events **/
    closePop () {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.user-group-setting {
  .el-form {
    padding: 20px 30px;
  }
  .action-btns {
    padding-left: 20px;
    width: 100%;
    border-top: 1px solid $border-color;
  }
}
</style>
