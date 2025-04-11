import React, { useState } from 'react'
import TabItem from '../../component/_common/TabItem';
import TabPage from '../../component/_common/TabPage';
import "../../styles/05-mypage/activity.scss";
import NoWritePost from '../../component/_common/NoWritePost';
import NoWriteReply from '../../component/_common/NoWriteReply';

function Activity() {
  const [selectedTab, setSelectedTab] = useState(0);

  // test data
  const tabContent = [
    [
      { id: 1, imgUrl: '/imgs/home_trippeople_01.png', title: '떠나톡 게시물 1', dateTime: '2025.04.01 14:05' },
      { id: 2, imgUrl: '/imgs/weather_cloudy_01.png', title: '떠나톡 게시물 2', dateTime: '2025.04.02 10:30' },
      { id: 3, imgUrl: '', title: '떠나톡 게시물 3', dateTime: '2025.04.03 18:20' }, // 이미지 없는 경우
      { id: 4, imgUrl: '', title: '떠나톡 게시물 4', dateTime: '2025.04.05 18:22' },
    ],
    [
      { id: 101, title: '떠나봅서 자주 묻는 질문에 있어요!', dateTime: '2025.04.01 14:05', postTitle: '제주도 궁금해요' },
      { id: 102, title: '그런 건 직접 알아보는 게 좋을 것 같아요.', dateTime: '2025.04.02 10:30', postTitle: '2박3일 가는데 여행경비 얼마나 들까요?' },
      { id: 103, title: '사진이 멋지네요! 멋지네요! 사진이 멋지네요! 멋지네요! 사진이 멋지네요! 멋지네요! 저도 먹고 싶어요.', dateTime: '2025.04.03 18:20', postTitle: '제주도 맛집 추천해드릴게요' },
      { id: 104, title: '저도 먹고 싶어요.....', dateTime: '2025.04.03 18:20', postTitle: '제주도 어때요' },
    ]
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return tabContent[0].length > 0
          ? tabContent[0].map((item) => (
            <TabItem
              key={item.id}
              title={item.title} 
              dateTime={item.dateTime} 
            />
          ))
          : <NoWritePost/>
      case 1:
        return tabContent[1].length > 0
        ? tabContent[1].map((item) => (
          <TabItem
            key={item.id}
            title={item.title} 
            dateTime={item.dateTime}
            postTitle={item.postTitle}
          />
        ))
        : <NoWriteReply/>
    }
  };
  

  return (
    <div>
      <TabPage type='activity' onTabChange={setSelectedTab}/>

      <div className='tab-content'>
        {renderContent()}
        {/* {
          selectedTab === 0
          ?
          // 게시물
          tabContent[0]?.map((item) => (
            <TabItem 
              key={item.id} 
              imgUrl={item?.imgUrl} 
              title={item.title} 
              dateTime={item.dateTime} 
            />
          ))
          :
          // 댓글
          tabContent[1]?.map((item) => (
            <CmtItem
              key={item.id} 
              title={item.title} 
              dateTime={item.dateTime} 
              postTitle={item.postTitle} 
            />
          ))
        }*/}
      </div>
    </div>
  )
} 

export default Activity 