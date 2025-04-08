import React, { useState } from 'react'
import CmFeedList from '../../component/03-community/CmFeedList'
import "../../styles/03-community/cmList.scss";
import TabPage from '../../component/_common/TabPage';

function CmList() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
  <div>
    <TabPage type={'community'} onTabChange={setSelectedTab}/>
    <CmFeedList/>
  </div>  
    )
}

export default CmList