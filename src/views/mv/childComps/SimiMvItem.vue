<template>
  <div class="simi">
    <div
      class="simi-item"
      v-for="(item, index) in mvList"
      :key="index"
      @click="playMV(item.id)"
    >
      <div class="left">
        <div class="mv-cover" :title="item.name">
          <img :src="item.cover" alt="" />
        </div>
        <div class="count">
          <img src="~assets/img/leftmenu/shiping.svg" alt="" />
          <div class="play-count">{{ item.count }}</div>
        </div>
      </div>

      <div class="right">
        <div class="name">
          <span>MV</span>
          {{ item.name }}
        </div>
        <div class="artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimiMvItem",
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
      this.$router.replace("/playmv/" + id);
    },
  },
};
</script>

<style scoped>
.simi {
  width: 100%;
}
.simi-item {
  width: 100%;
  margin-top: 10px;
  display: flex;
}
.left {
  cursor: pointer;
  width: 150px;
  position: relative;
}
.left .mv-cover:hover::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3) url("~assets/img/playmusic/bofang.svg")
    no-repeat center;
  background-size: 25%;
}
.left .mv-cover img {
  border-radius: 5px;
  width: 100%;
}
.left .count {
  position: absolute;
  z-index: 1;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  height: 20px;
  padding: 3px 5px;
  background: rgba(0, 0, 0, 0.25);
}
.left .count img {
  height: 100%;
}
.right {
  flex: 1;
  padding-left: 10px;
}
.right span {
  padding: 1px;
  color: red;
  font-size: 13px;
  border: 1px solid red;
}
.artist {
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-an);
}
</style>