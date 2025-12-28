import fs from "fs/promises";
import path from "path";

const VAULT = path.join(process.cwd(), "content/");
const OUT = path.join(process.cwd(), "public/images");

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });

  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name === ".obsidian") continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(entry.name)) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

copyDir(VAULT, OUT);
