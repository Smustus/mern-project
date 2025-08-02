import React from "react";

const PostDetails: React.FC<Post> = (post) => {
  return (
    <div>
      <h2>PostDetails</h2>
      <h4>{post._id}</h4>
      <h4>{post.content}</h4>
    </div>
  );
};

export default PostDetails;
