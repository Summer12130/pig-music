<template>
  <div class="user-profile">
    <van-cell-group inset>
      <van-cell
        title="基本信息"
        size="large"
        :title-style="{ fontWeight: 900 }"
      ></van-cell>
      <van-cell
        :title="info.title"
        :value="info.value"
        v-for="info in baseInfo"
        :key="info.title"
      />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell
        title="创建歌单"
        size="large"
        :title-style="{ fontWeight: 900 }"
      ></van-cell>
      <van-cell
        :title="info.name"
        :value="info.value"
        v-for="info in createdPlaylist"
        :key="info.id"
        @click="toPlayListDetail(info.id)"
      />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell
        title="收藏歌单"
        size="large"
        :title-style="{ fontWeight: 900 }"
      ></van-cell>
      <van-cell
        :title="info.name"
        :value="info.value"
        v-for="info in collectedPlaylist"
        :key="info.id"
        @click="toPlayListDetail(info.id)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { userPlaylistAPI } from "@/services";
export default {
  name: "UserProfile",
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {
          useTime: {
            title: "使用时间",
            value: "4年(2017年11月注册)",
          },
          gender: {
            title: "性别",
            value: "男",
          },
          area: {
            title: "地区",
            value: "四川 成都",
          },
          signature: {
            title: "个人简介",
            value: "晚安早点睡.",
          },
        };
      },
    },
    uid: {
      type: Number,
      default: 644969525,
    },
  },
  data() {
    return {
      userPlaylist: [],
    };
  },
  computed: {
    createdPlaylist() {
      return this.userPlaylist.filter(
        (playlist) => playlist.userId === this.uid
      );
    },
    collectedPlaylist() {
      return this.userPlaylist.filter(
        (playlist) => playlist.userId !== this.uid
      );
    },
  },
  methods: {
    toPlayListDetail(id){
      this.$store.commit("showNavBarLeftIcon", true);
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    }
  },
  async created() {
    let { data } = await userPlaylistAPI({ uid: this.uid });
    if (data.code === 200) {
      this.userPlaylist = data.playlist;
    } else {
      this.userPlaylist = [];
    }
    console.log(this.userPlaylist);
  },
};
</script>

<style lang="less" scoped></style>
