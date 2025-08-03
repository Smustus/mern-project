import { deletePost } from "../../api/posts/fetchPost";
import "./PostDetails.css";
import { useLoaderData } from "react-router";

const PostDetails = () => {
  const data = useLoaderData() as Post;

  const post: Post = {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };

  // Helper function to format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost(id);
  };

  if (!post) {
    return (
      <div className="post-details-container-fallback">
        <p className="post-not-found-text">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="post-details-page-wrapper">
      <div className="post-card">
        {/* Post Title */}
        <h1 className="post-title">{post.title}</h1>
        <button onClick={(e) => handleDelete(e, post._id)}>Delete</button>

        {/* Post Meta Information */}
        <div className="post-meta">
          {post.author && (
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              By {post.author}
            </span>
          )}
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Published: {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Last Updated: {formatDate(post.updatedAt)}
          </span>
          {post.published && (
            <span className="published-status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Published
            </span>
          )}
        </div>

        {/* Post Content */}
        <div className="post-content">
          <p>{post.content}</p>
        </div>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="tags-section">
            <h3>Tags:</h3>
            <div className="tags-list">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments ({post.comments?.length || 0})</h3>
          {post.comments && post.comments.length > 0 ? (
            <div className="comments-list">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment-item">
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
                    <span className="comment-votes">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21c-.64-1.342-.217-2.907.574-3.951m-9.217-3.477a1.99 1.99 0 010-2.828V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v13a2 2 0 002 2h1a2 2 0 002-2v-6.5l3.824-2.549M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21c-.64-1.342-.217-2.907.574-3.951"
                        />
                      </svg>
                      {comment.votes} votes
                    </span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-comments-message">
              No comments yet. Be the first to leave one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
