import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("../www/", import.meta.url);
const files = ["index.html", "styles.css", "app.js"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, outputDirectory));
}

console.log(`Built ${files.length} web assets into www/.`);
