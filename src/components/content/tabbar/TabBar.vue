  <template>
  <div class="tabbar">
    <!-- Logo -->
    <div class="logo">
      <img
        class="applogo"
        src="~assets/img/content/logo.png"
        @click="backHome()"
      />
      <div class="title" @click="backHome()">NO <b> x </b>ONE 音乐</div>
      <div class="back" @click="back()">
        <img src="~assets/img/content/back.svg" alt="" />
      </div>
    </div>
    <!-- 音乐搜索 -->
    <music-search />
    <div class="content">
      <!-- 用户信息 -->
      <div class="login" @click="showLogin()">
        <div class="profile">
          <!-- <img src="~assets/img/content/logo.svg" alt=""> -->
          <img :src="getImage()" alt="" />
        </div>
        <div>{{ getUserName() }}</div>
      </div>
      <!-- 界面控制按钮 -->
      <div class="right">
        <div>
          <a href="#" title="最小化">
            <img src="~assets/img/content/min.svg" alt="最小化" />
          </a>
        </div>
        <div>
          <a href="#" title="还原">
            <img src="~assets/img/content/reset.svg" alt="还原" />
          </a>
        </div>
        <div>
          <a href="#" title="退出">
            <img src="~assets/img/content/x.svg" alt="退出" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicSearch from "../search/MusicSearch"
export default {
  name: "TabBar",
  components: {
    MusicSearch,
  },
  data() {
    return {
      image: "",
    };
  },
  methods: {
    // 用户头像
    getImage() {
      this.image =
        this.$store.state.user && this.$store.state.user.profile.avatarUrl;
      return this.image;
    },
    // 用户昵称
    getUserName() {
      return this.$store.state.user?this.$store.state.user.profile.nickname:'未登录'
    },
    showLogin() {
      this.$store.commit("showLogin");
    },
    backHome() {
      if (this.$route.path == "/discover") {
        return;
      } else {
        this.$router.push("/discover");
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.tabbar {
  height: 55px;
  width: 100%;
  background-color:#212122;
  }
.logo {
  cursor: pointer;
  height: 100%;
  width: 15%;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
  position: relative;
}
.applogo {
  width: 40px;
}
.title {
  font-size: 16px;
  margin-left: 10px;
  color: rgb(5, 255, 238);
  text-shadow: 2px 1px 2px rgb(5, 255, 243);
}
.title b {
  vertical-align: 1px;
  font-weight: 900;
  color: rgb(5, 255, 242);
}
.back {
  display: inline-block;
  height: 26px;
  position: absolute;
  right: 5px;
  opacity: 0.6;
}
.back:hover {
  opacity: 1;
}
.back img {
  height: 100% !important;
}
.content {
  float: right;
  height: 100%;
}
.login {
  cursor: pointer;
  height: 100%;
  float: left;
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.profile {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
}
.profile img {
  width: 100%;
  border-radius: 50%;
}
.logo img {
  margin: 0 10px;
  height: 60%;
}
.right {
  height: 100%;
  display: flex;
  align-items: center;
}
.right div {
  flex: 1;
  margin-right: 15px;
  opacity: 0.6;
}
.right div:hover {
  opacity: 1;
}
.right div img {
  width: 22px;
}
</style>