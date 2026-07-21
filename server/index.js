import express from "express";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import commentsRoutes from "./routes/comments.js";
import likesRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import storyRoutes from "./routes/stories.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
import { initStoryCleanupCron } from "./cron/storyCleanup.js";

dotenv.config();

const app = express();

// middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

const allowedOrigins = [
    "https://umbral-circle-client.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

const storage = process.env.NODE_ENV === 'production'
    ? multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/tmp');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
        }
    })
    : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../client/public/upload');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
        }
    });

const upload = multer({ storage: storage })

app.post("/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json("No file uploaded.");
    }
    res.status(200).json(file.filename);
})

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);
app.use("/relationships", relationshipsRoutes);
app.use("/stories", storyRoutes);

if (process.env.NODE_ENV !== 'production') {
    initStoryCleanupCron();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}
app.get("/", (req, res) => {
    res.send("Umbral Circle server is running 🚀");
});

export default app;