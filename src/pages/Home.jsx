import React, { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import Datepicker from "react-tailwindcss-datepicker";
import { WiStars } from "react-icons/wi";
import homebg from '../assets/homebg.mp4'
import InputSelect from '../components/InputSelect';
import { budgets, preferencesOptions } from '../assets/constants';
import dayjs from 'dayjs';
import { useGenerateItinerary } from '../hooks/useGenerateItinerary';
import { useMutation } from '@tanstack/react-query';
import { fetchItinerary } from '../api';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        destination: '',
        duration: '',
        dateOfTravel: {},
        preferences: '',
        budget: '',
    });
    const [tripDetails, setTripDetails] = useState({})

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
            const diffDays = end.diff(start, 'day');
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

    const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
        mutationFn: () => fetchItinerary({ destination, dateOfTravel, duration, preferences, budget }),
        onSuccess: (data) => (
            navigate('/trip-details', { state: data })
        )
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate()
    };

    // console.log(data)

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

                <div className="relative z-10 h-[calc(100vh-65.6px)]  flex items-center justify-center">
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
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                                    {/* Destination */}
                                    <div className="mb-4 w-full">
                                        <InputBox value={formData.destination} handleChange={handleChange} name={'destination'} placeholder={'Enter a city or country'} />
                                    </div>

                                    {/* Dates of Travel */}
                                    <div className="mb-4 w-full">
                                        <label htmlFor="date" className="block text-sm lg:text-lg  font-medium text-gray-700">
                                            Dates of Travel
                                        </label>
                                        <Datepicker name={'dateOfTravel'} minDate={MIN_DATE} placeholder='Select dates' value={dateRange}
                                            onChange={newValue => setDateRange(newValue)} popoverDirection='down' inputClassName={'mt-1 w-full h-14 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-sm lg:text-xl  text-gray-700 placeholder-gray-400'} />
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
                                    <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-5 w-full h-14 bg-blue-600 text-white text-xl py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <WiStars size={30} />
                                            {isPending ? 'Generating Itinerary' : 'Generate Itinerary'}
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
