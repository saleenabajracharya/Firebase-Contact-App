import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from 'react-icons/ri';
import { collection, getDocs, onSnapshot} from 'firebase/firestore';
import { db } from './config/firebase'
import { HiOutlineUserCircle } from 'react-icons/hi';
import { ContactCard } from './components/ContactCard';
import { Modal } from './components/Modal';
import { AddAndUpdateContact } from './components/AddAndUpdateContact';
import { useDisclouse } from './hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotFoundContact } from './components/NotFoundContact';
function App() {
  const [contacts, setContacts] = useState([]);
   const {isOpen, onClose, onOpen} = useDisclouse();
   const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "Contact");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => 
            {return{
              id: doc.id,
              ...doc.data()
            }}
            );

            const filteredContacts = contactLists.filter((contact) =>
              contact.Name.toLowerCase().includes(value.toLowerCase())
            );
            setContacts(filteredContacts);
            return filteredContacts;
        })
   }

  useEffect (() =>
  {
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db, "Contact");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => 
            {return{
              id: doc.id,
              ...doc.data()
            }}
            );
            setContacts(contactLists);
            return contactLists;
        })
        
      } catch (error) {
        console.log(error);
      }
    }

    getContacts();
  }, []);

  return (
    <>
       <div  className='mx-auto px-4' style={{ maxWidth: '360px' }}>
          <Navbar/>
          <div className='d-flex gap-2 '>
          <div className='d-flex position-relative items-center flex-grow-1'>
          <FiSearch className='text-white position-absolute fs-5 mx-1 my-2'/>
            <input onChange={filterContacts} type="text" className='flex-grow-1 border bg-transparent border-white text-white rounded ps-4 pb-1' placeholder='Search Contact'/>

          </div>

          <FaCirclePlus onClick={onOpen} className='fs-1 my-1 text-white ' style={{cursor:"pointer"}}/>

          </div>
          <div className='mt-4 d-flex flex-column gap-2'>
          {contacts.length <= 0 ? (
              <NotFoundContact />
            ) : (
              contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}

          </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={1000}/>        
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default App
