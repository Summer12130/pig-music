<template>
  <div class="recommend-music">
    <van-cell
      :title="title"
      icon="music"
      is-link
      to="/home/music"
      @click="toMusic"
    />
    <van-cell-group inset>
      <van-cell
        v-for="music in musicLists"
        :key="music.id"
        center
        size="large"
        @click="playMusic(music)"
      >
        <template #title class="custom-title">
          <van-image
            width="55"
            height="55"
            radius=".08rem"
            :src="music.picUrl"
            lazy-load
          ></van-image>
        </template>
        <div class="music">
          <span>{{ music.name }}</span
          ><br />
          <span>{{ music?.song?.artists[0]?.name }}</span>
        </div>
        <template #right-icon>
          <van-icon name="play-circle-o" class="play-circle-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { recommendMusicAPI, musicUrlAPI, musicLyricAPI } from "@/services";
import { mapActions } from "vuex";
export default {
  name: "RecommendMusic",
  components: {},
  data() {
    return {
      title: "推荐音乐",
      musicLists: [],
    };
  },
  async created() {
    let { data } = await recommendMusicAPI();
    if (data.code === 200) {
      this.musicLists = data.result;
    } else {
      this.musicLists = [];
    }
  },
  methods: {
    toMusic() {
      this.$emit("toMusicPage", "/home/music");
    },
    async playMusic(music) {
      console.log(music);
      let { data } = await musicUrlAPI({ id: music.id });
      // let { data: detailData } = await musicDetailAPI({ ids: music.id });
      let { data: lyric } = await musicLyricAPI({ id: music.id });
      if (data.code === 200) {
        music.url = data?.data[0]?.url;
        music.duration = music.song.duration / 1000;
        music.lyric = lyric?.lrc?.lyric;
        this.selectPlay({ music, musicId: music.id });
      } else {
        music.url = "";
        this.selectPlay({ music, musicId: music.id });
      }
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="less" scoped>
.recommend-music {
  .custom-title {
    vertical-align: middle;
  }
  /deep/.van-cell__value {
    flex: 3;
    text-align: left !important;
  }
  .play-circle-icon {
    font-size: 0.18rem;
    line-height: inherit;
  }
}
</style>
