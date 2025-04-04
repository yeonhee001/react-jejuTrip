import React, { useState } from 'react';
import Down_black from '../../icons/Down_black';
import Up_black from '../../icons/Up_black';

function TripFilter() {
  const [isOpen, setIsOpen] = useState(false);

  // 리스트 보이기/숨기기 토글 함수
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tripfilter">
      <div className="updown">
        <button onClick={toggleList} className="order-button">
          오름차순
        </button>
        {!isOpen ? (
          <div onClick={toggleList}>
            <Down_black className={'trip_down'}/>
          </div>
        ) : (
          <div onClick={toggleList}>
            <Up_black className={'trip_up'} />
          </div>
        )}
      </div>

      {isOpen && (
        <ul className="filter-list">
          <li onClick={() => (" ")}>오름차순</li>
          <li onClick={() => (" ")}>내림차순</li>
          <li onClick={() => (" ")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
}

export default TripFilter;
