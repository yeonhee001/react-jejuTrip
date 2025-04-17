import React, { useEffect, useState } from 'react'
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import CmtItem from '../../component/05-mypage/CmtItem';
import NoWritePost from '../../component/_common/NoWritePost';
import NoWriteReply from '../../component/_common/NoWriteReply';
import "../../styles/05-mypage/activity.scss";
import axios from 'axios';
import { format } from 'date-fns';

function Activity() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [postData, setPostData] = useState([]);
  const [cmtData, setcmtData] = useState([]);

  const userId = String(JSON.parse(sessionStorage.getItem('user'))?.id);

  // test data
  // const tabContent = [
  //   [
  //     { id: 1, imgUrl: '/imgs/home_trippeople_01.png', title: '떠나톡 게시물 1', dateTime: '2025.04.01 14:05' },
  //     { id: 2, imgUrl: '/imgs/weather_cloudy_01.png', title: '떠나톡 게시물 2', dateTime: '2025.04.02 10:30' },
  //     { id: 3, imgUrl: '', title: '떠나톡 게시물 3', dateTime: '2025.04.03 18:20' }, // 이미지 없는 경우
  //     { id: 4, imgUrl: '', title: '떠나톡 게시물 4', dateTime: '2025.04.05 18:22' },
  //   ],
  //   [
  //     { id: 101, title: '떠나봅서 자주 묻는 질문에 있어요!', dateTime: '2025.04.01 14:05', postTitle: '제주도 궁금해요' },
  //     { id: 102, title: '그런 건 직접 알아보는 게 좋을 것 같아요.', dateTime: '2025.04.02 10:30', postTitle: '2박3일 가는데 여행경비 얼마나 들까요?' },
  //     { id: 103, title: '사진이 멋지네요! 멋지네요! 사진이 멋지네요! 멋지네요! 사진이 멋지네요! 멋지네요! 저도 먹고 싶어요.', dateTime: '2025.04.03 18:20', postTitle: '제주도 맛집 추천해드릴게요' },
  //     { id: 104, title: '저도 먹고 싶어요.....', dateTime: '2025.04.03 18:20', postTitle: '제주도 어때요' },
  //   ]
  // ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return postData.length > 0
          ? postData.map((item, i) => (
            <TabItem
              key={i}
              imgUrl={item.imageUrls[0]}
              title={item.title} 
              dateTime={format(item.createdAt, 'yyyy.MM.dd')} 
            />
          ))
          : <NoWritePost/>
      case 1:
        return cmtData.length > 0
        ? cmtData.map((item, i) => (
          <CmtItem
            key={i}
            title={item.text} 
            dateTime={format(item.createdAt, 'yyyy.MM.dd')}
            postTitle={item.postTitle}
          />
        ))
        : <NoWriteReply/>
    }
  };
  

  // 서버 데이터 가져오기
  useEffect(()=>{
    // 게시물
    axios.get(`${process.env.REACT_APP_APIURL}/post/user/${userId}`)
    .then(res => {
      if(res.data && res.data.length > 0) {
        setPostData(res.data);
      } else {
        setPostData([]);
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setPostData([]);
      } else {
        console.error("Error fetching plan:", err);
      }
    });

    // 댓글
    axios.get(`${process.env.REACT_APP_APIURL}/reply/user/${userId}`)
    .then(async res => {
      if (res.data && res.data.length > 0) {
        const getCommentData = res.data;
  
        // 1. 중복 제거된 postId 배열 생성
        const uniquePostIds = [...new Set(getCommentData.map(item => item.postId))];
  
        // 2. postId -> postTitle 매핑 객체
        const postIdToTitle = {};
  
        await Promise.all(
          uniquePostIds.map(async (postId) => {
            try {
              const postRes = await axios.get(`${process.env.REACT_APP_APIURL}/post/update/${postId}`);
              postIdToTitle[postId] = postRes.data.title || '제목 없음';
            } catch (err) {
              console.error(`게시글 ${postId} 불러오기 실패`, err);
              postIdToTitle[postId] = '제목 없음';
            }
          })
        );
  
        // 3. 댓글 데이터에 postTitle 추가
        const updatedComments = getCommentData.map(comment => ({
          ...comment,
          postTitle: postIdToTitle[comment.postId] || '제목 없음',
        }));
  
        setcmtData(updatedComments);
      } else {
        setcmtData([]);
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setcmtData([]);
      } else {
        console.error("Error fetching plan:", err);
      }
    });
  },[userId])
  

  return (
    <div className='activity-page'>
      <TabPage type='activity' onTabChange={setSelectedTab}/>

      <div className='tab-content'>
        {renderContent()}
      </div>
    </div>
  )
} 

export default Activity 