// Dependencies
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import ImageUploadForm from "./components/ImageUploadForm";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        pauseOnHover={false}
      />
      <h2>Photo Album</h2>
      <ImageUploadForm />
    </div>
  );
};

export default App;
