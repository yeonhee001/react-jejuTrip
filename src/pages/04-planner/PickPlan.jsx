<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PickPlanItem from '../../component/04-planner/PickPlanItem';

import "../../styles/04-planner/pickplan.scss";
import axios from 'axios';

function PickPlan() {
    const [dates, setDates] = useState('');
    const [select, setSelect] = useState('');
    const [data, setData] = useState([]);

    const handleChange = (e) => {
        setDates(e.target.value);
        setSelect(e.target.value);
    };

    const instance = axios.create({
        baseURL : "http://localhost:3030",
      });
    
    useEffect(()=>{
        Promise.all([
            instance.get('/1n2d'),
            instance.get('/2n3d'),
            instance.get('/3n4d'),
            instance.get('/4n5d'),
            instance.get('/5n6d'),
        ])
        .then(res=>{
            const n1d2 = res[0].data;
            const n2d3 = res[1].data;
            const n3d4 = res[2].data;
            const n4d5 = res[3].data;
            const n5d6 = res[4].data;
            setData({n1d2,n2d3,n3d4,n4d5,n5d6});
        })
    },[])

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

            {select === "1days" &&
            <PickPlanItem selectedDay={dates} data={data.n1d2[0]}/>
            }
            {select === "2days" &&
            <PickPlanItem selectedDay={dates} data={data.n2d3[0]}/>
            }
            {select === "3days" &&
            <PickPlanItem selectedDay={dates} data={data.n3d4[0]}/>
            }
            {select === "4days" &&
            <PickPlanItem selectedDay={dates} data={data.n4d5[0]}/>
            }
            {select === "5days" &&
            <PickPlanItem selectedDay={dates} data={data.n5d6[0]}/>
            }
        </div>
    )
=======
import React from 'react'

function PickPlan() {
  return (
    <div>PickPlan</div>
  )
>>>>>>> origin/지호
}

export default PickPlan