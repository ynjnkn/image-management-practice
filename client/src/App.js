// Dependencies
import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Album, ImageUploadForm } from "./components";

const App = () => {
  return (
    <AppWrap>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        pauseOnHover={false}
      />
      <h2>Photo Album</h2>
      <ImageUploadForm />
      <Album />
    </AppWrap>
  );
};

export default App;

const AppWrap = styled.div`
  max-width: 600px;
  margin: auto;
`;
