import React, { useState } from 'react';
import mumbai from '../assets/mumbai.jpg';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { commuteOptions, tips } from '../assets/constants';
import SuggestionCard from '../components/SuggestionCard';
import { MdSaveAlt } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
const TripDetails = () => {
    const location = useLocation();
    const { state } = location;
    const [showDetails, setShowDetails] = useState(true);
    console.log(state)
    const handleToggle = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="container mx-auto px-4 py-3 my-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="grid col-span-2 lg:order-1 order-1">
                    <div className="relative rounded-lg mb-4">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
                                {state?.Destination_Overview?.Name}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-10">
                        <div className="relative group">
                            <CgRedo size={30} cursor={'pointer'} />
                            <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Regenerate
                            </div>
                        </div>
                        <div className="relative group">
                            <MdSaveAlt size={25} cursor={'pointer'} />
                            <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Save
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        {Object.entries(state?.Itinerary)?.map(([day, details]) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg md:text-xl font-semibold">{day} </h2>
                                    {showDetails ? (
                                        <FaChevronDown
                                            size={25}
                                            className="cursor-pointer mr-2 md:mr-10"
                                            onClick={handleToggle}
                                        />
                                    ) : (
                                        <FaChevronUp
                                            size={25}
                                            className="cursor-pointer mr-2 md:mr-10"
                                            onClick={handleToggle}
                                        />
                                    )}
                                </div>
                                {details?.Activities?.map((activity, index) => (
                                    <div
                                        className={`mt-4 space-y-4 overflow-hidden transition-all duration-700 ease-in-out ${showDetails ? '' : 'max-h-0'}`}
                                    >
                                        {showDetails && (
                                            <div className="space-y-4">
                                                {/* Activity 1 */}
                                                <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row  md:items-center  gap-4">
                                                    {/* Time Box */}
                                                    <div className="w-24 p-2 bg-purple-300 rounded flex items-center justify-center">
                                                        <p className="text-base font-semibold">17:00 AM</p>
                                                    </div>

                                                    {/* Activity Details */}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium">{activity?.Activity}</h3>
                                                        <p className="text-gray-600 mt-1">{activity?.Description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                ))}

                            </>
                        ))}
                    </div>
                </div>

                <div className="lg:order-2 order-2 space-y-6">
                    <SuggestionCard title={'Travel tips'} suggestions={state?.Travel_Tips?.Tips?.split(". ")} />
                    <SuggestionCard title={'Commute options'} suggestions={state?.Commute_Options?.Tips?.split(". ")} />
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
