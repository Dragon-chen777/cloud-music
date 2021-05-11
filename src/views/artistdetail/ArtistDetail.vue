<template>
  <div class="artist-detail">
    <scroll ref="scroll" class="artist-scroll-c">
      <artist-base-info :desc="artistDesc" :base-info="artist" />
      <artist-bar ref="artistBar" :list="barlist" />
      <router-view></router-view>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import ArtistBaseInfo from "./childComps/ArtistBaseInfo";
import ArtistBar from "./childComps/ArtistBar";

import { _getArtistDesc } from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";
export default {
  name: "ArtistDetail",
  components: {
    Scroll,
    ArtistBaseInfo,
    ArtistBar,
  },
  data() {
    return {
      // 歌手
      artist: null,
      // 歌手详细信息
      artistDesc: null,
      barlist: ["专辑", "MV", "歌手详情", "相似歌手"],
    };
  },
  created() {
    this.artist = this.$store.state.artist;
  },
  watch: {
    artist(to, form) {
      if (to.id !== null) {
        _getArtistDesc(to.id).then((res) => {
          this.artistDesc = res.data.briefDesc;
        });
      }
    },
  },
};
</script>

<style scoped>
.artist-detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.artist-scroll-c {
  height: calc(100% - 59px);
}
</style>