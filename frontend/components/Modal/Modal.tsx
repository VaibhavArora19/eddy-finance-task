import React from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: TProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black rounded-lg shadow-lg w-[480px] h-[60vh] mb-24">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-8 text-white hover:text-gray-200 text-3xl">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
