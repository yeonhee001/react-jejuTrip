import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";  
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Right_black from "../../icons/Right_black";
import Photo from "../../icons/Photo";
import Warning from "../../icons/Warning";
import Close from "../../icons/Close";
import CmSubject from "../cmSubject";
import Btn2Popup from "../../popups/Btn2Popup";

function CmEditPost({ postData, onClose = () => {}, onSubmit }) {
  const { control, setFocus, handleSubmit, reset } = useFormContext();
  const navigate = useNavigate();  
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("주제선택");
  const [showSubjectAlert, setShowSubjectAlert] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  useEffect(() => {
    if (postData) {
      reset({
        title: postData.title,
        description: postData.description,
      });
      setSelectedItem(postData.subject || "주제선택");
    }
  }, [postData, reset]);

  const title = useWatch({ control, name: "title" });
  const description = useWatch({ control, name: "description" });

  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    let shouldShowAlert = false;

    if (selectedItem === "주제선택") {
      setShowSubjectAlert(true);
      shouldShowAlert = true;
    } else {
      setShowSubjectAlert(false);
    }

    handleSubmit((data) => {
      if (!shouldShowAlert && onSubmit) {
        const updatedPost = {
          ...postData,
          title: data.title,
          description: data.description,
          subject: selectedItem,
          updatedAt: new Date().toISOString(),
        };
        onSubmit(updatedPost); // Call parent handler
        reset();
        onClose();
      }
    })();
  };

  const handleCloseClick = () => {
    const isDirty =
      title !== postData?.title ||
      description !== postData?.description ||
      selectedItem !== postData?.subject;

    if (isDirty) {
      setIsExitPopupOpen(true);
    } else {
      navigate(`/community/cmdetail/${postData?.id}`);
    }
  };

  const handleExitConfirm = () => {
    setIsExitPopupOpen(false);
    reset();
    navigate(`/community/cmdetail/${postData?.id}`);
  };

  return (
    <Box className="container">
      <Box className="header1">
        <div onClick={handleCloseClick}>
          <Close className={"Cm-closeIcon"} />
        </div>
        <button className="submitButton" onClick={handleSubmitWrapper}>
          등록
        </button>
      </Box>

      <Typography className="newtitle" variant="h4" gutterBottom>
        게시물 수정
      </Typography>

      {showSubjectAlert && (
        <div className="alertBox">
          <Warning className={"alertIcon"} />
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
          <Right_black className={"nw-Right"} />
        </Box>
        <Box className="divider" />
      </Box>

      <Box className="photoContainer">
        <Box className="photoBox">
          <Photo className={"nw-photo"} />
        </Box>
      </Box>

      <Box className="divider" />

      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setFocus("description");
              }
            }}
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
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
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
              setSelectedItem={(item) => {
                setSelectedItem(item);
                setShowSubjectAlert(false);
              }}
              onClose={() => setIsSubjectOpen(false)}
            />
          </div>
        </div>
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

export default CmEditPost;