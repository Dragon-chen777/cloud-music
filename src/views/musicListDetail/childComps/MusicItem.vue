<template>
  <div class="music" v-if="musiclist != null">
    <table cellspacing="0">
      <thead>
        <tr>
          <td></td>
          <td>操作</td>
          <td>音乐标题</td>
          <td>歌手</td>
          <td>专辑</td>
          <td>时长</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in musiclist"
          :key="index"
          :class="{ backColor: setBackColor(index) }"
          @dblclick="musicItemClick(index)"
        >  
        <!-- musicItemClick  若播放音乐列表显示 $emit PlayMusicListItem  否则 $emit musicItemClick -->
          <td :class="{ curFont: playIndex == index }">
            {{ setSerial(index) }}
            <!-- 正在播放图标 -->
            <div class="curPlay" v-show="playIndex == index">
              <img src="~assets/img/playmusic/currentplay.svg" alt="" />
            </div>
          </td>
          <!--下载和加入喜欢标记图标 -->
          <td>
            <img src="~assets/img/leftmenu/live.svg" alt="" class="live" />
            <img src="~assets/img/leftmenu/xiazai.svg" alt="" class="xiazai" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.album }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { tableMixin } from "./tableMixin"; //setSerial(index) setBackColor(index)  musicItemClick(index)
import { playMixin } from "../playMixin";
export default {
  name: "MusicItem",
  props: {
    // 搜索歌曲详细信息  包含id 歌曲名name 歌手song 专辑名album 封面路径pic 发布时间time 但是不包含播放路径!(需要_getmusicUrl(id)去获取播放路径)
    musiclist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [tableMixin, playMixin],
  // playMixin  (控制显示搜索结果中是否已有正在播放的歌曲)
  //  data() {
  //     return {
  //         playIndex:0.5,
  //     }
  // },
  // created() {
  //     this.$bus.$on("Playing", (index, path) => {
  //         if (this.$route.path==path) {
  //             this.vs=index
  //         }
  //     })
  // }
};
</script>

<style scoped>
.music {
  width: 100%;
}
.music table {
  width: 100%;
}
.music thead {
  color: #828385;
}
.music tr {
  height: 30px;
}
.music tr:hover {
  background-color: #2c2e32;
  color: #fff;
}
.music tr td {
  border: 1px solid #23262c;
  position: relative;
}
.music tbody {
  font-size: 14px;
  color: #575757;
}
.music tbody tr td {
  border: none;
}
.music tr td:nth-child(1) {
  width: 50px;
  text-align: center;
}
.music tr td:nth-child(2) {
  width: 80px;
}
.music tr td:nth-child(2) img {
  width: 20px;
  opacity: 0.6;
}
.music tr td .live {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.music tr td .xiazai {
  margin-left: 26px;
}
/* ???省略不了 */
.music tbody tr td:nth-child(3) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #dcdde4;
}
.music tr td:nth-child(4) {
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music tr td:nth-child(5) {
  width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.music tr td:nth-child(6) {
  width: 80px;
}
.backColor {
  background: #1a1c20;
}
</style>