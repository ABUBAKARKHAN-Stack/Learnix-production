import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addVideo } from "../API/mainFetching";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../utils/ToastNotification";
import { FiArrowLeft } from "react-icons/fi";

const UploadVideoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate()
    const { courseId } = useParams();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("video", data.video[0]);

        try {
            setLoading(true);
            setUploadProgress(0);

            // Pass progress callback
            const res = await addVideo(courseId, formData, (progress) => {
                setUploadProgress(progress);
            });

            console.log(res.data);
            showSuccessToast(res.data.message)
            setTimeout(() => {
                navigate(-1)
            }, 2500);
        } catch (error) {
            console.error("Error uploading video:", error);
            showErrorToast("Error while uploading video")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3EBE5] flex items-center justify-center">
            {/* Back button */}

            <button
                className="absolute top-10 left-10 text-gray-800 hover:text-gray-950"
                onClick={() => navigate(-1)}
            >
                <FiArrowLeft className="w-7 h-7" />
            </button>

            <div className="w-full max-w-[700px] bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-900 text-white px-6 py-4 text-center">
                    <h2 className="text-xl font-bold">Upload Video</h2>
                </div>

                {/* Progress Bar */}
                {loading && (
                    <div className="px-6 py-2">
                        <div className="relative w-full bg-gray-800 text-white rounded-full">
                            {uploadProgress >= 100 ?
                                <p className="animate-pulse text-center block mx-auto  p-2 text-xs">Processing Video Please wait...
                                 This might take couple of mins
                                </p>

                                : (
                                    <div
                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                )
                            }
                        </div>
                        <p className="text-center mt-2">{uploadProgress}% uploaded</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Video Title */}
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                            Video Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                            placeholder="Enter video title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Video Description */}
                    <div>
                        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                            Video Description
                        </label>
                        <textarea
                            id="description"
                            rows="3"
                            {...register("description", { required: "Description is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                            placeholder="Enter video description"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Video File */}
                    <div>
                        <label htmlFor="video" className="block font-medium text-gray-700 mb-1">
                            Video File
                        </label>
                        <input
                            id="video"
                            type="file"
                            accept="video/*"
                            {...register("video", { required: "Video file is required" })}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full border-2 border-black bg-gray-950 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-gray-950 transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Uploading..." : "Upload Video"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadVideoForm;
