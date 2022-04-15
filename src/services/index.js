// Home 页面接口

// Recommend
export { homeListAPI, homeDataAPI } from "./Home/home";
export {
  recommendAlbumAPI,
  recommendMusicAPI,
  recommendDjProgramAPI,
  recommendPerformanceAPI,
} from "./Home/recommend";

// Playlist
export { playlistTagsAPI } from "./Home/playlists";

// Singers
export { singersListAPI } from "./Home/singers";

// Music
export { musicListAPI } from "./Home/music";

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

// User页面接口

// UserProfile
export { userPlaylistAPI } from "./User/user";
