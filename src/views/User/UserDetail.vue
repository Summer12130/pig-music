<template>
  <div class="user-detail">
    <div
      class="user-info"
      :style="{
        backgroundImage: `url(${backgroundUrl})`,
      }"
    >
      <div class="avatar">
        <van-image height="100" width="100" round :src="avatar"></van-image>
        <div class="tag-info">
          <p class="tag">
            <span>{{ followeds }}</span
            ><br />
            <span>粉丝</span>
          </p>
          <p class="tag">
            <span>{{ follows }}</span
            ><br />
            <span>关注</span>
          </p>
          <p class="tag">
            <span>Lv.{{ level }}</span
            ><br />
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
    <van-sticky :offset-top="50" @change="showName">
      <div class="show-name"></div>
    </van-sticky>
    <div class="details">
      <van-tabs v-model:active="active" swipeable sticky offset-top="46">
        <van-tab title="主页">
          <user-profile :profile="userDetail"></user-profile>
        </van-tab>
        <van-tab title="动态">
          <user-moments></user-moments>
        </van-tab>
        <van-tab title="播客">
          <user-podcasting></user-podcasting>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { userDetailAPI } from "@/services";
import { Sticky, Tab, Tabs, Toast } from "vant";
import UserProfile from "@/components/User/UserProfile";
import UserMoments from "@/components/User/UserMoments";
import UserPodcasting from "@/components/User/UserPodcasting";
import { mapMutations } from "vuex";
export default {
  name: "UserDetail",
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Sticky.name]: Sticky,
    UserProfile,
    UserMoments,
    UserPodcasting,
  },
  data() {
    return {
      active: "",
      uid: "",
      userDetail: {},
    };
  },
  methods: {
    editUserInfo() {
      Toast("修改成功");
    },
    showName() {
      this.setNavTitle(this.userDetail.profile.nickname);
    },
    ...mapMutations({
      setNavTitle: "SET_NAV_TITLE",
    }),
  },
  computed: {
    avatar() {
      return this.userDetail?.profile?.avatarUrl || "";
    },
    backgroundUrl() {
      return this.userDetail?.profile?.backgroundUrl || "";
    },
    follows() {
      return this.userDetail?.profile?.follows || 0;
    },
    followeds() {
      return this.userDetail?.profile?.followeds || 0;
    },
    level() {
      return this.userDetail?.level || 0;
    },
  },
  async created() {
    this.uid = this.$route.query.uid;
    let { data } = await userDetailAPI({ uid: this.uid });
    if (data.code === 200) {
      this.userDetail = data;
    }
  },
  async activated() {
    if (this.userDetail.profile) {
      this.uid = this.$route.query.uid;
      let { data } = await userDetailAPI({ uid: this.uid });
      if (data.code === 200) {
        this.userDetail = data;
      }
    }
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
