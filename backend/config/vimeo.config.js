import { Vimeo } from "@vimeo/vimeo";
import streamifier from "streamifier";


const client = new Vimeo(
    "5ff63b5c6a81742af5d222712c80f0aa9b749259",
    "BCBbabJKIRnsDBOu2LkyXlIVSH73yWJir6sDBD5oCJZCxikqxNpR1mbzJ4TNJ1SYTxiQfLrde6/+PW0wX2NqntiAf/eAJEplG2BVz6vrBzAkYGehXdOCLvSpPcpGll6k",
    "577f43fff3e9f22aeb2d4db635392978"
)


// Function to upload the video to Vimeo
const uploadVideoToVimeo = async (videoBuffer, title, description) => {
    return new Promise((resolve, reject) => {
      const videoStream = streamifier.createReadStream(videoBuffer); // Convert buffer to stream
  
      const options = {
        name: title,
        description: description,
      };
  
      // Upload the video to Vimeo
      client.request(
        {
          method: 'POST',
          path: '/videos',
          params: options,
          file: videoStream, // Pass the video stream
        },
        (error, body) => {
          if (error) {
            reject(error);
          } else {
            resolve(body); // Body contains video upload details
          }
        }
      );
    });
  };
  
  // Function to wait until the video is processed on Vimeo
  const waitForProcessing = async (videoId) => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          client.request(
            {
              method: 'GET',
              path: `/videos/${videoId}`,
            },
            (error, body) => {
              if (error) {
                clearInterval(interval);
                reject(error);
              } else if (body.status === 'available') {
                clearInterval(interval);
                resolve(body); // Return the processed video details
              }
            }
          );
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 5000); // Check every 5 seconds for processing status
    });
  };


export { uploadVideoToVimeo, waitForProcessing }