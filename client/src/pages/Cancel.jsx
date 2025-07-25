import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className="m-2 w-full max-w-md bg-red-200 px-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="text-red-900  font-bold  text-lg text-center ">
        
        
        Order Cancel
      </p>
      <Link to="/" className="border border-red-900 hover:bg-red-900 text-red-900 hover:text-white font-bold px-4 py-1 text-lg text-center transition-all">Go to Home</Link>
    </div>
  )
}

export default Cancel