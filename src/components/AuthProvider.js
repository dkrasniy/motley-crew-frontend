import React, { useState, useEffect } from "react";
import { axiosInstance } from "../client";
import { useNavigate } from "react-router-dom"; 

export const AuthContext = React.createContext({
  token: null,
  user: { username: "" },
  loggingInStatus: null,
  loginErrors: null,
  isUserLoggedIn: () => {
    return false;
  },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "" });
 
  const [loggingInStatus] = useState("Log in");

  const [errors, setErrors] = useState([]); 

  
  const logout = () => {
  
    axiosInstance
    // path, data, config
    .post("/auth/logout", {
      withCredentials: true,
    })
    .then((r) => {
      console.log("Logged In",r.data); 

    })
    .catch((e) => console.log(e));

    
    setUser({ username: "" }); 
    window.localStorage.removeItem("user");

    navigate("/login");
  };
 
 
  async function isUserLoggedIn() {

    let res = await axiosInstance.get("auth/loggedin", {
      withCredentials: true,
    })
    let { data } = res.data;
 
    
    return data.authenticated 
  }

  let navigate = useNavigate();


  useEffect(() => {
    let user = { username: "" };
    user = localStorage.getItem("user");
    window.localStorage.getItem("user");
    //get info from localstorage and set in context state

    if (user) setUser(JSON.parse(user));

  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user,
        loggingInStatus: loggingInStatus,
        loginErrors: errors,
        isUserLoggedIn: isUserLoggedIn,
        login: (username, password) => {
          async function processLogin() {
            setErrors([]); 
          
            var data = {
              username: username,
              password: password,
            };
        
            axiosInstance
            // path, data, config
            .post("/auth/login", data, {
              withCredentials: true,
            })
            .then((r) => {
              console.log("Logged In",r.data);

              if(!r.data.error) {
              
                navigate(`/dashboard`);

                 window.localStorage.setItem("user",
                      JSON.stringify({username: r.data.data.username})
                  );

                setUser({ username: r.data.data.username })

              }

            })
            .catch((e) => console.log(e));
 
          }

          processLogin();
        },
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
