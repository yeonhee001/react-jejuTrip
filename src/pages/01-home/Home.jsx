import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { shopNfoodNparty, tour } from '../../api';
import MainItem from '../../component/01-home/MainItem'
import HomeTab from '../../component/01-home/HomeTab'
import HomeTrip from '../../component/01-home/HomeTrip'
import HomeFood from '../../component/01-home/HomeFood'
import HomePhoto from '../../component/01-home/HomePhoto'
import HomeContTop from '../../component/01-home/HomeContTop'

// Import Swiper styles
import "swiper/css";
import "../../styles/01-home/home.scss";

function Home() {

  const {tripData, fetchTourData} = tour();
  const {shopNfoodNpartyData, fetchCategory} = shopNfoodNparty();
  // api호출로 받아오는 데이터, 데이터를 가져오는 액션 함수
  useEffect(()=>{
    fetchTourData();
    fetchCategory('c2');
    fetchCategory('c4');
    fetchCategory('c5');
    window.scrollTo(0,0);
  },[])

  const shoppingList = shopNfoodNpartyData.shopping;
  const foodList = shopNfoodNpartyData.food;
  const festivalList = shopNfoodNpartyData.festival;

  const [mainTrip, setMainTrip] = useState(null); // 메인 슬라이드에서 여행지 부분 랜덤값 뽑기
  const [mainFood, setMainFood] = useState(null); // 메인 슬라이드에서 맛집 부분 랜덤값 뽑기
  const [mainFestival, setMainFestival] = useState(null); // 메인 슬라이드에서 축제 부분 랜덤값 뽑기
  const [mainShopping, setMainShopping] = useState(null); // 메인 슬라이드에서 쇼핑 부분 랜덤값 뽑기
  const [activeTrip, setActiveTrip] = useState(null); // 여행지에서 클릭했을 때 active 값을 넣기 위한 useState
  const [selectedTrips, setSelectedTrips] = useState([]); // 랜덤으로 뽑을 여행지 4개를 위한 useState
  const [selectedFoods, setSelectedFoods] = useState([]); // 랜덤으로 뽑을 맛집 6개를 위한 useState
  const navigate = useNavigate();
  
  // 메인트립 로컬스토리지 저장, 하루시간 설정 후 삭제되게 함
  useEffect(()=>{
    if (tripData && tripData.length > 0) {
      const saveTrip = localStorage.getItem('hometrip'); //-> 문자열(쿠키는 원래 문자열만 저장 가능)
      const now = new Date().getTime(); //현재 시간
      const oneDay = 24 * 60 * 60 * 1000; //24시간=86400000ms
      
      if (saveTrip) {
        try {
          const parsedTrip = JSON.parse(saveTrip); //저장된 값이 있으면 문자열을 객체로 변경
          const { slice, main, createdAt } = parsedTrip; // createdAt 저장 시간이 지났는지 확인하는 용

          const isValidTime = createdAt && now - createdAt < oneDay; // 저장시간이 24시간 이내인지 확인 (현재시간-저장시간)
          // const hasValidData = Array.isArray(slice) && slice.length > 0 && slice[0]?.contents_id; //오류방지용

          if (isValidTime) {
            // ⏳ 아직 하루 안 지났음 → 유효
            setMainTrip(main); // 랜덤으로 하나 뽑아서 저장
            setSelectedTrips(slice);
            setActiveTrip(slice[0].contents_id);
            return;
          } else {
            // 하루 지남 → 제거
            localStorage.removeItem('hometrip');
          }
        } catch (e) {
          console.error("로컬스토리지 파싱 오류", e);
          localStorage.removeItem('hometrip');
        }
      }
      // 여기로 오면 유효한 로컬스토리지 없고 새로 랜덤 생성
        const copyTripData = [...tripData].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞기 위해 sort함수에 넣어서 사용, 0-1사이 값을 주는데 -0.5를 하면 음수(앞으로) 양수(뒤로)값을 가지게 되어 순서가 바뀐다
        const sliceTrip = copyTripData.slice(0, 4);
        const mainTripPick = copyTripData[Math.floor(Math.random() * copyTripData.length)]; // 전체 데이터에서 랜덤으로 하나 선택
        setMainTrip(mainTripPick); // 랜덤으로 고른걸 메인슬라이드 이미지로 선택
        setSelectedTrips(sliceTrip); // 선택한 4개 여행지 저장
        setActiveTrip(sliceTrip[0].contents_id); // 첫번째 컨텐츠의 너비는 펼쳐진 상태로 하기 위해 tripData[0].id 적용
        
        const createdAt = new Date().getTime(); //현재 시각ms
        localStorage.setItem('hometrip', JSON.stringify({slice: sliceTrip, main: mainTripPick, createdAt})); // sliceTrip, mainTripPick은 배열이니까 쿠키에 직접 저장이 되지 않아 문자열로 변경하여 저장
    }

  }, [tripData]);

  // 메인푸드 로컬스토리지 저장, 하루시간 설정 후 삭제되게 함
  useEffect(()=>{
    if (foodList && foodList.length > 0) {
      const saveFood = localStorage.getItem('homefood'); //-> 문자열(쿠키는 원래 문자열만 저장 가능)
      const now = new Date().getTime(); //현재 시간
      const oneDay = 24 * 60 * 60 * 1000; //24시간=86400000ms
      
      if (saveFood) {
        try {
          const parsedFood = JSON.parse(saveFood); //저장된 값이 있으면 문자열을 객체로 변경
          const { slice, main, createdAt } = parsedFood; // createdAt 저장 시간이 지났는지 확인하는 용
          
          const isValidTime = createdAt && now - createdAt < oneDay; // 저장시간이 24시간 이내인지 확인 (현재시간-저장시간)
          // const hasValidData = Array.isArray(slice) && slice.length > 0 && slice[0]?.contents_id; //오류방지용
          
          if (isValidTime) {
            // ⏳ 아직 하루 안 지났음 → 유효
            setMainFood(main); // 랜덤으로 하나 뽑아서 저장
            setSelectedFoods(slice);
            return;
          } else {
            // 하루 지남 → 제거
            localStorage.removeItem('homefood');
          }
        } catch (e) {
          console.error("로컬스토리지 파싱 오류", e);
          localStorage.removeItem('homefood');
        }
      }
      // 여기로 오면 유효한 로컬스토리지 없고 새로 랜덤 생성
        const copyFoodData = [...foodList].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞기 위해 sort함수에 넣어서 사용, 0-1사이 값을 주는데 -0.5를 하면 음수(앞으로) 양수(뒤로)값을 가지게 되어 순서가 바뀐다
        const sliceFood = copyFoodData.slice(0, 6);
        const mainFoodPick = copyFoodData[Math.floor(Math.random() * copyFoodData.length)]; // 전체 데이터에서 랜덤으로 하나 선택
        setMainFood(mainFoodPick); // 랜덤으로 고른걸 메인슬라이드 이미지로 선택
        setSelectedFoods(sliceFood); // 선택한 6개 여행지 저장
        const createdAt = new Date().getTime(); //현재 시각ms
        localStorage.setItem('homefood', JSON.stringify({slice: sliceFood, main: mainFoodPick, createdAt})); // sliceFood, mainFoodPick은 배열이니까 쿠키에 직접 저장이 되지 않아 문자열로 변경하여 저장
    }

  }, [foodList]);

  // 메인페스티벌 로컬스토리지 저장, 하루시간 설정 후 삭제되게 함
  useEffect(()=>{
    if (festivalList && festivalList.length > 0) {
      const saveFestival = localStorage.getItem('homefestival'); //-> 문자열(쿠키는 원래 문자열만 저장 가능)
      const now = new Date().getTime(); //현재 시간
      const oneDay = 24 * 60 * 60 * 1000; //24시간=86400000ms
      
      if (saveFestival) {
        try {
          const parsedFood = JSON.parse(saveFestival); //저장된 값이 있으면 문자열을 객체로 변경
          const { main, createdAt } = parsedFood; // createdAt 저장 시간이 지났는지 확인하는 용
          
          const isValidTime = createdAt && now - createdAt < oneDay; // 저장시간이 24시간 이내인지 확인 (현재시간-저장시간)
          // const hasValidData = Array.isArray(slice) && slice.length > 0 && slice[0]?.contents_id; //오류방지용
          
          if (isValidTime) {
            // ⏳ 아직 하루 안 지났음 → 유효
            setMainFestival(main); // 랜덤으로 하나 뽑아서 저장
            return;
          } else {
            // 하루 지남 → 제거
            localStorage.removeItem('homefestival');
          }
        } catch (e) {
          console.error("로컬스토리지 파싱 오류", e);
          localStorage.removeItem('homefestival');
        }
      }
      // 여기로 오면 유효한 로컬스토리지 없고 새로 랜덤 생성
        const copyFestivalData = [...festivalList].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞기 위해 sort함수에 넣어서 사용, 0-1사이 값을 주는데 -0.5를 하면 음수(앞으로) 양수(뒤로)값을 가지게 되어 순서가 바뀐다
        const mainFestivalPick = copyFestivalData[Math.floor(Math.random() * copyFestivalData.length)]; // 전체 데이터에서 랜덤으로 하나 선택
        setMainFestival(mainFestivalPick); // 랜덤으로 고른걸 메인슬라이드 이미지로 선택
        const createdAt = new Date().getTime(); //현재 시각ms
        localStorage.setItem('homefestival', JSON.stringify({main: mainFestivalPick, createdAt})); // sliceFood, mainFoodPick은 배열이니까 쿠키에 직접 저장이 되지 않아 문자열로 변경하여 저장
    }

  }, [festivalList]);

  // 메인쇼핑 로컬스토리지 저장, 하루시간 설정 후 삭제되게 함
  useEffect(()=>{
    if (shoppingList && shoppingList.length > 0) {
      const saveShopping = localStorage.getItem('homeshopping'); //-> 문자열(쿠키는 원래 문자열만 저장 가능)
      const now = new Date().getTime(); //현재 시간
      const oneDay = 24 * 60 * 60 * 1000; //24시간=86400000ms
      
      if (saveShopping) {
        try {
          const parsedShopping = JSON.parse(saveShopping); //저장된 값이 있으면 문자열을 객체로 변경
          const { main, createdAt } = parsedShopping; // createdAt 저장 시간이 지났는지 확인하는 용
          
          const isValidTime = createdAt && now - createdAt < oneDay; // 저장시간이 24시간 이내인지 확인 (현재시간-저장시간)
          // const hasValidData = Array.isArray(slice) && slice.length > 0 && slice[0]?.contents_id; //오류방지용
          
          if (isValidTime) {
            // ⏳ 아직 하루 안 지났음 → 유효
            setMainShopping(main); // 랜덤으로 하나 뽑아서 저장
            return;
          } else {
            // 하루 지남 → 제거
            localStorage.removeItem('homeshopping');
          }
        } catch (e) {
          console.error("로컬스토리지 파싱 오류", e);
          localStorage.removeItem('homeshopping');
        }
      }
      // 여기로 오면 유효한 로컬스토리지 없고 새로 랜덤 생성
        const copyShoppingData = [...shoppingList].sort(() => Math.random() - 0.5); // 배열을 랜덤하게 섞기 위해 sort함수에 넣어서 사용, 0-1사이 값을 주는데 -0.5를 하면 음수(앞으로) 양수(뒤로)값을 가지게 되어 순서가 바뀐다
        const mainShoppingPick = copyShoppingData[Math.floor(Math.random() * copyShoppingData.length)]; // 전체 데이터에서 랜덤으로 하나 선택
        setMainShopping(mainShoppingPick); // 랜덤으로 고른걸 메인슬라이드 이미지로 선택
        const createdAt = new Date().getTime(); //현재 시각ms
        localStorage.setItem('homeshopping', JSON.stringify({main: mainShoppingPick, createdAt})); // sliceFood, mainFoodPick은 배열이니까 쿠키에 직접 저장이 되지 않아 문자열로 변경하여 저장
    }

  }, [shoppingList]);


  // 트립부분 두번 클릭시 컨텐츠로 넘어감
  const tripClick = (contents_id) => {
    if (activeTrip === contents_id) {
      navigate(`/trip/triplist/tour/tripdetail/${contents_id}`);
      // 이미 펼쳐진 걸 또 클릭하면 상세 페이지 이동
    } else {
      setActiveTrip(contents_id);
    }
  };

  // 주소에서 도 제거 (제주특별자치도 제거)
  const mainAddressSelect = (address) => {
    if (!address) return "";
    const parts = address.split(" ");
    if (parts[0] === "제주특별자치도") {
      return parts.slice(1).join(" "); // 첫 번째 단어(제주특별자치도) 빼고 (" ")공백 기준으로 다시 문자열 변환
    }
    return address; // 제주특별자치도가 아니면 원래 주소로 보여주기
  };

  return (
    <div className='home-main'>
      <Swiper 
      className="mySwiper mainSwiper"
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={0}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
        {mainTrip && (
          //mainTrip이 존재할때만 슬라이드 렌더링되게하기
          <SwiperSlide>
            <MainItem className={'home-mainimg'} detailurl={`/trip/triplist/tour/tripdetail/${mainTrip.contents_id}`} homeMainPhoto={mainTrip.img_path || '/imgs/common_noimage_02.png'} tripTitle={<>오늘, <br/>이곳 어때</>} title={mainTrip.title} introduction={mainTrip.introduction}/>
          </SwiperSlide>
        )}
        {mainFood && (
          <SwiperSlide>
            <MainItem className={'home-mainimg'} detailurl={`/trip/triplist/food/tripdetail/${mainFood.contentsid}`} homeMainPhoto={mainFood.repPhoto.photoid.imgpath || '/imgs/common_noimage_02.png'} tripTitle={<>제주<br/>맛집 지도</>} title={mainFood.title} introduction={mainFood.introduction}/>
          </SwiperSlide>
        )}
        {mainFestival && (
          <SwiperSlide>
            <MainItem className={'home-mainimg'} detailurl={`/trip/triplist/festival/tripdetail/${mainFestival.contentsid}`} homeMainPhoto={mainFestival.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'} tripTitle={<>제주의<br/>축제 행사</>} title={mainFestival.title} introduction={mainFestival.introduction}/>
          </SwiperSlide>
        )}
        {mainShopping && (
          <SwiperSlide>
            <MainItem className={'home-mainimg'} detailurl={`/trip/triplist/shopping/tripdetail/${mainShopping.contentsid}`} homeMainPhoto={mainShopping.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'} tripTitle={<>특별한<br/>감성 공간</>} title={mainShopping.title} introduction={mainShopping.introduction}/>
          </SwiperSlide>
        )}
      </Swiper>

      <div className='home-tabmenu'>
        <HomeTab tabLink={'/trip/triplist/tour'} imgurl={'home_tabtour_00.png'} tabTitle={'Tour'}/>
        <HomeTab tabLink={'/trip/triplist/food'} imgurl={'home_tabfood_00.png'} tabTitle={'Food'}/>
        <HomeTab tabLink={'/trip/triplist/festival'} imgurl={'home_tabfestival_00.png'} tabTitle={'Festival'}/>
        <HomeTab tabLink={'/trip/triplist/shopping'} imgurl={'home_tabshopping_00.png'} tabTitle={'Shopping'}/>
      </div>

      <div className='home-weather'>
        <HomeContTop homecontTitle={'오늘, 제주 날씨는 '} homecontEmoji={'☀'} showMore={false}/>
        <div className='home-weather-content'>
          <div className='home-weather-today'>
            <img src="/imgs/weather_clear_01.png" alt="" />
            <div>
              <span>현재</span>
              <b>19°</b>
            </div>
          </div>
          <div className='home-weather-etc'>
            <b>9°/19°</b>
            <div className='home-weather-windy'>
              <span>바람</span>
              <b>5</b>
              <b>m/s</b>
            </div>
          </div>
        </div>
      </div>

      <div className='home-tripmenu'>
        <HomeContTop homecontTitle={'오늘, 이곳 어때? '} homecontEmoji={'🚗'} to={'/trip/triplist/tour'}/>
        <div className='home-tripContent'>
          {
            selectedTrips.map((item)=>
              <HomeTrip 
                key={item.id}
                className={`home-trip ${activeTrip === item.contents_id ? 'active' : ''}`}
                onClick={()=>tripClick(item.contents_id)}
                imgpath={item.img_path || '/imgs/common_noimage_02.png'}
                title={item.title}
                roadaddress={mainAddressSelect(item.road_address) || '현재 주소 정보가 비어 있어요. 확인 중입니다.'}
              />
            )
          }
        </div>
      </div>

      <div className='home-foodmenu'>
        <HomeContTop homecontTitle={'제주 맛집 지도 '} homecontEmoji={'🍽'} to={'/trip/triplist/food'}/>
        <div className='home-foodContent'>
    {/* {console.log("✅ selectedFoods check:", selectedFoods, 'length:', selectedFoods.length)} */}
          {
            selectedFoods.map((item) => 
                <HomeFood 
                  key={item.contentsid}
                  className={'home-food'}
                  onClick={()=>navigate(`/trip/triplist/food/tripdetail/${item.contentsid}`, { replace: true })} // replace: true -> 뒤로가기 눌렀을 때 라우터 url로 이동해서 이걸 작성하면 브라우저에 히스토리가 쌓이지 않고 뒤로가기 잘 됨
                  imgpath={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'}
                  title={item.title}
                  tag={item.tag}
                  roadaddress={mainAddressSelect(item.roadaddress) || '현재 주소 정보가 비어 있어요. 확인 중입니다.'}
                />
              )
          }
        </div>
      </div>

      <div className='home-photomenu'>
        <HomeContTop homecontTitle={'꼭 남겨야 할 인생샷 스팟 '} homecontEmoji={'📸'} to={'/community/cmphoto'}/>
        <div>
          <Swiper
          slidesPerView={'auto'}
          spaceBetween={0}
          className="mySwiper photoSwiper"
          >
            <SwiperSlide>
              <HomePhoto className={'home-photo'}/>
            </SwiperSlide>
            <SwiperSlide>
              <HomePhoto className={'home-photo'}/>
            </SwiperSlide>
            <SwiperSlide>
              <HomePhoto className={'home-photo'}/>
            </SwiperSlide>
            <SwiperSlide>
              <HomePhoto className={'home-photo'}/>
            </SwiperSlide>
            <SwiperSlide>
              <HomePhoto className={'home-photo'}/>
            </SwiperSlide>
        </Swiper>
        </div>
      </div>
      
    </div>
  )
}

export default Home