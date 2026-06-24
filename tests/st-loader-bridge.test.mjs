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
