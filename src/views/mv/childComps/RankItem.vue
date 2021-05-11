<template>
  <div class="simi" v-if="item != null">
    <div class="simi-item" @click="playMV()">
      <div class="left">
        <div class="mv-cover" :title="item.name">
          <img :src="item.cover" alt="" />
        </div>
        <div class="count">
          <img src="~assets/img/leftmenu/shiping.svg" alt />
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
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    playMV() {
      this.$router.push("/playmv/" + this.item.id);
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
  display: flex;
  margin-top: 10px;
}
.left {
  width: 150px;
  position: relative;
}
.left .mv-cover {
  cursor: pointer;
  width: 100%;
  position: relative;
}
.left .mv-cover:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3) url("~assets/img/playmusic/bofang.svg")
    no-repeat center;
  background-size: 25%;
}
.left img {
  border-radius: 5px;
  width: 100%;
}
.left .count {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 3px 5px;
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
  font-size: 12px;
  border: 1px solid red;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}
.right span:hover {
  color: #fff;
  background: red;
  border: 1px solid #fff;
}
.artist {
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-an);
}
</style>