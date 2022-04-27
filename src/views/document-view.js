import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import samplePDF from '../components/samplecalPERSform.pdf';


export default function DocumentView() {
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [error, setError] = useState(null);

  const [loadingFolder, setLoadingFolder] = useState(true);
  const { config, token } = useContext(AuthContext);

  let params = useParams();

  useEffect(() => {

    // GETS ALL THE FILES IN THE FOLDER BY FOLDER ID 
    // THEN FINDS THE ID OF THE FILE IT NEEDS IN THE LIST OF ALL FILES FROM URL PROPS BY ID

    axiosInstance
      // path, data, config
      .get(`/folder/${parseInt(params.folderId)}/files`, config)
      .then((r) => {
        let fileFromFolderByID = r.data.files.filter(file => file.id == params.fileId)

        if (fileFromFolderByID.length > 0) {
          setCurrentlyViewingFile(r.data.files.filter(file => file.id == params.fileId))
          setLoadingFolder(false)
        } else {
          setError("cant find the file")
          setLoadingFolder(false)

        }

      })
      .catch((e) => {
        console.log('error', e)
        setLoadingFolder(false)

      });


  }, []);

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10 bg-gray-200 ">
        <div className="flex justify-between">




          <div>
            <Link className="block text-gray-700 text-sm" to={`/folder/${params.folderId}`}>
              Back
            </Link>

            {error ? <div>{error}</div> :

              (loadingFolder ? <Spinner /> : <>  
               <b className="text-xl md:text-2xl text-gray-800">{currentlyViewingFile && currentlyViewingFile[0].name}</b>

               {/* {currentlyViewingFile && currentlyViewingFile[0].file} */}
               

                <Document
                  
                  file={{
                    url:
                    currentlyViewingFile && currentlyViewingFile[0].file,
                  }}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                      />
                    ),
                  )}
                </Document></>)
            }

          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 right-0 min-h-screen bg-gray-100">
        sdklmfdsklfm
      </div>
    </Layout>
  );
}