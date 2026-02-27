import fs from "node:fs";
import path from "node:path";

type ServiceItem = {
  key: string;
  name: string;
  path: string;
};

type ServicePage = {
  metaDescription?: string;
};

type ContentFile = {
  services: { items: ServiceItem[] };
  servicePages: Record<string, ServicePage>;
};

type DictFile = {
  pages: {
    home: { title: string; description: string };
    services: { title: string; description: string };
    contacts: { title: string; description: string };
    about: { title: string; description: string };
    reviews: { title: string; description: string };
    policies: {
      privacyTitle: string;
      privacyDescription: string;
      cookieTitle: string;
      cookieDescription: string;
    };
    notFound: { title: string; description: string };
  };
};

function readJson<T>(relPath: string): T {
  const full = path.resolve(process.cwd(), relPath);
  return JSON.parse(fs.readFileSync(full, "utf-8")) as T;
}

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function fail(msg: string): never {
  console.error(`FAIL ${msg}`);
  process.exit(1);
}

function checkContent(lang: "it" | "en", expectedPrefix: string): void {
  const content = readJson<ContentFile>(`server/data/content.${lang}.json`);
  const itemKeys = content.services.items.map((i) => i.key);
  const pageKeys = Object.keys(content.servicePages);

  for (const key of itemKeys) {
    if (!content.servicePages[key]) fail(`[${lang}] missing servicePages entry for key: ${key}`);
  }
  for (const key of pageKeys) {
    if (!itemKeys.includes(key)) fail(`[${lang}] orphan servicePages key not present in services.items: ${key}`);
  }

  const pathSet = new Set<string>();
  for (const item of content.services.items) {
    if (!item.name?.trim()) fail(`[${lang}] services.items name is required for path ${item.path}`);
    if (/!{2,}|\?{2,}/.test(item.name)) {
      fail(`[${lang}] services.items name contains noisy punctuation: "${item.name}"`);
    }
    if (!item.path.startsWith(expectedPrefix)) {
      fail(`[${lang}] path must start with '${expectedPrefix}': ${item.path}`);
    }
    if (pathSet.has(item.path)) fail(`[${lang}] duplicate service path: ${item.path}`);
    pathSet.add(item.path);
  }

  const metaSet = new Set<string>();
  for (const [key, page] of Object.entries(content.servicePages)) {
    const meta = page.metaDescription?.trim();
    if (!meta) fail(`[${lang}] servicePages.${key}.metaDescription is required`);
    if (meta.length < 40) fail(`[${lang}] servicePages.${key}.metaDescription too short (<40 chars)`);
    const n = normalize(meta);
    if (metaSet.has(n)) fail(`[${lang}] duplicate metaDescription detected: servicePages.${key}`);
    metaSet.add(n);
  }
}

function checkDictionary(filePath: string, langLabel: string): void {
  const raw = fs.readFileSync(path.resolve(process.cwd(), filePath), "utf-8");
  // Extract object literal from "export const xx = { ... } as const;"
  const match = raw.match(/export const \w+\s*=\s*(\{[\s\S]*\})\s*as const;/);
  if (!match) fail(`[${langLabel}] cannot parse dictionary object in ${filePath}`);

  const objectLiteral = match[1];
  const dict = Function(`"use strict"; return (${objectLiteral});`)() as DictFile;

  const titles = [
    dict.pages.home.title,
    dict.pages.services.title,
    dict.pages.contacts.title,
    dict.pages.about.title,
    dict.pages.reviews.title,
    dict.pages.policies.privacyTitle,
    dict.pages.policies.cookieTitle,
    dict.pages.notFound.title,
  ].map(normalize);

  if (new Set(titles).size !== titles.length) {
    fail(`[${langLabel}] duplicate page titles found in i18n dictionary`);
  }

  const descriptions = [
    dict.pages.home.description,
    dict.pages.services.description,
    dict.pages.contacts.description,
    dict.pages.about.description,
    dict.pages.reviews.description,
    dict.pages.policies.privacyDescription,
    dict.pages.policies.cookieDescription,
    dict.pages.notFound.description,
  ].map(normalize);

  if (new Set(descriptions).size !== descriptions.length) {
    fail(`[${langLabel}] duplicate page descriptions found in i18n dictionary`);
  }
}

checkContent("it", "/servizi/");
checkContent("en", "/en/services/");
checkDictionary("src/i18n/it.ts", "it");
checkDictionary("src/i18n/en.ts", "en");

console.log("OK   seo content quality check passed");
