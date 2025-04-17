import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { format, parse } from 'date-fns'
import { ko } from 'date-fns/locale'
import { mode, plan } from '../../api'
import TagBtn from '../../component/_common/TagBtn'
import Button from '../../component/_common/Button'
import SwipeHand from '../../component/_common/SwipeHand'
import TicketItem from '../../component/04-planner/ticket/TicketItem'
import WeatherDate from '../../component/04-planner/weather/WeatherDate'
import Close from '../../component/icons/Close'
import PopupAction from '../../component/_common/PopupAction'
import Calendar from '../../component/04-planner/Calendar'
import Btn2Popup from '../../component/popups/Btn2Popup'
import Btn1Popup from '../../component/popups/Btn1Popup'

import "../../styles/04-planner/plannerDetail.scss";

function PlannerDetail() {
    const { planData, fetchPlanData, newPlan, updatePlan, removePlan, setPlanData } = plan();
    const { enterEditMode, exitEditMode, nullMode, isEditMode } = mode();
    const { id } = useParams(); // url에서 id 가져오기
    const userId = String(JSON.parse(sessionStorage.getItem('user'))?.id);

    const location = useLocation();
    const navigate = useNavigate();
console.log(isEditMode == false);

    useEffect(() => {
        if (location.state?.isEdit === true && isEditMode == false) {
        const { isEdit, ...rest } = location.state;
        setPlanData(rest);
        enterEditMode(); // isEditMode를 true로 변경하는 함수
        } else if (isEditMode == false) {
        fetchPlanData(userId, id);
        }
    }, [userId, id, location?.state]);
    
    const [edit, setEdit] = useState(false)
    const searchListItem = JSON.parse(localStorage.getItem('searchListItem')); //장소 추가 아이템
    const [title, setTitle] = useState(planData.title ? planData.title : "나의 제주 여행"); 
    const [eTitle, setETitle] = useState(title); //input에 입력하는 임시 값
    const [tripDay, setTripDay] = useState(() => {
        if (planData?.date) return planData.date;
        const allDays = JSON.parse(localStorage.getItem('allDays'));
        return allDays;
    }); // 실제 화면에 보여지는 날짜
    const [tempDays, setTempDays] = useState(tripDay); // 달력에서 선택한 임시 날짜
    const [calendar, setCalendar] = useState(false); //캘린더 열고 닫고
    const [isPopupOpen, setIsPopupOpen] = useState(false) //삭제 팝업
    const [isPopupOpen2, setIsPopupOpen2] = useState(false) //저장 팝업
    const [isPopupOpen3, setIsPopupOpen3] = useState(false) //수정 중 나가기 팝업
    const [isPopupOpen4, setIsPopupOpen4] = useState(false) //수정 중 나가기 팝업
    const [isPopupOpen5, setIsPopupOpen5] = useState(false) //수정 중 나가기 팝업

    const ticketDate = tripDay?.map(day =>
        format(parse(day, 'yyyy.MM.dd', new Date()), 'M.d/eee', { locale: ko })
    );

    useEffect(() => {
        if (planData?.title) {
            setTitle(planData?.title);
        }
    }, [planData?.title]);
    
    useEffect(() => {
        if (planData?.date) {
            setTripDay(planData.date);
        }
    }, [planData?.date]);
    
    // 기존 여행 일정 수정
    function updateCheckData(newList) {
        updatePlan(userId, newList)
    .catch(err => {
        console.error(err);
        alert('수정에 실패했습니다.');
    });
    }

    // 데이터 변경사항 확인하여 팝업 발생 관리
    async function openSavePopup() {
        const isDataChanged = planData?.item?.days?.length

        if(isDataChanged) {
            setIsPopupOpen2(true);

        const newList = {
            ...planData,
            title : title,
            date : tripDay,
            checkId : "",
            days : [{
                day : ticketDate,
                plans : [searchListItem]
            }]
        };

        if (!location.state?.isEdit === true) {
            // 기존 체크리스트일 경우 PUT
            updateCheckData(newList);
            localStorage.removeItem('allDays');
            fetchPlanData(userId, id);
            setEdit(false)
            exitEditMode();
        } else {
            // 새 체크리스트일 경우 POST
            console.log(planData?.userId);
            await newPlan(userId, newList);
            fetchPlanData(userId, id);
            setEdit(false)
            exitEditMode();
        }
        }
    }

    // 편집 모드 나가기
    function handleClose() {
        if(edit) {
            setIsPopupOpen3(true);
        } else {
            exitEditMode();
        }
    }
    
    return (
        <div className='planner_detail'>
            <div className='weather_content'>
                <h2>제주시 날씨는</h2>
                <WeatherDate/>
            </div>
            {isEditMode ?(
            <> {/* 편집모드 */}
            <div className='checkdetail-icon-close' onClick={handleClose} >
                <Close/>
            </div>
            <div className='planner_content'>
                <div className='planner'>
                    <input
                        value={title}
                        onChange={(e) => {setTitle(e.target.value);  setEdit(true)}}
                        onBlur={() => setETitle(false)}
                        className="planner_title"
                        />
                    <button onClick={()=>{enterEditMode()}}>{isEditMode ? '편집 중' : '편집'}</button>
                </div>
                <button onClick={() => {
                    setCalendar((prev) => !prev);
                    setEdit(true);
                    }} 
                    className='trip_date'>
                    { tripDay && `${tripDay[0]} - ${tripDay[tripDay.length-1]}`}
                </button>
                {calendar && <div className="overlay"/>}
                <PopupAction className={"calendar_popup"} useState={calendar}>
                    <div className="calendar_top">
                        <button onClick={()=>{setCalendar(false); setTripDay(tempDays);}}><Close className={"calendar_close"}/></button>
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
                    <NavLink
                    to = "/my/checklist"
                    onClick={(e) => {
                    if (edit) {
                        e.preventDefault();  
                        setIsPopupOpen4(true);
                    }}}>
                        <TagBtn tagbtn={"체크리스트"}/></NavLink>
                    <NavLink to = "/planner/pickplan"
                    onClick={(e) => {
                        if (edit) {
                            e.preventDefault();
                            setIsPopupOpen5(true);
                        }}}>
                    <TagBtn tagbtn={"추천 일정 보러가기"}/>
                    </NavLink>
                    <button onClick={() => {setIsPopupOpen(true);}}><TagBtn tagbtn={"전체 일정 삭제"}/></button>
                </div>
                <div className='ticket_content'>
                    <div className='hand'><SwipeHand/></div>
                    { tripDay?.map((day, idx)=>
                        <div key={idx}>
                        <TicketItem
                            idx={idx}
                            topbarright={"일정 순서 변경"}
                            btnName={"장소 추가"}
                            ticketdate={ticketDate[idx]}
                            setEdit={setEdit}
                        />
                    </div>
                    )}
                </div>
            </div>
            <button onClick={()=>{
                    if(isEditMode == true){
                        openSavePopup()
                    }else{
                        exitEditMode();
                    }
                }} className='cardbtn'><Button btn={"전체 일정 저장하기"} className={"planner_save"}/></button>
            </>
            ):(
            <> {/* 읽기모드 */}
            <div className='planner_content'>
                <div className='planner'>
                    <h2 className="planner_title">{planData.title}</h2>
                    <button onClick={()=>{enterEditMode()}}>{isEditMode ? '편집 중' : '편집'}</button>
                </div>
                <div className='trip_date'>{ tripDay && `${tripDay[0]} - ${tripDay[tripDay.length-1]}`}</div>
                <div className='planner_tagbtn'>
                    <NavLink to="/my/checklist"><TagBtn tagbtn={"체크리스트"}/></NavLink>
                    <NavLink
                        onClick={() => {nullMode();}}
                        to="/planner/pickplan"
                    >
                        <TagBtn tagbtn={"추천 일정 보러가기"}/>
                    </NavLink>
                    <button onClick={() => setIsPopupOpen(true)}><TagBtn tagbtn={"전체 일정 삭제"}/></button>
                </div>
                <div className='ticket_content'>
                    { tripDay?.map((day, idx)=>
                        <div key={idx}>
                        <TicketItem
                        idx={idx}
                        topbarright={""}
                        ticketdate={ticketDate[idx]}   
                        />
                    </div>
                    
                    )}
                </div>
            </div>
            </>
            )}


        { edit &&
            <>
                <Btn2Popup
                    isOpen={isPopupOpen3}
                    setIsOpen={setIsPopupOpen3}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen3(false)
                        exitEditMode();
                        }}/>
                <Btn2Popup
                    isOpen={isPopupOpen4}
                    setIsOpen={setIsPopupOpen4}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen4(false)
                        navigate(`/my/checklist`)
                        }}/>
                <Btn2Popup
                    isOpen={isPopupOpen5}
                    setIsOpen={setIsPopupOpen5}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen5(false)
                        navigate(`/planner/pickplan`)
                        }}/>
            </>
                }
        <Btn2Popup
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        type={"delete"}
        onConfirm={() => {
                removePlan(id, userId)
                navigate(`/planner`)
                setIsPopupOpen(false)
                }}/>
        <Btn1Popup isOpen={isPopupOpen2} setIsOpen={setIsPopupOpen2} type={"save"}/>
        </div>
    )
}

export default PlannerDetail