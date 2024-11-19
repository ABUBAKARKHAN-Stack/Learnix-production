import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../API/mainFetching'
import { TokenExpired as TokenExpiredComponent } from '../Components/TokenExpired';
import { EmailVerification as EmailVerificationComponent } from '../Components/EmailVerification';
import { GiPartyPopper } from 'react-icons/gi';

function EmailVerificationPage() {

    const { token } = useParams()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        ; (
            async () => {
                try {
                    await verifyEmail(token)
                } catch (error) {
                    setError(error.response.data.error)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [token]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white px-4">
                <div className="text-gray-700 text-7xl mb-4">
                    <GiPartyPopper />
                </div>
                <h1 className="text-2xl font-semibold text-black mb-2 text-center">
                    Please Wait...
                </h1>
                <p className="text-gray-700 text-center mb-6">
                    Verifying your email...
                </p>
            </div>
        )
    }

    if (error) {
        return <TokenExpiredComponent error={error} />
    } else {
        return <EmailVerificationComponent />
    }

}

export default EmailVerificationPage;
