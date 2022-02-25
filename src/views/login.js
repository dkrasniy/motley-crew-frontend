import React, { useState, useEffect } from "react";
import axios from "axios";
import { instance } from "../client";
import CONFIG from '../config'
import Button from '../components/atoms/Button'

function Login() {

  const [signInProgress, setSignInProgress] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignInProgress(true);

    var data = JSON.stringify({
      username: "ecovertmc",
      password: "S4!APgjuaDG5",
    });

    var config = {
      method: "post",
      url: `${CONFIG.BACKEND_ENDPOINT}/api/auth/login`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // setTimeout(() => {

    //     setSignInAttempted(true)
    //     setSignInProgress(false)
    // }, 1500);
  };

  useEffect(() => {
    function getData() {
      instance
        .get("/")
        .then((response) => {
          console.log(response.data);

        })
        .catch((error) => {
          console.log(error);
        });
    }

    getData();
  }, []);



  return (
    <div className="h-screen mx-auto bg-gray-100 flex items-center justify-center">
      <div className="max-w-sm">

        <form
          className="space-y-8 bg-white p-8 rounded-xl w-full"
          action="#"
          method="POST"
        >
          <div>
            <h1 className="font-bold text-lg">Welcome</h1>
            <p className="text-gray-600">By logging in you accept our Privacy Policy and Terms of Service.</p>

          </div>
          <div>
            <label
              htmlFor="email"
              className="text-left block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-left  block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>

            <Button loading={signInProgress} onClick={(e) => {
              handleSubmit(e);
            }}
              type="submit" className="w-full py-3">Sign In</Button>


          </div>
        </form>
      </div>

    </div>
  );
}

export default Login;
