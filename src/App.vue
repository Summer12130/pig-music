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

      <router-view v-slot="{ Component }" class="main-content" :path="path">
        <transition name="fade" mode="out-in" appear>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>

      <van-tabbar v-model="active" route v-show="showTabBar">
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search"
          >搜索</van-tabbar-item
        >
        <!-- <van-tabbar-item replace to="/community" icon="chat-o"
          >社区</van-tabbar-item
        > -->
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
    ...mapGetters(["showLeftArrow", "navTitle", "showTabBar"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
      this.setNavLeftArrow(false);
      this.setShowTabBar(true);
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
      setNavTitle: "SET_NAV_TITLE",
      setShowTabBar: "SET_SHOW_TABBAR",
    }),
  },
  watch: {
    $route() {
      this.setNavTitle(this.$route.meta.title);
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
