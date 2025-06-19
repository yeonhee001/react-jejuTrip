import React from 'react'
import Plane from '../icons/Plane';
import Button from '../_common/Button';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import SwipeActionMemo from './SwipeActionMemo';


function TicketItem() {
    return (
        <div className="ticketline" style={{overflow:'hidden', borderRadius:"10px"}}>
        <div className='ticket'>
            <div className='tickettop'>
                <div className='ticketpadding'>
                    <div className='topbar'>
                        <span>Day 1</span><span className='ticketdate'>4.8/화</span>
                        <Plane className={"plane"}/>
                        <span className='topbarright'>일정 순서 변경</span>
                    </div>
                <ul className='tickebox'>
                    <li className='liItem'>
                        <div className='liLine'>
                            <div className='liNum'><span>1</span></div>
                            <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0, 0, 0, 0.3)" stroke-width="2"/>
                            </svg>
                        </div>
                        <SwipeActionMemo className={"swipeactionmemo"}>
                            <h2 className='title'>금 오름</h2>
                            <p>비가 오면 물이 고이는 산정화구호가 자리한 오름</p>
                            <p>관광명소·애월,한림</p>
                        </SwipeActionMemo>
                    </li>
                </ul>
                <ul className='tickebox'>
                    <li className='liItem'>
                        <div className='liLine'>
                            <div className='liNum'><span>1</span></div>
                            <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0, 0, 0, 0.3)" stroke-width="2"/>
                            </svg>
                        </div>
                        <SwipeActionMemo className={"swipeactionmemo"}>
                            <h2 className='title'>금 오름</h2>
                            <p>비가 오면 물이 고이는 산정화구호가 자리한 오름</p>
                            <p>관광명소·애월,한림</p>
                        </SwipeActionMemo>
                    </li>
                </ul>
                </div>
            </div>
            <div className='svgline'>
                <svg width="100%" height="10" viewBox="0 0 100% 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke="#BEBEBE" stroke-dasharray="5 5" stroke-width="1"/>
                </svg>
            </div>
            <div className='ticketbottom'>
                <div className='ticketpadding'>
                    <NavLink to="/planner/plannerdetail/:id/place" className='ticketbtn'><Button btn={"장소 추가"}/></NavLink>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TicketItem