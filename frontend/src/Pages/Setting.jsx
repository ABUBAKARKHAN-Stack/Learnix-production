import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit2,
  FiSave,
  FiMail,
  FiCamera,
  FiLogOut,
  FiCheck,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { updateAccountSettings, logoutUser, getLoggedInUser } from "../API/mainFetching";
import { FaUserCircle } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from '../utils/ToastNotification'
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [showProfilePreviewModal, setShowProfilePreviewModal] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await getLoggedInUser();
      const userData = res.data.data;
      setUser(userData);
      setValue("username", userData.username);
      setValue("email", userData.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("update_avatar", profilePicture);

    try {
      setLoading(true);
      const res = await updateAccountSettings(formData);
      console.log(res.data);
      if (res.status === 200) {
        showSuccessToast(res.data.message);
        fetchUserData();
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.error || error.message || 'An error occurred. Please try again.';
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
      setValue("password", "");
      setValue("update_avatar", null);
      setProfilePicture(null);
    }

    setEditableFields({
      username: false,
      email: false,
      password: false,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setShowImagePreviewModal(true); // Show image selection modal
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#F3EBE5] py-10 px-5 flex justify-center items-center">
      {/* Back button */}

      <button
        className="absolute top-4 left-4 text-gray-800 hover:text-gray-950"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft className="w-6 h-6" />
      </button>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-950 text-white px-6 py-4 flex items-center gap-4 flex-wrap">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-white cursor-pointer"
              onClick={() => setShowProfilePreviewModal(true)} // Show profile preview modal
            />
          ) : (
            <FaUserCircle
              className="w-16 h-16 rounded-full object-cover border-2 border-white cursor-pointer"
              onClick={() => setShowProfilePreviewModal(true)} // Show profile preview modal
            />
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{watch("username")}</h2>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Edit Account Details</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["username", "email", "password", "update_avatar"].map((field, index) => (
              <div
                key={index}
                className="flex flex-col justify-start gap-2 relative w-full"
              >
                <label
                  htmlFor={field}
                  className="w-full font-medium text-black capitalize flex items-center text-center sm:text-left"
                >
                  {field === "username" && <FiEdit2 size={19} className="text-black mr-2" />}
                  {field === "email" && <FiMail size={19} className="text-black mr-2" />}
                  {field === "password" && <IoKeyOutline size={22} className="text-black mr-2" />}
                  {field === "update_avatar" && <FiCamera size={19} className="text-black mr-2" />}
                  {field}
                </label>
                <div className="flex flex-1 items-center relative w-full">
                  <input
                    name={field}
                    id={field}
                    placeholder={
                      field === "password"
                        ? "••••••••"
                        : field === "email"
                          ? "example@mail.com"
                          : "Enter your username"
                    }
                    type={
                      field === "password"
                        ? "password"
                        : field === "update_avatar"
                          ? "file"
                          : "text"
                    }
                    {...register(field)}
                    readOnly={!editableFields[field]}
                    onChange={field === "update_avatar" ? handleProfilePictureChange : undefined}
                    className={`w-full border-2 px-3 py-2 rounded-lg focus:outline-none focus:border-black transition-all ${editableFields[field] ? "border-black" : "border-gray-300 bg-gray-100"
                      }`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700"
                    onClick={() => toggleEdit(field)}
                  >
                    {editableFields[field] ? <FiSave /> : <FiEdit2 />}
                  </button>
                </div>
              </div>
            ))}

            {/* Save and Logout Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button
                disabled={loading}
                type="submit"
                className={`bg-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors duration-300 ease-linear border-4 flex justify-center items-center h-14 gap-x-4 cursor-pointer border-black text-white hover:border-gray-300 hover:text-black p-4 rounded-3xl w-full sm:w-1/2`}
              >
                <p className="text-sm sm:text-lg font-semibold">{loading ? "Saving..." : "Save Changes"}</p>
                <FiCheck className="text-black text-xl sm:text-2xl" />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-black hover:bg-white transition-colors duration-300 ease-linear border-4 flex justify-center items-center h-14 gap-x-4 cursor-pointer border-black text-white hover:border-gray-300 hover:text-black p-4 rounded-3xl w-full sm:w-1/2"
              >
                <p className="text-sm sm:text-lg font-semibold">Logout</p>
                <FiLogOut className="text-black text-xl sm:text-2xl" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Profile Preview Modal */}
      {showProfilePreviewModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setShowProfilePreviewModal(false)}
        >
          <div
            className="bg-white p-8 sm:p-10 rounded-lg relative max-w-md w-full shadow-lg transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile Preview"
                className="w-52 h-52 mx-auto object-cover rounded-lg"
              />
            ) : (
              <FaUserCircle className="w-40 h-40 mx-auto rounded-full object-cover bg-gray-100 text-gray-950" />
            )}
            <h1 className="text-2xl font-semibold text-gray-950 text-center mt-4">
              Profile Preview
            </h1>
            <button
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-red-100"
              onClick={() => setShowProfilePreviewModal(false)}
              title="Close"
            >
              <FiX className="text-gray-600 hover:text-red-500 text-xl" />
            </button>
          </div>
        </div>
      )}

      {/* Image Selection Modal */}
      {showImagePreviewModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setShowImagePreviewModal(false)}
        >
          <div
            className="bg-white p-8 sm:p-10 rounded-lg relative max-w-md w-full shadow-lg transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {profilePicture ? (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Image Preview"
                className="w-52 h-52 mx-auto object-cover rounded-lg"
              />
            ) : (
              <FaUserCircle className="w-40 h-40 mx-auto rounded-full object-cover bg-gray-100 text-gray-950" />
            )}
            <h1 className="text-2xl font-semibold text-gray-950 text-center mt-4">
              Selected Image Preview
            </h1>
            <button
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-red-100"
              onClick={() => setShowImagePreviewModal(false)}
              title="Close"
            >
              <FiX className="text-gray-600 hover:text-red-500 text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
