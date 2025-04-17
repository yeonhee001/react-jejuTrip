import React from 'react'
import TicketItem from './ticket/TicketItem';
import { plan } from '../../api';

function PickPlanItem({planData, tagBtn}) {
  console.log(planData);
  
  /* 
  Array.from() : "1부터 N까지의 숫자 배열"을 만들때 사용 ! react에서 종적으로 버튼, 리스트를 만들 때 많이 쓴다 = for문과 동작 동일
  const button = Array.from({ length: days }, (_, i) => i + 1); 
  */
  return (
    <div className='pickplan_item'>
      <div className='pickplan_card'>
        {planData?.days.map((day, idx)=>
        <div ref={(e)=>{tagBtn.current[idx] = e }} key={idx}>
          <TicketItem
            idx={idx}
            day={day}
            ticketdate={""}
            topbarright={""}
            data={planData}
          />
        </div>
        )}
      </div>
    </div>
  )
}

export default PickPlanItem