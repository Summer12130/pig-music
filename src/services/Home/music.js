import { request } from "../request";

const musicListAPI = (params) =>
  request({
    url: "/personalized/newsong",
    params,
  });

const musicUrlAPI = (params) =>
  request({
    url: "/song/url",
    params,
  });

const musicDetailAPI = (params) =>
  request({
    url: "/song/detail",
    params,
  });

const musicLyricAPI = (params) =>
  request({
    url: "/lyric",
    params,
  });
export { musicListAPI, musicUrlAPI, musicDetailAPI, musicLyricAPI };
