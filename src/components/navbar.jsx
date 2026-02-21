import React from 'react'
import { FaRobot, FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div>
      <div className="nav flex items-center justify-between h-15 m-4 p-5">
        <div className="logo flex items-center gap-2.5">
          <i className='text-[50px]'><FaRobot /></i>
          <h3 className='text-[25px] font-bold'>HELIX <span className='text-purple-500'>AI</span></h3>
        </div>

        <div className="user">
         <i className='text-[27px] cursor-pointer'><FaRegCircleUser/></i>
        </div>
      </div>

    </div>
  )
}

export default Navbar