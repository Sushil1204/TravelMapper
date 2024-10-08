import React from 'react'
import { MdLogout, MdLightMode, MdDarkMode } from "react-icons/md";
import mumbai from '../assets/mumbai.jpg'
import { useMutation, useQuery } from '@tanstack/react-query';
import { account, databases } from '../utilities/appwriteConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Query } from 'appwrite';
import { useTheme } from '../theme/ThemeProvider';

const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const { theme, toggleTheme } = useTheme();
    const Logout = useMutation({
        mutationKey: ['Logout'],
        mutationFn: async () => await account.deleteSession(
            'current'
        ),
        onSuccess: () => {
            Cookies.remove('userData')
            navigate('/')
        }

    })

    const handleLogout = () => {
        Logout.mutate()
    }

    const user = Cookies.get('userData') && JSON.parse(Cookies.get('userData'))

    const { data: fetchSavedTrip, isSuccess: isFetchSavedTripsSuccess, isError: isFetchSavedError, refetch: refetchSavedTrips, isLoading: isFetchSavedTripsLoading } = useQuery({
        queryKey: ['TripDetails'],
        queryFn: async () => await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            [
                Query.equal('createdBy', user?.$id)
            ]
        ),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryDelay: 2000
    })

    if (state?.refetchDoucuments) refetchSavedTrips()

    console.log(isFetchSavedTripsLoading)

    return (
        <div class="container  h-screen md:h-full mx-auto mt-10 px-4">
            <div class=" flex sm:flex-col md:flex-row sm:space-y-10 items-center justify-evenly">
                <div class="flex items-center sm:flex-col md:flex-row sm:space-y-4 space-x-10">
                    <img class="inline-block h-24 w-2h-24 rounded-full ring-2 ring-white" src={`https://ui-avatars.com/api/?name=${user?.name}`} alt="" />
                    <div>
                        <h2 class="text-2xl font-bold">{user?.name}</h2>
                        <p class="text-gray-500">{user?.email}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10">
                    <div className="relative group" onClick={handleLogout}>
                        <MdLogout size={25} cursor={'pointer'} />
                        <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Logout
                        </div>
                    </div>
                    <div className="relative group" onClick={toggleTheme}>
                        {theme === 'dark' ?
                            <>
                                <MdLightMode size={25} cursor={'pointer'} />
                                <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Switch theme
                                </div>
                            </>
                            :
                            <>
                                <MdDarkMode size={25} cursor={'pointer'} />
                                <div className="absolute bottom-full mb-2 w-max left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Switch theme
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Your Saved Travel Itineraries</h3>
                {isFetchSavedTripsLoading &&

                    // Skeleton UI for loading state
                    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 py-10">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="relative rounded-lg animate-pulse">
                                <div className="w-full h-64 md:h-80 bg-gray-300 rounded-lg"></div>
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
                                    <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {fetchSavedTrip?.documents.length > 0 ? <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 py-10">
                    {fetchSavedTrip?.documents?.map((savedTrip, index) => {
                        return <div div key={index} className="relative rounded-lg" onClick={() => navigate('/trip-details', {
                            state: {
                                tripDetails: JSON.parse(savedTrip?.Itineraries), tripId: savedTrip?.$id

                            }
                        })}>
                            <img
                                src={mumbai}
                                alt="Mumbai Adventure"
                                className="w-full h-64 md:h-80 object-cover rounded-lg"
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
                                <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
                                    {JSON.parse(savedTrip?.Itineraries)?.tripDetails?.Destination_Overview?.Name}
                                </h1>
                            </div>
                        </div>

                    })}
                </div> :
                    <p className='col-span-3 text-lg font-semibold w-full h-full flex items-center justify-center'>No Itineraries created</p>
                }
            </div>
        </div >

    )
}

export default Profile