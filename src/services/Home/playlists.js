import { request } from "../request";

const playlistTagsAPI = (params) =>
  request({
    url: "/playlist/highquality/tags",
    params,
  });

const playlistDataAPI = params => request({
  url:'/top/playlist/highquality',
  params
})

export { playlistTagsAPI };
