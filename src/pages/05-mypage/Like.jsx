import React from 'react'
import './Like.scss';
import './TabPage.jsx';
import './TabItem.jsx';
import './Toggle.jsx';

function Like() {
  const [places,setPlaces] = useState([true]);
    const [Feed,setFeed] = useState([]);

  return (
    <div>
            <div>좋아요</div>
  
            <NavLink to="/장소">장소</NavLink>
            <NavLink to="/게시물">게시물</NavLink>

         
    </div>
  );
}

export default Like