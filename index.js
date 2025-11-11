import { Database } from "bun:sqlite";
import { join } from "path";
import { homedir } from "os";
import { existsSync, readFileSync } from "fs";

/**
 * Load search keywords from queries.txt configuration file.
 * Each line in the file represents a keyword to search for in browser history.
 */
const keywordsText = readFileSync("queries.txt", "utf-8");
const keywords = keywordsText
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

/**
 * Resolves the path to the Chrome history database file.
 *
 * @returns {string|null} Full path to the Chrome history database, or null if not found
 */
function getChromeHistoryPath() {
  const home = homedir();

  // Load the relative history path from configuration file
  const historyPathText = readFileSync("historypath.txt", "utf-8").trim();

  // Construct the absolute path by joining with the user's home directory
  const historyPath = join(home, historyPathText);

  return existsSync(historyPath) ? historyPath : null;
}

const dbPath = getChromeHistoryPath();
if (!dbPath) {
  console.error("Could not find Chrome History database.");
  process.exit(1);
}

console.log("Using history file:", dbPath);

/**
 * Open the SQLite database connection.
 * Note: Database must be opened in read-write mode to perform deletions.
 */
const db = new Database(dbPath);

/**
 * Deletes browser history entries matching a given keyword.
 *
 * Chrome stores browsing data in two related tables:
 * - `urls`: Contains URL and title information, with unique ID
 * - `visits`: Contains visit timestamps and metadata, linked to `urls.id`
 *
 * Deletion is performed in the correct order to maintain referential integrity:
 * 1. Delete related records from `visits` table
 * 2. Delete matching records from `urls` table
 *
 * @param {string} keyword - The search term to match against URLs and titles
 */
function deleteByKeyword(keyword) {
  console.log("Deleting entries containing:", keyword);

  // Query for URLs matching the keyword in either the URL or title field
  const selectStmt = db.query(`
    SELECT id FROM urls
    WHERE url LIKE ? OR title LIKE ?
  `);

  const rows = selectStmt.all(`%${keyword}%`, `%${keyword}%`);

  if (rows.length === 0) {
    console.log("No matches found.");
    return;
  }

  const deleteVisits = db.query(`
    DELETE FROM visits WHERE url IN (
      SELECT id FROM urls WHERE url LIKE ? OR title LIKE ?
    )
  `);

  const deleteUrls = db.query(`
    DELETE FROM urls WHERE url LIKE ? OR title LIKE ?
  `);

  // Execute deletions within a transaction to ensure atomicity
  db.transaction(() => {
    deleteVisits.run(`%${keyword}%`, `%${keyword}%`);
    deleteUrls.run(`%${keyword}%`, `%${keyword}%`);
  })();

  console.log(
    `Removed ${rows.length} history entries for keyword "${keyword}".`
  );
}

// Process each keyword from the configuration file
for (const keyword of keywords) {
  deleteByKeyword(keyword);
}

console.log("Done.");
