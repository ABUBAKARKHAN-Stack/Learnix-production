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

//  API call to get logged in user
const getLoggedInUser = async () => {
    return await api.get('users/me', {
        withCredentials: true
    })
}

// API call to logout the user
const logoutUser = async () => {
    return await api.get('users/logout', {
        withCredentials: true
    })
}

const updateAccountSettings = async (data) => {
    return await api.put('users/update-settings', data, {
        withCredentials: true
    })
}


// API call to get all courses
const getAllCourses = async () => {
    return await api.get('courses', {
        withCredentials: true
    })
}

// API call to get a specific course without lectures
const getCourseById = async (id) => {
    return await api.get(`courses/course-details/${id}`, {
        withCredentials: true
    })
}

const purchaseCourse = async (id) => {
    return await api.post(`courses/purchase/${id}`, {}, {
        withCredentials: true
    })
}

// API call to get purchased courses
const getPurchasedCourses = async () => {
    return await api.get('courses/purchased-courses', {
        withCredentials: true
    })
}

// API call to get a purchase course with lectures
const getPurchaseCourseById = async (id) => {
    return await api.get(`courses/${id}`, {
        withCredentials: true
    })
}

//  API call to get admin courses
const getAdminCourses = async () => {
    return await api.get('courses/admin-courses', {
        withCredentials: true
    })
}


export {
    signUpUser,
    signInUser,
    verifyEmail,
    forgotPasswordLink,
    resetPassword,
    getLoggedInUser,
    logoutUser,
    updateAccountSettings,
    getAllCourses,
    getCourseById,
    getPurchasedCourses,
    getPurchaseCourseById,
    getAdminCourses,
    purchaseCourse
}