 

import React, { useContext, useState } from "react"; 
import { Spinner } from "./atoms/Spinner";
import FileItem from "./FileItem";

export default function FileList({ folderData, loading, files}) {
    
    console.log("folder list data",files)
 
    if(loading) {
        return  <Spinner/>
    } 

    if(files && files.length > 0) {
        return <div className="space-y-2">
         
        {files.map((file, f)=><FileItem file={file} key={f}/>)}</div>
    }

    return <p>No files</p>
   

}
