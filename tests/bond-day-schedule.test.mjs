import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");

function readFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = source.indexOf("{", start);
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = bodyStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'" || char === "`") quote = char;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Could not parse ${name}`);
}

function makeContext(overrides = {}) {
  const context = {
    state: {
      day: 1,
      round: 1,
      idol: "月村手毬",
      liveReady: false,
      firstLive: { completed: false, success: false, result: null },
      affinity: { openingComplete: true, unlocked: [], pending: [], viewed: [] },
      ...overrides
    },
    ensureStateShape() {},
    saveState() {},
    render() {},
    REQUIRED_BOND_THRESHOLDS: [20, 40, 60, 80],
    FINAL_LIVE_DAY: 22
  };
  vm.runInNewContext(
    [
      readFunction("pendingRequiredBondThreshold"),
      readFunction("isBondEventDay"),
      readFunction("markAffinityUnlocked"),
      readFunction("markAffinityViewed"),
      readFunction("advanceRound"),
      readFunction("completeBondEventDay")
    ].join("\n")
      + "\nthis.pendingRequiredBondThreshold = pendingRequiredBondThreshold;"
      + "\nthis.isBondEventDay = isBondEventDay;"
      + "\nthis.markAffinityUnlocked = markAffinityUnlocked;"
      + "\nthis.advanceRound = advanceRound;"
      + "\nthis.completeBondEventDay = completeBondEventDay;",
    context
  );
  return context;
}

test("First Live final day moves to day 22 after four required bond event days", () => {
  const context = makeContext({ day: 21, round: 4 });
  context.advanceRound();
  assert.equal(context.state.day, 22);
  assert.equal(context.state.liveReady, true);
});

test("pending 20 to 80 affinity nodes force the next day into a bond event day", () => {
  const context = makeContext({
    day: 6,
    round: 4,
    affinity: { openingComplete: true, unlocked: [20], pending: [20], viewed: [] }
  });

  context.advanceRound();

  assert.equal(context.state.day, 7);
  assert.equal(context.isBondEventDay(), true);
  assert.equal(context.pendingRequiredBondThreshold(), 20);
});

test("newly unlocked bond nodes do not interrupt the same day", () => {
  const context = makeContext({ day: 6, round: 2 });

  context.markAffinityUnlocked(20);

  assert.equal(context.isBondEventDay(), false);
  context.advanceRound();
  assert.equal(context.state.day, 6);
  assert.equal(context.isBondEventDay(), false);
  context.advanceRound();
  assert.equal(context.state.day, 6);
  assert.equal(context.isBondEventDay(), false);
  context.advanceRound();
  assert.equal(context.state.day, 7);
  assert.equal(context.isBondEventDay(), true);
});

test("affinity 100 does not consume a schedule day", () => {
  const context = makeContext({
    affinity: { openingComplete: true, unlocked: [100], pending: [100], viewed: [] }
  });

  assert.equal(context.isBondEventDay(), false);
  assert.equal(context.pendingRequiredBondThreshold(), null);
});

test("completing a bond event day advances to the next regular day", () => {
  const context = makeContext({
    day: 9,
    round: 1,
    affinity: { openingComplete: true, unlocked: [40], pending: [40], viewed: [] }
  });

  context.completeBondEventDay(40);

  assert.deepEqual(context.state.affinity.pending, []);
  assert.deepEqual(context.state.affinity.viewed, [40]);
  assert.equal(context.state.day, 10);
  assert.equal(context.state.round, 1);
  assert.equal(context.state.liveReady, false);
});
