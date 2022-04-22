<template>
  <div class="user">
    <van-cell center value-class="user-username" is-link @click="login">
      <!-- 登录后 -->
      <template #title>
        <van-image
          height="100"
          width="100"
          round
          :src="profile.avatarUrl"
        ></van-image>
      </template>

      <template #value>
        {{ profile.nickname }}
      </template>
    </van-cell>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="value in 6"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
    <!-- 登录逻辑 -->
    <van-popup
      v-model:show="toLogin"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <van-tabs v-model:active="active">
        <van-tab title="密码登录">
          <van-form @submit="onSubmit">
            <van-cell-group inset>
              <van-field
                v-model="phoneNumber"
                name="手机号码"
                label="手机号码"
                placeholder="手机号码"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </van-tab>

        <!-- 验证码登录 -->
        <van-tab title="验证码登录">
          <van-form @submit="onVerify">
            <van-cell-group inset>
              <van-field
                v-model="phoneNumber"
                name="手机号码"
                label="手机号码"
                placeholder="手机号码"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="sms"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
              >
                <template #button>
                  <van-button size="small" type="primary" @touchstart="sendSms"
                    >发送验证码</van-button
                  >
                </template>
              </van-field>
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import {
  cellphoneLoginAPI,
  sentSMSAPI,
  verifySMSAPI,
  userAccountAPI,
  loginStatusAPI,
} from "@/services";
import { Popup, Toast, Form, Field, Tabs, Tab } from "vant";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "User",
  components: {
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Field.name]: Field,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  data() {
    return {
      toLogin: false,
      phoneNumber: "",
      password: "",
      sms: "",
      active: 0,
      profile: { username: "请登录", avatar: "" },
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"]),
  },
  methods: {
    login() {
      if (!this.isLogin) {
        this.toLogin = true;
      } else {
        this.setNavLeftArrow(true);
        this.setShowTabBar(false);
        this.$router.push({
          path: "/user/detail",
          query: {
            uid: this.profile?.userId,
          },
        });
      }
    },
    async onSubmit() {
      let { data } = await cellphoneLoginAPI({
        phone: this.phoneNumber,
        password: this.password,
      });
      if (data.code === 200) {
        let { data } = await userAccountAPI();
        if (data.code === 200 && data.profile) {
          this.setLoginStatus(true);
          this.setUserInfo(data);
          this.profile = data.profile;
          this.setNavTitle(this.profile.nickname);
        }
        Toast("登陆成功");
        this.toLogin = false;
      } else if (data.code === 502) {
        this.setUserInfo({});
        Toast(data.msg);
        this.password = "";
      } else {
        this.setUserInfo({});
        Toast("登陆失败!");
        this.password = "";
      }
    },
    async sendSms() {
      let { data } = await sentSMSAPI({ phone: this.phoneNumber });
      console.log(data);
    },
    async onVerify() {
      let { data } = await verifySMSAPI({
        phone: this.phoneNumber,
        captcha: this.sms,
      });
      if (data.data) {
        let { data } = await loginStatusAPI();
        if (data.data.profile) {
          this.setLoginStatus(true);
          this.setUserInfo(data.data);
          this.profile = data.data.profile;
        }
        Toast("登陆成功");
        this.toLogin = false;
      } else {
        Toast("验证码错误");
      }
    },
    ...mapMutations({
      setNavLeftArrow: "SET_NAV_LEFT_ARROW",
      setLoginStatus: "SET_LOGIN_STATUS",
      setUserInfo: "SET_USER_INFO",
      setNavTitle: "SET_NAV_TITLE",
      setShowTabBar: "SET_SHOW_TABBAR",
    }),
  },
  async created() {
    if (this.isLogin) {
      this.profile = this.userInfo.profile;
      this.setNavTitle(this.profile.nickname);
    } else {
      Toast("请先登录!");
    }
  },
  async activated() {
    // 已经登录但没有用户数据

    this.profile.nickname && this.setNavTitle(this.profile.nickname);
    if (!this.userInfo && this.isLogin) {
      let { data } = await userAccountAPI();
      if (data.code === 200 && data.profile) {
        console.log("请求用户数据");
        this.setLoginStatus(true);
        this.setUserInfo(data);
      } else {
        Toast("拉取用户信息失败!");
      }
    }
  },
};
</script>

<style lang="less" scoped>
.user {
  /deep/.user-username {
    flex: 3;
    text-align: left;
    font-size: 0.14rem;
    font-weight: 900;
    margin-left: 0.2rem;
  }
}
</style>
