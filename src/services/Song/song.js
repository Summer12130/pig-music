import { request } from "../request";
const likeMusicAPI = (params) =>
  request({
    url: "/like",
    params,
  });
const musicCommentAPI = (params) =>
  request({
    url: "/comment/music",
    params,
  });
export { likeMusicAPI, musicCommentAPI };
