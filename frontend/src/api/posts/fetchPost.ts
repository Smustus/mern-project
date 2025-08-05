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

export const updatePost = async (
  postId: string,
  updates: Partial<Post>
): Promise<Post> => {
  try {
    const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update post");
    }

    return (await response.json()) as Post;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to update post: ${errorMessage}`);
  }
};

/**
 * Adds a new comment to a specific post.
 * @param postId The ID of the post to add the comment to.
 * @param userId The ID of the user making the comment.
 * @param commentText The text content of the comment.
 * @returns A Promise that resolves to the updated list of comments for the post.
 * @throws An Error if the operation fails.
 */
export const addComment = async (
  postId: string,
  userId: string,
  title: string,
  content: string
): Promise<Comment[]> => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, title, content }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add comment");
    }

    const result = await response.json();
    return result.comments as Comment[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to add comment: ${errorMessage}`);
  }
};
