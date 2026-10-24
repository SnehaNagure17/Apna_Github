const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports.commitRepo = async (message) => {
  try {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    const commitID = uuidv4();
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file), //path.join("where to make file","name of file to be create")
      );
    }

    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );

    console.log(`Commit ${commitID} created with message: ${message}`);
  } catch (err) {
    console.log("Error during commiting files:", err);
  }
};
