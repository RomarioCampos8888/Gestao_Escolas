import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("../www/", import.meta.url);
const files = ["index.html", "styles.css", "app.js", "manifest.json", "service-worker.js"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, outputDirectory));
}

await cp(new URL("../icons/", import.meta.url), new URL("icons/", outputDirectory), { recursive: true });

console.log(`Built ${files.length} web assets and icons into www/.`);
