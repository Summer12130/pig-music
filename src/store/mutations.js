import * as types from "./mutation-types";
export default {
  showNavBarLeftIcon(state, payload) {
    state.showLeftArrow = payload;
  },
  login(state) {
    state.isLogin = true;
  },
  logout(state) {
    state.isLogin = false;
  },
  userInfo(state, payload) {
    state.userInfo = payload;
  },
  [types.SET_MUSIC](state, music) {
    state.music = music;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.ADD_MUSIC](state, music){
    state.playlist.push(music)
  }
};
