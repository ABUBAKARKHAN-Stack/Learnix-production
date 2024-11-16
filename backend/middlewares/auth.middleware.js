import jwt from "jsonwebtoken"
import {  ApiError } from '../utils/index.js'


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json(new ApiError(401, "Unauthorized"));
        }
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken

        return next()
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, error, "Something went wrong..."))
    }
}

export default authMiddleware