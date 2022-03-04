import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import FolderList from "../components/FolderList";
import Layout from "../components/Layout";


function Profile() {

  const { user, config } = useContext(AuthContext);
 

  return (
    <Layout>
    <div className="max-w-7xl mx-auto my-6 px-4 md:px-6">
      <div className="flex justify-between">
      
       
      </div>
     
      <div className="bg-gray-50 rounded-xl p-8 my-6">
    
      <div className="space-y-4">
       <b>Your Account Information</b> 

       
        <p>Username: <b>{user.username}</b></p>
        <p>Email: {user.email}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Date Joined: <b>{user.dateJoined}</b></p>

 

        </div>
      </div> 

    </div>
    </Layout>
  );
}

export default Profile;
