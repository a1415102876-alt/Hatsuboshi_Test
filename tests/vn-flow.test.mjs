import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("First Live post reply waits until the live theater closes", () => {
  const applyStart = source.indexOf("function applyAiReply(");
  const applyEnd = source.indexOf("function sendAiReplyAck", applyStart);
  assert.notEqual(applyStart, -1, "applyAiReply must exist");
  assert.notEqual(applyEnd, -1, "sendAiReplyAck must follow applyAiReply");
  const applyBody = source.slice(applyStart, applyEnd);
  const videoBody = readFunction("playLiveVideo");
  const postBody = readFunction("startFirstLivePostStage");

  assert.match(applyBody, /node\?\.type === "firstLivePost" && isLiveTheaterActive\(\)/);
  assert.match(applyBody, /deferredLivePostReply = \{ title, result: "已收到 SillyTavern 角色回复", story: reply \}/);
  assert.match(videoBody, /flushDeferredLivePostReply\(\)/);
  assert.match(videoBody, /onComplete\(\)/);
  assert.match(postBody, /deferredLivePostReply = null/);
});

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

test("VN log button opens the dark in-event dialogue history overlay", () => {
  const openBody = readFunction("openVnLogView");
  const closeBody = readFunction("closeVnLogView");
  const eventBody = readFunction("openEventOverlay");
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");

  assert.match(html, /id="vnLogOverlay"/);
  assert.match(html, /id="vnLogContent"/);
  assert.match(css, /\.vn-log-overlay/);
  assert.match(css, /rgba\(0,\s*0,\s*0,\s*0\.72\)/);
  assert.match(openBody, /buildVnLogHtml\(\)/);
  assert.match(openBody, /vnLogOverlay/);
  assert.doesNotMatch(openBody, /vnClassicPanel/);
  assert.match(closeBody, /vnLogOverlay/);
  assert.match(eventBody, /closeVnLogView\(\)/);
});

test("choice UI is gated by explicit event mode and action whitelist", () => {
  const context = {
    state: {
      eventMode: "none",
      choiceStep: 1,
      pendingActionContext: { action: "lesson" }
    }
  };
  vm.runInNewContext(
    `${readFunction("isChoicePromptAction")}\n${readFunction("isChoicePromptMode")}\nthis.isChoicePromptMode = isChoicePromptMode;`,
    context
  );

  assert.equal(context.isChoicePromptMode(), false);

  context.state.eventMode = "choice_prompt";
  assert.equal(context.isChoicePromptMode(), false);

  context.state.pendingActionContext = { action: "outing" };
  assert.equal(context.isChoicePromptMode(), true);

  context.state.pendingActionContext = { action: "companion" };
  assert.equal(context.isChoicePromptMode(), true);

  context.state.pendingActionContext = { action: "intimacy" };
  assert.equal(context.isChoicePromptMode(), true);

  context.state.pendingActionContext = { action: "bond" };
  assert.equal(context.isChoicePromptMode(), true);
});

test("intimacy action is visible but locked until trust reaches 60", () => {
  const availability = readFunction("isActionAvailable");
  const rendering = readFunction("renderActionButtons");
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

  assert.match(source, /function isIntimacyUnlocked\(/);
  assert.match(availability, /isIntimacyUnlocked\(\)/);
  assert.match(rendering, /\["亲密",\s*"intimacy",\s*null,\s*"#f58ab5",\s*isIntimacyUnlocked\(\) \? "压-10" : "信赖60解锁"\]/);
  assert.match(rendering, /信赖值达到 \$\{INTIMACY_UNLOCK_TRUST\} 后解锁亲密行动/);
  assert.match(html, /id="intimacyOverlay"/);
  assert.match(source, /function openIntimacyOverlay\(/);
  assert.match(source, /function confirmIntimacyMode\(/);
  assert.match(source, /INTIMACY_NSFW_UNLOCK_TRUST = 100/);
});

test("NSFW intimacy uses multi-turn VN choices with custom input and end", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

  assert.match(source, /function buildNsfwIntimacyOpeningPrompt\(/);
  assert.match(source, /function buildNsfwIntimacyContinuePrompt\(/);
  assert.match(source, /function buildNsfwIntimacyClosingPrompt\(/);
  assert.match(source, /function buildNsfwIntimacyChatContextLine\(/);
  assert.match(source, /SillyTavern 聊天记录中/);
  assert.doesNotMatch(source, /已发生剧情与互动/);
  assert.match(html, /id="vnCustomChoicePanel"/);
  assert.match(html, /id="vnCustomChoiceInput"/);
  assert.match(source, /自定义输入/);
  assert.match(source, /handleNsfwIntimacyEndChoice/);
});

test("intimacy choice settlement restores stamina and stress without adding trust", () => {
  const phase1Start = source.indexOf("function buildChoicePhase1Prompt(");
  const phase2Start = source.indexOf("function buildChoicePhase2Prompt(");
  const openingStart = source.indexOf("function buildOpeningPrompt(", phase2Start);
  assert.notEqual(phase1Start, -1, "buildChoicePhase1Prompt must exist");
  assert.notEqual(phase2Start, -1, "buildChoicePhase2Prompt must exist");
  assert.notEqual(openingStart, -1, "buildOpeningPrompt must follow choice prompt builders");
  const phase2 = source.slice(phase2Start, openingStart);
  const selection = readFunction("handleChoiceSelection");

  assert.match(phase2, /体力 \+38，压力 -10，不增加信赖值/);
  assert.match(selection, /action === "intimacy"[\s\S]*delta\.stamina = 38[\s\S]*delta\.stress = -10/);
  assert.doesNotMatch(selection, /action === "intimacy"[\s\S]{0,160}delta\.trust/);
});

test("choice resolution mode is separate from choice prompt parsing", () => {
  const context = {
    state: {
      eventMode: "choice_resolution",
      choiceStep: 1,
      pendingActionContext: { action: "outing" }
    }
  };
  vm.runInNewContext(
    `${readFunction("isChoicePromptAction")}\n${readFunction("isChoicePromptMode")}\n${readFunction("isChoiceResolutionMode")}\nthis.isChoicePromptMode = isChoicePromptMode;\nthis.isChoiceResolutionMode = isChoiceResolutionMode;`,
    context
  );

  assert.equal(context.isChoicePromptMode(), false);
  assert.equal(context.isChoiceResolutionMode(), true);
});

test("AI reply routing uses explicit event modes instead of raw choiceStep gates", () => {
  const start = source.indexOf("function applyAiReply(");
  const end = source.indexOf("function sendAiReplyAck", start);
  assert.notEqual(start, -1, "applyAiReply must exist");
  assert.notEqual(end, -1, "sendAiReplyAck must follow applyAiReply");
  const body = source.slice(start, end);

  assert.match(body, /isChoicePromptMode\(\)/);
  assert.match(body, /isChoiceResolutionMode\(\)/);
  assert.match(body, /state\.eventMode\s*!==\s*"choice_prompt"/);
  assert.doesNotMatch(body, /if\s*\(\s*state\.choiceStep\s*===\s*1\s*\|\|/);
  assert.doesNotMatch(body, /if\s*\(\s*state\.choiceStep\s*===\s*2\s*\)/);
});

test("choice prompt regeneration resends the original prompt instead of host regenerate", () => {
  const body = readFunction("triggerRegeneration");

  assert.match(body, /isChoicePromptMode\(\)/);
  assert.match(body, /requestHostPromptSend\(state\.lastPrompt,\s*requestId\)/);
});

test("line fallback requires numbered choices instead of ordinary quoted dialogue", () => {
  const start = source.indexOf("function applyAiReply(");
  const end = source.indexOf("function sendAiReplyAck", start);
  assert.notEqual(start, -1, "applyAiReply must exist");
  assert.notEqual(end, -1, "sendAiReplyAck must follow applyAiReply");
  const body = source.slice(start, end);

  assert.doesNotMatch(body, /return\s+hasQuotes\s*\|\|\s*hasNumberPrefix/);
  assert.match(body, /return\s+hasNumberPrefix/);
});

test("malformed choice prompt stays regenerable instead of settling the action", () => {
  const start = source.indexOf("function applyAiReply(");
  const end = source.indexOf("function sendAiReplyAck", start);
  assert.notEqual(start, -1, "applyAiReply must exist");
  assert.notEqual(end, -1, "sendAiReplyAck must follow applyAiReply");
  const body = source.slice(start, end);

  assert.match(body, /选项生成不完整/);
  assert.doesNotMatch(body, /fallbackChoiceSettlement\(reply\)/);
});

test("opening a non-choice event clears stale choice UI", () => {
  const elements = new Map();
  const makeElement = (id) => {
    const element = {
      id,
      hidden: false,
      innerHTML: "stale option",
      textContent: "",
      style: { display: "flex" },
      classList: { add() {}, remove() {} }
    };
    elements.set(id, element);
    return element;
  };
  [
    "eventOverlay",
    "eventTitle",
    "eventPhaseBadge",
    "eventResult",
    "eventStory",
    "eventChoices",
    "vnChoicesOverlay",
    "vnChoicesContainer"
  ].forEach(makeElement);

  const context = {
    state: { choiceStep: 0, selectedChoiceText: "", lastStory: "", pendingOptionTexts: ["A", "B", "C", "D"] },
    pendingAiRequestId: "",
    document: { getElementById: (id) => elements.get(id) || null },
    saveState() {},
    getPhase: () => "First Live",
    formatStoryText: (value) => String(value || ""),
    setEventActionsEnabled() {},
    setVnControlsEnabled() {},
    setElementHidden(id, hidden) {
      const element = elements.get(id);
      if (element) element.hidden = hidden;
    },
    triggerWipeTransition(callback) { callback(); },
    parseNovelSlides: () => [],
    initVisualNovelPlayer() {}
  };
  vm.runInNewContext(
    `${readFunction("isChoiceResolutionMode")}\n${readFunction("openEventOverlay")}\nthis.openEventOverlay = openEventOverlay;`,
    context
  );

  context.openEventOverlay("Final", "done", "final story without choices");

  assert.equal(elements.get("eventChoices").innerHTML, "");
  assert.equal(elements.get("eventChoices").hidden, true);
  assert.equal(elements.get("vnChoicesOverlay").style.display, "none");
  assert.equal(elements.get("vnChoicesContainer").innerHTML, "");
});

test("ended non-choice VN dialogue hides stale choice overlay", () => {
  const elements = new Map();
  const makeElement = (id) => {
    const element = {
      id,
      innerHTML: "stale option",
      textContent: "",
      disabled: false,
      style: { display: "flex" },
      classList: { add() {}, remove() {} },
      onclick: null
    };
    elements.set(id, element);
    return element;
  };
  [
    "vnText",
    "vnNameplate",
    "vnDialogueBox",
    "vnChoicesOverlay",
    "vnChoicesContainer",
    "eventConfirmBtn"
  ].forEach(makeElement);

  const context = {
    state: { choiceStep: 0, pendingOptionTexts: ["A", "B", "C", "D"] },
    document: { getElementById: (id) => elements.get(id) || null },
    stopVnAuto() {},
    showVnChoicesOverlay() {
      elements.get("vnChoicesOverlay").style.display = "flex";
    },
    closeEventOverlay() {}
  };
  vm.runInNewContext(
    `${readFunction("isChoicePromptAction")}\n${readFunction("isChoicePromptMode")}\n${readFunction("handleVnSlidesEnd")}\nthis.handleVnSlidesEnd = handleVnSlidesEnd;`,
    context
  );

  context.handleVnSlidesEnd();

  assert.equal(elements.get("vnChoicesOverlay").style.display, "none");
  assert.equal(elements.get("vnChoicesContainer").innerHTML, "");
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
