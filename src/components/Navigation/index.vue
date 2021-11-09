<template>
  <div>
    <div class="nav-bar">
      <div class="nav-bar-contain">
        <section>
          <span class="nav-title ml15 vtm">欢迎访问首页</span>
        </section>
        <section class="nav-menu">
          <el-menu
          ref="navMenu"
          default-active="home"
          mode="horizontal"
          background-color="#2A2B3C"
          text-color="#D3DEE4"
          active-text-color="#2d98ff"
          @select="handleSelect"
        >
            <el-menu-item index="home" :class="{'is-active': this.$router.history.current.name == 'home'}">首页</el-menu-item>
          </el-menu>
        </section>
        <section class="nav-user">
          <el-dropdown @command="userAction" placement="bottom-end">
            <div class="user-info-icon">
              <i class="el-icon-user-solid"></i>
              {{ currentUser || '未登录' }}
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout" icon="el-icon-s-tools"
                >退出</el-dropdown-item
              >
              <el-dropdown-item command="uodatePassword" icon="el-icon-s-tools"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="version" icon="el-icon-info"
                >关于</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </section>
      </div>
      <p class="nav-stitle">
        <span>{{ currentCrumbName || '首页' }}</span>
        <slot name="navConetnt"></slot>
      </p>
    </div>
    <el-dialog
      width="440px"
      class="odialog"
      title="关于"
      :visible="versionVisible"
      :before-close="dialogClose"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <div>
        <div class="version-info-content">
          <img src="@/assets/5Glogo.svg" class="version-info-logo" alt="" />
          <span class="version-info-name">
            移动传输采集云平台
            <em class="version-info-note">V1.3.0</em>
          </span>
        </div>
        <div class="version-info-copyright">
          Copyright © 2020 AsiaInfo Inc. All rights reserved.
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import userApi from '@/api/user';
import { mapGetters } from 'vuex';

export default {
  name: 'navigation',
  computed: {
    ...mapGetters('user', {
      currentUser: 'currentUser'
    })
  },
  data() {
    return {
      navigationList: [],
      versionVisible: false,
      currentCrumbName: ''
    };
  },
  methods: {
    userAction(val){
      this[val]();
    },
    logout() {
      userApi.logout().then((res) => {
        if (res.CODE === 0) {
          this.$store.dispatch('user/logout');
          this.$router.push('/login');
        }
      });
    },
    handleSelect(key) {
      this.$router.push(key);
    },
    uodatePassword() {
      this.$router.push({ path: '/modifyPassword' });
    },
    version() {
      this.versionVisible = true;
    },
    dialogClose() {
      this.versionVisible = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.nav-bar {
  min-width: 1280px;
  height: 90px;
  .nav-bar-contain {
    height: 50px;
    background: #2a2b3c;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 43px;
  }
  .nav-stitle {
    height: 40px;
    line-height: 40px;
    box-shadow: 0px 2px 3px 0px #cccccc;
    background-color: white;
    padding: 0 30px;
    font-size: 16px;
    border-bottom: 1px solid #cccccc;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 13px;
      width: 2px;
      height: 14px;
      left: 24px;
      background: #2c9cfa;
    }
  }
  .nav-title {
    font-size: 16px;
  }
  .nav-menu {
    height: 50px;
    margin-left: 150px;
  }
  .nav-user {
    flex: 1;
    text-align: right;
  }
  .user-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #b3bcc5;
    line-height: 22px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    color: #929497;
  }
  .user-name {
    margin-left: 6px;
    max-width: 100px;
    font-size: 14px;
    display: inline-block;
    color: white;
  }
}
.version-info-content {
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 15px 0;
  font-size: 0;
  overflow: hidden;
}
.version-info-logo {
  display: inline-block;
  width: 40px;
  height: 43px;
  vertical-align: middle;
}
.version-info-name {
  display: inline-block;
  height: 100%;
  margin-left: 10px;
  line-height: 50px;
  color: #394f6b;
  font-size: 20px;
  vertical-align: middle;
}
.version-info-note {
  font-style: normal;
  font-size: 14px;
  margin-left: 6px;
}
.version-info-copyright {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: #7b93a7;
  margin-bottom: 15px;
}
.el-menu-item [class^='el-icon-'] {
  font-size: 14px;
}
.user-info-icon {
  color: white;
  cursor: pointer;
}
</style>
<style lang="scss">
@media screen and (max-width: 1500px) {
  .nav-bar .nav-bar-contain {
    .nav-menu {
      margin-left: 50px;
    }
    .el-menu-item {
      padding: 0 10px;
    }

    .el-submenu__title {
      color: red;
      padding: 0 10px;
    }
  }
}
.nav-menu .el-menu-item.is-active {
  color: rgb(45, 152, 255) !important;
  border-bottom-color: rgb(45, 152, 255) !important;
  background-color: rgb(42, 43, 60) !important;
}
</style>
