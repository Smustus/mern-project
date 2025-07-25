import Post from "../model/schema.js";

// /api/posts

export const getAllPosts = async (_, res) => {
  try {
    const data = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(data);
    /*  res.status(200).json({ message: "Fetched" }); */
  } catch (error) {
    console.error("Error fetching all posts: ", error);
    res.status(500).json({ message: "Error fetching all posts" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findById(id);
    res.status(200).json(data);
    /*  res.status(200).json({ message: "Fetched" }); */
  } catch (error) {
    console.error("Error fetching all posts: ", error);
    res.status(500).json({ message: "Error fetching all posts" });
  }
};

export const createPost = async (req, res) => {
  /*   console.log("Post request successful");
  res.status(201).send("Created successfully"); */
  try {
    const { title, slug, published, author, content, tags } = req.body;
    const newPost = new Post({
      title,
      slug,
      published,
      author,
      content,
      tags,
      comments: [],
    });
    const response = await newPost.save();
    res.status(201).json({ message: "Post successfully created: ", response });
  } catch (error) {
    console.error("Error creating post: ", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, slug, published, author, content, tags, comments } =
      req.body;
    const updatedPost = {
      title,
      slug,
      published,
      author,
      content,
      tags,
    };
    const response = await Post.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post successfully updated: ", response });
  } catch (error) {
    console.error("Error updating post: ", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  /* console.log("Post deletion successful");
  res.status(200).send("Deleted successfully"); */
  try {
    const response = await Post.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post successfully deleted: ", response });
  } catch (error) {
    console.error("Error deleting post: ", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res
        .status(400)
        .json({ message: "User ID and comment text are required." });
    }

    const newComment = {
      user: userId,
      text: text,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment },
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({
      message: "Comment successfully added.",
      comments: updatedPost.comments,
    });
  } catch (error) {
    console.error("Error adding comment to post:", error);
    res.status(500).json({ message: "Error adding comment to post." });
  }
};
