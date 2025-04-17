import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import NoLikePost from '../../component/_common/NoLikePost';

import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import '../../styles/05-mypage/like.scss';

function Like() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 장소 리스트
  const placeList = [
    {
      id: 1,
      title: "관광지1",
      imgPath: "/imgs/home_photo_01.jpg"
    },
    {
      id: 2,
      title: "관광지2",
      imgPath: "/imgs/home_photo_02.jpg"
    },
    {
      id: 3,
      title: "관광지3",
      imgPath: "/imgs/home_photo_03.jpg"
    },
    {
      id: 4,
      title: "관광지4",
      imgPath: "/imgs/home_photo_01.jpg"
    },
  ];

  useEffect(() => {
    const { id } = JSON.parse(window.sessionStorage.user);
    axios.get(`http://localhost:4000/like/user-liked?userId=${id}`)
      .then(res => {
        setPosts(res.data.likedPosts);
      });
  }, []);

  return (
    <div className="like-page">
      <TabPage type={'like'} onTabChange={setSelectedTab} />

      {selectedTab === 0 ? (
        // 장소 탭
        placeList.map((item) => (
          <TabItem
            key={item.id}
            imgUrl={item.imgPath}
            title={item.title}
            dateTime="2025-04-16"
          />
        ))
      ) : (
        // 게시물 탭
        posts.length === 0 ? (
          <NoLikePost />
        ) : (
          posts.map((item) => (
            <div
              key={item._id}
              className="post-container"
              onClick={() =>
                navigate(`/community/cmdetail/${item._id}`, {
                  state: { post: item }
                })
              }
              style={{ cursor: 'pointer' }}
            >
              <h3 className="title">{item.post.title}</h3>
              <div className="author-container">
                <div className="author-info">
                  <div className="username">{item.post.username || '익명'}</div>
                  <p className="date-text">
                    {dayjs(item.createdAt).format('YYYY.MM.DD HH:mm')}
                  </p>
                </div>
              </div>
              <p className="description">{item.post.description}</p>

              {item.imageUris?.length > 0 && (
                <img
                  src={item.imageUris[0]}
                  className="post-image"
                  alt="post"
                />
              )}
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Like;
