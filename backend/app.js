import express, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/index.js";
import helmet from "helmet";
import {ApiResponse , ApiError} from "./utils/index.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
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

import { authUrl, oauth2Client } from './middlewares/auth2.0.middleware.js';

app.get("/auth", (req, res) => {
    // Redirect to Google OAuth consent page
    res.redirect(authUrl); // This should take the user to Google's consent screen
});

app.get("/auth/callback", async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    console.log('Redirected to /auth/callback with code:', code);  // Log the code

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        res.json({ message: 'Authentication successful', tokens });
    } catch (error) {
        console.error('Error while exchanging token:', error);
        res.status(500).json({ error: 'Failed to exchange token' });
    }
});





// Video Routes
import videoRoutes from './routes/video.routes.js'

app.use("/videos", videoRoutes)


const PORT = process.env.PORT || 5000;

connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
);



