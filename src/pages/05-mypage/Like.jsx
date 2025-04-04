import React, { useState } from 'react'
import "../../styles/05-mypage/like.scss";
import TabPage from '../../component/_common/TabPage';

function Like() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <TabPage type={'like'} onTabChange={setSelectedTab}/>
    </div>
  )
}

export default Like