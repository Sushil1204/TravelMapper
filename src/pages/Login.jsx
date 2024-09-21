import React, { useState } from 'react'
import { BiShow, BiHide } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form"
import { calculateStrength, getStrengthLevel } from '../utilities/passwordStrength';

const ErrorMessage = ({ message }) => {
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

const Login = () => {
    const [togglePassword, setTogglePassword] = useState(false)
    const [view, setView] = useState('Register')
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm()
    const strength = calculateStrength(watch("password"));
    const strengthLevel = getStrengthLevel(strength);

    const onSubmit = (data) => console.log(data)
    return (
        <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#3494E6] to-[#EC6EAD] ' style={{
                clipPath: 'polygon(0 0, 100% 0%, 100% 35%, 0 69%)'
            }}></div>
            <div className="relative z-10 md:container mx-auto w-full md:w-1/2 h-[calc(100vh-65.6px)] flex items-center justify-center px-4 md:px-0">
                <div className="bg-slate-50 border border-black flex flex-col items-center p-5 md:p-10 space-y-4 w-full max-w-md">
                    <h2 className='text-2xl font-bold'>Sign up to TravelMapper</h2>
                    <p className='text-center'>Join now and start creating personalized travel itineraries with ease</p>
                    {view == 'Register' ? <form className='space-y-4 w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <div className="w-full border border-gray-500 focus-within:border-2 focus-within:border-slate-950 space-y-1 py-2 px-4 transition duration-300">
                                <p>FULL NAME <span className='text-red-500 text-xl'>*</span></p>
                                <Controller
                                    name="full_name"
                                    control={control}
                                    rules={{
                                        required: "First name is required",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Full name should contain only alphabetic characters"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder='Sushil Pundkar'
                                            className='w-full active:outline-none focus:outline-none'
                                        />
                                    )}
                                />
                                {errors.full_name && <ErrorMessage message={errors.full_name.message} />}
                            </div>
                            <div className="w-full border-l border-r border-b border-gray-500 focus-within:border-2 focus-within:border-slate-950 space-y-1 py-2 px-4 transition duration-300">
                                <p>EMAIL ADDRESS <span className='text-red-500 text-xl'>*</span></p>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Please enter a valid email address"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder='sushil@gmail.com'
                                            className='w-full active:outline-none focus:outline-none'
                                        />
                                    )}
                                />
                                {errors.email && <ErrorMessage message={errors.email.message} />}
                            </div>
                            <div className="w-full border-l border-r border-b border-gray-500 focus-within:border-2 focus-within:border-slate-950 transition duration-300 space-y-1 py-2 px-4 flex items-center justify-between">
                                <div>
                                    <p>PASSWORD <span className='text-red-500 text-xl'>*</span></p>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Password must be no more than 20 characters"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <input type={togglePassword ? "text" : "password"} placeholder='****'
                                                className='w-full active:outline-none focus:outline-none' {...field} />
                                        )}
                                    />
                                    {errors.password && <ErrorMessage message={errors.password.message} />}
                                </div>
                                {togglePassword ?
                                    <BiHide size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />
                                    :
                                    <BiShow size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />}
                            </div>
                            {strength > 0 &&
                                <>
                                    <div className="mt-2 w-full h-2 bg-gray-300 rounded-full">
                                        <div className={`h-2 rounded-full ${strengthLevel.color}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
                                    </div>
                                    <p className={`mt-2 text-sm text-${strengthLevel.color}`}>
                                        {strengthLevel.label}
                                    </p>
                                </>
                            }
                        </div>

                        <div className="flex items-center gap-2">
                            <Controller
                                name="term_condition"
                                control={control}
                                rules={{
                                    required: "Please agree to the terms to proceed.",
                                }}
                                render={({ field }) => (
                                    <input type='checkbox'
                                        className='w-8 h-8 active:outline-none focus:outline-none' {...field} />
                                )}
                            />
                            <p className='text-sm font-semibold text-slate-600'>I agree to the Terms of Service and Privacy Policy.</p>
                        </div>
                        {errors.term_condition && <ErrorMessage message={errors.term_condition.message} />}
                        <button type='submit' className='w-full bg-black text-white py-3 md:py-4'>CREATE AN ACCOUNT</button>
                    </form>
                        :
                        <form className='space-y-4 w-full'>
                            <div className="">
                                <div className="w-full border border-gray-500 focus-within:border-black space-y-1 py-2 px-4 transition duration-300">
                                    <p>EMAIL ADDRESS</p>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                message: "Please enter a valid email address"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder='sushil@gmail.com'
                                                className='w-full active:outline-none focus:outline-none'
                                            />
                                        )}
                                    />
                                    {errors.email && <ErrorMessage message={errors.email.message} />}
                                </div>
                                <div className="w-full border-x border-b border-gray-500 focus-within:border-black transition duration-300 space-y-1 py-2 px-4 flex items-center justify-between">
                                    <div>
                                        <p>PASSWORD</p>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Password must be no more than 20 characters"
                                                }
                                            }}
                                            render={({ field }) => (
                                                <input type={togglePassword ? "text" : "password"} placeholder='****'
                                                    className='w-full active:outline-none focus:outline-none' {...field} />
                                            )}
                                        />
                                        {errors.password && <ErrorMessage message={errors.password.message} />}
                                    </div>
                                    {togglePassword ?
                                        <BiHide size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />
                                        :
                                        <BiShow size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" className='w-5 h-5 md:w-8 md:h-8' />
                                <p className='text-sm font-semibold text-slate-600'>I agree to the Terms of Service and Privacy Policy.</p>
                            </div>
                            <button className='w-full bg-black text-white py-3 md:py-4 uppercase'>Log in</button>
                        </form>
                    }
                    <p className='flex ml-auto cursor-pointer' onClick={() => setView(view == 'Register' ? "login" : "Register")}>{view == 'login' ? 'New User? Sign up' : 'Already registered? Sign in'}</p>
                </div>
            </div>
        </div>
    )
}

export default Login
