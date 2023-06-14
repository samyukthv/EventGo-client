import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import img from "../../../../server/public/image/image-1686221038908.jpg";
import { useParams } from "react-router-dom";
import { eventDetails } from "../../api/UserApi";
import stripe from "../../../src/assets/images/291-2918799_stripe-payment-icon-png-transparent-png.png";
import { useFormik } from "formik";
import { booking } from "../../yup/index";
import { toast, Toaster } from "react-hot-toast";

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  ticketQuantity: 1,
};

function Booking() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const response = eventDetails(eventId).then((res) => {
      setEvent(res.data.eventDetails);
    });
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: booking,

    onSubmit: async (values) => {
      // Access the quantity value from formik values
      const { ticketQuantity, ...otherValues } = values;
      // Perform your submission logic
    },
  });

  const increaseQuantity = () => {
    if (event.ticketQuantity <= values.ticketQuantity) {
      toast.error("tickets out of stock");
    } else {
      setFieldValue("ticketQuantity", values.ticketQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (values.ticketQuantity > 1) {
      setFieldValue("ticketQuantity", values.ticketQuantity - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-pink-50 to-blue-50">
        <h1 className="text-center text-4xl font-bold pt-5">Book Now</h1>
        <div className="relative isolate overflow-hidden ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col-reverse lg:flex-row">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none w-full lg:w-1/2">
              <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Booking Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Please fill in these details to book your tickets.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 relative">
                      {errors.firstName && touched.firstName ? (
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-red-600 absolute"
                        >
                          *{errors.firstName}
                        </label>
                      ) : null}
                      <div className="mt-8">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          placeholder="First name"
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 relative">
                      {errors.lastName && touched.lastName ? (
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-6 text-red-600 absolute"
                        >
                          *{errors.lastName}
                        </label>
                      ) : null}
                      <div className="mt-8">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          placeholder="last name"
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 relative">
                      {errors.mobile && touched.mobile ? (
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium leading-6 text-red-600 absolute"
                        >
                          *{errors.mobile}
                        </label>
                      ) : null}
                      <div className="mt-8">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobile}
                          placeholder="mobile"
                          type="text"
                          name="mobile"
                          id="mobile"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>


              
                     


                    <div className="sm:col-span-3 relative">
                      {errors.email && touched.email ? (
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-red-600 absolute"
                        >
                          *{errors.email}
                        </label>
                      ) : null}
                      <div className="mt-8">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="email"
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>





 
               
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-serif font-medium  ml-6 mb-5  text-gray-900"
                      >
                       Ticket Quantity
                      </label>
                      <div className="w-36 flex justify-evenly items-center mt-2">
                        <button
                          onClick={decreaseQuantity}
                          className="w-10 h-10 rounded-full  bg-blue-500 hover:bg-blue-700 text-white focus:outline-none"
                        >
                          <i className="fa fa-chevron-left"></i>
                        </button>
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ticketQuantity}
                          name="ticketQuantity"
                          disabled
                          type="text"
                          className="block w-10 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        />
                        <button
                          onClick={increaseQuantity}
                          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white focus:outline-none"
                        >
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>

              

          


                    <div className="sm:col-span-3 relative">
                      
                      <div className="mt-10">
                        <h1 className="font-bold font-serif">Total bill: <span className="font-sans">  &#8377; {event?values.ticketQuantity*event.ticketPrice:null}</span> </h1>
                      </div>
                    </div>


              


                  </div>
                </div>

                <div className="  flex items-center justify-end gap-x-6">
                  <img className="w-44" src={stripe} alt="" />

                  <button
                    type="submit"
                    className="rounded-md mt-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md mt-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
            <div className="h-96  w-full lg:w-auto rounded-md bg-black lg:ml-60">
              <img
                className="h-96 object-cover"
                src={event ? `${VITE_IMAGE_URL}/${event.image}` : null}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Booking;
