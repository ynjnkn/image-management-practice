import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ImageUploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] =
    useState("이미지 파일을 업로드 해주세요.");

  const imageFileSelectorHandler = (event) => {
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
      });
      console.log({ res });
      alert("success");
    } catch (error) {
      console.log({ error: { name: error.name, message: error.message } });
      alert("fail");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <ImageFileDropZone>
        {imageFileName}
        <ImageFileSelector
          id="image"
          type="file"
          onChange={imageFileSelectorHandler}
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
