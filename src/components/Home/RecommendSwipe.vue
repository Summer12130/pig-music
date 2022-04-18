<template>
  <div class="home-banner" v-if="banners?.length > 0">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#E5989B">
      <van-swipe-item
        v-for="banner in banners"
        :key="banner.bannerId"
        class="banner-item"
        @click="swipeClick(banner.targetId, banner.typeTitle)"
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
import { recommendBannerAPI } from "@/services";
import { Swipe, SwipeItem, Tag } from "vant";
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
          banner.typeTitle === "新歌首发" ||
          banner.typeTitle === "歌单" ||
          banner.typeTitle === "新碟首发"
      );
    },
  },
  methods: {
    swipeClick(targetId, typeTitle) {
      this.$store.commit("showNavBarLeftIcon", true);
      if(typeTitle === "新碟首发" || typeTitle === "歌单"){
        this.$router.push({
          path:"/playlist",
          query:{
            id:targetId
          }
        })
      }
    },
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
