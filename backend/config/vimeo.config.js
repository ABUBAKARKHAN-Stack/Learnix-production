import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";

// Vimeo Client Setup
const client = new Vimeo(
  "5ff63b5c6a81742af5d222712c80f0aa9b749259", // Your Client ID
  "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k", // Your Client Secret
  "577f43fff3e9f22aeb2d4db635392978" // Your Access Token
);

// Function to wait for Vimeo processing to complete and return embed URL and duration
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
              const embedUrl = body.embed.html.match(/src="([^"]+)"/)[1];
              const duration = body.duration;
              resolve({ embedUrl, duration });
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

// Upload video to Vimeo from buffer
const uploadVideoToVimeo = async (fileBuffer, title, description) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = client.upload_stream(
        {
          resource_type: 'video',  // Specify that it's a video
          public_id: `video-${Date.now()}`,  // Unique public_id for the video
          name: title,
          description: description,
          privacy: { view: "unlisted" },  // Set the privacy of the video
        },
        async (uri) => {
          try {
            // Extract video ID from URI
            const videoId = uri.split("/videos/")[1];

            // Wait for video processing to complete
            const { embedUrl, duration } = await waitForProcessing(videoId);

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

      // Convert the file buffer to a readable stream and pipe it to Vimeo
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error('Vimeo upload failed', error.message);
    throw new Error('Vimeo upload failed: ' + error.message);
  }
};

export  default uploadVideoToVimeo ;

