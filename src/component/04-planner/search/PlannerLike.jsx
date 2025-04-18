import React, { useEffect, useState } from 'react'
import { plan, shopNfoodNparty } from '../../../api';
import NoLikePlace from '../../_common/NoLikePlace';
import Button from '../../_common/Button';
import Btn1Popup from '../../popups/Btn1Popup';
import PlannerLikeItem from './PlannerLikeItem';
import { useLocation, useNavigate } from 'react-router-dom';

function PlannerLike() {
    const { planData, LikeData } = plan();
    const [likePosts, setLikePosts] = useState([]); // 좋아요 누른 게시물들 가져오기
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user?.id;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [checkItem, setCheckItem] = useState([]);
  
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
    
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/").filter(Boolean)
    const idx = path[4]
    
    useEffect(()=>{
      const userLikePost = async ()=>{
        const res = await fetch(`http://localhost:4000/triplike/liked-posts?userId=${userId}`);
        console.log(myLikedData);
        const data = await res.json();
        setLikePosts(data.likedPostIds);
      };
      if(userId) userLikePost();
    },[userId])
  
    const clickbtn = (item) => {
      const selectList = {
        "contents_id": item.contentsid,
        "contents_label": item.contentscd.label,
        "title": item.title,
        "road_address": item.roadaddress,
        "introduction": item.introduction,
        "latitude": item.latitude,
        "longitude": item.longitude
        }
      setCheckItem((prev) => {
          const exists = prev.some((i) => i.contents_id === item.contentsid);

          return exists
              ? prev.filter((i) => i.contents_id !== item.contentsid) // 체크 해제
              : [...prev, selectList]; // 체크
      });
  }

  const myLikedData = allContents.filter(item => likePosts.includes(item.contentsid));
    
  return (
    myLikedData.length === 0 ? (
        <NoLikePlace/>  // 게시물 리스트가 비어있을 때 NoLikePlace 컴포넌트
      ) : (
        <>
          {myLikedData.map((item, idx) => (
              <PlannerLikeItem
              item={item}
              idx={idx}
              setCheckItem={setCheckItem}
              checkItem={checkItem}
              clickbtn={clickbtn}
              />
            ))
          }

          <button 
          className='place_btn' 
          onClick={() => {
            LikeData(checkItem, idx);
            navigate(-1);
          }}>
              <Button 
              btn={ `선택 완료 / ${checkItem.length}개`} 
              className={"place_btn"}/></button>

          <Btn1Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={"select"}/>
        </>     
      )
  )
}

export default PlannerLike