import React, { useContext, useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client"; 
import { useNavigate } from "react-router-dom"; 
import Layout  from '../components/Layout'

function CreateNew() {

  const { config } = useContext(AuthContext);

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [desiredCompletionDate, setDesiredCompletionDate] = useState("")
  const [expedited, setExpedited] = useState(false)
  const [confidential, setConfidential] = useState(false)
  const [creatingFolder, setCreatingFolder] = useState(false)

  let navigate = useNavigate();


  const handleSubmit = (e) => {
    setCreatingFolder(true)
    e.preventDefault(); 



    axiosInstance
    // path, data, config
    .post(`/folder/create`, { name, description: description, desiredCompletionDate: new Date(), expedited: expedited, confidential}, config)
    .then((r) => { 
      //console.log(r);
      const {data} = r  
      setCreatingFolder(false)
      
      navigate(`/folder/${data.id}`); 
 
    
    })
    .catch((e) => {
      setCreatingFolder(false)
    })


  }

  return (
    <Layout>
        <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between">
      <b className="text-xl md:text-2xl text-gray-800">Create new</b> 
    
      </div>


     
   
    <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
    
      <form className="mt-6" onSubmit={handleSubmit}>

        <label htmlFor="folderName" className="mb-1 text-left block text-sm font-medium text-gray-700">
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
          className="shadow-sm appearance-none block w-full px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <label htmlFor="description" className="mb-1 text-left block text-sm font-medium text-gray-800">
          Description
        </label>

        <textarea 
          id="description"
          name="description"
          type="description"
          autoComplete="description"
          value={description}
          required={false}
          onChange={(e)=>setDescription(e.target.value)}
          className="shadow-sm appearance-none block w-full px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <label htmlFor="desiredCompletionDate" className="mb-1 text-left block text-sm font-medium text-gray-800">
          Desired Completion Date
        </label>

        <input 
          id="desiredCompletionDate"
          name="desiredCompletionDate"
          type="desiredCompletionDate"
          autoComplete="desiredCompletionDate"
          value={desiredCompletionDate}
          required={false}
          onChange={(e)=>setDesiredCompletionDate(e.target.value)}
          className="w-full shadow-sm appearance-none block px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <label htmlFor="expedited" className="mb-1 text-left block text-sm font-medium text-gray-700">
          Expedite
        </label>

        <input 
          id="expedited"
          name="expedited"
          type="checkbox"
          value={expedited}
          required={false}
          onChange={(e)=>setExpedited(e.target.checked)}
          className="mb-4"
        />

        <label htmlFor="confidential" className="text-left block text-sm font-medium text-gray-700">
          Confidential
        </label>

        <input 
          id="confidential"
          name="confidential"
          type="checkbox"
          value={confidential}
          required={false}
          onChange={(e)=>setConfidential(e.target.checked)}
          className="mb-4"
        />

        

        <Button className="mt-4" type="submit" loading={creatingFolder}> Create Folder </Button>
      </form> 
    </div> 

  </div>
  </Layout>
 
  );
}

export default CreateNew;
