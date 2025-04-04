import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Heart_fill_white from '../../icons/Heart_fill_white';
import Heart_stroke_white from'../../icons/Heart_stroke_white';


const API_KEY = "57fd439ed04e408c935a985377cbaa41";
const API_URL = "http://api.visitjeju.net/vsjApi/contents/searchList";

function TripDetail() {
  const [trips, setTrips] = useState([]);
  const [likedItems, setLikedItems] = useState([]); // 좋아요 상태 관리
  useEffect(()=>{
    fetchDetailData();
  },[]);

  const fetchDetailData = async ()=>{
    try {
      const response2 = await axios.get(API_URL,{
        params:{
          apiKey:API_KEY,
          locale:"kr",
          category:"c2",
          page:1
        }
      });

      if (response2.data && response2.data.items.length>0) {
        setTrips(response2.data.items.slice(0,1));
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:",error);
    }
  };

  const toggleLike = (id) => {
    setLikedItems((prevLiked) =>
      prevLiked.includes(id)
        ? prevLiked.filter((item) => item !== id) // 이미 있으면 제거
        : [...prevLiked, id] // 없으면 추가
    );
  };

  if (trips.length === 0) {
    return <p>관광지 정보를 불러오는 중...</p>;
  }

  return (
    <div className="tripdetail">
      {trips.map((detail, index) => (
        <div className="detail" key={index}>
          <div className="detailimg">
            <img 
              src={detail.repPhoto?.photoid?.imgpath || "/imgs/default-image.jpg"} 
              onError={(e) => (e.target.src = "/imgs/default-image.jpg")}
              alt={detail.title}
            />
              <div
            className="tripdetailheart"
            onClick={() => toggleLike(detail.contentsid)}
            style={{ cursor: "pointer" }}
          >
            {likedItems.includes(detail.contentsid) ? (
              <Heart_fill_white />
            ) : (
              <Heart_stroke_white />
            )}
          </div>

          </div>
          <div className="tripdetailtxt">
            <h2>{detail.title}</h2>
            <p>{detail.roadaddress || "주소 정보 없음"}</p>
            <b>{detail.introduction || "정보 없음"}</b>
            <span>전화번호: {detail.phoneno || "전화 번호 없음"}</span>
          </div>

          
        </div>
      ))}
    </div>
  );
}

export default TripDetail