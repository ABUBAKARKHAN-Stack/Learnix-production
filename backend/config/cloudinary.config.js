import { v2 as cloudinary } from 'cloudinary';
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
        // Return a promise that resolves after the file is uploaded
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',  // Automatically detect the file type (image, video, etc.)
                    public_id: `avatars/${Date.now()}`,  // Unique public_id based on timestamp
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Cloudinary upload failed: ' + error.message));
                    } else {
                        resolve(result);  // Resolve with the Cloudinary upload result
                    }
                }
            );

            // Convert the file buffer to a readable stream and pipe it to Cloudinary
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    } catch (error) {
        console.log('Cloudinary upload failed', error.message);
        throw new Error('Cloudinary upload failed: ' + error.message);
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