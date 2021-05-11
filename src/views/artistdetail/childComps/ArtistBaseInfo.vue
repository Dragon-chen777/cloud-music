<template>
  <div class="base" v-if="baseInfo != null">
    <div class="title" :title="baseInfo.name">
      <!-- 歌手帅照 -->
      <img :src="baseInfo.picUrl" alt="" />
    </div>
    <div class="content">
      <div class="top">
        <span class="icon">歌手</span>
        <span>{{ baseInfo.name }}</span>
        <span v-show="baseInfo.name == 'IU'"> (配偶：韦兴奇 )</span>
        <span v-show="baseInfo.name == 'G-Dragon'"> (韦兴奇，别名GD )</span>
        <div class="right">
          <table>
            <tr>
              <td>
                收藏
                <br />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="center">
        <div class="single" title="单曲数">
          <img src="~assets/img/leftmenu/music.svg" alt="" />
          单曲数：{{ baseInfo.musicSize }}
        </div>
        <div class="sub" title="专辑数">
          <img src="~assets/img/artist/album.svg" alt="" />
          专辑数：{{ baseInfo.albumSize }}
        </div>
      </div>
      <div class="desc">
        <div class="tags">
          个人介绍：
          <span>{{ desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    desc: {
      type: String,
      default() {
        return "";
      },
    },
  },
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
  height: 168px;
}
.title:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.title img {
  border-radius: 7px;
  width: 100%;
}
.base .content {
  flex: 1;
  padding: 0 20px;
  position: relative;
}
.top span {
  font-size: 20px;
}
.top span.icon {
  cursor: pointer;
  border: 1px solid red;
  border-radius: 5px;
  color: red;
  padding: 4px;
  font-size: 12px;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
}
.top span.icon:hover {
  background-color: red;
  border: 1px solid #fff;
  color: #fff;
}
.top .right {
  height: 30px;
  float: right;
}
.right td {
  text-align: center;
  font-size: 12px;
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
}
.center {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  height: 25%;
}
.center div {
  padding: 5px 10px;
  background: #25272b;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.center img {
  width: 18px;
  height: 18px;
  vertical-align: text-bottom;
}
.desc {
  position: absolute;
  max-height: 49px;
  bottom: 0;
  color: #dcdde4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.desc div {
  padding: 5px 0px;
}
.desc span {
  color: #2e6bb0;
}
</style>