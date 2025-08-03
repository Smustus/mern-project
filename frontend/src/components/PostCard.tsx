import React from "react";
import { Link } from "react-router";
import { deletePost } from "../api/posts/fetchPost";

const PostCard: React.FC<Post> = (post) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost(id);
  };
  return (
    <article>
      <h2>Post</h2>
      <h2>{post.title}</h2>
      <Link to={`/post/${post._id}`}>LINK</Link>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <button onClick={(e) => handleDelete(e, post._id)}>Delete</button>
    </article>
  );
};

export default PostCard;
