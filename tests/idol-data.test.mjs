import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function readObjectLiteral(constName) {
  const declaration = `const ${constName} =`;
  const declarationIndex = source.indexOf(declaration);
  assert.notEqual(declarationIndex, -1, `${constName} declaration must exist`);

  const start = source.indexOf("{", declarationIndex + declaration.length);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return vm.runInNewContext(`(${source.slice(start, index + 1)})`);
      }
    }
  }

  throw new Error(`Could not parse ${constName}`);
}

const idols = readObjectLiteral("idols");
const idolPresets = readObjectLiteral("idolPresets");
const affinityRouteSeeds = readObjectLiteral("affinityRouteSeeds");

const expected = {
  "姬崎莉波": [85, 120, 125, 13, 21.5, 25.5],
  "葛城莉莉娅": [80, 100, 115, 18, 20, 18],
  "有村麻央": [125, 90, 100, 22, 8, 23],
  "紫云清夏": [100, 115, 90, 9, 23, 23],
  "仓本千奈": [75, 115, 125, 10, 24, 20.5]
};

for (const [name, suppliedStats] of Object.entries(expected)) {
  test(`${name} has a complete playable configuration`, () => {
    assert.equal(typeof idols[name]?.core, "string");
    assert.ok(idols[name].core.length > 10);
    assert.deepEqual(Object.keys(idols[name].styles).sort(), ["companion", "lesson", "outing", "rest", "training"]);
    assert.equal(idolPresets[name].length, 12);
    assert.deepEqual(Array.from(idolPresets[name].slice(0, 6)), suppliedStats);
    assert.ok(idolPresets[name].every(Number.isFinite));
    assert.deepEqual(Object.keys(affinityRouteSeeds[name]).map(Number).sort((a, b) => a - b), [0, 20, 40, 60, 80, 100]);
  });
}
