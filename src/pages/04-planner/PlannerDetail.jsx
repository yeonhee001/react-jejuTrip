import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import TagBtn from '../../component/_common/TagBtn'
import Button from '../../component/_common/Button'
import SwipeHand from '../../component/_common/SwipeHand'
import TicketItem from '../../component/04-planner/TicketItem'
import WeatherDate from '../../component/04-planner/weather/WeatherDate'
import Close from '../../component/icons/Close'
import PopupAction from '../../component/_common/PopupAction'
import Calendar from '../../component/04-planner/Calendar'
import "../../styles/04-planner/plannerDetail.scss";
import axios from 'axios'


function PlannerDetail() {
    const days = JSON.parse(localStorage.getItem('days'));
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(true); // true: 편집 중, false: 읽기 모드, null: 기본 모드
    const [title, setTitle] = useState("나의 제주 여행"); 
    const [eTitle, setETitle] = useState(title); //input에 입력하는 임시 값
    const [tripDay, setTripDay] = useState([days]); // 실제 화면에 보여지는 날짜
    const [tempDays, setTempDays] = useState(tripDay); // 달력에서 선택한 임시 날짜
    const [calendar, setCalendar] = useState(false); //캘린더 열고 닫고

    const instance = axios.create({
        baseURL : "http://localhost:3030/1n2d",
    });
    
    useEffect(()=>{
        instance.get('/')
        .then(res=>{
            setData(res.data[0])
        })
        },[])

    return (
    <div className='planner_detail'>
        <div className='weather_content'>
            <h2>제주시 날씨는</h2>
            <WeatherDate/>
        </div>
        {edit?(
        <> {/* 편집모드 */}
        <div className='planner_content'>
            <div className='planner'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setETitle(false)}
                    className="planner_title"
                    />
                <button onClick={()=>{setEdit(true)}}>{edit? '편집 중' : '편집'}</button>
            </div>
            <button onClick={()=>{setCalendar((prev) => !prev)}} className='trip_date'>{`${days[0]} - ${days[1]}`}</button>
            {calendar && <div className="overlay"/>}
            <PopupAction className={"calendar_popup"} useState={calendar}>
                <div className="calendar_top">
                    <button onClick={()=>{setCalendar(false)}}><Close className={"calendar_close"}/></button>
                    <h2>여행 일정 등록</h2>
                </div>
                <div className="calendar_content">
                    <Calendar
                    type={'detail'}
                    btnName={"여행 일정 수정하기"}
                    onClick={() => {
                        setTripDay(tempDays);
                        setCalendar(false)
                        }}/>
                </div>
            </PopupAction>
            <div className='planner_tagbtn'>
                <NavLink><TagBtn tagbtn={"체크리스트"}/></NavLink>
                <NavLink
                    onClick={() => {setEdit(null);}}
                    to="/planner/pickplan"
                >
                <TagBtn tagbtn={"추천 일정 가져오기"}/>
                </NavLink>
                <button><TagBtn tagbtn={"일정 삭제"}/></button>
            </div>
            <div className='ticket_content'>
                <div className='hand'><SwipeHand/></div>
                { data.days?.map((day, idx)=>
                <div key={idx}>
                    <TicketItem
                        idx={idx}
                        day={day}
                        topbarright={"일정 순서 변경"}
                        btnName={"장소 추가"}
                        edit={edit}
                    />
                </div>
                )}
            </div>
        </div>
        <button onClick={()=>{setEdit(false)}} className='cardbtn'><Button btn={"전체 일정 저장하기"} className={"planner_save"}/></button>
        </>
        ):(
        <> {/* 읽기모드 */}
        <div className='planner_content'>
            <div className='planner'>
                <h2 className="planner_title">나의 제주 여행</h2>
                <button onClick={()=>{setEdit(true)}}>{edit? '편집 중' : '편집'}</button>
            </div>
            <div className='trip_date'>{`${days[0]} - ${days[1]}`}</div>
            <div className='planner_tagbtn'>
                <NavLink><TagBtn tagbtn={"체크리스트"}/></NavLink>
                <NavLink
                    onClick={() => {setEdit(null);}}
                    to="/planner/pickplan"
                >
                    <TagBtn tagbtn={"추천 일정 가져오기"}/>
                </NavLink>
                <button><TagBtn tagbtn={"일정 삭제"}/></button>
            </div>
            <div className='ticket_content'>
                <div className='hand'><SwipeHand/></div>
                <TicketItem
                    day={"Day 1"}
                    topbarright={"일정 순서 변경"}
                    btnName={"장소 추가"}
                    edit={edit}
                />
            </div>
        </div>
        </>
        )}
    </div>
    )
}

export default PlannerDetail