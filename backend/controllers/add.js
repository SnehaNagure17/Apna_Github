const fs = require("fs").promises;
const path = require("path");

module.exports.addRepo = async (filePath) => {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const stagingPath = path.join(repoPath, "staging");

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} is added to staging area`);
  } catch (err) {
    console.log("Error due to staging file:", err);
  }
};
