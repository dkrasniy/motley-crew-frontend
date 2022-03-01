import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../views/login";
import CreateNew from "../views/createNew"; 
import { AuthProvider } from "../components/AuthProvider";
import RequireAuth from '../components/ReqAuth'
import PublicRoute from "../components/PublicRoute";
import Inbox from "../views/inbox";
import Folder from "../views/folder";


export default function Router() {


  return (
    <AuthProvider>
      <div className="App">
        <Routes>

          <Route path="/create/new" element={<CreateNew />} />
          <Route path="/" element={<Link to={"/login"}>Login</Link>} />
          <Route path="/dashboard" element={<RequireAuth><Inbox/></RequireAuth>} />
          <Route path="/folder/:folderId" element={<RequireAuth><Folder/></RequireAuth>} /> 
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} /> 
        </Routes>
      </div>
    </AuthProvider>
  );
}
