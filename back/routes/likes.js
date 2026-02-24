import express from 'express';
// import { getLikes } from '../controllers/like.js';

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("It works!");
});


export default router;