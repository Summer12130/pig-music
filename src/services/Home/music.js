import { request } from "../request";

const musicListAPI = (params) =>
  request({
    url: "/personalized/newsong",
    params,
  });

const musicUrlAPI = params => request({
  url:"/song/url",
  params
})

export { musicListAPI, musicUrlAPI };
