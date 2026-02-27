import fs from "node:fs";
import path from "node:path";

type Geo = { latitude: number; longitude: number };
type Location = {
  label: string;
  street: string;
  city: string;
  postalCode: string;
  geo?: Geo;
};

type SiteConfig = {
  contacts: {
    phonePrimary: string;
    email: string;
  };
  locations: Location[];
};

const sitePath = path.resolve(process.cwd(), "src/config/site.json");
const raw = fs.readFileSync(sitePath, "utf-8");
const site = JSON.parse(raw) as SiteConfig;

function fail(msg: string): never {
  console.error(`FAIL ${msg}`);
  process.exit(1);
}

if (!Array.isArray(site.locations) || site.locations.length === 0) {
  fail("site.json locations must contain at least one location");
}

if (!site.contacts?.phonePrimary?.trim()) {
  fail("contacts.phonePrimary must be set");
}

if (!site.contacts?.email?.trim()) {
  fail("contacts.email must be set");
}

const seenLabels = new Set<string>();
for (const [idx, loc] of site.locations.entries()) {
  if (!loc.label?.trim()) fail(`locations[${idx}].label is required`);
  if (!loc.street?.trim()) fail(`locations[${idx}].street is required`);
  if (!loc.city?.trim()) fail(`locations[${idx}].city is required`);
  if (!loc.postalCode?.trim()) fail(`locations[${idx}].postalCode is required`);
  if (seenLabels.has(loc.label)) fail(`locations label must be unique: ${loc.label}`);
  seenLabels.add(loc.label);

  if (loc.geo) {
    if (Number.isNaN(loc.geo.latitude) || loc.geo.latitude < -90 || loc.geo.latitude > 90) {
      fail(`locations[${idx}].geo.latitude must be between -90 and 90`);
    }
    if (Number.isNaN(loc.geo.longitude) || loc.geo.longitude < -180 || loc.geo.longitude > 180) {
      fail(`locations[${idx}].geo.longitude must be between -180 and 180`);
    }
  }
}

const uniqueAddressCount = new Set(
  site.locations.map((loc) => `${loc.street}|${loc.city}|${loc.postalCode}`)
).size;

if (uniqueAddressCount < site.locations.length) {
  fail("locations contain duplicate address entries");
}

console.log("OK   geo consistency check passed");

