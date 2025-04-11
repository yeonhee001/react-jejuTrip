import React, { useState } from 'react'
import ListItem from './ListItem'
import SwipeAction from './SwipeAction'
import Trash from '../icons/Trash';
import Btn2Popup from '../popups/Btn2Popup';

function ListPage({listData, page}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    const year = item.date.split('.')[0];
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
      <p>{subtitle}</p>

      {/* 연도별로 그룹화된 데이터 출력 */}
      {years.map((year) => (
        <div key={year} style={{marginBottom: '32px'}}>
          <h3>{year}</h3> {/* 연도 출력 */}
          {groupedData[year].map((item) => (
            <SwipeAction>
              <ListItem
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                page={page}
              />
              <div className="trashicon" onClick={() => setIsPopupOpen(true)}><Trash/></div>
            </SwipeAction>
          ))}
          <Btn2Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} type={"delete"}/>
        </div>
      ))}
    </div> 
  )
}

export default ListPage