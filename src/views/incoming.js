import React, { useContext, useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import Button from "../components/atoms/Button";
import { axiosInstance } from "../client";
import { AuthContext } from "../components/AuthProvider";

import { Link } from "react-router-dom";

function Incoming() {
  const [messages, setMessages] = useState([]);

  const { config, token } = useContext(AuthContext);

  useEffect(() => {
    let requestConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axiosInstance
      .get(`messages`, requestConfig)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (messages?.length < 1) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex justify-between">
            <b className="text-xl md:text-2xl text-gray-800">Incoming</b>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
            <p
              htmlFor="description"
              className="mb-1 text-left block text-sm font-medium text-gray-800"
            >
              You have no incoming messages
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex justify-between">
          <b className="text-xl md:text-2xl text-gray-800">Incoming</b>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
          {messages.map((m) => (
            <p key={m.id} className="flex justify-between">
              <span>➡️ {m.contents}</span>{" "}
              <Link
                to={`/complete-routeitem/${m.routeItem.routeSlip}/${m.routeItem.id}`}
                className="text-blue-500 hover:text-blue-400 underline"
              >
                Complete Here
              </Link>
            </p>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl mt-4">
          <span>messsage object looks like:</span>
          <pre>
            <code className="text-sm overflow-x-scroll">
              {JSON.stringify(messages[0], null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </Layout>
  );
}

export default Incoming;
