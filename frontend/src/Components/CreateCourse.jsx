import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiSave, FiCamera, FiCheck } from "react-icons/fi";

const CreateCourse = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: "",
    },
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setThumbnailPreview(imageURL);
      setValue("courseThumbnail", file); // Save the file as the value
    }
  };

  const onSubmit = (data) => {
    console.log("Course Data:", data);
    setSuccessMessage("Course created successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen w-fit mx-auto bg-[#F3EBE5] py-10 px-4 flex justify-center items-center">
      <div className="w-full xl:w-[700px] bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4">
          <h2 className="text-xl font-bold">Create New Course</h2>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md transition-opacity duration-300 text-sm sm:text-base">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/** Reusable Component for Input Fields */}
            {[
              {
                label: "Course Name",
                id: "courseName",
                type: "text",
                icon: <FiEdit2 />,
                placeholder: "Enter the course name",
                registerProps: {
                  ...register("courseName", { required: "Course name is required" }),
                },
              },
              {
                label: "Course Description",
                id: "courseDescription",
                isTextArea: true,
                icon: <FiEdit2 />,
                placeholder: "Enter a detailed description of the course",
                registerProps: {
                  ...register("courseDescription", {
                    required: "Course description is required",
                  }),
                },
              },
              {
                label: "Course Price",
                id: "coursePrice",
                type: "text",
                icon: <FiEdit2 />,
                placeholder: "Enter the price in USD $",
                registerProps: {
                  ...register("coursePrice", { required: "Course price is required" }),
                },
              },
            ].map((field, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-4">
                <label
                  htmlFor={field.id}
                  className="w-full sm:w-1/3 font-medium text-gray-700 capitalize flex items-center gap-2">
                  {field.icon}
                  {field.label}
                </label>
                <div className="flex-1 w-full">
                  {field.isTextArea ? (
                    <textarea
                      id={field.id}
                      rows={4}
                      {...field.registerProps}
                      placeholder={field.placeholder}
                      className="w-full border-2 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    ></textarea>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      {...field.registerProps}
                      placeholder={field.placeholder}
                      className="w-full border-2 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Course Thumbnail */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label
                htmlFor="courseThumbnail"
                className="w-full sm:w-1/3 font-medium text-gray-700 capitalize flex items-center gap-2">
                <FiCamera className="text-black" />
                Course Thumbnail
              </label>
              <div className="flex-1">
                <input
                  id="courseThumbnail"
                  type="file"
                  accept="image/*"
                  {...register("courseThumbnail", {
                    required: "Course thumbnail is required",
                  })}
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                <label
                  htmlFor="courseThumbnail"
                  className="cursor-pointer flex items-center justify-center w-20 h-20 border-2 border-gray-300 rounded-lg overflow-hidden">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCamera className="text-xl text-gray-500" />
                  )}
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-black hover:bg-white text-white hover:text-black border-4 border-black hover:border-gray-300 px-6 py-2 rounded-lg transition-colors duration-300 ease-linear flex items-center gap-2">
                <FiCheck className="text-xl" />
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
