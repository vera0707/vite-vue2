<template>
  <div class="login">
    <div class="login-left">
      <img src="@/assets/login_BG.svg" alt class="login-illustration" width="75%" />
    </div>
    <div class="login-right">
      <div class="login-box">
        <div class="product-name vtc">
          <article>
            <img src="@/assets/login_logo.png" alt width="100%" />
          </article>
          <p>欢迎登录移动传输采集云平台</p>
        </div>
        <el-form
          class="login-form"
          @submit.native="submit"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item prop="userCode">
            <el-input
              v-model="loginForm.userCode"
              @input="$forceUpdate()"
              prefix-icon="uex-icon-user vtm"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              type="passWord"
              @input="$forceUpdate()"
              v-model="loginForm.passWord"
              prefix-icon="uex-icon-lock  vtm"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="vercode">
            <el-input
              style="width: 180px; margin-right: 6px"
              class="vtb"
              type="text"
              v-model="loginForm.vercode"
              prefix-icon="uex-icon-empower vtm"
              placeholder="请输入验证码"
              maxlength="4"
            ></el-input>
            <img
              class="verify-code vtb"
              :src="verifyCodeSrc"
              @click="changeVerify"
              alt="验证码"
            />
          </el-form-item>
          <div style="margin-bottom: 30px">
            <el-checkbox v-model="saveAccount">
              <span style="color: #455a74">记住用户名</span>
            </el-checkbox>
            <a class="fr" style="color: #7b93a7">忘记密码?</a>
          </div>
          <el-form-item class="txr log mt5">
            <el-button
              :loading="loading"
              type="primary"
              class="log-btn"
              native-type="submit"
              >登录</el-button
            >
            <p style="color: #7b93a7; margin-top: 22px">
              还没有账号?
              <a>注册新账号</a>
            </p>
          </el-form-item>
        </el-form>
      </div>
      <div class="copyright">
        <p>版本号:v1.0.20191224</p>
        <p>
          <span>A Product of AsiaInfo</span>
          <img class="ml5" width="57" height="18" src="@/assets/logo_copyright.svg" alt />
        </p>
        <p>Copyright © 2019 AsiaInfo Inc. All rights reserved.</p>
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
  vercode: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
};
import userApi from '@/api/user';

export default {
  name: 'login',
  data() {
    return {
      verifyCodeSrc: `/hb-weber/usermng/genVerificationCode?t=${Math.random() * 10000}`,
      saveAccount: true,
      loginForm: {},
      rules: loginFormRules,
      loading: false
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
    changeVerify() {
      this.verifyCodeSrc = `/hb-weber/usermng/genVerificationCode?t=${
        Math.random() * 10000
      }`;
    },
    submit(e) {
      e.preventDefault();
      const formName = 'loginForm';
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi
            .login({ ...this.loginForm })
            .then((res) => {
              if (res.CODE === 0) {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 800
                });
                if (this.saveAccount) {
                  localStorage.setItem('userCode', this.loginForm.userCode);
                } else localStorage.setItem('userCode', '');
                this.$store.dispatch('user/login', res.RESULT);
                this.$router.push('/home')
              } else {
                this.changeVerify();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
        return null;
      });
    }
  }
};
</script>
<style lang="scss">
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
    }
    .copyright {
      position: absolute;
      bottom: 30px;
      left: 10%;
      width: 320px;
      opacity: 0.58;
      font-size: 12px;
      color: #7b93a7;
      text-align: center;
      line-height: 20px;
      p,
      span {
        font-family: Arial;
        font-weight: 300;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  .login-box {
    left: 5%;
  }
  .copyright {
    left: 5%;
  }
}
.login-con {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
.login-form {
  .el-input--small .el-input__icon {
    font-size: 16px;
    opacity: 0.3;
    color: #7b93a7;
  }
  .el-form-item__error {
    padding-top: 3px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 48px;
  }
  .el-input__prefix {
    left: 12px;
    line-height: 30px;
  }
  .tit-label {
    color: #458cd7;
    position: absolute;
    bottom: -36px;
    width: 100%;
    text-align: center;
  }
  .el-input--prefix {
    &:after {
      content: '';
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
      height: 20px;
      width: 1px;
      opacity: 0.18;
      background: #7b93a7;
    }
  }
  .tit-label {
    color: #458cd7;
    position: absolute;
    bottom: -36px;
    width: 100%;
    text-align: center;
  }
  .el-input--prefix {
    &:after {
      content: '';
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
      height: 20px;
      width: 1px;
      opacity: 0.18;
      background: #7b93a7;
    }
  }
}
</style>
