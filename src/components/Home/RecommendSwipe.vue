<template>
  <div class="home-banner" v-if="banners?.length > 0">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#E5989B">
      <van-swipe-item
        v-for="banner in banners"
        :key="banner.bannerId"
        class="banner-item"
        @click="swipeClick(banner, banner.typeTitle)"
      >
        <img :src="banner.pic" />
        <van-tag color="#6D6875" size="medium" class="banner-tag">{{
          banner.typeTitle
        }}</van-tag>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { recommendBannerAPI, musicUrlAPI, musicLyricAPI } from "@/services";
import { Swipe, SwipeItem, Tag } from "vant";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "RecommendSwipe",
  props: {},
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
  },
  data() {
    return {
      swipeList: [],
    };
  },
  computed: {
    banners() {
      return this.swipeList?.filter(
        (banner) =>
          banner.typeTitle === "新歌首发" || banner.typeTitle === "歌单"
      );
    },
  },
  methods: {
    async swipeClick(banner, typeTitle) {
      if (typeTitle === "歌单") {
        this.setNavLeftArrow(true);
        this.$router.push({
          path: "/playlist",
          query: {
            id: banner.targetId,
          },
        });
      } else if (typeTitle === "新歌首发") {
        // const music = {
        //   picUrl: banner.pic,
        //   song: banner.song,
        //   name: banner.song.name,
        //   id: banner.targetId,
        //   duration: banner.song.dt / 1000,
        // };
        // let { data } = await musicUrlAPI({ id: music.id });
        // let { data: lyric } = await musicLyricAPI({ id: music.id });
        // if (data.code === 200) {
        //   console.log(music);
        //   music.url = data?.data[0]?.url;
        //   music.lyric = lyric?.lrc?.lyric;
        //   // this.selectPlay({ music, musicId: music.id });
        // } else {
        //   music.url = "";
        //   // this.selectPlay({ music, musicId: music.id });
        // }
      }
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
    }),
    ...mapActions(["selectPlay"]),
  },
  async created() {
    let { data } = await recommendBannerAPI({ type: 2 });
    if (data.code === 200) {
      this.swipeList = data.banners;
    } else {
      this.swipeList = [];
    }
  },
};
</script>

<style lang="less" scoped>
.home-banner {
  .banner-item {
    position: relative;
    .banner-tag {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
