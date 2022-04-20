<template>
  <div class="search">
    <van-search
      v-model="keywords"
      input-align="center"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @input="keywordsChange"
      left-icon=""
      shape="round"
    >
      <template #action>
        <div @click="onClickButton"><van-icon name="search"></van-icon></div>
      </template>
    </van-search>
    <div class="search-wrapper">
      <van-loading
        color="#1989fa"
        vertical
        v-if="isLoading"
        class="search-loading"
      />
      <div class="search-content" v-else>
        <van-tabs
          v-model:active="active"
          swipeable
          v-if="tabs.length && keywords"
        >
          <van-tab v-for="(tab, index) in tabs" :key="index">
            <template #title>
              <van-icon :name="tab.icon" />{{ tab.title }}</template
            >
            <van-cell-group inset>
              <van-cell
                v-for="data in tabsData[tab.name]"
                :title="data.name"
                :key="data.id"
                @click="clickCell(data, tab.title)"
              />
            </van-cell-group>
          </van-tab>
        </van-tabs>

        <transition name="van-slide-up" mode="out-in">
          <div class="hot-keyword-wrapper" v-if="!keywords">
            <van-tag
              plain
              type="primary"
              v-for="hot in hots"
              :key="hot.first"
              class="hot-tag"
              size="large"
              @click="tagClick"
            >
              {{ hot.first }}
            </van-tag>
          </div>
        </transition>
        <transition name="van-slide-up" mode="out-in">
          <van-empty image-size="1rem" description="暂无数据" v-if="isEmpty" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchSuggestListAPI,
  hotKeyWordsAPI,
  musicUrlAPI,
  musicDetailAPI,
  musicLyricAPI,
} from "@/services";
import { Empty, Search, Tab, Tabs, Toast } from "vant";
import { mapActions } from "vuex";

export default {
  name: "Search",
  components: {
    [Search.name]: Search,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Empty.name]: Empty,
  },
  data() {
    return {
      keywords: "",
      isLoading: false,
      isEmpty: false,
      active: "",
      tabsData: {},
      tabsList: [],
      hots: [],
    };
  },
  computed: {
    tabs() {
      return this.tabsList.map((tab) => {
        switch (tab) {
          case "songs":
            return {
              title: "歌曲",
              icon: "music",
              name: "songs",
            };
          case "artists":
            return {
              title: "歌手",
              icon: "music",
              name: "artists",
            };
          case "albums":
            return {
              title: "专辑",
              icon: "music",
              name: "albums",
            };
          case "playlists":
            return {
              title: "歌单",
              icon: "music",
              name: "playlists",
            };
          default:
            return {
              title: "歌曲",
              icon: "music",
              name: "songs",
            };
        }
      });
    },
  },
  methods: {
    onClickButton() {
      this.onSearch();
    },
    onSearch() {
      if (!this.keywords.length) {
        Toast("请输入您要搜索的内容!");
        return;
      }
      this.isLoading = true;
      searchSuggestListAPI({ keywords: this.keywords })
        .then((result) => {
          let { data } = result;
          if (data.code === 200) {
            this.isEmpty = false;
            this.tabsList = data?.result?.order || [];
            this.tabsData = data.result;
            setTimeout(() => {
              this.isLoading = false;
            }, 600);
            if (!this.tabsList.length) this.isEmpty = true;
          } else {
            Toast("搜索有误😟");
            this.isEmpty = true;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          Toast("您的网络不佳😟");
        });
    },
    tagClick(e) {
      this.keywords = e.target.innerText;
      this.onSearch();
    },
    clickCell(song, tag) {
      if (tag === "歌曲") {
        this.playMusic(song);
      }
    },
    keywordsChange() {
      this.isEmpty = false;
    },
    async playMusic(song) {
      const music = { song, name: song.name };
      let { data: url } = await musicUrlAPI({ id: song.id });
      let { data: detail } = await musicDetailAPI({ ids: song.id });
      let { data: lyric } = await musicLyricAPI({ id: song.id });
      if (url.code === 200) {
        music.url = url?.data[0]?.url;
        music.duration = music.song.duration / 1000;
        music.lyric = lyric?.lrc?.lyric;
        music.picUrl = detail?.songs[0]?.al?.picUrl;
        this.selectPlay({ music, musicId: music.id });
      } else {
        music.url = "";
        this.selectPlay({ music, musicId: music.id });
      }
      console.log(music);
    },
    ...mapActions(["selectPlay"]),
  },
  async created() {
    let { data } = await hotKeyWordsAPI();
    if (data.code === 200) {
      this.hots = data?.result?.hots;
    } else {
      this.hots = [];
    }
  },
  watch: {
    keywords(nVal) {
      if (!nVal.length) {
        this.tabsList = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  .search-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .hot-keyword-wrapper {
    text-align: center;
    .hot-tag {
      margin: 0.05rem 0.13rem;
    }
  }
}
</style>
