import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from '../views/login'

export default function Router() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="about" element={<div>about page</div>} />
      </Routes>
    </div>
  );
}