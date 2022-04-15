export default {
  showNavBarLeftIcon(state, payload) {
    state.showLeftArrow = payload;
  },
  login(state) {
    state.isLogin = true;
  },
};
