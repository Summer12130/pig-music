<template>
  <div class="singers" ref="singerContainer">
    <van-sticky :container="singerContainer" offset-top="0.46rem" z-index="100">
      <van-dropdown-menu active-color="#1989fa" class="singer-selector">
        <van-dropdown-item
          v-model="type"
          :options="typeOptions"
          @change="typeChange"
        />
        <van-dropdown-item
          v-model="area"
          :options="areaOptions"
          @change="areaChange"
        />
      </van-dropdown-menu>
    </van-sticky>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group inset>
        <van-cell
          v-for="singer in singersList"
          :key="singer.id"
          :title="singer.name"
          center
          size="large"
          @click="toSingerDetail(singer)"
        >
          <template #title class="custom-title">
            <van-image
              width="55"
              height="55"
              radius=".08rem"
              :src="singer.picUrl"
              lazy-load
            ></van-image>
          </template>
          <div class="singer-info">
            <span>{{ singer.name }}</span
            ><br />
            <span>{{ singer.alias?.[0] }}</span>
          </div>
          <template #right-icon>
            <van-icon name="ellipsis" class="ellipsis-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { singersListAPI } from "@/services";
import {
  List,
  DropdownMenu,
  DropdownItem,
  Image as VanImage,
  Icon,
  Sticky,
} from "vant";
import { ref } from "vue";
import { mapMutations } from "vuex";
export default {
  name: "Singers",
  props: {},
  components: {
    [List.name]: List,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    VanImage,
  },
  data() {
    return {
      singersList: [],
      offset: 0,
      loading: false,
      finished: false,
      type: -1,
      area: -1,
      typeOptions: [
        { text: "全部", value: -1 },
        { text: "男歌手", value: 1 },
        { text: "女歌手", value: 2 },
        { text: "乐队", value: 3 },
      ],
      areaOptions: [
        { text: "全部", value: -1 },
        { text: "华语", value: 7 },
        { text: "欧美", value: 96 },
        { text: "日本", value: 8 },
        { text: "韩国", value: 16 },
        { text: "其它", value: 0 },
      ],
    };
  },
  methods: {
    async onLoad(flag = false) {
      let { data } = await singersListAPI({
        type: this.type,
        area: this.area,
        offset: this.offset,
      });
      if (data.code === 200) {
        if (flag) this.singersList = [];
        data.artists = data.artists.filter(
          (artist) =>
            !this.singersList.some((singer) => singer.id === artist.id)
        );
        this.singersList = this.singersList.concat(data.artists);
        this.offset++;
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    typeChange(ntype) {
      this.offset = 0;
      this.type = ntype;
      this.onLoad(true);
    },
    areaChange(narea) {
      this.offset = 0;
      this.area = narea;
      this.onLoad(true);
    },
    toSingerDetail(singer) {
      console.log(singer);
      this.$store.commit("showNavBarLeftIcon", true);
      this.setSinger(singer)
      this.$router.push({
        path: "/singer/detail",
        query: {
          id:singer.id,
        },
      });
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  async created(flag = false) {
    let { data } = await singersListAPI({
      type: this.type,
      area: this.area,
      offset: this.offset,
    });
    if (data.code === 200) {
      if (flag) this.singersList = [];
      data.artists = data.artists.filter(
        (artist) => !this.singersList.some((singer) => singer.id === artist.id)
      );
      this.singersList = this.singersList.concat(data.artists);
      this.offset++;
      this.loading = false;
    } else {
      this.finished = true;
    }
  },
  setup() {
    const singerContainer = ref(null);
    return {
      singerContainer,
    };
  },
};
</script>

<style lang="less" scoped>
.singers {
  .singer-selector {
    position: relative;
    margin-bottom: 0.1rem;
    z-index: 100;
  }
  /deep/.van-cell__value {
    flex: 3;
    text-align: left !important;
  }
  .ellipsis-icon {
    font-size: 0.18rem;
    line-height: inherit;
  }
}
</style>
