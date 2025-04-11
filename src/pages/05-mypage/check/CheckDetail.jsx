import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Toggle from '../../../component/_common/Toggle'
import CheckItem from '../../../component/05-mypage/CheckItem';
import SwipeHand from '../../../component/_common/SwipeHand';
import "../../../styles/05-mypage/check/checkDetail.scss";

function CheckDetail() {
  const [trashClick, setTrashClick] = useState(false);
  const [isOpenNeed, setIsOpenNeed] = useState(true);
  const [isOpenEtc, setIsOpenEtc] = useState(true);

  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false); // 기본: 편집X

  const { id } = useParams(); // url에서 id 가져오기
  const [item, setItem] = useState(null);

  // checklist test data
  const NeedDefaultData = ['의류', '세면도구 / 화장품', '전자기기', '신분증 / 면허증', '현금', '카드'];
  const [ needListData, SetNeedListData ] = useState(NeedDefaultData);
  const [ etcListData, SetEtcListData ] = useState([]);

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
  
  // 새로 추가 시 편집모드로 진입
  useEffect(() => {
    // location.state로 isEdit 여부 판단
    if (location.state?.isEdit) {
      setIsEdit(true);
    }
  }, [location.state]);

  if(!item) return <p> 해당 리스트를 찾을 수 없습니다. </p>
  
  return (
    <div>
      <div className='titlebox'>
        <h2 className='pagetitle'>체크리스트</h2>
        <p className='mytriptitle'>{item.title}</p>
        <button 
          className='detailbtn'
          onClick={() => {
              setIsEdit(!isEdit)
          }}
        >
          {isEdit ? '완료' : '편집'}
        </button>
      </div>

      <div className='needitembox'>
        <Toggle title={'필수 준비물'} isOpen={isOpenNeed} setIsOpen={setIsOpenNeed} />
        {isOpenNeed && ( 
          <>
            <CheckItem
            list={needListData}
            setList={SetNeedListData}
            isEdit={isEdit}
            setTrashClick={setTrashClick}
            />
            {isEdit ? <div className='detail-swipehand'><SwipeHand/></div> : null}
          </>
        )}
      </div>
      <div>
        <Toggle title={'기타 준비물'} isOpen={isOpenEtc} setIsOpen={setIsOpenEtc} />
        {isOpenEtc && ( 
          <CheckItem 
            list={etcListData}
            setList={SetEtcListData}
            isEdit={isEdit}
            setTrashClick={setTrashClick}
          /> 
        )}
      </div>
    </div>
  )
}

export default CheckDetail