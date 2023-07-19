import React, { useState,useEffect } from "react";
import Navbar from "../../../components/organizer/organizerNavbar/Navbar";
import { addEvent, uploadEditedEventImage } from "../../../api/OrganizerApi";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AddressAutofill } from "@mapbox/search-js-react";

function AddEvent() {
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const [image, setImage] = useState(false);
  const [coverImage, setCoverImage] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(false);
  const [about, setAbout] = useState(false);
  const [description, setDescription] = useState(false);

  const organizer = useSelector((state) => state.organizer);

  const [event, setEvent] = useState({
    eventName: "",
    eventOrganizer: organizer.id,
    about: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    ticketQuantity: "",
    ticketPrice: "",

    description: "",
    city: "",
    state: "",
    country: "",
    street: "",
    address: "",
  });

  const [img, setImg] = useState(null);
  const [cImg, setCImng] = useState(null);
  const [securalUrlImage, setSecureUrlImage] = useState(null);
  const [securalUrlCoverImage, setSecureUrlCoverImage] = useState(null);



  const uploadEvent = async (e) => {
    e.preventDefault();
    try {
      console.log("upload function");
      console.log(img, "img");
      console.log(cImg, "cImg");
      const formData1 = new FormData();
      formData1.append("file", img);
      formData1.append("upload_preset", "profileImage");
      formData1.append("cloud_name", "dcsdqyoh1");
  
      const formData2 = new FormData();
      formData2.append("file", cImg);
      formData2.append("upload_preset", "profileImage");
      formData2.append("cloud_name", "dcsdqyoh1");
  
      const responses = await Promise.all([
        uploadEditedEventImage(formData1),
        uploadEditedEventImage(formData2),
      ]);
      const secureUrls = responses.map((res) => res.data.secure_url);
      console.log(secureUrls, 99);
      setSecureUrlImage(secureUrls[0]);
      setSecureUrlCoverImage(secureUrls[1]);
      console.log(secureUrls[0],"one");
      console.log(secureUrls[1],"two");
  
      console.log(securalUrlCoverImage, securalUrlImage, 9876);
  //   try {
  //      await addEvent(event, securalUrlImage, securalUrlCoverImage).then((res) => {
  //     if (res.data.success) {
  //       toast.success("event successfully added ");
  //       e.target.reset();
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
   
    } catch (error) {
      // Handle the error
    }
  };


 


console.log(securalUrlCoverImage,"outside");
console.log(securalUrlImage,"outside");



  const verifyEventName = (eventName) => {
    if (eventName.length == 0) {
      setEventName(true);
    } else {
      setEventName(false);
    }
  };

  const verifyDescription = (description) => {
    if (description.length == 0) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const verifyAbout = (about) => {
    if (about.length == 0) {
      setAbout(true);
    } else {
      setAbout(false);
    }
  };

  const verifyCoverImage = (coverImage) => {
    if (coverImage.length == 0) {
      setCoverImage(true);
    } else {
      setCoverImage(false);
    }
  };

  const verifyImage = (image) => {
    if (image.length == 0) {
      setImage(true);
    } else {
      setImage(false);
    }
  };

  const verifyStartDate = (startDate) => {
    if (startDate.length == 0) {
      setStartDate(true);
    } else {
      setStartDate(false);
    }
  };

  const verifyEndDate = (endDate) => {
    if (endDate.length == 0) {
      setEndDate(true);
    } else {
      setEndDate(false);
    }
  };

  const verifyStartTime = (startTime) => {
    if (startTime.length == 0) {
      setStartTime(true);
    } else {
      setStartTime(false);
    }
  };

  const verifyEndTime = (endTime) => {
    if (endTime.length == 0) {
      setEndTime(true);
    } else {
      setEndTime(false);
    }
  };

  const verifyTicketPrice = (ticketPrice) => {
    if (ticketPrice.length == 0) {
      setTicketPrice(true);
    } else {
      setTicketPrice(false);
    }
  };

  const verifyTicketQuantity = (ticketQuantity) => {
    if (ticketQuantity.length == 0) {
      setTicketQuantity(true);
    } else {
      setTicketQuantity(false);
    }
  };



  useEffect(() =>   {
    if (securalUrlImage && securalUrlCoverImage && event) {
      addEvent(event, securalUrlImage, securalUrlCoverImage)
        .then((res) => {
          if (res.data.success) {
            toast.success("event successfully added ");
            // e.target.reset(); // Reset form or perform other actions
             document.getElementById('addevent').reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [securalUrlImage, securalUrlCoverImage, event]);

  


  event.street = event["address address-search"];
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => uploadEvent(e)} id="addevent">
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

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              Description
            </h1>
            <p className="ml-5 sm:ml-20">A short description about the event</p>

            {description && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <textarea
              type="text"
              onBlur={() => {
                verifyDescription(event.description);
              }}
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              name="description"
              className="ml-5 sm:ml-20 mt p-2 rounded border  w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Event description"
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">Location</h1>
            <p className="ml-5 sm:ml-20">
              Help people in the area discover your event and let attendees know
              where to show up.
            </p>

            <AddressAutofill accessToken="pk.eyJ1Ijoic2FteXVrdGgiLCJhIjoiY2xqM3VnamRrMDgzazNxbWpvcTJ4MndjZyJ9.vUafBLe566uHJi2j5257ZA">
              <input
                type="text"
                onChange={(e) => {
                  setEvent({ ...event, [e.target.name]: e.target.value });
                }}
                autoComplete="address-line1"
                name="address"
                className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
                placeholder="street"
              />
            </AddressAutofill>

            <input
              name="city"
              placeholder="City"
              type="text"
              autoComplete="address-level2"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              onChange={(e) => {
                setEvent({ ...event, [e.target.name]: e.target.value });
              }}
            />

            <input
              name="state"
              placeholder="State"
              type="text"
              autoComplete="address-level1"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              onChange={(e) => {
                setEvent({ ...event, [e.target.name]: e.target.value });
              }}
            />

            <input
              name="country"
              placeholder="Country"
              type="text"
              autoComplete="country"
              className="ml-5 sm:ml-20 mt-4 p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              onChange={(e) => {
                setEvent({ ...event, [e.target.name]: e.target.value });
              }}
            />

            <h1 className="font-bold text-4xl mt-14 ml-5 sm:ml-20">
              About Event
            </h1>
            <p className="ml-5 sm:ml-20">Give a description about the event</p>

            {about && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <textarea
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
              name="coverImage"
              onChange={(e) => setCImng(e.target.files[0])}
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
                  min={today}
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
                  min={today}
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
            <label htmlFor="startDate" className="block mt-4  ml-6 sm:ml-20">
              Start Time
            </label>
            <input
              type="time"
              onBlur={() => {
                verifyStartTime(event.startTime);
              }}
              name="startTime"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
              placeholder="Start time"
            />
            {endTime && (
              <p className="text-red-600 ml-5 sm:ml-20">*Field is required</p>
            )}
            <label htmlFor="startDate" className="block mt-4  ml-6 sm:ml-20">
              End Time
            </label>
            <input
              type="time"
              onBlur={() => {
                verifyEndTime(event.endTime);
              }}
              name="endTime"
              onChange={(e) =>
                setEvent({ ...event, [e.target.name]: e.target.value })
              }
              className="ml-5 sm:ml-20  p-2 rounded border w-80 sm:w-96 border-gray-300 focus:border-primary focus:ring-0"
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
              name="image"
              onChange={(e) => setImg(e.target.files[0])}
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
