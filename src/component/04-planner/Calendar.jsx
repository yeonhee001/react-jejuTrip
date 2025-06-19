import React from 'react'
import Close from '../icons/Close'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from '../_common/Button';

function Calendar() {
    return (
        <>
            <div className='calendar_top'>
                <button><Close/></button>
                <h2>여행 일정 등록</h2>
            </div>
            <div className='calendar'>
                <FullCalendar
                plugins={[dayGridPlugin]} // 플러그인 추가
                initialView="dayGridMonth" // 처음 보이는 뷰 설정
                selectMirror={true}
                height="auto"
                locale="en"
                headerToolbar={{ left: "prev today", center: "title", right: "next" }}
                selectable={true} // 날짜 선택 가능하게
                dateClick={(info) => alert(`날짜 클릭: ${info.dateStr}`)} // 클릭 이벤트
                />
            </div>
            <div className='calendarbtn'><Button btn={"2025.4.1 - 4.3 / 여행 준비 시작하기"}/></div>
        </>
    )
}

export default Calendar