import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4000/"
})


// API call to sign up the user
const signUpUser = async (data) => {
    return await api.post('users/register', data)
}

// API call to sign in the user
const signInUser = async (data) => {
    return await api.post('users/login', data, {
        withCredentials: true
    })
}

// API call to verify the user's email address
const verifyEmail = async (token) => {
    return await api.get(`users/verify-email/${token}`)
}

export {
    signUpUser,
    signInUser,
    verifyEmail
}