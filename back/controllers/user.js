import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  
  const q = `SELECT * FROM users WHERE id = ?`;
  
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
}

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `UPDATE users SET username = ?, email = ?, name = ?, coverPic = ?, profilePic = ?, location = ?, website = ? WHERE id = ?`;
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
      if (data.affectedRows === 0) return res.status(404).json("User not found!");
      return res.status(200).json('User has been updated.');
    });
  });
}