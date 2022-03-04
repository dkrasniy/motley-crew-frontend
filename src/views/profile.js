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
     
      <div className="bg-gray-50 max-w-xl mx-auto rounded-xl p-8 my-6">
    
      <div className="space-y-4">
       <b className="text-2xl text-center block">Your Account Information</b> 

        <div className="h-32 w-32 bg-green-100 rounded-full flex items-center justify-center text-7xl mx-auto">🏄‍♂️</div>
        <p className="text-4xl font-semibold text-center">@<b>{user.username}</b></p>
        <div className="grid grid-cols-3 gap-4 text-left">
        <p><span className="text-gray-500 block">First Name</span>{user.firstName}</p>
        <p><span className="text-gray-500 block">Last Name</span>{user.lastName}</p>
        <p><span className="text-gray-500 block">Email</span>{user.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left">
        <p><span className="text-gray-500 block">Date Joined: </span>{user.dateJoined}</p>
        <p><span className="text-gray-500 block">User ID </span>{user.id}</p>
        </div>
       

       
        
        </div>
      </div> 

    </div>
    </Layout>
  );
}

export default Profile;
