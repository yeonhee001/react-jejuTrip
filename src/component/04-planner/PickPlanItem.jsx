import React, { useRef, useState } from 'react'
import TagBtn from '../_common/TagBtn';
import TicketItem from './TicketItem';

function PickPlanItem({selectedDay, onClickDay, data}) {
  const [edit, setEdit] = useState(null); // true: 편집 중, false: 읽기 모드, null: 기본 모드

  //parseInt() : 문자열에서 앞에 있는 숫자만 뽑아서 정수로 바꿔줌
  const nights = parseInt(selectedDay);
  const days = nights + 1;

  const button = []
  for(let i=1; i<=days; i++){
    button.push(i)
  }
  
  const tagBtn = useRef('');
  const scroll = () => {
    tagBtn?.current.scrollIntoView({
      behavior: 'smooth', // 스크롤 애니메이션을 부드럽게
      block: 'start',     // 요소가 화면 상단에 위치하도록
    });
  };

  /* 
  Array.from() : "1부터 N까지의 숫자 배열"을 만들때 사용 ! react에서 종적으로 버튼, 리스트를 만들 때 많이 쓴다 = for문과 동작 동일
  const button = Array.from({ length: days }, (_, i) => i + 1); 
  */

  return (
    <div className='pickplan_item'>
      <div className="pickplan_btn">
        {button?.map((day, idx) => (
          <button onClick={()=>{scroll(idx)}} key={day}>
            <TagBtn tagbtn={`Day ${day}`}/>
          </button>
        ))}
      </div>
      <div className='pickplan_card'>
        {data.days?.map((day, idx)=>
        <div ref={tagBtn} key={idx}>
          <TicketItem
            idx={idx}
            day={day}
            btnName={"내 일정으로 담기"}
            edit={edit}
          />
        </div>
        )}
      </div>
    </div>
  )
}

export default PickPlanItem