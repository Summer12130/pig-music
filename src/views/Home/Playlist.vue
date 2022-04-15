<template>
  <div class="playlist-container">
    <van-index-bar :index-list="indexList" :sticky-offset-top="90">
      <template v-for="tag in playlistTags" :key="tag.id">
        <van-index-anchor :index="tag.name">{{ tag.name }}</van-index-anchor>
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { playlistTagsAPI } from "@/services";
import { IndexBar, IndexAnchor } from "vant";
export default {
  name: "Playlist",
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
  },
  props: {},
  data() {
    return {
      playlistTags: [],
    };
  },
  computed: {
    indexList() {
      return this.playlistTags.map((tag) => tag.name);
    },
  },
  async created() {
    let { data } = await playlistTagsAPI();
    if (data.code === 200) {
      this.playlistTags = data.tags;
    } else {
      this.playlistTags = [];
    }
    console.log(this.playlistTags);
  },
};
</script>

<style lang="less" scoped></style>
