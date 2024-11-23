import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '../utils/index.js'
import fs from 'fs'

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileLocalPath) => {
    if (!fileLocalPath) {
        return res
            .status(400)
            .json(new ApiError(400, 'File is required'));
    }
    try {
        const response = await cloudinary.uploader.upload(fileLocalPath)
        console.log(`File uploaded on cloudinary LINK ${response.secure_url} `);
        fs.unlinkSync(fileLocalPath)
        return response

    } catch (error) {
        fs.unlinkSync(fileLocalPath)
        console.log(error)
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
        console.log(`File deleted from cloudinary`);
    } catch (error) {
        console.log(error)
    }
}

const thumbnailImageForCourse = (publicId) => {
    try {
        const options = {
            width: 400, 
            height: 200, 
            crop: "fill",
            gravity: "auto", 
            responsive: true, // Enable responsive images
            dpr: "auto", // Automatically adjust for the device's pixel density   
        };
        const response = cloudinary.url(publicId, options);
        return response;
    } catch (error) {
        return error;
    }
};



export { uploadOnCloudinary, deleteFromCloudinary, thumbnailImageForCourse } 