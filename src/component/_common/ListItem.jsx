import React from 'react'
import Right_black from '../icons/Right_black'
import { useNavigate } from 'react-router-dom';
import SwipeAction from './SwipeAction';

function ListItem({ id, title, date, page }) {
  const navigate = useNavigate();

  function changeLink() {
    if(page === 'check') {
      navigate(`/my/checklist/checkdetail/${id}`)
    } else if(page === 'plan') {
      navigate(`/planner/plannerdetail/${id}`,)
    }
  }

  return (
    <SwipeAction>
      <div className='listitem' onClick={changeLink}>
        <div>
          <p>{title}</p>
          <span>{date}</span>
        </div>
        <Right_black className={'listitem-icon'}/>
      </div>
    </SwipeAction>
  )
}

export default ListItem