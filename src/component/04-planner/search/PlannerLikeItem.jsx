import React, { useState } from 'react'
import PlaceItem from '../../_common/PlaceItem'
import TagBtn from '../../_common/TagBtn'
import { NavLink, useNavigate } from 'react-router-dom';
import { mode } from '../../../api';

function PlannerLikeItem({item, checkItem, clickbtn}) {
  const [checked, setChecked] = useState(false);
  const {exitEditMode}=mode();
  const navigate = useNavigate();

  let type;
  switch(item.contentscd.value){
    case 'c1' : type='tour'; break;
    case 'c2' : type='shopping'; break;
    case 'c4' : type='food'; break;
    case 'c5' : type='festival'; break;
  }

  return (
  <label>
    <input 
    className='search_input'
    type='checkbox' 
    checked={checkItem.some(i => i.contents_id === item.contentsid)}
    onChange={(e)=>{clickbtn(item); setChecked((prev) => !prev)}}/>
        <div className='LikeItem'>
          <div><TagBtn tagbtn={"선택"} className={"Likebtn"}/></div>
          <div onClick={()=>{exitEditMode(); navigate(`/trip/triplist/${type}/tripdetail/${item.contentsid}`); localStorage.setItem("edit", "true");}}>
            <PlaceItem
            imgpath={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'}
            title={item.title}
            roadaddress={item.roadaddress || '주소 정보가 없습니다.'}
            tag={item.tag}
            heartType={'red-fill'}
            />
          </div>
        </div>
  </label>
  )
}

export default PlannerLikeItem