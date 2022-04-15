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
import { Image as VanImage } from "vant";
import { recommendAlbumAPI } from "@/services";
export default {
  name: "RecommendPlayList",
  components: {
    VanImage,
  },
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
      this.$store.commit("showNavBarLeftIcon", true);
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.playlist-title {
  font-size: 0.15rem;
}
</style>
