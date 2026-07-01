import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const stSource = readFileSync(new URL("../st.html", import.meta.url), "utf8");
function readFunction(functionName) {
  const declaration = `function ${functionName}`;
  const start = stSource.indexOf(declaration);
  assert.notEqual(start, -1, `${functionName} must exist`);
  const bodyStart = stSource.indexOf("{", start);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = bodyStart; index < stSource.length; index += 1) {
    const character = stSource[index];
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
      if (depth === 0) return stSource.slice(start, index + 1);
    }
  }
  throw new Error(`Could not parse ${functionName}`);
}

test("st.html in-page bridge handles frontend AI reply acknowledgements", () => {
  assert.match(stSource, /data\.type === 'aiReplyAck'/);
  assert.match(stSource, /function handleReplyAck\(/);
  assert.match(stSource, /function resolveReplyAck\(/);
  assert.match(stSource, /scheduleReplyRetry\(pendingCandidateMessageId\)/);
  assert.match(stSource, /clearPendingReplyRequest\(\)/);
});

test("st.html in-page bridge listens to regenerated or swiped final messages", () => {
  assert.match(stSource, /eventTypes\.MESSAGE_SWIPED/);
  assert.match(stSource, /sendLatestAiReplyToFrame\(messageId, true\)/);
});

test("st.html reply bridge safely reads context and falls back to latest post-prompt AI message", () => {
  assert.match(stSource, /function getSillyTavernGlobal\(/);
  assert.match(stSource, /let pendingPromptChatLength = 0/);
  assert.match(stSource, /function findLatestUsableAiReplyId\(/);
  assert.match(stSource, /rawText = typeof message\.mes === '.*?' \? message\.mes : '.*?';/);
  assert.match(stSource, /Math\.max\(1, pendingPromptChatLength\)/);
  assert.match(stSource, /const replyMessageId = findLatestUsableAiReplyId\(messageId\)/);
});
test("st.html loader uses a responsive mobile viewport instead of a fixed desktop canvas", () => {
  assert.doesNotMatch(stSource, /#hatsu-st-page\s*\{[\s\S]*?width:\s*1180px\s*!important/);
  assert.match(stSource, /--hatsu-viewport-height/);
  assert.match(stSource, /visualViewport/);
  assert.match(stSource, /@media\s*\(max-width:\s*560px\)/);
});

test("st.html pauses floor hiding when the opening floor is not mounted", () => {
  assert.match(stSource, /hatsuboshi-floor-hide-enabled/);
  assert.match(stSource, /querySelector\('\.mes\[mesid="0"\]'\)/);
  assert.match(stSource, /classList\.toggle\('hatsuboshi-floor-hide-enabled', shouldHide\)/);
});

test("st.html remounts the fullscreen overlay if the host removes it", () => {
  assert.match(stSource, /function ensureHatsuOverlayMounted\(/);
  assert.match(stSource, /new MutationObserver/);
  assert.match(stSource, /ensureHatsuOverlayMounted\(\)/);
});

test("st.html removes older Hatsuboshi user prompt floors from chat completion payloads", () => {
  assert.match(stSource, /CHAT_COMPLETION_PROMPT_READY/);
  assert.match(stSource, /function pruneHatsuChatCompletionPayload\(/);
  assert.match(stSource, /isHatsuFrontendPromptMessage/);
  assert.match(stSource, /lastHatsuUserPromptIndex/);
  assert.match(stSource, /eventData\.chat\.splice\(0, eventData\.chat\.length, \.\.\.filtered\)/);
});

test("st.html loads the gift shop module so the shop/bag entry is available under the bridge", () => {
  assert.match(stSource, /"shop\/gift-shop\.js"/);
  const scriptsBlock = stSource.match(/const WORLD_SCRIPTS = \[([\s\S]*?)\];/);
  assert.ok(scriptsBlock, "WORLD_SCRIPTS array should exist");
  assert.match(scriptsBlock[1], /"shop\/gift-shop\.js"/);
});

test("st.html rewrites large assets to R2 while keeping avatars on Workers base", () => {
  assert.match(stSource, /R2_MEDIA_CDN/);
  assert.match(stSource, /function rewriteAssetsInText\(/);
  assert.match(stSource, /function rewriteAssetRef\(/);
  assert.match(stSource, /isLocalAvatarAsset/);
  assert.match(stSource, /rewriteAssetsInCss/);
  assert.match(stSource, /\.replaceAll\('"\.\/assets\/avatars\/'/);
  assert.match(stSource, /\.replaceAll\('"\.\/assets\/'/);
  assert.doesNotMatch(stSource, /\.replaceAll\('"\.\/assets\/', '"' \+ abs\('assets\/'\)\)/);
});


test("transactional helper ignores generation-ended events for a different request", () => {
  const extractReplyTextFromGenerated = (generated) => {
    if (typeof generated === "string") return generated.trim();
    if (!generated || typeof generated !== "object") return "";
    return String(generated.text || generated.mes || generated.message || generated.content || "").trim();
  };
  const fn = new Function(
    "extractReplyTextFromGenerated",
    `${readFunction("normalizeGenerationEndedText")}; return normalizeGenerationEndedText;`
  )(extractReplyTextFromGenerated);

  assert.equal(fn({ generation_id: "previous-round", text: "old training reply" }, "current-round"), null);
  assert.equal(fn({ generation_id: "current-round", text: "current rest reply" }, "current-round"), "current rest reply");
  assert.equal(fn("legacy final text", "current-round"), "legacy final text");
});

test("transactional helper rejects stale summary text for choice prompts", () => {
  const fn = new Function(
    `${readFunction("hasCompleteOptionPayload")}
${readFunction("isLikelySummaryOnlyReply")}
${readFunction("isGeneratedTextCompatibleWithPrompt")}; return isGeneratedTextCompatibleWithPrompt;`
  )();

  const bondPrompt = "[\u521d\u661f\u80b2\u6210\u7cfb\u7edf\uff1a\u5e7f\u7f81\u7eca\u4e8b\u4ef6 - \u7b2c\u4e00\u8f6e\u9009\u62e9]\n<option1>A</option1>";
  const staleInteractionReply = `<story>old interaction closure</story>
<current_event>day summary</current_event>
<summary_intro>previous round</summary_intro>
<tucao>stale</tucao>
<sum>previous interaction summary</sum>`;
  const properChoiceReply = `<story>current bond event</story>
<option1>A</option1>
<option2>B</option2>
<option3>C</option3>
<option4>D</option4>`;

  assert.equal(fn(bondPrompt, staleInteractionReply), false);
  assert.equal(fn(bondPrompt, properChoiceReply), true);
  assert.equal(fn("plain prompt", staleInteractionReply), true);
});
