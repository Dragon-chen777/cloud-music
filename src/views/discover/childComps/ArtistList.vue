<template>
  <div class="musiclist">
    <div
      class="list-item"
      v-for="(item, index) in artistList"
      :key="index"
      @click="enterArtistDetail(item)"
      :title="item.name"
    >
      <div class="imgCover">
        <img :src="getImgUrl(item)" alt="" @load="imgLoad" />
      </div>
      <div class="tite">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { imgLoadMixin } from "assets/common/mixin";
export default {
  name: "MusicList",
  props: {
    artistList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [imgLoadMixin],
  methods: {
    getImgUrl(item) {
      return item.picUrl || item.coverImgUrl;
    },
    imgLoad() {
      if (this.imgCount == this.artistList.length) {
        this.$emit("imgLoad");
      }
      this.imgCount++;
    },
    // 点击进入歌手主页
    enterArtistDetail(artist) {
      this.$router.push({
        path: "/artist",
        query: {
          artist: artist,
        },
      });
      // ??
      this.$store.commit("addArtist", artist);
    },
  },
};
</script>

<style scoped>
.musiclist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.musiclist .list-item {
  cursor: pointer;
  position: relative;
  margin: 5px 6px;
  width: 150px;
  font-size: 14px;
  padding-bottom: 10px;
  text-align: center;
}
.musiclist .list-item .imgCover {
  position: relative;
}
.musiclist .list-item .imgCover:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.list-item img {
  border-radius: 5px;
  width: 100%;
}
</style>