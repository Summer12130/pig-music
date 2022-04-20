<template>
  <div class="player" v-show="playlist.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="music.picUrl" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <van-icon name="arrow-down" class="icon-back" />
          </div>
          <h1 class="title">{{ music.name }}</h1>
          <h2 class="subtitle">{{ music?.song?.artists[0]?.name }}</h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="music.picUrl" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <b-scroll
            class="middle-r"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </b-scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="onProgressBarChange"
              ></progress-bar>
            </div>
            <span class="time time-r">{{ format(music.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <van-icon name="circle" />
            </div>
            <div class="icon i-left">
              <van-icon name="arrow-left" />
            </div>
            <div class="icon i-center">
              <van-icon
                :name="playIcon"
                @click="togglePlaying"
                :class="playCls"
              />
            </div>
            <div class="icon i-right">
              <van-icon name="arrow" />
            </div>
            <div class="icon i-right">
              <van-icon name="like-o" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" width="40" height="40" :src="music.picUrl" />
        </div>
        <div class="text">
          <h2 class="name">{{ music.name }}</h2>
          <p class="desc">{{ music?.song?.artists[0]?.name }}</p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <van-icon
              :name="miniIcon"
              :class="['icon-mini', miniCls]"
              @click.stop="togglePlaying"
            />
          </progress-circle>
        </div>
        <div class="control">
          <van-icon name="music" class="icon-playlist"></van-icon>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="music.url" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import Lyric from "lyric-parser";
import { prefixStyle } from "@/utils/dom";
import ProgressBar from "@/components/Player/ProgressBar";
import ProgressCircle from "@/components/Player/ProgressCircle";
import BScroll from "@/components/common/Scroll/BScroll";
const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  name: "Player",
  components: {
    ProgressBar,
    ProgressCircle,
    BScroll,
  },
  data() {
    return {
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      playingLyric: "",
      currentLineNum: 0,
      currentShow: "cd",
    };
  },
  computed: {
    playIcon() {
      return this.playing ? "pause-circle-o" : "play-circle-o";
    },
    playCls() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniIcon() {
      return this.playing ? "pause-circle-o" : "play-circle-o";
    },
    miniCls() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    percent() {
      return this.currentTime / this.music.duration;
    },
    ...mapGetters(["fullScreen", "playlist", "music", "playing"]),
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`,
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`,
        },
      };

      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear",
        },
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    onProgressBarChange(percent) {
      const currentTime = this.music.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    getLyric() {
      if (!this.music.lyric) {
        this.currentLyric = null;
        this.playingLyric = "";
        this.currentLineNum = 0;
        return;
      }
      this.currentLyric = new Lyric(this.music.lyric, this.handleLyric);
      if (this.playing) {
        this.currentLyric.play();
      }
      console.log(this.music.lyric, this.currentLyric);
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return;
      }
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
    }),
  },
  created() {
    this.touch = {};
  },
  watch: {
    music(newMusic, oldMusic) {
      // if (newMusic.id === oldMusic) return;
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.getLyric();
      });
    },
    playing() {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        this.playing ? audio.play() : audio.pause();
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "/src/assets/css/variable.less";
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background: @color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: @font-size-large-x;
          color: @color-theme;
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: @font-size-large;
        color: @color-text;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: @font-size-medium;
        color: @color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .playing-lyric-wrapper {
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          width: 80%;
          .playing-lyric {
            color: @color-text-l;
            font-size: @font-size-medium;
            height: 20px;
            line-height: 20px;
          }
        }
      }

      .middle-r {
        display: inline-block;
        height: 100%;
        overflow: hidden;
        vertical-align: top;
        width: 100%;
        .lyric-wrapper {
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          width: 80%;
          .text {
            color: @color-text-l;
            font-size: @font-size-medium;
            line-height: 32px;
          }
          .text.current {
            color: @color-text;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        font-size: 0;
        text-align: center;
        .dot {
          background: @color-text-l;
          border-radius: 50%;
          display: inline-block;
          height: 8px;
          margin: 0 4px;
          vertical-align: middle;
          width: 8px;
        }
        .dot.active {
          background: @color-text-ll;
          border-radius: 5px;
          width: 20px;
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: @color-text;
          font-size: @font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: @color-theme;
          &.disable {
            color: @color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: @color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
    &.normal-enter-from,
    &.normal-leave {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 60px;
    background: @color-highlight-background;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    &.mini-enter-from,
    &.mini-leave {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: @font-size-medium;
        color: @color-text;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
    .control {
      flex: 0 0 30px;
      padding: 0 10px;
      width: 30px;
      .icon-play-mini {
        color: @color-theme-d;
        font-size: 30px;
      }
      .icon-pause-mini {
        color: @color-theme-d;
        font-size: 30px;
      }
      .icon-playlist {
        color: @color-theme-d;
        font-size: 30px;
      }
      .icon-mini {
        font-size: 32px;
        left: 0;
        position: absolute;
        top: 0;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
