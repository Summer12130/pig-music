<template>
  <div class="dj">
    <b-scroll class="dj-scroll-wrapper">
      <div>
        <van-swipe @change="onChange" class="dj-swipe-container">
          <van-swipe-item v-for="(slide, index) in djCategories" :key="index">
            <van-grid :column-num="3">
              <van-grid-item v-for="dj in slide" :key="dj.id">
                <van-image
                  :src="dj.pic56x56Url"
                  lazy-load
                  width=".40rem"
                  height=".40rem"
                ></van-image>
                <span class="dj-icon-title">{{ dj.name }}</span>
              </van-grid-item>
            </van-grid>
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
          </template>
        </van-swipe>
        <dj-list
          card-title="推荐电台"
          card-icon="good-job-o"
          :list-data="djList"
        ></dj-list>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import { djListAPI, djRecommendListAPI } from "@/services";
import { Swipe, SwipeItem, Image as VanImage } from "vant";
import DjList from "@/components/DJ/DjList";
export default {
  name: "Dj",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    VanImage,
    DjList,
  },
  data() {
    return {
      djList: [],
      djCategories: [],
    };
  },
  methods: {
    onChange(index) {},
  },
  async created() {
    let { data } = await djListAPI();
    let index = 0;
    if (data.code === 200) {
      while (index < data.categories.length) {
        this.djCategories.push(
          data.categories.slice(index, (index = index + 6))
        );
      }
    } else {
      this.djCategories = [];
    }
    let { data: djData } = await djRecommendListAPI();
    if (djData.code === 200) {
      this.djList = djData.djRadios;
    } else {
      this.djList = [];
    }
    console.log(this.djList, this.djCategories);
  },
};
</script>

<style lang="less" scoped>
.dj {
  height: 100%;
  .dj-scroll-wrapper {
    height: 5.17rem;
    min-height: 5.17rem;
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
    .dj-icon-title {
      font-size: 0.15rem;
    }
  }
}
</style>
