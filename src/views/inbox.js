import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import FolderList from "../components/FolderList";
import Layout from "../components/Layout";


function Inbox() {

  const { user, logout, config } = useContext(AuthContext);

  const [folderData, setFolderData] = useState([])

  const [loadingFolders, setLoadingFolders] = useState(true)

  useEffect(() => {
    axiosInstance
      // path, data, config
      .get("/folders", config)
      .then((r) => {

        setFolderData(r.data.data)
        setLoadingFolders(false)
      })
      .catch((e) => {
        setLoadingFolders(false)
      })
  }, []);


  return (
    <Layout>
    <div className="max-w-7xl mx-auto my-6 px-4 md:px-6">
      <div className="flex justify-between">
      <b className="text-xl">Welcome, {user.username}!</b> 
      <Button to={'/create/new'} className="inline-flex">New Folder</Button> 
      </div>
     
      <div className="bg-gray-50 rounded-xl p-8 my-6">
    
        <FolderList data={folderData} loading={loadingFolders} />
      </div> 

    </div>
    </Layout>
  );
}

export default Inbox;
