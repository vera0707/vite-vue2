<template>
  <div class="login">
    <div class="login-left">
      <img src="@/assets/login_BG.svg" alt class="login-illustration" width="75%" />
    </div>
    <div class="login-right">
      <div class="login-box">
        <div class="product-name vtc">
          <p>欢迎访问登录页</p>
        </div>
        <el-form
          :model="loginForm"
          :rules="rules"
          inline
          class="login-form"
          ref="loginForm"
        >
          <el-form-item prop="userCode">
            <el-input
              v-model="loginForm.userCode"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              type="passWord"
              v-model="loginForm.passWord"
              prefix-icon="el-icon-c-scale-to-original"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <div style="margin-bottom: 30px">
            <el-checkbox v-model="saveAccount">
              <span style="color: #455a74">记住用户名</span>
            </el-checkbox>
          </div>
          <el-form-item class="txr log mt5">
            <el-button
              type="primary"
              class="log-btn"
              @click="submit"
              >登录</el-button
            >
            <p style="color: #7b93a7; margin-top: 22px">
              还没有账号?
              <a>注册新账号</a>
            </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
const loginFormRules = {
  userCode: [
    { required: true, message: '用户名不能为空', trigger: 'change' },
    {
      min: 1,
      max: 15,
      message: '用户名不得多于15个字符',
      trigger: 'change'
    }
  ],
  passWord: [{ required: true, message: '密码不能为空', trigger: 'change' }],
};
// import userApi from '@/api/user';

export default {
  name: 'login',
  data() {
    return {
      saveAccount: true,
      loginForm: {},
      rules: loginFormRules,
    };
  },
  created() {
    this.$store.dispatch('user/logout');
    const userCode = localStorage.getItem('userCode');
    if (userCode) {
      this.loginForm.userCode = userCode || '';
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const formName = 'loginForm';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 800
          });
          if (this.saveAccount) {
            localStorage.setItem('userCode', this.loginForm.userCode);
          } else localStorage.setItem('userCode', '');
          this.$store.dispatch('user/login', {  } );
          this.$router.push('/home')
        }
        return null;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: linear-gradient(131deg, #e2eefa 0%, #f9faff 61%);
  overflow: hidden;
  .login-left {
    width: 65%;
    height: 100%;
    float: left;
    position: relative;
    .login-illustration {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 999px;
    }
  }
  .login-right {
    height: 100%;
    width: 35%;
    float: left;
    position: relative;
    .login-box {
      width: 350px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      .product-name {
        font-size: 36px;
        color: #455a74;
        line-height: 36px;
        .en-name {
          font-size: 16px;
          color: #0064c1;
          letter-spacing: 0;
        }
        .welcome-txt {
          font-size: 12px;
          color: #455a74;
          line-height: 14px;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        & > i,
        & > span {
          display: inline-block;
          vertical-align: bottom;
        }
        & > span {
          width: 230px;
          font-family: Arial;
        }
        & > p {
          font-size: 16px;
          color: #455a74;
          letter-spacing: 4px;
          line-height: 40px;
          text-indent: 7px;
        }
      }
      .verify-code {
        border: 1px solid rgba(123, 147, 167, 0.3);
        border-radius: 4px;
        width: 130px;
        height: 32px;
        box-sizing: border-box;
        cursor: pointer;
      }
      .el-form-item {
        margin-bottom: 17px;
        .el-form-item__content {
          line-height: 32px;
        }
      }
      .el-checkbox__label {
        padding-left: 7.5px;
      }
    }
    .log-btn {
      background-image: linear-gradient(-45deg, #47b2fb 0%, #2f95fa 100%);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
      border-radius: 4px;
      width: 100%;
      letter-spacing: 3px;
      font-size: 18px;
      height: 40px;
      color: white;
    }
  }
}
@media screen and (max-width: 1280px) {
  .login-box {
    left: 5%;
  }
}
.login-con {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.login-con {
  width: 100%;
  height: 100%;
}
.login-form {
  .el-form-item__content{
    width: 260px;
  }
}
</style>

