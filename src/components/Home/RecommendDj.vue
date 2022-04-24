<template>
  <div>
    <van-cell
      :title="title"
      icon="music"
      is-link
      to="/home/dj"
      @click="toDJPage"
    />
    <van-row justify="space-around">
      <van-col span="7" v-for="djlist in djLists" :key="djlist.id">
        <van-image
          :src="djlist.picUrl"
          :alt="djlist.name"
          lazy-load
          radius=".12rem"
        ></van-image>
        <p class="djlist-title van-multi-ellipsis--l2">
          {{ djlist.name }}
        </p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
import { recommendDjProgramAPI } from "@/services";
export default {
  name: "RecommendDj",
  components: {
    VanImage,
  },
  data() {
    return {
      djLists: [],
      title: "推荐电台",
    };
  },
  computed: {},
  async created() {
    let { data } = await recommendDjProgramAPI();
    if (data.code === 200) {
      this.djLists = data.result;
    } else {
      this.djLists = [];
    }
  },
  methods: {
    toDJPage() {
      this.$emit("toDJPage", "/home/dj");
    },
  },
};
</script>

<style lang="less" scoped>
.djlist-title {
  font-size: 0.15rem;
}
</style>
