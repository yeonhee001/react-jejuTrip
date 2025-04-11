import React, { useRef } from "react";
import { Box } from "@mui/material";
import Photo from "../../icons/Photo";

function CmUploadImg({ selectedImage, setSelectedImage }) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Box className="photoContainer">
      <Box className="photoBox" onClick={handleImageClick}>
        <Photo className={"nw-photo"} />
      </Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {selectedImage && (
        <Box className="imagePreview">
          <img
            src={selectedImage}
            alt="선택한 이미지"
            style={{
              width: "100%",
              maxHeight: "300px",
              marginTop: "10px"
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default CmUploadImg;