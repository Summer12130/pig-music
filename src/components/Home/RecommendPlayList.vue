<template>
  <div>
    <van-cell
      :title="title"
      icon="music"
      is-link
      to="/home/playlist"
      replace
      @click="toPlayList"
    />
    <van-row justify="space-around">
      <van-col
        span="7"
        v-for="playlist in playLists"
        :key="playlist.id"
        @click="playlistClick(playlist.id)"
      >
        <van-image
          :src="playlist.picUrl"
          :alt="playlist.name"
          lazy-load
          radius=".12rem"
        ></van-image>
        <p class="playlist-title van-multi-ellipsis--l2">
          {{ playlist.name }}
        </p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { recommendAlbumAPI } from "@/services";
import { mapMutations } from "vuex";
export default {
  name: "RecommendPlayList",
  components: {},
  data() {
    return {
      playLists: [],
      title: "推荐歌单",
    };
  },
  computed: {},
  async created() {
    let { data } = await recommendAlbumAPI();
    this.playLists = data.result.slice(24);
  },
  methods: {
    toPlayList() {
      this.$emit("toAlbumsPage", "/home/playlist");
    },
    playlistClick(id) {
      this.setNavLeftArrow(true);
      this.setShowTabBar(false);
      this.setShowTabBar(false);
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
      setShowTabBar: "SET_SHOW_TABBAR",
      setShowTabBar: "SET_SHOW_TABBAR",
    }),
  },
};
</script>

<style lang="less" scoped>
.playlist-title {
  font-size: 0.15rem;
}
</style>
