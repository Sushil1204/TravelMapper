import React from 'react'
import { MdError } from 'react-icons/md'

const AuthErrors = ({ error }) => {
    return (
        <div className='w-full max-w-md h-20 bg-red-400 flex items-center justify-between p-4 space-x-4'>
            <MdError size={35} className='flex-shrink-0' color='white' />
            <p className='w-full text-center text-white font-semibold'>{error}</p>
        </div>

    )
}

export default AuthErrors