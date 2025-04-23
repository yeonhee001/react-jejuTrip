import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DataLoading from '../../_common/DataLoading';
import { useNavigate } from 'react-router-dom';
import Top from '../../icons/Top';

function CmSlideImg() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const imageContainerRef = useRef(null);


  useEffect(() => {
    const loadImages = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/post/images?page=${page}`);
        const posts = response.data;
        setImages((prevImages) => [...prevImages, ...posts]);
      } catch (error) {
        console.error('이미지 불러오기 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const layoutPattern = ['left-big', 'two-horizontal', 'right-big', 'two-horizontal'];

  

  const createGroups = () => {
    const groups = [];
    let i = 0;
    let patternIndex = 0;

    while (i < images.length) {
      const pattern = layoutPattern[patternIndex % layoutPattern.length];

      if ((pattern === 'left-big' || pattern === 'right-big') && i + 3 <= images.length) {
        groups.push({ layout: pattern, images: images.slice(i, i + 3) });
        i += 3;
      } else if (pattern === 'two-horizontal' && i + 2 <= images.length) {
        groups.push({ layout: pattern, images: images.slice(i, i + 2)});
        i += 2;
      } else {
        break;
      }


      patternIndex++;
    }
    return groups;
  };

  const groupedImages = createGroups();
  const handleClick = async (id,item) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId =  user?.id.toString() || null;
    try {
      const res = await fetch(`${process.env.REACT_APP_APIURL}/like/user-liked?userId=${userId}`);
      const data = await res.json();
      let hasVote = data.likedPostIds.includes(item._id);

      localStorage.post = JSON.stringify({...item,hasVote});
      navigate(`/community/cmdetail/${id}`);
    } catch (err) {
      console.error("유저 좋아요 목록 조회 실패:", err);
      
    }
    
    
  };

  const scrollToTop = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className="image-container"
        onScroll={handleScroll}
        ref={imageContainerRef}
      >
        {groupedImages.map((group, index) => {
          const { layout, images} = group;

          const renderImage = (imgObj) => (
                      
            <img
              key={imgObj.id}
              src={imgObj.imageUrl}
              alt={`그룹 ${index}-${imgObj.id}`}
              onClick={() => handleClick(imgObj.id, imgObj.post)}
              style={{ cursor: 'pointer' }}
            />
          );

          if (layout === 'left-big') {
            return (
              <div key={index} className="image-card">
                <div className="left-image">{renderImage(images[0])}</div>
                <div className="right-images">
                  {renderImage(images[1])}
                  {renderImage(images[2])}
                </div>
              </div>
            );
          }

          if (layout === 'right-big') {
            return (
              <div key={index} className="image-card">
                <div className="left-images">
                  {renderImage(images[0])}
                  {renderImage(images[1])}
                </div>
                <div className="right-image">{renderImage(images[2])}</div>
              </div>
            );
          }

          if (layout === 'two-horizontal') {
            return (
              <div key={index} className="image-card horizontal">
                {renderImage(images[0], 0)}
                {renderImage(images[1], 1)}
              </div>
            );
          }

          return null;
        })}

        {loading && <DataLoading className="list_loading" />}
      </div>

      {/* Top 버튼 영역 */}
      <div className="add-check-btn-wrap3">
        <div className="add-check-btn3" onClick={scrollToTop}>
          <Top /> 
        </div>
      </div>
    </>
  );
}

export default CmSlideImg;