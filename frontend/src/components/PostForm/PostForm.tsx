import React, { useState, type FormEvent } from "react";
import "./PostForm.css";
import toast from "react-hot-toast";
import { createPost } from "../../api/posts/fetchPost";
import { useNavigate } from "react-router";
import useAuth from "../../utility/useAuth";

interface PostFormProps {
  data?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ data }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<Partial<Post>>({
    title: data?.title || "",
    slug: data?.slug || "",
    published: false,
    author: user || "",
    content: data?.content || "",
    tags: data?.tags || [],
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
    if (data) {
      try {
        setIsLoading(true);
        await createPost(formData);
        toast.success("Post updated!");
        console.log("Post updated successfully: ", formData);
        navigate("/");
      } catch (error) {
        toast.error("Updating failed!");
        console.error("Error updating post: ", error);
      } finally {
        setIsLoading(false);
      }
    }
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
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content || ""}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags?.join(", ") || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "...creating post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
