import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PickPlanItem from '../../component/04-planner/PickPlanItem';

import "../../styles/04-planner/pickplan.scss";
import TagBtn from '../../component/_common/TagBtn';
import { mode, plan } from '../../api';
import Button from '../../component/_common/Button';

function PickPlan() {
    const { pinkPlanData, planData } = plan();
    const { nullMode, isEditMode } = mode();
    const [dates, setDates] = useState('');
    const [select, setSelect] = useState('');
    const [data, setData] = useState('');

    //parseInt() : 문자열에서 앞에 있는 숫자만 뽑아서 정수로 바꿔줌
    const nights = parseInt(dates);
    const days = nights + 1;

    const button = []
    for(let i=1; i<=days; i++){
        button.push(i)
    }
    useEffect(()=>{
        pinkPlanData()
    }, [])
    
    const tagBtn = useRef([]);
    const scroll = (idx) => {
        const target = tagBtn?.current[idx];  // 이동할 대상 요소
        const targetOffsetTop = target.offsetTop;  // 해당 요소의 상단 위치
      
        window.scrollTo({
          top: targetOffsetTop -100,  // 해당 요소로 스크롤
          behavior: 'smooth',    // 부드러운 스크롤
        });
      };

    const handleChange = (e) => {
        setDates(e.target.value);
        setSelect(e.target.value);
        nullMode();
    };

    return (
        <div className='pickplan_content'>
            <h2 className='pickplan_title'>몇 박으로 계획 중이세요?</h2>
            <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ mt: 2.5, mb: 2.5, minWidth: 120, zIndex: 99999 }} size="small">
                <InputLabel id="trips">선택</InputLabel>
                <Select
                labelId="trips"
                id="demo-simple-select"
                value={dates}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={"1days"}>1박 2일</MenuItem>
                <MenuItem value={"2days"}>2박 3일</MenuItem>
                <MenuItem value={"3days"}>3박 4일</MenuItem>
                <MenuItem value={"4days"}>4박 5일</MenuItem>
                <MenuItem value={"5days"}>5박 6일</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <p className='pickplan_title'><span>추천 일정</span> 입니다.</p>
            <p>떠나봅서에서 추천한 일정으로 여행을 떠나보세요.</p>
            <div className="pickplan_btn">
                {button?.map((day, idx) => (
                <button onClick={()=>{scroll(idx)}} key={day}>
                    <TagBtn tagbtn={`Day ${day}`}/>
                </button>
                ))}
            </div>
            
            {select === "1days" &&
            <>
                <PickPlanItem planData={planData[0].n1d2[0]} tagBtn={tagBtn}/>
                <button onClick={()=>{
                }} className='cardbtn'><Button btn={"전체 일정 가져가기"} className={"planner_save"}/>
                </button>
            </>
            }
            {select === "2days" &&
            <>
                <PickPlanItem  planData={planData[1].n2d3[0]} tagBtn={tagBtn}/>
                <button onClick={()=>{
                }} className='cardbtn'><Button btn={"전체 일정 가져가기"} className={"planner_save"}/></button>
            </>
            }
            {select === "3days" &&
            <>
                <PickPlanItem  planData={planData[2].n3d4[0]} tagBtn={tagBtn}/>
                <button onClick={()=>{
                }} className='cardbtn'><Button btn={"전체 일정 가져가기"} className={"planner_save"}/></button>
            </>
            }
            {select === "4days" &&
            <>
                <PickPlanItem  planData={planData[3].n4d5[0]} tagBtn={tagBtn}/>
                <button onClick={()=>{
                }} className='cardbtn'><Button btn={"전체 일정 가져가기"} className={"planner_save"}/></button>
            </>
            }
            {select === "5days" &&
            <>
                <PickPlanItem  planData={planData[4].n5d6[0]} tagBtn={tagBtn}/>
                <button onClick={()=>{
                }} className='cardbtn'><Button btn={"전체 일정 가져가기"} className={"planner_save"}/></button>
            </>
            }
            
        </div>
    )
}

export default PickPlan