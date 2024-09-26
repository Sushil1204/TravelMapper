import React from 'react'
import nav_logo from '../assets/nav_logo.svg'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    return (
        <header className="w-full border-b-2 border-slate-300 bg-white shadow-md dark:bg-gray-800 dark:text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <Link to={'/'}>
                    <img src={nav_logo} className="w-auto h-10" alt="logo" />
                </Link>

                {/* Navigation Links or Profile Section */}
                <nav className="flex items-center space-x-6">
                    {location.pathname !== '/login' && <Link to={'/profile'} className="cursor-pointer text-base lg:text-lg hover:-translate-y-1 transition-transform duration-300">Profile</Link>}
                    {/* Add more nav links here if needed */}
                </nav>
            </div>
        </header >
    )
}

export default Navbar