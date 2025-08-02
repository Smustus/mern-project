import React from "react";
import { Link } from "react-router";

const PostCard: React.FC<Post> = (post) => {
  return (
    <article>
      <h2>PostCard</h2>
      <h2>{post.title}</h2>
      <Link to={`/post/${post._id}`} />
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
    </article>
  );
};

export default PostCard;
