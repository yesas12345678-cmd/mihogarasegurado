import fs from "fs/promises";
import path from "path";

let hasSynced = false;

export async function syncUploads() {
  if (hasSynced) return;
  
  // Skip syncing during the next build phase
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return;
  }
  
  try {
    const staticDir = path.join(process.cwd(), "public", "uploads_static");
    const targetDir = path.join(process.cwd(), "public", "uploads");

    // Check if uploads_static directory exists
    try {
      await fs.access(staticDir);
    } catch {
      console.log("No uploads_static directory found to sync.");
      hasSynced = true;
      return;
    }

    // Ensure target uploads directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Read files from uploads_static
    const files = await fs.readdir(staticDir);

    for (const file of files) {
      const srcPath = path.join(staticDir, file);
      const destPath = path.join(targetDir, file);

      let shouldCopy = false;
      try {
        const destStat = await fs.stat(destPath);
        const srcStat = await fs.stat(srcPath);
        // If sizes are different, overwrite it
        if (destStat.size !== srcStat.size) {
          shouldCopy = true;
        }
      } catch {
        // File does not exist in destination
        shouldCopy = true;
      }

      if (shouldCopy) {
        console.log(`Syncing image to persistent volume: ${file}`);
        await fs.copyFile(srcPath, destPath);
      }
    }
    hasSynced = true;
    console.log("Image uploads directory synchronized successfully.");
  } catch (error) {
    console.error("Failed to sync uploads directory:", error);
  }
}
