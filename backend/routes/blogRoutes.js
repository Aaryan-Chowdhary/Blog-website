import express from "express";
import Blog from "../models/blog.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create new blog (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("❌ Blog creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all blogs (public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get single blog by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a blog (protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();

    res.status(200).json({ message: "Blog updated", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a blog (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add comment
router.post("/:id/comments", protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comment = { user: req.user.email, text: req.body.text };
  blog.comments.push(comment);
  await blog.save();
  res.json(blog);
});

export default router;