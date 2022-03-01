 

import React, { useContext, useState } from "react"; 
import { Link } from "react-router-dom";
import { Spinner } from "./atoms/Spinner";

export default function FolderItem({ folder}) {
    
 console.log("folder",folder)

    return <Link className="block bg-white shadow-sm p-4 rounded-xl" to={`/folder/${folder.id}`}>{folder.name}</Link>

}
