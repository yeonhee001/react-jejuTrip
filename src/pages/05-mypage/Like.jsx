import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import TabItem from '../../component/_common/TabItem';
import Toggle from '../../component/_common/Toggle';

import '../../styles/05-mypage/like.scss';


function Like() {
  const [places,setPlaces] = useState([true]);
    const [Feed,setFeed] = useState([]);

  return (
    <div>
        <TabItem/>
        <Toggle/>


                
      
            <div><b>좋아요</b></div>
            <NavLink to="/장소" className="nav-item">장소</NavLink>
            <NavLink to="/게시물" className="nav-item">게시물</NavLink>

         
    </div>
  );
}

export default Like