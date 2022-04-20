<template>
  <div class="music">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :head-height="80"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://cdn.jsdelivr.net/npm/@vant/assets/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img
          class="doge"
          src="https://cdn.jsdelivr.net/npm/@vant/assets/doge.png"
        />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img
          class="doge"
          src="https://cdn.jsdelivr.net/npm/@vant/assets/doge-fire.jpeg"
        />
      </template>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="music in showList"
          :key="music.id"
          :title="music.name"
          :label="music?.song?.artists[0]?.name"
          @click="playMusic(music)"
          center
        >
          <template #right-icon>
            <van-icon
              name="play-circle-o"
              class="play-circle-o-icon"
            /> </template
        ></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  musicListAPI,
  musicUrlAPI,
  musicDetailAPI,
  musicLyricAPI,
} from "@/services";
import { Icon, List, PullRefresh, Toast } from "vant";
import { shuffle } from "@/utils/utils";
import { mapActions } from "vuex";
export default {
  name: "Music",
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Icon.name]: Icon,
  },
  props: {},
  data() {
    return {
      musicList: [],
      step: 10,
      offset: 1,
      loading: false,
      finished: false,
      refreshing: false,
      limit: 100,
    };
  },
  computed: {
    showList() {
      return this.musicList.slice(0, this.offset * this.step);
    },
  },
  methods: {
    onLoad() {
      if (this.offset <= this.limit / this.step) {
        this.offset++;
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    onRefresh() {
      this.offset = 1;
      this.finished = false;
      this.loading = false;
      setTimeout(() => {
        this.musicList = shuffle(this.musicList);
        this.refreshing = false;
        Toast("刷新成功");
      }, 300);
    },
    async playMusic(music) {
      let { data } = await musicUrlAPI({ id: music.id });
      let { data: detailData } = await musicDetailAPI({ ids: music.id });
      let { data: lyric } = await musicLyricAPI({ id: music.id });
      if (data.code === 200) {
        music.url = data?.data[0]?.url;
        music.duration = detailData?.songs[0]?.dt / 1000;
        music.lyric = lyric?.lrc?.lyric;
        this.selectPlay({ music, musicId: music.id });
      } else {
        music.url = "";
        this.selectPlay({ music, musicId: music.id });
      }
    },
    ...mapActions(["selectPlay"]),
  },
  async created() {
    let { data } = await musicListAPI({ limit: this.limit });
    if (data.code === 200) {
      this.musicList = data.result;
    } else {
      this.musicList = [];
    }
  },
};
</script>

<style lang="less" scoped>
.play-circle-o-icon {
  font-size: 0.16rem;
  line-height: inherit;
}
.doge {
  width: 140px;
  height: 72px;
  margin: 8px;
  border-radius: 4px;
}
</style>
