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
        const response = await cloudinary.uploader.upload(fileLocalPath, {
            resource_type: 'auto',
        })
        console.log(`File uploaded on cloudinary LINK ${response.secure_url} `);
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

export { uploadOnCloudinary , deleteFromCloudinary }