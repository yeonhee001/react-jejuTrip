import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Around from '../../component/02-trip/tripDetail/Around'
import BackNext from '../../component/02-trip/tripDetail/BackNext';
import TripDetailItem from '../../component/02-trip/tripDetail/TripDetailItem';
import { shopNfoodNparty, tour } from '../../api';
import "../../styles/02-trip/tripDetail.scss";
import TripTag from '../../component/02-trip/tripDetail/TripTag';

function TripDetail() {

  const location = useLocation();
  const { filterList } = location.state || {}; //TripList에서 작성한 filterList를 받음
  const pathParts = location.pathname.split('/');
  const type = pathParts[3]; // 항상 이 위치가 type임
  const { id } = useParams();

  const {tripData, fetchTourData} = tour();
  const {shopNfoodNpartyData, fetchCategory} = shopNfoodNparty();
  // api호출로 받아오는 데이터, 데이터를 가져오는 액션 함수
  useEffect(()=>{
    fetchTourData();
    fetchCategory('c2'); // shopping
    fetchCategory('c4'); // food
    fetchCategory('c5'); // festival
    window.scrollTo(0,0);
  },[id])
  const shoppingList = shopNfoodNpartyData.shopping;
  const foodList = shopNfoodNpartyData.food;
  const festivalList = shopNfoodNpartyData.festival;

  const getItemById = () => {
    let list = [];
    if (type === 'tour') list = tripData;
    if (type === 'food') list = foodList;
    if (type === 'festival') list = festivalList;
    if (type === 'shopping') list = shoppingList;

    return list.find(item => String(item.contents_id || item.contentsid) === id);
  };
  const detailItem = getItemById();
  if (!detailItem) return <div>로딩페이지 이미지 넣기</div>;

  // 이전, 이후 버튼 계산
  let list = filterList || [];
  if (list.length===0){
    if (type === 'tour') list = tripData;
    if (type === 'food') list = foodList;
    if (type === 'festival') list = festivalList;
    if (type === 'shopping') list = shoppingList;
  }
  const currentIndex = list.findIndex(item => String(item.contents_id || item.contentsid) === id);
  const prevItem = list[currentIndex - 1];
  const nextItem = list[currentIndex + 1];
  const prevPath = prevItem ? `/trip/triplist/${type}/tripdetail/${prevItem.contents_id || prevItem.contentsid}` : null;
  const nextPath = nextItem ? `/trip/triplist/${type}/tripdetail/${nextItem.contents_id || nextItem.contentsid}` : null;

  // 전화번호가 잘못됐을 경우
  const formatPhone = (rawPhone) => {
    if (!rawPhone || rawPhone.trim() === "" || rawPhone.trim() === "--") {
      return "현재 등록되어 있지 않아요. 조금만 기다려 주세요.";
    }
  
    const trimmed = rawPhone.trim().replace(/^[-]+/, ""); // 앞 하이픈 제거
    const parts = trimmed.split('-');
  
    // 올바른 3파트(지역번호 포함) 형태
    if (parts.length === 3 && parts[0].startsWith('0')) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
  
    // 2파트: 지역번호가 없고 숫자 길이만 맞는 경우 (예: 123-4567, 794-1234 등)
    if (
      parts.length === 2 &&
      parts[0].length === 3 &&
      parts[1].length === 4
    ) {
      return `064-${parts[0]}-${parts[1]}`;
    }
  
    // 혹시라도 숫자만 있는 경우 등
    return trimmed;
  };

  // 주소에서 지역 추출 (서귀포시 안덕면/읍/동 00리")
  const addressSelect = (address) => {
    const parts = address?.split(" ") || []; //띄어쓰기 자르기
    if (parts.length >= 4) {
      return `${parts[1]} ${parts[2]} ${parts[3]}`; // 1:서귀포시 2:안덕면 3:00리
    } else if(parts.length >= 3) {
      return `${parts[1]} ${parts[2]}`; // 1:서귀포시 2:안덕면
    }
    return "";
  };

  // 같은 지역의 콘텐츠 목록 추출
  const getSameItems = () => {
    const address = detailItem.road_address || detailItem.roadaddress;
    const region = addressSelect(address); //선택한 컨텐츠의 주소값

    let list = [];
    if (type === 'tour') list = tripData;
    if (type === 'food') list = foodList;
    if (type === 'festival') list = festivalList;
    if (type === 'shopping') list = shoppingList;

    // 선택한 컨텐츠와 같은 지역인데, 선택한 컨텐츠 제외하고 거르기
    return list.filter(item => {
      const itemAddress = item.road_address || item.roadaddress || "";
      const itemId = String(item.contents_id || item.contentsid);
      return itemAddress.includes(region) && itemId !== id;
    });
  };

  // 태그 불러오기
  const getTag=()=>{
    const showTags = detailItem.tag || '';
    const cleanSign = showTags.replace(/#/g, ',') // #을 쉼표로 통일시킴
    const splitTags = cleanSign.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    return splitTags;
  }
  const tag = getTag();

  const aroundData = getSameItems();

  return (
    <div className='trip-detail-Page'>

      <TripDetailItem img={detailItem.img_path || detailItem.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_big_02.png'} title={detailItem.title} address={detailItem.road_address || detailItem.roadaddress || '현재 주소 정보가 비어 있어요. 확인 중입니다.'} introduction={detailItem.introduction} phone={formatPhone(detailItem.phone_no || detailItem.phoneno)}/>

      <TripTag tag={tag}/>

      {type !== 'festival' && (
        <div className='trip-around-part'>
          <h3>이 곳은 어때?</h3>
          {aroundData.length > 0 ? ( 
            <Around arounddata={aroundData}/> 
          ) : (
            <p>선택한 장소 근처의 다른 추천지는 준비 중입니다.</p>
          )}
        </div>
      )}

      <div>
        <BackNext prevPath={prevPath} nextPath={nextPath} filterList={list}/>
      </div>
    </div>
  )
}

export default TripDetail