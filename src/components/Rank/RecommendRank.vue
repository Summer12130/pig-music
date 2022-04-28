<template>
  <div class="rank-wrapper">
    <van-cell :title="title" :icon="icon" />
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item
        v-for="(item, index) in recommendRankList"
        :key="item.id || index"
        @click="rankDetail(item)"
      >
        <van-image
          :src="item.coverImgUrl"
          lazy-load
          width="75"
          height="75"
          radius=".15rem"
        />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "RecommendRank",
  props: {
    title:{
      type: String,
      default: "暂无推荐"
    },
    icon:{
      type: String,
      default: "photo-o"
    },
    recommendRankList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
    rankDetail(item){
      this.$emit("toRankDetail", item)
    }
  }
};
</script>

<style lang="less" scoped></style>
