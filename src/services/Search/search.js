import { request } from "../request";

const searchSuggestListAPI = (params) =>
  request({
    url: "/search/suggest",
    params,
  });
const hotKeyWordsAPI = (params) =>
  request({
    url: "/search/hot",
    params,
  });

export { searchSuggestListAPI, hotKeyWordsAPI };
