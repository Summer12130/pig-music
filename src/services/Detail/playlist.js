import { request } from "../request";

const playlistDetailAPI = (params) =>
  request({
    url: "/playlist/detail",
    params,
  });

export { playlistDetailAPI };
