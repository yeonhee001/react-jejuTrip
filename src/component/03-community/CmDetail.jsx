import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Dot from "../icons/Dot";
import Cicle from "../icons/Cicle";
import ChCicle from "../icons/ChCicle"; 
import CmDeleteBtn from "./CmDeleteBtn";

const CmDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const deleteBtnRef = useRef(null);
  const [activeCircleCommentIds, setActiveCircleCommentIds] = useState([]); // ✅ 배열로 변경

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!post) {
      const storedPost = localStorage.getItem("selectedPost");
      if (storedPost) {
        setPost(JSON.parse(storedPost));
      }
    }
  }, [post]);

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

  const handleDotClick = () => {
    setShowDeleteBtn((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (deleteBtnRef.current && !deleteBtnRef.current.contains(event.target)) {
      setShowDeleteBtn(false);
    }
  };


  // 중복 선택 가능하도록 변경
  const toggleCircleIcon = (commentId) => {
    setActiveCircleCommentIds((prevIds) =>
      prevIds.includes(commentId)
        ? prevIds.filter((id) => id !== commentId)
        : [...prevIds, commentId]
    );
  };

  if (!post) {
    return <p className="error-message">게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="cm-detail-container">
      <h2 className="title">새 게시물 2</h2>
      <div className="author-info">
        <div className="nickname">새 사용자</div>
        <p className="date-text">2025.04.03 15:47</p>
      </div>
      <p className="description">새로운 게시물이 추가되었습니다.</p>
      <img src="" width="400" />

      <div className="interaction-container">
        <span className="vote-text"> 좋아요 0</span>
        <span className="comment-text"> 댓글 2</span>
        <div className="dot" onClick={handleDotClick}>
          <Dot className={"dot-icon"} />
        </div>
      </div>

      {showDeleteBtn && (
        <div ref={deleteBtnRef} className="delete-btn-container">
          <CmDeleteBtn onClick={() => {}} />
        </div>
      )}

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
              <div onClick={() => toggleCircleIcon(comment.id)}>
                {activeCircleCommentIds.includes(comment.id) ? (
                  <ChCicle className="circle-icon" />
                ) : (
                  <Cicle className="circle-icon" />
                )}
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
    </div>
  );
};

export default CmDetail;