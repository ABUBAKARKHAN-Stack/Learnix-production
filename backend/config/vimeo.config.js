import { Vimeo } from "@vimeo/vimeo";
import fs from "fs";



const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "2692f8a0889b4fd67d31c26176018c5a"
)


const uploadVideoToVimeo = async (videoPath, title, description) => {
    try {
        return new Promise((resolve, reject) => {
            client.upload(
                videoPath,
                {
                    name: title,
                    description: description,
                    privacy: { view: 'unlisted' }, // Set privacy to "unlisted"
                },
                async (uri) => {
                    fs.unlinkSync(videoPath) // Delete the local file
                    try {
                        // Extract video ID from the URI
                        const videoId = uri.split('/videos/')[1];

                        // Make an API call to fetch video metadata
                        const metadata = await new Promise((resolveMetadata, rejectMetadata) => {
                            client.request(
                                {
                                    method: 'GET',
                                    path: `/videos/${videoId}`,
                                },
                                (error, body) => {
                                    if (error) {
                                        console.error('Failed to fetch video metadata:', error);
                                        rejectMetadata(error);
                                    } else {
                                        resolveMetadata(body);
                                    }
                                }
                            );
                        });

                        // Get the embed URL containing the hash
                        const embedUrl = metadata.embed.html.match(/src="([^"]+)"/)[1];
                        console.log('Embed URL:', embedUrl);

                        // Resolve the embed URL
                        resolve(embedUrl);
                    } catch (error) {
                        console.error('Failed to fetch embed URL:', error);
                        reject(error);
                    }
                },
                (bytesUploaded, bytesTotal) => {
                    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                    console.log(`Upload progress: ${percentage}%`);
                },
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.error('An unexpected error occurred:', error.message);
        throw new Error('Failed to upload video to Vimeo.');
    }
};



export default uploadVideoToVimeo