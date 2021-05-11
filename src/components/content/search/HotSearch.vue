<template>
  <div class="hot">
    <scroll ref="scroll" class="hot-scroll">
      <!-- 历史记录 -->
      <div class="record">
        <h3>
          搜索历史
          <div class="icon" @click="del">
            <!-- 删除图标 -->
            <img src="~assets/img/content/delete.svg" alt />
          </div>
        </h3>
        <!-- 历史搜索内容 -->
        <div class="record-content">
          <div
            class="search-item"
            v-for="(item, index) in searchlist"
            :key="index"
            @click="recordClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 热搜 -->
      <div class="hotlist">
        <h3>热搜榜</h3>
        <table>
          <tr
            v-for="(item, index) in hotlist"
            :key="index"
            @click="searchDetail(index)"
          >
            <!-- 前三关键字序号显示红色 -->
            <td :class="{ red: index <= 2 }">{{ setSerial(index) }}</td>
            <!-- 歌曲详细信息 -->
            <td>
              <div class="top">
                <div class="top-name">{{ item.searchWord }}</div>
                <div class="top-score">{{ item.score }}</div>
                <div class="top-url">
                  <img :src="item.iconUrl" />
                </div>
              </div>
              <div class="bottom">{{ item.content }}</div>
            </td>
          </tr>
        </table>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { _hotSearchDetail } from "network/search";
import { tableMixin } from "views/musicListDetail/childComps/tableMixin";
export default {
  name: "HotSearch",
  props: {
    // 历史搜索记录
    searchlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 热搜
      hotlist: [],
    };
  },
  components: { Scroll },
  mixins: [tableMixin], // 调用setSerial()
  created() {
    // 获取热搜
    _hotSearchDetail().then((res) => {
      this.hotlist = res.data.data;
    });
  },
  methods: {
    // 删除历史记录
    del() {
      this.$emit("del");
    },
    // 热搜搜索
    searchDetail(index) {
      this.$router.push("/search/" + this.hotlist[index].searchWord);
      this.$parent.isShow = false;
    },
    // 历史记录搜索
    recordClick(index) {
      this.$emit("recordClick", index);
    },
    // load() {
    //   this.$refs.scroll.refresh();
    // },
  },
};
</script>

<style scoped>
.hot {
  width: 400px;
  height: 530px;
  background-color: #2d2f33;
  color: #828385;
  position: absolute;
  top: 55px;
  z-index: 999;
  padding: 5px 20px 0 20px;
  /* overflow: auto; */
}
.hot-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.record h3 {
  height: 40px;
  line-height: 40px;
}
.record .icon {
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 10px;
  vertical-align: -2px;
}
.record-content {
  display: flex;
  flex-wrap: wrap;
}
.search-item {
  cursor: pointer;
  padding: 2px 12px;
  border-radius: 10px;
  margin: 5px 10px 0 0;
  border: 1px solid #828385;
}
.hotlist {
  margin-top: 30px;
}
.red {
  color: #dd3a3a;
}
.hotlist tr {
  cursor: pointer;
  height: 50px;
  font-size: 13px;
}
table {
  width: 100%;
}
tr td:nth-child(1) {
  width: 40px;
  font-size: 1.3em;
}
tr:hover {
  background-color: #2a2c30;
}
.top {
  display: flex;
  height: 25px;
}
.top div {
  margin-right: 5px;
}
.top img {
  height: 10px;
}
.top-name {
  color: #dcdde4;
  font-weight: 500;
}

</style>