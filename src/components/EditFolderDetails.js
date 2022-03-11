

import React, { Fragment, useState,useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Button from "../components/atoms/Button";
import { axiosInstance } from "../client";

export default function EditFolderDetails({ folderId, folderData, config, setCurrentFolder }) {

    console.log("folderData",folderData)
    console.log("name", folderData.name)
    console.log("description", folderData.description)
    console.log("completion date", folderData.desiredCompletionDate)
    console.log("expedite", folderData.expedited)
    console.log("confidential", folderData.confidential)

    let [isOpen, setIsOpen] = useState(false)


    const [name, setName] = useState(folderData.name ? folderData.name : "")
    const [description, setDescription] = useState(folderData.description ? folderData.description : "")
    const [desiredCompletionDate, setDesiredCompletionDate] = useState(folderData.desiredCompletionDate ? folderData.desiredCompletionDate : "")
    const [expedited, setExpedited] = useState(folderData.expedited ? folderData.expedited : false)
    const [confidential, setConfidential] = useState(folderData.confidential ? folderData.confidential : false)


    useEffect(() => {
        // Update the document title using the browser API
        setName(folderData.name)
        setDescription(folderData.description)
        setDesiredCompletionDate(folderData.desiredCompletionDate)
        setExpedited(folderData.expedited)
        setConfidential(folderData.confidential)

      },[folderData]);

      
    const handleSubmit = (e) => {
        e.preventDefault();

        // @TODO
        console.log("submit the update vbalues to the edit folder service.,..")

        // it should also provide the updated info back to the folder page and update the header title/desc etc.. 
        axiosInstance.put(`folder/${folderId}`, {name, description, desiredCompletionDate, expedited, confidential}, config)
        .then((r) => { 
            //console.log(r);
            const {data} = r  
            console.log(data) 
            setCurrentFolder(data)
          
          })
         
    }



    return (
        <><Button color="secondary" onClick={() => setIsOpen(true)}>Edit Folder</Button>

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
                                <Dialog.Title className={"font-bold text-lg"}>Edit Folder Id {folderId}</Dialog.Title>
                                <Dialog.Description>
                                    Edit the folder by updating the fields below  Edit the folder by updating the fields below  Edit the folder by updating the fields below
                                </Dialog.Description>

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
                                    className="appearance-none block w-full px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />

                                <label htmlFor="description" className="text-left block text-sm font-medium text-gray-700">
                                    Description
                                </label>

                                <input 
                                    id="description"
                                    name="description"
                                    type="description"
                                    autoComplete="description"
                                    value={description}
                                    required={false}
                                    onChange={(e)=>setDescription(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                 />

                                <label htmlFor="desiredCompletionDate" className="text-left block text-sm font-medium text-gray-700">
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
                                    className="appearance-none block px-3 py-2 mb-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />

                                <label htmlFor="expedited" className="text-left block text-sm font-medium text-gray-700">
                                    Expedite
                                </label>

                                <input 
                                    id="expedited"
                                    name="expedited"
                                    type="checkbox"
                                    checked={expedited}
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
                                    checked={confidential}
                                    required={false}
                                    onChange={(e)=>setConfidential(e.target.checked)}
                                    className="mb-4"
                                />
 
                                <div className="flex mt-8 justify-end">
                                    <Button onClick={() => setIsOpen(false)} color="secondary">Cancel</Button>
                                    <Button type="submit" onClick={() => setIsOpen(false)} color="primary" className="ml-2">Save Changes</Button>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </>
    )



}
