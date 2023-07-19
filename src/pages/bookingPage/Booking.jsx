import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { eventDetails } from "../../api/UserApi";
import stripe from "../../../src/assets/images/291-2918799_stripe-payment-icon-png-transparent-png.png";
import { useFormik } from "formik";
import { booking } from "../../yup/index";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "../../redux/EventSlice";
import bgimg from "../../assets/images/hi.jpg";

import Modal from "../../components/stripe/Modal";

const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  ticketQuantity: 1,
};

function Booking() {
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const getData = () => {
      eventDetails(eventId)
        .then((res) => {
          setEvent(res.data.eventDetails);
       
          setBill(res.data.eventDetails.ticketPrice);
        })
        .catch((error) => {
          console.log(error, 34);
        });
    };
    getData();
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: booking,
    onSubmit: async (values) => {
      dispatch(
        setBookingDetails({
          totalBill: bill,
          ticketQuantity: values?.ticketQuantity,
          organizerId: event?.eventOrganizer._id,
          eventId: event?._id,
          userId: userData.id,
          userFirstName: values.firstName,
          userSecondName: values.lastName,
          bookingEmail: values.email,
          bookingMobile: values.mobile,
        })
      );

      setIsFormValid(true);
    },
  });

  const updateBill = (quantity) => {
    if (event) {
      const ticketPrice = event && event.ticketPrice;
      const newBill = ticketPrice * quantity;
      setBill(newBill);
    }
  };

  // Function to increase the quantity of tickets selected
  const increaseQuantity = () => {
    if (event.ticketQuantity <= values.ticketQuantity) {
      toast.error("Tickets are out of stock");
    } else {
      const newQuantity = values.ticketQuantity + 1;
      setFieldValue("ticketQuantity", newQuantity);
      updateBill(newQuantity);
    }
  };

  // Function to decrease the quantity of tickets selected
  const decreaseQuantity = () => {
    if (values.ticketQuantity > 1) {
      const newQuantity = values.ticketQuantity - 1;
      setFieldValue("ticketQuantity", newQuantity);
      updateBill(newQuantity);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="bg-gradient-to-t from-white to-blue-200"
        // style={{
        //   backgroundImage: `url(${bgimg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   position: "relative",
        //   zIndex: 1,
        // }}
      >
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)", // Adjust the value (5px) to increase or decrease the blur effect
            zIndex: -1,
          }}
        ></div> */}
        <h1 className="text-center text-4xl font-chonburi pt-5">Book Now</h1>
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col-reverse lg:flex-row">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none w-full h-auto lg:w-1/2">
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
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          placeholder="Last name"
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          placeholder="Mobile"
                          type="text"
                          name="mobile"
                          id="mobile"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          placeholder="Email"
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-sans font-medium  ml-6 mb-5  text-gray-900"
                      >
                        Ticket Quantity
                      </label>
                      <div className="w-36 flex justify-evenly items-center mt-2">
                        <button
                          type="button"
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
                          className="block w-10 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                        />
                        <button
                          type="button"
                          onClick={increaseQuantity}
                          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white focus:outline-none"
                        >
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-3 relative bg-white flex flex-col justify-center items-center bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-2xl">
                      <div className="flex items-center text-lg">
                        <h1 className="font-bold font-serif">
                          Total bill: &nbsp;
                        </h1>
                        <span className="font-sans font-bold text-lg">
                          &#8377;
                          {event
                            ? values.ticketQuantity * event.ticketPrice
                            : null}
                        </span>
                      </div>
                      <small className="text-sm text-gray-600 mt-2">
                        Per Ticket Price: &#8377;
                        {event ? event.ticketPrice : null}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 ">
                  <img className="w-44" src={stripe} alt="" />

                  <button
                    onClick={() => resetForm()}
                    type="submit"
                    className="rounded-md mt-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    type="submit"
                    className="rounded-md mt-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>

            <div className="h-96 w-auto lg:w-auto rounded-md bg-black lg:ml-60">
              <img
                className="h-full w-full  "
                src={event ? `${event.image}` : null}
                alt=""
              />
            </div>

            {/* <div className="h-96 lg:h-auto">
  <img
    className="h-full w-full object-cover rounded-md"
    src={event ? `${VITE_IMAGE_URL}/${event.image}` : null}
    alt=""
  />
</div> */}
          </div>
        </div>
        <Modal
          isVisible={showModal && isFormValid}
          onClose={() => setShowModal(false)}
        />
        <Toaster />
      </div>
    </div>
  );
}

export default Booking;
