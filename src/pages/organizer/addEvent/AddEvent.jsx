import React, { useEffect, useState } from "react";
import Navbar from "../../../components/organizer/organizerNavbar/Navbar";
import { addEvent } from "../../../api/OrganizerApi";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function AddEvent() {
  const [eventType, setEventType] = useState("");

  const [eventName, setEventName] = useState(false);
  const [city, setCity] = useState(false);
  const [street, setStreet] = useState(false);
  const [district, setDistrict] = useState(false);
  const [state, setState] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [image, setImage] = useState(false);
  const [coverImage, setCoverImage] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(false);
  const [about, setAbout] = useState(false);

  const organizer = useSelector((state) => state.organizer);

  const [event, setEvent] = useState({
    eventName: "",
    eventOrganizer: organizer.id,
    street: "",
    city: "",
    district: "",
    state: "",
    about: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    ticketQuantity: "",
    ticketPrice: "",
    image: "",
    coverImage: "",
  });

  const uploadEvent = async (e) => {
    e.preventDefault();
    try {
      console.log(event);
      console.log(eventName);
console.log(city);
console.log(street);
console.log(district);
console.log(state);
console.log(startDate);
console.log(endDate);
console.log(startTime);
console.log(endTime);
console.log(image);
console.log(coverImage);
console.log(ticketPrice);
console.log(ticketQuantity);
console.log(about);

      // Check if any state value is false
     
     
        console.log("function");
        console.log(event.image);
        console.log(event.coverImage);
  
        console.log("error");
  
        const formData = new FormData();
        formData.append("coverImage", event.coverImage);
        formData.append("image", event.image);
        formData.append("event", JSON.stringify(event));
        console.log(...formData);
  
        const response = await addEvent(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
     
    } catch (error) {
      // Handle the error
    }
  };
  

  const verifyEventName = (eventName) => {
    console.log(eventName);
    if (eventName.length == 0) {
      console.log("if");
      setEventName(true);
    } else {
      console.log("else");
      setEventName(false);
    }
  };

  const verifyCity = (city) => {
    if (city.length == 0) {
      console.log("if");
      setCity(true);
    } else {
      console.log("else");
      setCity(false);
    }
  };

  const verifyStreet = (street) => {
    if (street.length == 0) {
      console.log("if");
      setStreet(true);
    } else {
      console.log("else");
      setStreet(false);
    }
  };

  const verifyDistrict = (district) => {
    if (district.length == 0) {
      console.log("if");
      setDistrict(true);
    } else {
      console.log("else");
      setDistrict(false);
    }
  };

  const verifyState = (state) => {
    if (state.length == 0) {
      console.log("if");
      setState(true);
    } else {
      console.log("else");
      setState(false);
    }
  };

  const verifyAbout = (about) => {
    if (about.length == 0) {
      console.log("if");
      setAbout(true);
    } else {
      console.log("else");
      setAbout(false);
    }
  };

  const verifyCoverImage = (coverImage) => {
    if (coverImage.length == 0) {
      console.log("if");
      setCoverImage(true);
    } else {
      console.log("else");
      setCoverImage(false);
    }
  };

  const verifyImage = (image) => {
    if (image.length == 0) {
      console.log("if");
      setImage(true);
    } else {
      console.log("else");
      setImage(false);
    }
  };

  const verifyStartDate = (startDate) => {
    if (startDate.length == 0) {
      console.log("if");
      setStartDate(true);
    } else {
      console.log("else");
      setStartDate(false);
    }
  };

  const verifyEndDate = (endDate) => {
    if (endDate.length == 0) {
      console.log("if");
      setEndDate(true);
    } else {
      console.log("else");
      setEndDate(false);
    }
  };

  const verifyStartTime = (startTime) => {
    if (startTime.length == 0) {
      console.log("if");
      setStartTime(true);
    } else {
      console.log("else");
      setStartTime(false);
    }
  };

  const verifyEndTime = (endTime) => {
    if (endTime.length == 0) {
      console.log("if");
      setEndTime(true);
    } else {
      console.log("else");
      setEndTime(false);
    }
  };

  const verifyTicketPrice = (ticketPrice) => {
    if (ticketPrice.length == 0) {
      console.log("if");
      setTicketPrice(true);
    } else {
      console.log("else");
      setTicketPrice(false);
    }
  };

  const verifyTicketQuantity = (ticketQuantity) => {
    if (ticketQuantity.length == 0) {
      console.log("if");
      setTicketQuantity(true);
    } else {
      console.log("else");
      setTicketQuantity(false);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => uploadEvent(e)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 ">
          <div className="h-full">
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Basic Info
            </h1>
            <p className="ml-5 sm:ml-20">
              Name your event and tell event-goers why they should come. Add
              details that highlight what makes it unique.
            </p>

            {eventName && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyEventName(event.eventName);
              }}
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              name="eventName"
              className="ml-5 sm:ml-20 mt p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event Name"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Location</h1>
            <p className="ml-5 sm:ml-20">
              Help people in the area discover your event and let attendees know
              where to show up.
            </p>

            {street && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyStreet(event.street);
              }}
              name="street"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Street"
            />

            {city && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyCity(event.city);
              }}
              name="city"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="City"
            />

            {district && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyDistrict(event.district);
              }}
              name="district"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="District"
            />

            {state && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyState(event.state);
              }}
              name="state"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="State"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              About Event
            </h1>
            <p className="ml-5 sm:ml-20">Give a description about the event</p>

            {about && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyAbout(event.about);
              }}
              name="about"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2    rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event about"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              cover Image
            </h1>
            <p className="ml-5 sm:ml-20">upload a cover image </p>

            {coverImage && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="file"
              onBlur={() => {
                verifyCoverImage(event.coverImage);
              }}
              name="coverImage"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.files[0] })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
            />
          </div>

          <div className=" h-full">
            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Date And Time
            </h1>
            <p className="ml-5 sm:ml-20">
              Tell event-goers when your event starts and ends so they can make
              plans to attend.
            </p>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setEventType("singleDay")}
                className="inline-block rounded-full sm:ml-10  md:ml-20 bg-primary px-6 pb-2 mt-4 sm:mt-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                single day event
              </button>
              <button
                type="button"
                onClick={() => setEventType("multipleDay")}
                className="inline-block rounded-full sm:ml-3 md:ml-3  bg-primary px-6 pb-2 mt-4 sm:mt-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Multiple day event
              </button>
            </div>

            {(eventType === "singleDay" || eventType === "multipleDay") && (
              <div className="">
                {startDate && (
                  <p className="text-red-600 ml-5 sm:ml-20">
                    *Field is required
                  </p>
                )}
                <label htmlFor="startDate" className="block mt-4 ml-6 sm:ml-20">
                  Start Date
                </label>
                <input
                  type="date"
                  onBlur={() => {
                    verifyStartDate(event.startDate);
                  }}
                  name="startDate"
                  onChange={(e) =>
                    setEvent({ ...event, [e.target.name]: e.target.value })
                  }
                  className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                  placeholder="Start date"
                />
              </div>
            )}

            {eventType === "multipleDay" && (
              <div className="">
                {endDate && (
                  <p className="text-red-600 ml-5 sm:ml-20">
                    *Field is required
                  </p>
                )}
                <label
                  htmlFor="startDate"
                  className="block mt-4  ml-6 sm:ml-20"
                >
                  End Date
                </label>
                <input
                  type="date"
                  onBlur={() => {
                    verifyEndDate(event.endDate);
                  }}
                  name="endDate"
                  onChange={(e) =>
                    setEvent({ ...event, [e.target.name]: e.target.value })
                  }
                  className="ml-5 sm:ml-20 mt p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                  placeholder="End date"
                />
              </div>
            )}

            {startTime && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyStartTime(event.startTime);
              }}
              name="startTime"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Start time"
            />
            {endTime && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyEndTime(event.endTime);
              }}
              name="endTime"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="End time"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Ticket Quantity
            </h1>
            <p className="ml-5 sm:ml-20">set a quantity for the ticket </p>
            {ticketQuantity && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="text"
              onBlur={() => {
                verifyTicketQuantity(event.ticketQuantity);
              }}
              name="ticketQuantity"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket Quantity"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Ticket price
            </h1>
            <p className="ml-5 sm:ml-20">
              set the ticket price per head in rupees{" "}
            </p>
            {ticketPrice && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              name="ticketPrice"
              onBlur={() => {
                verifyTicketPrice(event.ticketPrice);
              }}
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              type="text"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Ticket price"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Image</h1>
            <p className="ml-5 sm:ml-20">upload a main image </p>
            {image && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <input
              type="file"
              onBlur={() => {
                verifyImage(event.image);
              }}
              name="image"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.files[0] })
              }
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-block rounded-full mb-5 text-center justify-center ml-20 bg-primary px-6 pb-2 mt-4 sm:mt-10 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Add Event
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AddEvent;
