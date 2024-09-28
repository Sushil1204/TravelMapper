import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { account } from '../utilities/appwriteConfig';
import Cookies from 'js-cookie';

const VerifyAccount = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(search);
    const secret = searchParams.get('secret');
    const userId = searchParams.get('userId');
    console.log(secret, userId)

    const { mutate: accountVerificationMutate, isSuccess: isAccountVerificationSuccess } = useMutation({
        mutationKey: ['accountVerification'],
        mutationFn: async () => await account.updateVerification(userId, secret)
    })

    useEffect(() => {
        accountVerificationMutate()
    }, [])

    const { data: loggedInData, isSuccess: isLoggedInDataSuccess, isError: isLoggedInDataError, } = useQuery({
        queryKey: ['getLoggedInData'],
        queryFn: async () => await account.get(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryDelay: 2000,
        // enabled: 
    })
    console.log('isLoggedInDataSuccess')
    if (isLoggedInDataSuccess) {
        Cookies.set('userData', JSON.stringify(loggedInData))
        navigate('/')
    }


    return (
        <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#3494E6] to-[#EC6EAD] ' style={{
                clipPath: 'polygon(0 0, 100% 0%, 100% 35%, 0 69%)'
            }}></div>
            <div className="relative z-10 md:container mx-auto w-full md:w-1/2 h-[calc(100vh-65.6px)] flex items-center justify-center px-4 md:px-0">
                <div className="bg-slate-50 border shadow-xl shadow-slate-500 flex flex-col items-center p-5 md:p-10 space-y-4 w-full max-w-md">
                    <h2 className='text-2xl font-bold'>Account Verification in Progress</h2>
                    <p className='text-center'>We're verifying your account. Hang tight—you're moments away from crafting personalized travel experiences with ease!</p>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount