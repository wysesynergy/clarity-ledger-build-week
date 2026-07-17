import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Clarity Ledger evidence workspace", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Clarity Ledger/);
  assert.match(html, /Every instruction has a source/);
  assert.match(html, /Source register/);
  assert.match(html, /Contradictions/);
  assert.match(html, /Clarification queue/);
  assert.match(html, /Automation map/);
  assert.match(html, /Synthetic data only/);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("keeps private organizations and data out of demo source", async () => {
  const [page, readme, submission] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../SUBMISSION.md", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Harborlight Community Services/);
  assert.doesNotMatch(page, /\bTCFTC\b|Recovery Solutions|yheyaime@|\bMMUN\b/i);
  assert.match(readme, /synthetic content only/i);
  assert.match(submission, /Privacy hold/);
});