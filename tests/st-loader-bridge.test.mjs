import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const stSource = readFileSync(new URL("../st.html", import.meta.url), "utf8");

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
