import "./Comment.css";

const Comment = ({ comment }: { comment: Comment }) => {
  console.log(comment);

  return (
    <>
      <div className="comment-header">
        <span className="comment-user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-1 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {comment.user}
        </span>
      </div>
      <p className="comment-content">{comment.content}</p>
    </>
  );
};

export default Comment;
