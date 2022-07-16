import React from "react";

// Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer as ToastComponentContainer } from "react-toastify";

const ToastContainer = () => {
  return (
    <ToastComponentContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastContainer;
