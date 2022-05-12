import { createContext, useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../client";
import axios from "axios";
const RouteItemContext = createContext();
import { AuthContext } from "../AuthProvider";

function RouteItemContextProvider(props) {
  const { config, token } = useContext(AuthContext);

  const defaultRouteItem = {
    assignee: -1,
    file: -1,
    routeSlip: -1,
    comments: "test comment",
    formFields: [],
  };
  const [shapes, setShapes] = useState({});
  const [assignee, setAssignee] = useState("");
  const [creatingRouteItem, setCreatingRouteItem] = useState(false);
  const [routeItem, setRouteItem] = useState(defaultRouteItem);

  const [routeItemsArray, setRouteItemsArray] = useState([]);

  const [routeSlip, setRouteSlip] = useState();
  const [file, setFile] = useState();
  const [drawMode, setDrawMode] = useState(false);

  const saveRouteItem = () => {
    // window.alert(JSON.stringify(routeItem, null, 2));
    if (routeItem.assignee === -1 || routeItem.formFields.length < 1) {
      window.alert("You have to add something to the route item");
      return;
    }
    axiosInstance
      .post(`/route-slip/${routeSlip.id}/create-route-item`, routeItem)
      .then((r) => {
        resetRouteItem();
        window.alert("Route item saved to route slip");
      })
      .catch((e) => {
        window.alert("Smething went wrong");
        console.log(e);
      });
  };

  const saveRouteItemsByScan = () => {
    if (routeItemsArray.length < 1) {
      window.alert("You have to add something to the route item");
      return;
    }
    routeItemsArray.forEach((item) => {
      if (item.formFields.length < 1) {
        window.alert("You have to add something to the route item");
        return;
      }
    });
    const requests = routeItemsArray.map((i) =>
      axiosInstance.post(`/route-slip/${routeSlip.id}/create-route-item`, i)
    );

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          window.alert("All your route items were added to the route slip");
          setRouteItemsArray([]);
          setAssignee("");
          setRouteSlip();
          setFile();
        })
      )
      .catch((errors) => {
        // react on errors.
        console.log(errors);
        window.alert("Something was wrong submitting the data");
        console.log(" > you tried submitting", routeItemsArray);
      });
  };

  const removeShape = (pagenum, id) => {
    setShapes((before) => {
      const temp = { ...before };
      const idx = temp[pagenum].findIndex((x) => x.id === id);
      temp[pagenum].splice(idx, 1);
      return temp;
    });
  };

  const handleStartCreateItem = (assignee) => {
    setCreatingRouteItem(true);
    setAssignee(assignee);
    setRouteItem((before) => {
      const temp = before;
      temp.assignee = assignee.id;
      temp.file = file.id;
      temp.routeSlip = routeSlip.id;
      // console.log(" > ", temp);
      return temp;
    });
  };

  const handleStartCreateItemScan = (
    user,
    x,
    y,
    h,
    w,
    ratio,
    type,
    refw,
    refh,
    pagenum
  ) => {
    // console.log(user.id, x, y, h, w, ratio, type, refw, refh, pagenum);
    // let id = user.id;
    setRouteItemsArray((before) => {
      const temp = [...before];
      // console.log(" > before:", temp);
      const idx = temp.findIndex((x) => x.assignee === user.id);
      // console.log("idx:", idx);
      if (idx === -1) {
        temp.push({
          assignee: user.id,
          fileId: file.id,
          actionType: "sign",
          comments: "test comment",
          formFields: [
            {
              form_type: type,
              page_num: pagenum,
              width: w,
              height: h,
              xpos: x,
              ypos: y,
              refw: refw,
              refh: refh,
            },
          ],
        });
      } else {
        temp[idx].formFields.push({
          form_type: type,
          page_num: pagenum,
          width: w,
          height: h,
          xpos: x,
          ypos: y,
          refw: refw,
          refh: refh,
        });
      }

      return temp;
    });
  };

  const resetRouteItem = () => {
    setCreatingRouteItem(false);
    setRouteItem(defaultRouteItem);
    setAssignee("");
    setShapes({});
    setDrawMode(false);
  };

  useEffect(() => {
    console.log("context routeItemsArray:");
    console.log(routeItemsArray);
  }, [routeItemsArray]);

  const values = {
    shapes,
    setShapes,
    assignee,
    setAssignee,
    routeItem,
    setRouteItem,
    creatingRouteItem,
    setCreatingRouteItem,
    saveRouteItem,
    removeShape,
    handleStartCreateItem,
    drawMode,
    setDrawMode,
    routeSlip,
    setRouteSlip,
    file,
    setFile,
    resetRouteItem,
    handleStartCreateItemScan,
    saveRouteItemsByScan,
  };

  return (
    <RouteItemContext.Provider value={values}>
      {props.children}
    </RouteItemContext.Provider>
  );
}

export { RouteItemContext, RouteItemContextProvider };
