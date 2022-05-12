import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { Dialog, Transition } from "@headlessui/react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Button from "../components/atoms/Button";
import SignatureBox from "../components/SignatureBox";

// create route item things
import { RouteItemContext } from "../components/creatingRouteItem/routeItemContext";
import RouteItemMenu from "../components/creatingRouteItem/RouteItemMenu";
import DrawShapeContainer from "../components/creatingRouteItem/DrawShapeContainer";

const sigBoxes = [
  [1700, 2200, 0, 0, 0, 0],
  [0, 1, 1007, 407, 45, 45],
  [0, 1, 183, 409, 44, 45],
  [0, 1, 600, 409, 44, 45],
  [0, 1, 1381, 409, 45, 44],
  [0, 1, 151, 1210, 124, 108],
  [0, 1, 174, 1233, 86, 60],
  [0, 1, 174, 1336, 87, 59],
  [1, 1, 151, 210, 124, 142],
  [1, 1, 165, 230, 87, 59],
  [1, 1, 168, 371, 87, 61],
  [1, 1, 313, 833, 56, 44],
  [1, 1, 1008, 839, 55, 44],
  [1, 1, 151, 1259, 124, 185],
  [1, 1, 167, 1288, 87, 60],
  [1, 1, 151, 1446, 124, 161],
  [1, 1, 151, 1608, 124, 191],
  [1, 1, 167, 1631, 87, 60],
  [1, 1, 151, 1800, 124, 113],
  [1, 1, 167, 1819, 87, 60],
  [1, 1, 151, 1914, 124, 136],
  [1, 1, 167, 1942, 87, 59],
  [2, 1, 151, 210, 124, 110],
  [2, 1, 167, 238, 87, 59],
  [2, 1, 151, 321, 124, 111],
  [2, 1, 167, 345, 87, 60],
  [2, 1, 151, 433, 124, 110],
  [2, 1, 167, 454, 87, 59],
  [2, 1, 151, 545, 124, 163],
  [2, 1, 167, 573, 87, 59],
  [2, 1, 167, 723, 87, 60],
  [2, 1, 102, 1505, 18, 28],
  [3, 1, 178, 857, 87, 59],
  [3, 1, 196, 1413, 45, 44],
  [3, 1, 687, 1413, 45, 44],
  [3, 1, 1109, 1413, 45, 44],
  [4, 0, 479, 540, 411, -135],
  [4, 0, 476, 764, 414, -134],
  [4, 0, 485, 1433, 402, -136],
  [4, 0, 482, 1657, 363, -138],
  [4, 1, 230, 962, 38, 38],
  [4, 2, 1029, 540, 583, -134],
  [4, 2, 1029, 764, 583, -132],
  [4, 2, 1035, 1433, 564, -135],
  [4, 2, 1035, 1657, 581, -132],
  [5, 0, 485, 656, 402, -136],
  [5, 0, 482, 880, 405, -134],
  [5, 0, 485, 1509, 402, -135],
  [5, 0, 482, 1686, 405, -134],
  [5, 1, 202, 398, 38, 38],
  [5, 1, 241, 1046, 33, 33],
  [5, 1, 241, 1225, 35, 36],
  [5, 2, 1035, 656, 564, -135],
  [5, 2, 1035, 880, 564, -132],
  [5, 2, 1035, 1509, 564, -134],
  [5, 2, 1035, 1686, 564, -132],
  [9, 0, 1272, 2119, 342, -441],
];

export default function DocumentView() {
  const [manualCreate, setManualCreate] = useState(false);
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [docViewContainerWidth, setDocViewContainerWidth] = useState(800);
  const [promptSigneeForArea, setPromptSigneeForArea] = useState(false);

  const [ratio, setRatio] = useState(1);

  const [error, setError] = useState(null);
  const ref = useRef(null);

  const [loadingFolder, setLoadingFolder] = useState(true);
  const { config, token } = useContext(AuthContext);
  const { setRouteSlip, setFile, saveRouteItemsByScan } =
    useContext(RouteItemContext);

  const [runningScan, setRunningScan] = useState(false);
  const [ranScan, setRanScan] = useState(false);
  const [scanBoxResults, setScanBoxResults] = useState(null);
  const [numPages, setNumPages] = useState(null);

  let params = useParams();

  const onDocumentLoadSuccess = async (pdfObject) => {
    const pages = pdfObject.numPages;
    setNumPages(pages);
    // const page = await pdfObject.getPage(1);
    // console.log(page.width);
    // console.log(page.height);
  };

  const runScan = () => {
    setManualCreate(false);
    setRunningScan(true);
    axiosInstance
      // path, data, config
      .get(`/file/${params.fileId}/scan`, config)
      .then((r) => {
        setScanBoxResults(r.data.points);
        setRunningScan(false);
        setRanScan(true);
      })
      .catch((e) => {
        setError("Something was wrong scanning the file");
        console.log("error", e);
        setLoadingFolder(false);
      });
  };

  useEffect(() => {
    const requestOne = axiosInstance.get(`/file/${params.fileId}`, config);
    const requestTwo = axiosInstance.get(`/folder/${params.folderId}`, config);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          // file request
          const responseOne = responses[0];
          setCurrentlyViewingFile(responseOne.data);
          setFile(responseOne.data);
          // console.log(responseOne.data);

          // folder request
          const responseTwo = responses[1];
          setRouteSlip(responseTwo.data.routeSlips[0]);
          // console.log(responseTwo.data.routeSlips[0]);

          setLoadingFolder(false);
        })
      )
      .catch((errors) => {
        // react on errors.
        console.log(errors);
        setError("Something was wrong retreiving the data");
        setLoadingFolder(false);
      });
  }, []);

  useEffect(() => {
    setDocViewContainerWidth(ref.current.offsetWidth * 0.7);
  }, [ref]);

  useEffect(() => {
    if (scanBoxResults) {
      setRatio((ref.current.offsetWidth * 0.7) / scanBoxResults[0][0]);
    }
  }, [scanBoxResults]);

  const coolDoc = useMemo(
    () => (
      <Document
        file={{
          url: currentlyViewingFile && currentlyViewingFile.file,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
        className={`mx-auto`}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`}>
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className={"shadow-xl my-4 relative"}
              width={docViewContainerWidth}
              onClick={(e) =>
                console.log(` > doc: x=${e.clientX}, y=${e.clientY}`)
              }
            >
              {runningScan ? (
                <div className="absolute flex h-full justify-center top-0 w-full">
                  <div className="absolute flex h-full bg-black opacity-50 justify-center top-0 w-full" />

                  <div className="text-white z-10 absolute top-20">
                    <Spinner size={"6"} className="mx-auto mb-2" />
                    <span className="font-bold">
                      Scanning &amp; Analyzing Document
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Overlay for box selecting */}
              {manualCreate ? (
                <DrawShapeContainer pagenum={index} ratio={ratio} />
              ) : null}

              <div className="signature-boxes-data">
                {scanBoxResults &&
                  scanBoxResults
                    .filter((box) => box[0] == index)
                    .map((box, b) => (
                      <SignatureBox
                        key={b}
                        ratio={ratio}
                        type={box[1]}
                        x={box[2]}
                        y={box[3]}
                        h={box[5]}
                        w={box[4]}
                        refw={scanBoxResults[0][0]}
                        refh={scanBoxResults[0][1]}
                        pagenum={index}
                      />
                    ))}
              </div>
            </Page>
          </div>
        ))}
      </Document>
    ),
    [
      scanBoxResults,
      ratio,
      manualCreate,
      runningScan,
      docViewContainerWidth,
      currentlyViewingFile,
      numPages,
    ]
  );

  return (
    <Layout>
      <div
        className="border-b border-gray-100 px-4 md:px-6 py-6 bg-white sticky top-0 z-10 flex justify-between"
        style={{ zIndex: "999" }}
      >
        <div>
          <Link
            className="block text-gray-700 text-sm"
            to={`/folder/${params.folderId}`}
          >
            Back
          </Link>
          <h1 className="text-lg md:text-xl text-gray-700">
            {loadingFolder ? (
              <Spinner />
            ) : (
              <>
                <b>{currentlyViewingFile && currentlyViewingFile.name}</b>
              </>
            )}
          </h1>
          {numPages} pages
        </div>

        <div>
          <Button onClick={() => runScan()} loading={runningScan}>
            Scan
          </Button>
        </div>
      </div>
      <div className="bg-blue-600  p-3 text-white text-center  font-semibold py-5 text-sm">
        Setup document for signing
      </div>
      {/* Manual form field create for route item */}
      <div className="px-4">
        <label
          htmlFor="manual-create"
          className="inline-block whitespace-nowrap pr-2 select-none"
        >
          manually create a form field
        </label>
        <input
          type="checkbox"
          name="manual-create"
          id="manual-create"
          checked={manualCreate ? true : false}
          onChange={() => {
            if (manualCreate) {
              setManualCreate(false);
            } else {
              setScanBoxResults(null);
              setManualCreate(true);
              setRanScan(false);
            }
          }}
        />
      </div>
      {manualCreate ? <RouteItemMenu /> : null}

      {ranScan ? (
        <div className="px-4">
          <button
            className="px-1 bg-gray-100 border rounded inline-block"
            onClick={saveRouteItemsByScan}
          >
            Finalize Route Item (scanned)
          </button>
        </div>
      ) : null}

      <div className="bg-blue-600  p-3 text-white text-center  font-semibold py-5 text-sm"></div>
      <div className=" justify-between flex mt-6">
        <div className="flex justify-center w-full align-center" ref={ref}>
          <div>
            {error ? (
              <div>{error}</div>
            ) : loadingFolder ? (
              <Spinner />
            ) : (
              <>{coolDoc}</>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
