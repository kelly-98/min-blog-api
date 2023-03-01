import mongoose, { Schema } from "mongoose";
import { formatDate } from "../utils/formatDate";

interface IBlog {
  title: string;
  description: string;
  previewImageUrl: string;
  createdAt: any;
  tags: string[];
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewImageUrl: { type: String, required: true },
  createdAt: { type: String, default: formatDate(Date.now()) },
  tags: [{ type: String }],
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
