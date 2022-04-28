import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true
});

const request1 = axios.create({
  baseURL: "http://localhost:8000",
});

export { request, request1 };
