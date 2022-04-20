import * as types from "./mutation-types";
import { playMode } from "../utils/config";

export const selectPlay = function ({ commit, state }, { music, musicId }) {
  commit(types.SET_MUSIC, music);
  commit(types.ADD_MUSIC, music);
  commit(types.SET_PLAYER_STATUS, true);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
