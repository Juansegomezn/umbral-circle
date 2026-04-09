import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  
  const q = `SELECT * FROM users WHERE id = $1`;
  
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length === 0) return res.status(404).json("User not found!");

    const { password, ...info } = data.rows[0];
    return res.status(200).json(info);
  });
}

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      UPDATE users 
      SET username = $1, email = $2, name = $3, "coverPic" = $4, "profilePic" = $5, location = $6, website = $7 
      WHERE id = $8
    `;
    
    const values = [
      req.body.username,
      req.body.email,
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
      req.body.location,
      req.body.website,
      userInfo.id
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.rowCount === 0) return res.status(404).json("User not found or no changes made!");
      
      return res.status(200).json('User has been updated.');
    });
  });
}