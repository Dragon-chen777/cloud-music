<template>
  <Spin fix class="loading-fix" color="red">
    <Icon type="ios-loading" size="42" class="demo-spin-icon-load"></Icon>
    <div class="loading-font">Loading...</div>
  </Spin>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading-font{
    color: #fff;
    font-size: 24px;
}
.ivu-spin-text{
    color: #b82525;
}
.ivu-spin-fix{
    background: none !important;
}
.demo-spin-icon-load{
    color: #fff;
    animation:ani-demo-spin 1s linear infinite
}
@keyframes ani-demo-spin{
    from{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>