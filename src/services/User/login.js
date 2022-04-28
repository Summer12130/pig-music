import { request, request1 } from "../request";

const cellphoneLoginAPI = (params) =>
  request({
    url: "/login/cellphone",
    method: "POST",
    params,
  });

const sentSMSAPI = (params) =>
  request({
    url: "/captcha/sent",
    params,
  });

const verifySMSAPI = (params) =>
  request({
    url: "/captcha/verify",
    params,
  });

const userAccountAPI = (params) =>
  request({
    url: "/user/account",
    params,
  });

const loginStatusAPI = () =>
  request({
    url: "/login/status",
  });

const createUserAPI = (data) =>
  request1({
    url: "/user",
    method: "POST",
    data
  });
export {
  cellphoneLoginAPI,
  sentSMSAPI,
  verifySMSAPI,
  userAccountAPI,
  loginStatusAPI,
  createUserAPI
};
