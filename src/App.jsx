import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs} from 'firebase/firestore';
import { db } from './config/firebase'
import { HiOutlineUserCircle } from 'react-icons/hi';
function App() {
  const [contacts, setContacts] = useState([]);

  useEffect (() =>
  {
    const getContacts = async () =>{
      try {
        const contactsRef = collection(db, "Contact");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot.docs.map((doc) => 
        {return{
          id: doc.id,
          ...doc.data()
        }}
        );
        setContacts(contactLists);
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
          <div className='d-flex gap-2'>
          <div className='d-flex position-relative items-center flex-grow-1'>
          <FiSearch className='text-white position-absolute fs-5 mx-1 my-2'/>
            <input type="text" className='flex-grow-1 border bg-transparent border-white text-white rounded ps-4 pb-1' placeholder='Search Contact'/>

          </div>

          <FaCirclePlus className='fs-2 my-1 text-white ' style={{cursor:"pointer"}}/>

          </div>
          <div>
            {contacts.map((contact) => (
              <div key={contacts.id}>
                <HiOutlineUserCircle/>
              </div>
            ))}
          </div>
       </div>

    </>
  )
}

export default App
