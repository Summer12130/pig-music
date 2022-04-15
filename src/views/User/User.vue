<template>
  <div class="user">
    <van-cell center value-class="user-username" is-link @click="login">
      <!-- 登录后 -->
      <template #title v-if="this.$store.state.isLogin">
        <van-image height="100" width="100" round :src="avatar"></van-image>
      </template>
      <template #title v-else>
        <van-image height="100" width="100" round :src="avatar"></van-image>
      </template>

      <template #value>
        {{ username }}
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "User",
  computed: {
    username() {
      return this.$store.state.isLogin ? "猪飞飞" : "请登录";
    },
    avatar() {
      return this.$store.state.isLogin
        ? "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftx29%2F08151627444787039.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652600735&t=a32dbdabc31555777b190f38a753a0ac"
        : "";
    },
  },
  methods:{
    login(){
      const isLogin = this.$store.state.isLogin;
      if(!isLogin){
        Toast("请先登录!")
      }else{
        this.$store.commit("showNavBarLeftIcon", true)
        this.$router.push({
          path:"/user/detail",
          query:{
            uid: 123
          }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  /deep/.user-username {
    flex: 3;
    text-align: left;
    font-size: 0.2rem;
    font-weight: 900;
    margin-left: 0.2rem;
  }
}
</style>
