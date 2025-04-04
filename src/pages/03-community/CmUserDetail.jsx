import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CmDetail from '../../component/03-community/CmDetail';
import CmComment from '../../component/03-community/comment/CmComment';
import "../../styles/03-community/cmUserDetail.scss";

function CmUserDetail() {
  const navigate = useNavigate();
  const postId = 1; // 실제 게시물 ID를 동적으로 가져와야 함
  const [authorId, setAuthorId] = useState(null);
  const [comments, setComments] = useState([]);

  // 로그인한 사용자 ID 가져오기
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      setAuthorId(data.authorId);
      setComments(data.comments || []);
    };

    fetchPostData();
  }, [postId]);

  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };

  return (
    <div className="p-4">
      <CmDetail />

      {/* 댓글 기능 */}
      <CmComment comments={comments} loggedInUserId={loggedInUserId} />

      {/* 로그인한 사용자 ID와 작성자 ID가 일치한다고 가정하여 항상 버튼 표시 */}
      <div className="cusor">
        <div className="comment-actions">
          <span className="cursor-pointer1" onClick={handleEdit}>수정</span>
          <span className="cursor-pointer2">삭제</span>
        </div>
      </div>
    </div>
  );
}

export default CmUserDetail;