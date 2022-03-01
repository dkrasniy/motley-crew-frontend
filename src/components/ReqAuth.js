 

import React, { useContext, useState } from "react";
import {  Navigate} from "react-router-dom";
import Login from "../views/login";
import { Spinner } from "./atoms/Spinner";
import { AuthContext } from "./AuthProvider";

export default function RequireAuth({ children }) {
    const { isUserLoggedIn } = useContext(AuthContext); 


    const [loading,setLoading]=useState(true)
    const [loggedIn, setLoggedIn]= useState(null)


    isUserLoggedIn().then(isLoggedIn => {  
        setLoggedIn(isLoggedIn)
        setLoading(false)
    })
 
    if(loading) {
        return  <div className="flex items-center justify-center"><Spinner/></div>
    } 

    if(loggedIn == false && !loading && loggedIn != null)  {
        return  <Login/>
    }

    return loggedIn ?  children : <Spinner/>

   

}
