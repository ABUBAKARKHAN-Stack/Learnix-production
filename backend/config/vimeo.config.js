import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";

// Vimeo API credentials
const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259", // Your client ID
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k", // Your client secret
    "577f43fff3e9f22aeb2d4db635392978" // Your access token
);

// Function to upload video to Vimeo
const uploadVideoToVimeo = async (videoBuffer, title, description) => {
    return new Promise((resolve, reject) => {
        // Convert video buffer to stream
        const videoStream = streamifier.createReadStream(videoBuffer);

        // Make a request to Vimeo to upload the video
        client.upload(
            videoStream,
            {
                name: title,
                description: description,
            },
            (uri) => {
                // The URI returned is the ID of the video uploaded
                console.log(`Video successfully uploaded with URI: ${uri}`);
                resolve(uri);
            },
            (error) => {
                console.error("Error uploading video: ", error);
                reject(error);
            }
        );
    });
};

// Function to check the video processing status
const waitForProcessing = async (videoUri) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                // Make a request to Vimeo to check the video status
                client.request(
                    {
                        method: "GET",
                        path: `/videos/${videoUri}`,
                    },
                    (error, body) => {
                        if (error) {
                            clearInterval(interval);
                            reject("Error checking video processing status: ", error);
                        } else if (body.status === "available") {
                            clearInterval(interval);
                            resolve(body); // Video is processed and available
                        } else {
                            console.log("Video still processing...");
                        }
                    }
                );
            } catch (error) {
                clearInterval(interval);
                reject(error);
            }
        }, 5000); // Check every 5 seconds
    });
};

export { uploadVideoToVimeo, waitForProcessing };
