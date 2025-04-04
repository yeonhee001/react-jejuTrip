import React, { useState } from 'react'
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import "../../styles/05-mypage/like.scss";

function Like() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <TabPage type={'like'} onTabChange={setSelectedTab}/>
      <TabItem/>
    </div>
  )
}

export default Like