import React from "react";
import Navbar from "../../components/navbar/Navbar";
import cover from "../../assets/images/rachel-coyne-U7HLzMO4SIY-unsplash.jpg"
import image from "../../assets/images/1131w-54Tdz9HHh8w.webp"

function ConfirmTicket() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center pb-10 pt-10 bg-center bg-cover ">
        <div className="max-w-md w-full h-full mx-auto z-10  bg-blue-900 rounded-3xl ">
          <div className="flex flex-col">
            <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center  my-1">
                      <div className="font-monoton  text-2xl cursor-pointer flex items-center bg-transparent">
                        <span className="text-3xl  mr-1 pt-2  text-purple-500 ">
                          {" "}
                          <ion-icon name="finger-print-outline"></ion-icon>
                        </span>
                        <span className="bg-gradient-to-r  from bg-purple-500 to-pink-600 text-transparent bg-clip-text ">
                          EventGo
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto text-blue-800">{formattedDate}</div>
                  </div>
                  <div className="border-b border-dashed my-5">
                  </div>
                  <div className="flex items-center mt-5 ">
                <div className="w-1/2  ">
                <img src={image} alt="" />
                </div>

                <div className="flex flex-col justify-center text-center items-center w-1/2">
                    <h1 className=" text-md font-chonburi uppercase ">"the ultimate night"</h1>
                    <h6 className=" text-xs font-extralight ml-3  font-roboto-slab">This is the greatest dj show ever</h6>
                    <h3 className="text-red-500 text-xs ml-3" > June 2023 Friday, 06:53 to 05:53</h3>
                    <h3 className=" text-xs ml-3" > Payyambalam Road , Kannur, Kerala, in</h3>
                    <h3 className="text-xs mt-10">Ticket price per head : &#8377; 2000</h3>

                </div>

                  </div>
                  <div className="border-b border-dashed  my-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center mb-5 p-2 text-sm">
                    <div className="flex flex-col">
                     <h3 className="text-md  font-extralight">Account email: viodsamyukth@gmail.com</h3>
                     <h3 className="text-md font-extralight ">Booking Account: vinodsamyukth@gmail.com</h3>
                     <h3 className="text-md   font-extralight">Booking id :EvntGo433n3j433k43m4353n4 </h3>
                     <h3 className="text-md mt-5  font-light">Ticket quantity : 1 </h3>

                       


                     <div className="flex justify-end">

                       <h1 className=" text-lg my-5 font-bold">Totol bill amount: </h1>
                       <h1 className=" font-bold text-lg my-5">  &#8377; 2000</h1>
                     </div>
                    </div>
                  </div>
                  <div className="border-b border-dashed border-b-2 my-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center px-5 pt-3 text-sm">
                    {/* <div className="flex flex-col">
                      <span className="">Passanger</span>
                      <div className="font-semibold">Ajimon</div>
                    </div>
                    <div className="flex flex-col mx-auto">
                      <span className="">Class</span>
                      <div className="font-semibold">Economic</div>
                    </div>
                    <div className="flex flex-col">
                      <span className="">Seat</span>
                      <div className="font-semibold">12 E</div>
                    </div> */}
                  </div>
                    
                    
                  <div className="flex flex-col py-5 justify-center text-sm">
  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
    <span>Download</span>
  </button>
  <h6 className="font-bold text-center mt-5">Scan here</h6>
  <div className="barcode h-14 w-0 inline-block mt-4 relative left-auto"></div>
</div>

                  
                </div>
                
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTicket;
