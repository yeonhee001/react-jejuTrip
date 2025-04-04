import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink } from "react-router-dom";

const API_KEY = "57fd439ed04e408c935a985377cbaa41";
const API_URL = "http://api.visitjeju.net/vsjApi/contents/searchList";

// 카테고리별 정보 설정

const CATEGORY_INFO = [
  { id: "place", title: "제주 여행 트렌드를 한눈에!",title2:"핫플부터 숨은 명소까지",  category: "c1" },      // 관광지
  { id: "restaurant", title: "제주도민이 인정한 맛집",title2:"맛 따라 떠나는 제주", category: "c4" },     // 맛집
  { id: "festival", title: "놓치면 아쉬운 축제 & 행사",title2:"지금 주목해야 할 제주", category: "c5" },    // 축제 & 행사
  { id: "shopping", title: "감성가득! 소품샵 & 갤러리",title2:"특별한 감성 공간", category: "c2" }     // 소품샵 & 쇼핑
];

export default function MultiSwiperComponent() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = {};

        await Promise.all(
          CATEGORY_INFO.map(async (categoryInfo) => {
            const response = await fetch(
              `${API_URL}?apiKey=${API_KEY}&locale=kr&category=${categoryInfo.category}&size=10`
            );
            const json = await response.json();

            if (!json || !json.items) throw new Error("데이터 없음");

            results[categoryInfo.id] = json.items.map((item, index) => ({
              id: index,
              title: item.title,
              imgSrc: item.repPhoto?.photoid?.imgpath || "/imgs/default.jpg",
              link: item.contentsid ? 
              `https://www.visitjeju.net/kr/detail/view?contentsid=${item.contentsid}` : "#"
              //현재 클릭시 비짓제주 url로 넘어가는거 상세페이지로 넘어가게끔 작업
            }));
          })
        );

        setData(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p className="text-red-500">오류 발생: {error}</p>;

  return (
    <div>
      {CATEGORY_INFO.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-xl mb-4">{category.title}</h2>
          <b className="text-x1 mb-4b">{category.title2}</b>
          <Swiper spaceBetween={10} 
          slidesPerView={3} 
          
          loop={true}>
            {data[category.id]?.map((slide) => (
              <SwiperSlide key={slide.id}>
                <NavLink to={slide.link} target="_blank" rel="noopener noreferrer">
                  <div className="swiperitem">
                    <img className="tripslide" src={slide.imgSrc} alt={slide.title} />
                    <b>{slide.title}</b>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}
