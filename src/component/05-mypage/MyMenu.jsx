import React from 'react'
import { NavLink } from 'react-router-dom'
import Heart_stroke_red from '../icons/Heart_stroke_red'
import Check from '../icons/Check';
import Activity from '../icons/Activity';

function MyMenu() {
  const mymenuContent = [
    {
      type: 'check',
      url: 'checklist',
      icon: <Check className={'my-menuicon'}/>,
      txt: '체크리스트'
    },
    {
      type: 'like',
      url: 'like',
      icon: <Heart_stroke_red className={'my-menuicon'}/>,
      txt: '좋아요'
    },
    {
      type: 'activity',
      url: 'activity',
      icon: <Activity className={'my-menuicon'}/>,
      txt: '나의활동'
    }
  ];

  return (
    <div className='my-menu1'>
      {
        mymenuContent.map(item => (
          <NavLink to={`/my/${item.url}`} key={item.type}>
            <div className={`my-menu-${item.type}`}>
              {item.icon}
              <span>{item.txt}</span>
            </div>
          </NavLink>
        ))
      }
    </div>
  )
}

export default MyMenu