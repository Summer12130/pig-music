// Home 页面接口

// Recommend
export { homeListAPI, homeDataAPI } from "./Home/home";
export {
  recommendAlbumAPI,
  recommendMusicAPI,
  recommendDjProgramAPI,
  recommendPerformanceAPI,
  recommendBannerAPI,
} from "./Home/recommend";

// Playlist
export { playlistTagsAPI, playlistDataAPI } from "./Home/playlists";

// Singers
export { singersListAPI } from "./Home/singers";

// Music
export {
  musicListAPI,
  musicUrlAPI,
  musicDetailAPI,
  musicLyricAPI,
} from "./Home/music";

// DJ
export { djListAPI, djRecommendListAPI } from "./Home/dj";

// Rank
export { allRankListAPI } from "./Home/rank";

// Search页面接口

// Search
export { searchSuggestListAPI, hotKeyWordsAPI } from "./Search/search";

// Detail页面接口

// PlaylistDetail
export { playlistDetailAPI } from "./Detail/playlist";

// SingerDetail
export { singerDetailAPI } from "./Detail/singers";

// User页面接口

// UserProfile
export { userPlaylistAPI, userDetailAPI, userMomentsAPI } from "./User/user";

// Login
export {
  cellphoneLoginAPI,
  sentSMSAPI,
  verifySMSAPI,
  userAccountAPI,
  loginStatusAPI,
  createUserAPI,
} from "./User/login";

// Song 接口

export { likeMusicAPI, musicCommentAPI } from "./Song/song";

// Moment 接口

// Moment相关
export { getMomentListsAPI, postMomentAPI } from "./Community/moment";
// Comment 相关
export {
  postCommentAPI,
  replyCommentAPI,
  getCommentListAPI,
} from "./Community/comment";
