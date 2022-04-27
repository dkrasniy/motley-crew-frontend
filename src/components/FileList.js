 

import React, { useContext, useState } from "react"; 
import { Spinner } from "./atoms/Spinner";
import FileItem from "./FileItem";

export default function FileList({ folderData, loading, files}) {
    
    console.log("folder list data",files)
 
    if(loading) {
        return  <Spinner/>
    } 

    if(files && files.length > 0) {
        return <div>

           <div className="grid grid-cols-12 font-bold text-sm text-gray-700 mb-3">
                <div className="col-span-8">Name</div>
               <div className="col-span-3">Actions</div>
               <div className="col-span-1">File Owner</div>

               </div> 
         
        {files.map((file, f)=><FileItem file={file} key={f}/>)}</div>
    }

    return <p>No files</p>
   

}
