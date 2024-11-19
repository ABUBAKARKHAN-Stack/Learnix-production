import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'


function EmailVerification() {
    return (
        <div className="h-screen flex flex-col items-center justify-center  px-4">
            {/* Success Icon */}
            <div className="text-green-500 text-7xl mb-4">
                <FaCheckCircle />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-semibold text-black mb-2 text-center">
                Email Verified Successfully!
            </h1>

            <p className="text-gray-700 text-center mb-6">
                Your email address has been successfully verified. You can now log in and access your account.
            </p>

            {/* Redirect to Sign In */}
            <Link to="/signin">
                <button className="bg-black hover:bg-black/80 tracking-wider text-white font-medium py-2 px-4 rounded-md shadow-lg">
                    Go to Sign In
                </button>
            </Link>

        </div>
    )
}

export { EmailVerification }