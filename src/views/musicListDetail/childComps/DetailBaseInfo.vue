<template>
  <div class="base" v-if="baseInfo != null">
    <div class="title" :title="baseInfo.name">
      <img :src="baseInfo.img" alt="" />
    </div>
    <div class="content">
      <!-- 歌单名 播放量 歌曲数 -->
      <div class="top">
        <span class="icon">歌单</span>
        <span>{{ baseInfo.name }}</span>
        <div class="right">
          <table>
            <tr>
              <td>
                歌曲
                <br />
                <div class="dataHighLight">{{ baseInfo.trackCount }}</div>
              </td>
              <td>
                播放量
                <br />
                <div class="dataHighLight">{{ baseInfo.playCount }}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 全部播放 收藏 分享 -->
      <div class="center">
        <div class="allPlay" @click="allPlay" title="播放全部">
          <img src="~assets/img/playmusic/bofang.svg" alt="" />
          播放全部
        </div>
        <div class="sub" title="收藏">
          <img src="~assets/img/detail/add.svg" alt />
          收藏({{ baseInfo.subscribedCount }})
        </div>
        <div class="share" title="分享">
          <img src="~assets/img/detail/share.svg" alt />
          分享({{ baseInfo.shareCount }})
        </div>
      </div>
      <!-- 标签 歌单描述 -->
      <div class="desc">
        <div class="label">
          标签：<span>{{ baseInfo.tags }}</span>
        </div>
        <div class="desc-item">简介：{{ baseInfo.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseMixin } from "../baseMixin";
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [baseMixin],
};
</script>

<style scoped>
.base {
  width: 100%;
  display: flex;
}
.title {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 200px;
}
.title:hover::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.3);
}
.title img {
  border-radius: 8px;
  width: 100%;
}
.content {
  flex: 1;
  padding: 0 20px;
  position: relative;
}
.content .top span {
  font-size: 20px;
}
.content .top .icon {
  cursor: pointer;
  border: 1px solid red;
  border-radius: 4px;
  color: red;
  padding: 5px;
  font-size: 12px;
  margin-right: 10px;
  transition: all 0.1s ease-in-out;
}
.content .top .icon:hover {
  color: #fff;
  background-color: red;
  border: 1px solid #fff;
}
.top .right {
  height: 30px;
  float: right;
}
.right td {
  text-align: center;
  font-size: 12px;
  padding: 5px;
  color: #ababb4;
}
.right td .dataHighLight{
  color: rgb(233, 48, 48);
}
.center {
  padding-top: 40px;
  display: flex;
  align-items: center;
}
.center div {
  padding: 5px 10px;
  background-color: #484849;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.center .allPlay {
  background: #cd2929;
}
.center div:hover {
  background-color: #484849c4;
}
.center .allPlay:hover {
  background: #cd2929d3;
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
}
.desc {
  position: absolute;
  bottom: 0;
  color: #dedde4;
}
.desc div {
  padding: 5px 0;
}
.desc span {
  color: #2e6bb0;
}
.desc .desc-item {
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>