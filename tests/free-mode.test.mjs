import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

function readFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const next = source.indexOf("\n  function ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("free mode unlocks after First Live completion with entry overlay and world map", () => {
  assert.match(source, /postLiveDay: 1/);
  assert.match(source, /clockMinutes: FREE_MODE_DAY_START_MINUTES/);
  assert.match(source, /presence: \{\}/);
  assert.match(source, /relationships: \{\}/);
  assert.match(source, /npcRelationships: \{\}/);
  assert.match(source, /function completeFirstLivePostFlow\(/);
  assert.match(readFunction("completeFirstLivePostFlow"), /openFreeModeEntryOverlay\(\)/);
  assert.match(html, /id="freeModeEntryOverlay"/);
  assert.match(html, /id="freeModeStage"/);
  assert.match(html, /id="worldMapHotspots"/);
  assert.match(html, /id="freeModeStatusBadge"/);
  assert.match(html, /id="vnFreeModeClock"/);
  assert.match(readFunction("updateFreeModeHeader"), /vnFreeModeClock/);
  assert.match(html, /id="freeModeTimeOverlay"/);
  assert.match(html, /id="freeModeAdvanceDayBtn"/);
  assert.match(readFunction("updateFreeModeTimeOverlayUI"), /formatFreeModeClock\(\)/);
  assert.doesNotMatch(readFunction("updateFreeModeTimeOverlayUI"), /overlay\.hidden/);
  assert.match(readFunction("applyFreeModeManualTimeAdvance"), /advanceFreeModeTime/);
  assert.match(readFunction("handleFreeModeAdvanceDay"), /advanceFreeModeToNextDay/);
  assert.match(readFunction("advanceFreeModeToNextDay"), /runFreeModeWorldDailyTick/);
  assert.match(html, /id="producerApartmentStage"/);
  assert.match(html, /id="apartmentSleepBtn"/);
  assert.match(html, /id="apartmentDaySummaryBtn"/);
  assert.match(html, /id="apartmentInviteBtn"/);
  assert.match(html, /id="apartmentInviteOverlay"/);
  assert.match(source, /function getApartmentNsfwEligibleIdols\(/);
  assert.match(source, /function startApartmentNsfwInvite\(/);
  assert.match(readFunction("getApartmentNsfwEligibleIdols"), /INTIMACY_NSFW_UNLOCK_TRUST/);
  assert.match(readFunction("startApartmentNsfwInvite"), /apartmentInvite:\s*true/);
  assert.match(source, /function isProducerApartmentActive\(/);
  assert.match(source, /Producer_Apartment\.png/);
  assert.match(source, /eveningJournal/);
  assert.match(html, /id="freeModePhoneBtn"/);
  assert.doesNotMatch(html, /id="freeModeBackBtn"/);
});

test("world map locations and free mode time rules are wired", () => {
  assert.match(source, /const WORLD_MAP_LOCATIONS = \[/);
  assert.match(source, /id: "dining_hall"/);
  assert.match(source, /id: "student_store"/);
  assert.match(source, /WORLD_MAP_LOCATION_SCENES/);
  assert.match(readFunction("getSceneBackground"), /getMapLocationSceneBackground/);
  assert.match(source, /FREE_MODE_DAY_END_MINUTES = 22 \* 60/);
  assert.match(source, /FREE_MODE_LATE_END_MINUTES = 23 \* 60/);
  assert.match(source, /function openEveningGoHomePrompt\(/);
  assert.match(source, /function handleEveningGoHomeChoice\(/);
  assert.match(source, /function canBringAssignedIdolHome\(/);
  assert.match(readFunction("canBringAssignedIdolHome"), /INTIMACY_NSFW_UNLOCK_TRUST/);
  assert.match(readFunction("getEveningGoHomeOptions"), /带担当回家/);
  assert.match(readFunction("isFreeModeTravelAllowed"), /getFreeModeTravelEndMinutes\(\)/);
  assert.match(readFunction("advanceFreeModeTime"), /maybeTriggerEveningGoHomePrompt/);
  assert.doesNotMatch(readFunction("syncProducerApartmentState"), /enterProducerApartmentIfNeeded/);
  assert.match(readFunction("advanceFreeModeTime"), /FREE_MODE_MAP_CHOICE_MINUTES/);
  assert.match(source, /FREE_MODE_MAP_ARRIVAL_MINUTES = 15/);
  assert.match(source, /FREE_MODE_MAP_CHOICE_MINUTES = 15/);
  assert.match(source, /FREE_MODE_PRESENCE_CHANCE = 0\.2/);
  assert.match(readFunction("beginMapLocationExploreSession"), /advanceFreeModeTime\(FREE_MODE_MAP_ARRIVAL_MINUTES\)/);
  assert.match(readFunction("handleMapLocationChoiceSelection"), /advanceFreeModeTime\(chosenMinutes\)/);
  assert.match(source, /FREE_MODE_MAP_DUSK_START_MINUTES = 17 \* 60/);
  assert.match(source, /Gakuen_Dawn\.png/);
  assert.match(source, /Gakuen_Night\.png/);
  assert.doesNotMatch(source, /Gakuen_Midnight\.png/);
  assert.match(readFunction("getWorldMapImageForClock"), /WORLD_MAP_IMAGE_NIGHT/);
  assert.match(readFunction("renderFreeModeStage"), /updateWorldMapImage\(\)/);
  assert.match(readFunction("rollFreeModePresence"), /refreshWorldPresenceFromRules/);
  assert.match(source, /dataset\.action === "world_map"/);
});

test("map location explore uses choice flow with return to map", () => {
  assert.match(source, /action === "map_location"/);
  assert.match(readFunction("beginMapLocationExploreSession"), /getMapExplorePrompt/);
  assert.match(readFunction("bindWorldMapHotspotInteractions"), /handleWorldMapHotspotClick\(location\.id\)/);
  assert.match(readFunction("confirmMapLocationEntry"), /isSandboxScoutTalkAvailable/);
  assert.match(readFunction("buildSandboxScoutExplorePrompt"), /物色搭话/);
  assert.match(html, /id="mapLocationEnterWithIdolBtn"/);
  assert.match(html, /和担当一起来/);
  assert.match(html, /id="mapLocationEnterAloneBtn"/);
  assert.match(html, /自己来/);
  assert.match(readFunction("buildMapLocationExplorePrompt"), /buildMapLocationVisitModeLine/);
  assert.match(readFunction("buildMapLocationExplorePrompt"), /buildFreeModeRelationshipPromptBlock/);
  assert.match(readFunction("buildMapLocationExplorePrompt"), /buildMapExploreChoiceOutputBlock/);
  assert.match(html, /id="mapLocationPresenceAvatars"/);
  assert.match(readFunction("openMapLocationOverlay"), /renderMapLocationPresence/);
  assert.match(readFunction("renderMapLocationPresence"), /map-location-presence-avatar/);
  assert.match(readFunction("renderWorldMapIdolMarkers"), /profile\.avatar/);
  assert.match(readFunction("returnToFreeModeMap"), /activeLocationId = null/);
  assert.match(readFunction("handleMapLocationChoiceSelection"), /requestNextMapLocationOptions\(\)/);
  assert.match(source, /function requestNextMapLocationOptions\(/);
  assert.match(readFunction("requestNextMapLocationOptions"), /continuation: true/);
  assert.doesNotMatch(readFunction("appendMapLocationControlButtons"), /继续探索/);
  assert.doesNotMatch(source, /function buildMapLocationAfterChoicePrompt\(/);
  assert.match(readFunction("buildMapLocationExplorePrompt"), /不要写选项被选中后的收尾/);
  assert.match(readFunction("buildMapLocationExplorePrompt"), /<time1>/);
  assert.match(readFunction("handleMapLocationChoiceSelection"), /resolveMapOptionMinutes/);
  assert.match(source, /function buildMapLocationExplorePrompt\(/);
  assert.match(source, /function buildMapLocationReturnPrompt\(/);
  assert.match(readFunction("handleMapLocationReturn"), /getMapExploreReturnPrompt/);
});

test("school entrance supports off-campus outing with preset destinations", () => {
  assert.match(html, /id="mapLocationOutingBtn"/);
  assert.match(html, /id="freeModeOutingOverlay"/);
  assert.match(html, /id="freeModeOutingDestinationList"/);
  assert.match(html, /id="offCampusTransitMap"/);
  assert.match(source, /const OFF_CAMPUS_TRANSIT_STATIONS = \[/);
  assert.match(source, /id: "shopping_street"/);
  assert.match(source, /id: "shopping_mall"/);
  assert.match(source, /id: "aquarium"/);
  assert.match(source, /id: "sports_center"/);
  assert.match(source, /id: "saki_home"/);
  assert.match(source, /id: "china_home"/);
  assert.doesNotMatch(source, /name: "游戏厅", description/);
  assert.doesNotMatch(source, /name: "拉面店", description/);
  assert.match(source, /"拉面店", "琴音打工的快餐店"/);
  assert.match(source, /"甜品店", "游戏厅"/);
  assert.match(readFunction("isSandboxOffCampusExitAtEntrance"), /school_entrance/);
  assert.match(readFunction("isSandboxOffCampusExitAtEntrance"), /isSandboxLaunch/);
  assert.match(readFunction("isSandboxOffCampusExitAtEntrance"), /isSandboxScoutActive/);
  assert.match(readFunction("handleWorldMapHotspotClick"), /openFreeModeOutingOverlay/);
  assert.match(readFunction("handleWorldMapHotspotClick"), /openMapLocationOverlay/);
  assert.match(readFunction("openMapLocationOverlay"), /mapLocationOutingBtn/);
  assert.match(readFunction("openMapLocationOverlay"), /isSandboxOffCampusExitAtEntrance/);
  assert.match(readFunction("openFreeModeOutingOverlay"), /renderOffCampusTransitMap/);
  assert.match(readFunction("openFreeModeOutingOverlay"), /FREE_MODE_OUTING_DESTINATIONS\.forEach/);
  assert.match(readFunction("renderOffCampusTransitMap"), /off-campus-line-main/);
  assert.match(readFunction("renderOffCampusTransitMap"), /is-locked/);
  assert.match(readFunction("confirmFreeModeOutingDestination"), /startFreeModeOuting/);
  assert.match(readFunction("startFreeModeOuting"), /FREE_MODE_OUTING_LOCATION_ID/);
  assert.match(readFunction("beginMapLocationExploreSession"), /isOffCampus/);
  assert.match(readFunction("beginMapLocationExploreSession"), /getMapExplorePrompt/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /校外外出探索/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /与育成日程外出完全不同/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /连续多轮选择 option/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /buildFreeModeRelationshipPromptBlock/);
  assert.doesNotMatch(readFunction("confirmFreeModeOutingDestination"), /settleAction\("outing"/);
});

test("map option time tags parse with 15 minute fallback", () => {
  const sandbox = {
    FREE_MODE_MAP_CHOICE_MINUTES: 15,
    FREE_MODE_MAP_MINUTES_MAX: 120,
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    cleanReplyText: (value) => String(value || "").replace(/<[^>]+>/g, "").trim()
  };
  vm.runInNewContext(`
${readFunction("stripAiThinkingBlocks")}
${readFunction("parseMapOptionMinutes")}
${readFunction("resolveMapOptionMinutes")}
${readFunction("extractChoicePayload")}
`, sandbox);
  const source = `【初星正文开始】
<story><narration>讲堂里很安静。</narration></story>
<option1>在后排观察</option1>
<time1>10</time1>
<option2>去和偶像搭话</option2>
<time2>45分钟</time2>
<option3>查看公告板</option3>
<option4>离开去找人</option4>
<time4>200</time4>
【初星正文结束】`;

  const payload = sandbox.extractChoicePayload(source);
  assert.equal(payload.optionMinutes[0], 10);
  assert.equal(payload.optionMinutes[1], 45);
  assert.equal(payload.optionMinutes[2], null);
  assert.equal(payload.optionMinutes[3], 120);
  assert.equal(sandbox.resolveMapOptionMinutes(null), 15);
  assert.equal(sandbox.resolveMapOptionMinutes(30), 30);
});


test("choice reply source prefers a complete option payload over stale raw text", () => {
  const sandbox = {
    FREE_MODE_MAP_CHOICE_MINUTES: 15,
    FREE_MODE_MAP_MINUTES_MAX: 120,
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    cleanReplyText: (value) => String(value || "").replace(/<[^>]+>/g, "").trim(),
    state: {
      eventMode: "choice_prompt",
      pendingActionContext: { action: "map_location" }
    }
  };
  vm.runInNewContext(`
${readFunction("decodeAiReplySource")}
${readFunction("collectAiReplyCandidates")}
${readFunction("stripAiThinkingBlocks")}
${readFunction("isChoicePromptAction")}
${readFunction("isChoicePromptMode")}
${readFunction("parseMapOptionMinutes")}
${readFunction("extractChoicePayload")}
${readFunction("selectAiReplySource")}
`, sandbox);
  const staleRawText = "正在等待角色卡 AI 生成本次小剧情...";
  const completeReply = `【初星正文开始】
<story><narration>食堂里传来餐盘轻碰的声音。</narration></story>
<option1>看看今日菜单</option1>
<time1>15</time1>
<option2>坐到窗边</option2>
<time2>20</time2>
<option3>向琴音推荐甜点</option3>
<time3>25</time3>
<option4>返回大厅</option4>
<time4>10</time4>
【初星正文结束】`;

  assert.equal(sandbox.selectAiReplySource(completeReply, staleRawText, ""), completeReply);
  assert.equal(sandbox.selectAiReplySource("", staleRawText, completeReply), completeReply);
});

test("free mode relationship updates parse and clamp by idol", () => {
  const sandbox = {
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    canonicalIdolName: (value) => String(value || "").trim(),
    idols: {
      "花海咲季": {},
      "月村手毬": {}
    },
    state: {
      day: 1,
      freeMode: {
        postLiveDay: 2,
        relationships: {
          "花海咲季": { 好感度: 99, 更新日: 1 }
        }
      }
    }
  };
  vm.runInNewContext(`
${readFunction("stripAiThinkingBlocks")}
${readFunction("clampFreeModeRelationshipScore")}
${readFunction("normalizeFreeModeRelationshipEntry")}
${readFunction("ensureFreeModeRelationships")}
${readFunction("getFreeModeRelationship")}
${readFunction("extractFreeModeRelationshipUpdate")}
${readFunction("parseFreeModeRelationshipDelta")}
${readFunction("applyFreeModeRelationshipUpdate")}
`, sandbox);
  const reply = `【初星正文开始】
<story>一起确认了下一步。</story>
<option1>继续</option1><time1>15</time1>
<option2>观察</option2><time2>15</time2>
<option3>聊天</option3><time3>15</time3>
<option4>离开</option4><time4>15</time4>
<relationship_update>{"花海咲季":5,"月村手毬":{"好感度":-2},"不存在的偶像":10}</relationship_update>
【初星正文结束】`;

  const update = sandbox.extractFreeModeRelationshipUpdate(reply);
  assert.equal(update["月村手毬"].好感度, -2);
  const applied = sandbox.applyFreeModeRelationshipUpdate(update);
  assert.equal(applied["花海咲季"].好感度, 100);
  assert.equal(applied["花海咲季"].delta, 5);
  assert.equal(applied["月村手毬"].好感度, 0);
  assert.equal(applied["月村手毬"].delta, -2);
  assert.equal(sandbox.state.freeMode.relationships["花海咲季"].更新日, 2);
  assert.equal(sandbox.state.freeMode.relationships["不存在的偶像"], undefined);
  const legacyUpdate = sandbox.extractFreeModeRelationshipUpdate(`【好感度更新开始】{"花海咲季":1}【好感度更新结束】`);
  assert.equal(legacyUpdate["花海咲季"], 1);
});
test("free mode relationship updates support idols and npc relationships", () => {
  const sandbox = {
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    canonicalIdolName: (value) => String(value || "").trim(),
    idols: {
      "花海咲季": {},
      "月村手毬": {}
    },
    residentNpcProfiles: {
      "亚纱里老师": { publicLabel: "制作人科指导教师" }
    },
    state: {
      day: 1,
      freeMode: {
        postLiveDay: 3,
        relationships: { "花海咲季": { 好感度: 20, 更新日: 1 } },
        npcRelationships: { "亚纱里老师": { 好感度: 8, 更新日: 1 } }
      }
    }
  };
  vm.runInNewContext(`
${readFunction("stripAiThinkingBlocks")}
${readFunction("clampFreeModeRelationshipScore")}
${readFunction("normalizeFreeModeRelationshipEntry")}
${readFunction("ensureFreeModeRelationships")}
${readFunction("getFreeModeRelationship")}
${readFunction("canonicalNpcName")}
${readFunction("ensureFreeModeNpcRelationships")}
${readFunction("getFreeModeNpcRelationship")}
${readFunction("extractFreeModeRelationshipUpdate")}
${readFunction("parseFreeModeRelationshipDelta")}
${readFunction("applyFreeModeRelationshipUpdate")}
`, sandbox);
  const reply = `<relationship_update>{"idols":{"花海咲季":4},"npcs":{"亚纱里老师":3}}</relationship_update>`;
  const applied = sandbox.applyFreeModeRelationshipUpdate(sandbox.extractFreeModeRelationshipUpdate(reply));
  assert.equal(applied.idols["花海咲季"].好感度, 24);
  assert.equal(applied.npcs["亚纱里老师"].好感度, 11);
  assert.equal(sandbox.state.freeMode.relationships["花海咲季"].更新日, 3);
  assert.equal(sandbox.state.freeMode.npcRelationships["亚纱里老师"].更新日, 3);
});

test("affinity overlay exposes secondary relationships and relationship network tabs", () => {
  assert.match(html, /id="affinityTabSecondary"/);
  assert.match(html, /id="affinityTabNetwork"/);
  assert.match(html, /id="affinitySecondaryList"/);
  assert.match(html, /id="affinityNetworkList"/);
  assert.match(source, /function buildSecondaryRelationshipRows\(/);
  assert.match(source, /function buildRelationshipNetworkRows\(/);
  assert.match(readFunction("renderAffinityOverlay"), /renderAffinitySecondaryPanel\(\)/);
  assert.match(readFunction("renderAffinityOverlay"), /renderAffinityNetworkPanel\(\)/);
});
test("world map image switches by free mode clock", () => {
  const sandbox = {
    FREE_MODE_DAY_START_MINUTES: 8 * 60,
    FREE_MODE_MAP_DUSK_START_MINUTES: 17 * 60,
    FREE_MODE_MAP_NIGHT_START_MINUTES: 20 * 60,
    WORLD_MAP_IMAGE_DAY: "./assets/MAP/Gakuen.png",
    WORLD_MAP_IMAGE_DUSK: "./assets/MAP/Gakuen_Dawn.png",
    WORLD_MAP_IMAGE_NIGHT: "./assets/MAP/Gakuen_Night.png",
    state: { freeMode: { clockMinutes: 8 * 60 } }
  };
  vm.runInNewContext(`
${readFunction("getWorldMapTimePhase")}
${readFunction("getWorldMapImageForClock")}
`, sandbox);

  assert.equal(sandbox.getWorldMapTimePhase(10 * 60), "day");
  assert.equal(sandbox.getWorldMapImageForClock(10 * 60), "./assets/MAP/Gakuen.png");
  assert.equal(sandbox.getWorldMapTimePhase(18 * 60), "dusk");
  assert.equal(sandbox.getWorldMapImageForClock(18 * 60), "./assets/MAP/Gakuen_Dawn.png");
  assert.equal(sandbox.getWorldMapTimePhase(21 * 60), "night");
  assert.equal(sandbox.getWorldMapImageForClock(21 * 60), "./assets/MAP/Gakuen_Night.png");
});

test("world map layout editor supports drag save and export", () => {
  assert.match(html, /id="worldMapLayoutEditor"/);
  assert.match(html, /id="worldMapLayoutEditBtn"/);
  assert.match(readFunction("exportWorldMapLayout"), /world-map-layout\.json/);
  assert.match(readFunction("bindWorldMapHotspotInteractions"), /worldMapLayoutState\.editorActive/);
  assert.match(source, /devOpenMapLayoutEditorBtn/);
});
