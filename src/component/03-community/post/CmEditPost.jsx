import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Photo from "../../icons/Photo";
import Close from "../../icons/Close";
import CmSubject from "../cmSubject";
import Right_black from "../../icons/Right_black";

function CmEditPost({ onClose = () => {}, updatePost }) {
  const { control, setFocus, handleSubmit, reset } = useFormContext();
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state?.postData; // 기존 게시물 데이터

  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(postData?.category || "주제선택");

  useEffect(() => {
    if (postData) {
      reset({
        title: postData.title,
        description: postData.description,
      });
    }
  }, [postData, reset]);

  const onSubmit = (data) => {
    const updatedPost = {
      ...postData,
      title: data.title,
      description: data.description,
      category: selectedItem, // 카테고리도 함께 업데이트
    };

    if (updatePost) {
      updatePost(updatedPost); // 게시물 업데이트 함수 실행
    }

    navigate("/community", { state: { updatedPost } }); // 커뮤니티 페이지로 이동
    onClose();
  };

  return (
    <Box className="container">
      <Box className="header">
        <Close className={"Cm-closeIcon"} onClick={onClose} />
        <button className="submitButton" onClick={handleSubmit(onSubmit)}>
          수정 완료
        </button>
      </Box>

      <Typography className="newtitle" variant="h4" gutterBottom>
        게시물 수정
      </Typography>

      <Box className="subjectContainer">
        <Box className="subjectBox" onClick={() => setIsSubjectOpen(true)}>
          <Typography className="subjectText" variant="body1">
            {selectedItem}
          </Typography>
          <Right_black className={"Cm-Right"} />
        </Box>
        <Box className="divider" />
      </Box>

      <Box className="photoContainer">
        <Box className="photoBox">
          <Photo className={"Cm-Photo"} />
        </Box>
      </Box>

      <Box className="divider" />

      <Controller
        name="title"
        control={control}
        defaultValue={postData?.title || ""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            autoFocus
            value={value}
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
        defaultValue={postData?.description || ""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            value={value}
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
            <CmSubject selectedItem={selectedItem} setSelectedItem={setSelectedItem} onClose={() => setIsSubjectOpen(false)} />
          </div>
        </div>
      )}
    </Box>
  );
}

export default CmEditPost;