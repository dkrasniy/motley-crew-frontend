 

import React, { useContext, useState } from "react"; 
import { Link } from "react-router-dom";
import { Spinner } from "./atoms/Spinner";

export default function FolderItem({ folder }) {
    
 
    return <Link className="block bg-white  p-4 rounded-xl border border-gray-100" to={`/folder/${folder.id}`}>

        <span className="font-bold block text-lg">{folder.name}</span>
        {folder.description ? <span className="block text-gray-500 mt-1">{folder.description}</span>: null}

        {folder.expedited ? <span className="block text-gray-500 mt-1 text-red-500 text-xs font-semibold">Expedited</span>: null}
        {folder.confidential ? <span className="inline-block px-2 py-1 rounded-full text-gray-500 mt-1 text-purple-500 text-xs font-semibold bg-purple-50">Confidential</span> : null}

        </Link>

}
