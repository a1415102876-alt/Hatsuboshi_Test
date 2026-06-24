import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

function readFunction(functionName) {
  const declaration = `function ${functionName}`;
  const start = source.indexOf(declaration);
  assert.notEqual(start, -1, `${functionName} must exist`);
  const bodyStart = source.indexOf("{", start);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = bodyStart; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") quote = character;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Could not parse ${functionName}`);
}

test("choice continuation display starts from the selected option and not the previous story", () => {
  const buildChoiceContinuationDisplayStory = vm.runInNewContext(`(${readFunction("buildChoiceContinuationDisplayStory")})`);
  const intro = "前半段第一句。\n前半段第二句。";
  const chosenLine = "<narration>▶ 制作人的选择：先喝水（【极佳】）</narration>";
  const reply = "后续反应第一句。\n后续反应第二句。";

  const display = buildChoiceContinuationDisplayStory(intro, chosenLine, reply);

  assert.match(display, /制作人的选择：先喝水/);
  assert.match(display, /后续反应第一句/);
  assert.doesNotMatch(display, /前半段第一句/);
});

test("choice pending display replaces the previous story while waiting for AI", () => {
  const buildChoicePendingDisplayStory = vm.runInNewContext(`(${readFunction("buildChoicePendingDisplayStory")})`);
  const intro = "前半段第一句。\n前半段第二句。";
  const chosenLine = "<narration>▶ 制作人的选择：先喝水（【极佳】）</narration>";

  const display = buildChoicePendingDisplayStory(intro, chosenLine);

  assert.match(display, /制作人的选择：先喝水/);
  assert.match(display, /等待 SillyTavern/);
  assert.doesNotMatch(display, /前半段第一句/);
});

test("event action enabled state is shared by classic and VN controls", () => {
  const elements = new Map();
  const makeElement = (id) => {
    const element = { id, disabled: null, textContent: "", classList: { add() {}, remove() {} } };
    elements.set(id, element);
    return element;
  };
  [
    "eventConfirmBtn",
    "eventRegenBtn",
    "eventAiBtn",
    "vnBtnRegen",
    "vnBtnEdit",
    "vnBtnAuto",
    "vnBtnSkip"
  ].forEach(makeElement);

  const context = {
    document: { getElementById: (id) => elements.get(id) || null },
    state: { activeStoryNode: null }
  };
  vm.runInNewContext(
    `${readFunction("setVnControlsEnabled")}\n${readFunction("setEventActionsEnabled")}\nthis.setEventActionsEnabled = setEventActionsEnabled;`,
    context
  );

  context.setEventActionsEnabled(false, true);
  assert.equal(elements.get("eventRegenBtn").disabled, true);
  assert.equal(elements.get("vnBtnRegen").disabled, true);
  assert.equal(elements.get("vnBtnEdit").disabled, true);

  context.setEventActionsEnabled(true, false);
  assert.equal(elements.get("eventRegenBtn").disabled, false);
  assert.equal(elements.get("vnBtnRegen").disabled, false);
  assert.equal(elements.get("vnBtnEdit").disabled, false);
});

test("ended VN dialogue clicks ignore control buttons", () => {
  const body = readFunction("handleVnSlidesEnd");
  assert.match(body, /target\.closest\("\.vn-controls"\)/);
  assert.match(body, /target\.closest\("\.vn-btn"\)/);
});

test("malformed choice fallback clears pending generation state", () => {
  const body = readFunction("fallbackChoiceSettlement");
  assert.match(body, /pendingAiRequestId\s*=\s*""/);
  assert.match(body, /state\.choiceStep\s*=\s*0/);
});

test("choice parser accepts story and option tags without an end marker", () => {
  const extractChoicePayload = vm.runInNewContext(`(${readFunction("extractChoicePayload")})`, {
    cleanReplyText: (value) => String(value || "").replace(/<[^>]+>/g, "").trim()
  });
  const source = `【初星正文开始】
<story>
<narration>星南问制作人。</narration>
<dialogue char="十王星南">“我缺少了什么？”</dialogue>
</story>
<option1>“先休息一下吧。”</option1>
<option2>“您已经足够完美了。”</option2>
<option3>“您缺的是允许自己不完美。”</option3>
<option4>“您缺少的是让自己笨拙的勇气。”</option4>`;

  const payload = extractChoicePayload(source);

  assert.equal(payload.options.length, 4);
  assert.equal(payload.options[2], "“您缺的是允许自己不完美。”");
  assert.match(payload.story, /星南问制作人/);
});

test("choice parser accepts multiline story and option tags from outing replies", () => {
  const extractChoicePayload = vm.runInNewContext(`(${readFunction("extractChoicePayload")})`, {
    cleanReplyText: (value) => String(value || "").replace(/<[^>]+>/g, "").trim()
  });
  const source = `【初星正文开始】
<story>
<narration>游乐园入口广场的彩色气球在下午四点的风里左右摇晃。</narration>
<dialogue char="月村手毬">“我不觉得来游乐园是一项有效的训练内容。”</dialogue>
<narration>制作人把卡片递了过去。</narration>
</story>
<option1>“由我来重新排明天的日程吧。”</option1>
<option2>“我知道您讨厌被当成需要休息的人。”</option2>
<option3>“……给您。热可可。”</option3>
<option4>“48不是软弱的数字。”</option4>
【初星正文结束】`;

  const payload = extractChoicePayload(source);

  assert.match(payload.story, /游乐园入口广场/);
  assert.equal(payload.options.length, 4);
  assert.equal(payload.options[0], "“由我来重新排明天的日程吧。”");
  assert.equal(payload.options[3], "“48不是软弱的数字。”");
});

test("choice parser recovers options when custom tags are stripped into plain text", () => {
  const extractChoicePayload = vm.runInNewContext(`(${readFunction("extractChoicePayload")})`, {
    cleanReplyText: (value) => String(value || "").replace(/<[^>]+>/g, "").trim()
  });
  const source = `【初星正文开始】
星南问制作人：“我缺少了什么？”
“先休息一下吧。”“您已经足够完美了。”“您缺的是允许自己不完美。”“您缺少的是让自己笨拙的勇气。”`;

  const payload = extractChoicePayload(source);

  assert.equal(payload.options.length, 4);
  assert.equal(payload.options[0], "“先休息一下吧。”");
  assert.equal(payload.options[3], "“您缺少的是让自己笨拙的勇气。”");
  assert.match(payload.story, /我缺少了什么/);
});
