import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
});

const request1 = axios.create({
  baseURL: "http://localhost:5000",
});

export { request, request1 };
