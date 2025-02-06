import React from 'react'
import { useState } from 'react';
export const useDisclouse = () => {
    const [isOpen, setOpen] = useState(false);
     const onOpen = () =>{
        setOpen(true);
       }
       const onClose = () =>{
        setOpen(false);
       }
  return {onClose, onOpen, isOpen}
}
