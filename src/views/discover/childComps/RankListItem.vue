<template>
  <div
    class="rank-item"
    v-if="musicListDetail != null && rankId != null"
    @click="enterDetail()"
  >
    <!-- 标题 -->
    <div
      class="rank-item-top"
      :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }"
    >
      <div class="left">
        <div class="left-itemF">
          <i>{{ title[0] }}</i>
        </div>
        <div class="set">
          <div class="left-item">
            <i>{{ title[1] }}</i>
          </div>
          <div class="left-item">
            <i>{{ title[2] }}</i>
          </div>
          <div class="update">{{ time }}</div>
        </div>
        <div class="right">
          <img src="~assets/img/playmusic/xibofang.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="center">
      <table cellspacing="0">
        <tr
          v-for="(item, index) in musiclist"
          :key="index"
          :class="{ backColor: setBackColor(index) }"
        >
          <td>0{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.song }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {
  _getMusicListDetail,
  _getSongsDetail,
  songDetail,
} from "network/detail";
import { formatDate } from "assets/common/tool";
export default {
  name: "RankListItem",
  props: {
    rankId: {
      type: Number,
      default() {
        return 0;
      },
    },
    bgColor: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      musiclist: [],
      musicListDetail: null,
      time: null,
    };
  },
  mounted() {
    if (this.rankId != null) {
      _getMusicListDetail(this.rankId).then((res) => {
        this.musicListDetail = res.data;
        let time = this.musicListDetail.playlist.updateTime;
        this.time = formatDate(new Date(time), "MM月dd日");
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }
      });
    }
  },
  methods: {
    setBackColor(index) {
      return index % 2 != 0;
    },
    enterDetail() {
      this.$router.push(
        "/musiclistdetail/" + this.rankId + "/" + new Date().getTime()
      );
    },
  },
};
</script>

<style scoped>
.rank-item {
  cursor: pointer;
  width: 300px;
  height: 400px;
  margin-right: 15px;
}
/* 排行榜标题 */
.rank-item-top {
  width: 100%;
  height: 100px;
  position: relative;
}
.rank-item-top .left {
  width: 200px;
  padding: 10px 25px 0;
  display: flex;
  align-items: center;
}
.left-itemF {
  font-size: 54px;
  margin-right: 10px;
}
.set {
  display: flex;
  position: relative;
}
.update {
  width: 100px;
  position: absolute;
  left: 5px;
  top: 15px;
}
.left-item {
  font-size: 26px;
  margin-top: -20px;
}
.right {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.right img {
  width: 100%;
}
.center {
  width: 100%;
}
.center table {
  width: 100%;
  font-size: 14px;
  color: #575757;
}
.center tr {
  width: 100%;
  height: 30px;
  text-align: left;
}
.center tr:nth-child(1) td:first-child,
.center tr:nth-child(2) td:first-child,
.center tr:nth-child(3) td:first-child {
  color: #b82525;
}
.center tr:hover {
  background-color: #2c2e32;
  color: #fff;
}
.center tr td {
  border: none;
  position: relative;
}
.center tr td:nth-child(2) {
  color: #dcdde4;
}
.backColor {
  background: #1a1c20;
}
</style>