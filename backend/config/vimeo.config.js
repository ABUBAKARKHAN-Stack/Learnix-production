import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";



const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "577f43fff3e9f22aeb2d4db635392978"
)


const uploadVideoToVimeo = async (fileBuffer, title, description) => {
    return new Promise((resolve, reject) => {
        client.upload(
            streamifier.createReadStream(fileBuffer),
            {
                name: title,
                description: description,
                privacy: { view: "unlisted" }, // Set privacy to "unlisted"
            },
            async (uri) => {
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
};

// Function to wait for Vimeo processing
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
        }, 10000); // Check every 10 seconds
    });
};



export default uploadVideoToVimeo