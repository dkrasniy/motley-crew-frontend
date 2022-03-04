import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import FolderList from "../components/FolderList";
import { Routes, Link, useParams } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { useDropzone } from "react-dropzone";

function Folder(props) {
  const { config } = useContext(AuthContext);

  let params = useParams();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [currentFolder, setCurrentFolder] = useState({ name: "-", id: "" });
  const [loadingFolder, setLoadingFolder] = useState(true);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  useEffect(() => {
    axiosInstance
      // path, data, config
      .get(`/folder/${parseInt(params.folderId)}`, config)
      .then((r) => {
        console.log(r.data.data);
        setCurrentFolder(r.data.data);
        setLoadingFolder(false);
      })
      .catch((e) => {
        setLoadingFolder(false);
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto my-6 px-4 md:px-6">
        <Link className="block" to={"/dashboard"}>
          Back
        </Link>
        <b className="text-xl"> {currentFolder.name}</b>

        <div className="bg-gray-50 rounded-xl p-8 my-6">
          {loadingFolder ? <Spinner /> : null}
          Folder ID: {params.folderId}

          <section className="container">
          <div {...getRootProps({ className: "dropzone border p-4 rounded border-gray-400" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
        </div>

        
      </div>
    </Layout>
  );
}

export default Folder;
