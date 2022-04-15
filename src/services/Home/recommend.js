import { request } from "../request";

const recommendAlbumAPI = (params) =>
  request({
    url: "/personalized",
    params,
  });

const recommendMusicAPI = (params) =>
  request({
    url: "/personalized/newsong",
    params,
  });
const recommendDjProgramAPI = (params) =>
  request({
    url: "/personalized/djprogram",
    params,
  });
const recommendPerformanceAPI = (params) =>
  request({
    url: "/program/recommend",
    params,
  });

export {
  recommendAlbumAPI,
  recommendMusicAPI,
  recommendDjProgramAPI,
  recommendPerformanceAPI,
};
