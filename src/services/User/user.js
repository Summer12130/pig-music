import { request } from "../request";

const userPlaylistAPI = (params) =>
  request({
    url: "/user/playlist",
    params,
  });

const userDetailAPI = (params) =>
  request({
    url: "/user/detail",
    params,
  });
export { userPlaylistAPI, userDetailAPI };
