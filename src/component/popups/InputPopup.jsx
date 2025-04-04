import React from 'react'
import Close from '../icons/Close'

function InputPopup({ isOpen, setIsOpen }) {
  
  // 팝업 배경 클릭 시 팝업 닫힘
  function closePopup(e) {
    if(e.target.classList.contains('popup-box')) {
      setIsOpen(false);
    }
  }

  // form 핸들러
  function handleSubmit(e) {
    e.preventDefault();
    setIsOpen(false);
  }

  // 팝업이 닫혀있으면 랜더링 하지 않음.
  if (!isOpen) return null;

  return (
    <div className='popup-box' onClick={closePopup}>
      <div className='closepopup'>
        <div className='popup-title'>
          <p>여행 제목 수정</p>
          <div onClick={() => setIsOpen(false)}>
            <Close className={'popup-closeicon'}/>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='popup-cont'>
            <input type='text' placeholder='텍스트를 입력해주세요.'/>
          </div>
          <div className='closepopup-btns-box'>
            <button type='button' className='btn2popup-btn' onClick={() => setIsOpen(false)}>
              취소
            </button>
            <button type='submit' className='btn1popup-btn' onClick={() => setIsOpen(false)}>
              확인
            </button>
          </div>
        </form>

    </div>
  </div>
  )
}

export default InputPopup