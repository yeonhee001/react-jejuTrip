import dayjs from "dayjs";

const CmDetail = ({children, post}) => {

  if (0) {
    return <p className="error-message">게시물을 찾을 수 없습니다.</p>;
  }
  return (
    <div className="cm-detail-container">
      <div>
        <h2 className="title">{post.title}</h2>
        <div className="author-info2">
          <div className="nickname">{post.username}</div>
          <p className="date-text">{dayjs(post.createdAt).format("YYYY.MM.DD HH:mm")}</p>
        </div>
        <p className="description">{post.description}</p>
      </div>
      {children}
    </div>
  );
};

export default CmDetail;