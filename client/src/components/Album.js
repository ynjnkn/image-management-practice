// Dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Album = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error({ error: { name: error.name, message: error.message } });
      });
  }, []);
  const imageList = images.map((image) => (
    <ImageList
      src={`http://localhost:5000/images/${image.key}`}
      key={image.key}
    />
  ));
  return <ImageListWrap>{imageList}</ImageListWrap>;
};

export default Album;

const ImageListWrap = styled.div``;

const ImageList = styled.img`
  width: 100%;
`;
