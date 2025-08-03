import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const PostCard: React.FC<Post> = (post) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      toast.success("Post deleted!");
      console.log("Post deleted successfully");
    } catch (error) {
      toast.error("Deletion failed!");
      console.error("Error deleting post: ", error);
    }
  };
  return (
    <article>
      <h2>PostCard</h2>
      <h2>{post.title}</h2>
      <Link to={`/post/${post._id}`} />
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <button onClick={(e) => handleDelete(e, post._id)}>Delete</button>
    </article>
  );
};

export default PostCard;
