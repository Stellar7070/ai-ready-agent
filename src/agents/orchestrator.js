const fs = require("fs");
const path = require("path");

const agents = {
  ai: "ai-ready-hub-content-agent.md",
  breach: "yougotbreached-agent.md",
  money: "damoney-academy-agent.md",
  leadgen: "leadgen-agent.md"
};

function routeTask(task) {
  const lower = task.toLowerCase();

  if (lower.includes("breach") || lower.includes("cyber")) {
    return agents.breach;
  }

  if (lower.includes("money") || lower.includes("financial")) {
    return agents.money;
  }

  if (
    lower.includes("lead") ||
    lower.includes("partnership") ||
    lower.includes("outreach") ||
    lower.includes("organizations") ||
    lower.includes("homeschool")
  ) {
    return agents.leadgen;
  }

  return agents.ai;
}

const task = process.argv[2];

const selectedAgent = routeTask(task);

const promptPath = path.join(
  __dirname,
  "../../prompts",
  selectedAgent
);

const promptContent = fs.readFileSync(
  promptPath,
  "utf8"
);

console.log("Task:", task);
console.log("\nAgent File:", selectedAgent);
console.log("\nAgent Instructions:\n");
console.log(promptContent);