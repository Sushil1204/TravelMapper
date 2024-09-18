import React from 'react'

const InputSelect = ({ label, name, options, placeholder }) => {
    return (
        <>
            <label className="block text-sm lg:text-lg  font-medium text-gray-700">
                {label}
            </label>
            <select
                name={name}
                placeholder={placeholder}
                className="mt-1 block w-full h-14 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-sm lg:text-xl text-gray-700 placeholder-gray-400"
            >
                {options.map((option) => (
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
        </>
    )
}

export default InputSelect