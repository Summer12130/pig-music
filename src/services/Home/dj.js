import { request } from "../request";

const djListAPI = (params) =>
  request({
    url: "/dj/catelist",
    params,
  });

const djRecommendListAPI = (params) =>
  request({
    url: "/dj/recommend",
    params,
  });

//dj/radio/hot?cateId=3
export { djListAPI, djRecommendListAPI };
