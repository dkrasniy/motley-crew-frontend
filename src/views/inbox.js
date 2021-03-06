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

        setFolderData(r.data.sort((a, b) => (a.id < b.id) ? 1 : -1))
        setLoadingFolders(false)
      })
      .catch((e) => {
        setLoadingFolders(false)
      })
  }, []);


  return (
    <Layout>
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between">
      <b className="text-xl md:text-2xl text-gray-800">Inbox</b> 
      <Button to={'/create/new'} color="secondary" className="inline-flex">New Folder</Button> 
      </div>
     
      <div className="my-4"> 
        <FolderList data={folderData} loading={loadingFolders} />
      </div> 

    </div>
    </Layout>
  );
}

export default Inbox;
