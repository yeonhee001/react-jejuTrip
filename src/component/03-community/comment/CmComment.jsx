import React, { useState, useRef } from "react";
import Cicle from "../../icons/Cicle";
import ChCicle from "../../icons/ChCicle"; 
import CmDeleteBtn from "../CmDeleteBtn";
import dayjs from "dayjs";

const CmComment = ({ showDeleteBtn, comments, setComments }) => {

  const [newComment, setNewComment] = useState("");
  const deleteBtnRef = useRef(null);
  const [activeCircleCommentIds, setActiveCircleCommentIds] = useState([]); // ✅ 배열로 변경
  const loggedInUserId = localStorage.getItem("userId");

  
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      userId: loggedInUserId,
      username: "사용자",
      text: newComment,
      timestamp: dayjs().format("YYYY.MM.DD HH:mm"),
    };

    setComments((prevComments) => [...prevComments, newCommentData]);
    setNewComment("");
  };


  const handleClickOutside = (event) => {
    // if (deleteBtnRef.current && !deleteBtnRef.current.contains(event.target)) {
    //   setShowDeleteBtn(false);
    // }
  };

  
  // 중복 선택 가능하도록 변경
  const toggleCircleIcon = (commentId) => {
    setActiveCircleCommentIds((prevIds) =>
      prevIds.includes(commentId)
        ? prevIds.filter((id) => id !== commentId)
        : [...prevIds, commentId]
    );
  };


  return (
    <div>
        <div className="divider" />
        <div className="comment">댓글</div>

        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-line">
                <span className="comment-username">{comment.username}</span>
              </div>
              <div className="comment-line">
                <p className="comment-text2">{comment.text}</p>
                <div onClick={() => toggleCircleIcon(comment.id)} >
                  {
                    showDeleteBtn && (
                      activeCircleCommentIds.includes(comment.id) ? (
                        <ChCicle className="circle-icon" />
                      ) : (
                        <Cicle className="circle-icon" />
                      )
                    )
                  }

                  x
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input-container">
          <textarea
            className="comment-input"
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="comment-submit-btn" onClick={handleCommentSubmit}>
            등록
          </button>
        </div>

        {showDeleteBtn && (
          <div ref={deleteBtnRef} className="delete-btn-container">
            <CmDeleteBtn onClick={() => {}} />
          </div>
        )}
    </div>
  );
};

export default CmComment;