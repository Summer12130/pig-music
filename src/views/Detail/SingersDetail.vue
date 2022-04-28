<template>
  <div class="singer-detail">
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
      class="music-list"
      v-if="!loading"
    >
      <div class="music-list-wrapper">
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
    </scroll>
    <van-loading size="24px" vertical v-else class="loading-icon"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import {
  singerDetailAPI,
  musicUrlAPI,
  musicLyricAPI,
  musicDetailAPI,
} from "@/services";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Scroll from "@/components/common/Scroll/Scroll";

const RESERVED_HEIGHT = 0;

export default {
  name: "SingersDetail",
  components: {
    Scroll,
  },
  data() {
    return {
      currentId: null,
      showList: [],
      loading: true,
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
    };
  },
  computed: {
    bgImageStyle() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";
      let height = 0;
      let translateZ = 0;

      if (scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = 0;
        height = `${RESERVED_HEIGHT}px`;
        translateZ = 1;
      }

      let scale = 1;
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundImage: `url(${this.singer.picUrl})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    },
    scrollStyle() {
      // const bottom = this.showList.length ? "0.50rem" : "0";
      return {
        top: `${this.imageHeight / 100 + 0.44}rem`,
        // bottom,
      };
    },
    filterStyle() {
      let blur = 0;
      const scrollY = this.scrollY;
      const imageHeight = this.imageHeight;
      if (scrollY >= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },

    ...mapGetters(["singer"]),
  },
  created() {
    console.log("singers created");
  },
  async activated() {
    this.loading = true;
    const id = this.$route.query.id;
    this.setNavTitle(this.singer.name);
    if (this.currentId !== id) {
      this.currentId = id;
      let { data } = await singerDetailAPI({ id });
      if (data.code === 200) {
        this.showList = data.songs;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    }
  },
  deactivated() {},
  mounted() {
    this.imageHeight = this.$refs?.bgImage?.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
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
    onScroll(pos) {
      this.scrollY = -pos.y;
    },
    ...mapActions(["selectPlay"]),
    ...mapMutations({
      setNavTitle: "SET_NAV_TITLE",
    }),
  },
};
</script>

<style lang="less" scoped>
.singer-detail {
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .music-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .music-list-wrapper {
      padding: 0.1rem 0 0.2rem;
      background: rgb(247, 248, 249); /* fallback for old browsers */
      // background: #ece9e6; /* fallback for old browsers */
      // background: -webkit-linear-gradient(
      //   to bottom,
      //   #ffffff,
      //   #ece9e6
      // ); /* Chrome 10-25, Safari 5.1-6 */
      // background: linear-gradient(
      //   to bottom,
      //   #ffffff,
      //   #ece9e6
      // ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .loading-icon {
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
