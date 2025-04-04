import React, { useEffect, useState } from 'react'
import Around from '../../component/02-trip/tripDetail/Around';
import TripDetail2 from '../../component/02-trip/tripDetail/TripDetail'
import TripTag from '../../component/02-trip/tripDetail/TripTag';
import BackNext from '../../component/02-trip/tripDetail/BackNext';
import "../../styles/02-trip/tripDetail.scss";

function TripDetail() {
// 선택된 관광지 정보를 저장할 상태
const [currentSpot, setCurrentSpot] = useState(null);

useEffect(() => {

  // 기본 관광지 설정 (예제: 성산일출봉)
  const defaultSpot = {
    title: "성산일출봉",
    img:"repPhoto?.photoid.imgpath",
    latitude: 33.4587,
    longitude: 126.9347,
    contentsid: "PLACE_001",
  };

  setCurrentSpot(defaultSpot); // 초기 관광지 설정
}, []);

return (
  <div>
    <TripDetail2/>
    <TripTag/>
    <div>
      {currentSpot ? (
        <>
          <h2>{currentSpot.title}</h2>
          {/* 주변 관광지 컴포넌트에 현재 위치 전달 */}
          <Around currentSpot={currentSpot} />
          {/* <AroundItem/> */}
        </>
      ) : (
        <p>관광지 정보를 불러오는 중...</p>
      )}
    </div>
    <div></div>
      <BackNext/>
  </div>
);

}

export default TripDetail