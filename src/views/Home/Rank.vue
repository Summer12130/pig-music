<template>
  <div class="rank">
    <recommend-rank
      :recommend-rank-list="recommendRankList"
      title="推荐榜单"
      icon="gem"
      @toRankDetail="toRankDetail"
    ></recommend-rank>
    <recommend-rank
      :recommend-rank-list="otherRankList"
      title="其它榜单"
      icon="fire"
    ></recommend-rank>
  </div>
</template>

<script>
import { allRankListAPI } from "@/services";
import RecommendRank from "@/components/Rank/RecommendRank";
export default {
  name: "Rank",
  components: {
    RecommendRank,
  },
  data() {
    return {
      allRankList: [],
    };
  },
  computed: {
    recommendRankList() {
      return this.allRankList.slice(0, 3);
    },
    otherRankList() {
      return this.allRankList.slice(3);
    },
  },
  methods: {
    toRankDetail(item){
      this.$router.push({
        path:"/playlist",
        query:{
          id: item.id
        }
      })
      console.log(item);
    }
  },
  async created() {
    let { data } = await allRankListAPI();
    if (data.code === 200) {
      this.allRankList = data.list;
    } else {
      this.allRankList = [];
    }
  },
};
</script>

<style lang="less" scoped></style>
