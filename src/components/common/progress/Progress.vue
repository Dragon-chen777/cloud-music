<template>
  <div class="progress" @click="setProClick($event)">
    <!-- 进度条 -->
    <div class="pro-line" :style="{ width: proLine + 'px' }"></div>
    <!-- 进度条头部圆圈 -->
    <div
      class="pro-load"
      :style="{ transform: 'translateX(' + proLoad + 'px)' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  data() {
    return {
      proLine: 0,
      proLoad: 0,
      width: 0,
      offsetLeft: 0,
      scale: 0,
    };
  },
  methods: {
    //  把参数内部处理好 =>scale 发送给父组件
    setProClick(e) {
      this.setPro(e.clientX - this.$el.offsetLeft);
      this.scale = (this.proLine / this.$el.offsetWidth).toFixed(2);
      this.$emit("childclick", this.scale);
    },
    // 设置参数
    setPro(changeX) {
      this.proLine = changeX;
      this.proLoad = changeX;
    },
    setProgress(scale) {
      this.proLine = scale * this.$el.offsetWidth;
      this.proLoad = scale * this.$el.offsetWidth;
    },
  },
};
</script>

<style scoped>
.progress {
  width: 100%;
  height: 3px;
  border-radius: 2px;
  cursor: pointer;
  background: #454546;
  position: relative;
}
.progress .pro-line {
  width: 200px;
  height: 100%;
  background: #b82525;
}
.progress .pro-load {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  transform: translateX(50px);
  top: 0px;
  bottom: 0px;
  margin: auto;
}
.mess {
  height: 10px;
  background: #fff;
  margin-top: -60px;
}
</style>