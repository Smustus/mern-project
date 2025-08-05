import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    published: Boolean,
    author: String,
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    comments: [
      {
        user: String,
        title: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
