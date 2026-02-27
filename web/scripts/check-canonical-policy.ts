import { getCanonicalRedirect } from "../server/canonical";

type Case = {
  name: string;
  input: {
    hostHeader: string;
    forwardedProto?: string;
    fallbackProto: string;
    path: string;
    url: string;
  };
  expected: string | null;
};

const cases: Case[] = [
  {
    name: "Skip local host",
    input: {
      hostHeader: "localhost:5173",
      fallbackProto: "http",
      path: "/servizi",
      url: "/servizi",
    },
    expected: null,
  },
  {
    name: "www -> non-www",
    input: {
      hostHeader: "www.geniuslab.info",
      forwardedProto: "https",
      fallbackProto: "https",
      path: "/servizi",
      url: "/servizi",
    },
    expected: "https://geniuslab.info/servizi",
  },
  {
    name: "http -> https",
    input: {
      hostHeader: "geniuslab.info",
      forwardedProto: "http",
      fallbackProto: "http",
      path: "/contatti",
      url: "/contatti",
    },
    expected: "https://geniuslab.info/contatti",
  },
  {
    name: "Trim trailing slash",
    input: {
      hostHeader: "geniuslab.info",
      forwardedProto: "https",
      fallbackProto: "https",
      path: "/servizi/",
      url: "/servizi/",
    },
    expected: "https://geniuslab.info/servizi",
  },
  {
    name: "Preserve query string on redirect",
    input: {
      hostHeader: "www.geniuslab.info",
      forwardedProto: "https",
      fallbackProto: "https",
      path: "/recensioni/",
      url: "/recensioni/?utm_source=test",
    },
    expected: "https://geniuslab.info/recensioni?utm_source=test",
  },
  {
    name: "Already canonical",
    input: {
      hostHeader: "geniuslab.info",
      forwardedProto: "https",
      fallbackProto: "https",
      path: "/",
      url: "/",
    },
    expected: null,
  },
];

let failed = 0;
for (const c of cases) {
  const actual = getCanonicalRedirect(c.input);
  if (actual !== c.expected) {
    failed += 1;
    console.error(`FAIL ${c.name}`);
    console.error(`  expected: ${String(c.expected)}`);
    console.error(`  actual:   ${String(actual)}`);
  } else {
    console.log(`OK   ${c.name}`);
  }
}

if (failed > 0) {
  console.error(`canonical policy check failed: ${failed} case(s)`);
  process.exit(1);
}

console.log("canonical policy check passed");

