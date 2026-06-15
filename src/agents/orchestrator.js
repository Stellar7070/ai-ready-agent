const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
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

const fullPrompt = `
${promptContent}

User Request:
${task}

Provide a complete response.
`;

const response = execSync(
  `ollama run llama3.2:3b "${fullPrompt}"`,
  { encoding: "utf8", maxBuffer: 1024 * 1024 * 10 }
);

console.log("\nSelected Agent:", selectedAgent);
console.log("\nGenerated Response:\n");
console.log(response);