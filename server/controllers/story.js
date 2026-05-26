import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import { getVideoDurationInSeconds } from "get-video-duration";
import fs from "fs";

const getUserIdFromToken = (req) => {
  const token = req.cookies.accessToken;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded.id;
  } catch (err) {
    return null;
  }
};

export const addStory = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");
  if (!req.file) return res.status(400).json("No file uploaded!");

  const contentUrl = req.file.filename;
  const isVideo = req.file.mimetype.startsWith("video");
  const contentType = isVideo ? "video" : "image";

  // If it's a video, check duration before saving to DB
  if (isVideo) {
    try {
      const duration = await getVideoDurationInSeconds(req.file.path);
      if (duration > 10) {
        fs.unlinkSync(req.file.path); 
        return res.status(400).json("Video duration cannot exceed 10 seconds!");
      }
    } catch (error) {
      fs.unlinkSync(req.file.path);
      return res.status(500).json("Error processing video duration.");
    }
  }

  const q = 'INSERT INTO umbral.stories ("userId", "contentUrl", "contentType") VALUES ($1, $2, $3) RETURNING *';
  
  try {
    const data = await db.query(q, [userId, contentUrl, contentType]);
    return res.status(200).json("Story has been created.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStories = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");

  const q = `
    SELECT s.*, u.username, u.name, u."profilePic" 
    FROM umbral.stories AS s
    JOIN umbral.users AS u ON (u.id = s."userId")
    WHERE s."createdAt" >= NOW() - INTERVAL '24 hours'
    AND (
      s."userId" = $1 
      OR s."userId" IN (SELECT "followedUserId" FROM umbral.relationships WHERE "followerUserId" = $1)
    )
    ORDER BY s."createdAt" DESC
  `;

  try {
    const data = await db.query(q, [userId]);
    return res.status(200).json(data.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const viewStory = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");

  const q = `
    INSERT INTO umbral.story_views ("storyId", "userId") 
    VALUES ($1, $2) 
    ON CONFLICT ("storyId", "userId") DO NOTHING
  `;

  try {
    await db.query(q, [req.params.storyId, userId]);
    return res.status(200).json("View recorded.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const reactStory = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");
  const { emoji } = req.body;

  const q = `
    INSERT INTO umbral.story_reactions ("storyId", "userId", emoji) 
    VALUES ($1, $2, $3)
    ON CONFLICT ("storyId", "userId") 
    DO UPDATE SET emoji = EXCLUDED.emoji, "reactedAt" = CURRENT_TIMESTAMP
  `;

  try {
    await db.query(q, [req.params.storyId, userId, emoji]);
    return res.status(200).json("Reaction updated.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStoryStats = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");

  // Verify that the user is the owner of the story before fetching stats
  const checkQ = 'SELECT "userId" FROM umbral.stories WHERE id = $1';
  const checkData = await db.query(checkQ, [req.params.storyId]);
  
  if (checkData.rows.length === 0) return res.status(404).json("Story not found.");
  if (checkData.rows[0].userId !== userId) return res.status(403).json("You can only view stats for your own stories.");

  const q = `
    SELECT v."userId", u.name, u.username, u."profilePic", r.emoji
    FROM umbral.story_views v
    JOIN umbral.users u ON (u.id = v."userId")
    LEFT JOIN umbral.story_reactions r ON (r."storyId" = v."storyId" AND r."userId" = v."userId")
    WHERE v."storyId" = $1
  `;

  try {
    const data = await db.query(q, [req.params.storyId]);
    return res.status(200).json(data.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteStory = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json("Not logged in!");

  const q = 'DELETE FROM umbral.stories WHERE id = $1 AND "userId" = $2 RETURNING "contentUrl"';

  try {
    const data = await db.query(q, [req.params.storyId, userId]);
    if (data.rows.length === 0) return res.status(403).json("You can delete only your story!");

    const filePath = `../front/public/upload/${data.rows[0].contentUrl}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return res.status(200).json("Story has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
};