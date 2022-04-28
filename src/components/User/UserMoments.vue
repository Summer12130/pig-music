<template>
  <div class="user-moment">
    <ul class="moment-list">
      <li class="moment-item" v-for="event in events" :key="event.uuid">
        <template v-if="event.type === 18">
          <div class="header">
            <div class="avatar">
              <van-image
                width="30"
                height="30"
                center
                :src="event.user.avatarUrl"
              ></van-image>
            </div>
            <div class="user-time">
              <p class="nickname">
                {{ event.user.nickname }}
                <span>{{ formatType(event.type) }}</span>
              </p>
              <p class="time">{{ formatMomentTime(event.eventTime) }}</p>
            </div>
          </div>
          <div class="content">
            <div class="user-comment">
              {{ event.json.msg }}
            </div>
            <div class="music-sharing">
              <div class="music-poster">
                <van-image
                  :src="
                    event.json.song.img80x80 || event.json.song.xInfo.img80x80
                  "
                  lazy-load
                  width="80"
                  height="80"
                ></van-image>
              </div>
              <div class="singer">
                <p class="music-name">{{ event.json.song.name }}</p>
                <p class="singer-name">{{ event.json.song.artists[0].name }}</p>
              </div>
            </div>
          </div>
          <van-divider
            :style="{
              color: '#969799',
              borderColor: '#969799',
              padding: '0 16px',
            }"
          >
            <van-icon name="guide-o" />
          </van-divider>
        </template>
        <template v-else-if="event.type === 35">
          <div class="header">
            <div class="avatar">
              <van-image
                width="30"
                height="30"
                center
                :src="event.user.avatarUrl"
              ></van-image>
            </div>
            <div class="user-time">
              <p class="nickname">
                {{ event.user.nickname }}
                <span>{{ formatType(event.type) }}</span>
              </p>
              <p class="time">{{ formatMomentTime(event.eventTime) }}</p>
            </div>
          </div>
          <div class="content">
            <div class="user-comment">
              {{ event.json.msg }}
            </div>
            <van-image :src="event.pics[0]?.originUrl"></van-image>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { userMomentsAPI } from "@/services";
import { mapGetters } from "vuex";
import { Divider } from "vant";
import { formatTime } from "@/utils/utils";
export default {
  name: "UserMoments",
  components: {
    [Divider.name]: Divider,
  },
  data() {
    return {
      moments: {},
    };
  },
  computed: {
    events() {
      return this.moments?.events?.map((moment) => {
        moment.json = JSON.parse(moment.json);
        return moment;
      });
    },
    ...mapGetters(["isLogin", "userInfo"]),
  },
  methods: {
    formatMomentTime(time) {
      return formatTime(time);
    },
    formatType(type) {
      switch (type) {
        case 18:
          return "分享单曲";
        case 19:
          return "分享专辑";
        case 17 || 28:
          return "分享电台节目";
        case 22:
          return "转发";
        case 39:
          return "发布视频";
        case 35 || 13:
          return "分享动态";
        case 24:
          return "分享专栏文章";
        case 41 || 21:
          return "分享视频";

        default:
          return "发布动态";
      }
    },
  },
  async created() {
    if (this.isLogin) {
      let { data } = await userMomentsAPI({
        uid: this.userInfo.profile.userId,
      });
      console.log(data);
      if (data.code === 200) {
        this.moments = data;
      }
    }
  },
  activated() {},
};
</script>

<style lang="less" scoped>
.user-moment {
  .moment-list {
    padding: 0.2rem;
    .moment-item {
      margin: 0.15rem;
      .header {
        display: flex;
        align-items: center;
        .user-time {
          margin-left: 0.15rem;
          font-size: 0.14rem;
          .nickname {
            margin-bottom: 0.05rem;
            color: #ed6a0c;
            span {
              color: #c8c9cc;
            }
          }
          .time {
            color: lightgray;
          }
        }
      }
      .content {
        margin: 0.15rem 0;
        .user-comment {
          font-size: 0.16rem;
          margin: 0.15rem 0;
        }
        .music-sharing {
          display: flex;
          height: 0.8rem;
          border-radius: 0.1rem;
          background: #abbaab; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            #ffffff,
            #abbaab
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            #ffffff,
            #abbaab
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

          overflow: hidden;
          .music-poster {
          }
          .singer {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-size: 0.16rem;
            margin-left: 0.2rem;
            .music-name {
              width: 100%;
            }
            .singer-name {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
