import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Updated icon for error

function TokenExpired({ error }) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-white px-4">
            {/* Error Icon */}
            <div className="text-red-500 text-7xl mb-4">
                <FaExclamationTriangle />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-semibold text-black mb-2 text-center">
                Session Expired
            </h1>

            <p className="text-gray-700 text-center mb-6">
                Your verification token has expired. Please request a new verification email to continue.
            </p>

            {/* Error Details (Optional for Debugging) */}
            {error?.message && (
                <p className="text-gray-500 text-sm text-center mb-6 italic">
                    Error: {error?.message || 'An unexpected error occurred.'}
                </p>

            )}

            {/* Redirect to Sign In */}
            <Link to="/signin">
                <button className="bg-black hover:bg-black/80 tracking-wider text-white font-medium py-2 px-4 rounded-md shadow-lg">
                    Go to Sign In
                </button>
            </Link>
        </div>
    );
}

export { TokenExpired }
