import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import cover from "../../assets/images/cover.jpg";
import { useSelector } from "react-redux";
import { confirmBooking } from "../../api/UserApi";

export default function CheckoutForm() {
  const eventDetails = useSelector((state) => state.booking);
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    console.log(response, 90);

    if (
      response.error?.type === "card_error" ||
      response.error?.type === "validation_error"
    ) {
      toast.error(response.error.message);
      setMessage(response.error.message);
    } else if (
      response.paymentIntent &&
      response.paymentIntent.status === "succeeded"
    ) {
 
             
        toast.success("Payment successful");
        setMessage("Payment successful");
        const confirm=()=>{ 
          console.log("inside confirm");
            confirmBooking(eventDetails).then(res=>{
               console.log(res);
            }).catch(err=>{

              console.log("this is the catch");
              console.log(err.message);
            })
        } 
          confirm()


     setTimeout(()=>{
      navigate("/booking-confirmed");
     },2000)
    } else {
      setMessage("An unexpected error occurred.");
    }
    
    setIsProcessing(false);
    
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="relative">
  <img className="w-72" src={cover} alt="Cover" />

  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div className="font-bold text-2xl cursor-pointer flex items-center">
      <span className="text-3xl text-indigo-600 mr-1 pt-2">
        <ion-icon name="finger-print-outline"></ion-icon>
      </span>
      EventGo
    </div>
    <h2 className="text-white font-serif px-3">
     Total Bill: &#8377;&nbsp;{eventDetails.totalBill}.00
    </h2>
  </div>
</div>


      <PaymentElement id="payment-element" className="mt-3" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? (
            <button className="mt-3 px-4 py-2 rounded-lg  bg-blue-500 text-white font-semibold mr-2">
              Processing...
            </button>
          ) : (
            <button className="mt-3 px-4 py-2 rounded-lg  bg-blue-500 text-white font-semibold mr-2">
              Pay Now
            </button>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          style={{ color: message.includes("successful") ? "green" : "red" }}
        >
          {message}
        </div>
      )}
      <Toaster />
    </form>
  );
}
