import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiCamera, FiCheck } from "react-icons/fi";
import { createCourse } from "../API/mainFetching";
import { showErrorToast, showSuccessToast } from "../utils/ToastNotification";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  // Watch the file input field
  const courseThumbnail = watch("courseThumbnail");

  // Update thumbnail preview whenever the file changes
  useEffect(() => {
    if (courseThumbnail && courseThumbnail[0]) {
      const imageURL = URL.createObjectURL(courseThumbnail[0]);
      setThumbnailPreview(imageURL);
    }
  }, [courseThumbnail]);

  const onSubmit = async (data) => {
    // Create FormData object
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("courseThumbnail", data.courseThumbnail[0]);

    try {
      setLoading(true);
      // Call createCourse API
      const res = await createCourse(formData);
      showSuccessToast(res.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
      setValue("name", "");
      setValue("description", "");
      setValue("price", "");
      setValue("courseThumbnail", null);
      setThumbnailPreview(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-[700px]">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-center">Create New Course</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Course Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-medium text-gray-800 flex items-center gap-2"
            >
               Course Name
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
            <label
              htmlFor="description"
              className="font-medium text-gray-800 flex items-center gap-2"
            >
            Course Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description", {
                required: "Course description is required",
              })}
              placeholder="Enter a detailed description"
              className="mt-2 border px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-700 focus:outline-none"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Course Price */}
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="font-medium text-gray-800 flex items-center gap-2"
            >
              Course Price
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
            <label
              htmlFor="courseThumbnail"
              className="font-medium text-gray-800 flex items-center gap-2"
            >
              <FiCamera className="text-2xl text-gray-700 mb-0.5" /> Course Thumbnail
            </label>
            <input
              id="courseThumbnail"
              type="file"
              accept="image/*"
              {...register("courseThumbnail", {
                required: "Course thumbnail is required",
              })}
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
            {errors.courseThumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseThumbnail.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full border-2 border-black bg-gray-950 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-gray-950 transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FiCheck className="text-lg" />
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
