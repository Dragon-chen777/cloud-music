<template>
  <div class="play-music" v-if="playList !== null">
    <!-- 纯享模式 -->
    <player
      v-show="isPlayerShow"
      ref="player"
      :music="playList[currentIndex]"
      :lyric="lyric"
    />

    <!-- 播放条左上方歌曲信息显示模块 -->
    <div class="top" v-show="playList[currentIndex]!= null">
      <!-- 歌曲封面(纯享模式入口) -->
      <div
        class="music-top-icon"
        @mouseenter="isShade = true"
        @mouseleave="isShade = false"
        @click="PlayerRouter()"
      >
        <img 
          class="imgCover"
          :src="playList[currentIndex]&&playList[currentIndex].pic"
          alt=""
        />
        <!-- 鼠标经过显示 -->
        <div class="music-max" v-show="isShade">
          <img src="~assets/img/playmusic/max.svg" alt="" />
        </div>
      </div>
      <!-- 歌曲标题和歌手 -->
      <div class="music-top-center">
        <div class="music-title">
          {{ playList[currentIndex] && playList[currentIndex].title }}
        </div>
        <div class="music-artist">
          {{ playList[currentIndex] && playList[currentIndex].artist }}
        </div>
      </div>
    </div>

    <!-- 播放音乐列表 -->
    <play-music-list
      class="play-music-list"
      v-show="isMusicList"
      :music-list="musicList"
    />

    <!-- 歌词 -->
    <lyric
      class="play-music-lyric"
      ref="lyric"
      :lyric="lyric"
      v-show="isLyric"
    />

    <!-- 播放器左边控制器 -->
    <div class="player-music-left">
      <!-- 上一首 -->
      <div class="pre" @click="preMusic()">
        <img src="~assets/img/playmusic/pre.png" alt />
      </div>
      <!-- 播放 -->
      <div class="play" @click="toggle()">
        <img src="~assets/img/playmusic/play.png" alt v-show="!isPlay" />
        <img src="~assets/img/playmusic/play2.png" alt v-show="isPlay" />
      </div>
      <!-- 下一首 -->
      <div class="netx" @click="nextMusic()">
        <img src="~assets/img/playmusic/next.png" alt />
      </div>
    </div>

    <!-- 播放器右边控制器 -->
    <div class="player-music-right" v-show="playList[currentIndex]!= null">
      <!-- 播放器 -->
      <audio
      :src="playList[currentIndex]&&playList[currentIndex].src"
        autoplay
        ref="audio"
        @timeupdate="audioTimeUpdate()"
        @pause="musicPause()"
        @ended="musicEnded()"
        @play="playLoad()"
        @playing="musicPlaying()"
        @error="musicErr()"
      ></audio>
      <!-- 进度条 -->
      <div class="music-pro">
        <div class="currenTime">{{ currentTime }}</div>
        <music-progress
          class="music-pro-progress"
          ref="music_pro"
          @childclick="setMusicCurrent"
        />
        <div class="totalTime">{{ duration }}</div>
      </div>
      <!-- 声音 -->
      <div class="volumn">
        <div class="volumn-icon" @click="toggleVolume()">
          <!-- 有声 -->
          <img src="~assets/img/playmusic/volumn.svg" title="声音" v-show="!isVolume" />
          <!-- 无声 -->
          <img
            src="~assets/img/playmusic/novolumn.svg"
            title="静音"
            class="vol-img"
            v-show="isVolume"
          />
        </div>
        <volume-progress ref="volum_pro" @childclick="setVolume" />
      </div>
      <!-- 音频控件图标 -->
      <div class="icon">
        <!-- 播放模式 -->
        <div class="schema" @click="toggleSchema()">
          <a href="#" title="顺序播放" v-show="schemaIndex == 0">
            <img src="~assets/img/playmusic/sunxubofang.svg" />
          </a>
          <a href="#" title="随机播放" v-show="schemaIndex == 1">
            <img src="~assets/img/playmusic/suijibofang.svg" />
          </a>
          <a href="#" title="单曲循环" v-show="schemaIndex == 2">
            <img src="~assets/img/playmusic/danquxunhuan.svg" />
          </a>
        </div>
        <!-- 歌词显示开关 -->
        <div class="music-lyric" @click="toggleLyric()">
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/lyric.svg" v-show="!isLyric" />
          </a>
          <a href="#" title="歌词">
            <img src="~assets/img/playmusic/lyric-click.svg" v-show="isLyric" />
          </a>
        </div>
        <!-- 播放列表显示开关 -->
        <div class="music-list" @click="toggleMusicList()">
          <a href="#" title="歌单">
            <img src="~assets/img/playmusic/list.svg" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayMusicList from "./PlayMusicList";
import Player from "./Player";
import Lyric from "./Lyric.vue";
import MusicProgress from "components/common/progress/Progress";
import VolumeProgress from "components/common/progress/Progress";

import { formatDate } from "assets/common/tool";
import { _getLyric,} from "network/detail";
export default {
  name: "PlayMusic",
  data() {
    return {
      // 显示底部播放器
      isPlayerShow: false,
      // 播放音乐列表
      playList: [],
      // 当前的播放歌曲索引
      currentIndex: 0,
      lyric: "妹妹你坐船头ohoh~,哥哥在岸上走,恩恩爱爱,纤绳荡悠悠~",
      // 显示打开纯享模式全屏图标
      isShade: false,
      // 显示音乐播放列表
      isMusicList: false,
      // 音乐播放列表
      musicList: [],
      // 歌曲在搜索中的路径
      path: "",

      // 播放器控制键
      // 播放
      isPlay: false,
      // 音量
      isVolume: false,
      // 歌词
      isLyric: false,
      // 播放模式
      schemaIndex: 0,
      // 歌曲播放时间
      currentTime: "00:00",
      // 歌曲总时长
      duration: "00:00",
    };
  },
  components: { Player, PlayMusicList, Lyric, MusicProgress, VolumeProgress },
  watch: {
    music() {
      if (this.$refs.audio != null) {
        this.$refs.audio.load();
      }
    },
  },
  mounted() {
    // 获取播放音乐列表及其他信息,并获得当前播放音乐的索引
      this.$bus.$on("playMusic", (playlist, index, path, musicList) => {
      this.playList = playlist;
      this.path = path;
      this.musicList = musicList;

      // ?? 原本就是从小到大排列啊
      this.playList = playlist.sort((a, b) => {
        return a.index - b.index;
      });

      this.setCurrentIndex(index);
    });
    // 若是从播放列表点击
    this.$bus.$on("PlayMusicListItem", (index) => {
      this.setCurrentIndex(index);
    });
  },
  methods: {
    // 把底部音乐播放条隐藏
    PlayerRouter() {
      this.isPlayerShow = !this.isPlayerShow;
      console.log(this.isPlayerShow);
    },
    // 设置当前播放音乐在歌单列表中的索引
    
    setCurrentIndex(index) {
      for (let i in this.playList) {
        // 这是传入的index是点击音乐索引位置,为什么不直接this.currentIndex = index
        if (this.playList[i].index == index) {
          this.currentIndex = i;
          break;
        }
      }
    },
    // 播放器状态-------------
    // 播放时间更新
    audioTimeUpdate() {
      if (this.$refs.audio != null) {
        // 播放时间格式化
        this.currentTime = formatDate(
          new Date(this.$refs.audio.currentTime * 1000),
          "mm:ss"
        );
        // 歌曲总时长格式化
        this.duration = formatDate(
          new Date(this.$refs.audio.duration * 1000),
          "mm:ss"
        );
        let scale = this.$refs.audio.currentTime / this.$refs.audio.duration;
        // 让进度条加载
        this.$refs.music_pro.setProgress(scale);
        // 歌词滚动
        if (this.$refs.audio.currentTime !== null) {
          this.$refs.lyric.scrollLyric(this.$refs.audio.currentTime);
          this.$refs.player.$refs.playerLyric.maxScroll(
            this.$refs.audio.currentTime
          );
        }
      }
    },
    // 播放器正在播放时获取歌词
    playLoad() {
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = res.data.lrc.lyric;
      });
    },
    // 暂停或者缓冲好已就绪时触发
    musicPlaying() {
      this.isPlay = true;
      this.$bus.$emit(
        "Playing",
        this.playList[this.currentIndex].index,
        this.path
      );
      if (this.$refs.player != null) {
        this.$refs.player.isPlay = true;
      }
    },
    // 暂停播放器时
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) {
        this.$refs.player.isPlay = false;
      }
    },
    // 播放出错时
    musicErr() {
      this.$Message.error("当前音频不可用");
      this.currentIndex++;
      console.log(this.playList);
    },
    // 播放结束时
    musicEnded() {
      switch (this.schemaIndex) {
        // 顺序播放
        case 0:
          this.currentIndex >= this.playList.length - 1
            ? 0
            : this.currentIndex++;
          break;
        // 随机播放
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length);
          break;
        // 单曲循环
        default:
          break;
      }
    },

    // 播放器控制键----------------
    // 播放键
    toggle() {
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    // 上一首
    preMusic() {
      this.currentIndex <= 0
        ? (this.currentIndex = this.playList.length - 1)
        : this.currentIndex--;
      this.$refs.audio.src = this.playList[this.currentIndex].scr;
    },
    // 下一首
    nextMusic() {
      this.currentIndex >= this.playList.length - 1
        ? (this.currentIndex = 0)
        : this.currentIndex++;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    // 播放模式键
    toggleSchema() {
      this.schemaIndex >= 2 ? (this.schemaIndex = 0) : this.schemaIndex++;
    },
    // 音量控制
    setVolume(scale) {
      this.$refs.audio.volume = scale;
    },
    // 播放进度条控制
    setMusicCurrent(scale) {
      this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
    },
    // 音量键
    toggleVolume() {
      this.isVolume = !this.isVolume;
      this.isVolume
        ? (this.$refs.audio.volume = 0.0)
        : ((this.$refs.audio.volume = 0.7),
          this.$refs.volume_pro && this.$refs.volume_pro.setProgress(0.8));
    },
    // 歌词显示键
    toggleLyric() {
      this.isLyric = !this.isLyric;
    },
    // 播放列表开关
    toggleMusicList() {
      this.isMusicList = !this.isMusicList;
    },
  },
};
</script>

<style scoped>
.play-music {
  width: 100%;
  height: 59px;
  background-color: #212124;
  position: relative;
  z-index: 99;
}

/* 左上角歌曲信息 */
.top {
  width: 15%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 59px;
  display: flex;
  background-color: #191b1f;
}
.music-top-icon {
  cursor: pointer;
  height: 100%;
}
.music-top-icon img {
  height: 100%;
  border-radius: 5px;
}

.music-max {
  position: relative;
  bottom: 64px;
  z-index: 4;
  width: 59px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.music-max img {
  opacity: 0.5;
}
.music-top-center {
  width: 100px;
  font: 14px;
  position: relative;
  left: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music-title {
  position: absolute;
  top: 0;
}
.music-artist {
  position: absolute;
  bottom: 0;
}

/* 播放音乐列表 */
.play-music-list {
  position: absolute;
  right: 0;
  bottom: 59px;
}

/* 播放器左边控制器 */
.player-music-left {
  display: flex;
  float: left;
  width: 15%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
.player-music-left div {
  cursor: pointer;
}
.player-music-left .play img {
  width: 55px;
  height: 55px;
}

/* 播放器右边控制器 */
.player-music-right {
  width: 85%;
  height: 100%;
  float: right;
}
/* 进度条 */
.player-music-right .music-pro {
  width: 70%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  text-align: center;
}
.music-pro .currentTime,
.music-pro .totalTime {
  width: 60px;
}
.music-pro .music-pro-progress {
  flex: 1;
}
/* 声音控件 */
.player-music-right .volumn {
  cursor: pointer;
  width: 10%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
}
.volumn-icon img {
  width: 15px;
  margin-right: 10px;
}
.vol-img {
  width: 21px !important;
}
/* 其他控件 */
.player-music-right .icon {
  padding: 0 20px;
  width: 20%;
  height: 100%;
  margin-top: 3px;
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 播放模式 */
.icon .schema {
  width: 30px;
}
.icon .schema img {
  width: 20px;
  height: 20px;
}
.icon .schema img:nth-child(2) {
  width: 18px;
  height: 18px;
}
/* 歌词显示开关 */
.icon .music-lyric {
  width: 20px;
}
.icon .music-lyric img {
  width: 100%;
}
/* 播放列表开关 */
.music-list {
  width: 20px;
}
.music-list img {
  width: 100%;
}
.play-music-lyric {
  width: 460px;
  height: 30px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 59px;
  z-index: 999;
  margin: auto;
}
</style>