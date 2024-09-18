import React from 'react'
import nav_logo from '../assets/nav_logo.svg'

const Navbar = () => {
    return (
        <header className="w-full border-b-2 border-slate-300">
            <div className='container flex py-3 items-center justify-between'>
                <img src={nav_logo} className='w-fit h-10' alt="logo" srcset="" />
                <p className='cursor-pointer text-base lg:text-lg hover:-translate-y-1'>Profile</p>
            </div>
        </header>
    )
}

export default Navbar