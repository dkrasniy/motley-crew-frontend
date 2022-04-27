import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../views/login";
import CreateNew from "../views/createNew"; 
import { AuthProvider } from "../components/AuthProvider";
import RequireAuth from '../components/ReqAuth'
import PublicRoute from "../components/PublicRoute";
import Inbox from "../views/inbox";
import Folder from "../views/folder";
import DocumentView from "../views/document-view";
import Profile from "../views/profile";
import PDFViewer from "../views/pdfViewer";
import Outgoing from "../views/outgoing";
import Incoming from "../views/incoming";
import Completed from "../views/completed";
import TravelExpense from "../views/travel-expense";
import TeleworkAgreement from "../views/telework-agreement";


export default function Router() {


  return (
    <AuthProvider>
      <div className="App">
        <Routes>

          <Route path="/create/new" element={<CreateNew />} />
          <Route path="/" element={<Link to={"/login"}>Login</Link>} />
          <Route path="/dashboard" element={<RequireAuth><Inbox/></RequireAuth>} />
          <Route path="/folder/:folderId" element={<RequireAuth><Folder/></RequireAuth>} /> 
          <Route path="/folder/:folderId/view/:fileId" element={<RequireAuth><DocumentView/></RequireAuth>} /> 

          <Route path="/account" element={<RequireAuth><Profile/></RequireAuth>} /> 
          {/* <Route path="/folder/:folderId/view/:fileid" element={<RequireAuth><PdfViewer/></RequireAuth>} /> */}
          <Route path="/testPdfView" element={<RequireAuth><PDFViewer/></RequireAuth>} />

          <Route path="/outgoing" element={<RequireAuth><Outgoing /></RequireAuth>} />
          <Route path="/incoming" element={<RequireAuth><Incoming /></RequireAuth>} />
          <Route path="/completed" element={<RequireAuth><Completed /></RequireAuth>} />

          <Route path="/templates/travelExpense" element={<RequireAuth><TravelExpense /></RequireAuth>} />
          <Route path="/templates/teleworkAgreement" element={<RequireAuth><TeleworkAgreement /></RequireAuth>} />



          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} /> 
        </Routes>
      </div>
    </AuthProvider>
  );
}
