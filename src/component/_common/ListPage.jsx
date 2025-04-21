import React, { useState } from 'react'
import ListItem from './ListItem'
import Btn1Popup from '../popups/Btn1Popup';
import Btn2Popup from '../popups/Btn2Popup';
import SwipeAction from './SwipeAction'
import SwipeHand from './SwipeHand';

function ListPage({listData, page, trashClick, trash, onConfirm }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDonePopupOpen, setIsDonePopupOpen] = useState(false);
  const [openSwipeId, setOpenSwipeId] = useState(null);

  let title = '';
  let subtitle = '';

  if(page === 'check') {
    title = '체크리스트';
    subtitle = '내 체크리스트'
  } else if(page === 'plan') {
    title = '나의 여행 보기';
    subtitle = '내 여행 리스트'
  }

  // 연도별로 데이터 구분
  const groupedData = listData.reduce((acc, item) => {
    const year = item?.date[0].split('.')[0];
    if(!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(groupedData); // 연도 배열
  
  function compareNumbers(a, b) {
    return a - b;
  }
  years.sort((a,b)=>b-a);
  
  return (
    <div className='listpage'>
      <h2>{title}</h2> 
      <div className='listpage-subtitle'>
        {subtitle}
        {listData.length !== 0 && (
          <div className='listpage-swipehand'>
            <SwipeHand />
          </div>
        )}
      </div>

      {/* 연도별로 그룹화된 데이터 출력 */}
      {years.map((year) => (
        <div key={year} style={{marginBottom: '32px'}}>
          <h3>{year}</h3> {/* 연도 출력 */}
          {groupedData[year].map((item, i) => (
            !trashClick?.[item.id] && (
              <SwipeAction 
                key={item.id} 
                setTrashClick={() => {
                  setOpenSwipeId(item.id);
                  trash(item.id)
                }} 
                setIsPopupOpen={setIsPopupOpen}
                resetSwipe={openSwipeId === item.id}
              >
                  <ListItem
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    page={page}
                  />
              </SwipeAction>
            )
          ))}
          <Btn2Popup 
            isOpen={isPopupOpen} 
            setIsOpen={setIsPopupOpen} 
            type={'delete'} 
            onCancel={() => {
              setOpenSwipeId(null);
            }}
            onConfirm={() => {
              onConfirm();
              setIsPopupOpen(false);
              setIsDonePopupOpen(true);
            }}
          />
          <Btn1Popup
            isOpen={isDonePopupOpen}
            setIsOpen={setIsDonePopupOpen}
            type={'delete'}
          />
        </div>
      ))}
    </div> 
  )
}

export default ListPage