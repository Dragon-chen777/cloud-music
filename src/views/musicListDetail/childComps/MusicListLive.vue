<template>
  <div class="live" v-if="subs != null">
    <div class="content">
      <div class="item" v-for="(item, index) in subs" :key="index">
        <div class="icon">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div>{{ item.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicListLive",
  props: {
    subs: {
      subs: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  },
};
</script>

<style scoped>
.live {
  width: 100%;
}
.live .content {
  display: flex;
  /* 换行 */
  flex-wrap: wrap;
}
.content .item {
  cursor: pointer;
  padding: 30px;
  text-align: center;
  font-size: 12px;
}
.item .icon {
  position: relative;
  width: 60px;
  height: 60px;
}
/* 背景罩 */
.item .icon:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}
.item img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>