import React from "react";
import PostForm from "../../components/PostForm/PostForm";
import "./CreatePost.css";

const CreatePost: React.FC = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2 className="header-title">Create Post</h2>
      <PostForm />
    </div>
  );
};

export default CreatePost;
