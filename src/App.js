import React, {useState} from 'react'

function App() {

  const [signInAttempted, setSignInAttempted] = useState(false)
  const [signInProgress, setSignInProgress] = useState(false)
 
  return (
    <div className="bg-gray-50     min-h-screen   justify-center text-center">
      <div className='px-6 max-w-lg mx-auto'>
        <div>
          <svg className="mx-auto w-72 p-12" viewBox="0 0 98 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.04167 9.04167H21.9583M24.5417 14.2083H6.45833H24.5417ZM24.5417 14.2083C25.2268 14.2083 25.8839 14.4805 26.3684 14.965C26.8528 15.4494 27.125 16.1065 27.125 16.7917V24.5417C27.125 25.2268 26.8528 25.8839 26.3684 26.3684C25.8839 26.8528 25.2268 27.125 24.5417 27.125H6.45833C5.77319 27.125 5.11611 26.8528 4.63164 26.3684C4.14717 25.8839 3.875 25.2268 3.875 24.5417V16.7917C3.875 16.1065 4.14717 15.4494 4.63164 14.965C5.11611 14.4805 5.77319 14.2083 6.45833 14.2083H24.5417ZM24.5417 14.2083V11.625C24.5417 10.9399 24.2695 10.2828 23.785 9.79831C23.3006 9.31384 22.6435 9.04167 21.9583 9.04167L24.5417 14.2083ZM6.45833 14.2083V11.625C6.45833 10.9399 6.7305 10.2828 7.21497 9.79831C7.69944 9.31384 8.35652 9.04167 9.04167 9.04167L6.45833 14.2083ZM9.04167 9.04167V6.45833C9.04167 5.77319 9.31384 5.11611 9.79831 4.63164C10.2828 4.14717 10.9399 3.875 11.625 3.875H19.375C20.0601 3.875 20.7172 4.14717 21.2017 4.63164C21.6862 5.11611 21.9583 5.77319 21.9583 6.45833V9.04167H9.04167Z" stroke="#2662eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M47.96 22L47.942 14.44L44.234 20.668H42.92L39.23 14.602V22H36.494V9.40004H38.906L43.622 17.23L48.266 9.40004H50.66L50.696 22H47.96Z" fill="black" />
            <path d="M57.7354 22.144C56.7154 22.144 55.7974 21.934 54.9814 21.514C54.1774 21.082 53.5474 20.488 53.0914 19.732C52.6354 18.976 52.4074 18.118 52.4074 17.158C52.4074 16.198 52.6354 15.34 53.0914 14.584C53.5474 13.828 54.1774 13.24 54.9814 12.82C55.7974 12.388 56.7154 12.172 57.7354 12.172C58.7554 12.172 59.6674 12.388 60.4714 12.82C61.2754 13.24 61.9054 13.828 62.3614 14.584C62.8174 15.34 63.0454 16.198 63.0454 17.158C63.0454 18.118 62.8174 18.976 62.3614 19.732C61.9054 20.488 61.2754 21.082 60.4714 21.514C59.6674 21.934 58.7554 22.144 57.7354 22.144ZM57.7354 19.84C58.4554 19.84 59.0434 19.6 59.4994 19.12C59.9674 18.628 60.2014 17.974 60.2014 17.158C60.2014 16.342 59.9674 15.694 59.4994 15.214C59.0434 14.722 58.4554 14.476 57.7354 14.476C57.0154 14.476 56.4214 14.722 55.9534 15.214C55.4854 15.694 55.2514 16.342 55.2514 17.158C55.2514 17.974 55.4854 18.628 55.9534 19.12C56.4214 19.6 57.0154 19.84 57.7354 19.84Z" fill="black" />
            <path d="M70.8083 21.532C70.5323 21.736 70.1903 21.892 69.7823 22C69.3863 22.096 68.9663 22.144 68.5223 22.144C67.3703 22.144 66.4763 21.85 65.8403 21.262C65.2163 20.674 64.9043 19.81 64.9043 18.67V14.692H63.4103V12.532H64.9043V10.174H67.7123V12.532H70.1243V14.692H67.7123V18.634C67.7123 19.042 67.8143 19.36 68.0183 19.588C68.2343 19.804 68.5343 19.912 68.9183 19.912C69.3623 19.912 69.7403 19.792 70.0523 19.552L70.8083 21.532Z" fill="black" />
            <path d="M72.0246 8.64404H74.8326V22H72.0246V8.64404Z" fill="black" />
            <path d="M86.5647 17.194C86.5647 17.23 86.5467 17.482 86.5107 17.95H79.1847C79.3167 18.55 79.6287 19.024 80.1207 19.372C80.6127 19.72 81.2247 19.894 81.9567 19.894C82.4607 19.894 82.9047 19.822 83.2887 19.678C83.6847 19.522 84.0507 19.282 84.3867 18.958L85.8807 20.578C84.9687 21.622 83.6367 22.144 81.8847 22.144C80.7927 22.144 79.8267 21.934 78.9867 21.514C78.1467 21.082 77.4987 20.488 77.0427 19.732C76.5867 18.976 76.3587 18.118 76.3587 17.158C76.3587 16.21 76.5807 15.358 77.0247 14.602C77.4807 13.834 78.0987 13.24 78.8787 12.82C79.6707 12.388 80.5527 12.172 81.5247 12.172C82.4727 12.172 83.3307 12.376 84.0987 12.784C84.8667 13.192 85.4667 13.78 85.8987 14.548C86.3427 15.304 86.5647 16.186 86.5647 17.194ZM81.5427 14.296C80.9067 14.296 80.3727 14.476 79.9407 14.836C79.5087 15.196 79.2447 15.688 79.1487 16.312H83.9187C83.8227 15.7 83.5587 15.214 83.1267 14.854C82.6947 14.482 82.1667 14.296 81.5427 14.296Z" fill="black" />
            <path d="M97.5104 12.316L93.1364 22.594C92.6924 23.71 92.1404 24.496 91.4804 24.952C90.8324 25.408 90.0464 25.636 89.1224 25.636C88.6184 25.636 88.1204 25.558 87.6284 25.402C87.1364 25.246 86.7344 25.03 86.4224 24.754L87.4484 22.756C87.6644 22.948 87.9104 23.098 88.1864 23.206C88.4744 23.314 88.7564 23.368 89.0324 23.368C89.4164 23.368 89.7284 23.272 89.9684 23.08C90.2084 22.9 90.4244 22.594 90.6164 22.162L90.6524 22.072L86.4584 12.316H89.3564L92.0744 18.886L94.8104 12.316H97.5104Z" fill="black" />
          </svg>

        </div>

        <p className='text-gray-600 px-4 mb-2  '>If you do not have an accont to access this application, contact Motley Crew.</p>

        <div>
    {signInAttempted ? <div className=' p-4 my-8 rounded-xl bg-red-500 text-white'> 
    Our records indicate you do not have an account. Please contact Motley Crew for assistance. info@motleycrewdev.com

    </div> : null}


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

 

            <div className="flex items-center justify-between">

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
              onClick={(e)=>{
                e.preventDefault()
                setSignInProgress(true)
                setTimeout(() => {  
                  
                  setSignInAttempted(true)
                  setSignInProgress(false)
                }, 1500);

              
              }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {signInProgress ? "Signing In..." : 'Sign In'}
              </button>
            </div>
          </form>



        </div>
      </div></div>
  );
}

export default App;
