import { Vimeo } from "@vimeo/vimeo";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Vimeo Client Setup (ensure your keys are in place)
const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",  // Your Client ID
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",  // Your Client Secret
    "577f43fff3e9f22aeb2d4db635392978" // Your Access Token
);

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Promisified fs methods
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

// Function to upload video to Vimeo
const uploadVideoToVimeo = async (fileBuffer, fileName, title, description) => {
    try {
        const tempDir = path.join(__dirname, 'uploads');
        const tempFilePath = path.join(tempDir, fileName);

        // Ensure the uploads directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Write the buffer to the temporary file
        await writeFileAsync(tempFilePath, fileBuffer);

        return new Promise((resolve, reject) => {
            client.upload(
                tempFilePath,
                {
                    name: title,
                    description: description,
                    privacy: { view: "unlisted" }, // Optional privacy setting
                },
                async (uri) => {
                    try {
                        const videoId = uri.split("/videos/")[1];
                        const processedMetadata = await waitForProcessing(videoId);

                        const embedUrl = processedMetadata.embed.html.match(/src="([^"]+)"/)[1];
                        const duration = processedMetadata.duration;

                        // Delete the temporary file after upload
                        await unlinkAsync(tempFilePath);

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
