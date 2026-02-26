/**
 * GitHub API integration for saving content.json to the repository.
 * Enables admin edits to persist across Railway deploys.
 */

import type { Content } from "../api/content.js";

const GITHUB_API = "https://api.github.com";

function getConfig(lang: "it" | "en" = "it"): { token: string; repo: string; branch: string; path: string } | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  const base = process.env.GITHUB_CONTENT_PATH || "web/server/data/content.json";
  const path = base
    .replace(/content\.(it|en)?\.json$/, lang === "en" ? "content.en.json" : "content.it.json");
  return {
    token,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    path,
  };
}

async function getFileShaFromGitHub(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token: string
): Promise<string | null> {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub GET failed: ${res.status}`);
  }
  const data = (await res.json()) as { sha?: string };
  return data.sha ?? null;
}

/** Fetch content file from GitHub. Returns null on 404 or error. */
export async function readContentFromGitHub(
  lang: "it" | "en" = "it"
): Promise<Content | null> {
  const config = getConfig(lang);
  if (!config) return null;

  const [owner, repo] = config.repo.split("/");
  if (!owner || !repo) return null;

  const encodedPath = config.path.split("/").map(encodeURIComponent).join("/");
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(config.branch)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (res.status === 404 || !res.ok) return null;

  const data = (await res.json()) as { content?: string; encoding?: string };
  if (data.encoding !== "base64" || !data.content) return null;
  try {
    const raw = Buffer.from(data.content, "base64").toString("utf-8");
    return JSON.parse(raw) as Content;
  } catch {
    return null;
  }
}

export async function saveContentToGitHub(
  data: Content,
  message?: string,
  lang: "it" | "en" = "it"
): Promise<{ ok: boolean; error?: string }> {
  const config = getConfig(lang);
  if (!config) {
    console.error("[GitHub] Not configured: GITHUB_TOKEN or GITHUB_REPO missing");
    return { ok: false, error: "GitHub not configured" };
  }

  const [owner, repo] = config.repo.split("/");
  if (!owner || !repo) {
    console.error("[GitHub] Invalid GITHUB_REPO format:", config.repo);
    return { ok: false, error: "Invalid GITHUB_REPO format" };
  }
  console.log("[GitHub] Saving to", `${owner}/${repo}`, "branch:", config.branch, "path:", config.path);

  const content = Buffer.from(
    JSON.stringify(data, null, 2),
    "utf-8"
  ).toString("base64");

  let sha: string | null = null;
  try {
    sha = await getFileShaFromGitHub(
      owner,
      repo,
      config.path,
      config.branch,
      config.token
    );
  } catch (err) {
    console.error("[GitHub] Failed to get file sha:", err instanceof Error ? err.message : err);
    return { ok: false, error: "Failed to read current file from GitHub" };
  }

  const body: Record<string, unknown> = {
    message: message || "admin: update content",
    content,
    branch: config.branch,
  };
  if (sha) body.sha = sha;

  const encodedPath = config.path.split("/").map(encodeURIComponent).join("/");
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodedPath}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log("[GitHub] Save OK");
    return { ok: true };
  }

  if (res.status === 409) {
    return {
      ok: false,
      error: "Content was modified. Please refresh and try again.",
    };
  }

  if (res.status === 401 || res.status === 403) {
    console.error("[GitHub] Auth error:", res.status);
    return { ok: false, error: "GitHub authentication failed" };
  }

  const errText = await res.text();
  console.error("[GitHub] API error:", res.status, errText.slice(0, 300));
  return { ok: false, error: `GitHub API error: ${res.status}` };
}
