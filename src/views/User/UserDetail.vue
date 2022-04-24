<template>
  <div class="user-detail">
    <div class="user-info" :style="bgImageStyle" ref="bgImage">
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
            <span>{{ level }}</span
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
      <div class="filter" :style="filterStyle"></div>
    </div>

    <scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="details">
        <user-profile :profile="userDetail"></user-profile>
      </div>
    </scroll>
  </div>
</template>

<script>
import { userDetailAPI } from "@/services";
import { Sticky, Tab, Tabs, Toast } from "vant";
import UserProfile from "@/components/User/UserProfile";
import UserMoments from "@/components/User/UserMoments";
import { mapMutations } from "vuex";
import Scroll from "../../components/common/Scroll/Scroll.vue";
const RESERVED_HEIGHT = 0;
export default {
  name: "UserDetail",
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Sticky.name]: Sticky,
    UserProfile,
    UserMoments,
    Scroll,
  },
  data() {
    return {
      active: "",
      uid: "",
      userDetail: {},
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  methods: {
    editUserInfo() {
      Toast("修改成功");
    },
    showName(name) {
      this.setNavTitle(name);
    },
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    ...mapMutations({
      setNavTitle: "SET_NAV_TITLE",
    }),
  },
  computed: {
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "100%";
      let height = 0;
      let translateZ = 0;

      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
        this.showName(this.userDetail.profile.nickname);
      } else {
        this.showName("");
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.backgroundUrl})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      // const bottom = this.playlist.length ? "60px" : "0";
      return {
        top: `${this.imageHeight}px`,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    avatar() {
      return this.userDetail?.profile?.avatarUrl || "";
    },
    backgroundUrl() {
      return this.userDetail?.profile?.backgroundUrl || "";
    },
    follows() {
      return this.userDetail?.profile?.follows || "***";
    },
    followeds() {
      return this.userDetail?.profile?.followeds || "***";
    },
    level() {
      return "Lv." + this.userDetail?.level || "***";
    },
  },
  async created() {
    this.uid = this.$route.query.uid;
    let { data } = await userDetailAPI({ uid: this.uid });
    if (data.code === 200) {
      this.userDetail = data;
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
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
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;

    // padding: 0.15rem 0;
    .avatar {
      position: absolute;
      z-index: 10;
      top: 0.35rem;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      text-align: center;
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

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 20;
    .details {
      // padding: 20px 0;
      background: rgb(243, 244, 245);
    }
  }
}
</style>
