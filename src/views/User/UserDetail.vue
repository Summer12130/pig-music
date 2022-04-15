<template>
  <div class="user-detail">
    <div class="user-info" :style="{ backgroundImage: `url(${imageUrl})` }">
      <div class="avatar">
        <van-image
          height="100"
          width="100"
          round
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftx29%2F08151627444787039.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652600735&t=a32dbdabc31555777b190f38a753a0ac"
          v-if="this.$store.state.isLogin"
        ></van-image>
        <van-image
          height="100"
          width="100"
          round
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftx29%2F08151627444787039.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652600735&t=a32dbdabc31555777b190f38a753a0ac"
          v-if="!this.$store.state.isLogin"
        ></van-image>
        <div class="tag-info">
          <p class="tag">
            <span>5</span><br />
            <span>粉丝</span>
          </p>
          <p class="tag">
            <span>9</span><br />
            <span>关注</span>
          </p>
          <p class="tag">
            <span>Lv.8</span><br />
            <span>等级</span>
          </p>
        </div>
        <div class="edit-info">
          <van-button class="edit-btn" @touchstart="editUserInfo"
            >编辑资料</van-button
          >
        </div>
      </div>
    </div>
    <div class="details">
      <van-tabs v-model:active="active" swipeable sticky offset-top="46">
        <van-tab  title="主页">
          <user-profile></user-profile>
        </van-tab>
        <van-tab  title="动态">
          <user-moments></user-moments>
        </van-tab>
        <van-tab  title="播客">
          <user-podcasting></user-podcasting>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Toast } from "vant";
import UserProfile from '@/components/User/UserProfile'
import UserMoments from '@/components/User/UserMoments'
import UserPodcasting from '@/components/User/UserPodcasting'
export default {
  name: "UserDetail",
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    UserProfile,
    UserMoments,
    UserPodcasting
  },
  data() {
    return {
      imageUrl:
        "https://p4.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
      active: "",
    };
  },
  methods: {
    editUserInfo() {
      Toast("修改成功");
    },
  },
  async created() {
    this.$emit("showUserName", "你好小思大人");
  },
  activated() {
    // this.$emit("showUserName", "你好小思大人");
  },
};
</script>

<style lang="less" scoped>
.user-detail {
  width: 100%;
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 100%;
    padding: 0.15rem 0;
    .avatar {
      text-align: center;
    }
    .tag-info {
      display: flex;
      justify-content: space-around;
      padding: 0.15rem;
      .tag {
        flex: 1;
        width: 0.95rem;
        font-size: 0.16rem;
        color: aliceblue;
      }
    }
    .edit-info {
      /deep/.edit-btn {
        width: 2.25rem;
        height: 0.18rem;
        font-size: 0.14rem;
        color: aliceblue;
        border-radius: 0.05rem;
        background-color: transparent;
      }
    }
  }
}
</style>
