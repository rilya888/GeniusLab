import fs from "node:fs";
import path from "node:path";

function read(relPath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relPath), "utf-8");
}

function fail(message: string): never {
  console.error(`FAIL ${message}`);
  process.exit(1);
}

function extractGa4Events(siteScripts: string): string[] {
  const match = siteScripts.match(/const\s+GA4_EVENTS:\s*string\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!match) fail("Cannot find GA4_EVENTS array in SiteScripts.tsx");
  const block = match[1];
  const events = [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return events;
}

function ensureIncludes(content: string, pattern: RegExp, error: string): void {
  if (!pattern.test(content)) fail(error);
}

const siteScripts = read("src/app/components/SiteScripts.tsx");
const pageTracker = read("src/app/components/AnalyticsPageTracker.tsx");
const contactForm = read("src/app/components/ContactForm.tsx");

const expectedEvents = [
  "virtual_page_view",
  "form_submit_attempt",
  "form_submit_success",
  "form_submit_fail",
  "form_submit_click",
  "cta_click_call",
  "cta_click_whatsapp",
  "cta_click_contact",
].sort();

const actualEvents = extractGa4Events(siteScripts).sort();
if (JSON.stringify(actualEvents) !== JSON.stringify(expectedEvents)) {
  fail(
    `GA4_EVENTS mismatch.\nExpected: ${expectedEvents.join(", ")}\nActual:   ${actualEvents.join(", ")}`
  );
}

ensureIncludes(
  siteScripts,
  /if\s*\(!consent\?\.analytics\)\s*return;/,
  "Missing consent gate in GeniusAnalytics.track"
);
ensureIncludes(
  siteScripts,
  /if\s*\(eventName\s*===\s*"virtual_page_view"\)\s*\{[\s\S]*?gtag\?\.\("event",\s*"page_view"/,
  'Missing mapping "virtual_page_view" -> gtag("event","page_view")'
);
ensureIncludes(
  pageTracker,
  /track\("virtual_page_view",\s*\{[\s\S]*page_path:[\s\S]*page_title:/,
  "AnalyticsPageTracker must send page_path and page_title for virtual_page_view"
);
ensureIncludes(
  contactForm,
  /track\("form_submit_attempt",\s*\{\s*formId:\s*"contact-form"\s*\}\)/,
  "ContactForm must send form_submit_attempt with formId"
);
ensureIncludes(
  contactForm,
  /track\("form_submit_success",\s*\{\s*formId:\s*"contact-form"\s*\}\)/,
  "ContactForm must send form_submit_success with formId"
);
ensureIncludes(
  contactForm,
  /track\("form_submit_fail",\s*\{\s*formId:\s*"contact-form"\s*\}\)/,
  "ContactForm must send form_submit_fail with formId"
);
ensureIncludes(
  contactForm,
  /data-track="form_submit_click"/,
  'ContactForm submit button must include data-track="form_submit_click"'
);

console.log("OK   analytics contract check passed");

