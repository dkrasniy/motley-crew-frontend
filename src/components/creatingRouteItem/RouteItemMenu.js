import React, { useContext, useState, useEffect } from "react";
import { RouteItemContext } from "./routeItemContext";
import { axiosInstance } from "../../client";
import { AuthContext } from "../AuthProvider";

const RouteItemMenu = () => {
  // const fileId = file.id;
  const [userSearcAhead, setUserSearchAhead] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { config, token } = useContext(AuthContext);
  const {
    assignee,
    creatingRouteItem,
    saveRouteItem,
    handleStartCreateItem,
    drawMode,
    setDrawMode,
    resetRouteItem,
  } = useContext(RouteItemContext);

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

  useEffect(() => {
    return () => resetRouteItem();
  }, []);

  return (
    <div className="px-4">
      <div className="flex items-center mt-3">
        <label
          htmlFor="assignee"
          className="inline-block whitespace-nowrap pr-2 select-none font-bold"
        >
          Assigned to:
        </label>
        <span>{assignee?.username}</span>
      </div>
      {!assignee?.username ? (
        <div className="border-t border-b border-gray-100 my-2 mb-6 py-4">
          <span className="text-blue-600 mb-1 font-semibold text-sm block">
            Assign To
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
              key={user.username}
              onClick={() => {
                handleStartCreateItem(user);
                setUserSearchAhead("");
                setSearchResults([]);
              }}
              className="block my-1 border p-3 cursor-pointer rounded-lg bg-blue-600 text-white"
            >
              {user.username}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex justify-between items-center mb-3">
        <div>
          <label
            htmlFor="draw-field"
            className="inline-block whitespace-nowrap pr-2 select-none"
          >
            press to draw a form field
          </label>
          <input
            type="checkbox"
            name="draw-field"
            id="draw-field"
            checked={drawMode ? true : false}
            onChange={() => {
              if (creatingRouteItem) {
                setDrawMode(!drawMode);
              } else {
                window.alert("assign a user first");
              }
            }}
          />
        </div>

        <button
          className="px-1 bg-gray-100 border rounded"
          onClick={saveRouteItem}
        >
          Finalize Route Item
        </button>
      </div>
    </div>
  );
};

export default RouteItemMenu;
