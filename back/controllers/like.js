import { db } from "../connect.js";

export const getLikes = (req, res) => {
  const q = `SELECT l.*, u.id AS userId FROM likes AS l 
  LEFT JOIN users AS u ON (u.id = l.userId) WHERE l.postId = ?`;
  
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}