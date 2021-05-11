<template>
  <div class="search-list">
    <scroll class="search-scroll">
      <!-- 头部提示 -->
      <div class="title" v-if="this.key != '' && this.musiclist.length != 0">
        搜索
        <span>"{{ key }}"</span>，找到 <span>{{ this.musiclist.length }}</span
        >首单曲
      </div>
      <!-- 导航条控制歌曲版块和歌手版块的切换 -->
      <div class="bar">
        <div
          class="bar-item"
          v-for="(item, index) in list"
          :key="index"
          :class="{ action: currentIndex == index }"
          @click="barClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 歌曲版块 -->
      <music-item
        :musiclist="musiclist"
        @musicItemClick="musicItemClick"
        v-show="isShow == 'music'"
      />
      <!-- 歌手版块 -->
      <artist-item :artistslist="artistslist" v-show="isShow == 'artist'" />
      <ul></ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import MusicItem from "views/musicListDetail/childComps/MusicItem";
import ArtistItem from "./childComps/ArtistItem";

import { _getSongsDetail, songDetail } from "network/detail";
import { _Search } from "network/search";

import { distinct } from "assets/common/tool"; //去重

import { indexMixin } from "views/musicListDetail/indexMixin";

export default {
  name: "SearchList",
  data() {
    return {
      key: "",
      // 歌手结果
      artistslist: [],
      // 搜索歌曲结果ids 通过_getSongsDetail(ids)来获取对应歌曲的详细信息
      mlist: [],
      // 搜索歌曲详细信息  包含id 歌曲名name 歌手song 专辑名album 封面路径pic 发布时间time 但是不包含播放路径!(需要_getmusicUrl(id)去获取播放路径)
      musiclist: [],
      // 导航条切换版块
      list: ["单曲", "歌手"],
      // 当前播放歌曲索引
      currentIndex: 0,
      // 控制单曲和歌手版块的显示切换
      isShow: "music",
    };
  },
  components: {
    Scroll,
    MusicItem,
    ArtistItem,
  },
  mixins: [indexMixin],
  created() {
    // 从路径中获取用户输入的关键字
    this.key = this.$route.params.key;
    if (this.key != null && this.key != "") {
      _Search(this.key).then((res) => {
        let list = res.data.result.songs;
        for (let i in list) {
          this.artistslist.push(list[i].artists[0]);
          // 保存搜索歌曲ids
          this.mlist.push(list[i].id);
          // 到了末尾
          if (i == list.length - 1) {
            // 发送ids获取歌曲详细信息
            for (let i of this.mlist) {
              _getSongsDetail(i).then((res) => {
                let song = new songDetail(res.data.songs);
                this.musiclist.push(song);
              });
            }
            this.artistslist = distinct(this.artistslist);
          }
        }
      });
    }
  },
  methods: {
    // 导航条切换版块
    barClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.isShow = "music";
          break;

        case 1:
          this.isShow = "artist";
          break;
      }
    },
    // 播放音乐
    musicItemClick(index) {
      this.PlayMusic(index); // views/musicListDetail/indexMixin.js
    },
  },
};
</script>

<style scoped>
.search-list {
  width: 100%;
  height: 100%;
  padding: 10px 40px;
  overflow: auto;
}
.search-scroll {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.title span {
  color: #2e6bb0;
  padding: 0 10px;
}
.bar {
  width: 100%;
  height: 49px;
  /* background-color: #bfa; */
  line-height: 49px;
  display: flex;
  border-bottom: 1px solid #1c1e23;
  margin-bottom: 15px;
}
.bar-item {
  padding: 0 20px;
}
.action {
  color: #b82525;
  border-bottom: 3px solid #b82525;
}
ul {
  height: 200px;
  width: 10px;
}
</style>