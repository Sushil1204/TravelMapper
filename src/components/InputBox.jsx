import React from 'react'

const InputBox = ({ label, name, placeholder, value, handleChange }) => {
    return (
        <>
            <label htmlFor="destination" className="block text-sm lg:text-lg font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id="destination"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full h-14 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ease-in-out sm:text-sm lg:text-xl text-gray-700 placeholder-gray-700 placeholder:text-lg"
            />
        </>
    )
}

export default InputBox