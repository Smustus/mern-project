import React, { useState, type FormEvent } from "react";
import "./CommentForm.css";
import { useRevalidator } from "react-router";
import useAuth from "../../utility/useAuth";
import toast from "react-hot-toast";
import { addComment } from "../../api/posts/fetchPost";

interface CommentFormProps {
  id: string;
  setCreateComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentForm: React.FC<CommentFormProps> = ({ id, setCreateComment }) => {
  const { user } = useAuth();
  const revalidate = useRevalidator();

  const [formData, setFormData] = useState({
    title: "",
    author: user || "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to comment.");
    if (!formData.content || !formData.title) {
      return toast.error("Please fill in all fields.");
    }
    console.log(formData);

    try {
      setIsLoading(true);
      await addComment(id, user, formData.title, formData.content);
      toast.success("Comment added!");
      console.log("Comment created successfully: ", formData);
      revalidate.revalidate();
      setCreateComment(false);
    } catch (error) {
      toast.error("Creation failed!");
      console.error("Error adding comment: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
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

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "...adding comment" : "Add comment"}
      </button>
    </form>
  );
};

export default CommentForm;
