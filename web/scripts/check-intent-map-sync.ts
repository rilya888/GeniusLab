import fs from "node:fs";
import path from "node:path";

type ContentFile = {
  services: {
    items: Array<{
      path: string;
    }>;
  };
};

function fail(message: string): never {
  console.error(`FAIL ${message}`);
  process.exit(1);
}

function readFile(relPath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relPath), "utf-8");
}

function readJson<T>(relPath: string): T {
  return JSON.parse(readFile(relPath)) as T;
}

function extractSection(content: string, header: string): string {
  const start = content.indexOf(header);
  if (start < 0) fail(`missing section header: ${header}`);
  const nextHeader = content.indexOf("\n## ", start + header.length);
  return nextHeader >= 0 ? content.slice(start, nextHeader) : content.slice(start);
}

function extractUrlsFromTable(section: string): string[] {
  const urls: string[] = [];
  const lines = section.split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith("|")) continue;
    if (t.startsWith("| URL |")) continue;
    if (t.startsWith("|---")) continue;
    const cells = t.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length === 0) continue;
    const first = cells[0].replace(/^`|`$/g, "");
    if (first.startsWith("/")) urls.push(first);
  }
  return urls;
}

function compareSets(label: string, expected: string[], actual: string[]): void {
  const expSet = new Set(expected);
  const actSet = new Set(actual);

  if (expSet.size !== expected.length) {
    fail(`${label}: duplicate URLs in intent matrix`);
  }
  if (actSet.size !== actual.length) {
    fail(`${label}: duplicate URLs in content file`);
  }

  const missingInContent = [...expSet].filter((u) => !actSet.has(u));
  const missingInMatrix = [...actSet].filter((u) => !expSet.has(u));

  if (missingInContent.length > 0) {
    fail(`${label}: missing in content: ${missingInContent.join(", ")}`);
  }
  if (missingInMatrix.length > 0) {
    fail(`${label}: missing in intent matrix: ${missingInMatrix.join(", ")}`);
  }
}

const matrix = readFile("../docs/SEO_INTENT_MATRIX_2026.md");

const itSection = extractSection(matrix, "## Core matrix (IT)");
const enSection = extractSection(matrix, "## Core matrix (EN)");

const itMatrixUrls = extractUrlsFromTable(itSection).filter((u) => u.startsWith("/servizi/"));
const enMatrixUrls = extractUrlsFromTable(enSection).filter((u) => u.startsWith("/en/services/"));

const itContent = readJson<ContentFile>("server/data/content.it.json");
const enContent = readJson<ContentFile>("server/data/content.en.json");

const itContentUrls = itContent.services.items.map((i) => i.path);
const enContentUrls = enContent.services.items.map((i) => i.path);

compareSets("IT services", itMatrixUrls, itContentUrls);
compareSets("EN services", enMatrixUrls, enContentUrls);

console.log("OK   intent matrix sync check passed");
