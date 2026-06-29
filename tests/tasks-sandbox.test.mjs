import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const sideQuestApiSource = readFileSync(new URL("../tasks/side-quest-api.js", import.meta.url), "utf8");
const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const sidePoolSource = readFileSync(new URL("../tasks/side-pool.js", import.meta.url), "utf8");
const tasksSource = readFileSync(new URL("../tasks/sandbox-tasks.js", import.meta.url), "utf8");
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function loadHatsuSideQuestApi() {
  const sandbox = { globalThis: {}, console };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(sideQuestApiSource, sandbox, { filename: "side-quest-api.js" });
  return sandbox.globalThis.HatsuSideQuestApi;
}

function loadHatsuTasks() {
  const sandbox = { globalThis: {}, console };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(sidePoolSource, sandbox, { filename: "side-pool.js" });
  vm.runInNewContext(sideQuestApiSource, sandbox, { filename: "side-quest-api.js" });
  vm.runInNewContext(tasksSource, sandbox, { filename: "sandbox-tasks.js" });
  return sandbox.globalThis.HatsuTasks;
}

function loadSideQuestPool() {
  const sandbox = { globalThis: {}, console };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(sidePoolSource, sandbox, { filename: "side-pool.js" });
  return sandbox.globalThis.HatsuSideQuestPool;
}

function baseSandboxState() {
  return {
    launchMode: "sandbox",
    idol: "月村手毬",
    sandbox: { openingComplete: true, inviteComplete: false },
    stamina: 100,
    stress: 0,
    trust: 0,
    Vo: 120,
    Da: 100,
    Vi: 80
  };
}

test("sandbox tasks module defines scout and temari personal quests", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.ensureTasksShape(state);
  assert.equal(state.tasks.main.scout_temari.status, "locked");
  assert.equal(state.tasks.main.temari_main_01.status, "locked");
  assert.equal(state.tasks.main.temari_main_02.status, "locked");
  assert.equal(state.tasks.main.temari_main_03.status, "locked");
});

test("scout invite complete unlocks parallel personal main quests", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.ensureTasksShape(state);
  const completed = HatsuTasks.onScoutInviteComplete(state);
  assert.equal(completed.length, 1);
  assert.equal(completed[0], "scout_temari");
  assert.equal(state.tasks.main.scout_temari.status, "completed");
  assert.equal(state.tasks.main.temari_main_01.status, "active");
  assert.equal(state.tasks.main.temari_main_02.status, "active");
  assert.equal(state.tasks.main.temari_main_03.status, "active");
  assert.equal(state.tasks.baseline.Vo, 120);
  assert.equal(state.tasks.baseline.Vi, 80);
});

test("parses quest completion tags from AI reply", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);
  const text = "【初星正文开始】<story><narration>和好。</narration></story>【初星任务完成】temari_main_02【初星正文结束】";
  const completed = HatsuTasks.applyQuestCompletionsFromReply(state, text);
  assert.equal(completed.length, 1);
  assert.equal(completed[0], "temari_main_02");
  assert.equal(state.tasks.main.temari_main_02.status, "completed");
});

test("temari main 01 completes on stamina vo and outstage flag", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);
  state.stamina = 90;
  state.Vo = 165;
  state.tasks.main.temari_main_01.flags.outstage_full_song = true;
  const completed = HatsuTasks.evaluateNumericMainQuests(state);
  assert.equal(completed.length, 1);
  assert.equal(completed[0], "temari_main_01");
});

test("temari main 03 completes on vi stress diet flags", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);
  state.Vi = 120;
  state.stress = 20;
  state.tasks.main.temari_main_03.flags.diet_plan_active = true;
  state.tasks.main.temari_main_03.flags.healthy_meal_count = 2;
  const completed = HatsuTasks.evaluateNumericMainQuests(state);
  assert.equal(completed.length, 1);
  assert.equal(completed[0], "temari_main_03");
});

test("campus daily limit tracks lesson and training in sandbox", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.freeMode = { postLiveDay: 2, clockMinutes: 480 };
  HatsuTasks.onScoutInviteComplete(state);

  assert.equal(HatsuTasks.getCampusRemaining(state), 3);
  const first = HatsuTasks.recordCampusAction(state, { kind: "lesson", locationId: "idol_classroom", minutes: 60 });
  assert.equal(first.ok, true);
  assert.equal(first.usedCount, 1);
  assert.equal(HatsuTasks.getCampusRemaining(state), 2);

  HatsuTasks.recordCampusAction(state, { kind: "training", locationId: "gymnasium", minutes: 60 });
  HatsuTasks.recordCampusAction(state, { kind: "training", locationId: "special_education", minutes: 60 });
  assert.equal(HatsuTasks.getCampusRemaining(state), 0);
  assert.equal(HatsuTasks.isCampusDailyLimitReached(state), true);

  const blocked = HatsuTasks.recordCampusAction(state, { kind: "lesson", locationId: "producer_classroom", minutes: 60 });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.reason, "limit");
});

test("campus counter resets when postLiveDay changes", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.freeMode = { postLiveDay: 1, clockMinutes: 480 };
  HatsuTasks.onScoutInviteComplete(state);
  HatsuTasks.recordCampusAction(state, { kind: "lesson", locationId: "idol_classroom", minutes: 60 });
  HatsuTasks.recordCampusAction(state, { kind: "lesson", locationId: "idol_classroom", minutes: 60 });
  assert.equal(HatsuTasks.getCampusRemaining(state), 1);

  state.freeMode.postLiveDay = 2;
  HatsuTasks.syncCampusDay(state);
  assert.equal(state.tasks.campus.usedCount, 0);
  assert.equal(HatsuTasks.getCampusRemaining(state), 3);
  assert.equal(state.tasks.campus.dayKey, "2");
});

test("app.js wires campus daily limit for sandbox", () => {
  assert.match(appSource, /isSandboxCampusExhausted/);
  assert.match(appSource, /recordCampusAction/);
  assert.match(appSource, /canOpenHybridFacilityAt/);
  assert.match(appSource, /showSandboxCampusLimitToast/);
});

test("app.js wires sandbox task hooks", () => {
  assert.match(appSource, /processSandboxQuestFromReply/);
  assert.match(appSource, /getTaskPanelSnapshot/);
  assert.match(appSource, /markOutstageFullSong/);
  assert.match(appSource, /HatsuTasks/);
  assert.match(appSource, /openSideQuestOverlay/);
  assert.match(appSource, /applySideQuestTier/);
  assert.match(appSource, /buildSandboxMainQuestPromptBlock/);
  assert.match(appSource, /processSandboxMainQuestMapChoice/);
  assert.match(appSource, /sendSecondaryPrompt|secondaryAiReply/);
  assert.match(appSource, /handleSecondaryAiReply/);
  assert.match(html, /tasks\/side-quest-api\.js/);
  assert.match(html, /sideQuestApiPanel/);
  assert.match(appSource, /openTaskPanelOverlay/);
  assert.match(appSource, /renderTaskPanelOverlay/);
  assert.match(html, /taskPanelOverlay/);
  assert.match(html, /freeModeTaskPanelBtn/);
  assert.match(html, /tasks\/side-pool\.js/);
  assert.match(html, /tasks\/sandbox-tasks\.js/);
  assert.match(html, /sideQuestOverlay/);
});

test("side quest pool picks three deterministic slots per day", () => {
  const pool = loadSideQuestPool();
  const dayOne = pool.pickDailyQuests("1", "月村手毬", 3);
  const dayOneAgain = pool.pickDailyQuests("1", "月村手毬", 3);
  const dayTwo = pool.pickDailyQuests("2", "月村手毬", 3);
  assert.equal(dayOne.length, 3);
  assert.deepEqual(dayOne.map((slot) => slot.poolId), dayOneAgain.map((slot) => slot.poolId));
  assert.notDeepEqual(dayOne.map((slot) => slot.poolId), dayTwo.map((slot) => slot.poolId));
});

test("side quests refresh when postLiveDay changes", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.freeMode = { postLiveDay: 1, clockMinutes: 480 };
  HatsuTasks.onScoutInviteComplete(state);
  HatsuTasks.syncSideQuestDay(state);
  const firstIds = state.tasks.side.slots.map((slot) => slot.poolId);

  state.freeMode.postLiveDay = 2;
  HatsuTasks.syncSideQuestDay(state);
  const secondIds = state.tasks.side.slots.map((slot) => slot.poolId);
  assert.equal(state.tasks.side.slots.length, 3);
  assert.equal(state.tasks.side.slots.every((slot) => slot.status === "open"), true);
  assert.notDeepEqual(firstIds, secondIds);
});

test("side quest fail tier still grants consolation money", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.freeMode = { postLiveDay: 1, clockMinutes: 480 };
  HatsuTasks.onScoutInviteComplete(state);
  HatsuTasks.syncSideQuestDay(state);
  const result = HatsuTasks.applySideQuestTier(state, 0, "fail");
  assert.equal(result.ok, true);
  assert.equal(result.reward.money, 80);
  assert.equal(state.tasks.wallet.money, 80);
  assert.equal(state.tasks.side.slots[0].status, "done");
  assert.equal(state.tasks.side.slots[0].resultTier, "fail");
});

test("diet side quest pass tier records healthy meal for main quest 03", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.freeMode = { postLiveDay: 1, clockMinutes: 480 };
  HatsuTasks.onScoutInviteComplete(state);
  HatsuTasks.syncSideQuestDay(state);
  const dietSlotIndex = state.tasks.side.slots.findIndex((slot) => slot.tag === "diet");
  assert.notEqual(dietSlotIndex, -1);
  const result = HatsuTasks.applySideQuestTier(state, dietSlotIndex, "pass");
  assert.equal(result.ok, true);
  assert.equal(result.healthyMealRecorded, true);
  assert.equal(state.tasks.main.temari_main_03.flags.healthy_meal_count, 1);
});

test("map choice at dining hall can activate diet plan and healthy meal hooks", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);

  const dietPlan = HatsuTasks.processSandboxMainQuestMapChoice(state, "dining_hall", "和营养师一起制定饮食方案");
  assert.ok(dietPlan.notices.includes("已制定饮食方案"));
  assert.equal(state.tasks.main.temari_main_03.flags.diet_plan_active, true);

  const healthyMeal = HatsuTasks.processSandboxMainQuestMapChoice(state, "dining_hall", "点一份健康餐沙拉");
  assert.ok(healthyMeal.notices.includes("已记录一次健康餐"));
  assert.equal(state.tasks.main.temari_main_03.flags.healthy_meal_count, 1);
});

test("map choice at outstage with sing keywords marks full song flag", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);

  const result = HatsuTasks.processSandboxMainQuestMapChoice(state, "outstage", "让手毬试唱完整一首");
  assert.ok(result.notices.includes("已记录野外舞台完整试唱"));
  assert.equal(state.tasks.main.temari_main_01.flags.outstage_full_song, true);
});

test("parses quest flag tags from AI reply", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);
  const text = "正文【初星任务标记】diet_plan_active【初星正文结束】";
  const result = HatsuTasks.applyQuestFlagsFromReply(state, text);
  assert.ok(result.notices.includes("已制定饮食方案"));
  assert.equal(state.tasks.main.temari_main_03.flags.diet_plan_active, true);
});

test("sandbox main quest prompt mentions SyngUp at dining hall for main 02", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.sandbox = { openingComplete: true, inviteComplete: true };
  HatsuTasks.onScoutInviteComplete(state);
  const block = HatsuTasks.buildSandboxMainQuestPromptBlock(state, "dining_hall");
  assert.match(block, /SyngUp/);
  assert.match(block, /秦谷美铃/);
});

test("main quest progress hints reference GKMS episodes", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  HatsuTasks.onScoutInviteComplete(state);
  const snapshot = HatsuTasks.getTaskPanelSnapshot(state);
  const main01 = snapshot.main.find((item) => item.id === "temari_main_01");
  const main02 = snapshot.main.find((item) => item.id === "temari_main_02");
  const main03 = snapshot.main.find((item) => item.id === "temari_main_03");
  assert.match(main01.progressHint, /GKMS 5\/6\/9/);
  assert.match(main02.progressHint, /GKMS 8～10/);
  assert.match(main03.progressHint, /GKMS 1～3/);
  assert.equal(main01.step, 0);
});

test("side quest api parses daily json block", () => {
  const api = loadHatsuSideQuestApi();
  const text = `【初星支线开始】
{"quests":[{"title":"清晨慢跑","desc":"陪担当完成校园跑道有氧跑。","tag":"stamina"},{"title":"发声练习","desc":"在教室走廊练气息与发声。","tag":"syngup"},{"title":"健康便当","desc":"在学食试做低油便当。","tag":"diet"}]}
【初星支线结束】`;
  const parsed = api.parseSideQuestDailyResponse(text, "3", "月村手毬");
  assert.equal(parsed.quests.length, 3);
  assert.equal(parsed.quests[0].tag, "stamina");
});

test("side quest api parses tier hint json block", () => {
  const api = loadHatsuSideQuestApi();
  const text = `【初星档位开始】
{"fail":"场面乱了只能安慰收场","pass_low":"勉强把流程走完","pass":"标准完成委托","perfect":"超常发挥赢得称赞"}
【初星档位结束】`;
  const hints = api.parseSideQuestTierResponse(text);
  assert.ok(hints.fail.includes("安慰"));
  assert.ok(hints.perfect.includes("超常"));
});

test("queue side quest refresh uses api mode when secondary enabled", () => {
  const HatsuTasks = loadHatsuTasks();
  const state = baseSandboxState();
  state.sandbox = { openingComplete: true, inviteComplete: true };
  HatsuTasks.ensureTasksShape(state);
  state.tasks.secondaryApi.enabled = true;
  state.tasks.secondaryApi.baseUrl = "https://api.example.com/v1";
  state.tasks.secondaryApi.model = "test-model";
  const mode = HatsuTasks.queueSideQuestRefresh(state);
  assert.equal(mode, "api");
  assert.equal(state.tasks.side.genStatus, "pending");
  assert.equal(state.tasks.side.slots.length, 3);
});
