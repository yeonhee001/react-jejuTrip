import React, { useState } from 'react'
import CmFeedList from '../../component/03-community/CmFeedList'
import CmSlideImg from '../../component/03-community/img/CmSlideImg'
import "../../styles/03-community/cmList.scss";
import TabPage from '../../component/_common/TabPage';
import "../../styles/03-community/_res-community.scss";

function CmList() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div style={{ margin: "92px 0 150px" }}>
      <TabPage type={'community'} onTabChange={setSelectedTab} />
      {selectedTab === 0 ? <CmFeedList /> : <CmSlideImg />}
    </div>
  )
}

export default CmList