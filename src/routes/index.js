import * as React from "react";
import { Routes, Route} from "react-router-dom";
import Login from '../views/login'
import CreateNew from '../views/createNew';

export default function Router() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="about" element={<div>about page</div>} />
        <Route path="/create/new" element={<CreateNew />} />
      </Routes>
    </div>
  );
}