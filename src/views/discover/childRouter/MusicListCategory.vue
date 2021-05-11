<template>
  <div class="category" v-if="tags.length !== 0">
    <div class="tags">
      <span>热门标签：</span>
      <!-- 歌单标签选择栏 -->
      <div
        class="tag-item"
        v-for="(item, index) in tags"
        :key="index"
        @click="tagClick(index)"
        :class="{ action: currentIndex == index }"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 推荐歌单 -->
    <scroll
      ref="scroll"
      class="category-scroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <music-list :personList="musicList" @imgLoad="imgLoad" />
    </scroll>
  </div>
</template>

<script>
import MusicList from "components/content/musiclist/MusicList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "assets/common/tool";
import { _getMusicListHot, _getHighquality } from "network/discover";
import { imgLoad } from "./indexMixin";
export default {
  name: "MusicListCategory",
  mixins: [imgLoad],
  data() {
    return {
      // 歌单标签
      tags: [],
      // 标签导航栏当前切换索引
      currentIndex: 0,
      // 每次请求的歌单数(上拉可以加载)
      limit: 24,

      page: 1,
      //  歌单
      musicList: [],
    };
  },
  components: {
    MusicList,
    Scroll,
  },
  created() {
    _getMusicListHot().then((res) => {
      this.tags = res.data.tags;
      this.getHighquality();
    });
  },
  methods: {
    getHighquality() {
      _getHighquality(
        this.tags[this.currentIndex].name,
        // 翻页
        this.limit * this.page
      ).then((res) => {
        this.musicList = res.data.playlists;
        this.page++;
        this.$refs.scroll.finishPullUp();
      });
    },
    tagClick(index) {
      this.currentIndex = index;
      this.getHighquality();
    },
    pullingUp() {
      debounce(this.getHighquality(), 1000);
    },
  },
};
</script>

<style scoped>
.category{
  width: 100%;
  height: 100%;
}
.category .tags{
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.tags .tag-item{

  padding: 0 10px;
  cursor: pointer;
  color: #828385;
}
.category-scroll {
  height: calc(100% - 30px);
  overflow: hidden;
}
.action {
  color: #b82525 !important;
}
</style>