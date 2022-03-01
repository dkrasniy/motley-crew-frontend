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
  config: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "" });
  const [token, setToken] = useState(null);

  const [loggingInStatus] = useState("Log in");

  const [errors, setErrors] = useState([]); 
 
  const logout = () => { 

    setUser({ username: "" }); 
    window.localStorage.removeItem("user");


    setToken(null); 
    window.localStorage.removeItem("access_token");
 
    navigate("/login");

  };
 
  const getUserProfileDetails = () => {  
   // get all the user details for logged in account
   axiosInstance
   // path, data, config
   .get("/profile", config)
   .then((r) => { 
     window.localStorage.setItem("user",
     JSON.stringify({...r.data.data})
   );

   setUser({...r.data.data })

   })
   .catch((e) => console.log(e));

  };

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  }; 
 
  async function isUserLoggedIn() {  
 
    if(!token || token == undefined || token == 'undefined') {
      return false
    }
     
   const res = await axiosInstance.post("auth/token/verify", { token: token })
       
   let { status } = res;

    if(status == 200) {
      return true 
    } else return false   
   
  }

  let navigate = useNavigate();


  useEffect(() => {
    let user = { username: "" };

    let access_token = localStorage.getItem("access_token");
    window.localStorage.getItem("access_token");
   
    user = localStorage.getItem("user");
    window.localStorage.getItem("user");
    //get info from localstorage and set in context state

    if(access_token) {
      setToken(access_token)

      //validate the token 
    }

    if (user) {
      setUser(JSON.parse(user));
    }  else {
      getUserProfileDetails()
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        token,
        user,
        config,
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
            .post("/auth/login", data)
            .then((r) => {
              console.log("Logged In",r.data.acccess);

              setToken(r.data.acccess) 
              window.localStorage.setItem("access_token", r.data.access)
 
              if(!r.data.error) { 
                getUserProfileDetails(); 
              }

              navigate(`/dashboard`); 

            })
            .catch((e) =>
            {
              alert("couldnt log in")
              console.log(e)
            });
 
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
