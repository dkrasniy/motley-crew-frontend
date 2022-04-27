import React, { Fragment, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { Dialog, Transition } from '@headlessui/react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from "../components/atoms/Button";
import SignatureBox from "../components/SignatureBox";

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
  ],
  [
      2,
      1,
      151,
      210,
      124,
      110
  ],
  [
      2,
      1,
      167,
      238,
      87,
      59
  ],
  [
      2,
      1,
      151,
      321,
      124,
      111
  ],
  [
      2,
      1,
      167,
      345,
      87,
      60
  ],
  [
      2,
      1,
      151,
      433,
      124,
      110
  ],
  [
      2,
      1,
      167,
      454,
      87,
      59
  ],
  [
      2,
      1,
      151,
      545,
      124,
      163
  ],
  [
      2,
      1,
      167,
      573,
      87,
      59
  ],
  [
      2,
      1,
      167,
      723,
      87,
      60
  ],
  [
      2,
      1,
      102,
      1505,
      18,
      28
  ],
  [
      3,
      1,
      178,
      857,
      87,
      59
  ],
  [
      3,
      1,
      196,
      1413,
      45,
      44
  ],
  [
      3,
      1,
      687,
      1413,
      45,
      44
  ],
  [
      3,
      1,
      1109,
      1413,
      45,
      44
  ],
  [
      4,
      0,
      479,
      540,
      411,
      -135
  ],
  [
      4,
      0,
      476,
      764,
      414,
      -134
  ],
  [
      4,
      0,
      485,
      1433,
      402,
      -136
  ],
  [
      4,
      0,
      482,
      1657,
      363,
      -138
  ],
  [
      4,
      1,
      230,
      962,
      38,
      38
  ],
  [
      4,
      2,
      1029,
      540,
      583,
      -134
  ],
  [
      4,
      2,
      1029,
      764,
      583,
      -132
  ],
  [
      4,
      2,
      1035,
      1433,
      564,
      -135
  ],
  [
      4,
      2,
      1035,
      1657,
      581,
      -132
  ],
  [
      5,
      0,
      485,
      656,
      402,
      -136
  ],
  [
      5,
      0,
      482,
      880,
      405,
      -134
  ],
  [
      5,
      0,
      485,
      1509,
      402,
      -135
  ],
  [
      5,
      0,
      482,
      1686,
      405,
      -134
  ],
  [
      5,
      1,
      202,
      398,
      38,
      38
  ],
  [
      5,
      1,
      241,
      1046,
      33,
      33
  ],
  [
      5,
      1,
      241,
      1225,
      35,
      36
  ],
  [
      5,
      2,
      1035,
      656,
      564,
      -135
  ],
  [
      5,
      2,
      1035,
      880,
      564,
      -132
  ],
  [
      5,
      2,
      1035,
      1509,
      564,
      -134
  ],
  [
      5,
      2,
      1035,
      1686,
      564,
      -132
  ],
  [
      9,
      0,
      1272,
      2119,
      342,
      -441
  ]
]

 



export default function DocumentView() {
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [docViewContainerWidth, setDocViewContainerWidth] = useState(800);
  const [promptSigneeForArea, setPromptSigneeForArea] = useState(false);
 


  const [ratio, setRatio] = useState(1);

  const [error, setError] = useState(null);
  const ref = useRef(null);

  const [loadingFolder, setLoadingFolder] = useState(true);
  const { config, token } = useContext(AuthContext);


  const [runningScan, setRunningScan] = useState(false);
  const [scanBoxResults, setScanBoxResults] = useState(null);


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
  }, [ref]);

  useEffect(()=> {
    if(scanBoxResults){
      setRatio(ref.current.offsetWidth * .7/(scanBoxResults[0][0]))

    }
  }, [scanBoxResults])


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
                  className={`mx-auto`}
                 >
                  {Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <div>
                       
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          className={"shadow-xl my-4"}
                          width={docViewContainerWidth}
                          onClick={() => console.log("INdex")}

                        > 
                        
                        {runningScan ? <div className="absolute  flex h-full justify-center top-0 w-full">
                         <div className="absolute  flex h-full bg-black opacity-50 justify-center top-0 w-full"/>

                        <div  className="text-white z-10 absolute top-20"><Spinner size={'6'} className="mx-auto mb-2"/>
                          <span className="font-bold">Scanning &amp; Analyzing Document</span></div>  
                          </div>  : null} 


                        <div className="signature-boxes-data">
                            {scanBoxResults && scanBoxResults.filter(box => box[0] == index).map((box, b) => {
                         
                              return <SignatureBox ratio={ratio} x={box[2]} y={box[3]} h={box[5]} w={box[4]} />
                              
                              })}
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