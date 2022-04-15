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
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const imageFileSelectHandler = (event) => {
    const imageFile = event.target.files[0];
    const fileReader = new FileReader();
    setImageFile(imageFile);
    setImageFileName(imageFile.name);
    // [예외 처리] 이미지 파일 사이즈가 5MB가 넘을 경우
    if (imageFile.size > 1024 * 1024 * 5) {
      toast.error("이미지 파일 사이즈는 5MB 이하");
      event.target.value = "";
      setImageFile(null);
      setImageFileName(defaultImageFileName);
      setUploadPercentage(0);
      setImagePreview(null);
      return;
    }
    // 이미지 프리뷰 생성
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (event) => {
      setImagePreview(event.target.result);
    };
  };

  const formSubmitHandler = async (event) => {
    if (!imageFile) return;
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const res = await axios.post("/images", formData, {
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
        setImagePreview(null);
      }, 1000);
    } catch (error) {
      setUploadPercentage(0);
      setImageFileName(defaultImageFileName);
      setImagePreview(null);
      console.log({ error: { name: error.name, message: error.message } });
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <ImagePreview src={imagePreview} imagePreview={imagePreview} />
      {uploadPercentage !== 0 ? (
        <UploadProgressBar uploadPercentage={uploadPercentage} />
      ) : null}
      <ImageFileDropZone>
        {imageFileName}
        <ImageFileSelector
          id="image"
          type="file"
          accept="image/*"
          onChange={imageFileSelectHandler}
        />
      </ImageFileDropZone>
      <SubmitButton type="submit">제출</SubmitButton>
    </form>
  );
};

export default ImageUploadForm;

const ImagePreview = styled.img`
  width: ${(props) => (props.imagePreview ? "100%" : "0%")};
  margin: 0px auto 20px auto;
  display: block;
  border-radius: 10px;
  border: 0px grey;
  transition: 0.3s;
`;

const ImageFileDropZone = styled.div`
  border: 1px dashed grey;
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
