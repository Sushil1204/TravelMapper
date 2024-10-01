import { useMutation } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import { account } from '../utilities/appwriteConfig';
import { Controller, useForm } from 'react-hook-form';
import AuthLoader from '../assets/AuthLoader.gif';

const ForgetPasswordModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });

    const { mutate: createResetPasswordLink, isPending: isCreateResetPasswordLinkPending, isError, error } = useMutation({
        mutationKey: ['createResetPassword'],
        mutationFn: async ({ email }) => await account.createRecovery(email, 'http://localhost:5173/forget-password'),
    });

    const onCreateResetPasswordLink = (data) => {
        createResetPasswordLink(data);
    };

    const ErrorMessage = ({ message }) => <p className="text-red-500 text-sm mt-1">{message}</p>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] space-y-7">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Enter your email</h2>
                    <button onClick={onClose}>
                        <IoClose size={20} color="black" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onCreateResetPasswordLink)} className="space-y-4">
                    <div
                        className="w-full border border-gray-500 focus-within:border-black
                         space-y-1 py-2 px-4 transition duration-300"
                    >
                        <p className="text-gray-800">EMAIL ADDRESS</p>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Please enter a valid email address',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    placeholder="sushil@gmail.com"
                                    className="w-full active:outline-none focus:outline-none text-gray-800"
                                />
                            )}
                        />
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 md:py-4 uppercase flex items-center justify-center gap-2"
                    >
                        {isCreateResetPasswordLinkPending && <img src={AuthLoader} alt="Loading..." className="w-10" />}
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordModal;
