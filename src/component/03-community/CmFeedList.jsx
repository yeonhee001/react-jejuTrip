import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Newpost from "../icons/Newpost";
import Heart_fill_red from "../icons/Heart_fill_red";
import Heart_stroke_red from "../icons/Heart_stroke_red";
import Comment from "../icons/Comment";

dayjs.extend(customParseFormat);

const CmFeedList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();

  const [posts, setPosts] = useState([]);

  // 댓글 수 불러오기
  const fetchCommentCount = async (postId) => {
    try {
      const res = await fetch(`http://localhost:4000/reply/count/${postId}`);
      const data = await res.json();
      return data.count || 0;
    } catch (err) {
      console.error("댓글 수 조회 실패:", err);
      return 0;
    }
  };

  // 좋아요 수 불러오기
  const fetchLikeCount = async (postId) => {
    try {
      const res = await fetch(`http://localhost:4000/like/count?postId=${postId}`);
      const data = await res.json();
      return data.count || 0;
    } catch (err) {
      console.error("좋아요 수 조회 실패:", err);
      return 0;
    }
  };

  // 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:4000/post");
        const data = await res.json();
        if (Array.isArray(data)) {
          // 댓글 수와 좋아요 수 함께 fetch
          const postsWithCounts = await Promise.all(
            data.map(async (post) => {
              const commentCount = await fetchCommentCount(post._id);
              const likeCount = await fetchLikeCount(post._id);  // 좋아요 수 추가

              // localStorage에서 좋아요 상태 불러오기
              const liked = JSON.parse(localStorage.getItem(`liked-${post._id}`)) || false;

              return { ...post, commentCount, likeCount, hasVote: liked };
            })
          );
          setPosts(postsWithCounts.reverse()); // 최신글 먼저
        }
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, []);

  // 새 게시글 작성 후 돌아왔을 때 바로 추가
  useEffect(() => {
    const newPost = location.state?.newPost;
    if (newPost) {
      setPosts((prev) => [{ ...newPost, commentCount: 0, likeCount: 0 }, ...prev]);
      window.history.replaceState({}, document.title); // 상태 초기화
    }
  }, [location.state]);

  // 좋아요 처리
  const handleLikeClick = async (e, id) => {
    e.stopPropagation();
    
    // 좋아요 상태를 토글
    const updatedPosts = posts.map((post) => {
      if (post._id === id) {
        const updatedPost = {
          ...post,
          hasVote: !post.hasVote,
          likeCount: post.hasVote ? post.likeCount - 1 : post.likeCount + 1,
        };

        // 좋아요 상태를 localStorage에 저장
        localStorage.setItem(`liked-${id}`, JSON.stringify(updatedPost.hasVote));

        // 백엔드에 좋아요 상태 업데이트 요청
        updateLikeStatus(id, updatedPost.hasVote);

        return updatedPost;
      }
      return post;
    });

    setPosts(updatedPosts); // UI 업데이트
  };

  // 백엔드에 좋아요 상태 업데이트
  const updateLikeStatus = async (postId, liked) => {
    try {
      const userId = "user123"; // 예시 유저 ID, 실제 유저 ID 로직으로 대체 필요

      const res = await fetch("http://localhost:4000/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
          liked,
        }),
      });

      if (!res.ok) {
        throw new Error("좋아요 상태 업데이트 실패");
      }
    } catch (error) {
      console.error("좋아요 상태 업데이트 오류:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="cm-feed-list">
        <h2 className="cm-title">떠나톡</h2>
        {posts.length > 0 ? (
          posts.map((item) => (
            <div
              key={item._id}
              className="post-container"
              onClick={() => navigate(`/community/cmdetail/${item._id}`, { state: { post: item } })}
              style={{ cursor: "pointer" }}
            >
              <h3 className="title">{item.title}</h3>
              <div className="author-container">
                <div className="author-info">
                  <div className="nickname">{item.author?.nickname || "익명"}</div>
                  <p className="date-text">
                    {dayjs(item.createdAt).format("YYYY.MM.DD HH:mm")}
                  </p>
                </div>
              </div>
              <p className="description">{item.description}</p>
              {item.imageUris?.length > 0 && (
                <img src={item.imageUris[0]} className="post-image" alt="post" />
              )}
              <div
                className="interaction-container"
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div className="like-section" onClick={(e) => handleLikeClick(e, item._id)}>
                  {item.hasVote ? (
                    <Heart_fill_red className={"fe-heart"} />
                  ) : (
                    <Heart_stroke_red className={"fe-heart2"} />
                  )}
                  <span className="vote-text">
                    {item.likeCount === 0 ? "좋아요" : item.likeCount}
                  </span>
                </div>

                <div className="comment-section">
                  <Comment className={"fe-comment"} />
                  <span className="comment-text">
                    {item.commentCount === 0 ? "댓글" : item.commentCount}
                  </span>
                </div>
              </div>
              <div className="divider" />
            </div>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}

        <div
          className="new-post-button"
          onClick={() => navigate("/community/cmpostpage")}
        >
          <Newpost className={"cm-Newpost"} />
        </div>
      </div>
    </FormProvider>
  );
};

export default CmFeedList;