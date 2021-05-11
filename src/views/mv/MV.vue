<template>
  <div class="mv">
    <scroll class="mv-scroll" ref="scroll">
      <!-- 最新MV -->
      <div class="new-mv">
        <div class="title">
          最新MV
          <div class="right" @click="allMv()">
            <span>更多</span>
            <img src="~assets/img/content/next.svg" alt />
          </div>
        </div>
        <mv-item :mv-list="mvList" />
      </div>

      <!-- MV排行榜 -->
      <div class="mv-rank">
        <div class="title">
          MV排行榜
          <div class="right" @click="allMv()">
            <span>更多</span>
            <img src="~assets/img/content/next.svg" alt />
          </div>
        </div>
        <mv-rank-list :top-mv="topMv" />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import MvItem from "./childComps/MvItem";
import MvRankList from "./childComps/MVRankList";

import { _getNewMV, MV, _getTopMv } from "network/mv";
export default {
  name: "MV",
  data() {
    return {
      limit: 8,
      mvList: [],
      topMv: [],
    };
  },
  components: {
    Scroll,
    MvItem,
    MvRankList,
  },
  created() {
    _getNewMV(this.limit).then((res) => {
      for (let item of res.data.data) {
        let mv = new MV(
          item.id,
          item.cover,
          item.name,
          item.artistName,
          item.playCount
        );
        this.mvList.push(mv);
      }
      _getTopMv().then((res) => {
        for (let item of res.data.data) {
          let mv = new MV(
            item.id,
            item.cover,
            item.name,
            item.artistName,
            item.playCount
          );
          this.topMv.push(mv);
        }
      });
    });
  },
  methods: {
    allMv() {
      this.$router.push("/allmv");
    },
  },
};
</script>

<style scoped>
.mv {
  width: 100%;
  height: 100%;
}
.mv-scroll {
  height: 100%;
  overflow: hidden;
}
.title {
  font-size: 20px;
  color: #dcdde4;
  padding: 5px 0px;
}
.title .right {
  cursor: pointer;
  height: 20px;
  font-size: 14px;
  color: var(--color-text-an);
  float: right;
}
.right:hover {
  color: #fff;
}
.right img {
  height: 100%;
  vertical-align: bottom;
}
.mv-rank{
  margin-top: 20px;
}
</style>