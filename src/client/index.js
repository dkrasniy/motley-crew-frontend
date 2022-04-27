import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: "http://192.168.5.88:8000/api/",
  // baseURL: "https://mcbackenddev.herokuapp.com/api/",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  //headers: {'X-Custom-Header': 'foobar'}
});

export { axiosInstance };
