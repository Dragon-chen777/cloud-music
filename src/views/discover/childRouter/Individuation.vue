<template>
  <div class="individuation">
    <scroll ref="scroll" class="indici-scroll">
      <swiper class="swiper" :banner="banner" />
      <div class="recommend">推荐歌单 ></div>
      <music-list :personList="personalized" @imgLoad="imgLoad" />
      <private-content :pri="privateContent" @priImgLoad="priImgLoad" />
      <new-songs
        :songList="songList"
        @newSongImgLoad="newSongImgLoad"
        @playMusic="playMusic"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Swiper from "components/common/swiper/Swiper";

import MusicList from "components/content/musiclist/MusicList";
import PrivateContent from "views/discover/childComps/PrivateContent";
import newSongs from "views/discover/childComps/newSongs";
import {
  _getNewSong,
  _getPersonalized,
  _getPrivateContent,
  _getBanner,
  //     _getRecommendResource,
} from "network/discover";
import { _getSongsDetail, songDetail, _getMusicUrl } from "network/detail";
import { imgLoad } from "./indexMixin";
export default {
  name: "Individuation",
  data() {
    return {
      banner: null,
      // 控制显示歌单数目
      limit: 10,
      // 推荐歌单
      personalized: null,
      // 独家放送(入口列表)
      privateContent: null,
      // 新歌
      songList: null,
      // 播放列表
      musiclist: [],
    };
  },
  components: {
    Scroll,
    Swiper,

    MusicList,
    PrivateContent,
    newSongs,
  },
  mixins: [imgLoad], // this.$refs.scroll.refresh()
  created() {
    // 如果非游客登录显示15个推荐歌单,留首位给每日推荐歌单
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 9;
    }

    // 获取轮播图
    _getBanner().then((res) => {
      this.banner = res.data.banners.slice(0, 6);
    });
    // 获取推荐歌单
    _getPersonalized(this.limit).then((res) => {
      this.personalized = res.data.result;
    });
    // 独家放送(入口列表)
    _getPrivateContent().then((res) => {
      this.privateContent = res.data;
    });
    // 新歌
    _getNewSong().then((res) => {
      this.songList = res.data.result;
    });
  },
  methods: {
    // 监听图片加载 scroll
    priImgLoad() {
      this.$refs.scroll.refresh();
    },
    newSongImgLoad() {
      this.$refs.scroll.refresh();
    },
    playMusic(index) {
      // 清空上次播放列表
      console.log(index);
      this.musiclist = [];
      for (let i in this.songList) {
        _getSongsDetail(this.songList[i].id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
          // _getMusicUrl(song.id).then(res=>{
          //   console.log(res);
          // })
        });
      }
      for (let i in this.musiclist) {
        // console.log(this.musiclist[i]);
        // _getMusicUrl(this.musiclist[i].id).then(res=>{
        //   console.log(res);
        // })
      }
      console.log(this.musiclist);
      // 添加完后再播放
      this.$emit("playMusic", this.musiclist);
    },
  },
};
</script>

<style scoped>
.individuation {
  width: 100%;
  height: 100%;
}
.indici-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.swiper {
  margin-bottom: 10px;
}
.recommend {
  font-size: 18px;
  padding-bottom: 10px;
  padding-left: 5px;
  font-weight: 600;
}
</style>