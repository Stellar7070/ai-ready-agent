const agents = {
ai: "AI Ready Hub Content Agent",
breach: "YouGotBreached Agent",
money: "Da' Money Academy Agent",
leadgen: "Lead Generation Agent"
};

function routeTask(task) {
const lower = task.toLowerCase();

if (lower.includes("breach") || lower.includes("cyber")) {
return agents.breach;
}

if (lower.includes("money") || lower.includes("financial")) {
return agents.money;
}

if (lower.includes("lead") || lower.includes("partnership")) {
return agents.leadgen;
}

return agents.ai;
}

const task = process.argv[2];

console.log("Task:", task);
console.log("Selected Agent:", routeTask(task));
