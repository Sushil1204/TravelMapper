import React from 'react'
import nav_logo from '../assets/nav_logo.svg'

const Navbar = () => {
    return (
        <header className="w-full border-b-2 border-slate-300 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <img src={nav_logo} className="w-auto h-10" alt="logo" />

                {/* Navigation Links or Profile Section */}
                <nav className="flex items-center space-x-6">
                    <p className="cursor-pointer text-base lg:text-lg hover:-translate-y-1 transition-transform duration-300">Profile</p>
                    {/* Add more nav links here if needed */}
                </nav>
            </div>
        </header>
    )
}

export default Navbar