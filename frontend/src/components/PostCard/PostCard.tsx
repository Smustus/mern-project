import React from "react";
import { Link, useRevalidator } from "react-router";
import { deletePost } from "../../api/posts/fetchPost";
import "./PostCard.css";

const PostCard: React.FC<Post> = (post) => {
  const revalidator = useRevalidator();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      revalidator.revalidate();
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };
  return (
    <article className="post-card-container">
      <h2>{post.title}</h2>
      <Link to={`/post/${post._id}`} className="post-card-link">
        View Post
      </Link>
      <p className="post-card-date">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <button
        onClick={(e) => handleDelete(e, post._id)}
        className="delete-button"
      >
        Delete
      </button>
    </article>
  );
};

export default PostCard;
