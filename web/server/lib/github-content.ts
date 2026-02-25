/**
 * GitHub API integration for saving content.json to the repository.
 * Enables admin edits to persist across Railway deploys.
 */

import type { Content } from "../api/content.js";

const GITHUB_API = "https://api.github.com";

function getConfig(): { token: string; repo: string; branch: string; path: string } | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return {
    token,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    path: process.env.GITHUB_CONTENT_PATH || "web/server/data/content.json",
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

export async function saveContentToGitHub(
  data: Content,
  message?: string
): Promise<{ ok: boolean; error?: string }> {
  const config = getConfig();
  if (!config) {
    return { ok: false, error: "GitHub not configured" };
  }

  const [owner, repo] = config.repo.split("/");
  if (!owner || !repo) {
    return { ok: false, error: "Invalid GITHUB_REPO format" };
  }

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
    console.error("GitHub save failed: could not get file sha");
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

  if (res.ok) return { ok: true };

  if (res.status === 409) {
    return {
      ok: false,
      error: "Content was modified. Please refresh and try again.",
    };
  }

  if (res.status === 401 || res.status === 403) {
    console.error("GitHub save failed: auth error");
    return { ok: false, error: "GitHub authentication failed" };
  }

  const errText = await res.text();
  console.error("GitHub save failed:", res.status, errText.slice(0, 200));
  return { ok: false, error: `GitHub API error: ${res.status}` };
}
