<template>
  <div class="singer-detail">
    <scroll class="scroll-wrapper">
      <div>
        <div class="singer-cover">
          <van-image :src="singer.picUrl"></van-image>
        </div>
        <div class="music-list">
          <van-cell-group inset>
            <van-cell>
              <template #title>
                <van-icon name="music"></van-icon>
              </template>
            </van-cell>
            <van-cell
              v-for="music in showList"
              :key="music.id"
              :title="music.name"
              @click="playMusic(music)"
              center
            >
              <template #right-icon>
                <van-icon
                  name="play-circle-o"
                  class="play-circle-o-icon"
                /> </template
            ></van-cell>
          </van-cell-group>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {
  singerDetailAPI,
  musicUrlAPI,
  musicLyricAPI,
  musicDetailAPI,
} from "@/services";
import { mapActions, mapGetters } from "vuex";
import Scroll from "@/components/common/Scroll/Scroll";
export default {
  name: "SingersDetail",
  components: {
    Scroll,
  },
  data() {
    return {
      currentId: null,
      showList: [],
    };
  },
  computed: {
    ...mapGetters(["singer"]),
  },
  created() {
    console.log("singers created");
  },
  async activated() {
    const id = this.$route.query.id;
    if (this.currentId !== id) {
      this.currentId = id;
      let { data } = await singerDetailAPI({ id });
      if (data.code === 200) {
        this.showList = data.songs;
      }
    }
  },
  methods: {
    async playMusic(music) {
      let { data } = await musicUrlAPI({ id: music.id });
      let { data: lyric } = await musicLyricAPI({ id: music.id });
      let { data: detailData } = await musicDetailAPI({ ids: music.id });
      if (data.code === 200) {
        console.log(data, detailData);
        music.url = data?.data[0]?.url;
        music.picUrl = detailData?.songs[0]?.al.picUrl;
        music.song = { artists: [{ name: this.singer.name }] };
        music.duration = music.dt / 1000;
        music.lyric = lyric?.lrc?.lyric;
        this.selectPlay({ music, musicId: music.id });
      } else {
        music.url = "";
        this.selectPlay({ music, musicId: music.id });
      }
      console.log(music);
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="less" scoped>
.singer-detail {
  .scroll-wrapper {
    min-height: 5.17rem;
    height: 5.17rem;
    .singer-cover {
      margin-bottom: 0.1rem;
    }
  }
}
</style>
