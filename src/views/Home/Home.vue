<template>
  <div class="home">
    <div class="home-tabs">
      <van-tabs
        v-model:active="active"
        title-active-color="#E5989B"
        @change="tabsChange"
      >
        <van-tab
          v-for="item in homeLists"
          :key="item.id"
          replace
          :to="item.path"
          :name="item.path"
        >
          <template #title>
            <van-icon :name="item.icon" />{{ item.name }}</template
          >
        </van-tab>
      </van-tabs>
    </div>
    <router-view
      v-slot="{ Component }"
      :home-recommend="recommendData"
      @toMusicPage="toMusicPage"
      @toAlbumsPage="toAlbumsPage"
      @toProgramPage="toProgramPage"
      @toDJPage="toDJPage"
      class="home-router-view"
    >
      <keep-alive>
        <transition name="van-slide-left">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import { Icon, Tab, Tabs } from "vant";
import { homeListAPI, homeDataAPI } from "@/services";

export default {
  name: "Home",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
  },
  data() {
    return {
      active: "",
      homeTitle: "新歌榜",
      homeLists: [],
      recommendData: {},
      currentPath: "",
    };
  },
  async created() {
    let { data } = await homeListAPI();
    console.log(data);
    if (data && data.length) {
      this.homeLists = data;
    } else {
      this.homeLists = [];
    }
    let { data: homeData } = await homeDataAPI();
    homeData = homeData.data;
    this.recommendData = {
      banners: homeData.blocks[0],
    };
    console.log(homeData, this.recommendData);
  },
  methods: {
    tabsChange(payload) {
      this.$router.replace(payload);
      this.currentPath = payload;
    },
    toMusicPage(payload) {
      this.active = payload;
    },
    toAlbumsPage(payload) {
      this.active = payload;
    },
    toProgramPage(payload) {
      this.active = payload;
    },
    toDJPage(payload) {
      this.active = payload;
    },
  },
  activated() {
    this.$router.replace(this.currentPath);
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  .home-tabs {
    position: sticky;
    top: 46px;
    z-index: 99;
  }
  .home-router-view {
    height: 100%;
  }
}
</style>
