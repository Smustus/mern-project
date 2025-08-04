import React, { type FormEvent } from "react";
import "./PostForm.css";

interface Post {
  title: string;
  slug: string;
  published: boolean;
  author: string;
  content: string;
  tags: string[];
}

// PostForm Component
interface PostFormProps {
  formData: Partial<Post>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  isLoading: boolean;
}

const CreatePostForm: React.FC<PostFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
}) => {
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

export default CreatePostForm;
