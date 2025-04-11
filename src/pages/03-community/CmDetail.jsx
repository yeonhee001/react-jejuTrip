import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Detail from '../../component/03-community/CmDetail';
import CmComment from '../../component/03-community/comment/CmComment';
import Dot from '../../component/icons/Dot';
import Heart_fill_red from '../../component/icons/Heart_fill_red';
import Heart_stroke_red from '../../component/icons/Heart_stroke_red';
import Comment from '../../component/icons/Comment';
import "../../styles/03-community/cmDetail.scss";
import Btn2Popup from '../../component/popups/Btn2Popup';

const init = [];

function CmDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;
  const loggedInUserId = localStorage.getItem("userId") || "test-user-123";

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [comments, setComments] = useState(init);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);  // 삭제 팝업 상태 추가

  const handleDotClick = () => {
    setShowDeleteBtn((prev) => !prev);
  };

  const handleLikeClick = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prevCount) => newLiked ? prevCount + 1 : prevCount - 1);

    try {
      await fetch("http://localhost:4000/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
          userId: loggedInUserId,
          liked: newLiked,
        }),
      });
      // 좋아요 상태를 localStorage에 저장
      localStorage.setItem(`liked-${post._id}`, JSON.stringify(newLiked));
    } catch (error) {
      console.error("좋아요 서버 요청 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/post/${post._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate("/community"); // 게시물 삭제 후 게시물 목록으로 이동
      } else {
        console.error("게시물 삭제 실패");
      }
    } catch (error) {
      console.error("서버 요청 실패:", error);
    }
  };

  // 좋아요 상태와 수 불러오기
  useEffect(() => {
    if (!post || !loggedInUserId) return;

    // localStorage에서 좋아요 상태 불러오기
    const savedLiked = JSON.parse(localStorage.getItem(`liked-${post._id}`)) || false;
    setLiked(savedLiked);

    // 서버에서 좋아요 수 불러오기
    fetch(`http://localhost:4000/like/count?postId=${post._id}`)
      .then(res => res.json())
      .then(data => {
        setLikeCount(data.count);
      })
      .catch(err => console.error("좋아요 수 불러오기 실패:", err));
  }, [post, loggedInUserId]);

  if (!post) {
    return <div className="p-4">잘못된 접근입니다. 게시글 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <Detail post={post}>
        <div className="interaction-container">
          <div className="like-group" onClick={handleLikeClick}>
            {liked ? <Heart_fill_red className={"user-heart"} /> : <Heart_stroke_red className={"user-heart2"} />}
            <span className="like-count">
              {likeCount === 0 ? "좋아요" : likeCount}
            </span>
          </div>
          <div className="comment-group">
            <Comment className={"user-commnet"} />
            <span className="comment-count">
              {comments.length === 0 ? "댓글" : comments.length}
            </span>
          </div>
          <div className="dot" onClick={handleDotClick}>
            <Dot className={"user-dot"} />
          </div>
        </div>
      </Detail>

      <CmComment
        postId={post._id}
        comments={comments}
        setComments={setComments}
        showDeleteBtn={showDeleteBtn}
        setShowDeleteBtn={setShowDeleteBtn}
      />

      <div className="cusor">
        <div className="comment-actions">
          <span
            className="cursor-pointer1"
            onClick={() => navigate("/community/cmeditpage", { state: { post } })}
          >
            수정
          </span>
          <span
            className="cursor-pointer2"
            onClick={() => setIsDeletePopupOpen(true)} 
          >
            삭제
          </span>
        </div>
      </div>

      <Btn2Popup
        isOpen={isDeletePopupOpen}
        setIsOpen={setIsDeletePopupOpen}
        type="delete"
        onConfirm={handleDelete} // 예 버튼 클릭 시 handleDelete 실행
      />
    </div>
  );
}

export default CmDetail;