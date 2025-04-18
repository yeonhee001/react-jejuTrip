import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { format, parse } from 'date-fns'
import { ko } from 'date-fns/locale'
import { mode, plan } from '../../api'
import axios from 'axios'
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
    const { planData, fetchPlanData, newPlan, updatePlan, removePlan, setPlanData, LikeData } = plan();
    const { enterEditMode, exitEditMode, isEditMode } = mode();
    const { id } = useParams(); // url에서 id 가져오기
    const userId = String(JSON.parse(sessionStorage.getItem('user'))?.id);
    const searchListItem = JSON.parse(localStorage.getItem('searchListItem')); //장소 추가 아이템
    const allDays = JSON.parse(localStorage.getItem('allDays'));
    const edit = JSON.parse(localStorage.getItem('edit'));

    const location = useLocation();
    const navigate = useNavigate();

    const [eTitle, setETitle] = useState(""); //input에 입력하는 임시 값
    const [tripDay, setTripDay] = useState([]); // 실제 화면에 보여지는 날짜
    const [calendar, setCalendar] = useState(false); //캘린더 열고 닫고
    
    const [isPopupOpen, setIsPopupOpen] = useState(false) //삭제 팝업
    const [isPopupOpen2, setIsPopupOpen2] = useState(false) //저장 팝업
    const [isPopupOpen3, setIsPopupOpen3] = useState(false) //수정 중 나가기 팝업
    const [isPopupOpen4, setIsPopupOpen4] = useState(false) //수정 중 나가기 팝업
    const [isPopupOpen5, setIsPopupOpen5] = useState(false) //수정 중 나가기 팝업
    const [checkData, setCheckData] = useState([]) //수정 중 나가기 팝업

    const ticketDate = tripDay?.map(day =>
        format(parse(day, 'yyyy.MM.dd', new Date()), 'M.d/eee', { locale: ko })
    );

    useEffect(()=>{
        if(edit){
            enterEditMode()
            localStorage.removeItem('edit');
        }
    },[])

    useEffect(() => {
        if (location.state?.isEdit === true && !searchListItem) {
            const { isEdit, ...rest } = location.state;
            setPlanData(rest);
            enterEditMode(); // isEditMode를 true로 변경하는 함수
        }
        else if (isEditMode === false) {
            exitEditMode();
            fetchPlanData(userId, id);
        }
    }, [userId, id, location?.state]);

    
    useEffect(() => {
        if (planData?.date){
            setTripDay(planData.date);
            if(allDays){
                setTripDay(allDays)
            }
        }
        if (planData?.title) setETitle(planData.title);
    }, [planData?.date, calendar]);
    
    useEffect(() => {
        if(eTitle){
            localStorage.setItem(`editTitle-${id}`, eTitle);
        }
    }, [eTitle]);

    useEffect(() => {
        const savedTitle = localStorage.getItem(`editTitle-${id}`);
        if (savedTitle) {
            setETitle(savedTitle);
        } else {
            setETitle(planData?.title);
        }
    }, [planData]);
    
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
            title : eTitle,
            date : tripDay,
            days : [{
                day : ticketDate,
                plans : [searchListItem]
            }]
        };

        if (location.state?.isEdit !== true) {
            // 기존 체크리스트일 경우 PUT
            updateCheckData(newList);
            localStorage.removeItem('allDays');
            localStorage.removeItem(`editTitle-${id}`);
            exitEditMode();
        } else {
            // 새 체크리스트일 경우 POST
            localStorage.removeItem('allDays');
            localStorage.removeItem(`editTitle-${id}`);
            await newPlan(userId, newList);
            exitEditMode();
        }
        }
    }

    // 편집 모드 나가기
    function handleClose() {
        if(isEditMode == true) {
            setIsPopupOpen3(true);
        } else {
            exitEditMode();
        }
    }
    //이건 체크리스트 데이터 비교하려면 필요행
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_APIURL}/check/user/${userId}`)
        .then(res=>{
            setCheckData(res.data);
        })
    },[])
    
    // 체크리스트 데이터 가져와서 링크 넘겨주기
    function checkListId () {
        axios.get(`${process.env.REACT_APP_APIURL}/check/user/${userId}`)
        .then(res=>{
            setCheckData(res.data);
            if(id == checkData[0]?.planId){
                navigate(`/my/checklist/checkDetail/${checkData[0]?.id}`);
            }
        })
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
                        value={eTitle ?? ""}
                        onChange={(e) => {setETitle(e.target.value);  enterEditMode()}}
                        onBlur={(e) => setETitle(e.target.value)}
                        className="planner_title"
                        />
                    <button onClick={()=>{enterEditMode()}}>{isEditMode ? '편집 중' : '편집'}</button>
                </div>
                <button onClick={() => {
                    setCalendar((prev) => !prev);
                    enterEditMode();
                    }} 
                    className='trip_date'>
                    { tripDay && `${tripDay[0]} - ${tripDay[tripDay.length-1]}`}
                </button>
                {calendar && <div className="overlay"/>}
                <PopupAction className={"calendar_popup"} useState={calendar}>
                    <div className="calendar_top">
                        <button onClick={()=>{setCalendar(false);}}><Close className={"calendar_close"}/></button>
                        <h2>여행 일정 등록</h2>
                    </div>
                    <div className="calendar_content">
                        <Calendar
                        type={'detail'}
                        btnName={"여행 일정 수정하기"}
                        onClick={() => {
                            setCalendar(false)
                            }}/>
                    </div>
                </PopupAction>
                <div className='planner_tagbtn'>
                    { id == checkData[0]?.planId && 
                    <NavLink
                    to="/planner/pickplan"
                    onClick={(e) => {
                        checkListId();
                    if (isEditMode == true) {
                        e.preventDefault();  
                        setIsPopupOpen4(true);
                    }}}>
                        <TagBtn tagbtn={"체크리스트"}/></NavLink>}
                    <NavLink
                    onClick={(e) => {
                        if (isEditMode == true) {
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
                        />
                    </div>
                    )}
                </div>
            </div>
            <button onClick={()=>{
                if(!planData?.item?.days[0]?.plans.length){
                    return
                }
                    if(isEditMode == true){
                        openSavePopup()
                        localStorage.removeItem('searchListItem')
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
                    { id == checkData[0]?.planId && 
                    <NavLink onClick={checkListId}><TagBtn tagbtn={"체크리스트"}/></NavLink>}
                    <NavLink to="/planner/pickplan">
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


        { isEditMode == true &&
            <>
                <Btn2Popup
                    isOpen={isPopupOpen3}
                    setIsOpen={setIsPopupOpen3}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen3(false)
                        exitEditMode();
                        localStorage.removeItem('searchListItem');
                        }}
                    onCancel={()=>{localStorage.removeItem('searchListItem');}}
                    />
                    
                <Btn2Popup
                    isOpen={isPopupOpen4}
                    setIsOpen={setIsPopupOpen4}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen4(false)
                        navigate(`/my/checklist`);
                        localStorage.removeItem('searchListItem');
                        }}
                    />
                <Btn2Popup
                    isOpen={isPopupOpen5}
                    setIsOpen={setIsPopupOpen5}
                    type={"exit"}
                    onConfirm={() => {
                        setIsPopupOpen5(false)
                        navigate(`/planner/pickplan`);
                        localStorage.removeItem('searchListItem');
                        }}
                    onCancel={()=>{localStorage.removeItem('searchListItem');}}
                    />
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