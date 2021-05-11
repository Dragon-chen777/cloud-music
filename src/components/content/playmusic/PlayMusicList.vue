<template>
  <div class="play-music-list" v-if="musicList!==null">
    <!-- 头部 -->
    <div class="top">
      <div class="title">播放列表</div>
      <!-- 关闭播放歌单显示 -->
      <div class="exist" @click="exist()">
        <img src="~assets/img/content/x.svg" alt="" />
      </div>
      <div class="clear"></div>
    </div>
    <!-- 播放歌单 -->
    <scroll
      class="play-music-list-scroll"
      ref="scroll"
      :scrollbar="{ fade: false }"
    >
      <div class="list">
        <music-item :musiclist="musicList" />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import MusicItem from "views/musicListDetail/childComps/MusicItem";
export default {
  name: "PlayMusicList",
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { Scroll, MusicItem },
  updated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    exist() {
      this.$parent.isMusicList = false;
    },
  },
};
</script>

<style scoped>
.play-music-list {
  width: 520px;
  height: 520px;
  background-color: #191b1f;
  box-shadow: 0 0 1px #fff;
}
.top {
  width: 100%;
  position: relative;
  background-color: #282a2f;
}
.top .title {
  width:  calc(100% - 30px);
  float: left;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.top .exist{
cursor: pointer;
width: 20px;
height: 20px;
margin: 2px 10px 0 0;
float: right;
}
.top .exist img {
  width: 100%;
}
.clear {
  clear: both;
}
.play-music-list-scroll {
  height: calc(100% - 22px);
  overflow: hidden;
}

</style>