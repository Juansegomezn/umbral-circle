import express from "express";
import { 
  getStories, 
  addStory, 
  deleteStory, 
  viewStory, 
  reactStory, 
  getStoryStats 
} from "../controllers/story.js";
import { uploadStory } from "../middleware/uploadStories.js";

const router = express.Router();

router.get("/", getStories);
router.post("/", uploadStory, addStory);
router.delete("/:storyId", deleteStory);
router.post("/:storyId/view", viewStory);
router.post("/:storyId/react", reactStory);
router.get("/:storyId/stats", getStoryStats);

export default router;