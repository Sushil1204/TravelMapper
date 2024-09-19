import React, { useState } from 'react'
const SuggestionCard = ({ title, suggestions }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='min-w-fit'>
            {isOpen && <div className="p-4 mx-auto space-y-2 bg-white shadow-lg rounded-lg h-96 overflow-auto custom-scrollbar border-2 border-solid border-black">
                <h2 className="text-xl font-semibold">{title}</h2>
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