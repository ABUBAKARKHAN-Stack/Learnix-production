import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";


const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "577f43fff3e9f22aeb2d4db635392978"
)


// Function to upload video to Vimeo
const uploadVideoToVimeo = (videoBuffer, title, description) => {
    return new Promise((resolve, reject) => {
        // Convert the buffer to a readable stream
        const videoStream = streamifier.createReadStream(videoBuffer);

        const options = {
            name: title,
            description: description,
        };

        // Upload video to Vimeo
        client.request(
            {
                method: "POST",
                path: "/videos",
                params: options,
                file: videoStream,  // Stream the file directly to Vimeo
            },
            (error, body) => {
                if (error) {
                    reject(new Error('Error uploading video to Vimeo: ' + error));
                } else {
                    resolve(body);  // Return the response from Vimeo
                }
            }
        );
    });
};
// Function to check video processing status
const waitForProcessing = async (videoId) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            client.request(
                {
                    method: "GET",
                    path: `/videos/${videoId}`,
                },
                (error, body) => {
                    if (error) {
                        clearInterval(interval);
                        reject(new Error("Error checking processing status: " + error));
                    } else if (body.status === "available") {
                        clearInterval(interval);
                        resolve(body);
                    }
                }
            );
        }, 5000); // Check every 5 seconds
    });
};



export { uploadVideoToVimeo, waitForProcessing }