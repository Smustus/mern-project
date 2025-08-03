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
