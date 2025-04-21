import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { plan } from '../../api';

import Close from '../../component/icons/Close';
import ListPage from '../../component/_common/ListPage';
import Newpost from '../../component/icons/Newpost';
import PopupAction from '../../component/_common/PopupAction';
import Btn2Popup from '../../component/popups/Btn2Popup';
import DataLoading from '../../component/_common/DataLoading';
import Calendar from '../../component/04-planner/calendar/Calendar';

import "../../styles/04-planner/plannerList.scss";

function PlannerList() {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const userId = storedUser?.id;
    
    const { planData, PlanListData, removePlan } = plan();
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [trashClick, setTrashClick] = useState({});
    const [deleteTarget, setDeleteTarget] = useState({ index: null, type: null });
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },1200)
    },[])
    
    useEffect(() => {
        if (!userId) {
            setIsPopupOpen(true);
            return;
        }
        PlanListData(userId)
        .then(() => {
            if( planData?.item?.days[0]?.plans.length == 0 || planData?.item?.days[0]?.plans.length == undefined){
                setCalendar(true); // 달력 오픈
                setLoading(false)
            }
        }
    );
    }, [userId, successful]);

    const trash = (id) => {   
        setTrashClick((prev) => ({
          ...prev, // 기존 값 유지
          [id]: false, // 해당 id의 trash 상태만 false로 변경
        }));
        // 삭제 팝업 열고 삭제 대상 저장
        setDeleteTarget({ id });
    };

    //여행 일정리스트 삭제
    function deletePlanData() {
        const { id } = deleteTarget;
        const stingID = String(userId)

        if (id !== null) {
            removePlan(id, stingID);
            setTrashClick({});
            setSuccessful((prev) => !prev)
        }
    }
    
    if(loading){<DataLoading/>; return}
    return (
        <div className='plannerList'>
            { userId &&
                <>
                { userId && planData.length > 0 &&
                    <>
                    <ListPage 
                        page={"plan"} 
                        listData={planData}
                        trashClick={trashClick}
                        trash={(id) => trash(id)}
                        onConfirm={deletePlanData}
                    />
                    <button onClick={()=>{setCalendar(true)}}><Newpost className={"planner_new"}/></button>
                    </>
                    }
                    <>
                    {calendar && <div className="overlay"/>}
                    <PopupAction className={"calendar_popup"} useState={calendar}>
                    <div className="calendar_top">
                        <button onClick={()=>{setCalendar(false)}}><Close className={"calendar_close"}/></button>
                        <h2>여행 일정 등록</h2>
                    </div>
                    <div className="calendar_content"><Calendar type={'list'} btnName={"여행 준비 시작하기"}/></div>
                    </PopupAction>
                    </>
                </>
            }
            <Btn2Popup 
            isOpen={isPopupOpen} 
            setIsOpen={setIsPopupOpen} 
            type={"login"}  
            onConfirm={() => {
                navigate(`/login`)
                }}
            onCancel={()=>{
                navigate(-1)
                setIsPopupOpen(false)
            }}
            
            />
        </div>
    )
}

export default PlannerList