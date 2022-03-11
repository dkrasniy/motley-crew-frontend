import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { useDropzone } from "react-dropzone";
import RouteSlip from '../components/RouteSlip'
import Button from "../components/atoms/Button";
import EditFolderDetails from '../components/EditFolderDetails'

function Folder(props) {
  const { config } = useContext(AuthContext);

  let params = useParams();

  const [currentFolder, setCurrentFolder] = useState({ name: "-", id: "" });
  const [loadingFolder, setLoadingFolder] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    //console.log("Dropped some files", acceptedFiles)


   acceptedFiles.forEach(element => {
     
    console.log("Eelement",element)


    var formData = new FormData(element);
 




    axios.post('/submit-files', acceptedFiles[0]).then(file => {
      console.log(file)
 }).catch(error => console.log(error))

 
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
    <li key={file.path} className="border-t py-3">
      {file.path} - {file.size} bytes
    </li>
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
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto my-6 px-4 md:px-6">
        <div className="flex justify-between items-center">

          <div>
            <Link className="block" to={"/dashboard"}>
              Back
            </Link>
            <b className="text-2xl my-2"> {currentFolder.name}</b>
            <br /> Folder ID: {params.folderId}
          </div>
          <div>
            <EditFolderDetails folderId={params.folderId} folderData={currentFolder}/>

          
          </div>

        </div>


        <div className="my-6">
          {loadingFolder ? <Spinner /> : null}

          <section className="flex border-t flex-wrap">
            <div className="w-full md:w-1/3 xl:w-1/4 bg-white py-6 px-2 md:border-r">
              <RouteSlip />
            </div>
            <div className="w-full md:w-2/3 xl:w-3/4 px-2 md:p-8">
              <h3 className="font-semibold">Folder Contents</h3>

              <button {...getRootProps({ className: 'dropzone' })} className="my-4 bg-gray-50 p-8 rounded-xl w-full overflow-hidden">
                <input {...getInputProps()} className="bg-red-500 p-8 block" />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>

                <div className="bg-gray-100 -mb-8 -mx-8 rounded-b-xl px-8  mt-8">
                  <ul className="py-8 text-left">{acceptedFileItems}</ul>
                  {/* 
              {acceptedFileItems.length > 0 ? <div className="my-2"> <h4 className="mb-2"><b>Accepted files</b></h4>
              <ul>{acceptedFileItems}</ul></div> : null}

              {fileRejectionItems.length > 0 ? <div className="my-2"> <h4 className="mb-2"><b>Rejected files</b></h4>
              <ul>{fileRejectionItems}</ul></div> : null} */}
                </div>
              </button>

            </div>
          </section>
        </div>


      </div>
    </Layout>
  );
}

export default Folder;
