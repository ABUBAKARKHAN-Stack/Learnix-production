import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4000/"
})

const signUpUser = async (data) => {
    return await api.post('users/register', data)
}

export { signUpUser }