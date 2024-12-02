import express, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/index.js";
import helmet from "helmet";


const app = express();

app.use(cors({
    origin: "https://learnix-production.vercel.app",
    credentials: true,
}));
app.use(cookieParser());
app.use(json({ limit: '16kb' }));
app.use(urlencoded({ extended: true }));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "default-src": ["'self'"],
            "script-src": [
                "'self'",
                "'unsafe-inline'",
                "https://js.stripe.com",
                "https://*.stripe.com",
                "https://*.google.com",
            ],
            "frame-src": ["https://js.stripe.com", "https://*.stripe.com"],
            "connect-src": [
                "'self'",
                "https://api.stripe.com",
                "https://*.stripe.com",
                "https://*.google.com",
            ],
            "style-src": ["'self'", "'unsafe-inline'"],
        },
    })
);

app.use(static_("public"))

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})

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



