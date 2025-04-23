import React, { useState } from 'react';
import { mode } from '../../../api';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TagBtn from '../../_common/TagBtn';

function PlannerTagBtn({id, userId, checkData, setCheckData, setIsPopupOpenDelete, setIsPopupOpenCheckList, setIsPopupOpenPickPlan }) {
    const { isEditMode } = mode();
    const navigate = useNavigate();


    // 체크리스트 데이터 가져와서 링크 넘겨주기
    function checkListId () {
        axios.get(`${process.env.REACT_APP_APIURL}/check/user/${userId}`)
        .then(res=>{
            setCheckData(res.data);
            checkData.forEach(item => {
                if(id == item?.planId){
                    navigate(`/my/checklist/checkDetail/${item?.id}`);
                }
            })
        })
    }

    return (
    <div className='planner_tagbtn'>
        { checkData.filter(item=>item.planId == id).length==1 &&
        <NavLink
        to={isEditMode ? "/planner/pickplan" : undefined}
        onClick={(e) => {
            if (isEditMode) {
                e.preventDefault();
                setIsPopupOpenCheckList(true);
            } else {
                checkListId();
            }
        }}>
            <TagBtn tagbtn={"체크리스트"}/></NavLink>
        }
        <NavLink
        to={isEditMode ? undefined : "/planner/pickplan"}
        onClick={(e) => {
            if (isEditMode == true) {
                e.preventDefault();
                setIsPopupOpenPickPlan(true);
            }}}>
        <TagBtn tagbtn={"추천 일정 보러가기"}/>
        </NavLink>

        <button onClick={() => {setIsPopupOpenDelete(true);}}><TagBtn tagbtn={"전체 일정 삭제"}/></button>
    </div>

    )
}

export default PlannerTagBtn