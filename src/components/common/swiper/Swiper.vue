<template>
  <div class="swiper" ref="swiper" v-if="banner !== null">
    <!-- 上一张 -->
    <div class="left">
      <div class="pre">
        <img src="~assets/img/swiper/prev.svg" alt />
      </div>
    </div>
    <!-- 下一张 -->
    <div class="right">
      <div class="next">
        <img src="~assets/img/swiper/next.svg" alt />
      </div>
    </div>
    <!-- 图片容器 -->
    <div class="imgBox">
      <ul>
        <li class="list1">
          <img :src="banner[0].imageUrl" alt />
        </li>
        <li class="list2">
          <img :src="banner[1].imageUrl" alt />
        </li>
        <li class="list3">
          <img :src="banner[2].imageUrl" alt />
        </li>
        <li class="list4">
          <img :src="banner[3].imageUrl" alt />
        </li>
        <li class="list5">
          <img :src="banner[4].imageUrl" alt />
        </li>
        <li class="list6">
          <img :src="banner[5].imageUrl" alt />
        </li>
      </ul>
    </div>
    <!-- 图片底部导航条 -->
    <div class="lineBar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
import { _Swiper } from "./indexSwiper";
export default {
  name: "Swiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // 组件内数据发生改变并重新渲染时,会触发updated
  updated() {
    if (this.$refs.swiper != null) {
      _Swiper(this.$refs.swiper);
    }
  },
};
</script>
<style scoped>
.swiper {
  /* background-color: #fff; */
  cursor: pointer;
  width: 100%;
  height: 210px;
  margin: 0px auto;
  overflow: hidden;
  position: relative;
  padding-top: 15px;
}
.imgBox {
  width: 100%;
}

.imgBox ul {
  position: relative;
  list-style-type: none;
}

.imgBox li {
  position: absolute;
  width: 50%;
}
.imgBox li img {
  width: 100%;
  border-radius: 10px;
}
.lineBar {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 5px;
  margin: auto;
}

.lineBar span {
  margin: 40px 5px 0;
  width: 70px;
  height: 4px;
  display: inline-block;
  border-radius: 2px;
  background: #fff;
  cursor: pointer;
}
.lineBar span:hover{
background-color: rgba(126, 210, 243, 0.445);
}

.list1 {
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list2 {
  transform: translateX(50%)  scale(1.1) translateY(-2%);
  z-index: 2;
  opacity: 1;
}

.list3 {
  transform: translateX(100%) ;
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list4 {
  transform: translateX(200%) ;
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list5 {
  transform: translateX(250%);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}

.list6 {
  transform: translateX(300%);
  transform-origin: 0% 100%;
  z-index: 0;
  opacity: 0.5;
}
[class*="list"] {
  transition: transform  .5s;
}

.lineBar .action {
  background: skyblue;
}

.pre,
.next {
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}
.pre {
  left: 10px;
}
.next {
  right: 10px;
}

.pre img,
.next img {
  width: 100%;
  margin-top: 3px;
}

.left {
  width: 250px;
  height: 100%;
  float: left;
  position: relative;
  z-index: 1;
}

.right {
  width: 250px;
  height: 100%;
  float: right;
  position: relative;
  z-index: 1;
}
</style>
