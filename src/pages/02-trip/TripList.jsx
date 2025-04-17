import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceItem from '../../component/_common/PlaceItem'
import TripFilter from '../../component/02-trip/tripList/TripFilter'
import "../../styles/02-trip/tripList.scss";
import { shopNfoodNparty, tour } from '../../api';

function TripList() {

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const type = pathParts[3]; // 항상 이 위치가 type임

  const listNavigate = useNavigate();
  
  const [listMainImg, setListMainImg] = useState(null); // 트립 리스트 메인이미지에서 랜덤값 뽑기

  const [listCount, setListCount] = useState(30); // 리스트 갯수 처음 30개만 보임
  
  const [filterOption, setFilterOption] = useState('오름차순');

  const {tripData, fetchTourData} = tour();
  const {shopNfoodNpartyData, fetchCategory} = shopNfoodNparty();
  // api호출로 받아오는 데이터, 데이터를 가져오는 액션 함수
  
  const tripTypes = ['tour', 'food', 'festival', 'shopping'];

  
  useEffect(()=>{
    if(type==='tour'){
      fetchTourData();
    } else if(type==='food'){
      fetchCategory('c4');
    } else if(type==='festival'){
      fetchCategory('c5');
    } else if(type==='shopping'){
      fetchCategory('c2');
    }
    window.scrollTo(0,0);
  },[type])
  
  const textTypeInfo = {
    tour: {
      title: "관광지",
      subtitle: "제주 여행 트렌드를 한눈에!",
      intro: "핫플부터 숨은 명소까지",
      imgs: [
        "/imgs/trip_tour_01.jpg",
        "/imgs/trip_tour_02.jpg",
        "/imgs/trip_tour_03.jpg"
      ]
    },
    food: {
      title: "맛집",
      subtitle: "제주도민이 인정한 맛집",
      intro: "맛 따라 떠나는 제주",
      imgs: [
        "/imgs/trip_food_01.jpg",
        "/imgs/trip_food_02.jpg",
        "/imgs/trip_food_03.jpg"
      ]
    },
    festival: {
      title: "축제&행사",
      subtitle: "놓치면 아쉬운 축제&행사",
      intro: "지금 주목해야 할 제주",
      imgs: [
        "/imgs/trip_festival_01.jpg",
        "/imgs/trip_festival_02.jpg",
        "/imgs/trip_festival_03.jpg"
      ]
    },
    shopping: {
      title: "소품샵&갤러리",
      subtitle: "감성가득! 소품샵&갤러리",
      intro: "특별한 감성 공간",
      imgs: [
        "/imgs/trip_shopping_01.jpg",
        "/imgs/trip_shopping_02.jpg",
        "/imgs/trip_shopping_03.jpg"
      ]
    }
  };
  
  useEffect(()=>{
    const storageKey = `tripListImg_${type}`;
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    const saveImg = localStorage.getItem(storageKey);

    if(saveImg){
      try{
        const parsedImg = JSON.parse(saveImg);
        const {listImg, createdAt} = parsedImg;
        if (createdAt && now - createdAt < oneDay){
          setListMainImg(listImg);
          return;
        }
      } catch (e) {
        console.error("로컬스토리지 파싱 오류", e);
        localStorage.removeItem(storageKey);
      }
    }

    const listMainImg = textTypeInfo[type]?.imgs || [];
    const randomIndex = Math.floor(Math.random() * listMainImg.length); // 0-1사이 숫자에서 length값 곱하면 항상 0,1,2만 나옴
    const selected = listMainImg[randomIndex]; // 골라낸 값을 리턴
    setListMainImg(selected);
    const createdAt = new Date().getTime(); //현재 시각ms
    localStorage.setItem(storageKey, JSON.stringify({listImg: selected, createdAt})); // sliceFood, mainFoodPick은 배열이니까 쿠키에 직접 저장이 되지 않아 문자열로 변경하여 저장
  },[type])

  useEffect(()=>{
    const handleScroll=()=>{
      const scrollY = window.scrollY; // 스크롤의 상단 값
      const windowHeight = window.innerHeight; // 한 화면에서 보여지는 브라우저 화면 높이
      const fullHeight = document.body.offsetHeight; // 전체 페이지 높이(스크롤포함)

      if(scrollY + windowHeight >= fullHeight-50) { // 사용자가 현재 보고 있는 화면의 가장 아래 위치 지점 >= 전체 페이지 바닥 -50px (바닥 근처에 왔을 때)
        setListCount((prev) => prev + 30);
      }
    };

    window.addEventListener('scroll', handleScroll); //스크롤 이벤트가 발생할 때마다 함수 실행
    return () => window.removeEventListener('scroll', handleScroll); //정리하기 : 스크롤 한번에 setListCount가 두세번 호출하지 않기 위해
  },[])

  if (!tripTypes.includes(type)) {
    return <div>다른 메뉴를 클릭해주세요.</div>;
  };

  const itemClick=(item)=>{
    const contentId = item.contents_id || item.contentsid;
    const filterList = getFilterData(); // 현재 필터링된 리스트
    listNavigate(`/trip/triplist/${type}/tripdetail/${contentId}`, {state: { filterList }});
  };

  const FilterChange=(option) => {
    setFilterOption(option); // 정렬 로직 적용
  };

  const getAllData=()=>{
    if(type === 'tour') return tripData;
    if(type === 'food') return shopNfoodNpartyData.food;
    if(type === 'festival') return shopNfoodNpartyData.festival;
    if(type === 'shopping') return shopNfoodNpartyData.shopping;
    return [];
  }

  const getFilterData=() => {
    const data = getAllData();

    const like = data.filter(item=> item.contents_id == "CONT_000000000500589");

    const sorted = [...data];
    if (filterOption === '오름차순') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterOption === '내림차순') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filterOption === '좋아요순') {
      sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return sorted;
  };



  return (
    <div className='trip-listpage'>
      <div className='trip-list-topimg'>
        <h2 className="trip-list-title"> {textTypeInfo[type].title} </h2>
        <img src={listMainImg} alt="img" />
      </div>

      <div className='trip-list-cont'>
        <div className='trip-list-cont-title'>
          <h3>{textTypeInfo[type].subtitle}</h3>
          <span>{textTypeInfo[type].intro}</span>
        </div>
        <TripFilter onFilterChange={FilterChange}/>
      </div>

      {
        getFilterData().slice(0, listCount).map((item)=>
          <div className='tripList' key={item.contents_id || item.contentsid} onClick={()=>itemClick(item)}>
            <PlaceItem imgpath={item.img_path || item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'} title={item.title} roadaddress={item.road_address || item.roadaddress || '현재 주소 정보가 비어 있어요. 확인 중입니다.'} tag={item.tag} heartType={"red-fill"}/>
          </div>
        )
      }
    </div>
  )
}

export default TripList


// function Tour(){
//   return(
//     <>
//       <Thumb state={false}/>
//     </>
//   )
// }


// function Thumb({state}){
//   return(
//     <>
//       {state && <Hart></Hart>}
//     </>
//   )
// }


// function Hart({children}){
//   function handle(){

//   }

//   return(
//     <div onClick={handle}>
//       {children}
//     </div>
//   )
// }