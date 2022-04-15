<template>
  <div class="recommend">
    <b-scroll class="scroll-wrapper">
      <div>
        <recommend-swipe :swipe-list="swipeList"></recommend-swipe>
        <recommend-play-list @toAlbumsPage="toAlbumsPage"></recommend-play-list>
        <recommend-music @toMusicPage="toMusicPage"></recommend-music>
        <recommend-dj @toDJPage="toDJPage"></recommend-dj>
        <recommend-performance
          @toProgramPage="toProgramPage"
        ></recommend-performance>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import RecommendSwipe from "@/components/Home/RecommendSwipe";
import RecommendPlayList from "@/components/Home/RecommendPlayList";
import RecommendMusic from "@/components/Home/RecommendMusic";
import RecommendDj from "@/components/Home/RecommendDj";
import RecommendPerformance from "@/components/Home/RecommendPerformance";

export default {
  name: "Recommend",
  components: {
    RecommendSwipe,
    RecommendPlayList,
    RecommendMusic,
    RecommendDj,
    RecommendPerformance,
  },
  props: {
    homeRecommend: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    swipeList() {
      return this.homeRecommend.banners;
    },
  },
  methods: {
    toMusicPage(payload) {
      this.$emit("toMusicPage", payload);
    },
    toAlbumsPage(payload) {
      this.$emit("toAlbumsPage", payload);
    },
    toProgramPage(payload) {
      this.$emit("toProgramPage", payload);
    },
    toDJPage(payload) {
      this.$emit("toDJPage", payload);
    },
  },
  activated() {
    console.log(1);
  },
  deactivated() {
    console.log(2);
  },
};
</script>

<style lang="less" scoped>
.recommend {
  height: 100%;
  .scroll-wrapper {
    min-height: 5.17rem;
    height: 5.17rem;
  }
}
</style>
