import React, { useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] =
    useState("이미지 파일을 업로드 해주세요.");

  const imageSelectorHandler = (event) => {
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
      <label htmlFor="image">{imageFileName}</label>
      <input id="image" type="file" onChange={imageSelectorHandler} />
      <button type="submit">제출</button>
    </form>
  );
};

export default ImageUploadForm;
