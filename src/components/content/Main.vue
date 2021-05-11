<template>
  <div class="main">
    <!-- 加载动画 -->
    <loading v-show="$store.state.isloading" />

    <!-- 各路由跳转 -->
    <keep-alive include="AllMV">
      <router-view />
    </keep-alive>

    <!-- 登录框 -->
    <login class="login" v-show="$store.state.isShowLogin" />
  </div>
</template>

<script>
import Login from "./user/Login";
import Loading from "components/common/Loading";
export default {
  name: "Main",
  components: {
    Login,
    Loading,
  },
};
</script>

<style scoped>
.main { 
  width: calc(100% - 15%);
  height: calc(100% - 55px - 59px);
  margin-left: 15%;
  position: relative;
}
.login {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
