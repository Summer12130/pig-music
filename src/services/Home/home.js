import { request, request1 } from "../request";

const homeDataAPI = (params) =>
  request({
    url: "/homepage/block/page",
    params,
  });
const homeListAPI = (params) =>
  request1({
    url: "/homeLists",
    params,
  });

export { homeListAPI, homeDataAPI };
