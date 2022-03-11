

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Button from "../components/atoms/Button";

export default function EditFolderDetails({ folderId, folderData }) {

    console.log("folderData",folderData)

    let [isOpen, setIsOpen] = useState(false)


    const [name, setName] = useState(folderData.name ? folderData.name : "")


    const handleSubmit = (e) => {
        e.preventDefault();

        // @TODO
        console.log("submit the update vbalues to the edit folder service.,..")

        // it should also provide the updated info back to the folder page and update the header title/desc etc.. 
    }



    return (
        <><Button color="secondary" onClick={() => setIsOpen(true)}>Edit Folder</Button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}
                    className="fixed z-10 inset-0 overflow-y-auto"
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"

                >
                    <div className="flex items-center justify-center min-h-screen">

                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >

                            <form onSubmit={handleSubmit} className="relative bg-white rounded max-w-xl mx-auto p-8 rounded-xl">
                                <Dialog.Title className={"font-bold text-lg"}>Edit Folder Id {folderId}</Dialog.Title>
                                <Dialog.Description>
                                    Edit the folder by updating the fields below  Edit the folder by updating the fields below  Edit the folder by updating the fields below
                                </Dialog.Description>
 
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
