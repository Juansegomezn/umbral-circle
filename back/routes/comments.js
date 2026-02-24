import express from 'express';
// import { getComments } from '../controllers/comment.js';

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("It works!");
});

export default router;