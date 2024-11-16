import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/index.js";


const app = express();

app.use(cors());
app.use(cookieParser());
app.use(json({limit: '16kb'}));
app.use(urlencoded({ extended: true }));


// User routes
import userRoutes from './routes/user.routes.js';

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
);


