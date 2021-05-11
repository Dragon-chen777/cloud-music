<template>
  <div class="musiclist">
    <!-- 每日歌曲推荐 -->
    <div
      class="list-item newday"
      v-show="isShow"
      @click="enterDayDetail()"
    >
      <div class="new">
        <p>{{ getDate }}</p>
        <div>{{ time }}</div>
      </div>
      <div class="title">每日歌曲推荐</div>
    </div>

    <!-- 其他歌单 -->
    <div
      class="list-item"
      v-for="(item, index) in personList"
      :key="index"
      @click="enterDetail(item)"
    >
      <!-- 歌单封面 -->
      <div class="musicListCover" :title="item.name">
        <img :src="getImgUrl(item)" alt="" @load="imgLoad" />
      </div>
      <!-- 标题 -->
      <div class="title">{{ item.name }}</div>
      <!-- 播放数 -->
      <div class="count">
        <div>
          <img src="~assets/img/content/erji.svg" alt="" />
          {{ item.playCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailMixin, imgLoadMixin } from "assets/common/mixin";
import { _getRecommendResource } from "network/discover";

export default {
  name: "MusicList",
  props: {
    personList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  // 引入组件复用的imgCount,time,date变量
  mixins: [imgLoadMixin, detailMixin],

  mounted() {
    // 非游客登录(cookie != "" || null),显示每日推荐
    if (this.$store.state.cookie != "" && this.$store.state.cookie != null) {
      this.isShow = true;
    }
    // ?
    this.$bus.$on("pullResource", (cookie) => {
      this.isShow = true;
    });
  },
  methods: {
    // 歌单封面地址
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
    // 监听图片加载,传递给父组件处理
    imgLoad() {
      if (this.imgCount == this.personList.length) {
        this.$emit("imgLoad");
      }
    },
    // 点击其他歌单 路由跳转 /musiclistdetail/:id/:Date().getTime()
    enterDetail(item) {
      this.$router.push(
        "/musiclistdetail/" +
         item.id +
          "/" +
          new Date().getTime()
      );
    },
    // 点击日常推荐 路由跳转 /daymusic
    enterDayDetail() {
      this.$router.push("/daymusic");
    },
  },
};
</script>

<style scoped>
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.musiclist .list-item {
  cursor: pointer;
  position: relative;
  margin: 5px 6px;
  width: 18%;
  padding-bottom: 10px;
  font-size: 16px;
}
.list-item .musicListCover {
  position: relative;
  width: 100%;
}
.list-item .musicListCover:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3) url("~assets/img/playmusic/bofang.svg")
    no-repeat center;
  background-size: 25%;
}
.list-item img {
  vertical-align: text-bottom;
  width: 100%;
  border-radius: 5px;
}
.list-item .title {
  position: relative;
}
.count {
  overflow: hidden;
  height: 0;
  width: 100%;
  font-size: 16px;
  /* height: 20px; */
  line-height: 35px;
  text-align: right;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0px 5px 5px
    linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.829));
  transition: height 0.1s ease-in-out;
}
.musiclist .list-item:hover .count {
  height: 35px;
}
.count img {
  display: inline-block;
  height: 10px;
  width: 10px;
}

.newday .new {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 178px;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  margin-bottom: 6px;
}
.new:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0,0,0,.3);
}
.new div {
  font-size: 89px;
  color: #b82525;
  margin-top: -20px;
}
.new p {
  font-size: 24px;
  color: #828394;
}
</style>