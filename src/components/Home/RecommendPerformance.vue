<template>
  <div>
    <van-cell
      :title="title"
      icon="music"
      @click="toProgramPage"
    />
    <van-card
      v-for="program in programs"
      :key="program.id"
      :desc="program.description"
      :title="program.name"
      :thumb="program.coverUrl"
      centered
      lazy-load
    >
      <template #tags>
        <van-tag plain round type="danger">{{
          program.radio.category
        }}</van-tag>
        <van-tag plain round type="danger">{{
          program.radio.secondCategory
        }}</van-tag>
      </template>
      <template #footer>
        <span class="program-footer"
          ><van-icon name="like-o" size=".14rem" />{{
            program.likedCount
          }}</span
        >
        <span class="program-footer"
          ><van-icon name="chat-o" size=".14rem" />{{
            program.commentCount
          }}</span
        >
        <span class="program-footer"
          ><van-icon name="share-o" size=".14rem" />{{
            program.shareCount
          }}</span
        >
      </template>
    </van-card>
  </div>
</template>

<script>
import { recommendPerformanceAPI } from "@/services";
import { Card, Icon, Tag } from "vant";
export default {
  name: "RecommendPerformance",
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
  },
  data() {
    return {
      title: "推荐节目",
      programs: [],
    };
  },
  async created() {
    let { data } = await recommendPerformanceAPI();
    if (data.code === 200) {
      this.programs = data.programs;
    } else {
      this.programs = [];
    }
  },
  methods: {
    toProgramPage() {
      this.$emit("toProgramPage", "/home/program");
    },
  },
};
</script>

<style lang="less" scoped>
.program-footer {
  font-size: 0.14rem;
  margin-right: 0.05rem;
}
</style>
