import React, { useContext, Fragment } from 'react'
import logo from '../components/logo.svg'
import { AuthContext } from "../components/AuthProvider";
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'

export default function Header() {

    const { user, logout } = useContext(AuthContext);

    return <header>


        <div className='border-b border-gray-50 py-2'>
            <div className='max-w-7xl flex justify-between mx-auto items-center  px-4 md:px-6'>
                
                {/* APP Branding */}
                <div>
                    <Link to="/dashboard" className='flex items-center group'>
                        <img className="h-10 mr-2" src={logo} /><b className='text-lg text-gray-700'>Motley</b>
                        {/* <span className='text-gray-400 ml-1 text-xs group-hover:opacity-100 opacity-0 transition duration-500'>By Motley Crew</span> */}
                        </Link>
                </div>

                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button>
                            <div className='flex items-center hover:bg-gray-50 transition py-2 px-3 rounded-xl'>
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-base mx-auto mr-4">{user.profileImage ? user.profileImage : "🏄‍"}</div>


                                <div>
                                    <span className='block font-semibold -mb-1 text-left'>{user.username}</span>
                                    <span className='text-sm text-gray-500 -mt-1 '>{user.email}</span></div>
                                <svg className='ml-4 text-gray-400 h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>

                            </div>

                        </Menu.Button>


                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-xl bg-white focus:outline-none  overflow-hidden">

                                <Menu.Item>
                                    <Link to='/account' className="block px-4 py-4 hover:bg-gray-50 w-full text-left" >Account Settings</Link>

                                </Menu.Item>

                                <Menu.Item>

                                    <button className="block px-4 py-4 hover:bg-gray-50 w-full text-left" onClick={() => logout()}>Log out</button>
                                </Menu.Item>

                            </Menu.Items></Transition>




                    </Menu>
                </div>

            </div></div>
    </header>
}