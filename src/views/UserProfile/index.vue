<template>
  <detail-page-pane class="user-profile-page" title="基本资料" :colProps="24">
    <avatar-dialog :visible.sync="adVisible" title="修改头像" :custom-request="updateAvatar"></avatar-dialog>
    <section class="account-info-pane">
      <div class="avatar-pane">
        <el-image class="user-avatar" :src="userInfo.avatar">
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
        <el-button type="text" @click="editAvatar">修改头像</el-button>
      </div>
      <div class="user-info-pane">
        <p><label>登陆账号：</label><span>{{userInfo.account}}</span></p>
        <p>
          <label>昵称：</label>
          <span v-if="!editData.editing">{{userInfo.nick}}</span>
          <el-input size="mini" class="edit-input" v-else v-model="editData.nick"></el-input>
          <el-button type="text" :icon="editData.editing ? 'el-icon-finished': 'el-icon-edit'" @click="nickEditOrSave" :loading="editData.sending"></el-button>
          <el-button type="text" v-show="editData.editing" icon="el-icon-circle-close" @click="cancelEdit"></el-button>
        </p>
        <p><label>注册时间：</label><span>{{dateFormat(userInfo.createdAt)}}</span></p>
      </div>
    </section>
  </detail-page-pane>
</template>

<script>
import DetailPagePane from '@/common/templates/DetailPagePane'
import AvatarDialog from '@/common/templates/AvatarDialog'
import { dateFormat } from '@/utils'
import { modifyUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {
    DetailPagePane,
    AvatarDialog
  },
  data () {
    return {
      adVisible: false,
      loading: false,
      sending: false,
      dateFormat,
      editData: {
        sending: false,
        editing: false,
        nick: ''
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
  },
  methods: {
    /** business **/
    profileSend (params, text = '昵称') {
      this.$fetch(modifyUserProfile, params).lock('editData.sending').done(data => {
        data ? this.$store.commit('SET_USER_INFO', params) : this.$swMessage(false, `${text}更新失败`)
        data && this.cancelEdit()
      })
    },
    resetEditData (editing = false) {
      Object.assign(this.editData, { editing, sending: false, nick: this.userInfo.nick })
    },
    updateAvatar (url) {
      const params = { avatar: url }
      return this.$fetch(modifyUserProfile, params).lock('sending').promise().then(data => {
        data ? this.$store.commit('SET_USER_INFO', params) : this.$swMessage(false, '图像更新失败')
        return data
      })
    },
    /** events **/
    editAvatar () {
      this.adVisible = true
    },
    nickEditOrSave () {
      if (this.editData.editing) {
        this.editData.nick ? this.profileSend({ nick: this.editData.nick }) : this.$message({ type: 'warning', message: '请输入昵称再提交' })
      } else {
        this.resetEditData(true)
      }
    },
    cancelEdit () {
      this.resetEditData()
    }
  }
}
</script>
<style lang="scss" scoped>
.user-profile-page {
  .account-info-pane {
    display: flex;
    border-top: 1px solid $border-color;
    padding-top: 20px;
    min-height: 400px;
  }
  .avatar-pane {
    width: 128px;
    text-align: center;
  }
  .user-avatar {
    width: 100%;
    height: 128px;
  }
  /deep/ .image-slot {
    @include relative;
    text-align: center;
    font-size: 32px;
    line-height: 128px;
    color: $grey;
    background-color: $grey-white;
  }
  .user-info-pane {
    margin-left: 30px;
    .el-button {
      margin-left: 12px;
      font-size: 16px;
    }
    .edit-input {
      display: inline-block;
      width: 120px;
    }
    label {
      opacity: .8;
    }
  }

}
</style>
