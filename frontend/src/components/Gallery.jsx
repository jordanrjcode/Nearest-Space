import React, { useState } from "react";
import "./Gallery.css";
import Images from "./Images";
import { useSelector } from "react-redux";
function Gallery() {
  const apiInfo = useSelector((store) => store.api.apiInfo);
  if (!apiInfo) return null;
  return (
    <div className="gallery">
      {apiInfo
        ? apiInfo.photos.map((imagen) => {
            return <Images image={imagen.img_src} />;
          })
        : null}
    </div>
  );
}

export default Gallery;
