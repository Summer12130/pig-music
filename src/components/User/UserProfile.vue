<template>
  <div class="user-profile">
    <van-cell-group inset class="baseinfo">
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

    <van-cell-group inset class="create-playlists">
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

    <van-cell-group inset class="favor-playlists">
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
import formatCity from "@/utils/formatCity";
import { mapMutations } from 'vuex';
export default {
  name: "UserProfile",
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      userPlaylist: [],
      uid: 0,
    };
  },
  computed: {
    createdPlaylist() {
      return this.userPlaylist.filter(
        (playlist) => playlist.userId === this.profile.profile?.userId
      );
    },
    collectedPlaylist() {
      return this.userPlaylist.filter(
        (playlist) => playlist.userId !== this.profile.profile?.userId
      );
    },
    baseInfo() {
      return {
        gender: {
          title: "性别",
          value:
            this.profile.profile?.gender === 1
              ? "男"
              : this.profile.profile?.gender === 2
              ? "女"
              : "未知",
        },
        area: {
          title: "地区",
          value: formatCity.getAreaByIdCard(this.profile.profile?.city + ""),
        },
        signature: {
          title: "个人简介",
          value: this.profile.profile?.signature,
        },
        useTime: {
          title: "使用时间",
          value: this.profile?.createDays + " 天",
        },
      };
    },
  },
  methods: {
    toPlayListDetail(id) {
      this.setNavLeftArrow(true)
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    },
    ...mapMutations({
      setNavLeftArrow:"SET_NAV_LEFT_ARROW"
    })
  },
  async created() {
    const uid = this.$route.query.uid;
    let { data } = await userPlaylistAPI({ uid });
    if (data.code === 200) {
      this.userPlaylist = data.playlist;
    } else {
      this.userPlaylist = [];
    }
    console.log(this.userPlaylist);
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  .baseinfo {
    margin-bottom: 0.1rem;
  }
  .create-playlists {
    margin-bottom: 0.1rem;
  }
}
</style>
