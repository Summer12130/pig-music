<template>
  <div class="recommend-music">
    <van-cell
      :title="title"
      icon="music"
      is-link
      to="/home/music"
      replace
      @click="toMusic"
    />
    <van-cell-group inset>
      <van-cell v-for="music in musicLists" :key="music.id" center size="large">
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
import { recommendMusicAPI } from "@/services";
import { Icon, Image as VanImage } from "vant";

export default {
  name: "RecommendMusic",
  components: {
    [Icon.name]: Icon,
    VanImage,
  },
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
