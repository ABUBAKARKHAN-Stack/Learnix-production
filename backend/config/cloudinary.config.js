import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '../utils/index.js'
import fs from 'fs'

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary from memory buffer
const uploadOnCloudinary = async (file) => {
    if (!file) {
        return res.status(400).json(new ApiError(400, 'File is required'));
    }
    try {
        const response = await cloudinary.uploader.upload_stream(
            {
                resource_type: "auto", // This will allow it to upload images, videos, etc.
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    throw error;
                }
                console.log(`File uploaded to Cloudinary: ${result.secure_url}`);
                return result;  // You can return the Cloudinary response here
            }
        );

        // Pipe the file buffer to Cloudinary
        file.stream.pipe(response);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, 'Error uploading to Cloudinary'));
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