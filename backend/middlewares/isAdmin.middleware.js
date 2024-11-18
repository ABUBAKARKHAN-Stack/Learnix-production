import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/index.js'

const isAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res
            .status(401)
            .json(new ApiError(401, "Unauthorized: No token provided"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.isAdmin === true) {
        return next();
    } else {
        return res
            .status(401)
            .json(new ApiError(401, "Unauthorized: User is not an admin"));
    }
}

export default isAdmin