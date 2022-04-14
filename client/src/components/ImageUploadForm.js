import React, { useState } from "react";

const ImageUploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] =
    useState("이미지 파일을 업로드 해주세요.");

  return (
    <form>
      <label htmlFor="image">{imageFileName}</label>
      <input
        id="image"
        type="file"
        onChange={(event) => {
          const imageFile = event.target.files[0];
          setImageFile(imageFile);
          setImageFileName(imageFile.name);
        }}
      />
      <button type="submit">제출</button>
    </form>
  );
};

export default ImageUploadForm;
