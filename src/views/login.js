import React, { useState } from 'react'
import axios from 'axios'

function Login() { 
    const [signInProgress, setSignInProgress] = useState(false)
 
    const handleSubmit = (e) => {
        e.preventDefault()
        setSignInProgress(true)



        const user = {
            username: 'ecovertms', 
            password:'S4!APgjuaDG5'
          };
      
          axios.post(`https://mcbackenddev.herokuapp.com/api/auth/login`, { user })
            .then(res => {
              console.log(res);
              console.log(res.data);
            }) 


        // setTimeout(() => {

        //     setSignInAttempted(true)
        //     setSignInProgress(false)
        // }, 1500);
    }



    return <div className='max-w-lg mx-auto'>
<h1>Login to Motley Ceew</h1>
        <form className="space-y-8 bg-white p-8 rounded-xl w-full" action="#" method="POST">
            <div>
                <label htmlFor="email" className="text-left block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="text-left  block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-xl   placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>





            <div>
                <button
                    onClick={(e) => {
                      handleSubmit(e)


                    }}
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {signInProgress ? "Signing In..." : 'Sign In'}
                </button>
            </div>
        </form>
    </div>
}


export default Login