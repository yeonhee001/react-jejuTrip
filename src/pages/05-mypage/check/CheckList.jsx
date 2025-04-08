import React, { useState } from 'react'
import "../../../styles/05-mypage/check/checkList.scss";
import ListPage from '../../../component/_common/ListPage';
import Btn1Popup from '../../../component/popups/Btn1Popup';
import Btn2Popup from '../../../component/popups/Btn2Popup';
import GetTripPopup from '../../../component/popups/GetTripPopup';
import Newpost from '../../../component/icons/Newpost';

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
      <ListPage listData={listData} page="check"/>

      <Newpost className={'add-check-btn'}/>
      
      <Btn1Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={'select'}/>
      <Btn1Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={'delete'}/>
      <Btn2Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={'delete'}/>
      <GetTripPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} listData={listData}/>
    </div>
  )
}

export default CheckList