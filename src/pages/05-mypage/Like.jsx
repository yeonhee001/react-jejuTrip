import React, { useEffect, useState } from 'react';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import HeartStrokeRedn from '../../component/icons/Heart_stroke_red';
import HeartFillRedn from '../../component/icons/Heart_fill_red';
import NoLikePlace from '../../component/_common/NoLikePlace';
import NoLikePost from '../../component/_common/NoLikePost';
import '../../styles/05-mypage/like.scss';
import PlaceItem from '../../component/_common/PlaceItem';
import { shopNfoodNparty } from '../../api';


function Like() {
  const [selectedTab, setSelectedTab] = useState(0);  // 탭 상태
  const [likedItems, setLikedItems] = useState({});  // 좋아요 상태
  const postList = [];   // 게시물 리스트를 빈 배열로 설정

  const [likePosts, setLikePosts] = useState([]); // 좋아요 누른 게시물들 가져오기
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;

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

  const {shopNfoodNpartyData, fetchCategory} = shopNfoodNparty();
  useEffect(()=>{
    fetchCategory('c1'); //관광지
    fetchCategory('c2'); //쇼핑
    fetchCategory('c4'); //맛집
    fetchCategory('c5'); //축제행사
  },[])
  const tourList = shopNfoodNpartyData?.tour;
  const shoppingList = shopNfoodNpartyData?.shopping;
  const foodList = shopNfoodNpartyData?.food;
  const festivalList = shopNfoodNpartyData?.festival;

  const allContents = [
    ...(tourList || []), 
    ...(shoppingList || []), 
    ...(foodList || []), 
    ...(festivalList || [])
  ];
  
  useEffect(()=>{
    const userLikePost = async ()=>{
      const res = await fetch(`http://localhost:4000/triplike/liked-posts?userId=${userId}`);
      console.log(myLikedData);
      const data = await res.json();
      setLikePosts(data.likedPostIds);
    };
    if(userId) userLikePost();
  },[userId])

  
  const myLikedData = allContents.filter(item => likePosts.includes(item.contentsid));
 
  return (
    <div className="like-page">
      <TabPage type={'like'} onTabChange={setSelectedTab} />

      {selectedTab === 0 ? (
        myLikedData.length === 0 ? (
          <NoLikePost />  // 게시물 리스트가 비어있을 때 NoLikePost 컴포넌트
        ) : (
          myLikedData.map(item => (
            <PlaceItem key={item.contentsid}
            imgpath={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'}
            title={item.title}
            roadaddress={item.roadaddress || '주소 정보가 없습니다.'}
            tag={item.tag}
            heartType={'red-fill'}/>
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
