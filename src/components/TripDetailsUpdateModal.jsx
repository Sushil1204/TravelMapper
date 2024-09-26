import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { account } from '../utilities/appwriteConfig';
import CheckIcon from '../assets/CheckIcon.gif'
import { FaCheck } from 'react-icons/fa';

const TripDetailsUpdateModal = ({ modalData, onClose }) => {
    if (!modalData?.isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[300px] text-center flex flex-col items-center justify-center space-y-4">
                <div className="border-4 border-green-600 rounded-full p-3 flex items-center justify-center">
                    <FaCheck color='green' size={50} className='animate-pulse' />
                </div>
                <h2 className="text-xl font-semibold dark:text-white">{modalData?.message} </h2>


            </div>
        </div>
    );
};

export default TripDetailsUpdateModal;
