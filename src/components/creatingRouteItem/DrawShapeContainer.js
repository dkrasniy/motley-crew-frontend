import React, { useState, useRef, useEffect, useContext } from "react";
import Shape from "./Shape";
import { RouteItemContext } from "./routeItemContext";

const DrawShapeContainer = ({ pagenum, ratio }) => {
  const { shapes, setShapes, drawMode, setDrawMode, setRefPageDimensions } =
    useContext(RouteItemContext);

  const shapesTemp = shapes[pagenum] ?? [];

  const [isDrawing, setIsDrawing] = useState(false);
  const [refDimensions, setRefDimensions] = useState({});
  const wrapperRef = useRef();
  const currentDrawing = useRef();
  const offset = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (!drawMode) return;
    setIsDrawing(true);
    currentDrawing.current = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    );

    start.current = {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    };
    const styles = `position: absolute; left: ${start.current.x}px; top: ${
      start.current.y
    }px; width: ${9}px; height: ${9}px; border: 1px solid black`;
    currentDrawing.current.setAttributeNS(null, "style", styles);
    wrapperRef.current.appendChild(currentDrawing.current);
    // console.log(" > start: ", start.current);
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }

    let wid = e.clientX - offset.current.x - start.current.x;
    let hei = e.clientY - offset.current.y - start.current.y;

    if (wid > 0) {
      currentDrawing.current.style.width = `${wid}px`;
    } else {
      currentDrawing.current.style.width = `${Math.abs(wid)}px`;
      currentDrawing.current.style.left = `${e.pageX - offset.current.x}px`;
    }
    if (hei > 0) {
      currentDrawing.current.style.height = `${hei}px`;
    } else {
      currentDrawing.current.style.height = `${Math.abs(hei)}px`;
      currentDrawing.current.style.top = `${e.pageY - offset.current.y}px`;
    }
  };
  const handleMouseUp = (e) => {
    if (!isDrawing) {
      return;
    }
    if (
      parseInt(currentDrawing.current.style.width) < 10 ||
      parseInt(currentDrawing.current.style.height) < 10
    ) {
      wrapperRef.current.removeChild(currentDrawing.current);
      return;
    }
    setIsDrawing(false);
    setDrawMode(false);
    setShapes((shapes) => {
      const newShape = {
        id: Math.random() * 100000,
        x: parseInt(currentDrawing.current.style.left, 10),
        y: parseInt(currentDrawing.current.style.top, 10),
        width: parseInt(currentDrawing.current.style.width, 10),
        height: parseInt(currentDrawing.current.style.height, 10),
        data: undefined,
      };
      const temp = { ...shapes };
      if (temp[pagenum]) {
        temp[pagenum].push(newShape);
      } else {
        temp[pagenum] = [newShape];
      }
      return temp;
    });

    wrapperRef.current.removeChild(currentDrawing.current);
  };
  const handleMouseLeave = (e) => {
    if (!isDrawing) {
      return;
    }
    setIsDrawing(false);
    setDrawMode(false);
    wrapperRef.current.removeChild(currentDrawing.current);
    currentDrawing.current = null;
    // console.log("mouseLeave");
  };

  useEffect(() => {
    const { left, top } = wrapperRef.current.getBoundingClientRect();
    offset.current = { x: left, y: top };
    setRefDimensions({
      w: wrapperRef.current.offsetWidth,
      h: wrapperRef.current.offsetHeight,
    });
  }, []);

  return (
    <div
      className="absolute flex h-full justify-center top-0 w-full z-50"
      style={{ backgroundColor: "rgba(254, 243, 199,0.2)" }}
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {shapesTemp.map((s, i) => (
        <Shape key={i} s={s} pagenum={pagenum} dimensions={refDimensions} />
      ))}
    </div>
  );
};

export default DrawShapeContainer;
