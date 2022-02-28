 

import React, { useContext, useState } from "react";
import {  Navigate} from "react-router-dom";
import { Spinner } from "./atoms/Spinner";
import { AuthContext } from "./AuthProvider";

export default function RequireAuth({ children }) {
    const { isUserLoggedIn} = useContext(AuthContext); 


    const [loading,setLoading]=useState(true)
    const [loggedIn, setLoggedIn]= useState(null)


    isUserLoggedIn().then(isLoggedIn => { 
        setLoggedIn(isLoggedIn)
        setLoading(false)
    } )
 
    if(loading) {
        return  <Spinner/>
    } 

    return loggedIn ?  children : <Navigate to="/login" replace />

}
