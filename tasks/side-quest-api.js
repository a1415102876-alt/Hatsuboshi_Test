(function (global) {
  "use strict";

  const SIDE_QUEST_TAGS = ["stamina", "syngup", "diet", "stage", "general"];
  const DAILY_BLOCK_RE = /【初星支线开始】([\s\S]*?)【初星支线结束】/i;
  const TIER_BLOCK_RE = /【初星档位开始】([\s\S]*?)【初星档位结束】/i;

  function buildSideQuestDailyPrompt(state, dayKey) {
    const idol = state?.idol || "担当偶像";
    const dayLabel = `Live后第 ${dayKey} 天`;
    return `[初星育成系统 · 次 API · 今日偶像工作生成]

你是初星学园沙盒模式的任务编排器。为制作人担当生成今日 3 条「偶像工作」支线摘要（非主线剧情）。

担当偶像：${idol}
当前日期：${dayLabel}
范围：仅沙盒模式日常委托，学园内外均可，语气写实、可执行。

要求：
- 共 3 条，每条包含 title（8～18 字）、desc（20～60 字情境）、tag（见下列）
- tag 只能从以下取值：stamina（体能）、syngup（歌唱）、diet（饮食）、stage（舞台）、general（综合）
- 三条 tag 尽量不同；不要重复同一活动类型
- 不要写金钱、Vo/Da/Vi 等具体数值；奖励由前端结算
- 不要写选项或剧情正文，只写委托标题与情境

输出格式（严格遵守）：
【初星支线开始】
{"quests":[{"title":"标题","desc":"描述","tag":"stamina"},{"title":"...","desc":"...","tag":"syngup"},{"title":"...","desc":"...","tag":"diet"}]}
【初星支线结束】`;
  }

  function buildSideQuestTierPrompt(state, slot) {
    const idol = state?.idol || "担当偶像";
    const title = String(slot?.title || "今日工作");
    const desc = String(slot?.desc || "");
    const tag = String(slot?.tag || "general");
    return `[初星育成系统 · 次 API · 工作表现档位文案]

担当偶像：${idol}
今日工作：${title}
工作说明：${desc}
工作类型 tag：${tag}

请为制作人自选结算档位生成各一句简短回味文案（第一人称或旁白均可，12～28 字）。
四档含义：
- fail：失败，场面难堪但有安慰奖
- pass_low：勉强过关
- pass：标准完成
- perfect：超常发挥

不要写具体数值或「+10 信赖」等系统用语。

输出格式（严格遵守）：
【初星档位开始】
{"fail":"...","pass_low":"...","pass":"...","perfect":"..."}
【初星档位结束】`;
  }

  function normalizeTag(raw) {
    const tag = String(raw || "").trim().toLowerCase();
    return SIDE_QUEST_TAGS.includes(tag) ? tag : "general";
  }

  function parseJsonObject(text) {
    const source = String(text || "").trim();
    if (!source) return null;
    try {
      return JSON.parse(source);
    } catch {
      const start = source.indexOf("{");
      const end = source.lastIndexOf("}");
      if (start < 0 || end <= start) return null;
      try {
        return JSON.parse(source.slice(start, end + 1));
      } catch {
        return null;
      }
    }
  }

  function parseSideQuestDailyResponse(text, dayKey, idol) {
    const source = String(text || "");
    const blockMatch = source.match(DAILY_BLOCK_RE);
    const payload = parseJsonObject(blockMatch ? blockMatch[1] : source);
    if (!payload || !Array.isArray(payload.quests)) return null;
    const quests = payload.quests
      .map((quest, index) => {
        const title = String(quest?.title || "").trim();
        const desc = String(quest?.desc || "").trim();
        if (!title || !desc) return null;
        return {
          slotIndex: index,
          poolId: `gen_${dayKey}_${index}_${hashSlug(title)}`,
          title: title.slice(0, 40),
          desc: desc.slice(0, 160),
          tag: normalizeTag(quest?.tag),
          status: "open",
          resultTier: null,
          source: "secondary"
        };
      })
      .filter(Boolean);
    if (quests.length !== 3) return null;
    return { quests, dayKey, idol: idol || "" };
  }

  function parseSideQuestTierResponse(text) {
    const source = String(text || "");
    const blockMatch = source.match(TIER_BLOCK_RE);
    const payload = parseJsonObject(blockMatch ? blockMatch[1] : source);
    if (!payload || typeof payload !== "object") return null;
    const hints = {
      fail: String(payload.fail || "").trim(),
      pass_low: String(payload.pass_low || "").trim(),
      pass: String(payload.pass || "").trim(),
      perfect: String(payload.perfect || "").trim()
    };
    if (!hints.fail || !hints.pass_low || !hints.pass || !hints.perfect) return null;
    return hints;
  }

  function hashSlug(text) {
    let h = 0;
    const source = String(text || "");
    for (let i = 0; i < source.length; i++) {
      h = (h * 31 + source.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(36).slice(0, 8);
  }

  function isSecondaryRequestId(requestId) {
    return String(requestId || "").startsWith("side-gen-");
  }

  function parseSecondaryRequestKind(requestId) {
    const parts = String(requestId || "").split("-");
    if (parts.length < 3 || parts[0] !== "side" || parts[1] !== "gen") return "";
    return parts[2] || "";
  }

  global.HatsuSideQuestApi = {
    SIDE_QUEST_TAGS,
    buildSideQuestDailyPrompt,
    buildSideQuestTierPrompt,
    parseSideQuestDailyResponse,
    parseSideQuestTierResponse,
    isSecondaryRequestId,
    parseSecondaryRequestKind
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
