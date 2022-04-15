<template>
  <div>
    <div class="playlist-cover">
      <van-image :src="playlist.coverImgUrl" height="300" width="100%"></van-image>
    </div>
  </div>
</template>

<script>
import { playlistDetailAPI } from "@/services";
export default {
  name: "PlaylistDetail",
  components: {},
  data() {
    return {
      playlist: {},
      trackIds: [],
    };
  },
  async created() {
    let { data } = await playlistDetailAPI({ id: this.$route.query.id });
    if (data.code === 200) {
      this.playlist = data?.playlist;
      this.trackIds = data?.playlist.trackIds.map((track) => track.id);
    } else {
      this.playlist = [];
      this.trackIds = [];
    }
    console.log(this.playlist, this.trackIds);
  },
};
</script>

<style lang="less" scoped></style>
