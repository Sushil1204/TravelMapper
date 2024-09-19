import React from 'react'
import { MdLogout, MdDelete, MdLightMode, MdDarkMode } from "react-icons/md";
import mumbai from '../assets/mumbai.jpg'

const Profile = () => {
    return (
        <div class="container mx-auto my-10 px-4">
            <div class=" flex sm:flex-col md:flex-row sm:space-y-10 items-center justify-evenly">
                <div class="flex items-center sm:flex-col md:flex-row sm:space-y-4 space-x-10">
                    <img class="inline-block h-24 w-2h-24 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div>
                        <h2 class="text-2xl font-bold">John Doe</h2>
                        <p class="text-gray-500">johndoe@example.com</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10">
                    <div className="relative group">
                        <MdLogout size={25} cursor={'pointer'} />
                        <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Logout
                        </div>
                    </div>
                    <div className="relative group">
                        <MdLightMode size={25} cursor={'pointer'} />
                        <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Light Theme
                        </div>
                    </div>
                    <div className="relative group">
                        <MdDelete size={25} cursor={'pointer'} color='red' />
                        <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Delete Account
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <h3 class="text-2xl font-semibold mb-4">Your Saved Travel Itineraries</h3>

                <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile