<template>
  <van-config-provider :theme-vars="themeVars">
    <div id="my-app">
      <van-nav-bar
        :title="title"
        fixed
        z-index="999"
        :left-arrow="$store.state.showLeftArrow"
        @click-left="onClickLeft"
      />

      <router-view v-slot="{ Component }" class="main-content" :path="path" @showUserName="showUserName">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <van-tabbar v-model="active" route>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search"
          >搜索</van-tabbar-item
        >
        <van-tabbar-item replace to="/community" icon="chat-o"
          >社区</van-tabbar-item
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
import Player from '@/components/Player/Player'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ConfigProvider.name]: ConfigProvider,
    Player
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
  methods: {
    onClickLeft() {
      this.$router.back();
      this.$store.commit("showNavBarLeftIcon", false);
    },
    showUserName(username){
      this.title = username
    }
  },
  watch: {
    $route() {
      this.title = this.$route.meta.title;
    },
  },
};
</script>

<style lang="less">
#my-app {
  .main-content {
    padding: 46px 0 50px;
  }
}
</style>
