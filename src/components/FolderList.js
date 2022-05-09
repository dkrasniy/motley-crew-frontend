import React, { useContext, useState } from "react";
import { Spinner } from "./atoms/Spinner";
import FolderItem from "./FolderItem";

export default function FolderList({ data, loading }) {
  // console.log("folder list data",data)

  if (loading) {
    return <Spinner />;
  }

  if (data && data.length > 0) {
    return (
      <div className="space-y-2">
        {data.map((folder, f) => (
          <FolderItem folder={folder} key={f} />
        ))}
      </div>
    );
  }

  return <p>You do not have any folders</p>;
}
