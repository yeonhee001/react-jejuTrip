import React, { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Right_black from "../../icons/Right_black";
import Warning from "../../icons/Warning";
import Close from "../../icons/Close";
import CmSubject from "../cmSubject";
import Btn2Popup from "../../popups/Btn2Popup";
import axios from "axios";
import CmUploadImg from "../img/CmUploadImg";
import PopupAction from "../../_common/PopupAction";

function CmNewPost({ onClose = () => {} }) {
  const { control, setFocus, handleSubmit, reset } = useFormContext();
  const navigate = useNavigate();
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("주제선택");
  const [showSubjectAlert, setShowSubjectAlert] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // 이미지 미리보기 배열
  const [imageUrls, setImageUrls] = useState([]); // 업로드된 이미지 URL 저장

  const title = useWatch({ control, name: "title" });
  const description = useWatch({ control, name: "description" });

  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    let shouldShowAlert = false;

    // 주제 선택이 안된 경우 경고 표시
    if (selectedItem === "주제선택") {
      setShowSubjectAlert(true);
      shouldShowAlert = true;
    } else {
      setShowSubjectAlert(false);
    }

    // 제출 처리
    handleSubmit((data) => {
      if (!shouldShowAlert) {
        onSubmit(data);
      }
    })();
  };

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId"); 

    const formdata = new FormData();
    selectedImages.forEach(img => formdata.append('images', img)); // 이미지가 있으면 FormData에 추가

    let res;
    try {
      if (selectedImages.length > 0) {
        res = await axios.post("http://localhost:4000/post/images", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (err) {
      console.error("이미지 업로드 실패:", err.response?.data || err.message);

      if (err.response?.status === 429) {
        alert("요청이 너무 많아 이미지 업로드가 잠시 제한되었습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("이미지 업로드에 실패했습니다. 파일 크기를 확인하거나 다시 시도해주세요.");
      }
    }

    const postData = {
      userId: JSON.parse(window.sessionStorage.user).id,
      username: JSON.parse(window.sessionStorage.user).name,
      title: data.title,
      description: data.description,
      subject: selectedItem,
      createdAt: new Date().toISOString(),
      imageUrls: res?.data || [], // 이미지 URL이 없으면 빈 배열로 처리
    };

    try {
      const response = await axios.post("http://localhost:4000/post", postData);
      reset();
      onClose();
      navigate("/community", { state: { newPost: response.data } });
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCloseClick = () => {
    const isDirty = title || description || selectedItem !== "주제선택";
    if (isDirty) {
      setIsExitPopupOpen(true);
    } else {
      navigate("/community");
    }
  };

  const handleExitConfirm = () => {
    setIsExitPopupOpen(false);
    reset();
    navigate("/community");
  };

  return (
    <Box className="container">
      <Box className="header1">
        <div onClick={handleCloseClick}>
          <Close className="Cm-closeIcon" />
        </div>
        <button className="submitButton" onClick={(e) => handleSubmitWrapper(e)}>
          등록
        </button>
      </Box>

      <Typography className="newtitle" variant="h4" gutterBottom>
        새 게시물
      </Typography>

      {showSubjectAlert && (
        <div className="alertBox">
          <Warning className="alertIcon" />
          주제를 선택해주세요
        </div>
      )}

      <Box className="subjectContainer">
        <Box
          className="subjectBox"
          onClick={() => {
            setIsSubjectOpen(true);
            setShowSubjectAlert(false);
          }}
        >
          <Typography className="subjectText" variant="body1">
            {selectedItem}
          </Typography>
          <Right_black className="nw-Right" />
        </Box>
        <Box className="divider" />
      </Box>

      {/* 이미지 업로드 컴포넌트 */}
      <CmUploadImg
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setImageUrls={setImageUrls} // 부모 컴포넌트로 이미지 URL 전달
        imageUrls={imageUrls}
      />

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
              className: "inputTitle",
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
              className: "inputDescription",
            }}
          />
        )}
      />

      {isSubjectOpen && (
        <PopupAction
          useState={isSubjectOpen}
          onClose={() => setIsSubjectOpen(false)}
        >
          <div className="subjectWrapper">
            <CmSubject
              selectedItem={selectedItem}
              setSelectedItem={(item) => {
                setSelectedItem(item);
                setShowSubjectAlert(false);
              }}
              onClose={() => setIsSubjectOpen(false)}
            />
          </div>
        </PopupAction>
      )}

      <Btn2Popup
        isOpen={isExitPopupOpen}
        setIsOpen={setIsExitPopupOpen}
        type="exit"
        onConfirm={handleExitConfirm}
      />
    </Box>
  );
}

export default CmNewPost;