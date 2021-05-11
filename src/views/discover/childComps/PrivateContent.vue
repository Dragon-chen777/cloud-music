<template>
  <!-- 当有数据才展示 -->
  <div class="private" v-if="pri != null">
    <p>{{ pri.name }}</p>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in pri.result"
        :key="index"
        @click="playMV(item.id)"
      >
        <div class="loco">
          <img src="~assets/img/leftmenu/shiping.svg" alt @load="priImgLoad" />
        </div>
        <div class="item-cover">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="bottom">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgLoadMixin } from "assets/common/mixin";

export default {
  name: "PrivateContent",
  props: {
    pri: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [imgLoadMixin],
  methods: {
    priImgLoad() {
      if (this.imgCount == this.pri.result.length) {
        this.$emit("priImgLoad");
      } else {
        this.imgCount++;
      }
    },
    playMV(id) {
      this.$router.push("/playMV/" + id);
    },
  },
};
</script>

<style scoped>
.private {
  width: 100%;
  padding: 20px 0;
}
p {
  font-size: 18px;
  font-weight: 600;
}
.content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  cursor: pointer;
  position: relative;
  width: 30%;
  overflow: hidden;
}
.item .item-cover{
    position: relative;
    width: 100%;
}
.item img {

  width: 100%;
}
.item .item-cover:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.212);
}
.bottom {
  font-size: 16px;
}
.loco {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loco img {
  width: 20px;
  border: 50%;
}
</style>