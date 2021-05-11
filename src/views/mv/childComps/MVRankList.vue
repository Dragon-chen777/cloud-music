<template>
  <div class="mv-rank" v-show="topMv.length != 0">
    <div class="rank-item" v-for="index in topMv.length" :key="index">
      <div class="wrap" v-if="index % 2 == 0">
        <!-- 奇数 -->
        <div class="left">
          <div class="number">{{ index - 1 }}</div>
          <div class="mv"><rank-item :item="topMv[index - 2]" /></div>
        </div>
        <!-- 偶数 -->
        <div class="right">
          <div class="number">{{ index }}</div>
          <div class="mv"><rank-item :item="topMv[index - 1]" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RankItem from "./RankItem";
export default {
  name: "MVRankList",
  components: {
    RankItem,
  },
  props: {
    topMv: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.mv-rank {
  width: 100%;
}
.rank-item {
  width: 100%;
  margin-top: 10px;
}
.wrap {
  width: 100%;
  display: flex;
  align-items: center;
}
.wrap .left,
.wrap .right {
  flex: 1;
  display: flex;
  align-items: center;
}
.number{
    width: 30px;
    text-align: center;
}
.mv{
    flex: 1;
}
</style>