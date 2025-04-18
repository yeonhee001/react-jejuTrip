import React, { useEffect, useState } from 'react'
import TabPage from '../../component/_common/TabPage';
import Category from '../../component/04-planner/search/Category';
import PlannerLike from '../../component/04-planner/search/PlannerLike';
import "../../styles/04-planner/place.scss";
import { mode } from '../../api';

function Place() {
    // selectedTab 이용해서 탭 별 내용 넣으세요,,,! Activity.jsx 참고
    const { enterEditMode, exitEditMode, isEditMode } = mode();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(()=>{
        enterEditMode()
    },[])

    return (
        <div className='planner_place'>
            <TabPage type={'plan'} onTabChange={setSelectedTab}/>
            {
            selectedTab === 0
            ?
            // 지역별
            <Category/>
            :
            // 좋아요
            <PlannerLike/>
            }
        </div>
    )
}

export default Place