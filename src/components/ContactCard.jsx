import React from 'react'
import { RiEditCircleLine } from 'react-icons/ri';
import { IoMdTrash } from "react-icons/io";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useDisclouse } from '../hooks/useDisclouse';
import { AddAndUpdateContact } from './AddAndUpdateContact';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactCard = ({contact}) => {
     const {isOpen, onClose, onOpen}= useDisclouse();

    const deleteContact =  async (id) =>{
        try {
            await deleteDoc(doc(db, "Contact", id));
            toast.success("Contact Updated Successfully!");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div key={contact.id} className='d-flex align-items-center justify-content-between contact-body p-2  rounded'>
                <div className='d-flex gap-1'>
                <HiOutlineUserCircle className='fs-2 user-icon'/>
                <div className='lh-1'>
                  <h4 className=''>{contact.Name}</h4>
                  <p className=''>{contact.Phone}</p>
                </div>
                </div>
                <div className='d-flex fs-3'>
                  <RiEditCircleLine onClick={onOpen} className='cursor-pointer' style={{ cursor: 'pointer' }}/>
                  <IoMdTrash className='delete-icon' onClick={() => deleteContact(contact.id)} style={{ cursor: 'pointer' }}/>
                </div>
              </div>
        <AddAndUpdateContact contact={contact} isOpen={isOpen} onClose={onClose} isUpdate/>
    </>
  )
}
