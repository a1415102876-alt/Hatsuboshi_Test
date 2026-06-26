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

function readObjectLiteral(name) {
  const marker = `const ${name} = `;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${name} must exist`);
  const objectStart = source.indexOf("{", start + marker.length);
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = objectStart; index < source.length; index += 1) {
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
      if (depth === 0) return vm.runInNewContext(`(${source.slice(objectStart, index + 1)})`);
    }
  }
  throw new Error(`Could not parse ${name}`);
}

function makePromptBuilder() {
  const context = {
    state: {
      idol: "月村手毬",
      trust: 45,
      boundCharacter: { name: "初星学园（里）" },
      day: 9,
      round: 1,
      Vo: 500,
      Da: 520,
      Vi: 410,
      stamina: 72,
      stress: 18,
      firstLive: { completed: false, success: false },
      producer: { name: "{{user}}", personality: "", style: "", settings: "" }
    },
    idols: {
      "月村手毬": {
        core: "冷淡外壳、脆弱自厌、SyngUp旧关系、制作人依赖。"
      }
    },
    affinityNodes: readObjectLiteral("affinityNodes"),
    affinityRouteSeeds: readObjectLiteral("affinityRouteSeeds"),
    kotoneBondRoutes: readObjectLiteral("kotoneBondRoutes"),
    temariBondRoutes: readObjectLiteral("temariBondRoutes"),
    misuzuBondRoutes: readObjectLiteral("misuzuBondRoutes"),
    getAffinityStageLine: () => "好感度阶段标签：AFF_TEMARI_40",
    buildProducerPromptSection: () => "",
    getPhase: () => "First Live 中期",
    roundLabel: () => "羁绊事件日",
    outputContract: (text) => `输出格式要求：${text}`
  };
  vm.runInNewContext(
    `${readFunction("galgameRenderContract")}\n${readFunction("formatBondOptions")}\n${readFunction("specialBondRoutesFor")}\n${readFunction("specialBondLabel")}\n${readFunction("buildSpecialBondPhase1Prompt")}\n${readFunction("buildSpecialBondPhase2Prompt")}\n${readFunction("buildSpecialBondFinalPrompt")}\n${readFunction("buildTemariBondPhase1Prompt")}\n${readFunction("buildTemariBondPhase2Prompt")}\n${readFunction("buildTemariBondFinalPrompt")}\n${readFunction("buildAffinityPrompt")}\nthis.buildAffinityPrompt = buildAffinityPrompt;`,
    context
  );
  return context.buildAffinityPrompt;
}

test("Temari bond 40 prompt starts a two-choice-route first phase", () => {
  const buildAffinityPrompt = makePromptBuilder();
  const prompt = buildAffinityPrompt(40);

  assert.match(prompt, /初星育成系统：手毬羁绊事件 - 第一轮选择/);
  assert.match(prompt, /第一轮选项：制作人如何揭开 SyngUp 的真相/);
  assert.match(prompt, /<option1>/);
  assert.match(prompt, /<option4>/);
  assert.doesNotMatch(prompt, /请写一段 1200 字以内的完整好感度剧情/);
});

test("Temari bond 100 remains a completed post-live ending prompt", () => {
  const buildAffinityPrompt = makePromptBuilder();
  const prompt = buildAffinityPrompt(100);

  assert.match(prompt, /First Live 成功后的故事结尾/);
  assert.match(prompt, /First Live 成功后：赌约兑现/);
  assert.doesNotMatch(prompt, /手毬羁绊事件 - 第一轮选择/);
});

test("Misuzu has dedicated two-choice bond route seeds", () => {
  const routes = readObjectLiteral("misuzuBondRoutes");
  assert.deepEqual(Object.keys(routes).map(Number), [20, 40, 60, 80]);
  assert.match(routes[20].canonAnchor, /SyngUp/);
  assert.match(routes[40].objective, /散步/);
  assert.match(routes[60].canonAnchor, /独占欲/);
  assert.match(routes[80].resolution, /直面手毬/);

  const routeSelector = readFunction("specialBondRoutesFor");
  const affinityPrompt = readFunction("buildAffinityPrompt");
  const triggerStart = source.indexOf("function triggerAffinityStory(");
  const triggerEnd = source.indexOf("const VIDEO_CDN", triggerStart);
  const triggerBody = source.slice(triggerStart, triggerEnd);

  assert.match(routeSelector, /idolName === "秦谷美铃"[\s\S]*misuzuBondRoutes/);
  assert.match(affinityPrompt, /specialBondRoutesFor\(\)\?\.\[threshold\]/);
  assert.match(triggerBody, /specialBondRoutesFor\(\)\?\.\[threshold\]/);
});

test("Kotone has dedicated two-choice bond route seeds", () => {
  const routes = readObjectLiteral("kotoneBondRoutes");
  assert.deepEqual(Object.keys(routes).map(Number), [20, 40, 60, 80]);
  assert.match(routes[20].canonAnchor, /不会抛弃/);
  assert.match(routes[40].objective, /打工/);
  assert.match(routes[60].canonAnchor, /玩偶秀/);
  assert.match(routes[80].resolution, /堂堂正正站上舞台/);

  const routeSelector = readFunction("specialBondRoutesFor");
  assert.match(routeSelector, /idolName === "藤田琴音"[\s\S]*kotoneBondRoutes/);
});
