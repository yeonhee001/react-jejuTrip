const CmComment = ({ comments = [], loggedInUserId }) => {
  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p className="comment-username">{comment.username}</p>
            <p className="comment-text2">{comment.text}</p>
          </div>
        ))}
    </div>
  );
};

export default CmComment;