import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../API/mainFetching';
import { useNavigate } from 'react-router-dom';
function ResetPassword({ token }) {
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const [passwordReset, setPasswordReset] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submission
    const onSubmit = async (data) => {
        console.log('Form submitted with data:', data);
        // Call the resetPasswordLink API
        try {
            setLoading(true);
            const res = await resetPassword(data, token);
            console.log('API response:', res.data);
            if (res.status === 200) {
                setPasswordReset(res.data.message);
                setTimeout(() => {
                    navigate('/signin')
                }, 1000);
            }


        } catch (error) {
            console.log(error);
            // Handle error
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Reset Password
                </h1>
                <p className="text-sm text-gray-600 text-center">
                    Please enter your new password below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {passwordReset && (
                        <div className="bg-green-100 border text-xs text-center border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{passwordReset}</span>
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your new password"
                            {...register('newPassword', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                            className={`mt-1 block w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400`}
                        />
                        {errors.password && (
                            <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) => value === watch('newPassword') || 'Passwords do not match',
                            })}
                            className={`mt-1 block w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400`}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-2 text-xs text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-white disabled:opacity-50 disabled:cursor-not-allowed bg-black rounded-lg shadow hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                    >
                        {loading ? 'Processing...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export { ResetPassword };
