import React, { useState } from "react";
import { axiosInstance } from "../client";
// import CONFIG from "../config";
import Button from "../components/atoms/Button";

function Login() {
  const [signInProgress, setSignInProgress] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignInProgress(true);

    var data = {
      username: "ecovertmc",
      password: "S4!APgjuaDG5",
    };

    axiosInstance
      // path, data, config
      .post("/auth/login", data, {
        withCredentials: true,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setSignInProgress(false);
      });

    // setTimeout(() => {

    //     setSignInAttempted(true)
    //     setSignInProgress(false)
    // }, 1500);
  };

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
            <p className="text-gray-600">
              By logging in you accept our Privacy Policy and Terms of Service.
            </p>
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
            <Button
              loading={signInProgress}
              onClick={(e) => {
                handleSubmit(e);
              }}
              type="submit"
              className="w-full py-3"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
