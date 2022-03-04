import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client"; 
import { useNavigate } from "react-router-dom"; 
import Layout  from '../components/Layout'

function CreateNew() {

  const { config } = useContext(AuthContext);

  const [name, setName] = useState("")
  const [creatingFolder, setCreatingFolder] = useState(false)

  let navigate = useNavigate();


  const handleSubmit = (e) => {
    setCreatingFolder(true)
    e.preventDefault();
    console.log("create folder with name", name)



    axiosInstance
    // path, data, config
    .post(`/folder/create`, {folderName: name}, config)
    .then((r) => { 
      const {data} = r  
      setCreatingFolder(false)

      navigate(`/folder/${data.data.id}`); 
 
    
    })
    .catch((e) => {
      setCreatingFolder(false)
    })


  }

  return (
    <Layout>
    <div className="max-w-7xl mx-auto my-6 px-4 md:px-6">
    <div className="flex justify-between">
    <b className="text-xl">Create new</b>  
    </div>
   
    <div className="bg-gray-50 rounded-xl p-8 my-6">
    
      <form className="mt-6" onSubmit={handleSubmit}>

        <label htmlFor="folderName" className="text-left block text-sm font-medium text-gray-700">
          Folder Name
        </label>

        <input
          id="folderName"
          name="folderName"
          type="folderName"
          autoComplete="folderName"
          value={name}
          required={true}
          onChange={(e)=>setName(e.target.value)}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <Button className="mt-4" type="submit" loading={creatingFolder}> Create Folder </Button>
      </form> 
    </div> 

  </div>
  </Layout>
 
  );
}

export default CreateNew;
