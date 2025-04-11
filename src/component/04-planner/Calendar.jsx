import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import { eachDayOfInterval, format } from 'date-fns';
import Button from '../_common/Button';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/04-planner/calendar.scss'

function Calendar({btnName, type, onClick}) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  
  const handleChange = (item) => {
    const start = item.selection.startDate;
    const end = item.selection.endDate;
    
    // 상태 업데이트
    setRange([item.selection]);

    // ✨ 중간 날짜들만 추출
    const allDates = eachDayOfInterval({ start, end });
    const apiMiddleDates = allDates
      .slice(1, -1) // 첫날, 마지막날 제외
      .map((date) => format(date, 'yyyyMMdd'));

    const apiStart = format(start, 'yyyyMMdd');
    const apiEnd = format(end, 'yyyyMMdd');

    let apiDays = [apiStart, ...apiMiddleDates, apiEnd]

    const startDay = format(start, 'yyyy.MM.dd');
    const endDay = format(end, 'yyyy.MM.dd');

    let days = [startDay, endDay]

    // localStorage에 저장
    localStorage.setItem('apiDays', JSON.stringify(apiDays));
    localStorage.setItem('days', JSON.stringify(days));
    
  };

  return (
    <div className="calendar">
      <div style={{ height: '63vh', overflowY: 'hidden' }}>
        <DateRange
          editableDateInputs={false}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={range}
          months={3} // 3달 표시 (원하면 6~12까지 가능)
          direction="vertical" // 세로 스크롤
          scroll={{ enabled: true }}
          locale={ko}
          monthDisplayFormat="yyyy.MM"
          minDate={new Date()} // 오늘 이후만 가능
          maxDate={new Date(2025, 11, 31)} // 2025년 12월 31일까지 선택 가능
        />
      </div>
      {type == "list" ?
        <NavLink to={"/planner/plannerdetail/:id"} className="calendar_button"><Button className={"calendar_button"}>{format(range[0].startDate, 'yyyy.MM.dd')} - {format(range[0].endDate, 'yyyy.MM.dd')} / {btnName}</Button></NavLink>
        :
        <button onClick={onClick} className="calendar_button"><Button className={"calendar_button"}>{format(range[0].startDate, 'yyyy.MM.dd')} - {format(range[0].endDate, 'yyyy.MM.dd')} / {btnName}</Button></button>
      }
        </div>
  );
}

export default Calendar;