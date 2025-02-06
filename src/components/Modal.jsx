import React from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

export const Modal = ({onClose, isOpen, children}) => {
  return createPortal(
    <>
    {isOpen && (    <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center  bg-opacity-50"
        style={{ backdropFilter: "blur(5px)", zIndex: 30 }}
      ><div className='position-relative modal-design p-3 rounded m-auto' style={{ zIndex: 50 }}>
      <div className='d-flex justify-content-end'>
        <AiOutlineClose onClick={onClose} className='fs-3'/>
      </div>
      {children}
    </div>
      </div>
    )}</>,
    document.getElementById("modal-root")
  )
}

