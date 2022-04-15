<template>
  <div class="home-banner" v-if="banners?.length > 0">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#E5989B">
      <van-swipe-item
        v-for="banner in banners"
        :key="banner.bannerId"
        class="banner-item"
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
import { Swipe, SwipeItem, Tag } from "vant";
export default {
  name: "RecommendSwipe",
  props: {
    swipeList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
  },
  data() {
    return {};
  },
  computed: {
    banners() {
      return this.swipeList?.extInfo?.banners.filter(
        (banner) =>
          banner.typeTitle === "新歌首发" || banner.typeTitle === "歌单"
      );
    },
  }
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
