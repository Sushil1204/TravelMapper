import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { account } from '../utilities/appwriteConfig';

const AccountVerificationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { data } = useQuery({
        queryKey: ['Create Verify'],
        queryFn: () => account.createVerification('http://localhost:5173/account-verification'),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false
    })

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Verify Your Account</h2>
                    <button onClick={onClose}>
                        <IoClose size={20} />
                    </button>
                </div>

                <p className="text-gray-500 mt-2">Please check your email and click on the verification link to activate your account.</p>

                <button
                    onClick={onClose}
                    className="mt-6 w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200">
                    Okay, Got It!
                </button>
            </div>
        </div>
    );
};

export default AccountVerificationModal;
