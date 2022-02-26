import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: "https://mcbackenddev.herokuapp.com/api/",
  timeout: 3000,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  //headers: {'X-Custom-Header': 'foobar'}
});

export { axiosInstance };
