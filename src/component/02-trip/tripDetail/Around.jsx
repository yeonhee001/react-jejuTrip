import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const API_KEY = "57fd439ed04e408c935a985377cbaa41";
const API_URL = "https://api.visitjeju.net/vsjApi/contents/searchList";

function Around({ currentSpot }) {
  const [nearbySpots, setNearbySpots] = useState([]);

  useEffect(() => {
    if (!currentSpot || !currentSpot.latitude || !currentSpot.longitude) {
      console.warn("⚠️ 유효한 위치 정보가 없습니다. API 호출 중지");
      return;
    }

    fetchNearbySpots(currentSpot.latitude, currentSpot.longitude);
  }, [currentSpot]);

  const fetchNearbySpots = async (lat, lng) => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          apiKey: API_KEY,
          locale: "kr",
          category: "c1",
          page: 1,
        },
      });

      if (response.data && response.data.items) {
        const spots = response.data.items.filter(
          (spot) => spot.latitude && spot.longitude
        );

        const spotsWithDistance = spots.map((spot) => ({
          ...spot,
          distance: calculateDistance(lat, lng, spot.latitude, spot.longitude),
        }));

        setNearbySpots(spotsWithDistance.sort((a, b) => a.distance - b.distance));
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // 지구 반지름 (km)

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2); // km 단위로 반환
  };

  return (
    <div className="aroundbottom">
      <h3>주변 관광지</h3>
      {nearbySpots.length > 0 ? (
        <Swiper spaceBetween={10} slidesPerView={3}>
          {nearbySpots.map((spot) => (
            <SwiperSlide key={spot.contentsid}>
              <div className="aroundswiper">
                <img src={spot.repPhoto?.photoid.imgpath} alt={spot.title} width="100%" />
                <p>{spot.title}</p>
                <span>{spot.distance} km 거리</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>주변 관광지를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default Around;
