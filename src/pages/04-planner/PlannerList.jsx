import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { plan } from '../../api';
import Calendar from '../../component/04-planner/Calendar'
import Close from '../../component/icons/Close';
import ListPage from '../../component/_common/ListPage';
import Newpost from '../../component/icons/Newpost';
import PopupAction from '../../component/_common/PopupAction';
import Btn2Popup from '../../component/popups/Btn2Popup';

import "../../styles/04-planner/plannerList.scss";
import DataLoading from '../../component/_common/DataLoading';

function PlannerList() {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const userId = storedUser?.id;

    const { planData, PlanListData } = plan();
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
            setLoading(false)
            if( planData?.item?.days[0]?.plans.length == 0 ){
                setCalendar(true); // 달력 오픈
            }
        }
    );
    }, [userId]);

    useEffect(() => {
        if (calendar) {
        document.body.style.overflow = "hidden"; // 스크롤 막기
        } else {
        document.body.style.overflow = "hidden"; // 다시 살리기
        }
    
        // 컴포넌트 언마운트될 때도 원복
        return () => {
        document.body.style.overflow = "auto";
        };
    }, [calendar]);
    if(loading){<DataLoading/>; return}
    return (
        <div className='plannerList'>
            { userId &&
                <>
                { userId && planData.length > 0 &&
                    <>
                    <ListPage page={"plan"} listData={planData}/>
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