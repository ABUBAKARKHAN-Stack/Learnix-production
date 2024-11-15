import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ApiResponse, ApiError } from '../utils/index.js';

const createUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json(new ApiError(400, 'Username, email and password are required'));
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await userModel.create({
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            isAdmin
        });
        res
            .status(201)
            .json(new ApiResponse(201, user, 'User created successfully'));
    } catch (error) {
        if (error.code === 11000) {
            const errorKey = Object.keys(error.keyValue)[0];
            const errorValue = Object.values(error.keyValue)[0]
            return res
                .status(409)
                .json(new ApiError(409, `User with "${errorKey}: ${errorValue}" already exists`));
        }
        res
            .status(500)
            .json(new ApiError(500, 'Internal server error'));
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json(new ApiError(400, 'Username and password are required'));
    }

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res
                .status(401)
                .json(new ApiError(401, 'Invalid username or password'));
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
            return res
                .status(401)
                .json(new ApiError(401, 'Invalid username or password'));
        }

        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET,
            { expiresIn: '15d' }
        )
        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: false,
                path: '/',
                maxAge: 15 * 24 * 60 * 60 * 1000
            })
            .json(new ApiResponse(200, user, 'Login successful'));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, 'Internal server error'));
    }
}

const logout = async (req, res) => {
    return res
        .status(200)
        .clearCookie('token')
        .json(new ApiResponse(200, null, 'Logout successful'));
}

export { createUser, loginUser, logout };