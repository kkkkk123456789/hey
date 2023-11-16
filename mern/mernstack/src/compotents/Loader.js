import React from 'react'
import loaderimg from "../images/loader.gif"

const Loader = () => {
  return (
    <div className="">
          <img className="mx-auto mt-40" src={loaderimg} alt="img laded"/>
          <p className="text-4xl text-center">Loading...</p>
        </div>
  )
}

export default Loader