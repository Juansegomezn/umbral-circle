import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  const q = `
    SELECT c.*, u.id AS "userId", u.name, u."profilePic" 
    FROM comments AS c 
    JOIN users AS u ON (u.id = c."userId") 
    WHERE c."postId" = $1
    ORDER BY c."createdAt" DESC
  `;
  
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
}

export const addComment = (req, res) => { 
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      INSERT INTO comments (description, "userId", "postId") 
      VALUES ($1, $2, $3)
    `;
    
    const values = [
      req.body.description,
      userInfo.id,
      req.body.postId
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Comment has been created.');
    });
  });
};