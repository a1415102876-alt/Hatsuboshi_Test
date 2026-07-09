import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function readFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const next = source.indexOf("\n  function ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("produce outing scene background uses destination scene mapping", () => {
  const fn = readFunction("getSceneBackground");
  assert.match(fn, /action === "outing"/);
  assert.match(fn, /context\.actionContext\?\.destination/);
  assert.match(fn, /OUTING_DESTINATION_SCENES\[destination\]/);
});
