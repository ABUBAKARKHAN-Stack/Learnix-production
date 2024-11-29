import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '../utils/index.js'
import streamifier from 'streamifier';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary from memory buffer
const uploadOnCloudinary = async (fileBuffer) => {
    try {
        const response = await cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',  // Automatically detect the file type
                public_id: `avatars/${Date.now()}`,  // Unique public_id
            },
            (error, result) => {
                if (error) {
                    throw new Error('Error uploading to Cloudinary: ' + error);
                }
                return result;
            }
        );


        streamifier.createReadStream(fileBuffer).pipe(response);

        return result;
    } catch (error) {
        console.log('Cloudinary upload failed', error.message);
        throw new ApiError(500, error.message);
    }
};


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