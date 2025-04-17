import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CmSlideImg() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadImages = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:4000/post/images?page=${page}`);
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

  const createGroups = (images) => {
    const groups = [];
    let i = 0;
    let patternIndex = 0;

    while (i < images.length) {
      const pattern = layoutPattern[patternIndex % layoutPattern.length];

      if ((pattern === 'left-big' || pattern === 'right-big') && i + 3 <= images.length) {
        groups.push({ layout: pattern, images: images.slice(i, i + 3) });
        i += 3;
      } else if (pattern === 'two-horizontal' && i + 2 <= images.length) {
        groups.push({ layout: pattern, images: images.slice(i, i + 2) });
        i += 2;
      } else {
        break;
      }

      patternIndex++;
    }

    return groups;
  };

  const groupedImages = createGroups(images);

  return (
    <div className="image-container" onScroll={handleScroll}>
      {groupedImages.map((group, index) => {
        const { layout, images } = group;

        if (layout === 'left-big') {
          return (
            <div key={index} className="image-card">
              <div className="left-image">
                <img src={images[0]} alt={`그룹 ${index}-0`} />
              </div>
              <div className="right-images">
                <img src={images[1]} alt={`그룹 ${index}-1`} />
                <img src={images[2]} alt={`그룹 ${index}-2`} />
              </div>
            </div>
          );
        }

        if (layout === 'right-big') {
          return (
            <div key={index} className="image-card">
              <div className="left-images">
                <img src={images[0]} alt={`그룹 ${index}-0`} />
                <img src={images[1]} alt={`그룹 ${index}-1`} />
              </div>
              <div className="right-image">
                <img src={images[2]} alt={`그룹 ${index}-2`} />
              </div>
            </div>
          );
        }

        if (layout === 'two-horizontal') {
          return (
            <div key={index} className="image-card horizontal">
              <img src={images[0]} alt={`그룹 ${index}-0`} />
              <img src={images[1]} alt={`그룹 ${index}-1`} />
            </div>
          );
        }

        return null;
      })}

      {loading && <div className="loading">불러오는 중...</div>}
    </div>
  );
} 

export default CmSlideImg;