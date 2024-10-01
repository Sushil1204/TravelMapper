import React, { useEffect, useState } from 'react'
import { BiShow, BiHide } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form"
import { calculateStrength, getStrengthLevel } from '../utilities/passwordStrength';
import { account, ID } from '../utilities/appwriteConfig';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdError } from "react-icons/md";
import AuthErrors from '../components/AuthErrors';
import AuthLoader from '../assets/AuthLoader.gif'
import TripDetailsUpdateModal from '../components/tripDetailsUpdateModal';
import ForgetPasswordModal from '../components/ForgetPasswordModal';
const ErrorMessage = ({ message }) => {
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const [modalData, setModalData] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false)
    const [view, setView] = useState('Register')
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                full_name: "",
                email: "",
                password: "",
                term_condition: false
            }
        }
    )
    const strength = calculateStrength(watch("password"));
    const strengthLevel = getStrengthLevel(strength);

    const { mutate: signUpMutate, isSuccess: isSignupSuccess, isError: isSignupError, error: signupError, reset: signupReset, isPending: signupPending } = useMutation({
        mutationKey: 'Signup',
        mutationFn: async (data) => (await account.create(
            ID.unique(),
            data?.email,
            data?.password,
            data?.full_name,
            data?.term_condition
        )),
        onSuccess: (variables) => {
            loginMutate(variables)
        }

    })

    const { mutate: loginMutate, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError, reset: loginReset, isPending: loginPending } = useMutation({
        mutationFn: async (loginCred) => {
            return await account.createEmailPasswordSession(loginCred?.email, loginCred?.password);
        },
        retryDelay: 2000
    });
    const onSignUp = (data) => (
        signUpMutate(data)
    )

    const onLogin = (data) => {
        loginMutate(data)
    }
    const { data: loggedInData, isSuccess: isLoggedInDataSuccess, isError: isLoggedInDataError, } = useQuery({
        queryKey: ['getLoggedInData', loginMutate],
        queryFn: async () => await account.get(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryDelay: 2000,
        enabled: isLoginSuccess
    })
    const tripData = state?.tripDetails

    if (isLoggedInDataSuccess) {
        Cookies.set('userData', JSON.stringify(loggedInData))
        state?.tripDetailsAvailable ? navigate('/trip-details', { state: { tripDetails: tripData } }) : navigate('/')
    }


    useEffect(() => {
        let timer;

        if (isLoginError) {
            timer = setTimeout(() => {
                loginReset();  // Clear login error
            }, 5000);  // 5 seconds delay
        } else if (isSignupError) {
            timer = setTimeout(() => {
                signupReset();  // Clear signup error
            }, 5000);  // 5 seconds delay
        }

        return () => clearTimeout(timer);  // Cleanup the timer if errors change or component unmounts
    }, [isLoginError, isSignupError, loginReset, signupReset]);
    return (
        <>
            <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#3494E6] to-[#EC6EAD] ' style={{
                    clipPath: 'polygon(0 0, 100% 0%, 100% 35%, 0 69%)'
                }}></div>
                <div className="relative z-10 md:container mx-auto w-full md:w-1/2 h-[calc(100vh-65.6px)] flex flex-col items-center justify-center px-4 md:px-0 space-y-2">
                    {isLoginError && <AuthErrors error={loginError?.message} />}
                    {isSignupError && <AuthErrors error={signupError?.message} />}
                    <div className="bg-slate-50 border shadow-xl shadow-slate-500 flex flex-col items-center p-5 md:p-10 space-y-4 w-full max-w-md">
                        <h2 className='text-2xl font-bold dark:text-gray-800'>{view == 'Register' ? 'Sign up to TravelMapper' : 'Login to TravelMapper'}</h2>
                        <p className='text-center dark:text-gray-800'>Join now and start creating personalized travel itineraries with ease</p>
                        {view == 'Register' ? <form className='space-y-4 w-full' onSubmit={handleSubmit(onSignUp)}>
                            <div className="">
                                <div className="w-full border border-gray-500 focus-within:border-2 focus-within:border-slate-950 space-y-1 py-2 px-4 transition duration-300">
                                    <p className='text-gray-800'>FULL NAME <span className='text-red-500 text-xl'>*</span></p>
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
                                                className='w-full active:outline-none focus:outline-none text-gray-800'
                                            />
                                        )}
                                    />
                                    {errors.full_name && <ErrorMessage message={errors.full_name.message} />}
                                </div>
                                <div className="w-full border-l border-r border-b border-gray-500 focus-within:border-2 focus-within:border-slate-950 space-y-1 py-2 px-4 transition duration-300">
                                    <p className='text-gray-800'>EMAIL ADDRESS <span className='text-red-500 text-xl'>*</span></p>
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
                                                className='w-full active:outline-none focus:outline-none text-gray-800'
                                            />
                                        )}
                                    />
                                    {errors.email && <ErrorMessage message={errors.email.message} />}
                                </div>
                                <div className="w-full border-l border-r border-b border-gray-500 focus-within:border-2 focus-within:border-slate-950 transition duration-300 space-y-1 py-2 px-4 flex items-center justify-between">
                                    <div>
                                        <p className='text-gray-800'>PASSWORD <span className='text-red-500 text-xl'>*</span></p>
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
                                                    className='w-full active:outline-none focus:outline-none text-gray-800' {...field} />
                                            )}
                                        />
                                        {errors.password && <ErrorMessage message={errors.password.message} />}
                                    </div>
                                    {togglePassword ?
                                        <BiHide size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />
                                        :
                                        <BiShow size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />}
                                </div>
                                {strength !== undefined && strength > 0 ?
                                    <>
                                        <div className="mt-2 w-full h-2 bg-gray-300 rounded-full">
                                            <div className={`h-2 rounded-full ${strengthLevel.color}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
                                        </div>
                                        <p className={`mt-2 text-sm text-${strengthLevel.color}`}>
                                            {strengthLevel.label}
                                        </p>
                                    </>
                                    : <></>
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
                            <button type='submit' className='w-full bg-black text-white py-3 md:py-4 uppercase flex items-center justify-center gap-2'>
                                {signupPending && <img src={AuthLoader} alt="" className='w-10' />}
                                CREATE AN ACCOUNT
                            </button>
                        </form>
                            :
                            <>
                                <form className='space-y-4 w-full' onSubmit={handleSubmit(onLogin)}>
                                    <div className="">
                                        <div className="w-full border border-gray-500 focus-within:border-black space-y-1 py-2 px-4 transition duration-300">
                                            <p className='text-gray-800'>EMAIL ADDRESS</p>
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
                                                        className='w-full active:outline-none focus:outline-none text-gray-800'
                                                    />
                                                )}
                                            />
                                            {errors.email && <ErrorMessage message={errors.email.message} />}
                                        </div>
                                        <div className="w-full border-x border-b border-gray-500 focus-within:border-black transition duration-300 space-y-1 py-2 px-4 flex items-center justify-between">
                                            <div>
                                                <p className='text-gray-800'>PASSWORD</p>
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
                                                            className='w-full active:outline-none focus:outline-none text-gray-800' {...field} />
                                                    )}
                                                />
                                                {errors.password && <ErrorMessage message={errors.password.message} />}
                                            </div>
                                            {togglePassword ?
                                                <BiHide size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />
                                                :
                                                <BiShow size={25} onClick={() => setTogglePassword(!togglePassword)} cursor={'pointer'} color='gray' />}
                                        </div>
                                        <p className='text-sm font-semibold mt-1  text-gray-800 cursor-pointer' onClick={() => setModalData(!modalData)}>Forget password</p>
                                    </div>
                                    <button type='submit' className='w-full bg-black text-white py-3 md:py-4 uppercase flex items-center justify-center gap-2'>
                                        {loginPending && <img src={AuthLoader} alt="" className='w-10' />}
                                        Log in

                                    </button>
                                </form>
                            </>
                        }
                        <p className='flex ml-auto cursor-pointer text-gray-800' onClick={() => setView(view == 'Register' ? "login" : "Register")}>{view == 'login' ? 'New User? Sign up' : 'Already registered? Sign in'}</p>
                    </div>
                </div>
            </div>
            <ForgetPasswordModal isOpen={modalData}
                onClose={() => setModalData(false)} />
        </>
    )
}

export default Login
