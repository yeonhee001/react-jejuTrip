import React from 'react'
import "../../styles/00-search/searchDetail.scss";
import PlaceItem from '../../component/_common/PlaceItem';

function SearchDetail() {
  const tripData = [
    { id: 'jeju01', title: '한라산 국립공원', imgpath: 'component_placeitem.jpg', roadaddress: '제주특별자치도 서귀포시 안덕면 동광로 265-14', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵" },
    { id: 'jeju02', title: '섭지코지', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju03', title: '성산일출봉', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju04', title: '협재해수욕장', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju05', title: '국립공원', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju06', title: '바다', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju07', title: '제주소품샵', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
    { id: 'jeju08', title: '공항', imgpath: 'component_placeitem.jpg', roadaddress: '제주시 애월읍', tag: '카페·커피·음료', introduction: "다양한 자개모빌과 의류를 판매하는 소품샵"  },
  ];


  return (
    <div>
      {
        tripData.map((item)=>
          <div className='tripList'>
            <PlaceItem imgpath={item.imgpath} title={item.title} roadaddress={item.roadaddress} tag={item.tag} heartType={"none"}/>
          </div>
        )
      }
    </div>
  )
}

export default SearchDetail