import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { useDropzone } from "react-dropzone";
import RouteSlip from '../components/RouteSlip'
import EditFolderDetails from '../components/EditFolderDetails'
import FileList from "../components/FileList";
import DeleteFolder from "../components/DeleteFolder";
import FileItem from "../components/FileItem";
function Folder(props) {
  const { config, token } = useContext(AuthContext);

  let params = useParams();

  const [currentFolder, setCurrentFolder] = useState({ name: "-", id: "" });
  const [filesInFolder, setFilesInFolder] = useState([]);

  const [loadingFolder, setLoadingFolder] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    //console.log("Dropped some files", acceptedFiles)


   acceptedFiles.forEach(element => {

    let name = element.name
     
    console.log('eleme',element)

    var formData = new FormData();
    formData.append('file', element)
    formData.append('name', name)
 

      let formConfig = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundaryrbD7RZFR5iPWDPXE",
        },
      };

      axiosInstance.post(`folder/${params.folderId}/create-file`, formData, formConfig)
        .then((r) => {
          console.log(r.data);
        })
        .catch((e) => {
          console.log(e);
        });

 
   });


  }, [])

  




  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'application/pdf, image/jpeg,image/png',
    onDrop
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <FileItem key={file.path} name={file.path} pending={true}/>

  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    axiosInstance
      // path, data, config
      .get(`/folder/${parseInt(params.folderId)}`, config)
      .then((r) => {
        console.log(r.data);
        setCurrentFolder(r.data);
        setLoadingFolder(false);
      })
      .catch((e) => {
        setLoadingFolder(false);
      });
 
      axiosInstance
      // path, data, config
      .get(`/folder/${parseInt(params.folderId)}/files`, config)
      .then((r) => {
        setFilesInFolder(r.data.files); 
      })
      .catch((e) => {
        console.log('error',e)
      });


  }, []);

  return (
    <Layout>
       <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between">
      

     
          <div>
            <Link className="block text-gray-700 text-sm" to={"/dashboard"}>
              Back
            </Link>
            <b className="text-xl md:text-2xl text-gray-800">{currentFolder.name}</b>
            <span className="text-gray-500">
            {/* Folder ID: {params.folderId} */}
            <p>Description: {currentFolder.description}</p>
            <p>Completion Date: {currentFolder.desiredCompletionDate}</p>
            <div className="flex items-center space-x-2"><p>Expedited: {currentFolder.expedited ? "Yes" : "No"}</p>
            <p>Confidential: {currentFolder.confidential ? "Yes" : "No"}</p>
            </div>
            </span>
          </div>
          <div className="flex items-center">
            <EditFolderDetails folderId={params.folderId} folderData={currentFolder} config={config} setCurrentFolder={setCurrentFolder}/>
            <DeleteFolder folderId={params.folderId} config={config} folderData={currentFolder} />
          </div>

        </div>


        <div className="my-6">
          {loadingFolder ? <Spinner /> : null}

          <section className="flex border-t flex-wrap">
            <div className="w-full md:w-1/3 xl:w-1/4 bg-white py-6 px-3 md:border-r">
              <RouteSlip routeSlipItems={currentFolder.routeSlips && currentFolder.routeSlips[0]  && currentFolder.routeSlips[0].routeItems} />
            </div>
            <div className="w-full md:w-2/3 xl:w-3/4 px-2 md:p-8">
              <h3 className="font-bold text-lg mb-6">Folder Contents ({filesInFolder.length})</h3>

              <FileList files={filesInFolder}/>

              <button {...getRootProps({ className: 'dropzone' })} className="my-4 border border-dashed dashed p-8 rounded-xl w-full overflow-hidden">
                <input {...getInputProps()} className="bg-red-500 p-8 block" />
                <p>Drag 'n' drop some files here, or click to select files</p>
 
                {acceptedFileItems.length > 0  ? <div className="border-t border-dashed -mb-8 -mx-8 rounded-b-xl px-8  mt-8">
                  <ul className="py-8 text-left">{acceptedFileItems}</ul>
                  {/* 
              {acceptedFileItems.length > 0 ? <div className="my-2"> <h4 className="mb-2"><b>Accepted files</b></h4>
              <ul>{acceptedFileItems}</ul></div> : null}

              {fileRejectionItems.length > 0 ? <div className="my-2"> <h4 className="mb-2"><b>Rejected files</b></h4>
              <ul>{fileRejectionItems}</ul></div> : null} */}
                </div> : null}
              </button>

            </div>
          </section>
        </div>


      </div>
    </Layout>
  );
}

export default Folder;