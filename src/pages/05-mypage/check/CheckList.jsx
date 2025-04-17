import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ListPage from '../../../component/_common/ListPage';
import GetTripPopup from '../../../component/popups/GetTripPopup';
import Newpost from '../../../component/icons/Newpost';
import NoCheck from '../../../component/_common/NoCheck';
import "../../../styles/05-mypage/check/checkList.scss";

function CheckList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);                       // 팝업 상태 관리
  const [checkData, setCheckData] = useState([]);                              // 체크리스트 데이터 상태
  const [planData, setPlanData] = useState([]);                                // 여행 일정 데이터 상태
  const [trashClick, setTrashClick] = useState({});                            // 삭제 버튼 클릭 상태
  const [deleteTarget, setDeleteTarget] = useState({ index: null, type: null });

  const userId = String(JSON.parse(sessionStorage.getItem('user'))?.id);

  const trash = (id) => {
    setTrashClick((prev) => ({
      ...prev, // 기존 값 유지
      [id]: false, // 해당 id의 trash 상태만 false로 변경
    }));
    // 삭제 팝업 열고 삭제 대상 저장
    setDeleteTarget({ id });
  };

  // 체크리스트 데이터 가져오기
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APIURL}/check/user/${userId}`)
    .then(res=>{
      if(res.data && res.data.length > 0) {
        setCheckData(res.data);
      } else {
        setCheckData([]);
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setCheckData([]);
      } else {
        console.error("Error fetching plan:", err);
      }
    });
  },[userId])

  // 나의 여행 데이터 가져오기
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APIURL}/plan/user/${userId}`)
    .then(res=>{
      // 연결된 체크리스트가 없는 여행만 필터링
      const filteredData = res.data.filter(plan => plan.checkId === '');
      setPlanData(filteredData);
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        setPlanData([]);
      } else {
        console.error("Error fetching plan:", err);
      }
    });
  },[userId])
  
  // 체크리스트 삭제
  function deleteCheckData() {
    const { id } = deleteTarget;
    
    if (id !== null) {
      axios.put(`${process.env.REACT_APP_APIURL}/check/del`, { userId, checkId: id })
        .then(() => {
          setCheckData(prevData => prevData.filter(item => item.id !== id));
          setTrashClick({});
        })
        .catch(err => {
          console.error(err);
          alert('삭제에 실패했습니다.');
        });
    } else {
      console.log('No item to delete. deleteIndex is null');
    }
  }
  
  return (
    <div className='checklist-page'>
      <ListPage 
        listData={checkData} 
        page="check" 
        trashClick={trashClick} 
        trash={(id) => trash(id)}
        onConfirm={deleteCheckData}
      />

      <div>
        {checkData && checkData.length === 0 && <NoCheck />}
      </div>

      <div onClick={() => setIsPopupOpen(true)} className='add-check-btn-wrap'>
        <Newpost className={'add-check-btn'}/>
      </div>
      
      <GetTripPopup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        planData={planData}
        checkData={checkData}
      />
    </div>
  )
}

export default CheckList