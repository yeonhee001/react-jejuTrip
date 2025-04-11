import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import TabPage from '../../component/_common/TabPage';
import SearchItem from '../../component/04-planner/SearchItem';
import Button from '../../component/_common/Button';

import "../../styles/04-planner/place.scss";


function Place() {
    // selectedTab 이용해서 탭 별 내용 넣으세요,,,! Activity.jsx 참고
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedBtn, setSelectedBtn] = useState(false);

    const search = {
        "제주시" : ["구좌", "애월", "우도", "제주 시내", "조천", "추자도", "한경", "한림"],
        "서귀포시" : ["가파도", "남원", "대정", "마라도", "성산", "안덕", "중문", "표선"],
        "카테고리" : ["관광지", "맛집", "축제&행사", "쇼핑"]
    }

    useEffect(()=>{

    },[])
    return (
        <div>
            <TabPage type={'plan'} onTabChange={setSelectedTab}/>
            {
                selectedTab === 0
                ?
                // 지역별
                <div>
                    <div className='place_search'>
                        <SearchItem data={search} category="제주" title={["제주시", "서귀포시"]}/>
                        <SearchItem data={search} category="카테고리" title={["카테고리"]}/>
                    </div>
                    <button className='place_btn' onClick={()=>{setSelectedBtn(true)}}><Button btn={"선택 완료"} className={"place_btn"}/></button>
                </div>
                :
                // 좋아요
                <div>좋아요 내가 함</div>
            }
            
        </div>
    )
}

export default Place