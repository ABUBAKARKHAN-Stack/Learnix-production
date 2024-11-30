import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";



const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "577f43fff3e9f22aeb2d4db635392978"
)


// Function to upload video to Vimeo
const uploadVideoToVimeo = async (videoBuffer, title, description) => {
    return new Promise((resolve, reject) => {
        const videoStream = streamifier.createReadStream(videoBuffer);

        // Vimeo upload options
        const options = {
            name: title,
            description: description,
        };

        // Upload the video to Vimeo
        client.request(
            {
                method: "POST",
                path: "/me/videos",
                params: options,
                file: videoStream, // The video stream
            },
            (error, body) => {
                if (error) {
                    console.error("Error uploading video:", error);
                    reject(error);
                } else {
                    console.log("Video uploaded successfully:", body);
                    resolve(body); // This contains video details including videoId
                }
            }
        );
    });
};

// Function to wait for the video to finish processing
const waitForProcessing = async (videoId) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                client.request(
                    {
                        method: "GET",
                        path: `/videos/${videoId}`,
                    },
                    (error, body) => {
                        if (error) {
                            clearInterval(interval);
                            console.error("Error checking processing status:", error);
                            reject(error);
                        } else if (body.status === "available") {
                            // Video is processed and available
                            console.log("Video processing complete.");
                            clearInterval(interval);
                            resolve(body); // Video details after processing
                        } else {
                            console.log("Video still processing...");
                        }
                    }
                );
            } catch (error) {
                clearInterval(interval);
                console.error("Error during status check:", error);
                reject(error);
            }
        }, 5000); // Check every 5 seconds
    });
};




export default uploadVideoToVimeo