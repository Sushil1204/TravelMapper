import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const SuggestionCard = ({ title, suggestions }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='min-w-fit'>
            <div className="flex items-center justify-between cursor-pointer">
                <h2 className="text-xl font-semibold">{title}</h2>
                {isOpen ? <FaChevronUp size={25} onClick={handleToggle} /> : <FaChevronDown size={25} onClick={handleToggle} />}
            </div>
            {isOpen && <div className="p-4 mx-auto my-4 bg-white shadow-lg rounded-lg h-96 overflow-auto custom-scrollbar border-2 border-solid border-black">
                <ul className="list-disc list-inside space-y-2">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="text-black font-semibold">{suggestion}</li>
                    ))}
                </ul>
            </div>}

        </div>
    )
}

export default SuggestionCard