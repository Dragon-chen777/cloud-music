<template>
  <transition name="slide">
    <div class="player" v-if="music !== null && lyric !== null">
      <scroll
        class="player-scroll"
        ref="scroll"
        :pull-up-load="true"
        @pullingUp="pullingUp()"
      >
        <div class="play-content">
          <div class="left">
            <!-- 音乐碟控件图片 -->
            <div class="play-bar-support">
              <img src="~assets/img/playmusic/play-bar-support.png" alt />
            </div>
            <!-- 音乐碟控件图片 -->

            <div class="play-bar" :class="{ bar: !isPlay }">
              <img
                src="~assets/img/playmusic/play-bar.png"
                class="play-bar"
                alt
              />
            </div>
            <!-- 歌曲封面 -->
            <div class="music-pic" :class="{ rotate: isPlay }">
              <div class="img-warp" title="你瞅啥??? 快把你的臭手拿开！！！">
                <img :src="music.pic" alt />
              </div>
            </div>
          </div>

          <!-- 歌曲信息展示 -->
          <div class="right">
            <!-- 歌曲标题 -->
            <div class="top">
              <h2>
                <span>{{ music.title }}</span><br>
                <span class="singer">肖宇晨</span>
              </h2>
            </div>
            <!-- 歌词 -->
            <div class="lyric">
              <lyric :lyric="lyric" ref="playerLyric" />
            </div>
          </div>

          <div class="clear"></div>
        </div>
        <!-- 留言 -->
        <div class="play-bottom">
          <recommends :recommends="recommends" />
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Lyric from "./Lyric";
import Recommends from "views/musicListDetail/childComps/Recommends";
import { _musicRecommend } from "network/detail";

export default {
  components: { Scroll, Lyric, Recommends },
  name: "Player",
  props: {
    music: {
      type: Object,
      default() {
        return {};
      },
    },
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      isPlay: false,
      recommends: [],
      limit: 20,
      page: 1,
    };
  },
  watch: {
    lyric() {
      if (this.$refs.playerLyric.$refs.scroll != null) {
        this.$refs.playerLyric.$refs.scroll.scrollTo(0, 0, 0);
      }
      // 获取音乐评论
      _musicRecommend(this.music.id, this.limit).then((res) => {
        this.recommends = res.data.comments;
      });
    },
  },
  methods: {
    pullingUp() {
      this.musicRecommend();
    },
    musicRecommend() {
      _musicRecommend(this.music.id, this.limit * this.page).then((res) => {
        this.recommends = res.data.comments;
        this.page++;
        this.$refs.scroll.finishPullUp();
        console.log("musicRecommend");
      });
    },
  },
};
</script>

<style scoped>
.player {
  width: 100%;
  height: calc(100vh - 59px - 54px);
  position: absolute;
  top: calc(59px + 54px - 100vh);
  padding: 20px 15%;
  background: linear-gradient(-45deg, #333540, #070708, #333540);
}
.player-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.play-content {
  width: 100%;
  height: 405px;
  position: relative;
}
.play-bottom {
  width: 100%;
  height: 35%;
  margin-top: -10px;
  padding: 0 5%;
}

/* 音乐碟样式 */
.left {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
  overflow: hidden;
}
/* 控件头部 */
.play-bar-support {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 3px #fff;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: -8px;
  margin: auto;
}
.play-bar-support img {
  width: 100%;
}
/* 控件体 */
.play-bar {
  width: 80px;
  height: 172px;
  position: absolute;
  left: calc(50% - 22px);
  top: -5px;
  z-index: 1;
}
/* 控件体动画 根据是否播放音乐判断 */
.bar {
  top: 10px;
  transform-origin: 0 0;
  transform: rotate(-25deg);
  transition: all 0.3s;
}
/* 歌曲封面 */
.music-pic {
  width: 270px;
  height: 270px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  margin: auto;
}
/* .img-warp {
  width: 100%;
  border: 5px solid #fff;
  border-radius: 50%;
} */
.img-warp img {
  cursor: pointer;
  border: 5px solid #fff;
  width: 100%;
  border-radius: 50%;
}
.rotate {
  animation: rotate 20s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.right{
  width: 50%;
  height: 100%;
  float: left;
}
.clear{
  clear: both;
}
.top{
  /* background-color: #bfa; */
  color: #d5d5d6;
  font-weight: 300;
  padding: 10px 0;
}
.top h2 span{
  margin-left: -8%;
}

.lyric{
  height: calc(100% - 55px);
  color: #5e6062;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
  transform: none;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
</style>

