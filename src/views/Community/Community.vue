<template>
  <div class="community">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value" :options="options" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="moment-wrapper">
          <div class="moment-item" v-for="moment in moments" :key="moment.id">
            <div class="moment-info">
              <div class="user-avatar">
                <van-image
                  :src="moment.creator.avatarUrl"
                  width="50"
                  height="50"
                  round
                  lazy-load
                ></van-image>
              </div>
              <div class="user">
                <p>{{ moment.creator.nickname }}</p>
                <p>{{ moment.time }}</p>
              </div>
            </div>
            <van-divider
              :style="{
                color: '#c8c9cc',
                borderColor: '#c8c9cc',
                padding: '0 16px',
              }"
            >
              <van-icon name="guide-o"></van-icon>
            </van-divider>
            <div class="moment-content">
              {{ moment.content }}
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="post-moment" @click="clickPostIcon">
      <van-icon name="comment-o"></van-icon>
    </div>
    <van-dialog
      v-model:show="show"
      title="发表动态"
      show-cancel-button
      @confirm="postMoment"
      @cancel="cancel"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入动态"
          show-word-limit
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { getMomentListsAPI, postMomentAPI } from "@/services";
import {
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Field,
  PullRefresh,
} from "vant";
import { mapGetters } from "vuex";
export default {
  name: "Community",
  components: {
    [Divider.name]: Divider,
    [PullRefresh.name]: PullRefresh,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      show: false,
      value: "time",
      options: [
        { text: "时间排序", value: "time" },
        { text: "热度排序", value: "hot" },
      ],
      moments: [],
      message: "",
      offset: 0,
      limit: 6,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "isLogin"]),
  },
  methods: {
    async onLoad() {
      let { data } = await getMomentListsAPI({
        offset: this.offset,
        limit: this.limit,
      });
      this.offset = this.offset + this.limit;
      if (data.length) {
        setTimeout(() => {
          this.moments.push(...data);
          this.loading = false;
        }, 300);
      } else {
        this.finished = true;
      }
    },
    async onRefresh() {
      let { data } = await getMomentListsAPI({
        offset: 0,
        limit: 5,
      });
      data = data.filter(
        (moment) => !this.moments.some((cmoment) => cmoment.id === moment.id)
      );
      setTimeout(() => {
        this.moments.unshift(...data);
        this.refreshing = false;
      }, 500);
    },
    clickPostIcon() {
      this.show = true;
    },
    async postMoment() {
      console.log(this.message, this.userInfo);
      let result = await postMomentAPI({
        uid: this.userInfo.account.id,
        content: this.message,
      });
      this.message = "";
    },
    cancel() {
      this.message = "";
    },
  },
  async created() {},
};
</script>

<style lang="less" scoped>
.community {
  .moment-item {
    width: 90%;
    margin: 0.1rem auto;
    border-radius: 0.15rem;
    background: #f1f1f1;
    overflow: hidden;
    .moment-info {
      display: flex;
      padding: 0.15rem 0.15rem 0;
      font-size: 0.14rem;

      .user {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        p {
          width: 2.5rem;
          padding-left: 0.3rem;
        }
      }
    }
    .moment-content {
      font-size: 0.14rem;
      padding: 0.15rem;
    }
  }
  .post-moment {
    position: fixed;
    bottom: 0.65rem;
    right: 0.15rem;
    width: 0.4rem;
    line-height: 0.4rem;
    border-radius: 50%;
    text-align: center;
    background-color: red;
  }
}
</style>
