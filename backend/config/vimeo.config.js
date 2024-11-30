import { Vimeo } from "@vimeo/vimeo";

// Vimeo Client Setup (ensure your keys are in place)
const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",  // Your Client ID
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",  // Your Client Secret
    "577f43fff3e9f22aeb2d4db635392978" // Your Access Token
);

// Function to upload video to Vimeo
const uploadVideoToVimeo = async (fileBuffer, fileName, title, description) => {
    try {
        // Upload the file using Vimeo's API
        return new Promise((resolve, reject) => {
            client.upload(
                fileBuffer,  // Directly use the file buffer without writing to disk
                {
                    name: title,
                    description: description,
                    privacy: { view: "unlisted" }, // Optional privacy setting
                },
                async (uri) => {
                    try {
                        // Extract video ID from URI
                        const videoId = uri.split("/videos/")[1];

                        // Wait for video processing to complete
                        const processedMetadata = await waitForProcessing(videoId);

                        // Extract the embed URL and duration
                        const embedUrl = processedMetadata.embed.html.match(/src="([^"]+)"/)[1];
                        const duration = processedMetadata.duration;

                        resolve({ embedUrl, duration });
                    } catch (error) {
                        reject(error);
                    }
                },
                (bytesUploaded, bytesTotal) => {
                    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                    console.log(`Upload progress: ${percentage}%`);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    } catch (error) {
        throw new Error("Failed to upload video to Vimeo.");
    }
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
                            reject(error);
                        } else if (body.status === "available") {
                            clearInterval(interval);
                            resolve(body);
                        } else {
                            console.log("Video still processing...");
                        }
                    }
                );
            } catch (err) {
                clearInterval(interval);
                reject(err);
            }
        }, 10000); // Check every 10 seconds
    });
};

export default uploadVideoToVimeo;
 