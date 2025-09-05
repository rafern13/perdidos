// src/components/Modal.js
import React, { useEffect, useState } from "react"; 
import ReactDOM from "react-dom";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("root")); 
  }, []);

  if (!portalRoot) {
    return null;
  }
  
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md flex items-center justify-center" 
      onClick={onClose}
    >
        <div 
          className="relative w-[60vw] h-[80dvh] bg-white p-6 rounded-lg shadow-lg flex flex-col" 
          onClick={(e) => e.stopPropagation()}
        >
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" 
              onClick={onClose}
            >
                &times;
            </button>
            <div className="flex-grow overflow-auto"> 
              {children}
            </div>
        </div>
    </div>,
    portalRoot 
  );
};

export default Modal;