import React, { Fragment, useState,useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Button from "../components/atoms/Button";
import { axiosInstance } from "../client";
import { useNavigate } from "react-router-dom";

export default function DeleteFolder({ folderId, config, folderData}) {

    let [isOpen, setIsOpen] = useState(false)

    let navigate = useNavigate();
      
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("delete handle submit hit")

        axiosInstance.delete(`folder/${folderId}`, config)
        .then((r) => { 
            //console.log(r);
            const {data} = r  
            console.log(data) 
            navigate(`/dashboard`);
          
          })
         
    }

    return (
        <><Button className="mt-4" color="secondary" onClick={() => setIsOpen(true)}>Delete Folder</Button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}
                    className="fixed z-10 inset-0 overflow-y-auto"
                    // enter="transition duration-100 ease-out"
                    // enterFrom="transform scale-95 opacity-0"
                    // enterTo="transform scale-100 opacity-100"
                    // leave="transition duration-75 ease-out"
                    // leaveFrom="transform scale-100 opacity-100"
                    // leaveTo="transform scale-95 opacity-0"

                >
                    <div className="flex items-center justify-center min-h-screen">

                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <Transition.Child
                            as={Fragment}
                            // enter="ease-out duration-300"
                            // enterFrom="opacity-0 scale-95"
                            // enterTo="opacity-100 scale-100"
                            // leave="ease-in duration-200"
                            // leaveFrom="opacity-100 scale-100"
                            // leaveTo="opacity-0 scale-95"
                        >

                            <form onSubmit={handleSubmit} className="relative bg-white rounded max-w-xl mx-auto p-8 rounded-xl">
                                <Dialog.Title className={"font-bold text-lg"}>Delete {folderData.name}</Dialog.Title>
                                <Dialog.Description>
                                    Confirming this action will delete this folder <br />
                                    Folder Name: {folderData.name} <br />
                                    Folder ID: {folderId} <br />
                                </Dialog.Description>                                
 
                                <div className="flex mt-8 justify-end">
                                    <Button type="button" onClick={() => setIsOpen(false)} color="secondary">Cancel</Button>
                                    <Button type="submit" onClick={() => setIsOpen(false)} color="primary" className="ml-2">Delete</Button>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </>
    )



}