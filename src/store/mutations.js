import * as types from "./mutation-types";
export default {
  [types.SET_NAV_LEFT_ARROW](state, flag) {
    state.showLeftArrow = flag;
  },
  [types.SET_SHOW_TABBAR](state, flag) {
    state.showTabBar = flag;
  },
  [types.SET_USER_INFO](state, user) {
    state.userInfo = user;
  },
  [types.SET_LOGIN_STATUS](state, flag) {
    state.isLogin = flag;
  },
  [types.SET_PLAYER_STATUS](state, flag) {
    state.showPlayer = flag;
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
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
  [types.ADD_MUSIC](state, music) {
    state.playlist.push(music);
  },
  [types.SET_NAV_TITLE](state, title) {
    state.navTitle = title;
  },
};
