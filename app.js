(function () {
  "use strict";

  const STORAGE_KEY = "hatsuProduceLocalState";
  const UI_VERSION = 4;
  const spChance = 35;
  const lessonEventChance = 45;
  const trainingEventChance = 55;

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const idols = {
    "藤田琴音": {
      tag: "翻身欲 / 夸奖燃料",
      theme: "#ff4f9a",
      core: "现实收益、被选择的不安、夸奖作为燃料、从不能相信自己到相信制作人。",
      styles: {
        lesson: "把课程换算成翻身机会、报酬、曝光和被选择的证明。她嘴上现实，心里怕自己又被证明没用。",
        training: "边吐槽边认真做。失败会先用假怒和可爱玩笑遮住羞耻，随后确认制作人是否还选择她。",
        outing: "外出会先计算时间成本；如果能带来新机会、实用情报或制作人的认真照顾，她会把它接受为值得的投资。",
        companion: "喜欢被夸，但认真夸奖会先怀疑再爆发式开心。她会用玩笑保护自己的脆弱。",
        rest: "休息不是偷懒，而是为了下一次被看见而保存燃料。她会嘴硬地说这是投资。"
      },
      samples: {
        lesson: "琴音把笔记本翻到新的一页，先在重点旁边画了两条线，又小声嘀咕这节课到底能不能变成以后接活动的机会。被点名试唱时，她的声音在高音前晃了一下，笑容立刻缩回去。你指出问题只是紧张时呼吸变浅，她先睁大眼确认你不是安慰，随后脸红着重新站好。“那我可就信了哦。等我唱到大家都来夸我可爱的时候，制作人要第一个鼓掌。”"
      }
    },
    "月村手毬": {
      tag: "冷面 / 手制羽翼",
      theme: "#26a9f4",
      core: "冷淡外壳、脆弱内心、讨厌旧日的自己、需要精确而严格的支持。",
      styles: {
        lesson: "表面冷淡，实际听得很细。课堂内容会被她转化成对自己的苛责。",
        training: "容易过度努力，不喜欢被温柔制止，更能接受精确指导。",
        outing: "外出必须被解释成状态管理或视野拓展，否则她会觉得自己在松懈。",
        companion: "嘴硬、拒绝、命令，内心会担心自己是否惹人生气。",
        rest: "休息对她而言近似失败。需要把休息定义为控制状态的一部分，她才会勉强接受。"
      }
    },
    "花海咲季": {
      tag: "胜利 / 姐姐骄傲",
      theme: "#ff783f",
      core: "骄傲、好胜、害怕输给重要对手，但会把恐惧转回胜利计划。",
      styles: {
        lesson: "她会把课堂当成赢的工具。被指出弱点会先炸毛，然后要求具体胜利方案。",
        training: "高效率、强自尊，把身体管理也视为胜利条件。",
        outing: "外出也要服务于胜利：观察舞台、研究对手、恢复状态，最后转化成下一次赢的方案。",
        companion: "喜欢被夸，但会装作理所当然。真正准确的夸奖会让她害羞。",
        rest: "休息必须被包装成胜利准备。她会确认这不是退让，而是为了下一次压倒性表现。"
      }
    },
    "篠泽广": {
      tag: "困难 / 从零开始",
      theme: "#8c73ff",
      core: "理论极强、身体极弱、喜欢为了成功而陷入困难的过程。",
      styles: {
        lesson: "理论秒懂，但会平静指出偶像实践不受大脑完全支配。",
        training: "身体快到极限，语气仍然平静。越做不到，她越觉得有趣。",
        outing: "外出对她也是训练。短距离散步都可能耗尽体力，但她会因为看见新变量而高兴。",
        companion: "直白说开心、喜欢、谢谢。亲近后会请求每天在一起。",
        rest: "休息像一次实验暂停。她会认真记录身体恢复，甚至为自己还能坐起来而感到满足。"
      },
      samples: {
        training: "广站在镜子前，先用三秒理解了动作结构，又用十分钟证明身体完全不听理解指挥。第三次重心偏移时，你扶住她，她平静地说刚才差点结束人生。可她低头看着比刚才多移动的三厘米，眼睛微微亮起来。“呵呵，很有趣。因为完全做不到，所以前进一点点也很开心。制作人，请夸我。”"
      }
    },
    "十王星南": {
      tag: "一等星 / 数值之外",
      theme: "#20dfad",
      core: "学园顶点、被完美形象困住、重新学习数值以外的偶像魅力。",
      styles: {
        lesson: "像审视课程的顶点偶像。真正有效的是让她接触不擅长和笨拙。",
        training: "基本能力很高，重点不是数值提升，而是能否打破完美外壳。",
        outing: "外出适合让她接触普通学生、粉丝和不擅长的日常领域，学习数值之外的偶像魅力。",
        companion: "优雅从容，但被看穿、被夸可爱或暴露新手一面会动摇。",
        rest: "她会把休息安排得完美，真正的难点是允许自己不完美地放松。"
      }
    },
    "秦谷美铃": {
      tag: "慢步调 / 温柔野心",
      theme: "#ffca35",
      core: "慵懒、照顾欲、温柔独占欲、安静自负、按自己的步调走向顶点。",
      styles: {
        lesson: "看似偷懒、迟到或走神，却抓住课程本质。她用自己的步调学习。",
        training: "不是热血冲刺，而是关键时刻稍微加快脚步。",
        outing: "外出是她把制作人卷入自己步调的机会：茶、散步、照顾、共犯关系和柔软独占欲。",
        companion: "温柔照顾对方，也希望对方允许自己照顾。亲密会带出只属于我的制作人。",
        rest: "休息是她最自然的主场。她会把恢复体力变成一种温柔但不容拒绝的照顾。"
      },
      samples: {
        lesson: "美铃比上课铃晚了十分钟推门进来，手里还捧着一杯茶。她说路上的阳光太舒服，所以稍微绕了远路。你以为她没听，她却托着脸轻声说出老师刚讲的核心：不是追着观众的视线跑，而是让他们觉得看着自己很安心。练习结束后，她笑着说只是稍微加快了一下脚步。",
        outing: "美铃用天气很好这个理由把你带出了训练楼。茶水、点心和最适合晒太阳的长椅都像早就被她安排好，话题不知何时从散步变成了你也该休息。她闭着眼说，能理解她步调的制作人很珍贵，所以她也想照顾你。"
      }
    }
  };

  const idolPresets = {
    "藤田琴音": [90, 90, 120, 8, 29.5, 25.5, 1030, 1510, 1580, 1730, 2210, 2280],
    "月村手毬": [120, 100, 80, 27, 22.5, 11.5, 1580, 1370, 970, 2280, 2080, 1580],
    "花海咲季": [100, 100, 105, 16.5, 16.5, 20.5, 1280, 1280, 1360, 1930, 1930, 2030],
    "秦谷美铃": [95, 125, 140, 27, 13, 20, 1480, 1080, 1390, 2180, 1680, 2050],
    "篠泽广": [70, 55, 120, 22, 8, 26, 1180, 820, 1450, 1880, 1420, 2150],
    "十王星南": [160, 160, 160, 12, 12, 12, 1600, 1600, 1600, 2300, 2300, 2300]
  };

  const exactPresetIdols = new Set(["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃"]);
  const interactionCharacters = ["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃", "篠泽广", "十王星南", "花海佑芽", "仓本千奈", "紫云清夏", "葛城莉波", "有村麻央", "姬崎莉波"];
  const eventScenes = ["训练室临时合练", "走廊偶遇", "课后复盘", "小舞台试演", "学生会临时检查", "茶道室短暂停留", "器材室帮忙", "操场边观察练习"];
  const eventMoods = ["对方主动指出了一个意外盲点", "对方被这次训练状态吸引过来", "双方因为节奏不合产生轻微摩擦", "对方的一句话让训练方向突然清晰", "一次小失误变成了临时合作", "对方用完全不同的方式理解了这次训练"];

  const baseState = {
    uiVersion: UI_VERSION,
    idol: null,
    day: 1,
    round: 1,
    liveReady: false,
    stamina: 100,
    stress: 0,
    trust: 0,
    Vo: 90,
    Da: 86,
    Vi: 92,
    growth: { Vo: 8, Da: 29.5, Vi: 25.5 },
    threshold: { Vo: 1030, Da: 1510, Vi: 1580 },
    cap: { Vo: 1730, Da: 2210, Vi: 2280 },
    sp: { Vo: false, Da: true, Vi: false },
    log: [],
    boundCharacter: null,
    lastStory: "请选择行动",
    lastPrompt: "",
    lastDebug: "尚未结算行动。"
  };

  const statLabels = { Vo: "Vocal", Da: "Dance", Vi: "Visual", stamina: "体力", stress: "压力", trust: "信赖" };
  const statShort = { Vo: "Vo.", Da: "Da.", Vi: "Vi." };
  const statIcons = { Vo: "mic", Da: "dance", Vi: "visual" };
  const statColors = { Vo: "#ff4f9a", Da: "#26a9f4", Vi: "#ffca35" };
  const actionIcons = { lesson: "book", training: "dance", rest: "rest", outing: "map", companion: "chat" };
  const promptPanels = { prompt: "tabPrompt", log: "tabLog", debug: "tabDebug" };
  let activePromptTab = "prompt";
  let activeModal = null;
  let activeModalTab = null;
  let state = loadState();

  if (state.uiVersion !== UI_VERSION || (state.idol && !idols[state.idol])) {
    state = clone(baseState);
    saveState();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...clone(baseState), ...JSON.parse(saved) } : clone(baseState);
    } catch {
      return clone(baseState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function sample(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function rollInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function icon(name) {
    return `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  }

  function getPhase() {
    if (!state.idol) return "未选择担当";
    if (state.liveReady) return "First Live 待考核";
    if (state.day <= 6) return "First Live 前期";
    if (state.day <= 12) return "First Live 中期";
    if (state.day <= 17) return "First Live 后期";
    return "First Live 当日";
  }

  function daysLeft() {
    return Math.max(0, 19 - state.day);
  }

  function presetFor(idolName) {
    const preset = idolPresets[idolName] || idolPresets["藤田琴音"];
    return {
      Vo: preset[0],
      Da: preset[1],
      Vi: preset[2],
      growth: { Vo: preset[3], Da: preset[4], Vi: preset[5] },
      threshold: { Vo: preset[6], Da: preset[7], Vi: preset[8] },
      cap: { Vo: preset[9], Da: preset[10], Vi: preset[11] },
      exact: exactPresetIdols.has(idolName)
    };
  }

  function applyIdolPreset(idolName, resetProgress = false) {
    const preset = presetFor(idolName);
    state.idol = idolName;
    state.uiVersion = UI_VERSION;
    state.Vo = preset.Vo;
    state.Da = preset.Da;
    state.Vi = preset.Vi;
    state.growth = preset.growth;
    state.threshold = preset.threshold;
    state.cap = preset.cap;
    if (resetProgress) {
      state.day = 1;
      state.round = 1;
      state.stamina = 100;
      state.stress = 0;
      state.trust = 0;
      state.liveReady = false;
      state.log = [];
      state.lastStory = `${idolName}的育成档案已经建立。`;
      state.lastDebug = "已建立新的育成档案。";
    }
    rollSpCandidates();
  }

  function rollSpCandidates() {
    state.sp = {
      Vo: Math.random() * 100 < spChance,
      Da: Math.random() * 100 < spChance,
      Vi: Math.random() * 100 < spChance
    };
  }

  function rollActionEvent(action) {
    const chance = action === "training" ? trainingEventChance : lessonEventChance;
    if (!["lesson", "training"].includes(action) || Math.random() * 100 >= chance) return null;
    const character = sample(interactionCharacters.filter((name) => name !== state.idol));
    const rewardAttribute = sample(["Vo", "Da", "Vi", "trust"]);
    const reward = rewardAttribute === "trust" ? { trust: rollInclusive(1, 5) } : { [rewardAttribute]: 10 };
    return { character, scene: sample(eventScenes), mood: sample(eventMoods), reward };
  }

  function formatDelta(delta) {
    return Object.entries(delta)
      .filter(([, value]) => value)
      .map(([key, value]) => `${statLabels[key] || key} ${value > 0 ? "+" : ""}${value}`)
      .join("，");
  }

  function formatRandomEvent(event) {
    return `随机互动：${event.scene}，${event.character}登场，${event.mood}，额外奖励 ${formatDelta(event.reward)}`;
  }

  function actionLabel(action, attribute) {
    const names = { lesson: "上课", training: "训练", rest: "休息", outing: "外出", companion: "交流" };
    const sp = action === "training" && attribute && state.sp?.[attribute] ? "SP" : "";
    return attribute ? `${attribute}${sp}${names[action]}` : names[action];
  }

  function roundLabel() {
    return state.round === 4 ? "每日额外轮次" : `第 ${state.round || 1} / 3 轮行动`;
  }

  function isExtraRound() {
    return state.round === 4;
  }

  function isActionAvailable(action) {
    return isExtraRound()
      ? new Set(["outing", "companion"]).has(action)
      : new Set(["lesson", "training", "rest"]).has(action);
  }

  function advanceRound() {
    if (state.round < 3) {
      state.round += 1;
      return;
    }
    if (state.round === 3) {
      state.round = 4;
      return;
    }
    state.round = 1;
    if (state.day >= 18) {
      state.liveReady = true;
      return;
    }
    state.day += 1;
  }

  function settleAction(action, attribute) {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择本次育成的担当。", "warn");
      return;
    }
    if (state.liveReady) {
      state.lastStory = "18 天育成已经结束。接下来应进入 First Live 综合考核。";
      state.lastPrompt = buildLivePrompt();
      saveState();
      render();
      openNotebook("prompt");
      showToast("育成已完成", "请复制提示词进入考核叙事。", "info");
      return;
    }
    if (!isActionAvailable(action)) {
      showToast("当前轮次不可用", "前三轮只开放上课、训练和休息；额外轮次只开放外出和交流。", "warn");
      return;
    }

    const delta = {};
    let randomEvent = null;

    if (action === "lesson") {
      delta[attribute] = 65;
      delta.stamina = -10;
      delta.stress = 1;
      randomEvent = rollActionEvent(action);
    } else if (action === "training") {
      const spActive = Boolean(state.sp?.[attribute]);
      ["Vo", "Da", "Vi"].forEach((item) => {
        const baseGain = item === attribute
          ? Math.round(28 + Number(state.growth?.[item] || 0) * 0.8)
          : Math.round(Number(state.growth?.[item] || 0) * 0.15);
        delta[item] = spActive ? Math.round(baseGain * 1.5) : baseGain;
      });
      delta.stamina = -12;
      delta.stress = spActive ? 3 : 2;
      randomEvent = rollActionEvent(action);
    } else if (action === "rest") {
      delta.stamina = 30;
    } else if (action === "outing") {
      delta.stamina = 38;
      delta.stress = -5;
      delta.trust = 5;
    } else if (action === "companion") {
      delta.stamina = 18;
      delta.stress = -2;
      delta.trust = 15;
    }

    if (randomEvent) {
      Object.entries(randomEvent.reward).forEach(([key, value]) => {
        delta[key] = (delta[key] || 0) + value;
      });
    }

    Object.entries(delta).forEach(([key, value]) => {
      const max = ["Vo", "Da", "Vi"].includes(key) ? Number(state.cap?.[key] || 999) : 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });

    const actionName = actionLabel(action, attribute);
    const resultText = formatDelta(delta);
    const eventText = randomEvent ? formatRandomEvent(randomEvent) : "";
    const resultSummary = eventText ? `${resultText}，${eventText}` : resultText;
    const story = buildPendingStory(actionName, resultSummary, randomEvent);
    const prompt = buildPrompt(action, attribute, resultText, randomEvent);

    state.lastStory = story;
    state.lastPrompt = prompt;
    state.lastDebug = buildDebugText(actionName, delta, randomEvent);
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);

    advanceRound();
    rollSpCandidates();
    saveState();
    render();
    openEventOverlay(actionName, resultSummary, story);
    showToast("行动结算完成", `${actionName}已经写入 P 手账。`, randomEvent ? "gold" : "info");
  }

  function buildDebugText(actionName, delta, randomEvent) {
    const spList = Object.entries(state.sp || {}).filter(([, active]) => active).map(([key]) => `${key}训练`).join("、") || "无";
    return [
      `行动：${actionName}`,
      `结算：${formatDelta(delta) || "无数值变化"}`,
      randomEvent ? `随机事件：${formatRandomEvent(randomEvent)}` : "随机事件：未触发",
      `下一轮 SP 候选：${spList}`,
      "规则：前端只负责结算与提示词构造，LLM 负责把已结算结果改写成角色叙事。"
    ].join("\n");
  }

  function buildPendingStory(actionName, resultSummary, randomEvent = null) {
    const eventLine = randomEvent
      ? `\n\n本次触发随机互动：${randomEvent.scene}，${randomEvent.character}${randomEvent.mood}。`
      : "";
    return `${actionName}已经由前端完成结算。\n\n${resultSummary}\n\n剧情正文等待角色卡 AI 回复生成。点击“让 AI 生成后续”后，可以先编辑提示词，再发送给当前 SillyTavern 对话。${eventLine}`;
  }

  function buildPrompt(action, attribute, resultText, randomEvent = null) {
    const profile = idols[state.idol];
    const actionName = actionLabel(action, attribute);
    const actionStyle = profile.styles[action] || profile.styles.rest;
    const eventPrompt = randomEvent ? `

本次行动触发随机互动事件：
- 互动角色：${randomEvent.character}
- 事件场景：${randomEvent.scene}
- 事件方向：${randomEvent.mood}
- 额外奖励：${formatDelta(randomEvent.reward)}

叙事要求：
- 在正常${actionName}叙事基础上，自然加入这名角色与当前担当的互动。
- 互动必须服务于本次行动结果，不要写成完全独立的支线。
- 先承认随机结果已经由前端结算，再用角色关系和性格解释为什么产生这个额外增益。
- 不要额外增加未列出的数值。` : "";

    return `[初星育成系统：行动已经由前端结算]

担当偶像：${state.idol}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：${actionName}
行动结果：${resultText}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
成长率：Vo ${state.growth?.Vo} / Da ${state.growth?.Da} / Vi ${state.growth?.Vi}
本轮SP候选：${Object.entries(state.sp || {}).filter(([, active]) => active).map(([key]) => `${key}训练`).join("、") || "无"}

角色核心：
${profile.core}

本行动叙事规则：
${actionStyle}${eventPrompt}

请写一段 400 字以内的短叙事。
不要重新计算数值。
不要改变系统结果。
不要让角色偏离上述主线矛盾。`;
  }

  function buildOpeningPrompt() {
    const profile = idols[state.idol];
    return `[初星育成系统：新育成档案已建立]

担当偶像：${state.idol}
当前阶段：${getPhase()}
初始状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
角色核心：${profile.core}

请写一段 300 字以内的开局短叙事，让制作人与担当偶像确认 First Live 前的育成目标。`;
  }

  function buildLivePrompt() {
    return `[初星育成系统：18天育成已经结束]

担当偶像：${state.idol}
最终状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
成长率：Vo ${state.growth?.Vo} / Da ${state.growth?.Da} / Vi ${state.growth?.Vi}

请准备进入 First Live 综合考核剧情。
不要重新计算数值。
先写考核前的短暂候场与制作人确认状态，等待玩家决定是否开始考核。`;
  }

  function render() {
    renderIdols();
    renderShellMode();
    if (!state.idol) return;
    renderHud();
    renderStatMeters();
    renderActionButtons();
    renderNotebook();
  }

  function renderShellMode() {
    const hasIdol = Boolean(state.idol);
    document.getElementById("selectionStage").classList.toggle("is-hidden", hasIdol);
    document.getElementById("gameStage").classList.toggle("is-hidden", !hasIdol);
  }

  function renderIdols() {
    const list = document.getElementById("idolList");
    list.innerHTML = "";
    Object.entries(idols).forEach(([name, profile]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.id = `idol-${name}`;
      button.className = "idol-card";
      button.innerHTML = `<strong>${name}</strong><span>${profile.tag}</span>`;
      button.addEventListener("click", () => {
        applyIdolPreset(name, true);
        state.lastPrompt = buildOpeningPrompt();
        saveState();
        render();
        showToast("担当已确认", `${name}进入 First Live 育成路线。`, "gold");
      });
      list.appendChild(button);
    });
  }

  function renderHud() {
    const profile = idols[state.idol];
    document.documentElement.style.setProperty("--idol-theme", profile.theme);
    document.getElementById("daysLeftValue").textContent = daysLeft();
    document.getElementById("staminaValue").textContent = state.stamina;
    document.getElementById("staminaFill").style.width = `${clamp(state.stamina, 0, 100)}%`;
    document.getElementById("trustValue").textContent = state.trust;
    document.getElementById("stressValue").textContent = state.stress;
    document.getElementById("targetValue").textContent = Math.round((state.threshold.Vo + state.threshold.Da + state.threshold.Vi) / 4.2);
    document.getElementById("currentIdolLabel").textContent = "当前担当";
    document.getElementById("idolName").textContent = state.idol;
    document.getElementById("phaseBadge").textContent = getPhase();
    document.getElementById("advisorText").textContent = shortAdvisor(state.lastStory || "请选择行动");
  }

  function renderStatMeters() {
    const container = document.getElementById("statMeters");
    container.innerHTML = "";
    ["Vo", "Da", "Vi"].forEach((key) => {
      const pct = clamp((state[key] / (state.cap[key] || 1)) * 100, 0, 100);
      const card = document.createElement("article");
      card.className = "meter-card";
      card.id = `meter-${key}`;
      card.style.setProperty("--meter-color", statColors[key]);
      card.style.setProperty("--meter-pct", String(pct));
      card.innerHTML = `
        <div class="meter-arc" data-rank="${rankFor(pct)}"></div>
        <div class="meter-value">${icon(statIcons[key])}<b>${state[key]}</b><small>/${state.cap[key]}</small></div>
        <div class="meter-growth">${state.growth[key]}%</div>
      `;
      container.appendChild(card);
    });
  }

  function rankFor(pct) {
    if (pct >= 78) return "SS";
    if (pct >= 62) return "S+";
    if (pct >= 46) return "S";
    if (pct >= 30) return "A";
    return "B";
  }

  function createActionButton(label, action, attribute, color, costText) {
    const button = document.createElement("button");
    button.className = "action-button";
    button.id = `action-${action}${attribute ? `-${attribute}` : ""}`;
    button.dataset.action = action;
    if (attribute) button.dataset.attribute = attribute;
    button.type = "button";
    button.style.setProperty("--action-color", color);
    const spBadge = action === "training" && state.sp?.[attribute] ? `<i class="sp-badge">SP</i>` : "";
    const costBadge = costText ? `<i class="cost-badge">${costText}</i>` : "";
    button.innerHTML = `${spBadge}${costBadge}${icon(actionIcons[action] || "book")}<span>${label}</span>`;
    return button;
  }

  function renderActionButtons() {
    const container = document.getElementById("actionButtons");
    container.innerHTML = "";
    const actions = isExtraRound()
      ? [
          ["外出", "outing", null, "#20dfad", "体力+38"],
          ["交流", "companion", null, "#ff4f9a", "信赖+15"]
        ]
      : [
          ["Vo公开课", "lesson", "Vo", statColors.Vo, "体力-10"],
          ["Da公开课", "lesson", "Da", statColors.Da, "体力-10"],
          ["Vi公开课", "lesson", "Vi", statColors.Vi, "体力-10"],
          ["Vo训练", "training", "Vo", statColors.Vo, "体力-12"],
          ["Da训练", "training", "Da", statColors.Da, "体力-12"],
          ["Vi训练", "training", "Vi", statColors.Vi, "体力-12"],
          ["休息", "rest", null, "#20dfad", "体力+30"]
        ];
    actions.forEach(([label, action, attribute, color, cost]) => {
      container.appendChild(createActionButton(label, action, attribute, color, cost));
    });
    document.getElementById("actionModeLabel").textContent = isExtraRound()
      ? "请选择额外行动"
      : "请选择行动";
    renderActionHighlights();
  }

  function renderActionHighlights() {
    document.querySelectorAll(".action-button").forEach((button) => {
      button.disabled = Boolean(state.liveReady) || !isActionAvailable(button.dataset.action);
    });
  }

  function shortAdvisor(text) {
    const compact = String(text).replace(/\s+/g, " ").trim();
    return compact.length > 56 ? `${compact.slice(0, 56)}...` : compact;
  }

  function renderNotebook() {
    document.getElementById("promptText").value = state.lastPrompt || "";
    document.getElementById("debugPanel").textContent = state.lastDebug || "尚未结算行动。";
    const list = document.getElementById("logList");
    list.innerHTML = "";
    if (!state.log.length) {
      const empty = document.createElement("div");
      empty.className = "log-item";
      empty.innerHTML = "<strong>暂无育成日志</strong><p>行动后会保存最近 24 条结算、叙事和随机事件摘要。</p>";
      list.appendChild(empty);
    } else {
      state.log.forEach((item, index) => {
        const node = document.createElement("div");
        node.className = "log-item";
        node.id = `log-entry-${index + 1}`;
        node.innerHTML = `<strong>Day ${item.day}-${item.round} / ${item.phase} / ${item.action}</strong><p>${item.result}</p>`;
        list.appendChild(node);
      });
    }
    switchPromptTab(activePromptTab);
  }

  function switchPromptTab(tab) {
    activePromptTab = promptPanels[tab] ? tab : "prompt";
    document.getElementById("drawerTitle").textContent = activePromptTab === "prompt" ? "提示词工作台" : activePromptTab === "log" ? "育成日志" : "结算明细";
    document.querySelectorAll(".tab-button").forEach((button) => {
      const active = button.dataset.tab === activePromptTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    Object.entries(promptPanels).forEach(([key, id]) => {
      document.getElementById(id).classList.toggle("active", key === activePromptTab);
    });
  }

  function openNotebook(tab = "prompt") {
    switchPromptTab(tab);
    document.getElementById("notebookDrawer").hidden = false;
  }

  function isSillyTavernHost() {
    return window.parent && window.parent !== window && new URLSearchParams(window.location.search).get("host") === "sillytavern";
  }

  function requestHostCharacter() {
    if (!isSillyTavernHost()) return;
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "getCharacter"
    }, window.location.origin);
  }

  function requestHostPromptSend(promptText) {
    if (!isSillyTavernHost()) return false;
    const prompt = promptText || state.lastPrompt || document.getElementById("promptText").value || "";
    if (!prompt.trim()) return false;
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "sendPrompt",
      prompt
    }, window.location.origin);
    showToast("已交给酒馆", "提示词已发送到 SillyTavern 当前对话。", "gold");
    return true;
  }

  function applyHostCharacter(character) {
    if (!character?.name) return;
    state.boundCharacter = {
      name: String(character.name),
      avatar: character.avatar ? String(character.avatar) : ""
    };
    if (!state.idol && idols[character.name]) {
      applyIdolPreset(character.name, true);
      state.lastPrompt = buildOpeningPrompt();
    }
    saveState();
    render();
    showToast("已绑定角色卡", `当前角色卡：${state.boundCharacter.name}`, "info");
  }

  function closeNotebook() {
    document.getElementById("notebookDrawer").hidden = true;
  }

  function openAiPromptOverlay() {
    document.getElementById("aiPromptPhaseBadge").textContent = getPhase();
    document.getElementById("aiPromptTextarea").value = state.lastPrompt || "";
    document.getElementById("aiPromptOverlay").hidden = false;
    document.getElementById("aiPromptTextarea").focus();
  }

  function closeAiPromptOverlay() {
    document.getElementById("aiPromptOverlay").hidden = true;
  }

  function submitAiPrompt() {
    const prompt = document.getElementById("aiPromptTextarea").value.trim();
    if (!prompt) {
      showToast("提示词为空", "请先输入要发送给 AI 的后续剧情提示词。", "warn");
      return;
    }
    state.lastPrompt = prompt;
    saveState();
    renderNotebook();
    closeAiPromptOverlay();
    if (requestHostPromptSend(prompt)) return;
    openNotebook("prompt");
    showToast("提示词已准备", "当前不在 SillyTavern iframe 中，请从 P 手账复制。", "warn");
  }

  function openEventOverlay(title, result, story) {
    document.getElementById("eventTitle").textContent = title || "行动事件";
    document.getElementById("eventPhaseBadge").textContent = getPhase();
    document.getElementById("eventResult").textContent = result || "本次行动已经完成结算。";
    document.getElementById("eventStory").textContent = story || state.lastStory || "本次行动已经完成。";
    document.getElementById("eventOverlay").hidden = false;
    document.getElementById("eventConfirmBtn").focus();
  }

  function closeEventOverlay() {
    document.getElementById("eventOverlay").hidden = true;
  }

  function applyAiReply(text) {
    const reply = String(text || "").trim();
    if (!reply) return;
    state.lastStory = reply;
    if (state.log[0]) {
      state.log[0].aiReply = reply;
    }
    saveState();
    render();
    openEventOverlay("AI 后续剧情", "已收到 SillyTavern 角色回复", reply);
  }

  function showToast(title, message, tone = "info") {
    const stack = document.getElementById("toastStack");
    const toast = document.createElement("article");
    toast.className = `toast toast-${tone}`;
    toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    stack.appendChild(toast);
    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-8px) scale(0.98)";
      window.setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  const modalRegistry = {
    world: {
      kicker: "Worldbook",
      title: "世界书结构",
      tabs: {
        "当前模块": [
          ["育成结算", "保存日程、轮次、基础数值、SP 候选与随机互动结果。LLM 不重新计算，只解释这些结果。"],
          ["角色主线", "每名偶像拥有核心矛盾与行动叙事规则，让同一个按钮在不同担当身上产生不同味道。"],
          ["互动事件池", "上课与训练有概率触发角色库互动，先抽角色、场景、方向和奖励，再生成叙事。"]
        ],
        "角色库": interactionCharacters.map((name) => [name, name === state.idol ? "当前担当，随机事件会避开自身。" : "可作为训练或上课时的互动对象。"]),
        "提示结构": [
          ["前端结算头", "明确行动已经由前端结算，防止模型擅自改数值。"],
          ["角色核心", "把偶像主线矛盾注入每次短叙事。"],
          ["随机事件段", "仅在触发时追加，要求互动服务于本次行动结果。"]
        ]
      }
    },
    system: {
      kicker: "Produce Engine",
      title: "系统控制台",
      tabs: {
        "模型路由": [
          ["主叙事模型", "负责短叙事、好感度阶段剧情、First Live 候场与考核文本。"],
          ["前端裁定", "负责行动合法性、数值变化、随机事件与存档，不把裁定权交给模型。"],
          ["复制出口", "P 手账中的提示词可直接送入酒馆或其他 LLM 对话。"]
        ],
        "存档": [
          ["本地存储", `存档键：${STORAGE_KEY}`],
          ["版本", `UI Version ${UI_VERSION}，结构变化时会重建档案。`],
          ["当前担当", state.idol || "未选择"]
        ],
        "规则": [
          ["日程", "18 天育成，每天 3 次普通行动与 1 次额外行动。"],
          ["普通行动", "上课、训练、休息。休息回复 30 体力。"],
          ["额外行动", "外出回复较多体力并增加信赖，交流增加更多信赖并回复少量体力。"]
        ]
      }
    },
    schedule: {
      kicker: "Calendar",
      title: "日程详情",
      tabs: {
        "日程": [
          ["第 1-6 天", "First Live 前期，建立基础数值与担当关系。"],
          ["第 7-12 天", "First Live 中期，随机互动与信赖剧情开始成为主要变量。"],
          ["第 13-18 天", "First Live 后期，数值门槛与角色矛盾共同推向考核。"]
        ],
        "轮次": [
          ["普通轮次", "每天第 1、2、3 轮，只显示上课、训练和休息。"],
          ["额外轮次", "每天第 4 轮，只显示外出和交流。"],
          ["防误操作", "体力危险时仍可选择休息，避免路线被单次失误锁死。"]
        ],
        "考核": [
          ["First Live", "第 18 天后进入综合考核提示词。"],
          ["信赖阈值", "后续可接入角色专属好感度阶段剧情。"],
          ["数值门槛", "Vo、Da、Vi 的门槛与上限来自角色成长率预设。"]
        ]
      }
    },
    narrative: {
      kicker: "Narrative Control",
      title: "叙事控制",
      tabs: {
        "叙事规则": [
          ["结算优先", "短叙事必须承认前端结果，不允许重算数值或追加未列出奖励。"],
          ["角色差异", "同样的上课或训练，要根据担当偶像的核心矛盾改变表达方式。"],
          ["制作人位置", "制作人提供观察、判断和支持，不替角色解决所有矛盾。"]
        ],
        "输出标签": [
          ["短叙事", "默认 400 字以内，适合直接插入酒馆对话。"],
          ["阶段剧情", "可由信赖阈值触发，写角色专属突破与矛盾解决。"],
          ["考核剧情", "18 天后由最终状态进入 First Live。"]
        ],
        "边界": [
          ["禁止改数值", "模型不得改变当前状态、行动结果或随机奖励。"],
          ["禁止跑题", "互动角色必须服务于本次行动，不写成独立支线。"],
          ["禁止模板化", "每次叙事要结合担当性格、阶段和行动结果。"]
        ]
      }
    },
    event: {
      kicker: "Random Event Pool",
      title: "随机事件池",
      tabs: {
        "触发率": [
          ["上课", `${lessonEventChance}% 概率触发随机互动。`],
          ["训练", `${trainingEventChance}% 概率触发随机互动。`],
          ["SP训练", "训练按钮仍会按本轮 SP 候选获得倍率加成，随机互动独立抽取。"]
        ],
        "奖励": [
          ["属性奖励", "随机追加 Vo、Da、Vi 之一 +10。"],
          ["信赖奖励", "随机追加信赖 +1 到 +5。"],
          ["叙事解释", "奖励先由前端确定，再要求 LLM 用角色关系解释结果。"]
        ],
        "场景池": eventScenes.map((scene) => [scene, sample(eventMoods)])
      }
    }
  };

  function openModal(type) {
    activeModal = modalRegistry[type] ? type : "system";
    activeModalTab = Object.keys(modalRegistry[activeModal].tabs)[0];
    renderModal();
    document.getElementById("appModal").hidden = false;
    document.getElementById("closeModal").focus();
  }

  function closeModal() {
    document.getElementById("appModal").hidden = true;
    activeModal = null;
    activeModalTab = null;
  }

  function renderModal() {
    const modal = modalRegistry[activeModal];
    document.getElementById("modalKicker").textContent = modal.kicker;
    document.getElementById("modalTitle").textContent = modal.title;
    const tabs = document.getElementById("modalTabs");
    tabs.innerHTML = "";
    Object.keys(modal.tabs).forEach((tab, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.id = `modal-tab-${activeModal}-${index + 1}`;
      button.className = `modal-tab${tab === activeModalTab ? " active" : ""}`;
      button.textContent = tab;
      button.addEventListener("click", () => {
        activeModalTab = tab;
        renderModal();
      });
      tabs.appendChild(button);
    });
    const body = document.getElementById("modalBody");
    body.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "modal-grid";
    modal.tabs[activeModalTab].forEach(([title, text], index) => {
      const card = document.createElement("article");
      card.className = "modal-card";
      card.id = `modal-card-${activeModal}-${index + 1}`;
      card.innerHTML = `<strong>${title}</strong><p>${text}</p>`;
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  document.getElementById("actionButtons").addEventListener("click", (event) => {
    const button = event.target.closest(".action-button");
    if (!button || button.disabled) return;
    settleAction(button.dataset.action, button.dataset.attribute);
  });

  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
  });

  document.querySelectorAll("[data-panel]").forEach((button) => {
    button.addEventListener("click", () => openNotebook(button.dataset.panel || "prompt"));
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchPromptTab(button.dataset.tab));
  });

  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("appModal").addEventListener("click", (event) => {
    if (event.target.id === "appModal") closeModal();
  });
  document.getElementById("closeNotebook").addEventListener("click", closeNotebook);
  document.getElementById("notebookDrawer").addEventListener("click", (event) => {
    if (event.target.id === "notebookDrawer") closeNotebook();
  });
  document.getElementById("eventConfirmBtn").addEventListener("click", closeEventOverlay);
  document.getElementById("eventAiBtn").addEventListener("click", () => {
    closeEventOverlay();
    openAiPromptOverlay();
  });
  document.getElementById("eventOverlay").addEventListener("click", (event) => {
    if (event.target.id === "eventOverlay") closeEventOverlay();
  });
  document.getElementById("aiPromptCancelBtn").addEventListener("click", closeAiPromptOverlay);
  document.getElementById("aiPromptSendBtn").addEventListener("click", submitAiPrompt);
  document.getElementById("aiPromptOverlay").addEventListener("click", (event) => {
    if (event.target.id === "aiPromptOverlay") closeAiPromptOverlay();
  });
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    const data = event.data || {};
    if (data.source !== "hatsuboshi-produce-host") return;
    if (data.type === "character") applyHostCharacter(data.character);
    if (data.type === "aiReply") applyAiReply(data.text);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeEventOverlay();
      closeAiPromptOverlay();
      if (activeModal) closeModal();
      closeNotebook();
    }
  });

  document.getElementById("dockResetRun").addEventListener("click", () => {
    if (!state.idol) return;
    const idolName = state.idol;
    state = clone(baseState);
    applyIdolPreset(idolName, true);
    state.lastPrompt = buildOpeningPrompt();
    saveState();
    render();
    showToast("育成已重置", "保留当前担当并重建第 1 天档案。", "warn");
  });

  document.getElementById("dockChangeIdol").addEventListener("click", () => {
    state = clone(baseState);
    localStorage.removeItem(STORAGE_KEY);
    render();
    showToast("已返回担当选择", "请选择新的担当偶像。", "info");
  });

  document.getElementById("dockCopyPrompt").addEventListener("click", copyPrompt);

  async function copyPrompt() {
    const text = state.lastPrompt || document.getElementById("promptText").value;
    if (!text) {
      showToast("暂无提示词", "先选择担当或完成一次行动。", "warn");
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.getElementById("promptText");
        field.value = text;
        field.focus();
        field.select();
        document.execCommand("copy");
      }
      showToast("提示词已复制", "可以直接粘贴到 LLM 对话中。", "gold");
    } catch {
      openNotebook("prompt");
      showToast("请手动复制", "浏览器限制剪贴板时，可在 P 手账中手动复制。", "warn");
    }
  }

  if (!state.round) state.round = 1;
  if (state.round > 4) state.round = 4;
  if ("fatigue" in state) delete state.fatigue;
  if (typeof state.liveReady !== "boolean") state.liveReady = false;
  if (state.idol && (!state.growth || !state.cap || !state.sp)) applyIdolPreset(state.idol);
  saveState();
  render();
  requestHostCharacter();
})();
