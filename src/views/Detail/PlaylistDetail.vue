<template>
  <div class="palylist-detail">
    <div class="playlist-cover">
      <van-card
        :desc="playlist.description"
        :title="playlist.name"
        :thumb="playlist.coverImgUrl"
        :tag="playlist.playCount > 100000 ? 'hot' : ''"
        description
        centered
        @click="showCreatorInfo"
      >
        <template #tags class="tags-wrapper">
          <van-tag
            plain
            type="danger"
            v-for="tag in playlist.tags"
            :key="tag"
            class="tag-item"
            >{{ tag }}</van-tag
          >
        </template>
        <template #footer class="card-footer">
          <div class="playlist-info">
            <van-icon name="flower-o">{{ playlist.subscribedCount }}</van-icon>
            <van-icon name="comment-o">{{ playlist.commentCount }}</van-icon>
            <van-icon name="share-o">{{ playlist.shareCount }}</van-icon>
          </div>
        </template>
      </van-card>
    </div>
    <div class="playlist-song-wrapper">
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        v-if="isLogin"
      >
        登陆后加载更多哦！
      </van-notice-bar>
      <van-cell-group>
        <van-cell
          v-for="track in playlist.tracks"
          :key="track.id"
          center
          @click="playMusic(track)"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">{{ track.name }}</span>
            <van-tag type="danger" v-if="track.pop === 100" class="is-hot-tag"
              >hot</van-tag
            >
          </template>
          <template #label>
            {{ track.ar && track.ar[0].name }}
          </template>
          <template #right-icon>
            <van-icon name="play-circle-o" class="play-circle-o-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-popup
      v-model:show="showCreator"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="creator-info">
        <div class="creator-baseinfo">
          <van-image
            :src="playlist.creator.avatarUrl"
            round
            width="70"
            height="70"
            lazy-load
            class="creator-avatar"
            position="center"
          ></van-image>
          <div class="creator-name">
            <p class="nickname">{{ playlist.creator.nickname }}</p>
            <p class="signature">
              {{ playlist.creator.signature || "暂无简介" }}
            </p>
            <p class="favorite">
              <van-tag
                color="#7232dd"
                plain
                v-for="(tag, index) in playlist.creator.expertTags"
                :key="index"
                >{{ tag }}</van-tag
              >
            </p>
            <p class="if-followed">
              <van-button
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                size="mini"
              >
                {{ isFollowed }}
              </van-button>
            </p>
          </div>
        </div>
        <div class="other-info">
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
            }"
          >
          </van-divider>
          <van-tag
            color="#7232dd"
            size="large"
            mark
            v-for="expert in playlist.creator.experts"
            :key="expert"
            >{{ expert }}</van-tag
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { playlistDetailAPI, musicUrlAPI, musicLyricAPI } from "@/services";
import { mapActions, mapGetters } from "vuex";
import { Card, Divider, NoticeBar, Popup } from "vant";
export default {
  name: "PlaylistDetail",
  components: {
    [Card.name]: Card,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [Divider.name]: Divider,
  },
  data() {
    return {
      playlist: {},
      trackIds: [],
      showCreator: false,
      currentQueryId: 0,
    };
  },
  computed: {
    isFollowed() {
      return this.playlist?.creator?.followed ? "已关注" : "关注";
    },
    ...mapGetters(["isLogin"]),
  },
  methods: {
    showCreatorInfo() {
      this.showCreator = !this.showCreator;
    },
    async playMusic(music) {
      let { data } = await musicUrlAPI({ id: music.id });
      let { data: lyric } = await musicLyricAPI({ id: music.id });
      if (data.code === 200) {
        music.url = data?.data[0]?.url;
        music.picUrl = music.al.picUrl;
        music.song = { artists: [{ name: music.ar[0]?.name }] };
        music.duration = music.dt / 1000;
        music.lyric = lyric?.lrc?.lyric;
        this.selectPlay({ music, musicId: music.id });
      } else {
        music.url = "";
        this.selectPlay({ music, musicId: music.id });
      }
      console.log(music);
    },
    ...mapActions(["selectPlay"]),
  },
  async created() {
    this.currentQueryId = this.$route.query.id;
    let { data } = await playlistDetailAPI({ id: this.currentQueryId });
    console.log(data);
    if (data.code === 200) {
      this.playlist = data?.playlist;
      this.trackIds = data?.playlist.trackIds.map((track) => track.id);
    } else if (data) {
      this.playlist = [];
      this.trackIds = [];
    }
  },
  async activated() {
    if (this.$route.query.id !== this.currentQueryId) {
      this.currentQueryId = this.$route.query.id;
      let { data } = await playlistDetailAPI({ id: this.currentQueryId });
      console.log(data);
      if (data.code === 200) {
        this.playlist = data?.playlist;
        this.trackIds = data?.playlist.trackIds.map((track) => track.id);
      } else {
        this.playlist = [];
        this.trackIds = [];
      }
    }
  },
};
</script>

<style lang="less" scoped>
.palylist-detail {
  .playlist-cover {
    .tags-wrapper {
      .tag-item {
        margin-right: 0.05rem;
      }
    }
    /deep/.van-card__footer {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      font-size: 0.2rem;
      transform: translateY(70%);
      .playlist-info {
        display: flex;
        justify-content: space-around;
        width: 80%;
        border: 1px solid #333;
        border-radius: 0.15rem;
      }
    }
  }
  .playlist-song-wrapper {
    .is-hot-tag {
      margin: 0 0.1rem;
    }
    .play-circle-o-icon {
      font-size: 0.18rem;
    }
  }
  .creator-info {
    padding: 0.15rem;
    .creator-baseinfo {
      display: flex;
      align-content: center;
      .creator-avatar {
        flex: 1;
      }
      .creator-name {
        flex: 3;
        position: relative;
        margin-left: 0.17rem;
        padding: 0 0.17rem;
        font-size: 0.17rem;
        box-sizing: border-box;
        border-left: 1px solid #000;
        .signature {
          width: 2rem;
          margin: 0.08rem 0;
          font-size: 0.15rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .if-followed {
          position: absolute;
          bottom: 0;
          right: 5%;
        }
      }
    }
  }
}
</style>
