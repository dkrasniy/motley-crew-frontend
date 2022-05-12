import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { Spinner } from "../components/atoms/Spinner";
import { axiosInstance } from "../client";
import { AuthContext } from "../components/AuthProvider";
import { useParams } from "react-router-dom";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const ConfirmSign = ({ handleConfirm, type }) => {
  return (
    <div
      className="bg-white shadow rounded border my-2 p-1"
      style={{
        position: "absolute",
        width: "100%",
        minWidth: "200px",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "999",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-center">
        <button
          className="px-1 bg-gray-100 border rounded"
          onClick={handleConfirm}
        >
          complete {type}
        </button>
      </div>
    </div>
  );
};

const CompleteSignBox = ({ field, setSignedFields }) => {
  const [modelOpen, setModalOpen] = useState(false);
  const [complete, setComplete] = useState("");
  const { user } = useContext(AuthContext);

  const handleConfirm = () => {
    let render = null;
    if (field.form_type == "sign") {
      setComplete(user.fullname);
      render = user.fullname;
    } else if (field.form_type == "date") {
      let date = new Date().toISOString().split("T")[0];
      setComplete(date);
      render = date;
    } else {
      setComplete("complete");
      render = "complete";
    }
    setSignedFields((state) => {
      console.log(" > huh?:", state);
      const temp = [...state];
      temp.push({
        ...field,
        render: render,
      });
      return temp;
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        width: `${field.width}px`,
        height: `${field.height}px`,
        left: `${field.xpos}px`,
        top: `${field.ypos}px`,
        backgroundColor: "rgba(107, 114, 128, 0.2)",
      }}
      className="border border-gray-500"
      onClick={() => setModalOpen(!modelOpen)}
    >
      {complete === "" ? null : <p>{complete}</p>}
      {modelOpen ? (
        <ConfirmSign handleConfirm={handleConfirm} type={field.form_type} />
      ) : null}
    </div>
  );
};

function SignDocument() {
  const { routeSlipId, routeItemId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [routeItem, setRouteItem] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [signedFields, setSignedFields] = useState([]);
  const [currentlyViewingFile, setCurrentlyViewingFile] = useState(null);
  const [docViewContainerWidth, setDocViewContainerWidth] = useState(800);
  const [ratio, setRatio] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [loadingFolder, setLoadingFolder] = useState(true);
  const ref = useRef(null);

  const { user, token } = useContext(AuthContext);

  let requestCreds = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const onDocumentLoadSuccess = async (pdfObject) => {
    const pages = pdfObject.numPages;
    setNumPages(pages);
    // const page = await pdfObject.getPage(1);
    // console.log(page.width);
    // console.log(page.height);
  };

  const handleCompleteSigning = async () => {
    const existingPdfBytes = await fetch(currentlyViewingFile.file).then(
      (res) => res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();

    signedFields.forEach((field) => {
      console.log(" > in pdf lib:", field);
      const page = pages[field.page_num];
      const { width, height } = page.getSize();
      page.drawText("duh", {
        x: field.xpos,
        y: height - field.ypos - 18,
        size: 18,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    // download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    const durl = window.URL.createObjectURL(new Blob([pdfBytes]));
    const link = document.createElement("a");
    link.href = durl;
    link.setAttribute("download", `FileName.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  // get the route item
  useEffect(() => {
    axiosInstance
      .get(`/route-slip-step/${routeSlipId}/${routeItemId}`, requestCreds)
      .then((res) => {
        console.log(res.data);
        setCurrentlyViewingFile(res.data.file);
        setFormFields(res.data.formFields);
        setRouteItem(res.data);
      })
      .catch((error) => {
        if (error.response) {
          window.alert(
            `Could not get data\nMessage: ${JSON.stringify(
              error.response.data
            )}`
          );
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      })
      .finally(() => {
        setLoadingFolder(false);
      });
  }, []);

  useEffect(() => {
    setDocViewContainerWidth(ref.current.offsetWidth * 0.7);
  }, [ref]);

  useEffect(() => {
    console.log(signedFields);
  }, [signedFields]);

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
            >
              <div className="absolute flex h-full justify-center top-0 w-full z-[60]"></div>
              <div className="absolute flex h-full justify-center top-0 w-full z-50">
                {formFields
                  .filter((f) => f.page_num == index)
                  .map((field, i) => (
                    <CompleteSignBox
                      key={i}
                      field={field}
                      setSignedFields={setSignedFields}
                    />
                  ))}
              </div>
            </Page>
          </div>
        ))}
      </Document>
    ),
    [ratio, docViewContainerWidth, currentlyViewingFile, numPages, formFields]
  );

  if (!routeItem && !currentlyViewingFile) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex justify-between">
          <b className="text-xl md:text-2xl text-gray-800">Loading</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex justify-between">
          <b className="text-xl md:text-2xl text-gray-800">
            Its your turn to sign
          </b>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
          route Slip: {routeSlipId}
          <br />
          route Id: {routeItemId}
        </div>
      </div>
      <div className="bg-blue-600  p-3 text-white text-center  font-semibold py-5 text-sm">
        Please Sign below
      </div>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="justify-between flex mt-6">
          <div className="flex justify-center w-full align-center" ref={ref}>
            <div>
              {error ? (
                <div>{error}</div>
              ) : loadingFolder ? (
                <Spinner />
              ) : (
                <>{coolDoc}</>
              )}
              {!error && !loadingFolder ? (
                <button
                  className="px-1 bg-gray-100 hover:bg-gray-200 border rounded inline-block"
                  onClick={handleCompleteSigning}
                >
                  Complete Sign
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignDocument;
