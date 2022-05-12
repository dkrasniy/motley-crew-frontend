import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { AuthContext } from "../components/AuthProvider";
import { RouteItemContext } from "./creatingRouteItem/routeItemContext";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { Dialog, Transition } from "@headlessui/react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Button from "../components/atoms/Button";

const people = [
  "Ethan Covert",
  "Jose Torres",
  "Michael Vizcarrea",
  "Maksim Shaynuk",
  "David Krasniy",
];

const boxTypes = {
  0: "sign",
  1: "check",
  2: "date",
};

export default function SignatureBox({
  x,
  y,
  h,
  w,
  ratio,
  type,
  refw,
  refh,
  pagenum,
}) {
  const { handleStartCreateItemScan } = useContext(RouteItemContext);
  const { config } = useContext(AuthContext);
  const [userSearcAhead, setUserSearchAhead] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [promptSigneeForArea, setPromptSigneeForArea] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [user, setUser] = useState();

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
    <>
      <div
        onClick={() => setPromptSigneeForArea(true)}
        className={`hover:bg-green-500 hover:border-green-700 cursor-pointer hover:shadow-lg transition sig-box absolute border-2 text-purple-600 font-semibold flex items-center justify-center text-sm select-none
         ${
           selectedPerson != null
             ? "bg-blue-600 text-white rounded-lg"
             : "bg-purple-100 border-red-500 "
         }
         `}
        style={{
          top: y * ratio + "px",
          left: x * ratio + "px",
          height: h * ratio + "px",
          width: w * ratio + "px",
          zIndex: "51",
        }}
      >
        {selectedPerson != null ? (
          <span className="text-white">{people[selectedPerson]}</span>
        ) : (
          <span>
            <p className="font-bold">
              {user?.username ?? "_"} - {boxTypes[type]}
            </p>{" "}
            <span className="text-xs">
              h:{h} w:{w}
            </span>
          </span>
        )}
      </div>

      <Transition show={promptSigneeForArea} as={Fragment}>
        <Dialog
          open={promptSigneeForArea}
          onClose={() => setPromptSigneeForArea(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
          style={{ zIndex: "9999" }}
          // enter="transition duration-100 ease-out"
          // enterFrom="transform scale-95 opacity-0"
          // enterTo="transform scale-100 opacity-100"
          // leave="transition duration-75 ease-out"
          // leaveFrom="transform scale-100 opacity-100"
          // leaveTo="transform scale-95 opacity-0"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <Transition.Child
              as={Fragment}
              // enter="ease-out duration-300"
              // enterFrom="opacity-0 scale-95"
              // enterTo="opacity-100 scale-100"
              // leave="ease-in duration-200"
              // leaveFrom="opacity-100 scale-100"
              // leaveTo="opacity-0 scale-95"
            >
              <form className="relative bg-white max-w-lg w-full mx-auto p-8 rounded-xl">
                <Dialog.Title className={"font-bold text-lg"}>
                  Who needs to sign here?
                </Dialog.Title>

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
                        setUser(user);
                        setUserSearchAhead("");
                        setSearchResults([]);
                      }}
                      className="block my-1 border p-3 cursor-pointer rounded-lg bg-blue-600 text-white"
                    >
                      {user.username}
                    </span>
                  ))}
                </div>

                <p className="font-bold">Assignee: {user?.username ?? "/"}</p>
                <p className="font-bold">Form type: {boxTypes[type]}</p>

                {/* <Dialog.Description>
                  {people.map((person, p) => (
                    <button
                      key={p}
                      className=" flex my-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPerson(p);
                      }}
                    >
                      <div
                        className={`h-6 w-6 border rounded-xl ${
                          selectedPerson == p ? "bg-blue-500" : ""
                        }`}
                      ></div>
                      <span
                        className={`ml-2 ${
                          selectedPerson == 5 ? "text-blue-600" : ""
                        }`}
                      >
                        {person}
                      </span>
                    </button>
                  ))}
                </Dialog.Description> */}

                <div className="flex mt-8 justify-end">
                  <Button
                    type="button"
                    onClick={() => setPromptSigneeForArea(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      handleStartCreateItemScan(
                        user,
                        x,
                        y,
                        h,
                        w,
                        boxTypes[type],
                        type,
                        refw,
                        refh,
                        pagenum
                      );
                      setPromptSigneeForArea(false);
                    }}
                    className="ml-2"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
