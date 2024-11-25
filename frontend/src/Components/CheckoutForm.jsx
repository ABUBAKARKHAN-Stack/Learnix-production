import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { purchaseCourse, getCourseById } from "../API/mainFetching";
import { showSuccessToast, showErrorToast } from "../utils/ToastNotification";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CheckoutForm = ({ id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await getCourseById(id);
                setCourse(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get CardElement instance
            const cardElement = elements.getElement(CardElement);

            // Validate if the card element is filled
            if (!cardElement || !stripe || !elements) {
                showErrorToast("Card details are required!");
                setLoading(false);
                return;
            }

            // Validate card details using Stripe's validation
            const { error: cardError } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (cardError) {
                showErrorToast(`Card Validation Failed: ${cardError.message}`);
                setLoading(false);
                return;
            }

            // Call backend to create payment intent
            const response = await purchaseCourse(id, course.price);
            const clientSecret = response.data.data?.clientSecret;

            if (!clientSecret) {
                showErrorToast("Failed to retrieve clientSecret");
                throw new Error("Failed to retrieve clientSecret");
            }

            // Confirm the payment with Stripe
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (paymentResult.error) {
                showErrorToast(`Payment Failed: ${paymentResult.error.message}`);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                showSuccessToast("Payment Successful!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2500);
            }
        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.error || err.message || 'An error occurred. Please try again.';
            showErrorToast(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-8 flex flex-col lg:flex-row gap-8">

            {/* Back button */}

            <button
                className="absolute top-10 left-10 text-gray-800 hover:text-gray-950"
                onClick={() => navigate(-1)}
            >
                <FiArrowLeft className="w-7 h-7" />
            </button>

            {/* Left Section: Course Details */}
            {course && (
                <div className="flex-1">
                    <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-64 object-cover rounded-lg shadow-md mb-4 lg:mb-0"
                    />
                    <h3 className="text-2xl font-semibold text-gray-700">{course.name}</h3>
                    <p className="text-gray-600 line-clamp-3 text-sm mt-2 leading-relaxed">
                        {course.description}
                    </p>
                    <p className="text-xl font-bold text-gray-800 mt-4">
                        Total: <span className="text-blue-600">${course.price}</span>
                    </p>
                </div>
            )}

            {/* Right Section: Payment Form */}
            <div className="flex-1 h-full  rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Secure Checkout
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="card-element-container bg-gray-100 p-4 rounded-lg border border-gray-300 focus-within:border-blue-500 shadow-sm">
                        <CardElement className="card-element text-gray-700" />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-500 shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                        {loading ? "Processing..." : `Pay $${course?.price || 0}`}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    <span className="font-medium">100% Secure Payment</span> – Powered by
                    Stripe
                </p>
            </div>
        </div>


    );
};

export default CheckoutForm;
