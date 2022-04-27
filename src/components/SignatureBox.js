
import React, { Fragment, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../components/AuthProvider";
import { axiosInstance } from "../client";
import { Routes, Link, useParams, Route } from "react-router-dom";
import { Spinner } from "../components/atoms/Spinner";
import Layout from "../components/Layout";
import { Dialog, Transition } from '@headlessui/react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from "../components/atoms/Button";

export default function SignatureBox ({x,y,h,w,ratio}) {

    const [promptSigneeForArea, setPromptSigneeForArea] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    let people = ['Ethan Covert', 'Jose Torres','Michael Vizcarrea', 'Maksim Shaynuk', 'David Krasniy']

    return (
        <>
         <div  onClick={()=>setPromptSigneeForArea(true)}  
         
         className={`hover:bg-green-500 hover:border-green-700 cursor-pointer hover:shadow-lg transition sig-box  absolute border-2  text-purple-600 font-semibold flex items-center justify-center text-sm select-none
         ${selectedPerson != null ?  'bg-blue-600 text-white rounded-lg' : 'bg-purple-100 border-red-500 '}
         `}
   
   
         style={{ top: y*ratio + 'px', left: x*ratio + 'px', height: h*ratio + 'px', width: w*ratio + 'px' }}
      >
            {selectedPerson != null ?  <span className="text-white">{people[selectedPerson]}</span> : <span> h:{h} 
            w:{w}</span>}
           
  
     </div>  
        

      <Transition show={promptSigneeForArea} as={Fragment}>
                <Dialog open={promptSigneeForArea} onClose={() => setPromptSigneeForArea(false)}
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

                            <form   className="relative bg-white rounded max-w-lg w-full mx-auto p-8 rounded-xl">
                                <Dialog.Title className={"font-bold text-lg"}>Who needs to sign here?</Dialog.Title>
                                <Dialog.Description>
                                    {people.map((person, p)=>(
                                        <button className=" flex my-3" onClick={(e)=>{e.preventDefault(); setSelectedPerson(p)}}>
                                        <div className={`h-6 w-6 border rounded-xl ${selectedPerson == p ? 'bg-blue-500' : ''}`}></div>
                                        <span className={`ml-2 ${selectedPerson == 5 ? 'text-blue-600' : ''}`}>{person}</span> 
                                        </button>

                                    ))} 
                                </Dialog.Description>                                
 
                                <div className="flex mt-8 justify-end">
                                    <Button type="button" onClick={() => setPromptSigneeForArea(false)} color="secondary">Cancel</Button>
                                    <Button type="button" onClick={() => setPromptSigneeForArea(false)}  className="ml-2">Done</Button>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
     
    )
  }