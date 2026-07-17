import { mkdir, writeFile } from "node:fs/promises";

const workerUrl = new URL("./dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", process.pid + "-" + Date.now());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);
let html = await response.text();
html = html
  .replaceAll('href="/assets/', 'href="./assets/')
  .replaceAll('src="/assets/', 'src="./assets/')
  .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"')
  .replace(/url\(C:\/Users\/yasse\/AppData\/Local\/Temp\/clarity-ledger-build\/\.vinext\/fonts\/([^)]+)\)/g, "url(./assets/_vinext_fonts/$1)");
await mkdir(new URL("./docs/", import.meta.url), { recursive: true });
await writeFile(new URL("./docs/index.html", import.meta.url), html, "utf8");