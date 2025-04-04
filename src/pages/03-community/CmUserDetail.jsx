import React, { useState } from 'react'
import dayjs from "dayjs";
import CmDetail from '../../component/03-community/CmDetail'
import CmComment from '../../component/03-community/comment/CmComment';
import  Dot  from '../../component/icons/Dot';

const init = [
  {
    id: 1,
    userId: 'sdf',
    username: "홍길동동",
    text: '내용.....ㄴㅇㄹㄴㅇㄹㄴㄹ..',
    timestamp: dayjs().format("YYYY.MM.DD HH:mm"),
  },
  {
    id: 2,
    userId: 'sdf22',
    username: "홍길동2",
    text: '내용.....ㄴㅇㄹㄴㅇㄹㄴㄹ..',
    timestamp: dayjs().format("YYYY.MM.DD HH:mm"),
  }
];

function CmUserDetail() {

  // 로그인한 사용자 ID 가져오기
  const loggedInUserId = localStorage.getItem("userId");  
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [comments, setComments] = useState(init);

  console.log(comments)

  const handleDotClick = () => {
    setShowDeleteBtn((prev) => !prev);
  };
    

  return (
    <div className="p-4">
      <CmDetail>
        <div className="interaction-container">
          <span className="vote-text"> 좋아요 0</span>
          <span className="comment-text"> 댓글 2</span>
          <div className="dot" onClick={handleDotClick}>
            <Dot className={"dot-icon"} />
          </div>
        </div>
      </CmDetail>

      {/* 댓글 기능 */}
      <CmComment comments={comments} setComments={setComments} showDeleteBtn={showDeleteBtn} loggedInUserId={loggedInUserId} />

      {/* 로그인한 사용자 ID와 작성자 ID가 일치한다고 가정하여 항상 버튼 표시 */}
      <div className="cusor">
        <div className="comment-actions">
          <span className="cursor-pointer1" >수정</span>
          <span className="cursor-pointer2">삭제</span>
        </div>
      </div>
    </div>
  );
}

export default CmUserDetail;