import express from 'express';
// import { getUser } from '../controllers/user.js';

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("It works!");
});

export default router;