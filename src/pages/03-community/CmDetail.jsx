import React, { useState } from 'react'
import dayjs from "dayjs";
import CmDetail2 from '../../component/03-community/CmDetail'
import CmComment from '../../component/03-community/comment/CmComment';
import  Dot  from '../../component/icons/Dot';

const init = [
  {
    id: Date.now(),
    userId: 'sdf',
    username: "홍길동동",
    text: '내용.....ㄴㅇㄹㄴㅇㄹㄴㄹ..',
    timestamp: dayjs().format("YYYY.MM.DD HH:mm"),
  },
  {
    id: Date.now(),
    userId: 'sdf22',
    username: "홍길동2",
    text: '내용.....ㄴㅇㄹㄴㅇㄹㄴㄹ..',
    timestamp: dayjs().format("YYYY.MM.DD HH:mm"),
  }
];


function CmDetail() {

    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [comments, setComments] = useState(init);

    console.log(comments)

    const handleDotClick = () => {
      setShowDeleteBtn((prev) => !prev);
    };
  
  return (
    <div>
      <CmDetail2  />

     

      <CmComment comments={comments} setComments={setComments} showDeleteBtn={showDeleteBtn}/>
    </div>
  )
}
export default CmDetail