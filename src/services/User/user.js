import { request } from "../request";

const userPlaylistAPI = (params) =>
  request({
    url: "/user/playlist",
    params,
  });

export { userPlaylistAPI };
