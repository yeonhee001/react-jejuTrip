import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import NoLikePlace from '../../component/_common/NoLikePlace';
import NoLikePost from '../../component/_common/NoLikePost';
import '../../styles/05-mypage/like.scss';
import { shopNfoodNparty } from '../../api';
import PlaceItem from '../../component/_common/PlaceItem';

// 내장 하트 컴포넌트
const HeartFillRed = ({ className }) => {
  return (
    <div className={className}>
      <img src="/imgs/_icons/Heart_fill_red.svg" alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

function Like() {
  const navi = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [likePosts, setLikePosts] = useState([]);
  const [likeBoard, setLikeBoard] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user?.id;
  
  const { shopNfoodNpartyData, fetchCategory } = shopNfoodNparty();
  useEffect(() => {
    fetchCategory('c1'); // 관광지
    fetchCategory('c2'); // 쇼핑
    fetchCategory('c4'); // 맛집
    fetchCategory('c5'); // 축제행사
  }, []);
  
  const tourList = shopNfoodNpartyData?.tour;
  const shoppingList = shopNfoodNpartyData?.shopping;
  const foodList = shopNfoodNpartyData?.food;
  const festivalList = shopNfoodNpartyData?.festival;
  
  const allContents = [
    ...(tourList || []),
    ...(shoppingList || []),
    ...(foodList || []),
    ...(festivalList || [])
  ];
  
  useEffect(() => {
    const userLikePost = async () => {
      if (!userId) return;
      
      try {
        // 관광지 좋아요 데이터 가져오기
        const res = await fetch(`${process.env.REACT_APP_APIURL}/triplike/liked-posts?userId=${userId}`);
        if(!res.ok) throw new Error('관광지 좋아요 데이터를 가져오는데 실패했습니다');
        const data = await res.json();
        setLikePosts(data.likedPostIds || []);
        
        // 커뮤니티 게시물 좋아요 데이터 가져오기
        const res2 = await fetch(`${process.env.REACT_APP_APIURL}/like/user-liked?userId=${userId}`);
        if(!res2.ok) throw new Error('커뮤니티 좋아요 데이터를 가져오는데 실패했습니다');
        const data2 = await res2.json();
        
        // 유효한 게시물만 필터링
        let filtered = [];
        if (data2 && data2.likedPosts && Array.isArray(data2.likedPosts)) {
          console.log("dd");
          
          filtered = data2.likedPosts.filter(item => 
            item && 
            item.post && 
            item.post._id
          );
          console.log(filtered);
          
          // 각 post 객체에 thumbnail 속성이 없으면 imageUrls[0]로 설정
          filtered = filtered.map(item => {
            if (item.post && !item.post.thumbnail && item.post.imageUrls && item.post.imageUrls.length > 0) {
              return {
                ...item,
                post: {
                  ...item.post,
                  thumbnail: item.post.imageUrls[0]
                }
              };
            }
            return item;
          });
        }
        
        setLikeBoard(filtered);
      } catch (error) {
        console.error('좋아요 데이터 불러오기 오류:', error);
        setLikeBoard([]);
        setLikePosts([]);
      }
    };
    
    userLikePost();
  }, [userId]);
  
  // 관광지 좋아요 데이터 필터링
  const myLikedData = allContents.filter(item => 
    item && 
    item.contentsid && 
    Array.isArray(likePosts) && 
    likePosts.includes(item.contentsid)
  );
  
  return (
    <div className="like-page">
      <TabPage type="like" onTabChange={setSelectedTab} />
      
      {selectedTab === 0 ? (
        myLikedData.length === 0 ? (
          <NoLikePlace />
        ) : (
          myLikedData.map(item => {
            let type;
            switch(item.contentscd.value){
            case 'c1' : type='tour'; break;
            case 'c2' : type='shopping'; break;
            case 'c4' : type='food'; break;
            case 'c5' : type='festival'; break;
            }
            return <div key={item.contentsid} onClick={()=>{navi(`/trip/triplist/${type}/tripdetail/${item.contentsid}`);}}>
              <PlaceItem 
                imgpath={item.repPhoto?.photoid?.imgpath || '/imgs/common_noimage_02.png'}
                title={item.title}
                roadaddress={item.roadaddress || '주소 정보가 없습니다.'}
                tag={item.tag}
                heartType={'red-fill'}
              />
            </div>
          })
        )
      ) : (
        likeBoard.length === 0 ? (
          <NoLikePost />
        ) : (
          likeBoard.map((item, index) => {
            const imageUrl = item.post?.thumbnail || 
                            (item.post?.imageUrls && item.post.imageUrls.length > 0 ? 
                            item.post.imageUrls[0] : '/imgs/common_noimage_02.png');
            
            return (
              <div
                key={`post-${index}`}
                onClick={() => {
                  if (item.post && item.post._id) {
                    localStorage.setItem('post', JSON.stringify(item.post));
                    window.location.href = `/community/cmdetail/${item.post._id}`;
                  }
                }}
                style={{ cursor: 'pointer', position: 'relative' }}
                className="post-item-wrapper"
              >
                <div style={{ position: 'relative', width: '100%' }}>
                  <TabItem
                    imgUrl={imageUrl}
                    title={item.post?.title || '제목 없음'}
                    dateTime={item.post?.createdAt?.slice(0, 10) || '날짜 정보 없음'}
                  />
                  
                  {/* 하트 아이콘 - 내장 컴포넌트 사용 */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 10,
                      width: '24px',
                      height: '24px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <HeartFillRed className="heart-icon" />
                  </div>
                </div>
              </div>
            );
          })
        )
      )}
    </div>
  );
}

export default Like;