export const getAllPosts = async (req, res) => {
  res.status(200).send("Hello from post route");
};

export const createPost = async (req, res) => {
  console.log("Post request successful");
  res.status(201).send("Created successfully");
};

export const updatePost = async (req, res) => {
  console.log("Post updated successfully");
  res.status(200).send("Updated successfully");
};

export const deletePost = async (req, res) => {
  console.log("Post deletion successful");
  res.status(200).send("Deleted successfully");
};
