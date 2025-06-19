import React from 'react'
import LikeWhite from '../../_common/LikeWhite';

function TripDetailItem({img, title, address, introduction, phone}) {
  // const [likedItems, setLikedItems] = useState([]); // 좋아요 상태 관리

  // const toggleLike = (id) => {
  //   setLikedItems((prevLiked) =>
  //     prevLiked.includes(id)
  //       ? prevLiked.filter((item) => item !== id) // 이미 있으면 제거
  //       : [...prevLiked, id] // 없으면 추가
  //   );
  // };

  return (
    <div className="trip-detail-item">
      <div className='trip-detail-top'>
        <div className='trip-detail-img'>
          <img src={img} alt="상세이미지" />
        </div>
        <LikeWhite className={'likewhite'} liked={false}/>
        {/* <LikeWhite liked={true}/> */}
      </div>
      <div className='trip-detail-text'>
        <h3>{title}</h3>
        <b>{address}</b>
        <p>{introduction}</p>
        <span>전화번호 : {phone}</span>
      </div>

    </div>
  );
}

export default TripDetailItem