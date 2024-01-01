import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");
const path = require("path");

const data = fs.readFileSync("./routeConfig.json", "utf8");
const config = JSON.parse(data);

const routeTree = { paths: [] };

function readDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file, index) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const replaceConfigPath = config.routeComponentPath.replace("./", "");

      const routePath = filePath.replace(replaceConfigPath, "");

      routeTree.paths.push({
        path: routePath,
        component: config.routeComponentName,
      });

      readDirectory(filePath);
    }
  });
}

readDirectory(config.routeComponentPath);
console.log(routeTree);
