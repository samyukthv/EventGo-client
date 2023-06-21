import { useEffect, useState } from "react";
import { userApi } from '../../utils/Apis';
import stripe from "../../assets/images/secure-stripe-payment-logo-1.png"
const USER_API = import.meta.env.VITE_USER_API;
import { useSelector } from "react-redux";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const eventData = useSelector((state) => state.booking);

console.log(eventData,3002);

  useEffect(() => {
    userApi.get("/config").then(async (r) => {
      console.log("first");
      console.log(r);
      const { publishableKey } = r.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

//  const bill=eventData.
//  console.log(bill,89);
//  console.log(eventData,89);

  useEffect(() => {
    fetch(`${USER_API}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({amount:eventData.totalBill}),
    }).then(async (result) => {
        console.log("second");
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center ">
    <img className=" w-60 h-24 mb-5" src={stripe} alt="" />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;