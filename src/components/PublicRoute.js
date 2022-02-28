 

import React, { useContext, useState } from "react";
import {  Navigate, useLocation} from "react-router-dom";
import { Spinner } from "./atoms/Spinner";
import { AuthContext } from "./AuthProvider";


export default function PublicRoute({ children }) { 
    const location = useLocation();
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
    
    if ((location.pathname === "/login" || location.pathname === "/login/" ) && !loading && loggedIn) {
        return <Navigate to="/dashboard" replace />
    } else return children

    

}
