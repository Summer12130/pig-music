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
            <div class="moment-footer">
              <van-icon name="comment-o" @click="momentDetail(moment.id)" />
              &nbsp;{{ moment.commentCount }}
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="post-moment" @click="clickPostIcon">
      <van-icon name="comment-o"></van-icon>
    </div>
    <van-dialog
      v-model:show="showMoment"
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
    <van-dialog
      v-model:show="showComment"
      title="发表评论"
      show-cancel-button
      @confirm="postComment"
      @cancel="cancel"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入评论"
          show-word-limit
        />
      </van-cell-group>
    </van-dialog>
    <van-dialog
      v-model:show="showReplyComment"
      title="回复评论"
      show-cancel-button
      @confirm="postReplyComment"
      @cancel="cancel"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请输入..."
          show-word-limit
        />
      </van-cell-group>
    </van-dialog>
    <van-popup
      v-model:show="showCommentPopup"
      round
      position="bottom"
      :style="{ height: '65%' }"
    >
      <div class="comments-wrapper">
        <div class="wrapper-header">评论</div>
        <div class="comment-list" v-if="comments.length">
          <div
            class="comment-item"
            v-for="comment in comments"
            :key="comment.id"
            @click="replyComment(comment.id)"
          >
            <div class="user-avatar">
              <van-image
                :src="comment.creator.avatarUrl"
                width="50"
                height="50"
                round
                lazy-load
              ></van-image>
            </div>
            <div class="detail">
              <div class="user-info">{{ comment.creator.nickname }}</div>
              <div class="content">{{ comment.content }}</div>
              <div class="footer">
                <span>{{ comment.time }}</span>
              </div>
              <div class="reply">
                <div
                  class="reply-item"
                  v-for="reply in getReplyList(comment.id)"
                >
                  <div class="reply-wrapper">
                    <div class="reply-user">
                      <div class="avtar">
                        <van-image
                          :src="reply.creator.avatarUrl"
                          width="25"
                          height="25"
                          lazy-load
                          position="left"
                          center
                        ></van-image>
                      </div>
                      <div class="nickname">
                        {{ reply.creator.nickname }}
                      </div>
                    </div>
                    <div class="reply-content">
                      {{ reply.content }}
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
        <van-empty image-size="100" description="暂无评论" v-else />
        <div class="add-comment">
          <van-icon name="plus" @click="postCommentBtn"></van-icon>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getMomentListsAPI,
  postMomentAPI,
  postCommentAPI,
  replyCommentAPI,
  getCommentListAPI,
} from "@/services";
import {
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Empty,
  Field,
  Popup,
  PullRefresh,
  Toast,
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
    [Popup.name]: Popup,
    [Empty.name]: Empty,
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      showMoment: false,
      showComment: false,
      showReplyComment: false,
      showCommentPopup: false,
      value: "time",
      options: [
        { text: "时间排序", value: "time" },
        { text: "热度排序", value: "hot" },
      ],
      moments: [],
      comments: [],
      replies: [],
      currentMoment: null,
      currentComment: null,
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
      if (!this.isLogin) {
        Toast("请先登录!");
        return;
      }
      this.showMoment = true;
    },
    async postMoment() {
      let result = await postMomentAPI({
        uid: this.userInfo.account.id,
        content: this.message,
      });
      this.message = "";
    },
    cancel() {
      this.message = "";
    },
    async momentDetail(id) {
      this.showCommentPopup = true;
      this.currentMoment = id;
      let { data } = await getCommentListAPI({ mid: id });
      if (data.code === 200) {
        this.comments = data.result.filter((comment) => !comment.commentId);
        this.replies = data.result.filter((comment) => comment.commentId);
      }
    },
    async postCommentBtn() {
      if (!this.isLogin) {
        Toast("请先登录");
        return;
      }
      this.showComment = true;
      console.log(this.currentMoment);
    },
    async postComment() {
      let { data } = await postCommentAPI({
        content: this.message,
        mid: this.currentMoment,
        uid: this.userInfo.profile.userId,
      });
      if (data.code === 200) {
        Toast(data.message);
        let { data: nData } = await getCommentListAPI({
          mid: this.currentMoment,
        });
        if (nData.code === 200) {
          this.comments = nData.result;
        }
      }
      this.message = "";
      console.log(data);
    },
    async replyComment(cid) {
      if (!this.isLogin) {
        Toast("请先登录!");
        return;
      }
      this.currentComment = cid;
      this.showReplyComment = true;
    },
    async postReplyComment() {
      let { data } = await replyCommentAPI({
        cid: this.currentComment,
        uid: this.userInfo.profile.userId,
        mid: this.currentMoment,
        content: this.message,
      });
      if (data.code === 200) {
        Toast(data.message);
      }
    },
    getReplyList(cid) {
      return this.replies.filter((reply) => reply.commentId === cid);
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
    .moment-footer {
      font-size: 0.14rem;
      padding: 0.08rem 0.2rem;
      display: flex;
      justify-content: flex-end;
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
  .comments-wrapper {
    .wrapper-header {
      text-align: center;
      font-size: 0.18rem;
      padding: 0.15rem;
    }
    .comment-list {
      .comment-item {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding-left: 0.15rem;
        .detail {
          flex: 1;
          font-size: 0.15rem;
          padding-left: 0.1rem;
          .user-info {
            color: red;
          }
          .content {
            padding: 0.15rem 0.15rem 0.08rem 0;
            // min-height: 0.8rem;
          }
          .footer {
            color: #e1e1e1;
          }
          .reply {
            .reply-item {
              padding: 0.15rem;
              .reply-user {
                display: flex;
                color: red;
                .nickname {
                  line-height: 0.25rem;
                  padding-left: 0.15rem;
                }
              }
              .reply-content {
                background-color: #f1f1f1;
                width: 80%;
                margin-top: 0.05rem;
                margin-left: 0.3rem;
                padding: 0.1rem;
                border-radius: 0.05rem;
              }
            }
          }
        }
      }
    }
    .add-comment {
      position: fixed;
      bottom: 0.15rem;
      right: 0.15rem;
    }
  }
}
</style>
