<template>
  <div class="newSongs">
    <div class="top">最新音乐</div>
    <!-- 内容区 -->
    <div class="content">
      <!-- 各歌曲项目 -->
      <div
        class="item"
        v-for="(item, index) in songList"
        :key="index"
        @dblclick="playMusic(index)"
      >
        <!-- 序号 -->
        <div class="number">{{ index + 1 }}</div>

        <div class="title">
          <!-- 音乐封面 -->
          <img :src="item.picUrl" alt="" @load="newSongImgLoad" />
          <!-- 播放图标 -->
          <div class="icon">
            <img src="~assets/img/playmusic/bofang.svg" alt="" />
          </div>
        </div>
        <!-- 歌曲名 -->
        <div class="mess">
          <div>{{ item.name }}</div>
          <br />
          <!-- 歌曲出品公司 -->
          <div class="bottom">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
    <!-- <ul></ul> -->
  </div>
</template>

<script>
import { imgLoadMixin } from "assets/common/mixin";
export default {
  name: "newSongs",
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [imgLoadMixin],
  methods: {
    newSongImgLoad() {
      if (this.imgCount == this.songList.length) {
        this.$emit("newSongImgLoad");
      } else {
        this.imgCount++;
      }
    },
    playMusic(index) {
      this.$emit("playMusic", index);
    },
  },
};
</script>

<style scoped>
.newSongs {
  width: 100%;
  height: 100px;
}
.top {
  font-size: 20px;
  font-weight: 600;
  padding: 0 0 10px 15px;
  border-bottom: 1px solid #b8b6b6;
}
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  cursor: pointer;
  /* background-color: #bfa; */
  padding: 10px 10px;
  width: 45%;
  height: 80px;
  display: flex;
}
.item:hover{
    background-color:rgba(100, 100, 100 , 0.5);
}
.number {
  height: 80px;
  width: 40px;
  text-align: center;
  line-height: 70px;
  font-size: 18px;
}
.title {
  position: relative;
  height: 100%;
}
.title img {
  height: 100%;
}
.icon {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  /* 居中 */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.mess {
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  position: relative;
}
.mess .bottom {
  position: absolute;
  bottom: 0;
}
ul{
  width: 100%;
  height: 500px;
}
</style>