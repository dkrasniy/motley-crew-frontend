import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";

import { axiosInstance } from "../client";

export default function RouteSlip({ routeSlipItems }) {

    const [userSearcAhead, setUserSearchAhead] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const { config, token } = useContext(AuthContext);
 
    useEffect(() => {
        if(userSearcAhead.length > 2) {
            console.log("search for: ", userSearcAhead)

            axiosInstance
                // path, data, config
                .get(`/user/search?query=${userSearcAhead}`, config)
                .then((r) => {
                    setSearchResults(r.data.users)
                })
                .catch((e) => {
                    console.log('error', e)
                }); 
        }
   

    }, [userSearcAhead]);


    return <div> <h3 className="font-semibold">Route Slip</h3>

        <input type="text" value={userSearcAhead} onChange={(e) => setUserSearchAhead(e.target.value)} placeholder="start typing" />
        {searchResults.map((user,u)=> <span className="block my-1 border p-2">{user.username}</span>)}
        <span className="text-blue-600 my-4 font-semibold text-sm block">Add Viewer</span>
        {/* <Button color="secondary" size="small" className="text-sm p-3">Add Viewer</Button> */}

    </div>

}
