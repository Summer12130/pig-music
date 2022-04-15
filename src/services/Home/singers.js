import { request } from "../request";

const singersListAPI = params => request({
  url:"/artist/list",
  params
})

export {singersListAPI}