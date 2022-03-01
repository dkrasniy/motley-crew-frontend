import React from "react";
import { Spinner } from "./Spinner"; 
import {  Link } from "react-router-dom";

  const sizeClassnames = {
    big: "py-3 px-5 text-sm rounded-xl font-semibold text-sm  ",
    small: "px-2 py-1 text-xs rounded-lg font-semibold md:text-sm", 
  };
  
  const colorClassnames = {
    primary:
      "text-white bg-blue-600 hover:bg-blue-700 disabled:text-blue-700 disabled:bg-blue-700 focus:ring-4 focus:ring-blue-300",
    secondary:
      "bg-white border border-gray-300  font-medium text-gray-700 hover:bg-gray-50 disabled:text-blue-300 focus:ring-4 focus:ring-gray-100",
    red:
    "text-white bg-red-600 hover:bg-red-700 disabled:text-red-700 disabled:bg-red-700 focus:ring-4 focus:ring-red-300",
  };
   
  
  const Button = ({
    children,
    size = "big",
    color = "primary",
    disabled,
    loading,
    icon,
    className = "",
    transition = true, 
    href,
    to,
    ...props
  }) => { 
    
    if(href) {
      return (<a  href={href} className={`font-display  flex outline-none ${sizeClassnames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
      } items-center justify-center ${className}`}
      {...props}>    <span className={loading ? "opacity-0" : `flex items-center`}>
      {icon ? <span className={`mr-1 items-center w-5 h-5`}>{icon}</span> : null}
      {children}
    </span></a>)
    }
    else if(to){
   
        return (<Link to={to} className={`font-display  flex outline-none ${sizeClassnames[size]
        } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
        } items-center justify-center ${className}`}
        {...props}>    <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-1 items-center w-5 h-5`}>{icon}</span> : null}
        {children}
      </span></Link>)
 
    }

    return (
 
      <button
      className={`font-display  flex outline-none ${sizeClassnames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
      } items-center justify-center ${className}`}
      {...props}
      >

        <span className={loading ? "opacity-0" : `flex items-center`}>
          {icon ? <span className={`mr-1 items-center w-5 h-5`}>{icon}</span> : null}
          {children}
        </span>
   
        {loading ? (
          <span className={`absolute`}>
            <Spinner size={size === "small" ? "2" : "4"} />
          </span>
        ) : null}
      </button>
  
  )};

  export default Button