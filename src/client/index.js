import axios from "axios";

/*
const instance = axios.create({
    baseURL: 'https://mcbackenddev.herokuapp.com/api/',
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'}
  });

  */
  const instance = axios.create({
    baseURL: 'https://randomuser.me/api/',
    timeout: 1000,
    //headers: {'X-Custom-Header': 'foobar'}
  });

export {instance};