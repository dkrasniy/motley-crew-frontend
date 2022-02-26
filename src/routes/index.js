import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../views/login";
import CreateNew from "../views/createNew";

export default function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Link to={"/login"}>Login</Link>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="about" element={<div>about page</div>} />
        <Route path="/create/new" element={<CreateNew />} />
      </Routes>
    </div>
  );
}
