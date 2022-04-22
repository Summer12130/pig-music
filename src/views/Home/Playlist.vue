<template>
  <div class="playlist-container">
    <van-index-bar
      :index-list="indexList"
      :sticky-offset-top="90"
      v-if="!loading"
    >
      <template v-for="tag in playlistTags" :key="tag.id">
        <van-index-anchor :index="tag.name">{{ tag.name }}</van-index-anchor>
        <van-cell
          :title="playlist.name"
          v-for="playlist in showList(tag.name)"
          :key="playlist.id"
          center
          @click="toPlayList(playlist.id)"
        >
          <template #title class="custom-title">
            <van-image
              width="55"
              height="55"
              radius=".08rem"
              :src="playlist.coverImgUrl"
              lazy-load
            ></van-image>
          </template>
          <template #value class="playlist">
            <div class="playlist-info-wrapper">
              <p>{{ playlist.name }}</p>
              <p>{{ playlist.description }}</p>
            </div>
          </template>
        </van-cell>
      </template>
    </van-index-bar>
    <van-loading size="24px" vertical v-else class="loading-icon"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import { playlistTagsAPI, playlistDataAPI } from "@/services";
import { IndexBar, IndexAnchor } from "vant";
import { mapMutations } from "vuex";
export default {
  name: "Playlist",
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
  },
  props: {},
  data() {
    return {
      playlistTags: [],
      playList: [],
      loading: true,
    };
  },
  computed: {
    indexList() {
      return this.playlistTags.map((tag) => tag.name);
    },
  },
  methods: {
    showList(tag) {
      return this.playList
        .filter((playlist) => playlist?.tags.includes(tag))
        .slice(0, 5);
    },
    toPlayList(id) {
      this.setNavLeftArrow(true);
      this.setShowTabBar(false)
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
      setShowTabBar:"SET_SHOW_TABBAR"
    }),
  },
  async created() {
    console.log(1);
    let { data } = await playlistTagsAPI();
    let { data: playListData } = await playlistDataAPI({ limit: 100 });
    if (data.code === 200) {
      this.playlistTags = data.tags;
      if (playListData.code === 200) {
        this.playList = playListData.playlists;
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      } else {
        this.playList = [];
      }
    } else {
      this.playlistTags = [];
    }
  },
};
</script>

<style lang="less" scoped>
.playlist-container {
  /deep/.van-cell__value {
    flex: 3;
    text-align: left;
    .playlist-info-wrapper {
      width: 1.5rem;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:last-child {
        width: 2rem;
      }
    }
  }
  .loading-icon {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
