<template>
  <van-config-provider :theme-vars="themeVars">
    <div id="my-app">
      <van-nav-bar :title="title" fixed z-index="999" />

      <router-view v-slot="{ Component }" class="main-content" :path="path">
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
    </div>
  </van-config-provider>
</template>

<script>
import { NavBar, Tabbar, TabbarItem, ConfigProvider } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ConfigProvider.name]: ConfigProvider,
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
      },
    };
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
