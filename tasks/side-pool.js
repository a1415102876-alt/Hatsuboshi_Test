(function (global) {
  "use strict";

  const SIDE_TIER_IDS = ["fail", "pass_low", "pass", "perfect"];

  const SIDE_TIER_META = {
    fail: { label: "失败", hint: "场面失控，仍有最低安慰奖" },
    pass_low: { label: "勉强", hint: "勉强过关，表现平平" },
    pass: { label: "完成", hint: "标准完成委托" },
    perfect: { label: "完美", hint: "超常发挥" }
  };

  const SIDE_TIER_REWARDS = {
    fail: { money: 80, Vo: 0, Da: 0, Vi: 0, stamina: 2, stress: 1, trust: 1 },
    pass_low: { money: 150, Vo: 1, Da: 1, Vi: 1, stamina: 4, stress: 0, trust: 3 },
    pass: { money: 280, Vo: 2, Da: 2, Vi: 2, stamina: 6, stress: -2, trust: 5 },
    perfect: { money: 450, Vo: 4, Da: 4, Vi: 4, stamina: 10, stress: -3, trust: 8 }
  };

  const SIDE_TAG_LABELS = {
    stamina: "体能",
    syngup: "歌唱",
    diet: "饮食",
    stage: "舞台",
    general: "综合"
  };

  const SIDE_QUEST_POOL = [
    {
      id: "short_video",
      title: "学园宣传短视频",
      desc: "和担当一起拍摄一条用于学园官方账号的短视频素材。",
      tag: "stage"
    },
    {
      id: "voice_check",
      title: "发声检查陪同",
      desc: "陪同担当完成课前发声与气息练习。",
      tag: "syngup"
    },
    {
      id: "cafeteria_poster",
      title: "食堂健康餐宣传",
      desc: "协助食堂窗口摆放健康餐说明，并试吃打卡。",
      tag: "diet"
    },
    {
      id: "gym_assist",
      title: "体能辅助训练",
      desc: "在体育馆陪担当完成一组耐力与核心训练。",
      tag: "stamina"
    },
    {
      id: "dance_mirror",
      title: "镜前动作修正",
      desc: "在舞蹈教室帮担当纠正舞台走位与亮相动作。",
      tag: "stage"
    },
    {
      id: "radio_corner",
      title: "广播室花絮录制",
      desc: "参与学园广播室短访谈与花絮录音。",
      tag: "syngup"
    },
    {
      id: "nutrition_talk",
      title: "营养指导面谈",
      desc: "与学校营养师一起复盘担当近几日的饮食结构。",
      tag: "diet"
    },
    {
      id: "early_run",
      title: "清晨慢跑陪练",
      desc: "清晨陪担当在校园跑道完成有氧慢跑。",
      tag: "stamina"
    },
    {
      id: "class_support",
      title: "课堂展示协助",
      desc: "在偶像学科课堂协助准备展示用的分镜与台词。",
      tag: "syngup"
    },
    {
      id: "stage_cleanup",
      title: "小舞台设备整理",
      desc: "帮忙整理室外小舞台的麦克与音响连线。",
      tag: "stage"
    },
    {
      id: "balance_board",
      title: "平衡板体能课",
      desc: "在部室栋完成平衡与下肢力量组合训练。",
      tag: "stamina"
    },
    {
      id: "salad_prep",
      title: "健康便当搭配",
      desc: "在学食学习低油便当搭配并记录一份菜单。",
      tag: "diet"
    }
  ];

  function hashString(str) {
    let h = 2166136261;
    const source = String(str || "");
    for (let i = 0; i < source.length; i++) {
      h ^= source.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seededSortKey(seed, index) {
    const x = Math.sin(seed + index * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }

  function pickDailyQuests(dayKey, idol, count = 3) {
    const seed = hashString(`${dayKey}|${idol || ""}`);
    const pool = SIDE_QUEST_POOL.filter((quest) => !quest.idol || quest.idol === idol);
    const ranked = pool
      .map((quest, index) => ({
        quest,
        sort: seededSortKey(seed, index)
      }))
      .sort((a, b) => a.sort - b.sort);
    return ranked.slice(0, count).map(({ quest }, slotIndex) => ({
      slotIndex,
      poolId: quest.id,
      title: quest.title,
      desc: quest.desc,
      tag: quest.tag,
      status: "open",
      resultTier: null
    }));
  }

  function getTagLabel(tag) {
    return SIDE_TAG_LABELS[tag] || tag || "综合";
  }

  function formatTierRewardSummary(tier) {
    const reward = SIDE_TIER_REWARDS[tier];
    if (!reward) return "";
    const parts = [`${reward.money} 初星币`];
    if (reward.Vo) parts.push(`Vo+${reward.Vo}`);
    if (reward.Da) parts.push(`Da+${reward.Da}`);
    if (reward.Vi) parts.push(`Vi+${reward.Vi}`);
    if (reward.stamina) parts.push(`体力+${reward.stamina}`);
    if (reward.stress < 0) parts.push(`压力${reward.stress}`);
    if (reward.trust) parts.push(`信赖+${reward.trust}`);
    return parts.join(" · ");
  }

  global.HatsuSideQuestPool = {
    SIDE_TIER_IDS,
    SIDE_TIER_META,
    SIDE_TIER_REWARDS,
    SIDE_TAG_LABELS,
    SIDE_QUEST_POOL,
    pickDailyQuests,
    getTagLabel,
    formatTierRewardSummary
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
