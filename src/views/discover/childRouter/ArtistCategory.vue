<template>
  <div class="artist">
    <div class="category">
      <!-- 语种 -->
      <div class="area">
        语种：
        <div
          class="area-item"
          v-for="(item, index) in area"
          :key="index"
          @click="areaClick(index)"
          :class="{ action: areaIndex == index }"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 分类 -->
      <div class="type" v-if="type != null">
        分类：
        <div
          class="type-item"
          v-for="(item, index) in type"
          :key="index"
          @click="typeClick(index)"
          :class="{ action: typeIndex == index }"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 歌手列表 -->
      <scroll
        ref="scroll"
        class="artist-scroll"
        :pull-up-load="true"
        @pullingUp="pullingUp"
      >
        <artist-list :artist-list="artistlist" />
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import ArtistList from "../childComps/ArtistList";

import { _getArtist } from "network/discover";
import { imgLoad } from "./indexMixin";
import { debounce } from "assets/common/tool";
import { indexMixin } from "../../musicListDetail/indexMixin";
export default {
  name: "ArtistCategory",
  data() {
    return {
      // 语种
      areaIndex: 0,
      // 分类
      typeIndex: 0,
      // 每次请求的歌手数量
      limit: 30,
      // 歌手列表
      artistlist: [],
      // 翻页
      page: 1,
      area: [
        { value: -1, name: "全部" },
        { value: 7, name: "华语" },
        { value: 96, name: "欧美" },
        { value: 8, name: "日本" },
        { value: 16, name: "韩国" },
        { value: 0, name: "其他" },
      ],
      type: [
        { value: -1, name: "全部" },
        { value: 1, name: "男歌手" },
        { value: 2, name: "女歌手" },
        { value: 3, name: "乐队" },
      ],
    };
  },
  components: {
    Scroll,
    ArtistList,
  },
  mixins: [indexMixin],
  created() {
    this.getArtist();
  },
  methods: {
    areaClick(index) {
      this.areaIndex = index;
      this.getArtist();
    },
    typeClick(index) {
      this.typeIndex = index;
      this.getArtist();
    },
    // 上拉加载
    pullingUp() {
      debounce(this.getArtistPullUp(), 1000);
    },
    getArtistPullUp() {
      _getArtist(
        this.area[this.areaIndex].value,
        this.type[this.typeIndex].value,
        this.limit * this.page
      ).then((res) => {
        this.artistlist = res.data.artists;
        this.page++;
      });
    },
    getArtist() {
      _getArtist(
        this.area[this.areaIndex].value,
        this.type[this.typeIndex].value,
        this.limit * this.page
      ).then((res) => {
        this.artistlist = res.data.artists;
      });
    },
  },
};
</script>

<style scoped>
.artist {
  width: 100%;
  height: 100%;
}
.category {
  color: #828385;
}
.area,
.type {
  display: flex;
}
.type {
  margin-top: 10px;
}
.area-item,
.type-item {
  cursor: pointer;
  padding: 0 10px;
}
.action {
  color: #b82525;
}
.artist-scroll {
  height: calc(100% - 55px);
  overflow: hidden;
  /* margin-top: 10px; */
}
</style>