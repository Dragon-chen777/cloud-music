<template>
  <div class="detail">
    <scroll class="detail-scroll">
      <!-- 歌单头部信息 -->
      <detail-base-info :baseInfo="baseInfo" @allPlay="PlayMusic" />
      <!-- 歌曲列表 评论 收藏者切换导航 -->
      <detail-bar :list="list" @detailBarClick="detailBarClick" />
      <music-item
        :musiclist="musiclist"
        v-show="isShow == 'music'"
        @musicItemClick="PlayMusic"
      />
      <recommends :recommends="recommends" :id="id" v-show="isShow=='recommend'" />
      <music-list-live v-show="isShow=='sub'" :subs="subs"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailBar from "./childComps/DetailBar";

import MusicItem from "./childComps/MusicItem";
import Recommends from "./childComps/Recommends";
import MusicListLive from "./childComps/MusicListLive";
import {
  _getMusicListDetail,
  baseInfo,
  _getSongsDetail,
  songDetail,
  _getRecommends,
  _getSub,
} from "network/detail";

import { indexMixin } from "./indexMixin";
export default {
  name: "MusicListDetail",
  components: { Scroll, DetailBaseInfo, DetailBar, MusicItem,Recommends,MusicListLive },
  data() {
    return {
      id: null,
      // 导航条
      list: [],
      // 歌单头部信息
      baseInfo: null,
      // 歌单详细信息
      musicListDetail: null,

      // 歌曲列表 评论 收藏者切换控制位
      isShow: "music",
      // 歌单歌曲
      musiclist: [],
      // 评论
      recommends: null,
      // 收藏者
      subs: null,
      //
      limit: 20,
    };
  },
  mixins: [indexMixin],
  created() {
    this.id = this.$route.params.id;
    _getMusicListDetail(this.id).then((res) => {
      // 获取歌单详细信息
      this.musicListDetail = res.data;
      // 获取歌单头部信息
      this.baseInfo = new baseInfo(this.musicListDetail.playlist);
      // 获取评论数
      let str = "评论(" + this.musicListDetail.playlist.commentCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];
      // 获取歌单歌曲
      for (let i of this.musicListDetail.playlist.trackIds) {
        _getSongsDetail(i.id).then((res) => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
        });
      }
      //获取评论
      _getRecommends(this.id, this.limit).then((res) => {
        this.recommends = res.data.comments;
      });
      _getSub(this.id, 30).then((res) => {
        this.subs = res.data.subscribers;
      });
    });
  },
  methods: {
    detailBarClick(str) {
      this.isShow = str;
    },
  },
};
</script>

<style scoped>
.detai{
  width: 100%;
  height: 100%;
  padding: 35px 35px 0 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;   
}
.detail-scroll {
  height: 100%;
}
</style>