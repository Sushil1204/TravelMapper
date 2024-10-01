import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { account } from '../utilities/appwriteConfig';
import Cookies from 'js-cookie';
import { BiHide, BiShow } from 'react-icons/bi';
import { Controller, useForm } from 'react-hook-form';
import AuthLoader from '../assets/AuthLoader.gif'

const ForgetPassword = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const [togglePassword, setTogglePassword] = useState(false)
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                newPassword: "",
                cnfPassword: "",
            }
        }
    )

    const searchParams = new URLSearchParams(search);
    const secret = searchParams.get('secret');
    const userId = searchParams.get('userId');


    const { mutate: resetPassword, isPending: isResetPasswordPending } = useMutation({
        mutationKey: ['resetPassword'],
        mutationFn: async ({ newPassword }) => await account.updateRecovery(userId, secret, newPassword),
        onSuccess: () => {
            return navigate('/login')
        }
    })

    const onResetPassword = (data) => {
        resetPassword(data)

    }

    const ErrorMessage = ({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>;



    return (
        <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#3494E6] to-[#EC6EAD] ' style={{
                clipPath: 'polygon(0 0, 100% 0%, 100% 35%, 0 69%)'
            }}></div>
            <div className="relative z-10 md:container mx-auto w-full md:w-1/2 h-[calc(100vh-65.6px)] flex items-center justify-center px-4 md:px-0">
                <div className="bg-slate-50 border shadow-xl shadow-slate-500 flex flex-col items-center p-5 md:p-10 space-y-4 w-full max-w-md">
                    <form className='space-y-4 w-full' onSubmit={handleSubmit(onResetPassword)}>
                        <div className="w-full border border-solid border-gray-500 focus-within:border-2 focus-within:border-slate-950 transition duration-300 space-y-1 py-2 px-4 flex items-center justify-between">
                            <div>
                                <p className='text-gray-800'>NEW PASSWORD <span className='text-red-500 text-xl'>*</span></p>
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    rules={{
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Password must be no more than 20 characters"
                                        },


                                    }}
                                    render={({ field }) => (
                                        <input type={togglePassword ? "text" : "password"} placeholder='****'
                                            className='w-full active:outline-none focus:outline-none text-gray-800' {...field} />
                                    )}
                                />
                                {errors.newPassword && <ErrorMessage message={errors.newPassword.message} />}
                            </div>
                            {togglePassword ?
                                <BiHide size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />
                                :
                                <BiShow size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />}
                        </div>
                        <div className="w-full border border-solid border-gray-500 focus-within:border-2 focus-within:border-slate-950 transition duration-300 space-y-1 py-2 px-4 flex flex-col justify-between">
                            <p className='text-gray-800'> CONFIRM PASSWORD <span className='text-red-500 text-xl'>*</span></p>
                            <Controller
                                name="cnfPassword"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                    validate: (value) => value === watch('newPassword') || 'Passwords do not match',
                                }}
                                render={({ field }) => (
                                    <input type="text" placeholder='****'
                                        className='w-full active:outline-none focus:outline-none text-gray-800' {...field} />
                                )}
                            />
                            {errors.cnfPassword && <ErrorMessage message={errors.cnfPassword.message} />}
                        </div>
                        <button type='submit' className='w-full bg-black text-white py-3 md:py-4 uppercase flex items-center justify-center gap-2'>
                            {isResetPasswordPending && <img src={AuthLoader} alt="" className='w-10' />}
                            Reset Password

                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ForgetPassword