import React, { Fragment } from 'react'
import Payment from './Payment';

function Modal({isVisible,onClose}) {
    if(!isVisible) return null
    
       // modal closing function
  const handleClose = (e) => {
    if (e.target.id === "wrapper")
     onClose()
  };



  return (
    <Fragment>
       <div
          id="wrapper"
          className="fixed inset-0    bg-white bg-opacity-90 backdrop-blur-sm flex justify-center items-center "
            onClick={handleClose}
        >
          <div className="w-[600px] flex flex-col">
            <button
              className="text-black border-2 border-black w-8 h-8 rounded-full place-self-end hover:bg-red-500"
              onClick={() => onClose()}
            >
              X
            </button>
          
          <Payment/>
          </div>
        </div>
    </Fragment>
  )
}

export default Modal
