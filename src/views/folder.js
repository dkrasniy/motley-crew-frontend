import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import FolderList from "../components/FolderList";
import { Routes, Link, useParams } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";


function Folder() {
  

  const { config } = useContext(AuthContext);

  let params = useParams();

  const [currentFolder, setCurrentFolder] = useState({name: "-", id: ""})
  const [loadingFolder, setLoadingFolder] = useState(true)

  useEffect(() => {
    axiosInstance
      // path, data, config
      .get(`/folder/${parseInt(params.folderId)}`, config)
      .then((r) => {
        console.log(r.data.data)
        setCurrentFolder(r.data.data)
        setLoadingFolder(false)
      })
      .catch((e) => {
        setLoadingFolder(false)
      })
  }, []);

 

  return (
    <Layout>
    <div className="max-w-4xl mx-auto my-6 px-4 md:px-6">
      <Link className="block" to={'/dashboard'}>Back</Link>
      <b className="text-xl"> {currentFolder.name}</b> 
      
      <div className="bg-gray-50 rounded-xl p-8 my-6">
      {loadingFolder ? <Spinner/> : null}

      Folder ID:  {params.folderId}
     
       
      </div> 

    </div>
    </Layout>
  );
}

export default Folder;
