import { request1 } from "../request";

const postCommentAPI = (data) =>
  request1({
    url: "/comment",
    method: "POST",
    data,
  });
const replyCommentAPI = (data) =>
  request1({
    url: "/comment/reply",
    method: "POST",
    data,
  });

const getCommentListAPI = (params) =>
  request1({
    url: "/comment",
    params,
  });
export { postCommentAPI, replyCommentAPI, getCommentListAPI };
