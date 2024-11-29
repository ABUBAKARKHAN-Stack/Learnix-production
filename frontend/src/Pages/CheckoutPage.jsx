import React from 'react'
import CheckoutForm from '../Components/CheckoutForm'
import { useParams } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutPage() {
    const { courseId } = useParams();
    return (
        <Elements stripe={stripePromise}>
        <div className='h-screen flex justify-center items-center bg-[#F3EBE5] '>
            <CheckoutForm id={courseId} />
        </div>
        </Elements>
    )
}

export default CheckoutPage