import React from 'react'
import CheckoutForm from '../Components/CheckoutForm'
import { useParams } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QP4Nz2MzALTpk3GrHftNIDFlOXLUtqDSuFZEWmCqxH6ptYcxJUJiH2ERX93rTXliLL8LMoGM8RgiRuRjjkDcuo000tU6gXO8H")

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