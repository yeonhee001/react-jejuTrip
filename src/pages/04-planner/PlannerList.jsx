import React, { useState, useEffect } from 'react'
import Calendar from '../../component/04-planner/Calendar'
import Close from '../../component/icons/Close';
import ListPage from '../../component/_common/ListPage';
import Newpost from '../../component/icons/Newpost';

import "../../styles/04-planner/plannerList.scss";
import PopupAction from '../../component/_common/PopupAction';

function PlannerList() {
    const [calendar, setCalendar] = useState(false);
    
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

    const listData = [
        { id: 1, title: '나의 제주 여행', date: '2025.04.01' },
        { id: 2, title: '나의 제주 여행 2', date: '2025.04.02' },
        { id: 3, title: '나의 제주 여행 3', date: '2024.04.03' }, 
    ];
    return (
        <div className='plannerList'>
            <ListPage page={"plan"} listData={listData}/>
            <button onClick={()=>{setCalendar((prev) => !prev)}}><Newpost className={"planner_new"}/></button>
            {calendar && <div className="overlay"/>}
            <PopupAction className={"calendar_popup"} useState={calendar}>
                <div className="calendar_top">
                    <button onClick={()=>{setCalendar(false)}}><Close className={"calendar_close"}/></button>
                    <h2>여행 일정 등록</h2>
                </div>
                <div className="calendar_content"><Calendar type={'list'} btnName={"여행 준비 시작하기"}/></div>
            </PopupAction>
        </div>
    )
}

export default PlannerList