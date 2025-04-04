import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Search from '../../component/icons/Search'
import SearchBar from '../../component/00-search/SearchBar'
import Ranking from '../../component/00-search/Ranking'
import Send from '../../component/icons/Send'

function SearchPage() {
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  // function backbtn(){navigate(-1);}

  useEffect(()=>{
    const fetchKeywords = ()=>{
      axios.get('http://api.odcloud.kr/api/15049993/v1/uddi:04795979-fd51-411e-ad41-95a559b706eb',{
        params: {
          serviceKey:'UO/VNFIHUBaYIX80pdY4xpWRnNWmKO89qSyEZrhhwobVU599onCKVvNnb0jHHcbQiQ1qcLqZWP21BSzibjqC4Q=='
        },
      })
      .then((res)=>{
        setKeywords(res.data.data)
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.error("인기 검색어 불러오기 실패", error);
      });
    };
    fetchKeywords();
  },[])

  return (
    <div className='searchpage'>
      <SearchBar showBackBtn={true} placeholder={"궁금해 제주?!"} submitbtn={<Search className={'search-btn'}/>} onClick={() => navigate(-1)}/>
      {/* 
      <SearchBar showBackBtn={false} placeholder={"댓글을 입력해주세요"} submitbtn={<Send className={'send-btn'}/>}/>
      수빈님이 사용할 페이지에 가서 이렇게 쓰면 되는데, 그 해당 페이지의 scss에서 Send버튼의 크기랑 우측에 여백만 맞춰서 사용하면 됩니다 */}

      <div className='pop-search'>
        <h2>인기 검색어</h2>
        <div className='pop-cont'>
          <span>
            {
              keywords.slice(0,5).map((item)=>
                <Ranking key={item.일련번호} rank={item.정렬순서} word={item.단어}/>
            )
            }
          </span>
          <span>
            {
              keywords.slice(5,10).map((item)=>
                <Ranking key={item.일련번호} rank={item.정렬순서} word={item.단어}/>
            )
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchPage