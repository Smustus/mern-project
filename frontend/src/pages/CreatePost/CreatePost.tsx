import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../utility/useAuth";
import { createPost } from "../../api/posts/fetchPost";
import PostForm from "../../components/PostForm/PostForm";
import "./CreatePost.css";

const CreatePost: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Post>>({
    title: "",
    slug: "",
    published: false,
    author: user || "",
    content: "",
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;

    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "tags" ? value.split(",").map((tag) => tag.trim()) : val,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createPost(formData);
      toast.success("Post created!");
      console.log("Post created successfully: ", formData);
      navigate("/");
    } catch (error) {
      toast.error("Creation failed!");
      console.error("Error adding post: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2 className="header-title">Create Post</h2>
      <PostForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreatePost;
