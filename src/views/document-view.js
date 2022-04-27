import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from "../components/atoms/Button";

const sigBoxes = [
  [
    1700,
    2200,
    0,
    0,
    0,
    0
  ],
  [
    0,
    1,
    1007,
    407,
    45,
    45
  ],
  [
    0,
    1,
    183,
    409,
    44,
    45
  ],
  [
    0,
    1,
    600,
    409,
    44,
    45
  ],
  [
    0,
    1,
    1381,
    409,
    45,
    44
  ],
  [
    0,
    1,
    151,
    1210,
    124,
    108
  ],
  [
    0,
    1,
    174,
    1233,
    86,
    60
  ],
  [
    0,
    1,
    174,
    1336,
    87,
    59
  ],
  [
    1,
    1,
    151,
    210,
    124,
    142
  ],
  [
    1,
    1,
    165,
    230,
    87,
    59
  ],
  [
    1,
    1,
    168,
    371,
    87,
    61
  ],
  [
    1,
    1,
    313,
    833,
    56,
    44
  ],
  [
    1,
    1,
    1008,
    839,
    55,
    44
  ],
  [
    1,
    1,
    151,
    1259,
    124,
    185
  ],
  [
    1,
    1,
    167,
    1288,
    87,
    60
  ],
  [
    1,
    1,
    151,
    1446,
    124,
    161
  ],
  [
    1,
    1,
    151,
    1608,
    124,
    191
  ],
  [
    1,
    1,
    167,
    1631,
    87,
    60
  ],
  [
    1,
    1,
    151,
    1800,
    124,
    113
  ],
  [
    1,
    1,
    167,
    1819,
    87,
    60
  ],
  [
    1,
    1,
    151,
    1914,
    124,
    136
  ],
  [
    1,
    1,
    167,
    1942,
    87,
    59
  ]
]

export default function DocumentView() {
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [docViewContainerWidth, setDocViewContainerWidth] = useState(800);
  const [ratio, setRatio] = useState(1);

  const [error, setError] = useState(null);
  const ref = useRef(null);

  const [loadingFolder, setLoadingFolder] = useState(true);
  const { config, token } = useContext(AuthContext);


  const [runningScan, setRunningScan] = useState(false);
  const [scanBoxResults, setScanBoxResults] = useState(sigBoxes);


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
    setDocViewContainerWidth(ref.current.offsetWidth * .7);

    setRatio(ref.current.offsetWidth * .7/(scanBoxResults[0][0]))


  }, [ref]);


  function runScan() {
    setRunningScan(true)
    axiosInstance
      // path, data, config
      .get(`/file/${params.fileId}/scan`, config)
      .then((r) => {

         setScanBoxResults(r.data.points)
        setRunningScan(false)

      })
      .catch((e) => {
        console.log('error', e)
        setLoadingFolder(false)

      });

  }

  return (
    <Layout>
      <div className="border-b border-gray-100 px-4 md:px-6 py-6 bg-white sticky top-0 z-10 flex justify-between">
        <div>
 

          <Link className="block text-gray-700 text-sm" to={`/folder/${params.folderId}`}>
            Back
          </Link>
          <h1 className="text-lg md:text-xl text-gray-700">{loadingFolder ? <Spinner /> : <>
            <b>{currentlyViewingFile && currentlyViewingFile[0].name}</b></>}</h1>

          {numPages} pages


        </div>

        <div>
          <Button onClick={() => runScan()} loading={runningScan}>Scan</Button>
        </div>
      </div>
      <div className="bg-blue-500  p-3 text-white text-center  font-semibold py-5 text-sm">
        Setup document for signing
      </div>
      <div className=" justify-between flex">

        <div className="flex justify-center w-full align-center" ref={ref}>
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
                          width={docViewContainerWidth}
                          onClick={() => console.log("INdex")}

                        ><div className="signature-boxes-data">
                            {scanBoxResults && scanBoxResults.filter(box => box[0] == index).map((box, b) => {
                              console.log("BOX", box)
                              return (
                              <div className="sig-box bg-purple-100 absolute rounded-lg text-purple-600 font-semibold flex items-center justify-center text-sm select-none"
                               style={{ top: box[3]*ratio + 'px', left: box[2]*ratio + 'px', height: box[5]*ratio + 'px', width: box[4]*ratio + 'px' }}
                               >
                                    -

                              </div>  
                            )})}
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