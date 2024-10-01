import React, { useState } from 'react';
import mumbai from '../assets/mumbai.jpg';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { commuteOptions, tips } from '../assets/constants';
import SuggestionCard from '../components/SuggestionCard';
import { MdDelete, MdSaveAlt } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { databases, ID } from '../utilities/appwriteConfig';
import Cookies from 'js-cookie';
import TripDetailsUpdateModal from '../components/tripDetailsUpdateModal';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
const TripDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const [savedTripID, setSavedTripID] = useState()
    const [showDetails, setShowDetails] = useState({ 0: true });
    const { isAuthenticated } = useAuth();
    const [modalData, setModalData] = useState({
        isOpen: false,   // To track modal visibility
        message: ""      // To hold the message text
    });
    const user = Cookies.get('userData') && JSON.parse(Cookies.get('userData'))
    const handleToggle = () => {
        setShowDetails(!showDetails);
    };

    const { mutate: saveTripDetails, isSuccess: isSaveTripDetailsSuccess, isError: isSaveTripDetailsError, data: savedTripData } = useMutation({
        mutationKey: ['saveTrip'],
        mutationFn: async () => await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            ID.unique(),
            {
                Itineraries: JSON.stringify(state),
                createdBy: user?.$id
            }
        ),
        onMutate: () => {
            setModalData({
                isOpen: true,
                message: "Saving..."
            })
        },
        onSuccess: (data) => {
            setModalData({
                isOpen: false,
                message: "saved..."
            })
            setSavedTripID(data?.$id)
        }
    })

    const handleSaveTrip = () => {
        if (!isAuthenticated) {
            toast.error("Please login to save trip detail", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })

            setTimeout(() => {
                navigate('/login', { state: { tripDetailsAvailable: true, tripDetails: tripData } })

                clearTimeout()
            }, 5000);

        } else {
            saveTripDetails()
        }
    }
    console.log(state)
    const tripData = state?.tripId == undefined ? state?.tripDetails : state?.tripDetails?.tripDetails
    const savedTrip = state?.tripId

    const handleShowDayPlan = (index) => {
        setShowDetails((prevState) => {
            // close any previously opened item and open the new one
            const updatedState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false; // Close all other elements
                return acc;
            }, {});

            return {
                ...updatedState,
                [index]: true // Open the selected index
            };
        });
    };

    const { mutate: deleteTripDetails, isSuccess: isDeleteTripDetailsSuccessful, isError: isDeleteTripDetailsError } = useMutation({
        mutationKey: ['deleteDetails'],
        mutationFn: async () => databases.deleteDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            savedTrip || savedTripID
        ),
        onMutate: () => {
            setModalData({
                isOpen: true,
                message: "Deleting..."
            })
        },
        onSuccess: () => {
            setModalData({
                isOpen: false,
                message: ""
            })
            navigate('/profile', { state: { refetchDoucuments: true } })

        }
    })

    const handleDeleteTrip = () => (
        deleteTripDetails()
    )

    return (
        <>
            <div className="container mx-auto px-4 py-3 mt-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2 lg:order-1 order-1 space-y-3">
                        <div className="relative rounded-lg mb-4">
                            <img
                                src={mumbai}
                                alt="Mumbai Adventure"
                                className="w-full h-64 md:h-80 object-cover rounded-lg"
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center">
                                    {tripData?.Destination_Overview?.Name}
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
                            {savedTrip || isSaveTripDetailsSuccess ?
                                <div className="relative group" onClick={handleDeleteTrip}>
                                    <MdDelete size={25} cursor={'pointer'} />
                                    <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Save
                                    </div>
                                </div>

                                : <div className="relative group" onClick={handleSaveTrip}>
                                    <MdSaveAlt size={25} cursor={'pointer'} />
                                    <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Save
                                    </div>
                                </div>}
                        </div>
                        <div className="mt-6">
                            {Object.entries(tripData?.Itinerary)?.map(([day, details], dayIndex) => (
                                <div key={dayIndex}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg md:text-2xl font-bold">{day}</h2>
                                        <div onClick={() => handleShowDayPlan(dayIndex)}>
                                            {showDetails[dayIndex] ? (
                                                <FaChevronUp
                                                    size={25}
                                                    className="cursor-pointer "
                                                />
                                            ) : (
                                                <FaChevronDown
                                                    size={25}
                                                    className="cursor-pointer "
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className={`my-4 space-y-4 overflow-hidden transition-all duration-700 ease-in-out ${showDetails[dayIndex] ? '' : 'max-h-0'}`}>
                                        {details?.Activities?.map((activity, index) => {
                                            return <div className="space-y-4" key={index}>
                                                <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row md:items-center gap-4">
                                                    {/* Time Box */}
                                                    <div className="w-24 p-2 bg-purple-300 dark:text-black rounded flex items-center justify-center">
                                                        <p className="text-base font-semibold">{activity?.Time?.split('-')[1].trim()}</p>
                                                    </div>

                                                    {/* Activity Details */}
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium">{activity?.Activity}</h3>
                                                        <p className="text-gray-600 dark:text-gray-300 mt-1">{activity?.Description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:order-2 order-2 space-y-6">
                        <SuggestionCard title={'Travel tips'} suggestions={tripData?.Travel_Tips?.Tips?.split(". ")} />
                        <SuggestionCard title={'Commute options'} suggestions={tripData?.Commute_Options?.Tips?.split(". ")} />
                    </div>
                </div>
            </div >
            <TripDetailsUpdateModal modalData={modalData}
                onClose={() => setModalData({
                    isOpen: false,
                    message: ''
                })} />
        </>
    );
};

export default TripDetails;
