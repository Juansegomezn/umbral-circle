import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = `SELECT "userId" FROM likes WHERE "postId" = $1`;
  
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data.rows.map(like => like.userId));
  });
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`;
    const values = [
      userInfo.id,
      req.body.postId
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('The post has been liked.');
    });
  });
}

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = 'DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2';

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.rowCount === 0) return res.status(404).json("Like not found.");
      return res.status(200).json("The post has been disliked.");
    });
  });
}