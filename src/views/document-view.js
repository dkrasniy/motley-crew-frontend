import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import samplePDF from '../components/samplecalPERSform.pdf';

const sigBoxes = [
  {page: 1, x: 40, y: 20, h: 40, w:200},
  {page: 1, x: 400, y: 60, h: 40, w:150},
  {page: 2, x: 400, y: 60, h: 40, w:150}]

export default function DocumentView() {
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [docViewContainerWidth, setDocViewContainerWidth] = useState(800);

  const [error, setError] = useState(null);
  const ref = useRef(null);

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
  useEffect(() => {
    setDocViewContainerWidth(ref.current.offsetWidth);
  }, [ref]);


  return (
    <Layout>
      <div className="border-b border-gray-100 px-4 md:px-6 py-6 bg-white sticky top-0 z-10">
      <Link className="block text-gray-700 text-sm" to={`/folder/${params.folderId}`}>
              Back
            </Link>
      <h1 className="text-lg md:text-xl text-gray-700">{loadingFolder ? <Spinner /> : <>  
               <b>{currentlyViewingFile && currentlyViewingFile[0].name}</b></>}</h1>
             
        {numPages} pages
      
    
      </div>
      <div className="bg-blue-500  p-3 text-white text-center  font-semibold py-5 text-sm">
            Setup document for signing
          </div>
      <div className=" justify-between flex">
        
        <div className="flex justify-center w-full align-center"  ref={ref}>  
          <div> 

            {error ? <div>{error}</div> :


              (loadingFolder ? <Spinner /> : <>  
               
                <Document
                  file={{
                    url:
                    currentlyViewingFile && currentlyViewingFile[0].file,
                  }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="mx-auto"
                >
                  {Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <div>
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className={"shadow-xl mb-4"}
                        width={docViewContainerWidth*.5} 
                        onClick={()=>console.log("INdex")}

                      ><div className="signature-boxes-data">
                        {sigBoxes && sigBoxes.filter(box => box.page == index+1).map((box, b)=> (
                          <div className="sig-box bg-purple-100 absolute rounded-lg text-purple-600 font-semibold flex items-center justify-center text-sm select-none	" style={{top: box.y+'px', left: box.x+'px', height: box.h + 'px', width: box.w + 'px'}}>
                            Sign Here
                          </div>
                        ))}
                        </div>
                        
                        </Page>
                      
                      </div>
                    ),
                  )}
                </Document></>)
            }

          </div>
        </div>
       
      </div>
     
    </Layout>
  );
}