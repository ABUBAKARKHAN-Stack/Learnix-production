import jwt from "jsonwebtoken";
import { ApiError } from '../utils/index.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "") || localStorage.getItem("authToken");
        console.log(token);

        if (!token) {
            return res
                .status(401)
                .json(new ApiError(401, "Unauthorized: No token provided"));
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;

        // Proceed to the next middleware or route handler
        return next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json(new ApiError(401, "Unauthorized: Token has expired"));
        }
        if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json(new ApiError(401, "Unauthorized: Invalid token"));
        }

        // For any other errors
        return res
            .status(500)
            .json(new ApiError(500, error.message || "Something went wrong..."));
    }
};

export default authMiddleware;
