import React from 'react'
import TagBtn from '../../component/_common/TagBtn'
import Button from '../../component/_common/Button'
import SwipeHand from '../../component/_common/SwipeHand'
import TicketItem from '../../component/04-planner/TicketItem'
import WeatherItem from '../../component/04-planner/weather/WeatherItem'
import { NavLink } from 'react-router-dom'
import "../../styles/04-planner/plannerDetail.scss";

function PlannerDetail() {
    return (
    <>
    <div className='weather_content'>
        <h2>제주시 날씨는</h2>
        <div className='weather_wf'>
            <span>9/14</span>
            <span>약간 흐리고 소나기</span>
        </div>
        <div className='weather_item'>
            <WeatherItem/>
            <WeatherItem/>
            <WeatherItem/>
            <WeatherItem/>
        </div>
    </div>
    <div></div>
    <div className='planner_content'>
        <div className='planner'>
            <h2>나의 제주 여행</h2>
            <NavLink>편집</NavLink>
        </div>
        <div className='trip_date'>2025.04.08 - 04.10</div>
        <div className='planner_tagbtn'>
            <TagBtn tagbtn={"체크리스트"}/>
            <TagBtn tagbtn={"추천 일정 가져오기"}/>
            <TagBtn tagbtn={"일정 삭제"}/>
        </div>
        <div className='ticket_content'>
            <div className='hand'><SwipeHand/></div>
            <TicketItem/>
            <TicketItem/>
        </div>
    </div>
    <button className='cardbtn'><Button btn={"전체 일정 저장하기"} className={"planner_save"}/></button>
    </>
    )
}

export default PlannerDetail