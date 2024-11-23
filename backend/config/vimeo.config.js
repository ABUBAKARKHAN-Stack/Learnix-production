import { Vimeo } from "@vimeo/vimeo";
import fs from "fs";



const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "577f43fff3e9f22aeb2d4db635392978"
)


// Function to wait until the video has finished processing on Vimeo
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
                            clearInterval(interval);
                            resolve(body); // Resolve with the full metadata
                        } else {
                            console.log("Video still processing...");
                        }
                    }
                );
            } catch (err) {
                clearInterval(interval);
                console.error("Error waiting for processing:", err);
                reject(err);
            }
        }, 2000); // Check every 2 seconds
    });
};

// Function to upload video to Vimeo
const uploadVideoToVimeo = async (videoPath, title, description) => {
    try {
        return new Promise((resolve, reject) => {
            client.upload(
                videoPath,
                {
                    name: title,
                    description: description,
                    privacy: { view: "unlisted" }, // Set privacy to "unlisted"
                },
                async (uri) => {
                    // Delete the local file after successful upload
                    fs.unlinkSync(videoPath);

                    try {
                        // Extract video ID from the URI
                        const videoId = uri.split("/videos/")[1];

                        // Wait for the video to finish processing
                        console.log("Waiting for video processing...");
                        const processedMetadata = await waitForProcessing(videoId);

                        // Extract the embed URL and duration
                        const embedUrl = processedMetadata.embed.html.match(/src="([^"]+)"/)[1];
                        const duration = processedMetadata.duration; // Duration in seconds

                        console.log("Video upload completed!");
                        console.log("Embed URL:", embedUrl);
                        console.log("Video Duration:", duration, "seconds");

                        // Resolve the result
                        resolve({ embedUrl, duration });
                    } catch (error) {
                        console.error("Error fetching metadata after processing:", error);
                        reject(error);
                    }
                },
                (bytesUploaded, bytesTotal) => {
                    // Progress callback
                    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                    console.log(`Upload progress: ${percentage}%`);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.error("Unexpected error during video upload:", error.message);
        throw new Error("Failed to upload video to Vimeo.");
    }
};



export default uploadVideoToVimeo