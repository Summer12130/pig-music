<template>
  <van-config-provider :theme-vars="themeVars">
    <div id="my-app">
      <van-nav-bar
        :title="navTitle"
        fixed
        z-index="999"
        :left-arrow="showLeftArrow"
        @click-left="onClickLeft"
      />

      <router-view
        v-slot="{ Component }"
        class="main-content"
        :path="path"
        @changeCurrentPath="changeCurrentPath"
      >
        <transition name="fade" mode="out-in" appear>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>

      <van-tabbar v-model="active" route v-show="showTabBar">
        <van-tabbar-item replace :to="currentPath" icon="home-o"
          >首页</van-tabbar-item
        >
        <van-tabbar-item replace to="/community" icon="chat-o"
          >社区</van-tabbar-item
        >
        <van-tabbar-item replace to="/search" icon="search"
          >搜索</van-tabbar-item
        >
        <van-tabbar-item replace to="/user" icon="contact"
          >我的</van-tabbar-item
        >
      </van-tabbar>
      <player></player>
    </div>
  </van-config-provider>
</template>

<script>
import { NavBar, Tabbar, TabbarItem, ConfigProvider } from "vant";
import Player from "@/components/Player/Player";
import { mapGetters, mapMutations } from "vuex";
import { loginStatusAPI } from "@/services";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ConfigProvider.name]: ConfigProvider,
    Player,
  },
  data() {
    return {
      title: "首页",
      active: "home",
      path: "/home/recommend",
      currentPath: "/home/recommend",
      themeVars: {
        navBarTextColor: "#FFB4A2",
        navBarBackgroundColor: "#FFB4A2",
        tabBarBackgroundColor: "#B5838D",
        cardBackgroundColor: "var(--van-gray-3)",
        cardFontSize: ".15rem",
      },
    };
  },
  computed: {
    ...mapGetters(["showLeftArrow", "navTitle", "showTabBar", "isLogin"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    changeCurrentPath(path) {
      this.currentPath = path;
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
      setNavTitle: "SET_NAV_TITLE",
      setShowTabBar: "SET_SHOW_TABBAR",
      setLoginStatus: "SET_LOGIN_STATUS",
      setUserInfo: "SET_USER_INFO",
    }),
  },
  async created() {
    if (!this.isLogin) {
      let { data } = await loginStatusAPI();
      if (data.data.profile) {
        this.setLoginStatus(true);
        this.setUserInfo(data.data);
      } else {
        this.setLoginStatus(false);
      }
    }
  },
  watch: {
    $route() {
      const path = this.$route.path;
      this.setNavTitle(this.$route.meta.title);
      if (
        path.includes("/home") ||
        path.includes("/search") ||
        path === "/user"
      ) {
        this.setNavLeftArrow(false);
        this.setShowTabBar(true);
      }
    },
  },
};
</script>

<style lang="less">
#my-app {
  .main-content {
    padding: 46px 0 50px;
  }
  .fade-leave-active,
  .fade-enter-actice {
    transition: all 0.15s cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  .fade-leave-from,
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-to,
  .fade-enter-from {
    opacity: 0;
  }
}
</style>
