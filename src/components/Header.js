import React, { useContext, Fragment } from 'react'
import logo from '../components/logo.svg'
import { AuthContext } from "../components/AuthProvider";
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'

export default function Header() {

    const { user, logout } = useContext(AuthContext);
 
    return <header className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-100'>


        <div className='flex-1 flex flex-col min-h-0 bg-white'>
            <div className='flex-1 flex flex-col pt-4 pb-4 overflow-y-auto'>

                {/* APP Branding */}
                <div className='px-8 py-4'>
                    <Link to="/dashboard" className='flex items-center group'>
                        {/* <img className="h-12 mr-2  bg-blue-600 w-12 rounded-full" src={logo} /><b className='text-xl text-gray-800'></b> */}
                        {/* <span className='text-gray-400 ml-1 text-xs group-hover:opacity-100 opacity-0 transition duration-500'>By Motley Crew</span> */}
                 
                 <div className='h-14 w-14 p-1 rounded-full bg-blue-500 flex items-center justify-center text-white bg-blue-500'  >
                 <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' viewBox="0 0 640 512"><path class="fa-primary" fill='currentColor' d="M224 96C206.3 96 192 110.3 192 128V160C192 177.7 177.7 192 160 192C142.3 192 128 177.7 128 160V128C128 74.98 170.1 32 224 32C277 32 320 74.98 320 128V135.8C320 156.6 318.8 177.4 316.4 198.1L438.8 161.3C450.2 157.9 462.6 161.1 470.1 169.7C479.3 178.3 482.1 190.8 478.4 202.1L460.4 255.1H544C561.7 255.1 576 270.3 576 287.1C576 305.7 561.7 319.1 544 319.1H416C405.7 319.1 396.1 315.1 390 306.7C384 298.4 382.4 287.6 385.6 277.9L398.1 240.4L303.7 268.7C291.9 321.5 272.2 372.2 245.3 419.2L231.4 443.5C218.5 466.1 194.5 480 168.5 480C128.5 480 96 447.5 96 407.5V335.6C96 293.2 123.8 255.8 164.4 243.7L248.9 218.3C253.6 191.1 256 163.5 256 135.8V128C256 110.3 241.7 96 224 96L224 96zM231.8 290.3L182.8 304.1C169.3 309 160 321.5 160 335.6V407.5C160 412.2 163.8 416 168.5 416C171.5 416 174.4 414.4 175.9 411.7L189.8 387.4C207.3 356.6 221.4 324.1 231.8 290.3V290.3z"/><path fill='currentColor' style={{opacity:".4"}} class="fa-secondary" d="M64 407.5C64 410.4 64.11 413.2 64.34 416H24C10.75 416 0 405.3 0 392C0 378.7 10.75 368 24 368H64V407.5zM305.9 368H616C629.3 368 640 378.7 640 392C640 405.3 629.3 416 616 416H283.5C291.7 400.3 299.2 384.3 305.9 368z"/></svg>

                 </div>
                    </Link>
                </div>

                <nav className="px-8 py-4 text-sm font-semibold text-gray-800">
                <span class="uppercase text-gray-500 font-semibold text-xs tracking-wide mb-1 block">Primary</span>
                <ul>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 flex items-center transition'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-4 h-4 text-gray-500 mr-2'><path fill="currentColor" class="fa-primary" d="M266.9 7.918C278.1-2.639 297-2.639 309.1 7.918L565.1 231.9C578.4 243.6 579.7 263.8 568.1 277.1C556.4 290.4 536.2 291.7 522.9 280.1L288 74.52L53.07 280.1C39.77 291.7 19.56 290.4 7.917 277.1C-3.72 263.8-2.372 243.6 10.93 231.9L266.9 7.918z"/><path fill="currentColor"  class="fa-secondary" d="M288 74.52L512.1 270.6L512.5 447.9C512.6 483.3 483.9 512 448.5 512H128.1C92.74 512 64.09 483.4 64.07 448L64.02 270.5L288 74.52z"/></svg> */}
                Home</Link></li>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block transition'>Outgoing</Link></li>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block transition'>Incoming</Link></li>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block transition'>Completed</Link></li>
                <li><Link to="/account" className='hover:text-blue-500 py-2 block transition'>Settings</Link></li>
                </ul>
                <div className='mt-8'>
                <span class="uppercase text-gray-500 font-semibold text-xs tracking-wide mb-1 block">Templates</span>
                <ul>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block  transition'>Travel Expense</Link></li>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block transition '>Telework Agreement</Link></li>
                <li><Link to="/dashboard" className='hover:text-blue-500 py-2 block transition text-blue-500'>Create New</Link></li>

                </ul></div>
                
                </nav>



            </div>


            <div className='flex-shrink-0 flex px-8 py-4'>

                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button>
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-base">{user.profileImage ? user.profileImage : "🏄‍"}</div>

                            <div className='flex items-center hover:bg-gray-50 transition py-2 rounded-xl'>


                                <div>
                                    <span className='block font-semibold -mb-1 text-left'>{user.username}</span>
                                    <span className='text-sm text-gray-500 -mt-1 '>{user.email}</span></div>


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
                            <Menu.Items className="origin-bottom absolute bottom-16 left-0 mt-2 w-72 rounded-md shadow-xl bg-white focus:outline-none  overflow-hidden">

                                <Menu.Item>
                                    <Link to='/account' className="block px-4 py-4 hover:bg-gray-50 w-full text-left" >Account Settings</Link>

                                </Menu.Item>

                                <Menu.Item>

                                    <button className="block px-4 py-4 hover:bg-gray-50 w-full text-left" onClick={() => logout()}>Log out</button>
                                </Menu.Item>

                            </Menu.Items></Transition>




                    </Menu>
                </div>

            </div>


        </div>
    </header>
}