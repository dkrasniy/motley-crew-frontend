import React, { useContext, useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import Button from "../components/atoms/Button";
import { axiosInstance } from "../client";
import { AuthContext } from "../components/AuthProvider";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

function SignDocument() {
  const { routeSlipId, routeItemId } = useParams();
  const [routeItem, setRouteItem] = useState([]);

  const { config, token } = useContext(AuthContext);

  // get the route item
  useEffect(() => {
    let requestConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    // axiosInstance
    //   .get(``, requestConfig)
    //   .then((res) => {
    //     console.log(res.data);
    //     setRouteItem(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex justify-between">
          <b className="text-xl md:text-2xl text-gray-800">
            Sign Your Document
          </b>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
          route Slip: {routeSlipId}
          <br />
          route Id: {routeItemId}
        </div>
      </div>
    </Layout>
  );
}

export default SignDocument;
