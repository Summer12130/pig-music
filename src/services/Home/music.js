import { request } from "../request";

const musicListAPI = (params) =>
  request({
    url: "/personalized/newsong",
    params,
  });

export { musicListAPI };
