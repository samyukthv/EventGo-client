import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import img from '../../../../server/public/image/image-1686221038908.jpg'
import { useParams } from "react-router-dom";
import { eventDetails } from "../../api/UserApi";
import stripe from "../../../src/assets/images/291-2918799_stripe-payment-icon-png-transparent-png.png"
const VITE_COVER_IMAGE_URL = import.meta.env.VITE_COVER_IMAGE_URL;

function Booking() {
  const params = useParams();
  const eventId = params.id;
  console.log(eventId);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    console.log("qwwqw");
    const response = eventDetails(eventId).then((res) => {
      console.log("eheh");
      console.log(res.data.eventDetails);
      setEvent(res.data.eventDetails);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative isolate overflow-hidden py-24 sm:py-32 ">
    
  <div className="mx-auto max-w-7xl px-6 lg:px-8 flex">
    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none w-1/2">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Booking  Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
             please fill these informations for booking your tickets
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

               
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

           
             
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center  justify-end gap-x-6">

       <img className=" w-44" src={stripe} alt="" />

          <button
            type="button"
            className="text-sm mt-1 font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md mt-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confim Booking
          </button>
        </div>
      </form>
    </div>
    <div className=" h-96 mt-20 w-auto rounded-md bg-black lg:ml-60">
    <img className="h-96" src={img} alt="" />
    </div>
  </div>
</div>

    </div>
  );
}

export default Booking;
