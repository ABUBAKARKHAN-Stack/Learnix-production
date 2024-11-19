import express, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/index.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(json({ limit: '16kb' }));
app.use(urlencoded({ extended: true }));
app.use(static_("public"))


// User Routes
import userRoutes from './routes/user.routes.js'
app.use("/users", userRoutes)

// Course Routes
import courseRoutes from './routes/course.routes.js'
app.use("/courses", courseRoutes)

// Video Routes
import videoRoutes from './routes/video.routes.js'
app.use("/videos", videoRoutes)


const PORT = process.env.PORT || 5000;

connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
);



