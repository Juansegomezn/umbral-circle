import express from 'express';
// import { getPosts } from '../controllers/post.js';

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("It works!");
});

export default router;