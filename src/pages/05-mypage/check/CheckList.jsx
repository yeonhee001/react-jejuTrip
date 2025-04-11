import React, { useReducer } from 'react'
import ListPage from '../../../component/_common/ListPage';
import Btn1Popup from '../../../component/popups/Btn1Popup';
import Btn2Popup from '../../../component/popups/Btn2Popup';
import GetTripPopup from '../../../component/popups/GetTripPopup';
import Newpost from '../../../component/icons/Newpost';
import "../../../styles/05-mypage/check/checkList.scss";

// reducer 초기값
const initialPopupState = {
  delete1: false,
  delete2: false,
  trip: false
};

function popupReducer(state, action) {
  switch (action.type) {
    case 'OPEN':
      return {...initialPopupState, [action.popupType]: true};
    case 'CLOSE':
      return {...initialPopupState};
    default:
      return state;
  }
}

function CheckList() {
  const [popupState, dispatch] = useReducer(popupReducer, initialPopupState);

  // get my trip data
  const testTripData = [
    { id: 1, title: '나의 제주 여행', date: '2025.04.01'},
    { id: 2, title: '나의 제주 여행 2', date: '2025.04.08'},
    { id: 3, title: '나의 제주 여행 3', date: '2025.04.04'},
  ]

  const openPopup = (type) => {
    dispatch({ type: 'OPEN', popupType: type });
  };
  const closePopup = () => {
    dispatch({ type: 'CLOSE' });
  };

  return (
    <div>
      <ListPage listData={testTripData} page="check"/>

      <div onClick={() => openPopup('trip')}>
        <Newpost className={'add-check-btn'}/>
      </div>
      
      <Btn1Popup
        isOpen={popupState.delete1}
        setIsOpen={closePopup}
        type={'delete'}
        onConfirm={''}
      />
      <Btn2Popup
        isOpen={popupState.delete2}
        setIsOpen={closePopup}
        type={'delete'}
        onConfirm={''}
      />
      <GetTripPopup
        isOpen={popupState.trip}
        setIsOpen={closePopup}
        listData={testTripData}
      />
    </div>
  )
}

export default CheckList