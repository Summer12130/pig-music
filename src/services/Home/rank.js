import { request } from "../request";

const allRankListAPI = (params) =>
  request({
    url: "/toplist",
    params,
  });
export { allRankListAPI };
