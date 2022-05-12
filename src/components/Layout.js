import React, { useEffect } from "react";
import Header from "./Header";

function Layout({ children }) {
  //   useEffect(() => {
  //     document.body.addEventListener(
  //       "mousemove",
  //       function (e) {
  //         console.log(` >mouse body> x: ${e.clientX}, y: ${e.clientY}`);
  //       },
  //       false
  //     );
  //   }, []);

  return (
    <>
      <Header />
      <div className="md:pl-64 flex flex-col flex-1">{children}</div>
    </>
  );
}

export default Layout;
