import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Right_black from "../../icons/Right_black";
import Close from "../../icons/Close";
import CmSubject from "../cmSubject";
import { v4 as uuidv4 } from "uuid";
import CmUploadImg from "../img/CmUploadImg";

function CmNewPost({ onClose = () => {} }) {
  const { control, setFocus, handleSubmit, reset } = useFormContext();
  const navigate = useNavigate();
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("주제선택");
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    const newPost = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      image: selectedImage,
      createdAt: new Date().toISOString(),
      author: {
        id: 2,
        nickname: "새 사용자",
        imageUri: "https://via.placeholder.com/40",
      },
      likes: [],
      hasVote: false,
      voteCount: 0,
      commentCount: 0,
    };

    navigate("/community", { state: { newPost } });

    reset();
    onClose();
  };

  return (
    <Box className="container">
      <Box className="header">
        <div onClick={() => navigate("/community")}>
          <Close className="Cm-closeIcon" />
        </div>
        <button className="submitButton" onClick={handleSubmit(onSubmit)}>
          등록
        </button>
      </Box>

      <Typography className="newtitle" variant="h4" gutterBottom>
        새 게시물
      </Typography>

      <Box className="subjectContainer">
        <Box className="subjectBox" onClick={() => setIsSubjectOpen(true)}>
          <Typography className="subjectText" variant="body1">
            {selectedItem}
          </Typography>
          <Right_black className={"nw-Right"} />
        </Box>
        <Box className="divider" />
      </Box>

      {/* ✅ 이미지 업로드 컴포넌트 */}
      <CmUploadImg selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <Box className="divider" />

      <Controller
        name="title"
        control={control}
        rules={{ required: "제목을 작성해주세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoFocus
            placeholder="제목을 작성해주세요."
            value={value ?? ""}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setFocus("description");
              }
            }}
            error={!!error}
            helperText={error?.message}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              className: "inputTitle"
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "내용을 작성해주세요." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            placeholder="내용을 작성해주세요."
            value={value ?? ""}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              className: "inputDescription"
            }}
          />
        )}
      />

      {isSubjectOpen && (
        <div className="modalOverlay" onClick={() => setIsSubjectOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CmSubject
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              onClose={() => setIsSubjectOpen(false)}
            />
          </div>
        </div>
      )}
    </Box>
  );
}

export default CmNewPost;