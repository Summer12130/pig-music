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

const userMomentsAPI = (params) =>
  request({
    url: "/user/event",
    params,
  });

export { userPlaylistAPI, userDetailAPI, userMomentsAPI };
