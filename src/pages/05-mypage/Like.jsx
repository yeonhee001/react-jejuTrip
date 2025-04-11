import React, { useState } from 'react';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import HeartStrokeRedn from '../../component/icons/Heart_stroke_red';
import HeartFillRedn from '../../component/icons/Heart_fill_red';
import NoLikePlace from '../../component/_common/NoLikePlace';
import NoLikePost from '../../component/_common/NoLikePost';
import '../../styles/05-mypage/like.scss';

function Like() {
  const [selectedTab, setSelectedTab] = useState(0);  // 탭 상태
  const [likedItems, setLikedItems] = useState({});  // 좋아요 상태
  const placeList = [];  // 장소 리스트를 빈 배열로 설정
  const postList = [];   // 게시물 리스트를 빈 배열로 설정

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}:${mm}:${dd} ${hh}:${mi}`;
  };

  return (
    <div className="like-page">
      <TabPage type={'like'} onTabChange={setSelectedTab} />
      <TabItem />

      {selectedTab === 0 ? (
        placeList.length === 0 ? (
          <NoLikePlace />  // 장소 리스트가 비어있을 때 NoLikePlace 컴포넌트
        ) : (
          placeList.map(item => (
            <div className="like-item" key={item.id}>
              <img src={item.imgPath} alt={item.title} className="like-img" />
              <div className="like-info">
                <h3>{item.title}</h3>
                <p className="like-date">{getFormattedDateTime()}</p>
              </div>
              <div className="like-heart" onClick={() => toggleLike(item.id)}>
                {likedItems[item.id] ? <HeartFillRedn /> : <HeartStrokeRedn />}
              </div>
            </div>
          ))
        )
      ) : (
        postList.length === 0 ? (
          <NoLikePost />  // 게시물 리스트가 비어있을 때 NoLikePost 컴포넌트
        ) : (
          postList.map(post => (
            <div className="like-post" key={post.id}>
              <div className="post-content">{post.content}</div>
              <div className="like-heart" onClick={() => toggleLike(post.id)}>
                {likedItems[post.id] ? <HeartFillRedn /> : <HeartStrokeRedn />}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Like;
