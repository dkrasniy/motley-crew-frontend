

import React, { useContext, useState } from "react";
import Button from "./atoms/Button";
import { Spinner } from "./atoms/Spinner";

export default function FileItem({ file, name, pending }) {

    let fileName = name || file.name
    console.log("file data", file)


    return <div className="block bg-white  p-4 rounded-xl border border-gray-100">

        <div className="flex">

            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" className="text-gray-300" d="M256 0v128h128L256 0zM272 384h-160C103.2 384 96 391.2 96 400S103.2 416 112 416h160c8.836 0 16-7.164 16-16S280.8 384 272 384zM272 320h-160C103.2 320 96 327.2 96 336S103.2 352 112 352h160c8.836 0 16-7.164 16-16S280.8 320 272 320zM272 256h-160C103.2 256 96 263.2 96 272S103.2 288 112 288h160C280.8 288 288 280.8 288 272S280.8 256 272 256z" /><path fill="currentColor" className="text-gray-100" d="M256 128V0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V128H256zM272 416h-160C103.2 416 96 408.8 96 400S103.2 384 112 384h160c8.836 0 16 7.164 16 16S280.8 416 272 416zM272 352h-160C103.2 352 96 344.8 96 336S103.2 320 112 320h160c8.836 0 16 7.164 16 16S280.8 352 272 352zM272 288h-160C103.2 288 96 280.8 96 272S103.2 256 112 256h160C280.8 256 288 263.2 288 272S280.8 288 272 288z" /></svg>

            <div className="ml-6"> <span className="block font-semibold my-2">{fileName}</span>

                { !pending && file.file ? <Button href={file.file} target="_blank" color="secondary" size="small" className="inline-flex">Open in new tab</Button> : null}
                { !pending && file.file && file.id ? <Button to={`/folder/${file.parentFolder}/view/${file && file.id}/`} color="secondary" size="small" className="inline-flex">Open with viewer</Button> : null}

       
            </div>
        </div>
    </div>


}
