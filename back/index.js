import express from "express";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../front/public/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json("No file uploaded or file field name is incorrect.");
    }
    res.status(200).json(file.filename);
})
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);
app.use("/relationships", relationshipsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

