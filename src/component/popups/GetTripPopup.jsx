import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Close from '../icons/Close';

function GetTripPopup({ isOpen, setIsOpen, listData }) {
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
                    <p>여행 선택</p>
                    <div onClick={() => setIsOpen(false)}>
                        <Close className={'popup-closeicon'}/>
                    </div>
                </div>
        
                <div className='popup-cont'>
                    <p>체크리스트를 추가할 여행을 선택해주세요.</p>
        
                    <FormControl sx={{ mt: 2, mb: 3, minWidth: 120, zIndex: 99999 }} size="small">
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
        
                    <Link to='/my/checklist/checkDetail/999' className='no-select-link'>여행 선택하지 않고 추가하기 →</Link>
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

export default GetTripPopup