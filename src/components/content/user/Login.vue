<template>
  <div class="login">
    <div class="back">
      <!-- 关闭 -->
      <div class="x" @click="hiddenLogin()">
        <img src="~assets/img/user/x.svg" />
      </div>
      <div class="phoneImg">
        <img src="~assets/img/user/phone.svg" />
      </div>
    </div>
    <!-- 表单 -->
    <div class="main">
      <div>
        <!-- 手机号 -->
        <div class="from-item">
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="请输入手机号..."
            required
            v-model="phone"
            @blur="phoneVerify()"
          />
          <p>{{ phoneMessage }}</p>
        </div>
        <!-- 密码 -->
        <div class="from-item">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            v-model="password"
          />
          <p>{{ pswMessage }}</p>
        </div>
        <!-- 登录 -->
        <div class="from-item">
          <input type="submit" value="登录" class="log" @click="login()" />
        </div>
        <!-- 注册 -->
        <div class="from-item">
          <div class="register">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _phoneVerify, _login } from "network/user/userVerify";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      phoneMessage: "",
      password: "",
      pswMessage: "",
    };
  },
  methods: {
    //  关闭登录页面
    hiddenLogin() {
      this.$store.commit("hiddenLogin");
    },
    // 登录
    login() {
      _login(this.phone, this.password).then((res) => {
        if (res.data.code != 200) {
          this.pswMessage = "密码错误";
        } else {
          this.$store.commit("addUser", res.data);
          this.hiddenLogin();
          this.$bus.$emit("pullResource", res.data.cookie);
        }
      });
    },
    // 手机号码验证
    phoneVerify() {
      if (this.phone == "") {
        this.phoneMessage = "请输入手机号";
        return;
      } else {
        // res.data.exist=1 已存在此账号
        _phoneVerify(this.phone).then((res) => {
          if (res.data.exist != 1) {
            this.phoneMessage = "手机号错误";
          } else {
            this.phoneMessage = "";
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 400px;
  height: 560px;
  position: relative;
  border-radius: 10px;
  box-shadow:0 5px 5px #999;
  z-index: 999;
  top: 0;
  background-color: #fafafa;
}
.back {
  width: 100%;
  height: 30%;
  position: relative;
  margin-bottom: 45px;
}
.x {
  cursor: pointer;
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
}
.x img {
  width: 100%;
}
.back .phoneImg {
  width: 58px;
  height: 102px;
  position: absolute;
  left: 0;
  top: 80px;
  right: 50px;
  bottom: 0;
  margin: auto;
}
.son img {
  width: 100%;
}
.from-item {
  width: 60%;
  margin: 0 auto ;
  padding: 10px 0 10px 10px;
  color: red;
}
input {
  width: 200px;
  height: 2em;
  padding-left: 5px;
}
input:not(.log):focus{
    border: 1px solid skyblue;
    outline: none;
}
P{
    font-size: 13px;
}
.log{
    cursor: pointer;
    background-color: red;
    color: #fff;
    height: 40px;
    border: 0;
    font-size: 18px;
    border-radius: 10px;
}
.log:focus{
    outline: none;
}
.log:hover{
  background: rgba(255, 0, 0, 0.602);
}
.log:active{
    transform: scale(.985);
}

.register{
    color: #333;
    text-align: center;
    margin-right: 35px;
}
</style>