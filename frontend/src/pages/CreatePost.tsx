import React, { useState, type FormEvent } from "react";
import useAuth from "../utility/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
    setIsLoading(true);
    /*     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay */
    try {
      setIsLoading(true);
      await fetch(`http://localhost:5001/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      toast.success("Post created successfully!");
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
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Slug:
          <input
            type="text"
            name="slug"
            value={formData.slug || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Content:
          <textarea
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            required
            rows={5}
          />
        </label>
        <br />

        <label>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            value={formData.tags?.join(", ") || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "...creating post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
