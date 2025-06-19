import React, { useState } from 'react'
import "../../../styles/05-mypage/check/checkList.scss";
import ListPage from '../../../component/_common/ListPage';
import InputPopup from '../../../component/popups/InputPopup';
import GetCheckPopup from '../../../component/popups/GetCheckPopup';
import GetTripPopup from '../../../component/popups/GetTripPopup';

function CheckList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // test data
  const listData = [
    { id: 1, title: '나의 제주 여행', date: '2025.04.01' },
    { id: 2, title: '나의 제주 여행 2', date: '2025.04.02' },
    { id: 3, title: '나의 제주 여행 3', date: '2024.04.03' }, 
  ];

  return (
    <div>
      {/* 예시 */}
      <button onClick={ () => {setIsPopupOpen(true) }}>팝업</button>

      <ListPage listData={listData} page="check"/>
      <InputPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen}/>
      {/* <GetTripPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} listData={listData}/> */}
      {/* <GetCheckPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} listData={listData}/> */}
      
    </div>
  )
}

export default CheckList