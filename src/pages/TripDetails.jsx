import React, { useState } from 'react';
import mumbai from '../assets/mumbai.jpg';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { commuteOptions, tips } from '../assets/constants';
import SuggestionCard from '../components/SuggestionCard';

const TripDetails = () => {
    const [showDetails, setShowDetails] = useState(true);

    const handleToggle = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="container mx-auto px-4 py-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:order-1 order-1 space-y-6">
                    <div className="relative rounded-lg">
                        <img
                            src={mumbai}
                            alt="Mumbai Adventure"
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
                                6 Days Adventure in Mumbai
                            </h1>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg md:text-xl font-semibold">Day 1: Exploring Mumbai</h2>
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
                        <div
                            className={`mt-4 space-y-4 overflow-hidden transition-all duration-700 ease-in-out ${showDetails ? '' : 'max-h-0'}`}
                        >
                            {showDetails && (
                                <div className="space-y-4">
                                    {/* Activity 1 */}
                                    <div className="p-4 bg-white shadow-lg rounded-lg flex items-center">
                                        <div className="w-24 h-10 p-2 text-lg bg-purple-200 rounded-full flex items-center justify-center">
                                            7:00 AM
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium">Breakfast at Café de la Plaza</h3>
                                            <p className="text-gray-600">Start your day with a local breakfast.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:order-2 order-2 space-y-6">
                    <SuggestionCard title={'Travel tips'} suggestions={tips} />
                    <SuggestionCard title={'Commute options'} suggestions={commuteOptions} />
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
