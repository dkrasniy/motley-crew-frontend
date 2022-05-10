import React, { useState, useContext } from "react";
import { axiosInstance } from "../client";
import { AuthContext } from "../components/AuthProvider";
// import CONFIG from "../config";
import Button from "../components/atoms/Button";

function Login() {
  const { login } = useContext(AuthContext);

  const [signInProgress, setSignInProgress] = useState(false);

  const [username, setUsername] = useState("ecovertmc");
  const [password, setPassword] = useState("S4!APgjuaDG5");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignInProgress(true);
    login(username, password);
  };

  return (
    <div className="h-screen mx-auto bg-gray-100 flex items-center justify-center">
      <div className="max-w-sm">
        <form
          className="space-y-4 bg-white p-8 rounded-xl w-full"
          action="#"
          method="POST"
        >
          <div>
            <h1 className="font-bold text-xl mb-1">Welcome</h1>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
