<template>
  <div class="mv-list" v-show="mvList.length != 0">
    <div
      class="mv-item"
      v-for="(item, index) in mvList"
      :key="index"
      @click="playMV(item.id)"
    >
      <!-- 播放量 -->
      <div class="count">
        <img src="~assets/img/leftmenu/shiping.svg" alt="" />
        <div class="play-count">{{ item.count }}</div>
      </div>
      <!-- MV封面 -->
      <div class="mv-cover" :title="item.name">
        <img :src="item.cover" alt="" />
      </div>
      <div class="desc">
        <p>{{ item.name }}</p>
        <span>{{ item.artist }}</span>
        <span v-show="item.artist == 'IU'"> (韦兴奇的老婆)</span>
        <span v-show="item.artist == 'G-Dragon'"> (韦兴奇，又名GD)</span>
        <span v-show="item.artist == 'BLACKPINK'"> (韦兴奇的女朋友们)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvItem",
  props: {
    mvList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playMV(id) {
      this.$router.push("/playmv/" + id);
    },
  },
};
</script>

<style scoped>
.mv-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mv-item {
  cursor: pointer;
  width: 230px;
  position: relative;
}
/* mv封面 */
.mv-item .mv-cover {
  width: 230px;
  position: relative;
}
.mv-item .mv-cover:hover::after {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.3) url("~assets/img/playmusic/bofang.svg") no-repeat center;
  background-size: 25%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mv-item img {
  border-radius: 5px;
  width: 100%;
}
/* mv标题 */
.mv-item p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #dcdde4;
}
/* mv歌手 */
.mv-item span {
  font-size: 14px;
  color: #828385;
}
/* mv播放量 */
.mv-item .count {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 80px;
  height: 20px;
  padding: 3px 5px;
  background: rgba(0, 0, 0, 0.25);
}
.mv-item .count img {
  height: 100%;
}
</style>