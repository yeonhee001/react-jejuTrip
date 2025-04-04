import React, { useEffect, useState } from 'react'
import Toggle from '../../../component/_common/Toggle'
import { useParams } from 'react-router-dom';
import "../../../styles/05-mypage/check/checkDetail.scss";

function CheckDetail() {
  const [isOpenNeed, setIsOpenNeed] = useState(false);
  const [isOpenEtc, setIsOpenEtc] = useState(false);

  const { id } = useParams(); // url에서 id 가져오기
  const [item, setItem] = useState(null);

  // test data (list와 동일)
  const listData = [
    { id: 1, title: '나의 제주 여행', date: '2025.04.01' },
    { id: 2, title: '나의 제주 여행 2', date: '2025.04.02' },
    { id: 3, title: '나의 제주 여행 3', date: '2024.04.03' }, 
  ];

  useEffect(() => {
    const foundItem = listData.find((listItem) => listItem.id === Number(id));

    if (foundItem) {
      setItem(foundItem);
    }
  }, [id]);

  if(!item) return <p> 해당 리스트를 찾을 수 없습니다. </p>
  
  return (
    <div>
      <h2 className='pagetitle'>체크리스트</h2>
      <p className='triptitle'>{item.title}</p>
      <Toggle title={'필수 준비물'} isOpen={isOpenNeed} setIsOpen={setIsOpenNeed} />
      {isOpenNeed ? (
        <div>
          <p>체크리스트</p>
        </div>
      ) : null}
      <Toggle title={'기타 준비물'} isOpen={isOpenEtc} setIsOpen={setIsOpenEtc} />
    </div>
  )
}

export default CheckDetail