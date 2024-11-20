import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordLink } from '../API/mainFetching';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../utils/ToastNotification';

function ForgotPassword() {
    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField
    } = useForm();

    const [emailSent, setEmailSent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Function to handle form submission
    const onSubmit = async (data) => {
        console.log('Form submitted with data:', data);
        // Call the forgotPasswordLink API
        try {
            setLoading(true);
            const res = await forgotPasswordLink(data);
            console.log('API response:', res.data);
            if (res.status === 202) {
                showSuccessToast(res.data.message);
                setEmailSent(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // Handle error
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
            showErrorToast(errorMessage);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setEmailSent('');
                resetField("email");
            }, 3000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">

                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Forgot Password
                </h1>
                <p className="text-sm text-gray-600 text-center">
                    Enter your email address and we will send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Block notification for persistent feedback */}
                    {emailSent && (
                        <div
                            className="bg-green-100 border text-xs border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md mt-4 text-center"
                            role="alert"
                        >
                            <span className="block sm:inline">{emailSent}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className={`mt-1 block w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400`}
                        />
                        {errors.email && (
                            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-white disabled:opacity-50 disabled:cursor-not-allowed bg-black rounded-lg shadow hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="w-full py-3 mt-4 text-black border border-gray-300 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export { ForgotPassword };
