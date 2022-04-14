// Dependencies
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

// Components
import UploadProgressBar from "./UploadProgressBar";

const ImageUploadForm = () => {
  const defaultImageFileName = "이미지 파일을 업로드 해주세요.";
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState(defaultImageFileName);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const imageFileSelectHandler = (event) => {
    const imageFile = event.target.files[0];
    setImageFile(imageFile);
    setImageFileName(imageFile.name);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const res = await axios.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          const uploadPercentage = Math.round((100 * loaded) / total);
          setUploadPercentage(uploadPercentage);
        },
      });
      toast.success("이미지 파일 업로드 성공");
      setTimeout(() => {
        setUploadPercentage(0);
        setImageFileName(defaultImageFileName);
      }, 3000);
    } catch (error) {
      setUploadPercentage(0);
      setImageFileName(defaultImageFileName);
      console.log({ error: { name: error.name, message: error.message } });
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <UploadProgressBar uploadPercentage={uploadPercentage} />
      <ImageFileDropZone>
        {imageFileName}
        <ImageFileSelector
          id="image"
          type="file"
          onChange={imageFileSelectHandler}
        />
      </ImageFileDropZone>
      <SubmitButton type="submit">제출</SubmitButton>
    </form>
  );
};

export default ImageUploadForm;

const ImageFileDropZone = styled.div`
  border: 1px dashed black;
  height: 200px;
  background-color: none;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    background-color: #ebeef3;
    transition: 0.3s;
`;
const ImageFileSelector = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  cursor: pointer;
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  borderradius: 3px;
  cursor: pointer;
`;
