import React from 'react'
import nav_logo from '../assets/nav_logo.svg'
import logo_white from '../assets/logo_white.svg'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../theme/ThemeProvider';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import crossIcon from '../assets/crossIcon.png'
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const isAuthenticated = Cookies.get('userData') && JSON.parse(Cookies.get('userData'));
    const handleProfileClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault(); // Prevent navigation
            toast.error("Please login to access profile page", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        }
    };

    return (
        <>
            <header className="w-full border-b-2 border-slate-300 bg-white shadow-md dark:bg-gray-800 dark:text-white">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link to={'/'}>
                        {theme === 'dark' ? <img src={logo_white} className="w-auto h-10" alt="logo" /> : <img src={nav_logo} className="w-auto h-10" alt="logo" />}
                    </Link>
                    <nav className="flex items-center space-x-6">
                        {location.pathname !== '/login' && <Link to={'/profile'} onClick={handleProfileClick} className="cursor-pointer text-base lg:text-lg hover:-translate-y-1 transition-transform duration-300">Profile</Link>}
                    </nav>
                </div>
            </header >
        </>
    )
}

export default Navbar