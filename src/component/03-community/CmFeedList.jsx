import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Newpost from "../icons/Newpost";

dayjs.extend(customParseFormat);

const CmFeedList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const observer = useRef();
  const listRef = useRef(null); // 스크롤이 적용될 컨테이너 ref
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 1,
      title: "테스트 제목",
      description: "이것은 테스트 설명입니다. 게시물 내용을 확인하세요.",
      createdAt: "2024.04.02 14:30",
      author: {
        id: 1,
        nickname: "테스트 닉네임",
        imageUri: "https://via.placeholder.com/40",
      },
      imageUris: ["https://via.placeholder.com/400"],
      likes: [1, 2, 3],
      hasVote: true,
      voteCount: 3,
      commentCount: 2,
    },
  ]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (location.state?.newPost) {
      setPosts((prevPosts) => [location.state.newPost, ...prevPosts]);
    }
  }, [location.state]);

  const loadMorePosts = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }, (_, i) => ({
        id: posts.length + i + 1,
        userId: posts.length + i + 1,
        title: `새 게시물 ${posts.length + i + 1}`,
        description: "새로운 게시물이 추가되었습니다.",
        createdAt: dayjs().format("YYYY.MM.DD HH:mm"),
        author: {
          id: posts.length + i + 1,
          nickname: "새 사용자",
          imageUri: "https://via.placeholder.com/40",
        },
        imageUris: ["https://via.placeholder.com/400"],
        likes: [],
        hasVote: false,
        voteCount: 0,
        commentCount: 0,
      }));

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);

      if (page >= 3) setHasMore(false);
    }, 1500);
  };

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 마우스 드래그 스크롤 관련 이벤트 
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    scrollTop.current = listRef.current.scrollTop;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - startY.current;
    listRef.current.scrollTop = scrollTop.current - deltaY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <FormProvider {...methods}>
      <div
        ref={listRef}
        className="cm-feed-list"
        style={{ overflow: "hidden", height: "100vh", cursor: isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 마우스가 영역 밖으로 나가면 정지
      >
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div
              key={item.id}
              className="post-container"
              onClick={() => navigate(`/community/${item.id}`)}
              style={{ cursor: "pointer" }}
              ref={index === posts.length - 1 ? lastPostRef : null}
            >
              <h3 className="title">{item.title}</h3>
              <div className="author-container">
                <div className="author-info">
                  <strong className="nickname">{item.author.nickname}</strong>
                  <p className="date-text">
                    {dayjs(item.createdAt, "YYYY-MM-DD HH:mm").format("YYYY.MM.DD HH:mm")}
                  </p>
                </div>
              </div>
              <p className="description">{item.description}</p>
              {item.imageUris?.length > 0 && (
                <img src={item.imageUris[0]} className="post-image"/>
              )}
              <div className="interaction-container">
                <span className="vote-text"> 좋아요 {item.voteCount}</span>
                <span className="comment-text"> 댓글 {item.commentCount}</span>
              </div>
              <div className="divider" />
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}

        {loading && <p className="loading-text"></p>}

        <div className="new-post-button" onClick={() => navigate("/community/cmpostpage")}>
          <Newpost className={"cm-Newpost"} />
        </div>
      </div>
    </FormProvider>
  );
};

export default CmFeedList;