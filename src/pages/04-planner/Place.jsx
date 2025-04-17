import React, { useState } from 'react'
import TabPage from '../../component/_common/TabPage';
import Category from '../../component/04-planner/search/Category';
import "../../styles/04-planner/place.scss";

function Place() {
    // selectedTab 이용해서 탭 별 내용 넣으세요,,,! Activity.jsx 참고
    const [selectedTab, setSelectedTab] = useState(0);

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
            <div>좋아요 내가 함</div>
            }
        </div>
    )
}

export default Place