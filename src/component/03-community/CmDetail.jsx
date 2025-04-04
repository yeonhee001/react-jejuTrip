const CmDetail = ({children}) => {

  if (0) {
    return <p className="error-message">게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="cm-detail-container">
      <div>
        <h2 className="title">새 게시물 2</h2>
        <div className="author-info">
          <div className="nickname">새 사용자</div>
          <p className="date-text">2025.04.03 15:47</p>
        </div>
        <p className="description">새로운 게시물이 추가되었습니다.</p>
        {/* <img src="" width="400" /> */}
      </div>
      {children}
    </div>
  );
};

export default CmDetail;