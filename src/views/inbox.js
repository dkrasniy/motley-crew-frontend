import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import FolderList from "../components/FolderList";


function Inbox() {

  const { user, logout } = useContext(AuthContext);

  const [folderData, setFolderData] = useState([])

  const [loadingFolders, setLoadingFolders] = useState(true)

  useEffect(() => {
    axiosInstance
      // path, data, config
      .get("/folders", {
        withCredentials: true,
      })
      .then((r) => {

        setFolderData(r.data.data)
        setLoadingFolders(false)
      })
      .catch((e) => {
        setLoadingFolders(false)
      })
  }, []);


  return (
    <div className="max-w-3xl mx-auto my-6 px-4 md:px-6">
      <b>Welcome, {user.username}!</b> 

      <div className="bg-gray-50 rounded-xl p-8 my-6">
    
        <FolderList data={folderData} loading={loadingFolders} />
      </div> 

    </div>
  );
}

export default Inbox;
