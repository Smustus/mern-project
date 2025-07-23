import mongoose from "mongoose";

const { Schema, model } = mongoose;

/* const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
); */

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
        content: String,
        votes: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
