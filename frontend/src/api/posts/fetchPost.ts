import toast from "react-hot-toast";

export const deletePost = async (id: string) => {
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

export const createPost = async (formData: Partial<Post>): Promise<Post> => {
  try {
    const response = await fetch(`http://localhost:5001/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post");
    }

    return (await response.json()) as Post;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create post: ${errorMessage}`);
  }
};
