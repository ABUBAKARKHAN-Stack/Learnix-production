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

//  API call to send a password reset link to the user
const forgotPasswordLink = async (data) => {
    return await api.post('users/forgot-password', data)
}

// API call to reset the user's password
const resetPassword = async (data, token) => {
    return await api.post(`users/reset-password/${token}`, data)
}

export {
    signUpUser,
    signInUser,
    verifyEmail,
    forgotPasswordLink,
    resetPassword
}