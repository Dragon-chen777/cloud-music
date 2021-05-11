<template>
  <div class="song">
    <dd
      v-for="(item, index) in songList"
      :key="index"
      @click="enterDetail(index)"
    >
      <div>
        <img :src="item.coverImgUrl" alt="" />
      </div>
      {{ item.name }}
    </dd>
  </div>
</template>

<script>
export default {
  name: "MySongList",
  data() {
    return {
      songList: this.$store.state.songList,
    };
  },
  methods: {
    enterDetail(index) {
      this.$router.push(
        "/musiclistdetail/" +
          this.songList[index].id +
          "/" +
          new Date().getTime()
      );
    },
  },
};
</script>

<style scoped>
.song dd {
  width: 100%;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  padding: 5px 15px;
  font-size: 14px;
  opacity: 0.6;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 5px;
}
.song dd div {
  margin-top: 10px;
  margin-right: 10px;
}
.song dd img {
  border-radius: 3px;
  width: 30px;
  height: 30px;
}
.song dd:hover {
  opacity: 1;
  background: #26282c;
}
</style>