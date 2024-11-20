import { toast, Slide } from 'react-toastify';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

// Reusable function for success notification
export const showSuccessToast = (message) => {
  toast.success(message, {
    theme: "light",
    style: {
      backgroundColor: "#D4EDDA",
      color: "#155724",
      border: "1px solid #C3E6CB",
      borderRadius: "8px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    icon: <FaCheckCircle size={20} />,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    className: 'sm:text-xs text-[11px] font-poppins font-bold',
  });
};

// Reusable function for error notification
export const showErrorToast = (message) => {
  toast.error(message, {
    theme: "light",
    style: {
      backgroundColor: "#F8D7DA",
      color: "#721C24",
      border: "1px solid #F5C6CB",
      borderRadius: "8px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    icon: <FaTimes size={20} />,
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    className: 'sm:text-xs text-[11px] font-poppins font-bold',
  });
};

// Reusable function for information notification
export const showInfoToast = (message) => {
  toast.info(message, {
    theme: "light",
    style: {
      backgroundColor: "#D1ECF1",
      color: "#0C5460",
      border: "1px solid #BEE5EB",
      borderRadius: "8px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    icon: <FaCheckCircle size={20} />, // Using the same icon, can be adjusted
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    className: 'sm:text-xs text-[11px] font-poppins font-bold',
  });
};
