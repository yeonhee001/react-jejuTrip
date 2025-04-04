import React, { useState } from 'react'
import TabPage from '../../component/_common/TabPage';
import "../../styles/04-planner/place.scss";


function Place() {
    // selectedTab 이용해서 탭 별 내용 넣으세요,,,! Activity.jsx 참고
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <TabPage type={'plan'} onTabChange={setSelectedTab}/>
        </div>
    )
}

export default Place