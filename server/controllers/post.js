import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = req.query.userId;
    const q = userId !== undefined 
      ? `SELECT p.*, u.id AS "userId", u.name, u."profilePic", COUNT(c.id) AS "commentCount" 
        FROM posts AS p 
        JOIN users AS u ON (u.id = p."userId") 
        LEFT JOIN comments AS c ON (c."postId" = p.id)
        WHERE p."userId" = $1 
        GROUP BY p.id, u.id, u.name, u."profilePic"
        ORDER BY p."createdAt" DESC`
      : `SELECT DISTINCT p.*, u.id AS "userId", u.name, u."profilePic", COUNT(c.id) AS "commentCount" 
        FROM posts AS p 
        JOIN users AS u ON (u.id = p."userId")
        LEFT JOIN relationships AS r ON (r."followedUserId" = p."userId") 
        LEFT JOIN comments AS c ON (c."postId" = p.id)
        WHERE r."followerUserId" = $1 OR p."userId" = $2
        GROUP BY p.id, u.id, u.name, u."profilePic"
        ORDER BY p."createdAt" DESC`;

    const values = userId !== undefined ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows);
    });
  });
};

export const addPost = (req, res) => { 
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `INSERT INTO posts (description, img, "userId") VALUES ($1, $2, $3)`;
    const values = [
      req.body.description,
      req.body.img,
      userInfo.id
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Post has been created.');
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = 'DELETE FROM posts WHERE id = $1 AND "userId" = $2';

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.rowCount === 0) return res.status(404).json("You can delete only your post!");
      return res.status(200).json("The post has been deleted.");
    });
  });
}