import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { axiosInstance } from "../client";
import Button from "./atoms/Button";

export default function RouteSlip({ routeSlipItems, routeSlip }) {
  const routeSlipId = routeSlip?.id;
  const [userSearcAhead, setUserSearchAhead] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [routeSlipItemsList, setRouteSlipItemsList] = useState(null);

  const { config, token } = useContext(AuthContext);

  useEffect(() => {
    setRouteSlipItemsList(routeSlipItems);
    console.log(" > ", routeSlip);
  }, [routeSlipItems]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    //update list with new values
  }

  const handleStartRoute = () => {
    // console.log(`starting route ${routeSlipId}`);

    let requestConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axiosInstance
      .post(`route-slip/${routeSlipId}/start`, requestConfig)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userSearcAhead.length > 2) {
      //   console.log("search for: ", userSearcAhead);

      axiosInstance
        // path, data, config
        .get(`/user/search?query=${userSearcAhead}`, config)
        .then((r) => {
          setSearchResults(r.data.users);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }, [userSearcAhead]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Route Slip</h3>
        <span>{routeSlipItemsList && routeSlipItemsList.length}</span>
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

      {routeSlipItemsList &&
        routeSlipItemsList
          //   .sort((a, b) => (a.orderNum > b.orderNum ? 1 : -1))
          .map((item, i) => {
            console.log("item", item);
            return (
              <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm my-2">
                <div>
                  <b>{item.assignee.fullName}</b>
                </div>
                {item.actionType}
              </div>
            );
          })}

      <div className="border-t border-b border-gray-100 my-6 py-4">
        <span className="text-blue-600 mb-1 font-semibold text-sm block">
          Add Viewer
        </span>
        <input
          type="text"
          value={userSearcAhead}
          onChange={(e) => setUserSearchAhead(e.target.value)}
          className="rounded-lg w-full border border-gray-100 p-3"
          placeholder="start typing"
        />
        {searchResults.map((user, u) => (
          <span
            onClick={() => {
              setRouteSlipItemsList((routeSlipItems) => [
                ...routeSlipItems,
                {
                  actionType: "view",
                  orderNum: routeSlipItems.length + 1,
                  assignee: { ...user },
                },
              ]);
              setUserSearchAhead("");
              setSearchResults([]);
            }}
            className="block my-1 border p-3 cursor-pointer rounded-lg bg-blue-600 text-white"
          >
            {user.username}
          </span>
        ))}
      </div>
      <span>route started? {routeSlip?.routeStartTime ? "Yes" : "No"}</span>
      {routeSlip?.routeStartTime ? (
        <span onClick={handleStartRoute}>Route already Started</span>
      ) : (
        <Button onClick={handleStartRoute}>Start Route</Button>
      )}
    </div>
  );
}
