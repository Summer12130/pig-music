import { request } from "../request";

const singerDetailAPI = (params) =>
  request({
    url: "/artist/songs",
    params,
  });

export { singerDetailAPI };
