const http = require("http");
const cluster = require("cluster");
const os = require("os");
const path = require("path");
cluster.schedulingPolicy = cluster.SCHED_RR;

console.log(path.resolve(__dirname));

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  console.log(
    `master pid=${process.pid} is running with ${cpuCount} CPU cores`
  );
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} exited with code ${code}`);

    console.log("starting another worker");
    cluster.fork();
  });
} else {
  require("./index");
}
