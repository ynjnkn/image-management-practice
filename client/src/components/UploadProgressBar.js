// Dependencies
import React from "react";
import styled from "styled-components";

const UploadProgressBar = ({ uploadPercentage }) => {
  return (
    <UploadProgressBoundary>
      <UploadProgress uploadPercentage={uploadPercentage}>
        {uploadPercentage}%
      </UploadProgress>
    </UploadProgressBoundary>
  );
};

export default UploadProgressBar;

const UploadProgressBoundary = styled.div`
  border: 1px solid black;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;
`;

const UploadProgress = styled.div`
  background-color: #61ff69;
  height: 30px;
  width: ${(props) => `${props.uploadPercentage}%`};
  padding-top: 10px;
  border-radius: 10px;
  text-align: center;
  color: white;
  transition: 0.3s;
`;
