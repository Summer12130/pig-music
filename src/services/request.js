import axios from "axios";
// production
// request1
// http://101.43.130.54:8005
// request
// http://101.43.130.54:3000

// dev
// request1
// http://localhost:8000
// request
// http://localhost:3000

const request = axios.create({
  // baseURL: "http://101.43.130.54:3000",
  baseURL: "http://localhost:3000",
  withCredentials:true
});

const request1 = axios.create({
  // baseURL: "http://101.43.130.54:8005",
  baseURL: "http://localhost:8005",
});

export { request, request1 };
