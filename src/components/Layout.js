import React from 'react'
import Header from './Header';

function Layout({ children }) {


    return <>
       
        <Header />
       <div className='md:pl-64 flex flex-col flex-1  '>
               {children}
       </div>
      
    
    </>
}

export default Layout