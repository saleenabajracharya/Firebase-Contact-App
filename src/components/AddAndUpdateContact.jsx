import React from 'react'
import { Modal } from './Modal'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
        .matches(/^\d+$/, 'Phone must be a number')
        .required('Phone is required'),
        email: Yup.string().email("Invalid Email").required("Email is required")
});
export const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {
    debugger;
    const addContact = async (contact) =>{
        try{
            const contactRef = collection(db, "Contact");
            await addDoc(contactRef, contact);
            onClose();
        toast.success("Contact Added Successfully!");
        }catch(error){
            console.log(error);
        }
    }

    const updateContact = async (contact, id) =>{
        try{
            const contactRef = doc(db, "Contact", id);
            await updateDoc(contactRef, contact);
            onClose();
        toast.success("Contact Updated Successfully!");
        }catch(error){
            console.log(error);
        }
    }
  return (
   
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <Formik validationSchema={contactSchemaValidation} initialValues={ isUpdate ? {
            
            name:contact.Name,
            phone:contact.Phone,
            email: contact.Email
        }: {
            name:"",
            phone:"",
            email:"",
        }} onSubmit={(values) =>{
            console.log(values);
            isUpdate ? updateContact({
                Name: values.name,
                Phone: values.phone, 
                Email: values.email
            }, contact.id) :
            addContact({
                Name: values.name,
                Phone: values.phone, 
                Email: values.email
            })
        }}>
            <Form className='d-flex flex-column gap-3'>
                <div className='d-flex flex-column gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field className="rounded h-10" name="name"/>
                    <div className='text-danger'>
                        <ErrorMessage name="name" component="div"/>
                    </div>
                    <label htmlFor="phone">Phone</label>
                    <Field type="number" className="rounded h-10" name="phone"/>
                    <div className='text-danger'>
                        <ErrorMessage name="phone" component="div"/>
                    </div>
                    <label htmlFor="email">Email</label>
                    <Field type="email" className="rounded h-10" name="email"/>
                    <div className='text-danger'>
                        <ErrorMessage name="email" component="div"/>
                    </div>
                </div>
                <button className='btn contact-button px-3 py-2 ms-auto'>{isUpdate ? "Update ":"Add "}Contact</button>
            </Form>
        </Formik>
      </Modal>
    </div>
  )
}
