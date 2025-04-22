import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CmtItem from '../../component/05-mypage/CmtItem';
import TabPage from '../../component/_common/TabPage';
import TabItem from '../../component/_common/TabItem';
import NoWritePost from '../../component/_common/NoWritePost';
import NoWriteReply from '../../component/_common/NoWriteReply';
import DataLoading from '../../component/_common/DataLoading';
import { format } from 'date-fns';
import "../../styles/05-mypage/activity.scss";

function Activity() {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);
  const [postData, setPostData] = useState([]);
  const [cmtData, setCmtData] = useState([]);
  const [cmtOriginData, setCmtOriginData] = useState([]);

  const [loading, setLoading] = useState(true);

  const userId = String(JSON.parse(sessionStorage.getItem('user'))?.id);

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        const sortedPosts = [...postData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedPosts.length > 0
          ? sortedPosts.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/community/cmdetail/${item._id}`)
                localStorage.setItem('post', JSON.stringify(item));
              }}
            >
              <TabItem
                imgUrl={item.imageUrls[0]}
                title={item.title}
                dateTime={format(item.createdAt, 'yyyy.MM.dd')}
              />
            </div>
          ))
          : <NoWritePost/>
      case 1:
        const sortedCmts = [...cmtData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedCmts.length > 0
        ? sortedCmts.map((item) => (
          <div
            key={item._id}
            className='tab-content-reply'
            onClick={async () => {
              try {
                const res = await axios.get(`${process.env.REACT_APP_APIURL}/post/update/${item.postId}`);
                const cmtToPostData = res.data;
                navigate(`/community/cmdetail/${item.postId}`);
                localStorage.setItem('post', JSON.stringify(cmtToPostData));
              } catch (err) {
                console.error('게시물 데이터 불러오기 실패:', err);
              }
            }}
          >
            <CmtItem
              title={item.text}
              dateTime={format(item.createdAt, 'yyyy.MM.dd') + '  ' + format(item.createdAt, 'hh:mm')}
              postTitle={item.postTitle}
            />
          </div>
        ))
        : <NoWriteReply/>
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        // 사용자별 게시물
        const postRes = await axios.get(`${process.env.REACT_APP_APIURL}/post/user/${userId}`);
        setPostData(postRes.data || []);

        // 댓글
        const cmtRes = await axios.get(`${process.env.REACT_APP_APIURL}/reply/user/${userId}`);
        const getCommentData = cmtRes.data || [];
        setCmtOriginData(getCommentData);
  
        const uniquePostIds = [...new Set(getCommentData.map(item => item.postId))];
        const postIdToTitle = {};
  
        await Promise.all(
          uniquePostIds.map(async (postId) => {
            try {
              const postDetailRes = await axios.get(`${process.env.REACT_APP_APIURL}/post/update/${postId}`);
              postIdToTitle[postId] = postDetailRes.data.title || '제목 없음';
            } catch {
              postIdToTitle[postId] = '제목 없음';
            }
          })
        );

        const updatedComments = getCommentData.map(comment => ({
          ...comment,
          postTitle: postIdToTitle[comment.postId] || '제목 없음',
        }));
        setCmtData(updatedComments);
      } catch (err) {
        console.error(err);
        setPostData([]);
        setCmtData([]);
      } finally {
        setLoading(false); // ✅ 데이터를 다 가져온 후에만 로딩 종료
      }
    }
    fetchData();
  }, [userId]);
  
  return (
    <>
      <div className='activity-page'>
        <TabPage type='activity' onTabChange={setSelectedTab}/>
        <div className='tab-content'>
          {loading ? <DataLoading className={'activity-loading'}/> : 
            renderContent()
          }
        </div>
      </div>
    </>
  )
} 

export default Activity 