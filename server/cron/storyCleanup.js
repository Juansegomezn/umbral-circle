import cron from "node-cron";
import { db } from "../connect.js";

// Runs every Sunday at midnight to delete stories older than 24 hours
export const initStoryCleanupCron = () => {
  cron.schedule("0 0 * * 0", () => {
    console.log("=== RUNNING WEEKLY EXPIRED STORIES CLEANUP ===");

    const q = `DELETE FROM stories WHERE "createdAt" < NOW() - INTERVAL '24 hours'`;

    db.query(q, (err, result) => {
      if (err) {
        console.error("Error clearing expired stories from DB:", err);
      } else {
        console.log(`Successfully purged expired stories from DB.`);
      }
    });
  });
};