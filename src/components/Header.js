import React, { useContext } from 'react'
import logo from '../components/logo.svg' 
import { AuthContext } from "../components/AuthProvider";
import { Link } from 'react-router-dom';

export default function Header () {

    const { user, logout } = useContext(AuthContext); 

    return <header>


<div className='border-b p-2 '> 
<div className='max-w-7xl flex justify-between mx-auto items-center  px-4 md:px-6'>
    <div>
        <Link to="/dashboard"><img className="h-8" src={logo}/></Link>
    </div>

    <div><div className='text-sm'><Link to="/account">Logged in as <b>{user.username}</b></Link>  <button className="inline-flex ml-1" onClick={()=>logout()}>Log out</button></div></div></div></div>
    </header>
}