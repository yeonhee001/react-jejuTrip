import React, { useEffect, useState } from 'react';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import HeartStrokeRedn from '../../component/icons/Heart_stroke_red';
import HeartFillRedn from '../../component/icons/Heart_fill_red';
import NoLikePlace from '../../component/_common/NoLikePlace';
import NoLikePost from '../../component/_common/NoLikePost';
import '../../styles/05-mypage/like.scss';
import axios from 'axios';
import { shopNfoodNparty } from '../../api';
import PlaceItem from '../../component/_common/PlaceItem';
import { useNavigate } from 'react-router-dom'


function Like() {
  const navi = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0); // 현재 선택된 탭 상태
  const [likedItems, setLikedItems] = useState({}); // 좋아요 상태 관리
  const [likePosts, setLikePosts] = useState([]); // 좋아요 누른 게시물들 가져오기
  const [likeBoard, setLikeBoard] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;



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
      const res = await fetch(`${process.env.REACT_APP_APIURL}/triplike/liked-posts?userId=${userId}`);
      const data = await res.json();
      setLikePosts(data.likedPostIds);

      const res2 = await fetch(`${process.env.REACT_APP_APIURL}/like/user-liked?userId=${userId}`);
      const data2 = await res2.json();
      
      setLikeBoard(data2.likedPosts);




    };
    if(userId) userLikePost();
  },[userId])


  // 좋아요 상태를 토글하는 함수
  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id] // 좋아요 상태 반전
    }));
  };

  const myLikedData = allContents.filter(item => likePosts.includes(item.contentsid));
// console.log(
//   likeBoard
// )
//   if(!likeBoard.length) return;

//   console.log(likeBoard)
  return (
    <div className="like-page">
      <TabPage type="like" onTabChange={setSelectedTab} />
      
      {selectedTab === 0 ? (
        myLikedData.length === 0 ? (
          <NoLikePlace />
        ) : (
          myLikedData.map(item => {
            let type;
            switch(item.contentscd.value){
              case 'c1' : type='tour'; break;
              case 'c2' : type='shopping'; break;
              case 'c4' : type='food'; break;
              case 'c5' : type='festival'; break;
            }
            return <div onClick={()=>{navi(`/trip/triplist/${type}/tripdetail/${item.contentsid}`);}}>
            <PlaceItem key={item.contentsid}
            imgpath={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'}
            title={item.title}
            roadaddress={item.roadaddress || '주소 정보가 없습니다.'}
            tag={item.tag}
            heartType={'red-fill'}/>
            </div>
          })
        )
      ) : (
        likeBoard.length === 0 ? (
          <NoLikePost />
        ) : (
          likeBoard.map(item => (
            <div className="like-post" key={item.post._id} onClick={()=>{ 
              localStorage.post = JSON.stringify(item.post);
              navi(`/community/cmdetail/${item.post._id}`);
            }}>
              <div className="post-content">
                <img src={item.post.imageUrls} alt="" />
                제목 : {item.post.title}<br/>
                내용 : {item.post.description}
              </div>
              <div className="like-heart" onClick={() => toggleLike(item.post._id)}>
                {likedItems[item.post._id] ? <HeartFillRedn /> : <HeartStrokeRedn />}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Like;