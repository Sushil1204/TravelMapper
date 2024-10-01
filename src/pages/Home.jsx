import React, { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import Datepicker from "react-tailwindcss-datepicker";
import { WiStars } from "react-icons/wi";
import homebg from '../assets/homebg.mp4'
import InputSelect from '../components/InputSelect';
import { budgets, preferencesOptions } from '../assets/constants';
import dayjs from 'dayjs';
import useDebounceHook from '../hooks/useDebounceHook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchItinerary } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { account } from '../utilities/appwriteConfig';
import Cookies from 'js-cookie';
import AccountVerificationModal from '../components/AccountVerificationModal';
import AuthLoader from '../assets/authLoader.gif'
import axios from 'axios';
import toast from 'react-hot-toast';
const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location;
    const [formData, setFormData] = useState({
        destination: '',
        duration: '',
        dateOfTravel: {},
        preferences: '',
        budget: '',
    });
    const [showSuggestions, setShowSuggestions] = useState(true); // New state to control suggestion visibility

    const MIN_DATE = new Date();
    MIN_DATE.setDate(MIN_DATE.getDate());

    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    // Update formData when dateRange changes
    useEffect(() => {
        const { startDate, endDate } = dateRange;

        let duration = ''
        if (startDate && endDate) {
            const start = dayjs(startDate);
            const end = dayjs(endDate);
            const diffDays = end.diff(start, 'day') + 1;
            duration = `${diffDays} days`;
        }
        setFormData((prevData) => ({
            ...prevData,
            dateOfTravel: {
                startDate: dayjs(startDate).format('DD/MM/YYYY'),
                endDate: dayjs(endDate).format('DD/MM/YYYY'),
            },
            duration,
        }));
    }, [dateRange]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle non-dateRange fields
        if (name !== 'dateOfTravel') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const { destination, dateOfTravel, duration, preferences, budget } = formData;

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: () => fetchItinerary({ destination, dateOfTravel, duration, preferences, budget }),
        onSuccess: (data) => {
            navigate('/trip-details', { state: { tripDetails: data } })
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { destination, dateOfTravel, preferences, budget } = formData;

        // Check if all fields are filled
        if (!destination || !dateOfTravel.startDate || !dateOfTravel.endDate || !preferences || !budget) {
            toast.error('Please fill in all the fields before generating the itinerary');
            return; // Stop form submission
        }

        mutate()
    };

    const debouncedSearchTerm = useDebounceHook(destination, 2000) // custom hook for debouncing

    const { data: placesData, isSuccess: isPlacesDataSuccess } = useQuery({
        queryKey: ['fetchPlaces'],
        queryFn: async () => await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}&format=json&text=${debouncedSearchTerm}&type=city`),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        // retryDelay: 2000
        retry: false,
        enabled: !!debouncedSearchTerm
    })

    const places = placesData?.data?.results.filter((place) => place?.rank?.confidence > 0)



    return (
        <>
            <div className="relative">
                <video className="absolute top-0 left-0 w-full h-full object-cover opacity-30 aspect-video"
                    autoPlay
                    loop
                    muted
                    src={homebg}
                >
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-slate-950 opacity-50"></div>

                <div className="relative z-10 md:h-[calc(100vh-65.6px)]  flex items-center justify-center">
                    <div className="container mx-auto space-y-10 px-4 sm:px-6 lg:px-8 py-8">
                        {/* Heading Section */}
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                                Plan Your Perfect Trip
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-white">
                                Discover personalized itineraries and make the most of your travels with ease.
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="max-w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-6 place-items-center">
                                    <div className="mb-4 w-full relative">
                                        <div>
                                            <InputBox value={formData.destination} handleChange={handleChange} label={'Destination'} name={'destination'} placeholder={'Enter a city or country'} />
                                            {showSuggestions && places && places.length > 0 && (
                                                <ul className="autocomplete-list absolute z-10 mt-2 bg-white border dark:bg-gray-800 dark:border-none border-gray-300 rounded shadow-lg">
                                                    {places.map((place, index) => (
                                                        <li
                                                            key={index}
                                                            className="px-4 py-2 hover:bg-gray-200 hover:dark:bg-black dark:text-white cursor-pointer"
                                                            onClick={() => {
                                                                setFormData((prev) => ({ ...prev, destination: place?.formatted }))
                                                                // Reset destination to stop fetching and hide suggestions
                                                                setShowSuggestions(false); // Hide suggestions after selection

                                                            }}
                                                        >
                                                            {place?.formatted}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dates of Travel */}
                                    <div className="mb-4 w-full">
                                        <label htmlFor="date" className="block text-sm lg:text-lg font-medium text-gray-700">
                                            Dates of Travel
                                        </label>
                                        <Datepicker label="Select Date" name={'dateOfTravel'} minDate={MIN_DATE} placeholder='Select dates' value={dateRange}
                                            onChange={newValue => setDateRange(newValue)} popoverDirection='down' inputClassName={'mt-1 w-full h-14 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition duration-200 ease-in-out text-lg placeholder-gray-700'} />
                                    </div>

                                    {/* Travel Preferences */}
                                    <div className="mb-4 w-full">
                                        <InputSelect value={formData.preferences} handleChange={handleChange} label={'Travel Preferences'} name={'preferences'} placeholder={'Travel Preferences'} options={preferencesOptions} />
                                    </div>

                                    {/* Budget Constraints */}
                                    <div className="mb-4 w-full">
                                        <InputSelect value={formData.budget} handleChange={handleChange} label={'Budget Constraints'} name={'budget'} placeholder={'Budget Constraints'} options={budgets} />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-span-1 sm:col-span-1 lg:col-span-4">
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center h-14 bg-gray-800 text-white  border border-gray-600 text-xl py-2 px-4 rounded-md shadow-sm transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isPending}
                                            aria-live="polite"
                                        >
                                            {isPending ? (
                                                <div className="flex items-center space-x-2 animate-fadeIn">
                                                    {/* Loading spinner */}
                                                    <img
                                                        src={AuthLoader}
                                                        className="w-8 md:w-10 h-auto"
                                                        alt="Loading"
                                                    />
                                                    <p className="text-sm md:text-lg">Generating Itinerary</p>
                                                </div>
                                            ) : (
                                                <p className="text-sm md:text-lg">Generate Itinerary</p>
                                            )}
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Home;
