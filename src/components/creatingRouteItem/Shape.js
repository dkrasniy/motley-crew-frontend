import React, { useRef, useState, useContext } from "react";
import { RouteItemContext } from "./routeItemContext";

const RouteItemForm = ({ saveFormField, id, pagenum }) => {
  const [routeItemMode, setRouteItemMode] = useState("sign");
  const { removeShape } = useContext(RouteItemContext);

  return (
    <div
      className="bg-white shadow rounded border my-2 p-1"
      style={{
        position: "absolute",
        width: "100%",
        minWidth: "500px",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "999",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-1">
        <p className="inline-block whitespace-nowrap pr-2 select-none font-bold capitalize">
          form field type
        </p>
        <br />
        <label
          htmlFor="sign"
          className="inline-block whitespace-nowrap pr-2 select-none"
        >
          Sign:
        </label>
        <input
          type="radio"
          name="sign"
          id="sign"
          checked={routeItemMode === "sign"}
          onChange={() => setRouteItemMode("sign")}
        />
        <br />
        <label
          htmlFor="date"
          className="inline-block whitespace-nowrap pr-2 select-none"
        >
          Date:
        </label>
        <input
          type="radio"
          name="date"
          id="date"
          checked={routeItemMode === "date"}
          onChange={() => setRouteItemMode("date")}
        />
        <br />
        <label
          htmlFor="check"
          className="inline-block whitespace-nowrap pr-2 select-none"
        >
          Check:
        </label>
        <input
          type="radio"
          name="check"
          id="check"
          checked={routeItemMode === "check"}
          onChange={() => setRouteItemMode("check")}
        />
      </div>
      <div className="flex justify-between">
        <button
          className="px-1 bg-gray-100 border rounded"
          onClick={() => {
            saveFormField(routeItemMode);
          }}
        >
          Add form field to route item
        </button>

        <button
          className="px-1 bg-gray-100 border rounded"
          onClick={() => removeShape(pagenum, id)}
        >
          delete this
        </button>
      </div>
    </div>
  );
};

// https://codesandbox.io/s/vibrant-moon-s1efri?file=/src/index.js:1124-1146
const Shape = ({ s, pagenum, dimensions }) => {
  const { setRouteItem, assignee } = useContext(RouteItemContext);
  const [modelOpen, setModalOpen] = useState(false);
  const shapeRef = useRef();

  const saveFormField = (type) => {
    setRouteItem((before) => {
      const temp = { ...before };
      temp.formFields.push({
        id: s.id,
        form_type: type,
        page_num: 0,
        width: s.width,
        height: s.height,
        xpos: s.x,
        ypos: s.y,
        refw: dimensions.w,
        refh: dimensions.h,
      });
      console.log("temp");
      console.log(temp);

      return temp;
    });
    setModalOpen(false);
  };

  return (
    <div
      ref={shapeRef}
      className="absolute border border-black  __TEST___"
      style={{
        top: s.y,
        left: s.x,
        width: s.width,
        height: s.height,
        backgroundColor: "rgba(96, 165, 250, 0.25)",
      }}
      onClick={() => setModalOpen(!modelOpen)}
    >
      <p className="text-xs select-none uppercase">{assignee.username}</p>
      {modelOpen ? (
        <RouteItemForm
          saveFormField={saveFormField}
          id={s.id}
          pagenum={pagenum}
        />
      ) : null}
    </div>
  );
};

export default Shape;
