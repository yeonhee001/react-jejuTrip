import React, { useState } from 'react'
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom'
import Plane from '../icons/Plane';
import Button from '../_common/Button';
import Close from '../icons/Close';
import SwipeActionMemo from './SwipeActionMemo';
import {
    DragDropContext,
    Droppable,
    Draggable,
} from '@hello-pangea/dnd';
import CardItem from './CardItem';



function TicketItem({day, idx, topbarright, btnName, edit}) {
    const days = JSON.parse(localStorage.getItem('days'));

    const ticketdate = days.map(day => 
        format(day, 'M.d/eee', { locale: ko })
    );

    const [memoClick, setMemoClick] = useState({}); // 메모 버튼 클릭 상태
    const [trashClick, setTrashClick] = useState({}); // 삭제 버튼 클릭 상태
    const [drag, setDrag] = useState(false); // 일정 순서 버튼 클릭 상태

    const path = btnName === "장소 추가" ? "/planner/plannerdetail/:id/place" : "#"

    //각각 uesState값
    const memo = (index) => {
        setMemoClick((prev) => ({
          ...prev, //기존 값 유지
          [index]: !prev[index], //index값만 변경
        }));
    };

    const trash = (index) => {
        setTrashClick((prev) => ({
          ...prev, //기존 값 유지
          [index]: !prev[index], //index값만 변경
        }));
    };

    return (
        <div className="ticketline" style={{overflow:'hidden', borderRadius:"10px"}}>
        <div className='ticket'>
            <div className='tickettop'>
                <div className='ticketpadding'>
                    <div className='topbar'>
                        <span>{`Day ${idx+1}`}</span><span className='ticketdate'>{ticketdate[0]}</span>
                        <Plane className={"plane"}/>
                        <button className='topbarright'
                          onClick={() => {
                            if (topbarright === "일정 순서 변경") {
                                setDrag(true);
                                if(drag){
                                    topbarright = "완료"
                                }
                            }
                          }}
                        >{topbarright}</button>
                    </div>
                    {day.plans?.map((item, i)=>
                        <ul className='tickebox' key={idx}> {/* Day 1 */}                       
                        <li className='liItem'>
                            <div className='liLine'>
                                <div className='liNum'><span>{i+1}</span></div>
                                <svg width="2" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(0, 0, 0, 0.3)" stroke-width="2"/>
                                </svg>
                            </div>
                            {edit === true && ( //수정모드
                            <SwipeActionMemo className={"swipeactionmemo"} setMemoClick={()=>{memo(i)}} setTrashClick={()=>{trash(i)}}>
                                <CardItem item={item}/>
                                {memoClick[i] && 
                                <div className='planner_memo'>
                                    <p><img src='/imgs/planner_memo_01.svg'/></p>
                                    <button className='memo_close'><Close/></button>
                                    <textarea className='memo_text' placeholder='잊기 쉬운 간단한 내용을 기록해보세요'/>
                                </div>
                                }
                            </SwipeActionMemo>
                            )}
                            {edit === false && ( //읽기모드, 추천일정
                            <CardItem item={item}/>
                            )}
                            {edit === null && ( //읽기모드, 추천일정
                            <CardItem item={item}/>
                            )}
                        </li>
                    </ul>
                    )}
                </div>
            </div>
            <div className='svgline'>
                <svg width="100%" height="10" viewBox="0 0 100% 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="5" x2="100%" y2="5" stroke="#BEBEBE" stroke-dasharray="5 5" stroke-width="1"/>
                </svg>
            </div>
            <div className='ticketbottom'>
                <div className='ticketpadding'>
                    {edit === true && ( //수정모드
                        <NavLink to={path} className='ticketbtn'>
                        <Button btn={"장소 추가"} />
                        </NavLink>
                    )}
                    {edit === false && ( //읽기모드
                        <div className='barcode'>
                        <img className='barcode_img' src='/imgs/Letsgo_barcode.svg' alt='바코드' />
                        </div>
                    )}
                    {edit === null && ( //추천일정
                        <button className='ticketbtn'>
                        <Button btn={btnName} />
                        </button>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default TicketItem