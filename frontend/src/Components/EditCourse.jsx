import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera, FiEdit2, FiCheck } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, updateCourse } from '../API/mainFetching';
import { showErrorToast, showSuccessToast } from '../utils/ToastNotification';

function EditCourse() {
    const { courseId } = useParams(); // Get the course ID from URL
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(false);


    // Watch the file input field
    const courseThumbnail = watch("courseThumbnail");

    // Update thumbnail preview whenever the file changes
    useEffect(() => {
        if (courseThumbnail && courseThumbnail[0]) {
            const imageURL = URL.createObjectURL(courseThumbnail[0]);
            setThumbnailPreview(imageURL);
        }
    }, [courseThumbnail]);

    // Fetch course details when component loads
    useEffect(() => {
        const loadCourseDetails = async () => {
            try {
                setLoading(true);
                const res = await getCourseById(courseId); // Fetch course details
                console.log(res.data.data);
                const data = res.data.data;
                setValue("name", data.name);
                setValue("description", data.description);
                setValue("price", data.price);
                setThumbnailPreview(data.image);
                
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCourseDetails();
    }, [courseId, setValue]);

    const onSubmit = async (formData) => {
        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("description", formData.description);
        dataToSend.append("price", formData.price);

        if (formData.courseThumbnail && formData.courseThumbnail[0]) {
            dataToSend.append("courseThumbnail", formData.courseThumbnail[0]);
        }

        try {
            setLoading(true);
            const res = await updateCourse(courseId, dataToSend);
            console.log(res.data);
            showSuccessToast(res.data.message);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Error updating course:", error);
            const errorMessage = error.response.data.message || error.message || 'An error occurred. Please try again.';
            showErrorToast(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-[#F3EBE5]">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-[700px]">
                {/* Header */}
                <div className="bg-gray-900 text-white px-6 py-4 rounded-t-lg">
                    <h2 className="text-xl font-bold text-center">Edit Course</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Course Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium text-gray-800 flex items-center gap-2">
                            <FiEdit2 className="text-lg text-gray-700" /> Course Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", { required: "Course name is required" })}
                            placeholder="Enter the course name"
                            className="mt-2 border px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Course Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-medium text-gray-800 flex items-center gap-2">
                            <FiEdit2 className="text-lg text-gray-700" /> Course Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            {...register("description", { required: "Course description is required" })}
                            placeholder="Enter a detailed description"
                            className="mt-2 border px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Course Price */}
                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-medium text-gray-800 flex items-center gap-2">
                            <FiEdit2 className="text-lg text-gray-700" /> Course Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            {...register("price", { required: "Course price is required" })}
                            placeholder="Enter the price in USD"
                            className="mt-2 border px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Course Thumbnail */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="courseThumbnail" className="font-medium text-gray-800 flex items-center gap-2">
                            <FiCamera className="text-lg text-gray-700" /> Course Thumbnail
                        </label>
                        <input
                            id="courseThumbnail"
                            type="file"
                            accept="image/*"
                            {...register("courseThumbnail")}
                            className="hidden"
                        />
                        <label
                            htmlFor="courseThumbnail"
                            className="mt-2 w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg overflow-hidden cursor-pointer hover:border-gray-600"
                        >
                            {thumbnailPreview ? (
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <FiCamera className="text-4xl text-gray-400" />
                            )}
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full border-2 border-black bg-gray-950 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-gray-950 transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <FiCheck className="text-lg" />
                        {loading ? "Updating..." : "Update Course"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCourse;
