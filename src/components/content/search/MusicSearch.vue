<template>
  <div class="search" @mouseleave="leave()">
    <!-- 搜索框 -->
    <div class="search-item">
      <input
        type="text"
        class="mess"
        v-model="keywords"
        @focus="focus()"
        @keydown.enter="keyEnter()"
        placeholder="00:00 到点了"
      />
      <div class="search-icon" @click="keyEnter()">
        <img src="~assets/img/content/search.svg" alt="搜索" />
      </div>
    </div>

    <!-- 热搜 -->
    <hot-search 
      v-show="isShow"
      :searchlist="searchlist"
      @del="del"
      @recordClick="recordClick"
    />

    <!-- 搜索建议 -->
    <div class="suggest" v-show="isSuggest">
      <div class="top">
        搜索
        <span>"{{ keywords }}"</span> 相关的结果>
      </div>
      <dl>
        <!-- 头部 -->
        <dt>
          <div class="icon">
            <img src="~assets/img/leftmenu/music-line.svg" alt="" />
          </div>
          <div class="tit">单曲</div>
        </dt>
        <dd
          v-for="(item, index) in sugSongs"
          :key="index + 'song'"
          @click="enterSearch(item.name)"
        >
          {{ item.name }}——{{ item.artists[0].name }}
        </dd>
        <dt>
          <div class="icon">
            <img src="~assets/img/content/profile-o.svg" alt />
          </div>
          <div class="tit">歌手</div>
        </dt>
        <dd
          v-for="(item, index) in sugArtist"
          :key="index"
          @click="enterArtist(item)"
        >
          {{ item.name }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import HotSearch from "./HotSearch"
import { _Suggest } from "network/search";
export default {
  name: "MusicSearch",
  data() {
    return {
      // 历史搜索记录
      searchlist: ["What are you afraid of", "Numb", "XXXTENTACION"],
      // 热搜框展示
      isShow: false,
      // 搜索建议框展示
      isSuggest: false,
      // 关键字
      keywords: "",
      // 搜索建议歌曲和歌手
      sugSongs: [],
      sugArtist: [],
    };
  },
  components: {
    HotSearch,
  },
  watch: {
    keywords() {
      if (this.keywords != "") {
        this.isSuggest = true;
        this.isShow = false;
        this.suggest();
      }
      else{
          this.isShow=true
          this.isSuggest=false
      }
    },
  },
  methods: {
    //  搜索框聚焦时显示热搜
    focus() {
      this.isShow = true;
    },
    // 鼠标移出时取消热搜或搜索建议框的显示
    leave() {
      this.isShow = false;
      this.isSuggest = false;
    },
    // 删除历史搜索记录
    del() {
      this.searchlist = [];
    },
    // 搜索事件---------------------------
    // 点击搜索按钮
    keyEnter() {
      // 若按回车和点击搜索按钮时,无结果则返回
      if (this.keywords == "" || this.keywords == null) {
        return;
      }
      this.$router.push("/search/" + this.keywords);
      this.searchlist.unshift(this.keywords);
      this.keywords = "";
      this.isSuggest = false;
      this.isShow = false;
    },
    // 历史搜索记录点击
    recordClick(index) {
      this.$router.push("/search/" + this.searchlist[index]);
      this.isShow = false;
    },
    // 搜索结果建议点击
    enterSearch(name) {
      this.$router.push("/search/" + name);
      this.isSuggest = false;
    },
    // 搜索歌手点击
    enterArtist(artist) {
      this.$router.push({
        path: "/artist",
        query: {
          artist: artist,
        },
      });
      this.$router.commit("addArtist", artist);
    },
    // --------------------------

    // 获取搜索建议关键词
    suggest() {
      _Suggest(this.keywords).then((res) => {
        this.sugSongs = res.data.result.songs;
        this.sugArtist = res.data.result.artists;
      });
    },
  },
};
</script>

<style scoped>
.search {
  /* height:55px; */
  height: 100%; 
  width: 230px;
  margin-left: 100px;
  display: inline-block;
  position: relative;
}
.search-item {
  line-height: 55px;
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  background-color: #fff;
}
/* 搜索框 */
.mess {
  outline-style: none;
  color: #333;
  line-height: 16px;
  background: transparent;
  position: absolute;
  width: 80%;
  height: 100%;
  padding: 0px 10px;
  border: #f6f6f6;
  border-radius: 10px;
}
.search-icon {
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: -2px;
}
.suggest {
  width: 400px;
  background-color: #2d2f33;
  position: absolute;
  top: 55px;
  z-index: 4;
  padding: 10px;
  color: #828385;
}
.top {
  font-size: 13px;
}
.top span {
  color: #2e6bb0;
}
dl {
  width: 100%;
  font-size: 13px;
}
dl dt {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding: 5px 8px;
  background-color: #303236;
}
dl dd {
  padding: 5px 31px;
}
dd:hover{
    background: #2a2c30;
}
.icon{
    width:16px;
    height:16px;
}
.icon img{
    width: 100%;
}
.tit{
    margin-left: 8px;
    color: #dcdde4;
}
</style>