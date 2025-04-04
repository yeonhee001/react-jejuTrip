import React, { useState } from 'react'
import Close from '../icons/Close';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function GetCheckPopup({ isOpen, setIsOpen, listData }) {
    const [selectedValue, setSelectedValue] = useState('');
    
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    // 팝업 배경 클릭 시 팝업 닫힘
    function closePopup(e) {
        if(e.target.classList.contains('popup-box')) {
            setIsOpen(false);
        }
    }

    // 팝업이 닫혀있으면 랜더링 하지 않음.
    if (!isOpen) return null;
    
    return (
        <div className='popup-box' onClick={closePopup}>
            <div className='closepopup'>
                <div className='popup-title'>
                    <p>체크리스트 선택</p>
                    <div onClick={() => setIsOpen(false)}>
                        <Close className={'popup-closeicon'}/>
                    </div>
                </div>

                <div className='popup-cont'>
                    <p>기존 체크리스트 목록 가져오기</p>

                    <FormControl sx={{ mt: 2, minWidth: 120, zIndex: 99999 }} size="small">
                        <InputLabel id="dropdown-label">선택</InputLabel>
                        <Select
                            labelId="dropdown-label"
                            id="dropdown"
                            value={selectedValue}
                            label="옵션 선택"
                            onChange={handleChange}
                            MenuProps={{
                                sx: { zIndex: 100000 }, // ✅ 팝업보다 앞에 배치
                            }}
                        >
                            {
                                listData.map((item, i)=>{
                                    return <MenuItem value={`item${i}`}>{item.title}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div className='closepopup-btns-box'>
                    <button className='btn2popup-btn' onClick={() => setIsOpen(false)}>
                        취소
                    </button>
                    <button className='btn1popup-btn' onClick={() => setIsOpen(false)}>
                        확인
                    </button>
                </div>

            </div>
        </div>
    )
}

export default GetCheckPopup