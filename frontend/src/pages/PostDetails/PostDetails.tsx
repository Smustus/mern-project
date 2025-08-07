import { useState } from "react";
import { deletePost } from "../../api/posts/fetchPost";
import "./PostDetails.css";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import CommentForm from "../../components/CommentForm/CommentForm";
import Comment from "../../components/Comment/Comment";
import PostForm from "../../components/PostForm/PostForm";

const PostDetails = () => {
  const [createComment, setCreateComment] = useState(false);
  const [modifyPost, setModifyPost] = useState(false);
  const data = useLoaderData() as Post;
  const navigate = useNavigate();
  const revalidate = useRevalidator();

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
    await deletePost(id);
    revalidate.revalidate();
    navigate("/");
  };

  const toggleCreateComment = () => {
    setCreateComment(!createComment);
  };

  const handleModifyPost = () => {
    setModifyPost(!modifyPost);
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
        <button
          className="delete-button"
          onClick={(e) => handleDelete(e, post._id)}
        >
          Delete
        </button>

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
        {modifyPost ? (
          <>
            <PostForm data={data} />
          </>
        ) : (
          <div className="post-content">
            <p>{post.content}</p>
            <button className="delete-button" onClick={handleModifyPost}>
              Modify
            </button>
          </div>
        )}

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
          <section className="comments-section-header">
            <h3>Comments ({post.comments?.length || 0})</h3>
            <button className="delete-button" onClick={toggleCreateComment}>
              {createComment ? "Close" : "Comment this post"}
            </button>
          </section>
          {createComment && (
            <CommentForm id={post._id} setCreateComment={setCreateComment} />
          )}
          {!createComment && post.comments && post.comments.length > 0 && (
            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <Comment comment={comment} />
                </div>
              ))}
            </div>
          )}
          {!createComment && post.comments && post.comments.length < 0 && (
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
