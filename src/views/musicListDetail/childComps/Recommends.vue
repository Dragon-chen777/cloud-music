<template>
  <div class="recommend">
    <div class="desc">
      <div class="language">
        <textarea
          cols="30"
          rows="10"
          @keydown.enter="pushCommend()"
          v-model="content"
        ></textarea>
      </div>
      <div class="sub" @click="pushCommend()">评论</div>
    </div>

    <!-- 用户评论 -->
    <div class="content">
      <p>精彩评论</p>
      <div class="item" v-for="(item, index) in recommends" :key="index">
        <!-- 头像 -->
        <div class="icon">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <!-- 评论 -->
        <div class="mess">
          <!-- 用户名 -->
          <div class="top">
            <span>{{ item.user.nickname }}:</span>
            <!-- 评论 -->
            {{ item.content }}
          </div>
          <!-- 格式化评论时间 -->
          <div class="bottom">{{ _formatDate(item.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "assets/common/tool";
import { _pushCommend } from "network/detail";
export default {
  name: "Recommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  id: {
    type: String,
    default() {
      return "";
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    _formatDate(data) {
      return formatDate(new Date(data), "yyyy年MM月dd日 hh:mm:ss");
    },
    pushCommend() {
      let cookie = this.$store.state.cookie;
      if (cookie !== "" && cookie !== null) {
        _pushCommend(cookie, this.id, this.content).then((res) => {
          if (res.data.code == 200) {
            this.$Message.success("评论成功");
          } else {
            this.$Message.error("评论成功");
          }
        });
      } else {
        this.$Message.warning("请先登录");
      }
      this.content = "";
    },
  },
};
</script>

<style scoped>
.recommend {
  width: 100%;
  padding: 20px 0 10px 0;
}
/* 个人评论输入框 */
.recommend .desc {
  background: #1c1e23;
  padding: 10px;
  height: 105px;
}
.recommend .desc .language {
  height: 60px;
}
.language textarea {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  outline-style: none;
  background: #2b2c31;
  color: #fff;
  border: none;
}
.sub {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}

/* 用户评论区  */
.recommend .content {
  width: 100%;
  font-size: 13px;
  color: var(--color-text-tint);
}
.recommend .content p {
  padding-top: 30px;
  border: 1px solid #23262c;
}
.item{
  padding: 10px 0 10px 30px;
  border: 1px solid #23262c;
  display: flex;
  position: relative;
}
/* 头像 */
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.icon img{
  width: 100%;
  border-radius: 50%;
}
/* 评论 */
.mess{
  flex: 1;
}
.top{
  margin-bottom: 10px;
}
/* 用户名 */
.top span{
  color: #2e6bb0;
}
/* 评论时间 */
.bottom {
  position: absolute;
  bottom: 0px;
}
</style>