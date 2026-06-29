(function (global) {
  "use strict";

  const MAIN_QUEST_META = {
    scout_temari: {
      title: "物色手毬",
      conflict: "在学园中接触月村手毬并邀请她成为担当"
    },
    temari_main_01: {
      title: "舞台唱完",
      conflict: "体力锻炼到能在舞台上唱完"
    },
    temari_main_02: {
      title: "和美铃和好",
      conflict: "调整与秦谷美铃的关系"
    },
    temari_main_03: {
      title: "饮食与体态",
      conflict: "调整饮食与舞台体态"
    }
  };

  const TEMARI_PERSONAL_IDS = ["temari_main_01", "temari_main_02", "temari_main_03"];

  const THRESHOLDS = {
    temari_main_01: { staminaMin: 85, voGain: 40 },
    temari_main_03: { viGain: 35, stressMax: 40, healthyMealsMin: 2 }
  };

  const MAP_MAIN_QUEST_LOCATIONS = {
    temari_main_02_misaki: ["dining_hall", "club_room", "idol_classroom", "gymnasium", "playground"]
  };

  const MAP_CHOICE_HOOKS = [
    {
      id: "outstage_full_song",
      questId: "temari_main_01",
      locations: ["outstage", "auditorium"],
      patterns: [/唱完|试唱|完整(?:一)?首|唱通|整首|唱满|full/i],
      apply: "outstage_full_song",
      notice: "已记录野外舞台完整试唱"
    },
    {
      id: "diet_plan_active",
      questId: "temari_main_03",
      locations: ["dining_hall", "producer_classroom", "special_education"],
      patterns: [/饮食方案|营养(?:师|指导|餐|计划)|膳食计划|体重管理|菜单(?:计划|调整)|低卡|卡路里|体脂/i],
      apply: "diet_plan_active",
      notice: "已制定饮食方案"
    },
    {
      id: "healthy_meal",
      questId: "temari_main_03",
      locations: ["dining_hall", "student_store"],
      patterns: [/健康餐|沙拉|低油|蒸煮|清淡|营养餐|蔬菜为主|便当.*健康|轻食/i],
      apply: "healthy_meal",
      notice: "已记录一次健康餐"
    }
  ];

  const QUEST_FLAG_IDS = ["diet_plan_active", "healthy_meal", "outstage_full_song"];

  const QUEST_FLAG_NOTICE = {
    diet_plan_active: "已制定饮食方案",
    healthy_meal: "已记录一次健康餐",
    outstage_full_song: "已记录野外舞台完整试唱"
  };

  const CAMPUS_MAX_PER_DAY = 3;
  const SIDE_SLOTS_PER_DAY = 3;
  const SIDE_HEALTHY_MEAL_TIERS = ["pass", "perfect"];

  const QUEST_COMPLETE_TAG_RE = /【初星任务完成】\s*([a-z0-9_]+)/gi;
  const QUEST_COMPLETE_XML_RE = /<quest_complete\s+id=["']([a-z0-9_]+)["']\s*\/?>/gi;
  const QUEST_FLAG_TAG_RE = /【初星任务标记】\s*([a-z0-9_]+)/gi;
  const QUEST_FLAG_XML_RE = /<quest_flag\s+id=["']([a-z0-9_]+)["']\s*\/?>/gi;

  function matchesMapChoicePatterns(text, patterns) {
    const source = String(text || "");
    return patterns.some((pattern) => pattern.test(source));
  }

  function defaultMainQuest(id, status = "locked") {
    const flags = {};
    if (id === "temari_main_01") {
      flags.outstage_full_song = false;
    }
    if (id === "temari_main_03") {
      flags.diet_plan_active = false;
      flags.healthy_meal_count = 0;
    }
    return { id, status, step: 0, flags };
  }

  function defaultSecondaryApi() {
    return {
      enabled: false,
      baseUrl: "",
      model: "",
      temperature: 0.7,
      maxTokens: 1200
    };
  }

  function defaultSideState() {
    return {
      dayKey: "",
      slots: [],
      genStatus: "idle",
      source: "",
      pendingRequestId: ""
    };
  }

  function defaultTasksState() {
    return {
      wallet: { money: 0 },
      baseline: null,
      secondaryApi: defaultSecondaryApi(),
      main: {
        scout_temari: defaultMainQuest("scout_temari", "locked"),
        temari_main_01: defaultMainQuest("temari_main_01"),
        temari_main_02: defaultMainQuest("temari_main_02"),
        temari_main_03: defaultMainQuest("temari_main_03")
      },
      side: defaultSideState(),
      campus: { dayKey: "", usedCount: 0, maxPerDay: CAMPUS_MAX_PER_DAY, log: [] }
    };
  }

  function isSandboxTasksActive(state) {
    return state?.launchMode === "sandbox";
  }

  function ensureMainQuest(state, id, status = "locked") {
    if (!state.tasks.main[id]) {
      state.tasks.main[id] = defaultMainQuest(id, status);
    }
    const quest = state.tasks.main[id];
    if (!quest.id) quest.id = id;
    if (!quest.flags || typeof quest.flags !== "object") {
      quest.flags = defaultMainQuest(id).flags;
    }
    if (id === "temari_main_01" && quest.flags.outstage_full_song === undefined) {
      quest.flags.outstage_full_song = false;
    }
    if (id === "temari_main_03") {
      if (quest.flags.diet_plan_active === undefined) quest.flags.diet_plan_active = false;
      if (!Number.isFinite(Number(quest.flags.healthy_meal_count))) {
        quest.flags.healthy_meal_count = 0;
      }
    }
    const allowed = ["locked", "active", "completed"];
    if (!allowed.includes(quest.status)) quest.status = status;
    if (!Number.isFinite(Number(quest.step))) quest.step = 0;
    return quest;
  }

  function ensureTasksShape(state) {
    if (!state || typeof state !== "object") return state;
    if (!state.tasks || typeof state.tasks !== "object") {
      state.tasks = defaultTasksState();
    }
    state.tasks.wallet = {
      money: Number.isFinite(Number(state.tasks.wallet?.money)) ? Number(state.tasks.wallet.money) : 0
    };
    if (!state.tasks.main || typeof state.tasks.main !== "object") {
      state.tasks.main = defaultTasksState().main;
    }
    Object.keys(MAIN_QUEST_META).forEach((id) => ensureMainQuest(state, id));
    if (!state.tasks.side || typeof state.tasks.side !== "object") {
      state.tasks.side = defaultSideState();
    }
    if (!state.tasks.secondaryApi || typeof state.tasks.secondaryApi !== "object") {
      state.tasks.secondaryApi = defaultSecondaryApi();
    }
    state.tasks.secondaryApi = {
      ...defaultSecondaryApi(),
      ...state.tasks.secondaryApi,
      enabled: Boolean(state.tasks.secondaryApi.enabled),
      baseUrl: String(state.tasks.secondaryApi.baseUrl || "").trim(),
      model: String(state.tasks.secondaryApi.model || "").trim(),
      temperature: Number.isFinite(Number(state.tasks.secondaryApi.temperature))
        ? Number(state.tasks.secondaryApi.temperature)
        : 0.7,
      maxTokens: Number.isFinite(Number(state.tasks.secondaryApi.maxTokens))
        ? Number(state.tasks.secondaryApi.maxTokens)
        : 1200
    };
    if (!Array.isArray(state.tasks.side.slots)) state.tasks.side.slots = [];
    if (!state.tasks.side.genStatus) state.tasks.side.genStatus = "idle";
    if (!state.tasks.side.source) state.tasks.side.source = "";
    if (!state.tasks.side.pendingRequestId) state.tasks.side.pendingRequestId = "";
    if (!state.tasks.campus || typeof state.tasks.campus !== "object") {
      state.tasks.campus = { dayKey: "", usedCount: 0, maxPerDay: CAMPUS_MAX_PER_DAY, log: [] };
    }
    state.tasks.campus.maxPerDay = CAMPUS_MAX_PER_DAY;
    state.tasks.campus.usedCount = Math.max(0, Number(state.tasks.campus.usedCount) || 0);
    if (!Array.isArray(state.tasks.campus.log)) state.tasks.campus.log = [];
    if (isSandboxTasksActive(state)) {
      syncCampusDay(state);
      syncSideQuestDay(state);
    }
    if (!state.tasks.baseline && state.tasks.main.scout_temari?.status === "completed") {
      state.tasks.baseline = {
        Vo: Number(state.Vo) || 120,
        Vi: Number(state.Vi) || 80,
        stamina: Number(state.stamina) || 100
      };
    }
    return state;
  }

  function getCampusDayKey(state) {
    return String(state?.freeMode?.postLiveDay || 1);
  }

  function syncCampusDay(state) {
    if (!isSandboxTasksActive(state)) return;
    if (!state.tasks?.campus) return;
    const dayKey = getCampusDayKey(state);
    if (state.tasks.campus.dayKey !== dayKey) {
      state.tasks.campus.dayKey = dayKey;
      state.tasks.campus.usedCount = 0;
      state.tasks.campus.log = [];
    }
  }

  function getCampusRemaining(state) {
    if (!isSandboxTasksActive(state)) return CAMPUS_MAX_PER_DAY;
    if (!state.tasks?.campus) return CAMPUS_MAX_PER_DAY;
    syncCampusDay(state);
    const max = state.tasks.campus.maxPerDay || CAMPUS_MAX_PER_DAY;
    return Math.max(0, max - state.tasks.campus.usedCount);
  }

  function isCampusDailyLimitReached(state) {
    return getCampusRemaining(state) <= 0;
  }

  function canRecordCampusAction(state) {
    if (!isSandboxTasksActive(state)) return true;
    syncCampusDay(state);
    return !isCampusDailyLimitReached(state);
  }

  function recordCampusAction(state, info = {}) {
    if (!isSandboxTasksActive(state)) return { ok: true, skipped: true };
    if (!state.tasks?.campus) return { ok: false, reason: "missing" };
    syncCampusDay(state);
    if (isCampusDailyLimitReached(state)) {
      return { ok: false, reason: "limit" };
    }
    state.tasks.campus.usedCount += 1;
    state.tasks.campus.log.push({
      kind: info.kind || "",
      locationId: info.locationId || "",
      minutes: Number(info.minutes) || 60,
      clock: info.clock || "",
      at: Date.now()
    });
    return {
      ok: true,
      usedCount: state.tasks.campus.usedCount,
      remaining: getCampusRemaining(state)
    };
  }

  function applyQuestFlag(state, flagId) {
    if (flagId === "diet_plan_active") return markDietPlanActive(state);
    if (flagId === "healthy_meal") return recordHealthyMeal(state, 1);
    if (flagId === "outstage_full_song") return markOutstageFullSong(state);
    return false;
  }

  function parseQuestFlagsFromText(text) {
    const ids = new Set();
    const source = String(text || "");
    let match;
    QUEST_FLAG_TAG_RE.lastIndex = 0;
    while ((match = QUEST_FLAG_TAG_RE.exec(source)) !== null) {
      if (match[1]) ids.add(match[1]);
    }
    QUEST_FLAG_XML_RE.lastIndex = 0;
    while ((match = QUEST_FLAG_XML_RE.exec(source)) !== null) {
      if (match[1]) ids.add(match[1]);
    }
    return [...ids];
  }

  function applyQuestFlagsFromReply(state, text) {
    if (!isSandboxTasksActive(state)) return { notices: [], completions: [] };
    const ids = parseQuestFlagsFromText(text).filter((id) => QUEST_FLAG_IDS.includes(id));
    const notices = [];
    const completions = [];
    ids.forEach((id) => {
      const quest = state.tasks.main.temari_main_01;
      const quest03 = state.tasks.main.temari_main_03;
      let changed = false;
      if (id === "outstage_full_song" && quest?.status === "active" && !quest.flags.outstage_full_song) {
        changed = true;
      }
      if (id === "diet_plan_active" && quest03?.status === "active" && !quest03.flags.diet_plan_active) {
        changed = true;
      }
      if (id === "healthy_meal" && quest03?.status === "active") {
        changed = true;
      }
      if (!changed) return;
      if (applyQuestFlag(state, id)) {
        if (id === "outstage_full_song") completions.push("temari_main_01");
        if (id === "diet_plan_active" || id === "healthy_meal") {
          const done = evaluateTemariMain03(state);
          if (done) completions.push("temari_main_03");
        }
      }
      if (QUEST_FLAG_NOTICE[id]) notices.push(QUEST_FLAG_NOTICE[id]);
    });
    syncMainQuestSteps(state);
    return { notices, completions: [...new Set(completions)] };
  }

  function applyMapChoiceHook(state, hook, choiceText) {
    const quest = state.tasks.main[hook.questId];
    if (!quest || quest.status !== "active") return null;
    if (!hook.locations.includes(String(choiceText.locationId || ""))) return null;
    if (!matchesMapChoicePatterns(choiceText.text, hook.patterns)) return null;

    if (hook.apply === "outstage_full_song" && quest.flags.outstage_full_song) return null;
    if (hook.apply === "diet_plan_active" && quest.flags.diet_plan_active) return null;

    const result = { notices: [], completions: [] };
    if (hook.apply === "outstage_full_song") {
      quest.flags.outstage_full_song = true;
      if (evaluateTemariMain01(state)) result.completions.push("temari_main_01");
      result.notices.push(hook.notice);
      return result;
    }
    if (hook.apply === "diet_plan_active") {
      quest.flags.diet_plan_active = true;
      if (evaluateTemariMain03(state)) result.completions.push("temari_main_03");
      result.notices.push(hook.notice);
      return result;
    }
    if (hook.apply === "healthy_meal") {
      quest.flags.healthy_meal_count = Math.max(0, Number(quest.flags.healthy_meal_count) || 0) + 1;
      if (evaluateTemariMain03(state)) result.completions.push("temari_main_03");
      result.notices.push(hook.notice);
      return result;
    }
    return null;
  }

  function processSandboxMainQuestMapChoice(state, locationId, choiceText) {
    if (!isSandboxTasksActive(state)) return { notices: [], completions: [] };
    ensureTasksShape(state);
    const notices = [];
    const completions = [];
    const payload = { locationId: String(locationId || ""), text: String(choiceText || "") };
    MAP_CHOICE_HOOKS.forEach((hook) => {
      const result = applyMapChoiceHook(state, hook, payload);
      if (!result) return;
      result.notices.forEach((notice) => notices.push(notice));
      result.completions.forEach((id) => completions.push(id));
    });
    syncMainQuestSteps(state);
    return { notices: [...new Set(notices)], completions: [...new Set(completions)] };
  }

  function syncMainQuestSteps(state) {
    if (!isSandboxTasksActive(state)) return;
    ensureTasksShape(state);
    const baseline = state.tasks.baseline || { Vo: 120, Vi: 80, stamina: 100 };
    const quest01 = state.tasks.main.temari_main_01;
    if (quest01?.status === "active") {
      const t = THRESHOLDS.temari_main_01;
      if (quest01.flags.outstage_full_song) quest01.step = 3;
      else if (Number(state.stamina) >= t.staminaMin && Number(state.Vo) >= baseline.Vo + t.voGain) quest01.step = 2;
      else if (Number(state.stamina) >= t.staminaMin || Number(state.Vo) >= baseline.Vo + Math.floor(t.voGain / 2)) quest01.step = 1;
      else quest01.step = 0;
    }
    const quest02 = state.tasks.main.temari_main_02;
    if (quest02?.status === "active") {
      quest02.step = 1;
    }
    const quest03 = state.tasks.main.temari_main_03;
    if (quest03?.status === "active") {
      const t = THRESHOLDS.temari_main_03;
      if (quest03.flags.diet_plan_active && Number(quest03.flags.healthy_meal_count) >= t.healthyMealsMin) quest03.step = 3;
      else if (quest03.flags.diet_plan_active) quest03.step = 2;
      else if (Number(quest03.flags.healthy_meal_count) > 0) quest03.step = 1;
      else quest03.step = 0;
    }
  }

  function buildSandboxMainQuestPromptBlock(state, locationId) {
    if (!isSandboxTasksActive(state) || !state.sandbox?.inviteComplete) return "";
    ensureTasksShape(state);
    syncMainQuestSteps(state);
    const blocks = [];
    const quest01 = state.tasks.main.temari_main_01;
    if (quest01?.status === "active") {
      blocks.push(
        `【沙盒主线 · 舞台唱完】
手毬的迫切矛盾：她担心自己体力撑不住，无法在舞台上唱完整首歌（参考 GKMS 第5/6/9话：SyngUp 训练后的疲惫、登台前「说不定会失败」的不安）。
当前进度：${progressHint(state, "temari_main_01")}
叙事要求：若在野外舞台或讲堂引导完整试唱/排练，可写她咬牙唱完一曲后的虚脱与决心；不要在数值未达标前写矛盾已彻底解决。
若剧情中完成完整试唱，可在正文末尾输出【初星任务标记】outstage_full_song。`
      );
    }
    const quest02 = state.tasks.main.temari_main_02;
    if (quest02?.status === "active") {
      const misakiLine = MAP_MAIN_QUEST_LOCATIONS.temari_main_02_misaki.includes(locationId)
        ? "本地点可能出现秦谷美铃。可写她与手毬关于 SyngUp 解散的别扭同场、冷战或互相刺探。"
        : "若场景涉及秦谷美铃，可写 SyngUp 旧事与心结，但不要提前宣布和好完成。";
      blocks.push(
        `【沙盒主线 · 与美铃和好】
手毬与秦谷美铃因 SyngUp 解散心结未解（参考 GKMS 第8～10话）。
${misakiLine}
和好完成时请在正文末尾输出【初星任务完成】temari_main_02（或 <quest_complete id="temari_main_02" />），不要由旁白直接宣布任务完成。`
      );
    }
    const quest03 = state.tasks.main.temari_main_03;
    if (quest03?.status === "active") {
      const dietLine = locationId === "dining_hall"
        ? "本场景在食堂：可写营养沟通、健康餐选择或体重管理；制作人可带她制定饮食方案。"
        : "若在食堂或 P 科教室，可写饮食与体态相关的讨论。";
      blocks.push(
        `【沙盒主线 · 饮食与体态】
手毬在意饮食控制与舞台体态（参考 GKMS 第1～3话）。
${dietLine}
当前进度：${progressHint(state, "temari_main_03")}
制定饮食方案后可输出【初星任务标记】diet_plan_active；选择健康餐后可输出【初星任务标记】healthy_meal。`
      );
    }
    return blocks.join("\n\n");
  }

  function activateScoutQuest(state) {
    if (!isSandboxTasksActive(state)) return;
    ensureTasksShape(state);
    const quest = state.tasks.main.scout_temari;
    if (quest.status === "completed") return;
    quest.status = "active";
  }

  function captureBaseline(state) {
    state.tasks.baseline = {
      Vo: Number(state.Vo) || 0,
      Vi: Number(state.Vi) || 0,
      stamina: Number(state.stamina) || 0
    };
  }

  function activateTemariPersonalQuests(state) {
    if (!isSandboxTasksActive(state)) return;
    ensureTasksShape(state);
    if (!state.tasks.baseline) captureBaseline(state);
    TEMARI_PERSONAL_IDS.forEach((id) => {
      const quest = state.tasks.main[id];
      if (quest.status === "locked") quest.status = "active";
    });
  }

  function completeMainQuest(state, id) {
    if (!isSandboxTasksActive(state)) return false;
    ensureTasksShape(state);
    const quest = state.tasks.main[id];
    if (!quest || quest.status !== "active") return false;
    quest.status = "completed";
    return true;
  }

  function onScoutInviteComplete(state) {
    if (!isSandboxTasksActive(state)) return [];
    ensureTasksShape(state);
    const completed = [];
    const scout = state.tasks.main.scout_temari;
    if (scout.status === "locked") scout.status = "active";
    if (completeMainQuest(state, "scout_temari")) completed.push("scout_temari");
    activateTemariPersonalQuests(state);
    return completed;
  }

  function syncSandboxQuestProgress(state) {
    if (!isSandboxTasksActive(state)) return [];
    ensureTasksShape(state);
    const completed = [];
    if (state.sandbox?.inviteComplete && state.tasks.main.scout_temari.status !== "completed") {
      completed.push(...onScoutInviteComplete(state));
    }
    if (state.sandbox?.openingComplete && !state.sandbox?.inviteComplete) {
      activateScoutQuest(state);
    }
    completed.push(...evaluateNumericMainQuests(state));
    syncMainQuestSteps(state);
    return completed;
  }

  function parseQuestCompletionsFromText(text) {
    const ids = new Set();
    const source = String(text || "");
    let match;
    QUEST_COMPLETE_TAG_RE.lastIndex = 0;
    while ((match = QUEST_COMPLETE_TAG_RE.exec(source)) !== null) {
      if (match[1]) ids.add(match[1]);
    }
    QUEST_COMPLETE_XML_RE.lastIndex = 0;
    while ((match = QUEST_COMPLETE_XML_RE.exec(source)) !== null) {
      if (match[1]) ids.add(match[1]);
    }
    return [...ids];
  }

  function applyQuestCompletionsFromReply(state, text) {
    if (!isSandboxTasksActive(state)) return [];
    const ids = parseQuestCompletionsFromText(text);
    const completed = [];
    ids.forEach((id) => {
      if (completeMainQuest(state, id)) completed.push(id);
    });
    return completed;
  }

  function evaluateTemariMain01(state) {
    const quest = state.tasks.main.temari_main_01;
    if (quest.status !== "active") return false;
    const baseline = state.tasks.baseline || { Vo: 120, Vi: 80, stamina: 100 };
    if (Number(state.stamina) < THRESHOLDS.temari_main_01.staminaMin) return false;
    if (Number(state.Vo) < baseline.Vo + THRESHOLDS.temari_main_01.voGain) return false;
    if (!quest.flags.outstage_full_song) return false;
    return completeMainQuest(state, "temari_main_01");
  }

  function evaluateTemariMain03(state) {
    const quest = state.tasks.main.temari_main_03;
    if (quest.status !== "active") return false;
    const baseline = state.tasks.baseline || { Vo: 120, Vi: 80, stamina: 100 };
    if (Number(state.Vi) < baseline.Vi + THRESHOLDS.temari_main_03.viGain) return false;
    if (Number(state.stress) > THRESHOLDS.temari_main_03.stressMax) return false;
    if (!quest.flags.diet_plan_active) return false;
    if (Number(quest.flags.healthy_meal_count) < THRESHOLDS.temari_main_03.healthyMealsMin) return false;
    return completeMainQuest(state, "temari_main_03");
  }

  function evaluateNumericMainQuests(state) {
    if (!isSandboxTasksActive(state)) return [];
    ensureTasksShape(state);
    const completed = [];
    if (evaluateTemariMain01(state)) completed.push("temari_main_01");
    if (evaluateTemariMain03(state)) completed.push("temari_main_03");
    syncMainQuestSteps(state);
    return completed;
  }

  function markOutstageFullSong(state) {
    if (!isSandboxTasksActive(state)) return false;
    ensureTasksShape(state);
    const quest = state.tasks.main.temari_main_01;
    if (quest.status !== "active") return false;
    quest.flags.outstage_full_song = true;
    return evaluateTemariMain01(state);
  }

  function markDietPlanActive(state) {
    if (!isSandboxTasksActive(state)) return false;
    ensureTasksShape(state);
    const quest = state.tasks.main.temari_main_03;
    if (quest.status !== "active") return false;
    quest.flags.diet_plan_active = true;
    return evaluateTemariMain03(state);
  }

  function clampStat(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getSideQuestPool() {
    return global.HatsuSideQuestPool || null;
  }

  function shouldUseSecondarySideGen(state) {
    if (!isSandboxTasksActive(state)) return false;
    if (!state.sandbox?.inviteComplete) return false;
    const api = state.tasks?.secondaryApi;
    if (!api?.enabled) return false;
    return Boolean(String(api.baseUrl || "").trim() && String(api.model || "").trim());
  }

  function buildLoadingSideSlots() {
    return Array.from({ length: SIDE_SLOTS_PER_DAY }, (_, slotIndex) => ({
      slotIndex,
      poolId: "",
      title: "生成中",
      desc: "次 API 正在生成本日偶像工作…",
      tag: "general",
      status: "open",
      resultTier: null,
      loading: true
    }));
  }

  const SIDE_QUEST_TAGS = ["stamina", "syngup", "diet", "stage", "general"];

  function applyGeneratedSideQuests(state, quests, source = "secondary") {
    if (!isSandboxTasksActive(state)) return false;
    ensureTasksShape(state);
    const dayKey = getCampusDayKey(state);
    if (!Array.isArray(quests) || quests.length !== SIDE_SLOTS_PER_DAY) return false;
    state.tasks.side.dayKey = dayKey;
    state.tasks.side.slots = quests.map((quest, index) => ({
      slotIndex: index,
      poolId: String(quest.poolId || `gen_${dayKey}_${index}`),
      title: String(quest.title || "").trim(),
      desc: String(quest.desc || "").trim(),
      tag: SIDE_QUEST_TAGS.includes(quest.tag) ? quest.tag : "general",
      status: "open",
      resultTier: null,
      source,
      tierHints: quest.tierHints || null,
      tierGenStatus: quest.tierHints ? "ready" : "idle"
    }));
    state.tasks.side.genStatus = "ready";
    state.tasks.side.source = source;
    state.tasks.side.pendingRequestId = "";
    return true;
  }

  function markSideQuestGenPending(state, requestId) {
    if (!state.tasks?.side) return;
    state.tasks.side.genStatus = "loading";
    state.tasks.side.pendingRequestId = String(requestId || "");
    state.tasks.side.slots = buildLoadingSideSlots();
    state.tasks.side.source = "";
  }

  function markSideQuestGenFailed(state) {
    if (!state.tasks?.side) return;
    state.tasks.side.genStatus = "failed";
    state.tasks.side.pendingRequestId = "";
  }

  function queueSideQuestRefresh(state) {
    if (!isSandboxTasksActive(state)) return "skip";
    const dayKey = getCampusDayKey(state);
    state.tasks.side.dayKey = dayKey;
    if (shouldUseSecondarySideGen(state)) {
      state.tasks.side.genStatus = "pending";
      state.tasks.side.slots = buildLoadingSideSlots();
      state.tasks.side.source = "";
      state.tasks.side.pendingRequestId = "";
      return "api";
    }
    refreshSideQuestSlots(state);
    state.tasks.side.genStatus = "ready";
    state.tasks.side.source = "static";
    state.tasks.side.pendingRequestId = "";
    return "static";
  }

  function refreshSideQuestSlots(state) {
    const pool = getSideQuestPool();
    if (!pool?.pickDailyQuests) return false;
    const dayKey = getCampusDayKey(state);
    state.tasks.side.dayKey = dayKey;
    state.tasks.side.slots = pool.pickDailyQuests(dayKey, state.idol, SIDE_SLOTS_PER_DAY).map((slot) => ({
      ...slot,
      source: "static",
      tierGenStatus: "idle",
      tierHints: null
    }));
    state.tasks.side.genStatus = "ready";
    state.tasks.side.source = "static";
    state.tasks.side.pendingRequestId = "";
    return true;
  }

  function syncSideQuestDay(state) {
    if (!isSandboxTasksActive(state)) return;
    if (!state.tasks?.side) return;
    const dayKey = getCampusDayKey(state);
    if (state.tasks.side.dayKey !== dayKey) {
      queueSideQuestRefresh(state);
      return;
    }
    if (!Array.isArray(state.tasks.side.slots) || state.tasks.side.slots.length !== SIDE_SLOTS_PER_DAY) {
      queueSideQuestRefresh(state);
    }
  }

  function getSideQuestGenStatus(state) {
    ensureTasksShape(state);
    return state.tasks.side.genStatus || "idle";
  }

  function applySideQuestTierHints(state, slotIndex, hints) {
    if (!state.tasks?.side?.slots?.[slotIndex]) return false;
    const slot = state.tasks.side.slots[slotIndex];
    slot.tierHints = hints;
    slot.tierGenStatus = "ready";
    slot.tierPendingRequestId = "";
    return true;
  }

  function markSideQuestTierGenPending(state, slotIndex, requestId) {
    const slot = state.tasks?.side?.slots?.[slotIndex];
    if (!slot) return false;
    slot.tierGenStatus = "loading";
    slot.tierPendingRequestId = String(requestId || "");
    return true;
  }

  function getSideQuestRemaining(state) {
    if (!isSandboxTasksActive(state)) return SIDE_SLOTS_PER_DAY;
    syncSideQuestDay(state);
    return state.tasks.side.slots.filter((slot) => slot?.status !== "done").length;
  }

  function applySideQuestReward(state, reward) {
    if (!reward || typeof reward !== "object") return;
    state.tasks.wallet.money = (Number(state.tasks.wallet.money) || 0) + (Number(reward.money) || 0);
    if (reward.Vo) state.Vo = Math.max(0, Number(state.Vo) + Number(reward.Vo));
    if (reward.Da) state.Da = Math.max(0, Number(state.Da) + Number(reward.Da));
    if (reward.Vi) state.Vi = Math.max(0, Number(state.Vi) + Number(reward.Vi));
    if (reward.stamina) state.stamina = clampStat(Number(state.stamina) + Number(reward.stamina), 0, 100);
    if (reward.stress) state.stress = clampStat(Number(state.stress) + Number(reward.stress), 0, 100);
    if (reward.trust) state.trust = Math.max(0, Number(state.trust) + Number(reward.trust));
  }

  function applySideQuestTier(state, slotIndex, tier) {
    if (!isSandboxTasksActive(state)) return { ok: false, reason: "not_sandbox" };
    const pool = getSideQuestPool();
    if (!pool?.SIDE_TIER_REWARDS?.[tier]) return { ok: false, reason: "invalid_tier" };
    ensureTasksShape(state);
    syncSideQuestDay(state);
    const index = Number(slotIndex);
    const slot = state.tasks.side.slots[index];
    if (!slot) return { ok: false, reason: "missing_slot" };
    if (slot.status === "done") return { ok: false, reason: "slot_done" };
    const reward = { ...pool.SIDE_TIER_REWARDS[tier] };
    applySideQuestReward(state, reward);
    slot.status = "done";
    slot.resultTier = tier;
    slot.completedAt = Date.now();
    let healthyMealRecorded = false;
    if (slot.tag === "diet" && SIDE_HEALTHY_MEAL_TIERS.includes(tier)) {
      healthyMealRecorded = Boolean(recordHealthyMeal(state, 1));
    }
    return {
      ok: true,
      slotIndex: index,
      tier,
      reward,
      slot: { ...slot },
      healthyMealRecorded
    };
  }

  function recordHealthyMeal(state, count = 1) {
    if (!isSandboxTasksActive(state)) return false;
    ensureTasksShape(state);
    const quest = state.tasks.main.temari_main_03;
    if (quest.status !== "active") return false;
    quest.flags.healthy_meal_count = Math.max(0, Number(quest.flags.healthy_meal_count) || 0) + count;
    evaluateTemariMain03(state);
    return true;
  }

  function progressHint(state, id) {
    const quest = state.tasks?.main?.[id];
    if (!quest || quest.status !== "active") return "";
    const baseline = state.tasks.baseline || { Vo: 120, Vi: 80, stamina: 100 };
    if (id === "temari_main_01") {
      return `参考 GKMS 5/6/9 话：SyngUp 训练后疲惫、登台前不安 · 体力 ${state.stamina}/85 · Vo ${state.Vo}/${baseline.Vo + THRESHOLDS.temari_main_01.voGain} · 野外试唱 ${quest.flags.outstage_full_song ? "已完成" : "未完成"}`;
    }
    if (id === "temari_main_02") {
      return "参考 GKMS 8～10 话：SyngUp 心结与和美铃的别扭 · 和好需 AI 输出【初星任务完成】temari_main_02";
    }
    if (id === "temari_main_03") {
      return `参考 GKMS 1～3 话：饮食与体态 · Vi ${state.Vi}/${baseline.Vi + THRESHOLDS.temari_main_03.viGain} · 压力 ≤${THRESHOLDS.temari_main_03.stressMax} · 饮食方案 ${quest.flags.diet_plan_active ? "已制定" : "未制定"} · 健康餐 ${quest.flags.healthy_meal_count}/${THRESHOLDS.temari_main_03.healthyMealsMin}`;
    }
    if (id === "scout_temari") {
      return "完成出发邀请剧情并进入学园地图";
    }
    return "";
  }

  function getTaskPanelSnapshot(state) {
    ensureTasksShape(state);
    const main = Object.keys(MAIN_QUEST_META).map((id) => ({
      id,
      title: MAIN_QUEST_META[id].title,
      conflict: MAIN_QUEST_META[id].conflict,
      status: state.tasks.main[id]?.status || "locked",
      step: Number(state.tasks.main[id]?.step) || 0,
      progressHint: progressHint(state, id)
    }));
    return {
      launchMode: state.launchMode,
      idol: state.idol,
      main,
      side: {
        dayKey: state.tasks.side.dayKey,
        slots: state.tasks.side.slots,
        remainingToday: getSideQuestRemaining(state),
        maxPerDay: SIDE_SLOTS_PER_DAY,
        genStatus: state.tasks.side.genStatus,
        source: state.tasks.side.source
      },
      secondaryApi: { ...state.tasks.secondaryApi },
      campus: {
        dayKey: state.tasks.campus.dayKey,
        usedCount: state.tasks.campus.usedCount,
        maxPerDay: state.tasks.campus.maxPerDay,
        remainingToday: getCampusRemaining(state)
      },
      wallet: { money: state.tasks.wallet.money },
      stats: {
        stamina: state.stamina,
        stress: state.stress,
        trust: state.trust,
        Vo: state.Vo,
        Da: state.Da,
        Vi: state.Vi
      }
    };
  }

  function getQuestCompleteToast(id) {
    const map = {
      scout_temari: "物色成功，手毬个人主线已解锁",
      temari_main_01: "主线完成：舞台唱完",
      temari_main_02: "主线完成：和美铃和好",
      temari_main_03: "主线完成：饮食与体态"
    };
    return map[id] || `任务完成：${MAIN_QUEST_META[id]?.title || id}`;
  }

  global.HatsuTasks = {
    MAIN_QUEST_META,
    TEMARI_PERSONAL_IDS,
    THRESHOLDS,
    CAMPUS_MAX_PER_DAY,
    SIDE_SLOTS_PER_DAY,
    SIDE_HEALTHY_MEAL_TIERS,
    MAP_CHOICE_HOOKS,
    QUEST_FLAG_IDS,
    defaultTasksState,
    ensureTasksShape,
    isSandboxTasksActive,
    getCampusDayKey,
    syncCampusDay,
    getCampusRemaining,
    isCampusDailyLimitReached,
    canRecordCampusAction,
    recordCampusAction,
    syncSideQuestDay,
    refreshSideQuestSlots,
    queueSideQuestRefresh,
    shouldUseSecondarySideGen,
    applyGeneratedSideQuests,
    markSideQuestGenPending,
    markSideQuestGenFailed,
    getSideQuestGenStatus,
    applySideQuestTierHints,
    markSideQuestTierGenPending,
    getSideQuestRemaining,
    applySideQuestTier,
    activateScoutQuest,
    onScoutInviteComplete,
    syncSandboxQuestProgress,
    parseQuestCompletionsFromText,
    parseQuestFlagsFromText,
    applyQuestCompletionsFromReply,
    applyQuestFlagsFromReply,
    processSandboxMainQuestMapChoice,
    buildSandboxMainQuestPromptBlock,
    syncMainQuestSteps,
    evaluateNumericMainQuests,
    markOutstageFullSong,
    markDietPlanActive,
    recordHealthyMeal,
    getTaskPanelSnapshot,
    getQuestCompleteToast
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
