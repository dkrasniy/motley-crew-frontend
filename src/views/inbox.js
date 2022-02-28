import React, { useContext } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";


function Inbox() {
  
  const { user, logout } = useContext(AuthContext);


  console.log("user",user)
  return (
    <div className="max-w-lg mx-auto">
   <b> Welcome, {user.username}!</b> 


 
    <button className="bg-red-500 p-4" onClick={()=>{ 
          axiosInstance
          // path, data, config
          .get("/folders",{
            withCredentials: true,
          })
          .then((r) => {
            console.log(r);
          })
          .catch((e) => console.log(e)) 

        }}>Get Folders (GET) </button>  



   <Button color="red" onClick={()=>logout()}>Log Out</Button>
    </div>
  );
}

export default Inbox;
