import React from 'react'
import { ResetPassword as ResetPasswordComponent } from '../Components/ResetPassword'
import { useParams } from 'react-router-dom';

function ResetPasswordPage() {
    const {token} = useParams();
    return (
        <ResetPasswordComponent token={token} />
    )
}

export default ResetPasswordPage