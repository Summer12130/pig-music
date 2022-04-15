<template>
  <div>
    <van-cell :title="cardTitle" :icon="cardIcon" center />
    <van-cell-group inset>
      <van-cell
        v-for="(data, index) in listData"
        :key="data.id || index"
        center
      >
        <template #title>
          <van-image
            lazy-load
            :src="data.picUrl"
            width="70"
            height="70"
            radius=".15rem"
          />
        </template>
        <div class="dj-info">
          <span class="dj-title">{{ data.name }}</span><br>
          <van-tag plain color="#7232dd">{{data.category}}</van-tag>
        </div>
        <template #right-icon>
          <van-icon name="ellipsis" class="ellipsis-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "DjList",
  props: {
    cardTitle: {
      type: String,
      default: "暂无数据",
    },
    cardIcon: {
      type: String,
      default: "location-o",
    },
    listData: {
      type: Array,
      dafault() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-cell__value {
  flex: 3;
  text-align: left ;
  margin-left: .15rem;
}
</style>
