import { request1 } from "../request";

const getMomentListsAPI = (params) =>
  request1({
    url: "/moment/list",
    params,
  });

const postMomentAPI = (data) =>
  request1({
    url: "/moment",
    method: "POST",
    data: {
      ...data,
    },
  });

export { getMomentListsAPI, postMomentAPI };
