import React, { useState, useRef, useEffect } from "react";
import Cicle from "../../icons/Cicle";
import ChCicle from "../../icons/ChCicle";
import CmDeleteBtn from "../CmDeleteBtn";
import Send from "../../icons/Send";
import Btn2Popup from "../../popups/Btn2Popup";
import Btn1Popup from "../../popups/Btn1Popup";

const CmComment = ({ postId, showDeleteBtn, setShowDeleteBtn, comments, setComments }) => {
  const inputRef = useRef(null);
  const deleteBtnRef = useRef(null);
  const [activeCircleCommentIds, setActiveCircleCommentIds] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCommentIdToDelete, setSelectedCommentIdToDelete] = useState(null);
  const [isSelectPopupOpen, setIsSelectPopupOpen] = useState(false);

  const loggedInUserId = localStorage.getItem("userId") || "testUser123";
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/reply/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, setComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) return;

    const newCommentData = {
      postId,
      userId: loggedInUserId,
      username: "사용자",
      text: inputValue,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${BASE_URL}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });

      if (res.ok) {
        const savedComment = await res.json();
        setComments((prev) => [...prev, savedComment]);
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error("댓글 저장 실패:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`${BASE_URL}/reply/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentId));
        setShowDeleteBtn(false);
      }
    } catch (err) {
      console.error("댓글 삭제 중 오류:", err);
    }
  };

  const confirmDelete = () => {
    if (selectedCommentIdToDelete) {
      handleDeleteComment(selectedCommentIdToDelete); // 삭제 처리 함수 호출
      setSelectedCommentIdToDelete(null);
    }
    setIsDeletePopupOpen(false);
  };

  const toggleSelectComment = (commentId) => {
    setActiveCircleCommentIds((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleMultiDeleteClick = () => {
    if (activeCircleCommentIds.length === 0) {
      setIsSelectPopupOpen(true);
    } else {
      console.log("선택된 댓글 ID들:", activeCircleCommentIds);
      // 여기에서 실제 삭제 처리 구현 가능
    }
  };

  return (
    <div>
      <div className="divider" />
      <div className="comment">댓글</div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-line">
              <span className="comment-username">{comment.username}</span>
            </div>
            <div className="comment-line">
              <p className="comment-text2">{comment.text}</p>

              {showDeleteBtn ? (
                <div
                  className="co-circle"
                  onClick={() => toggleSelectComment(comment._id)}
                >
                  {activeCircleCommentIds.includes(comment._id) ? (
                    <ChCicle />
                  ) : (
                    <Cicle />
                  )}
                </div>
              ) : (
                <span
                  className="delete-text"
                  onClick={() => {
                    setSelectedCommentIdToDelete(comment._id);
                    setIsDeletePopupOpen(true);
                  }}
                >
                  삭제
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showDeleteBtn && (
        <div className="comment-input-container">
          <form onSubmit={handleCommentSubmit} className="searchbar">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              name="search"
              ref={inputRef}
            />
            <button type="submit">
              <Send className="send-btn" />
            </button>
          </form>
        </div>
      )}

      {showDeleteBtn && (
        <div ref={deleteBtnRef} className="delete-btn-container" onClick={handleMultiDeleteClick}>
          <CmDeleteBtn selectedCommentIds={activeCircleCommentIds} handleDeleteComment={handleDeleteComment} />
        </div>
      )}

      <Btn2Popup
        isOpen={isDeletePopupOpen}
        setIsOpen={setIsDeletePopupOpen}
        type="delete"
        onConfirm={confirmDelete} // 삭제 확인시 삭제 처리 함수 호출
      />

      <Btn1Popup
        isOpen={isSelectPopupOpen}
        setIsOpen={setIsSelectPopupOpen}
        type="select"
        onConfirm={() => setIsSelectPopupOpen(false)}
      />
    </div>
  );
};

export default CmComment;