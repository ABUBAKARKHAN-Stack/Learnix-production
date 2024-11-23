import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit2,
  FiSave,
  FiUser,
  FiMail,
  FiKey,
  FiCamera,
  FiLogOut,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { getLoggedInUser } from '../API/mainFetching'
import { FaUserCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const SettingsPage = () => {
  const [editableFields, setEditableFields] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getLoggedInUser();
        const userData = res.data.data;
        setUser(userData);
        setValue("name", userData.username);
        setValue("username", userData.username);
        setValue("email", userData.email);
        setValue("password", userData.password);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePicture(imageURL);
    }
  };

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    setEditableFields({
      name: false,
      username: false,
      email: false,
      password: false,
    });
    setSuccessMessage("Changes saved successfully!");
    setTimeout(() => setSuccessMessage(""), 1000);
  };

  const handleLogout = () => {
    console.log("Logged out");
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-[#F3EBE5] py-10 px-5 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center gap-4 flex-wrap">
          {
            user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-white cursor-pointer"
                onClick={() => setShowModal(true)}
              />
            ) : <FaUserCircle className="w-16 h-16 rounded-full object-cover border-2 border-white cursor-pointer" onClick={() => setShowModal(true)} />
          }
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{watch("name")}</h2>
            <p className="text-sm">@{watch("username")}</p>
          </div>
          <label
            htmlFor="profilePictureInput"
            className="ml-auto cursor-pointer">
            <FiCamera className="text-xl sm:text-2xl text-black hover:text-gray-300" />
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md transition-opacity duration-300 text-sm sm:text-base">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Edit Account Details
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {["name", "username", "email", "password"].map((field, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 relative w-full">
                <label
                  htmlFor={field}
                  className="w-full sm:w-1/4 font-medium text-gray-700 capitalize flex items-center gap-2 sm:justify-end sm:pr-4">
                  {field === "name" && <FiUser className="text-black" />}
                  {field === "username" && <FiEdit2 className="text-black" />}
                  {field === "email" && <FiMail className="text-black" />}
                  {field === "password" && <FiKey className="text-black" />}
                  {field}
                </label>
                <div className="flex flex-1 items-center relative w-full">
                  <input
                    id={field}
                    type={field === "password" ? "password" : "text"}
                    {...register(field, {
                      required: `${field} is required`,
                    })}
                    readOnly={!editableFields[field]}
                    onChange={(e) => setValue(field, e.target.value)}
                    className={`w-full border-2 px-3 py-2 rounded-lg focus:outline-none  focus:border-black transition-all ${editableFields[field]
                      ? "border-black"
                      : "border-gray-300 bg-gray-100"
                      }`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700"
                    onClick={() => toggleEdit(field)}>
                    {editableFields[field] ? <FiSave /> : <FiEdit2 />}
                  </button>
                </div>
              </div>
            ))}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm mt-2">
                {Object.values(errors)
                  .map((error) => error.message)
                  .join(", ")}
              </p>
            )}

            {/* Save and Logout Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <div
                onClick={handleSubmit(onSubmit)}
                className="bg-black hover:bg-white transition-colors duration-300 ease-linear border-4 flex justify-center items-center h-14 gap-x-4 cursor-pointer border-black text-white hover:border-gray-300 hover:text-black p-4 rounded-3xl w-full sm:w-1/2">
                <p className="text-sm sm:text-lg font-semibold">Save Changes</p>
                <FiCheck className="text-black text-xl sm:text-2xl" />
              </div>
              <div
                onClick={handleLogout}
                className="bg-black hover:bg-white transition-colors duration-300 ease-linear border-4 flex justify-center items-center h-14 gap-x-4 cursor-pointer border-black text-white hover:border-gray-300 hover:text-black p-4 rounded-3xl w-full sm:w-1/2">
                <p className="text-sm sm:text-lg font-semibold">Logout</p>
                <FiLogOut className="text-black text-xl sm:text-2xl" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}>
          <div
            className="bg-white p-10 rounded-lg relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={user?.avatar}
              alt="Profile Preview"
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              className="absolute top-2 right-2 "
              onClick={() => setShowModal(false)}>
              <FiX className="text-black text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
