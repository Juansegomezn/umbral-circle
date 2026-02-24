import express from "express";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";

const app = express();

// middleware
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

