import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authenticationRequired = true }) {

    const token = Cookies.get('token')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (!token && authenticationRequired) {

            navigate('/signin')
        } else if (token && !authenticationRequired) {
            navigate('/dashboard') 
        }
        setLoading(false)
    }, [token, authenticationRequired])

    return loading ? "Loading..." : children

}

export default Protected