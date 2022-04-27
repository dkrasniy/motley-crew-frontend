import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { axiosInstance } from "../client";

export default function RouteSlip({ routeSlipItems }) {


    const [userSearcAhead, setUserSearchAhead] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [routeSlipItemsList, setRouteSlipItemsList] = useState(null)

    const { config, token } = useContext(AuthContext);

    useEffect(() => {
        setRouteSlipItemsList(routeSlipItems)
    }, [routeSlipItems])

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }



        //update list with new values 
    }

    useEffect(() => {
        if (userSearcAhead.length > 2) {
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


    return <div>
        <div className="flex items-center justify-between"><h3 className="font-semibold">Route Slip</h3>
            {/* <span>{routeSlipItemsList && routeSlipItemsList.length}</span> */}
        </div>

        {/* <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (

                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {routeSlipItemsList && routeSlipItemsList.sort((a, b) => (a.orderNum > b.orderNum) ? 1 : -1).map((item, i) => (
                            <div>
                                <div index={i}
                                    key={i} className="bg-gray-50 rounded-lg p-3 text-sm my-2">
                                    {item.orderNum}
                                    <div>

                                        <b>{item.assignee.fullName}</b>
                                    </div>
                                    {item.actionType}
                                </div>

                            </div>
                        )
                        )}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext> */}

        {routeSlipItemsList && routeSlipItemsList.sort((a, b) => (a.orderNum > b.orderNum) ? 1 : -1).map((item, i) => {
            console.log("item", item)
            return (
                <div className="bg-gray-50 rounded-lg p-3 text-sm my-2">
                    {item.orderNum}
                    <div>

                        <b>{item.assignee.fullName}</b>
                    </div>
                    {item.actionType}</div>
            )
        })}


        <input type="text" value={userSearcAhead} onChange={(e) => setUserSearchAhead(e.target.value)} className="rounded-lg w-full border border-gray-100 p-3" placeholder="start typing" />
        {searchResults.map((user, u) => <span className="block my-1 border p-2 rounded-lg bg-blue-500 text-white">{user.username}</span>)}

        <span className="text-blue-600 my-4 font-semibold text-sm block">Add Viewer</span>


    </div>

}
