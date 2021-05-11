<template>
  <div class="daybase">
    <div class="head">
      <!-- 日期 -->
      <div class="newday">
        <div class="new">
          <p>{{ getDate }}</p>
          <div>{{ time }}</div>
        </div>
      </div>
      <!-- 描述 -->
      <div class="desc">
        <div class="left">
          <h2>每日歌曲推荐</h2>
          <p>根据你的音乐口味生成，每天6:00更新</p>
        </div>
        <!-- 播放 -->
        <div class="center">
          <div class="allPlay" @click="allPlay()" title="播放全部">
            <img src="~assets/img/playmusic/bofang.svg" alt="" />
            播放全部
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailMixin } from "assets/common/mixin"; //日期方法
import { baseMixin } from "../baseMixin"; // methods: allPlay $emit "allPlay"

export default {
  name: "DayBaseInfo",
  mixins: [detailMixin, baseMixin],
  methods: {
    allPlay() {
      this.$emit("allPlay");
    },
  },
};
</script>

<style scoped>
.daybase {
  width: 100%;
}
.head {
  width: 100%;
  display: flex;
}
.head .newday {
  display: inline-block;
  width: 140px;
  height: 140px;
}
.newday .new {
  padding: 10px;
  width: 125px;
  height: 125px;
  background-color: #fff;
  text-align: center;
}
.new div {
  font-size: 89px;
  color: #b82525;
  margin-top: -30px;
}
.new p {
  font-size: 24px;
  color: #727279;
}
.desc {
  height: 125px;
  background: linear-gradient(to right, #16181c, #19192b);
  flex: 1;
}
.desc .left {
  width: 60%;
  height: 80%;
  position: relative;
}
.left p {
  position: absolute;
  bottom: 20px;
  color: #828385;
}
.center .allPlay {
  width: 140px;
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  cursor: pointer;
  background: #cd2929;
}
.center .allPlay:hover {
  background: rgba(184, 37, 37, 0.986);
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
}
</style>