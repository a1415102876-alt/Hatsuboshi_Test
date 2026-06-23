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
      tag: "皮卡丘 / 薯鸡",
      bio: "梦想成为「能赚钱的偶像」的贪心的女孩。把偶像视为逆转人生的手段。成绩不好，自我评价也不高，但对自己可爱的外表很有自信。不擅长应对不知为何总对自己有过高评价的学生会长星南。",
      theme: "#FAD356",
      background: "./assets/idols/fujita-kotone.jpeg",
      avatar: "./assets/avatars/fujita-kotone.png",
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
      tag: "杰尼龟 / 搞笑艺人",
      bio: "被称作初中部第一偶像的前精英。表面上是冷静、克己的讽刺家，却也是爱撒娇、懒惰的麻烦制造者，具有两面性的少女。为了能与讨厌的自己决裂，维持对自己的喜爱，以成为顶级偶像为目标。",
      theme: "#4FA0CE",
      background: "./assets/idols/tsukimura-temari.jpeg",
      avatar: "./assets/avatars/tsukimura-temari.png",
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
      tag: "小火龙 / 赛亚人",
      bio: "入学考试中取得第一名的新生。好胜心强、讨厌失败的曾经的运动员。花海咲季自幼聪颖、擅长记忆、可以很好地完成一切事项，被人们认为是神童。与妹妹花海佑芽关系很好，也是在各种各样的运动上一较高下的宿敌。比任何人都要看好佑芽的才能的同时，也对这份才能感到害怕。",
      theme: "#EA4A5B",
      background: "./assets/idols/hanami-saki.jpeg",
      avatar: "./assets/avatars/hanami-saki.png",
      core: "骄傲、好胜、害怕输给重要对手，但会把恐惧转回胜利计划。",
      styles: {
        lesson: "她会把课堂当成赢的工具。被指出弱点会先炸毛，然后要求具体胜利方案。",
        training: "高效率、强自尊，把身体管理也视为胜利条件。",
        outing: "外出也要服务于胜利：观察舞台、研究对手、恢复状态，最后转化成下一次赢的方案。",
        companion: "喜欢被夸，但会装作理所当然。真正准确的夸奖会让她害羞。",
        rest: "休息必须被包装成胜利准备。她会确认这不是退让，而是为了下一次压倒性表现。"
      }
    },
    "花海祐芽": {
      tag: "炽焰咆哮虎 / 赛人娘",
      bio: "候补入学的新生。元气满满、身体能力优越的原运动员。最最最最最喜欢姐姐咲季，从心底尊敬她、将她视为对手以及最大的目标。因为咲季的无私帮助，佑芽的偶像才能才得以绽放。",
      theme: "#ff5f4f",
      background: "./assets/idols/hanami-ume.png",
      avatar: "./assets/avatars/hanami-ume.png",
      core: "直觉型行动力、对姐姐咲季的憧憬与胜负心、压倒性成长欲、把失败立刻转成下一次挑战。",
      aliases: ["花海佑芽"],
      styles: {
        lesson: "把课堂理解成追上姐姐的捷径。她不懂就直问，抓住要点后会立刻想试试看。",
        training: "冲得很快，失败也很快，但不会停下。越接近咲季，她越能感到兴奋和害怕同时存在。",
        outing: "外出也会被她变成发现新目标的冒险。她会拉着制作人到处跑，最后把所见全部转成下一次胜负的燃料。",
        companion: "亲近、直率、热烈。会毫不犹豫地说喜欢、相信和想赢，也会把制作人的话当成前进的信号。",
        rest: "休息对她很难。必须告诉她休息也是为了下一次用压倒性数值挑战姐姐，她才会乖乖停下。"
      }
    },
    "篠泽广": {
      tag: "骷髅兵 / 牢广",
      bio: "带着神秘氛围的天才少女。因为厌倦了又简单又无聊的日子，为了挑战自己不擅长的领域而入学初星学园。会因为“很辛苦的课程”和“做不好的事情”而感受到喜悦的怪人。立志成为偶像的理由是“因为是看起来是最不适合自己的事情”。",
      theme: "#48C6DA",
      background: "./assets/idols/shinosawa-hiro.png",
      avatar: "./assets/avatars/shinosawa-hiro.png",
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
      tag: "火箭队 / 金色毛球",
      bio: "初星学园的学生会长。被称为“学园第一的偶像”，受到很多学生的仰慕。是学园长的孙女，从小接受偶像的精英教育长大。有“看出偶像才能”的特长，一眼就对琴音有了兴趣，但不知为什么却被拉开了距离。",
      theme: "#F9C584",
      background: "./assets/idols/juo-sena.png",
      avatar: "./assets/avatars/juo-sena.png",
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
      tag: "摸鱼小秦 / 手毬妈",
      bio: "初中部第一偶像团体「SyngUp！」的前成员。隐藏在月村手毬的阴影下，得到的评价相对普通，但实力却是实打实的。给一人种缺点很少的完美偶像的印象。也会有进一步的成长吧。",
      theme: "#A0B6DC",
      background: "./assets/idols/hataya-misuzu.png",
      avatar: "./assets/avatars/hataya-misuzu.png",
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
    },
    "仓本千奈": {
      tag: "China / <s>人类帝皇</s>",
      bio: "娇生惯养的、土生土长的大小姐。天真烂漫的女孩子。梦想成为「优秀的偶像」而进入初星学园。据本人所说，其实力「在全校学生中是最后一名哇！」。",
      theme: "#F8AC5E",
      background: "./assets/idols/kuramoto-china.png",
      avatar: "./assets/avatars/kuramoto-china.png",
      core: "能力不足与优渥出身带来的羞耻、总想放弃却会回来完成下一步、把他人的支持变成真心回礼。",
      styles: {
        lesson: "常常听懂得慢、做得更慢，沮丧和惊喜都写在脸上。哪怕喊着做不到，她仍会把老师要求的最后一步认真完成。",
        training: "基础能力不足会让训练显得格外艰难。重点不是突然变强，而是她在抱怨、落泪后仍选择再试一次。",
        outing: "她会自然想到昂贵而周到的安排，却会在意这是否只是依靠家境；真正令她开心的是普通、亲手参与且能留下共同回忆的体验。",
        companion: "礼貌天真、情绪外露，但并不迟钝。她能敏锐察觉善意，也会认真追问别人是否只是顾虑她的身份。",
        rest: "她会把酸痛夸张地说成世界末日，却又因这是努力留下的证据而暗自自豪，恢复后还会主动确认下一次训练。"
      }
    },
    "葛城莉莉娅": {
      tag: "白色大福 / <s>银梦厨</s>",
      bio: "来自海外的新生。没有唱歌跳舞的经验，总是没什么自信，一直畏畏缩缩的。似乎没有什么才能，但对偶像的向往之心是认真的，是个相当努力的人。她和她最好的朋友清夏已经许下约定，要一起登上舞台演出。",
      theme: "#EFFDFF",
      background: "./assets/idols/katsuragi-lilja.png",
      avatar: "./assets/avatars/katsuragi-lilja.png",
      core: "从零开始的异国少女、自我否定与害羞、即使害怕也会行动的坚韧、把得到的支持认真还给观众。",
      styles: {
        lesson: "她会把每条指导记得很细，却因为看不见自己的进步而不安。具体的前后对比比空泛鼓励更能让她建立信心。",
        training: "零基础让每一步都显得笨拙，但她几乎不会主动停下。需要防止她把拼命练习当成唯一能证明诚意的方式。",
        outing: "陌生环境会让她拘谨，熟悉的动画、游戏、甜点或清夏的话题则会打开话匣子，露出安静外表下强烈的热爱。",
        companion: "礼貌、害羞，习惯先贬低自己。被明确需要时会鼓起勇气回应，也会把很小的支持牢牢记住。",
        rest: "她会因为休息而产生落后感，必须让她理解接受照顾也是共同计划的一部分，而不是辜负期待。"
      }
    },
    "紫云清夏": {
      tag: "辣妹 / 阳角",
      bio: "会翘掉课和练习的不认真的辣妹。虽然很爱胡闹、但是充满活力又开朗、无论和谁都能搞好关系就是她的魅力。入学前也有跳芭蕾舞冲向世界舞台的成绩、虽然备受期待、但是本人却没有干劲。声援着拼命努力向着偶像为目标的好友莉莉娅。",
      theme: "#A2FD47",
      background: "./assets/idols/shiun-sumika.png",
      avatar: "./assets/avatars/shiun-sumika.png",
      core: "开朗轻佻的保护色、芭蕾伤痛留下的恐惧、害怕认真后再次失去、以渐进训练重新选择舞台。",
      styles: {
        lesson: "她擅长用玩笑和社交技巧把课题轻轻带过。真正认真时理解很快，却会在被准确夸奖后慌忙恢复随便的语气。",
        training: "舞蹈能力与身体记忆仍在，但奔跑、跳跃和高强度动作可能唤起恐惧。训练应强调渐进、停止线和她主动选择继续。",
        outing: "她熟悉时尚、流行和好玩的去处，会主动带节奏。轻松闲逛中偶尔露出的沉默，比直接逼问更接近她藏起来的真心。",
        companion: "会用昵称、玩笑和亲近动作拉近距离，也会把严肃话题化开。真正信任后，她才允许制作人看见害怕与不甘。",
        rest: "休息不能被写成懒散惩罚，而是她重新学习听从身体的过程。能在想逞强时停下，本身就是一次进步。"
      }
    },
    "有村麻央": {
      tag: "MAO / 小王子",
      bio: "目标是成为帅气的偶像的三年级女孩，同时也是初星学园偶像科宿舍的宿舍长，很会照顾人。被后辈们视为小王子（Little Prince）的存在，深受尊敬。从小就憧憬歌剧明星，过去曾以童星的身份活跃。",
      theme: "#A453A6",
      background: "./assets/idols/arimura-mao.png",
      avatar: "./assets/avatars/arimura-mao.png",
      core: "保护他人的王子理想、成长后的身体与旧角色冲突、拒绝被可爱否定、把帅气与脆弱都纳入真实自我。",
      styles: {
        lesson: "经验丰富、理解迅速，常会自然照顾周围学生。真正的课题是停止用完美王子形象遮住不安和不擅长。",
        training: "武术、体能和舞台基础让动作可靠利落。面对需要柔软或可爱表达的训练，她会先僵硬，再寻找不背叛王子理想的方式。",
        outing: "她习惯替制作人开门、提东西和规划路线。试衣、发型或普通约会感会让她在帅气从容与明显害羞之间摇摆。",
        companion: "待人温柔可靠，喜欢保护后辈。被反过来照顾或被称赞可爱时会失去余裕，却也逐渐学会接受。",
        rest: "她会把疲惫藏在照顾别人之后。休息剧情应让她卸下宿舍长和王子的责任，允许自己成为被关心的一方。"
      }
    },
    "姬崎莉波": {
      tag: "<s>退堂鼓</s>（A上去了） / 故障姬崎人",
      bio: "有着成熟大人气质的三年级学生。坚定而温柔，在宿舍中好好照顾大家的大姐姐。在过去有过参加的组合的经历，但结果并不理想。是学生会的成员，担任书记。",
      theme: "#F9C4D6",
      background: "./assets/idols/himesaki-rinami.png",
      avatar: "./assets/avatars/himesaki-rinami.png",
      core: "温柔成熟的姐姐气质、过去扮演妹妹偶像的失败、从刻意营销到自然照顾、也承认自己想被保护与喜欢竞争。",
      styles: {
        lesson: "她会先照顾同学与课堂气氛，反而在刻意展示姐姐魅力时变得僵硬。自然反应比设计好的营业更有吸引力。",
        training: "动作稳妥、善于配合别人，但容易把自己的需求放到最后。训练重点是让温柔、少女心和竞争欲同时出现在舞台上。",
        outing: "她会提前准备饮料、路线和应急用品，像照顾年幼伙伴一样周到；甜食、祭典和被制作人反过来照顾会显出真实少女感。",
        companion: "自然亲切、擅长安抚别人，却会因关系不再只是姐姐与弟弟而害羞。她也期待被理解、被依靠和被保护。",
        rest: "她习惯确认所有人都没问题后才休息。制作人若认真接过照顾者的位置，她会从不习惯逐渐变得安心。"
      }
    }
  };

  const idolPresets = {
    "藤田琴音": [90, 90, 120, 8, 29.5, 25.5, 1030, 1510, 1580, 1730, 2210, 2280],
    "月村手毬": [120, 100, 80, 27, 22.5, 11.5, 1580, 1370, 970, 2280, 2080, 1580],
    "花海咲季": [100, 100, 105, 16.5, 16.5, 20.5, 1280, 1280, 1360, 1930, 1930, 2030],
    "秦谷美铃": [95, 125, 140, 27, 13, 20, 1480, 1080, 1390, 2180, 1680, 2050],
    "篠泽广": [70, 55, 120, 22, 8, 26, 1180, 820, 1450, 1880, 1420, 2150],
    "十王星南": [160, 160, 160, 12, 12, 12, 1600, 1600, 1600, 2300, 2300, 2300],
    "花海祐芽": [120, 115, 110, 24, 24, 20, 1500, 1480, 1380, 2200, 2180, 2080],
    "仓本千奈": [75, 115, 125, 10, 24, 20.5, 1050, 1520, 1450, 1650, 2220, 2150],
    "葛城莉莉娅": [80, 100, 115, 18, 20, 18, 1300, 1380, 1450, 2000, 2080, 2150],
    "紫云清夏": [100, 115, 90, 9, 23, 23, 1050, 1500, 1450, 1650, 2200, 2150],
    "有村麻央": [125, 90, 100, 22, 8, 23, 1480, 950, 1500, 2180, 1550, 2200],
    "姬崎莉波": [85, 120, 125, 13, 21.5, 25.5, 1100, 1430, 1580, 1800, 2130, 2280]
  };

  const exactPresetIdols = new Set(["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃"]);
  const idolAliases = { "花海佑芽": "花海祐芽" };
  const affinityIdolCodes = {
    "藤田琴音": "KOTONE",
    "月村手毬": "TEMARI",
    "花海咲季": "SAKI",
    "花海祐芽": "UME",
    "篠泽广": "HIRO",
    "十王星南": "SENA",
    "秦谷美铃": "MISUZU",
    "仓本千奈": "CHINA",
    "葛城莉莉娅": "LILJA",
    "紫云清夏": "SUMIKA",
    "有村麻央": "MAO",
    "姬崎莉波": "RINAMI"
  };
  const interactionCharacters = ["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃", "篠泽广", "十王星南", "花海祐芽", "仓本千奈", "紫云清夏", "葛城莉莉娅", "有村麻央", "姬崎莉波"];
  const actionEventPools = {
    lesson: {
      Vo: ["课堂临时试唱", "分组和声练习", "训练员点名示范", "课后换气复盘", "同桌交换声乐笔记"],
      Da: ["课堂动作示范", "分组节奏练习", "训练员纠正重心", "课后舞步复盘", "同桌互相检查动作"],
      Vi: ["课堂镜头测试", "分组表情练习", "训练员临时拍摄", "课后姿态复盘", "同桌交换表现建议"]
    },
    training: {
      Vo: ["录音室回放检查", "耐力演唱合练", "发声训练临时搭档", "休息间隙讨论音准", "器材室寻找录音设备"],
      Da: ["训练室临时合练", "镜前动作纠正", "操场耐力训练", "休息间隙讨论节奏", "器材室整理训练道具"],
      Vi: ["镜前表情训练", "舞台走位测试", "临时摄影练习", "休息间隙讨论镜头感", "器材室挑选拍摄道具"]
    },
    rest: {
      any: ["休息室一起喝茶", "天台午睡时被发现", "保健室偶遇", "树荫下分享点心", "对方临时来请教问题", "顺手照顾疲惫的同伴"]
    }
  };
  const eventMoods = ["对方主动指出了一个意外盲点", "对方注意到了担当此刻的表现", "双方因为节奏不合产生轻微摩擦", "对方的一句话让当前课题突然清晰", "一次小失误变成了临时合作", "对方用完全不同的方式理解了这次练习"];
  const outingDestinations = [
    { name: "商店街", description: "小吃、饮料和便宜日用品，适合放学后闲逛与偶遇。" },
    { name: "购物中心", description: "买衣服、逛店，寻找舞台服装或私服灵感。" },
    { name: "游戏厅", description: "轻松竞技、游戏反差和不服输挑战。" },
    { name: "游乐园", description: "约会感、胆量与体力对比，适合关系推进。" },
    { name: "拉面店", description: "高热量美食与饮食管理，尤其容易触发手毬的反应。" },
    { name: "琴音打工的快餐店", description: "打工、收入、家庭压力，以及努力被看见的地方。" }
  ];
  const affinityThresholds = [20, 40, 60, 80, 100];

  function getAffinityStageThreshold(trust) {
    const value = Number.isFinite(Number(trust)) ? Number(trust) : 0;
    if (value >= 100) return 100;
    if (value >= 80) return 80;
    if (value >= 60) return 60;
    if (value >= 40) return 40;
    if (value >= 20) return 20;
    return 0;
  }

  function getAffinityStageTag(idolName, trust) {
    const code = affinityIdolCodes[idolName];
    return code ? `AFF_${code}_${getAffinityStageThreshold(trust)}` : "";
  }

  function getAffinityStageLine(idolName, trust) {
    const tag = getAffinityStageTag(idolName, trust);
    return tag ? `好感度阶段标签：${tag}` : "";
  }

  const affinityNodes = {
    0: { title: "担当开场", theme: "制作人与担当偶像正式建立育成关系，确认 First Live 前的共同目标。", timing: "选择担当后立即触发，读完后进入育成主界面。" },
    20: { title: "相互试探", theme: "围绕“为什么选择她、她为什么愿意接受你”推进早期信任。", timing: "好感度达到 20 后解锁。" },
    40: { title: "核心问题暴露", theme: "揭示该偶像最主要的矛盾与弱点，让数值育成和个人主线接上。", timing: "好感度达到 40 后解锁。" },
    60: { title: "关系转折", theme: "制作人与偶像的信任关系发生明确变化，角色开始把支持视为自己的力量。", timing: "好感度达到 60 后解锁。" },
    80: { title: "舞台前夜", theme: "First Live 前夜的最后深谈，面对上台前的心结、恐惧和决心。", timing: "好感度达到 80，且进入第 18 天前才解锁。" },
    100: { title: "First Live 之后", theme: "演出成功后的故事收尾，让角色关系完成 First Live 篇章的闭环。", timing: "First Live 成功且好感度达到 100 后解锁。" }
  };
  const affinityRouteSeeds = {
    "藤田琴音": {
      0: "被选择却不敢相信，第一反应是确认这不是搭讪或玩笑。",
      20: "她想知道自己为什么会被选择，害怕制作人看见真实实力后撤回决定。",
      40: "贫困、打工、现实收益和成绩差交织在一起，她把偶像活动看成翻身机会。",
      60: "制作人把辛苦的现实工作转化为偶像成长资源，她开始接受这份安排也是认真看待。",
      80: "First Live 前夜，她把多年被否定的不安沉淀成想被观众看见的燃料。",
      100: "演出之后，她用自己的话说出家庭、责任和一发逆转的愿望，真正相信制作人与自己。"
    },
    "月村手毬": {
      0: "冷淡拒绝，但因为制作人知道她的失败与丑闻仍然选择她而动摇。",
      20: "她嘴硬地设下界限，实际在观察制作人是否能理解现在的自己。",
      40: "体力、体重、心理疲劳和组合崩坏暴露出来，她害怕再次失控。",
      60: "饮食、录像和训练逐渐拆解问题，她第一次承认自己只有一点点相信制作人。",
      80: "First Live 前夜，她必须承认努力过头也是脆弱，接受被严格支撑。",
      100: "演出之后，她用别扭的方式承认自己已经不再是孤身一人。"
    },
    "花海咲季": {
      0: "自信、好胜、完美姐姐登场，要求制作人证明自己了解她的烦恼。",
      20: "她把制作人纳入胜利计划，确认自己必须一直是第一。",
      40: "佑芽作为最大竞争轴出现，她既骄傲于妹妹又害怕妹妹追上。",
      60: "训练、饮食和照顾他人的责任感让她看见强大背后的压力。",
      80: "First Live 前夜，她第一次把对失败的恐惧说出口，并把恐惧转成胜利方案。",
      100: "演出之后，她承认脆弱也属于最强的自己，继续以第一为目标。"
    },
    "篠泽广": {
      0: "天才少女身体极弱，却因为偶像是最不适合自己的困难而主动请求担当。",
      20: "制作人给她最低评价反而让她高兴，因为困难本身让她感到有趣。",
      40: "复健式训练和想象训练开始，她把微小进步当成巨大事件。",
      60: "佑芽、千奈和身边人的进步让她逐渐理解朋友、羡慕和舞台。",
      80: "First Live 前夜，她第一次认真面对自己也想站上舞台的愿望。",
      100: "演出之后，她明白愿望被实现不一定会失落，困难仍然可以继续。"
    },
    "十王星南": {
      0: "一等星拒绝普通招揽，但承认自己停滞，需要新的制作人视角。",
      20: "她展示学园顶点的能力，同时发现自己从去年起没有真正成长。",
      40: "直播、访谈和出丑让她开始打破完美学生会长形象。",
      60: "她面对粉丝和对手的期待，学习数值之外的偶像魅力。",
      80: "First Live 前夜，她决定让一等星不再只是学园第一，而是更高处的指路灯。",
      100: "演出之后，她承担起宣言带来的影响力，作为不完美的人继续闪耀。"
    },
    "秦谷美铃": {
      0: "茶道室午睡般登场，温柔地确认制作人是否能接受她的步调。",
      20: "她看似偷懒，却在观察制作人是否能看懂自己的努力方式。",
      40: "SyngUp! 与手毬旧关系浮现，她必须从辅助者走向自己的单人演唱。",
      60: "她开始主动表达照顾欲和温柔独占欲，关系从旁观变成共犯。",
      80: "First Live 前夜，她用自己的步调面对舞台，也面对想让重要的人听见的心意。",
      100: "演出之后，她不再只做温柔旁观者，而是主动选择继续向顶点走。"
    },
    "花海祐芽": {
      0: "迟到入学后凭直觉请求制作人担当，单纯又热烈地相信对方能成为力量。",
      20: "她的目标极其直接：打败姐姐咲季，成为学园第一。",
      40: "制作人指出她对偶像的热情几乎都来自咲季，她开始分辨追姐姐和成为偶像。",
      60: "失败经验被转成下一次挑战，她学会把直觉和训练计划结合。",
      80: "First Live 前夜，她第一次理解对等竞争的兴奋与恐惧。",
      100: "演出之后，她把姐姐、制作人和自己的路线合在一起，继续追求压倒性成长。"
    },
    "仓本千奈": {
      0: "从家族安排的委托开始，她追问制作人是否会抛开仓本家的身份，亲自选择这个什么都做不好的自己。",
      20: "她坦白入学成绩垫底，也怀疑所有机会都来自祖父与家境，想听到制作人不留情面的真实评价。",
      40: "最基础的训练也让她浑身酸痛、哭着想退出；在曾经反复放弃的历史面前，她第一次自己回来完成下一步。",
      60: "杂志、舞台和同伴帮助接连出现，她学习接受支持，却不再把支持误认为自己已经付出了同等努力。",
      80: "First Live 前夜，她害怕在众目睽睽下失败、浪费所有人的期待，最终决定相信日复一日完成的基础训练。",
      100: "演出中即使发生失误，她仍靠自己的力量站稳并完成舞台；演出后，她第一次把坚持到底当作属于自己的才能。"
    },
    "葛城莉莉娅": {
      0: "初遇：拘谨、迷路、礼貌求助。",
      20: "开始训练：把制作人当成可靠的指导者。",
      40: "被选择的信任：制作人相信她，她开始相信制作人的眼光。",
      60: "主动袒露：想把自己的心意传达出去。",
      80: "Live前后：恐惧、过度努力、但最信任制作人。",
      100: "深层信赖：制作人是引导她走出黑暗的人。"
    },
    "紫云清夏": {
      0: "她用轻松玩笑躲开招揽，还把制作人推向莉莉娅；制作人却看出她一直在等待别人先放弃自己。",
      20: "她承认曾经真心喜欢舞蹈，也承认受伤后最害怕的不是疼痛，而是认真投入后再次失去一切。",
      40: "渐进训练触碰到芭蕾留下的恐惧，身体明明已经痊愈，跳跃和落地仍会引发僵硬、慌乱与呼吸失控。",
      60: "她学会在停止线前主动停下，也学会在安全范围内主动要求再试一次；玩笑之外，竞争心和不甘重新出现。",
      80: "First Live 前夜，她不再保证自己毫不害怕，而是明确选择带着恐惧再次起舞，并接受制作人守住退路。",
      100: "演出之后，她确认舞台没有夺走自己，而是把选择权还给了她；伤痛未被奇迹抹去，她却已经能认真期待下一次。"
    },
    "有村麻央": {
      0: "她把制作人当成可疑人物挡在后辈面前，自然流露出的保护欲让制作人看见了无需扮演的王子魅力。",
      20: "她讲起童星时期的王子角色，以及身体成长后失去旧角色的经历，坚持自己想成为的是令人憧憬的王子。",
      40: "面对可爱的服装、发型和表达，她担心接受可爱就等于否定理想；制作人提出真实的她并不只有一个侧面。",
      60: "她停止机械维持王子姿态，在歌曲与舞台中寻找只属于自己的帅气，也第一次允许制作人反过来保护自己。",
      80: "First Live 前夜，她直面曾经厌恶身体变化的自己，决定让可爱、脆弱和帅气共同构成新的王子偶像。",
      100: "演出之后，她证明不必舍弃任何一面也能获得憧憬，带着被接纳的安心继续成为既可爱又帅气的无敌王子。"
    },
    "姬崎莉波": {
      0: "与制作人重逢后，她害怕自己已被忘记，也害怕过去扮演妹妹偶像的失败再次发生，仍接受了新的担当关系。",
      20: "她试着把制作人当作弟弟来找回自然状态，却逐渐发现真正有效的不是设定，而是她下意识关心对方的瞬间。",
      40: "刻意营业姐姐魅力使表演僵硬；照顾孩子、同伴和观众时，她成熟温柔的魅力反而自然地被所有人看见。",
      60: "她越来越无法把制作人只当弟弟，也开始承认自己除了照顾别人，还想被理解、被保护，并享受势均力敌的竞争。",
      80: "First Live 前夜，她因紧张再次想躲进姐姐角色，最终在制作人的支持下决定以完整的自己面对观众。",
      100: "演出之后，她接受成熟、少女心、脆弱与竞争欲都属于姬崎莉波，也让两人的关系不再被姐姐与弟弟的称呼限制。"
    }
  };

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
    affinity: { openingComplete: false, unlocked: [], pending: [], viewed: [] },
    firstLive: { completed: false, success: false, result: null },
    activeStoryNode: null,
    log: [],
    boundCharacter: null,
    producer: {
      name: "{{user}}",
      personality: "",
      style: "",
      settings: ""
    },
    lastStory: "请选择行动",
    lastEventTitle: "",
    lastEventResult: "",
    lastEventStory: "",
    lastPrompt: "",
    lastDebug: "尚未结算行动。",
    pendingAiRequestId: "",
    lastRequestId: "",
    choiceStep: 0,
    pendingChoiceRewards: [],
    pendingActionContext: null,
    pendingOptionTexts: [],
    selectedChoiceText: "",
    selectedChoiceRating: ""
  };

  const statLabels = { Vo: "Vocal", Da: "Dance", Vi: "Visual", stamina: "体力", stress: "压力", trust: "信赖" };
  const statShort = { Vo: "Vo.", Da: "Da.", Vi: "Vi." };
  const statIcons = { Vo: "mic", Da: "dance", Vi: "visual" };
  const statColors = { Vo: "#ff4f9a", Da: "#26a9f4", Vi: "#ffca35" };
  const actionIcons = { lesson: "book", training: "dance", rest: "rest", outing: "map", companion: "chat", freechat: "chat", interaction: "star" };
  const promptPanels = { prompt: "tabPrompt", log: "tabLog", debug: "tabDebug" };
  const idolBackgroundStatus = new Map();
  let activePromptTab = "prompt";
  let activeModal = null;
  let activeModalTab = null;
  let selectedIdol = null;
  let hoverTimeout = null;

  const BGM_CONFIG = {
    select: "./assets/bgm/select.mp3",
    lobby: "./assets/bgm/lobby.mp3",
    lesson: "./assets/bgm/lesson.mp3",
    outing: "./assets/bgm/outing.mp3",
    talk: "./assets/bgm/talk.mp3",
    rest: "./assets/bgm/rest.mp3",
    live_prep: "./assets/bgm/live_prep.mp3"
  };

  const bgmManager = {
    audioA: null,
    audioB: null,
    currentAudio: null,
    currentKey: null,
    targetKey: null,
    volume: 0.5,
    muted: false,
    initialized: false,
    fadeInterval: null,

    init() {
      if (this.initialized) return;
      this.audioA = new Audio();
      this.audioB = new Audio();
      this.audioA.loop = true;
      this.audioB.loop = true;
      this.currentAudio = this.audioA;
      
      const savedVolume = localStorage.getItem("hatsuProduceBgmVolume");
      if (savedVolume !== null) this.volume = parseFloat(savedVolume);
      
      const savedMuted = localStorage.getItem("hatsuProduceBgmMuted");
      if (savedMuted !== null) this.muted = savedMuted === "true";

      this.initialized = true;
      console.log("[BgmManager] Initialized with volume:", this.volume, "muted:", this.muted);

      if (this.targetKey) {
        this.play(this.targetKey, true);
      }
    },

    play(key, force = false) {
      this.targetKey = key;
      if (!this.initialized) return;
      if (this.currentKey === key && !force) return;

      const src = BGM_CONFIG[key];
      if (!src) {
        this.stop();
        return;
      }

      console.log(`[BgmManager] Transitioning from ${this.currentKey} to ${key}`);
      this.currentKey = key;

      const nextAudio = this.currentAudio === this.audioA ? this.audioB : this.audioA;
      const prevAudio = this.currentAudio;

      nextAudio.src = src;
      nextAudio.volume = 0;
      
      nextAudio.play()
        .then(() => {
          this.currentAudio = nextAudio;
          this.crossfade(prevAudio, nextAudio);
        })
        .catch((err) => {
          console.warn("[BgmManager] Play blocked by browser, waiting for user interaction.", err);
          const startPlay = () => {
            if (this.currentKey === key) {
              nextAudio.play().then(() => {
                this.currentAudio = nextAudio;
                this.crossfade(prevAudio, nextAudio);
              }).catch(e => console.error("[BgmManager] Force play failed:", e));
            }
            window.removeEventListener("click", startPlay);
            window.removeEventListener("keydown", startPlay);
          };
          window.addEventListener("click", startPlay);
          window.addEventListener("keydown", startPlay);
        });
    },

    crossfade(prevAudio, nextAudio) {
      if (this.fadeInterval) clearInterval(this.fadeInterval);

      const targetVolume = this.muted ? 0 : this.volume;
      const step = 0.05;
      const intervalMs = 50;
      
      let prevVol = prevAudio.volume;
      let nextVol = 0;
      
      this.fadeInterval = setInterval(() => {
        let done = true;

        if (prevVol > 0) {
          prevVol = Math.max(0, prevVol - step);
          prevAudio.volume = prevVol;
          done = false;
        } else {
          prevAudio.pause();
        }

        if (nextVol < targetVolume) {
          nextVol = Math.min(targetVolume, nextVol + step);
          nextAudio.volume = nextVol;
          done = false;
        }

        if (done) {
          clearInterval(this.fadeInterval);
          prevAudio.volume = 0;
          nextAudio.volume = targetVolume;
        }
      }, intervalMs);
    },

    stop() {
      this.targetKey = null;
      this.currentKey = null;
      if (this.fadeInterval) clearInterval(this.fadeInterval);
      
      const fadeOut = (audio) => {
        if (!audio || audio.paused) return;
        let vol = audio.volume;
        const interval = setInterval(() => {
          vol = Math.max(0, vol - 0.05);
          audio.volume = vol;
          if (vol <= 0) {
            clearInterval(interval);
            audio.pause();
          }
        }, 50);
      };
      
      fadeOut(this.audioA);
      fadeOut(this.audioB);
    },

    setVolume(vol) {
      this.volume = clamp(vol, 0, 1);
      localStorage.setItem("hatsuProduceBgmVolume", this.volume);
      if (!this.muted && this.currentAudio) {
        this.currentAudio.volume = this.volume;
      }
    },

    setMuted(muted) {
      this.muted = muted;
      localStorage.setItem("hatsuProduceBgmMuted", this.muted);
      if (this.currentAudio) {
        this.currentAudio.volume = this.muted ? 0 : this.volume;
      }
    }
  };

  function updateBgm() {
    const liveTheater = document.getElementById("liveTheater");
    if (liveTheater && !liveTheater.hidden) {
      bgmManager.stop();
      return;
    }

    const selectionStage = document.getElementById("selectionStage");
    if (selectionStage && !selectionStage.classList.contains("is-hidden")) {
      bgmManager.play("select");
      return;
    }

    const eventOverlay = document.getElementById("eventOverlay");
    if (eventOverlay && !eventOverlay.hidden) {
      const title = document.getElementById("eventTitle").textContent || "";
      if (title.includes("上课") || title.includes("课程") || title.includes("试唱") || title.includes("和声") || title.includes("声乐")) {
        bgmManager.play("lesson");
        return;
      }
      if (title.includes("训练") || title.includes("动作") || title.includes("节奏") || title.includes("重心") || title.includes("舞步")) {
        bgmManager.play("lesson");
        return;
      }
      if (title.includes("休息") || title.includes("体力恢复")) {
        bgmManager.play("rest");
        return;
      }
      if (title.includes("外出")) {
        bgmManager.play("outing");
        return;
      }
      if (title.includes("交流") || title.includes("好感度") || title.includes("同桌") || title.includes("闲聊") || title.includes("对话")) {
        bgmManager.play("talk");
        return;
      }
      if (title.includes("登台前准备") || title.includes("First Live 登台前准备") || (state.activeStoryNode && state.activeStoryNode.type === "firstLivePre")) {
        bgmManager.play("live_prep");
        return;
      }
      bgmManager.play("lobby");
      return;
    }

    const freeChatOverlay = document.getElementById("freeChatOverlay");
    if (freeChatOverlay && !freeChatOverlay.hidden) {
      bgmManager.play("talk");
      return;
    }

    const interactionOverlay = document.getElementById("interactionOverlay");
    if (interactionOverlay && !interactionOverlay.hidden) {
      bgmManager.play("talk");
      return;
    }

    const outingOverlay = document.getElementById("outingOverlay");
    if (outingOverlay && !outingOverlay.hidden) {
      bgmManager.play("outing");
      return;
    }

    if (state.liveReady) {
      bgmManager.play("live_prep");
      return;
    }

    bgmManager.play("lobby");
  }

  function setElementHidden(id, hidden) {
    const el = document.getElementById(id);
    if (el) el.hidden = hidden;
    updateBgm();
  }

  function triggerWipeTransition(callback) {
    const container = document.getElementById("wipeTransition");
    if (!container) {
      callback();
      return;
    }

    let idolName = selectedIdol || state.idol;
    let color = "#ff4f9a";
    if (idolName && idols[idolName]) {
      color = idols[idolName].theme || color;
    }

    container.style.setProperty("--wipe-color", color);
    container.removeAttribute("hidden");
    container.classList.add("animating");

    setTimeout(() => {
      callback();
    }, 600);

    setTimeout(() => {
      container.classList.remove("animating");
      container.setAttribute("hidden", "");
    }, 1300);
  }
  let pendingAiRequestId = "";
  let aiReplyRetryCount = 0;
  let interactionMode = "specified";
  let selectedInteractionCharacters = new Set();
  let activeStorageKey = STORAGE_KEY;
  let activeHostSaveScope = "";
  let hostStateReady = false;
  let state = loadState();

  ensureStateShape();
  if (state.uiVersion !== UI_VERSION || (state.idol && !idols[state.idol])) {
    state = clone(baseState);
    ensureStateShape();
    saveState();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(activeStorageKey);
      const loaded = saved ? { ...clone(baseState), ...JSON.parse(saved) } : clone(baseState);
      if (loaded.pendingAiRequestId) {
        pendingAiRequestId = loaded.pendingAiRequestId;
      }
      return loaded;
    } catch {
      return clone(baseState);
    }
  }

  function saveState() {
    state.pendingAiRequestId = pendingAiRequestId;
    if (pendingAiRequestId) {
      state.lastRequestId = pendingAiRequestId;
    }
    localStorage.setItem(activeStorageKey, JSON.stringify(state));
    if (hostStateReady) requestHostStateSave();
  }

  function resolveHostState(remoteState, localState) {
    if (remoteState && typeof remoteState === "object" && !Array.isArray(remoteState)) {
      return { source: "remote", state: remoteState, shouldMigrate: false };
    }
    if (localState?.idol) {
      return { source: "local", state: localState, shouldMigrate: true };
    }
    return { source: "empty", state: null, shouldMigrate: false };
  }

  function storageKeyForScope(scope) {
    const normalized = String(scope || "").trim();
    if (!normalized) return STORAGE_KEY;
    const safe = normalized.replace(/[^a-zA-Z0-9_.:-]+/g, "_").slice(0, 160);
    return `${STORAGE_KEY}:${safe}`;
  }

  function switchStorageScope(scope) {
    const nextKey = storageKeyForScope(scope);
    if (nextKey === activeStorageKey) return false;
    activeStorageKey = nextKey;
    state = loadState();
    ensureStateShape();
    return true;
  }

  function canonicalIdolName(name) {
    return idolAliases[name] || name;
  }

  function ensureStateShape() {
    state.idol = state.idol ? canonicalIdolName(state.idol) : state.idol;
    state.affinity = {
      openingComplete: false,
      unlocked: [],
      pending: [],
      viewed: [],
      ...(state.affinity || {})
    };
    state.affinity.unlocked = Array.from(new Set(state.affinity.unlocked || [])).map(Number).sort((a, b) => a - b);
    state.affinity.pending = Array.from(new Set(state.affinity.pending || [])).map(Number).sort((a, b) => a - b);
    state.affinity.viewed = Array.from(new Set(state.affinity.viewed || [])).map(Number).sort((a, b) => a - b);
    state.firstLive = { completed: false, success: false, result: null, ...(state.firstLive || {}) };
    state.activeStoryNode = state.activeStoryNode || null;
    state.producer = {
      name: "{{user}}",
      personality: "",
      style: "",
      settings: "",
      ...(state.producer || {})
    };
    state.choiceStep = Number.isInteger(state.choiceStep) ? state.choiceStep : 0;
    state.pendingChoiceRewards = Array.isArray(state.pendingChoiceRewards) ? state.pendingChoiceRewards : [];
    state.pendingActionContext = state.pendingActionContext || null;
    state.pendingOptionTexts = Array.isArray(state.pendingOptionTexts) ? state.pendingOptionTexts : [];
    state.selectedChoiceText = state.selectedChoiceText || "";
    state.selectedChoiceRating = state.selectedChoiceRating || "";
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
    idolName = canonicalIdolName(idolName);
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
    idolName = canonicalIdolName(idolName);
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
      state.affinity = { openingComplete: false, unlocked: [], pending: [], viewed: [] };
      state.firstLive = { completed: false, success: false, result: null };
      state.activeStoryNode = null;
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

  function eventScenesFor(action, attribute) {
    const pool = [...(actionEventPools[action]?.[attribute] || actionEventPools[action]?.any || [])];
    if (action === "training" && (state.day >= 13 || state.sp?.[attribute])) {
      pool.push("小舞台试演");
    }
    return pool;
  }

  function rollActionEvent(action, attribute) {
    const tuning = getActionTuning(state.idol, action);
    if (!tuning.eventChance || Math.random() * 100 >= tuning.eventChance) return null;
    const scenePool = eventScenesFor(action, attribute);
    if (!scenePool.length) return null;
    const character = sample(interactionCharacters.filter((name) => name !== state.idol));
    const rewardAttribute = sample(["Vo", "Da", "Vi", "trust"]);
    const reward = rewardAttribute === "trust" ? { trust: rollInclusive(1, 5) } : { [rewardAttribute]: 10 };
    return { character, scene: sample(scenePool), mood: sample(eventMoods), reward, action, attribute };
  }

  function getActionTuning(idolName, action) {
    const isMisuzu = canonicalIdolName(idolName) === "秦谷美铃";
    if (action === "lesson") {
      return { lessonGain: isMisuzu ? 98 : 65, staminaDelta: isMisuzu ? -30 : -10, trainingMultiplier: 1, eventChance: lessonEventChance };
    }
    if (action === "training") {
      return { lessonGain: 0, staminaDelta: isMisuzu ? -33 : -12, trainingMultiplier: isMisuzu ? 1.5 : 1, eventChance: trainingEventChance };
    }
    if (action === "rest") {
      return { lessonGain: 0, staminaDelta: 30, trainingMultiplier: 1, eventChance: isMisuzu ? 50 : 0 };
    }
    return { lessonGain: 0, staminaDelta: 0, trainingMultiplier: 1, eventChance: 0 };
  }

  function calculateTrainingGain(baseGain, trainingMultiplier, spActive) {
    const tunedGain = Math.round(baseGain * trainingMultiplier);
    return spActive ? Math.round(tunedGain * 1.5) : tunedGain;
  }

  function getActionCostText(idolName, action) {
    const staminaDelta = getActionTuning(idolName, action).staminaDelta;
    return `体力${staminaDelta > 0 ? "+" : ""}${staminaDelta}`;
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

  function markAffinityUnlocked(threshold) {
    if (!state.affinity.unlocked.includes(threshold)) state.affinity.unlocked.push(threshold);
    if (!state.affinity.viewed.includes(threshold) && !state.affinity.pending.includes(threshold)) {
      state.affinity.pending.push(threshold);
    }
    state.affinity.unlocked.sort((a, b) => a - b);
    state.affinity.pending.sort((a, b) => a - b);
  }

  function markAffinityViewed(threshold) {
    if (!state.affinity.viewed.includes(threshold)) state.affinity.viewed.push(threshold);
    state.affinity.pending = state.affinity.pending.filter((item) => item !== threshold);
    state.affinity.viewed.sort((a, b) => a - b);
  }

  function refreshAffinityUnlocks() {
    ensureStateShape();
    if (!state.idol) return;
    [20, 40, 60].forEach((threshold) => {
      if (state.trust >= threshold) markAffinityUnlocked(threshold);
    });
    if (state.trust >= 80 && state.day >= 18) markAffinityUnlocked(80);
    if (state.trust >= 100 && state.firstLive.success) markAffinityUnlocked(100);
  }

  function pendingAffinityCount() {
    ensureStateShape();
    return state.affinity.pending.filter((threshold) => threshold !== 0 || !state.affinity.openingComplete).length;
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
    if (state.day >= 17) {
      state.day = 18;
      state.liveReady = true;
      return;
    }
    state.day += 1;
  }

  function settleAction(action, attribute, actionContext = {}) {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择本次育成的担当。", "warn");
      return;
    }
    if (!state.affinity.openingComplete) {
      triggerAffinityStory(0);
      return;
    }
    if (state.liveReady) {
      startFirstLive();
      return;
    }
    if (!isActionAvailable(action)) {
      showToast("当前轮次不可用", "前三轮只开放上课、训练和休息；额外轮次只开放外出和交流。", "warn");
      return;
    }

    if (action === "outing" || action === "companion") {
      state.choiceStep = 1;
      state.pendingActionContext = { action, attribute, actionContext };
      
      // 外出是最高10，交流是最高20
      const baseRewards = action === "outing" ? [10, 8, 6, 4] : [20, 15, 10, 5];
      // 随机分配
      const shuffled = [...baseRewards].sort(() => Math.random() - 0.5);
      state.pendingChoiceRewards = shuffled;
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
      
      const actionName = actionLabel(action, attribute);
      const requestId = createRequestId();
      pendingAiRequestId = requestId;
      
      const prompt = buildChoicePhase1Prompt(action, attribute, shuffled, actionContext);
      
      const resultSummary = action === "outing" 
        ? `准备前往：${actionContext.destination || "散步"}` 
        : `发起与${state.idol}的交流`;
      
      const story = action === "outing"
        ? `正在前往 ${actionContext.destination || "散步"}...`
        : `正在准备与${state.idol}的对话主题...`;
        
      state.lastStory = story;
      state.lastPrompt = prompt;
      state.lastDebug = `第一阶段剧情生成：等待 AI 设计 4 个选项。加成映射：\n` + 
        shuffled.map((r, i) => `选项 ${i + 1} 对应加成 +${r}`).join("\n");
      
      saveState();
      render();
      
      setElementHidden("eventChoices", true);
      const actionsEl = document.getElementById("eventActions");
      if (actionsEl) actionsEl.style.display = "none";
      
      openEventOverlay(actionName, buildAiWaitingResult(resultSummary), buildAiWaitingStory(story));
      
      if (!requestHostPromptSend(prompt, requestId)) {
        openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制提示词后手动发送。");
      }
      showToast("开始发起活动", `正在等待 AI 生成${actionName}剧情与互动选项...`, "info");
      return;
    }

    const delta = {};
    let randomEvent = null;
    const tuning = getActionTuning(state.idol, action);

    if (action === "lesson") {
      delta[attribute] = tuning.lessonGain;
      delta.stamina = tuning.staminaDelta;
      delta.stress = 1;
      randomEvent = rollActionEvent(action, attribute);
    } else if (action === "training") {
      const spActive = Boolean(state.sp?.[attribute]);
      ["Vo", "Da", "Vi"].forEach((item) => {
        const baseGain = item === attribute
          ? Math.round(28 + Number(state.growth?.[item] || 0) * 0.8)
          : Math.round(Number(state.growth?.[item] || 0) * 0.15);
        delta[item] = calculateTrainingGain(baseGain, tuning.trainingMultiplier, spActive);
      });
      delta.stamina = tuning.staminaDelta;
      delta.stress = spActive ? 3 : 2;
      randomEvent = rollActionEvent(action, attribute);
    } else if (action === "rest") {
      delta.stamina = tuning.staminaDelta;
      randomEvent = rollActionEvent(action, attribute);
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
    const locationText = action === "outing" && actionContext.destination ? `外出地点：${actionContext.destination}` : "";
    const resultSummary = [locationText, resultText, eventText].filter(Boolean).join("，");
    const requestId = createRequestId();
    const story = buildPendingStory(actionName, resultSummary, randomEvent, actionContext);
    const prompt = buildPrompt(action, attribute, resultText, randomEvent, actionContext);

    state.lastStory = story;
    state.lastPrompt = prompt;
    state.lastDebug = buildDebugText(actionName, delta, randomEvent, actionContext);
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);

    advanceRound();
    refreshAffinityUnlocks();
    rollSpCandidates();
    saveState();
    render();
    pendingAiRequestId = requestId;
    openEventOverlay(actionName, buildAiWaitingResult(resultSummary), buildAiWaitingStory(story));
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制提示词后手动发送。");
    }
    showToast("行动结算完成", `${actionName}已经写入 P 手账。`, randomEvent ? "gold" : "info");
  }

  function createRequestId() {
    return `hatsu-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function buildAiWaitingResult(resultSummary) {
    return `${resultSummary}\n\n已向当前角色卡发送剧情生成请求，等待 AI 回复。`;
  }

  function buildAiWaitingStory(story) {
    return `${story}\n\n正在等待角色卡 AI 生成本次小剧情...`;
  }

  function buildDebugText(actionName, delta, randomEvent, actionContext = {}) {
    const spList = Object.entries(state.sp || {}).filter(([, active]) => active).map(([key]) => `${key}训练`).join("、") || "无";
    return [
      `行动：${actionName}`,
      actionContext.destination ? `外出地点：${actionContext.destination}` : null,
      `结算：${formatDelta(delta) || "无数值变化"}`,
      randomEvent ? `随机事件：${formatRandomEvent(randomEvent)}` : "随机事件：未触发",
      `下一轮 SP 候选：${spList}`,
      "规则：前端只负责结算与提示词构造，LLM 负责把已结算结果改写成角色叙事。"
    ].filter(Boolean).join("\n");
  }

  function buildPendingStory(actionName, resultSummary, randomEvent = null, actionContext = {}) {
    const eventLine = randomEvent
      ? `\n\n本次触发随机互动：${randomEvent.scene}，${randomEvent.character}${randomEvent.mood}。`
      : "";
    const locationLine = actionContext.destination ? `\n\n本次外出地点：${actionContext.destination}。` : "";
    return `${actionName}已经由前端完成结算。\n\n${resultSummary}\n\n剧情正文等待角色卡 AI 回复生成。点击“让 AI 生成后续”后，可以先编辑提示词，再发送给当前 SillyTavern 对话。${locationLine}${eventLine}`;
  }

  function outputContract(maxText) {
    return `输出格式要求：
- 最终展示给玩家的剧情正文必须放在两行纯文本分隔符之间：
【初星正文开始】
这里写剧情正文
【初星正文结束】
- 分隔符之间只写角色剧情正文，不要写思考、规划、规则复述、标题、列表、系统说明或数值复盘。
- 如果需要内部规划、检查、背景信息或思维过程，必须放在正文分隔符之外。
- 前端只会优先展示【初星正文开始】与【初星正文结束】之间的内容；没有该分隔符时才会尝试自动清理。
- ${maxText}`;
  }

  function buildProducerPromptSection() {
    if (!state.producer) return "";
    return `
制作人（{{user}}）设定：
- 称呼：${state.producer.name || "{{user}}"}
- 性格：${state.producer.personality || "由 AI 自行发挥"}
- 说话风格：${state.producer.style || "由 AI 自行发挥"}
- 额外人设背景：${state.producer.settings || "由 AI 自行发挥"}
`;
  }

  function buildPrompt(action, attribute, resultText, randomEvent = null, actionContext = {}) {
    const profile = idols[state.idol];
    const actionName = actionLabel(action, attribute);
    const actionStyle = profile.styles[action] || profile.styles.rest;
    const destinationPrompt = action === "outing" && actionContext.destination ? `
本次外出地点：${actionContext.destination}

外出场景要求：
- 制作人与担当偶像确实来到该地点活动，不要把地点只当作一句背景说明。
- 利用该地点可见的设施、商品、声音、气味或人群推动互动。
- 在本次回复内完成抵达、游玩/交流和当天收束，不要停在刚到目的地。
` : "";
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

    const narrativeLength = ["outing", "companion"].includes(action)
      ? "请写一段 900 字以内的完整场景叙事。本次回复需要把外出/交流的情景从开始、互动推进到当天收束完整写完，不要停在待续。"
      : "请写一段 400 字以内的短叙事。";

    return `[初星育成系统：行动已经由前端结算]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
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
${buildProducerPromptSection()}

本行动叙事规则：
${actionStyle}${destinationPrompt}${eventPrompt}

${outputContract(narrativeLength)}
不要重新计算数值。
不要改变系统结果。
不要让角色偏离上述主线矛盾。`;
  }

  function buildChoicePhase1Prompt(action, attribute, shuffledRewards, actionContext = {}) {
    const profile = idols[state.idol];
    const actionName = actionLabel(action, attribute);
    const actionStyle = profile.styles[action] || profile.styles.rest;
    
    const destinationPrompt = action === "outing" && actionContext.destination ? `
本次外出地点：${actionContext.destination}

外出场景要求：
- 制作人与担当偶像确实来到该地点活动。
- 利用该地点可见的设施、商品、声音、气味或人群推动互动。
- 剧情前半部分在抵达并展开活动、进入需要制作人表态或做选择的时刻停下。
` : "";

    const tierDescriptions = {
      20: "【完美回复/完美互动】：最契合你的隐藏心思或真实性格，展现出极强的默契，能让你感到非常受触动或心跳加速。",
      15: "【极佳回复/极佳互动】：优秀的互动回复，你感到非常开心，反应积极热切。",
      10: action === "outing" 
        ? "【完美回复/完美互动】：最契合你的隐藏心思或真实性格，展现出极强的默契，能让你感到非常受触动或心跳加速。" 
        : "【普通回复】：中规中矩的互动，没有说错话但有些普通或老套。",
      8: "【极佳回复/极佳互动】：优秀的互动回复，你感到非常开心，反应积极热切。",
      6: "【普通回复】：中规中矩的互动，没有说错话但有些普通或老套。",
      5: "【笨拙回复】：有点不解风情、笨拙、让人感到无奈或者微微叹气娇嗔的选项。",
      4: "【笨拙回复】：有点不解风情、笨拙、让人感到无奈或者微微叹气娇嗔的选项。"
    };

    const optionsPrompt = shuffledRewards.map((reward, index) => {
      return `- 选项 ${index + 1}（加成权重：+${reward} 信赖值）：${tierDescriptions[reward]}`;
    }).join("\n");

    return `[初星育成系统：互动分支设计]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：${actionName}

当前担当偶像的性格基调（${actionName}行为指南）：
${actionStyle}

${buildProducerPromptSection()}

${destinationPrompt}

请为本次${actionName}生成【前半段剧情】并设计【4个互动分支选项】供制作人选择。

==================================================
⚠️⚠️【输出硬规则：违反本规则将导致整个游戏崩溃报错，请务必严格服从！】⚠️⚠️
1. 你必须严格且完整地把所有输出包裹在【初星正文开始】与【初星正文结束】分隔符内。
2. 分隔符之内，【必须且只能】包含以下 5 个 XML 标签，绝对不能夹杂任何标签外的散落文本、Markdown 列表（如 - 或 1. 2. 等）、或者解释：
   <story>写前半段的对话/剧情，停留在需要制作人（Producer）做选择的转折点</story>
   <option1>选项 1 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option1>
   <option2>选项 2 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option2>
   <option3>选项 3 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option3>
   <option4>选项 4 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option4>
3. 选项标签内部的文本【绝对不能】带任何“选项 1：”、“+10信赖度”、“完美/笨拙”等系统前缀或数值标签！只能写纯粹的角色台词或动作。
4. 不要在标签外写任何思考（thinking/details）、计划、规则复述、系统提示。
==================================================

选项生成质量映射规则（请根据以下等级设计对应好感的回复）：
${optionsPrompt}

输出示例：
【初星正文开始】
<story>（这里是前半段的剧情台词和动作）</story>
<option1>（这里是制作人的具体行动或回复台词 1）</option1>
<option2>（这里是制作人的具体行动或回复台词 2）</option2>
<option3>（这里是制作人的具体行动或回复台词 3）</option3>
<option4>（这里是制作人的具体行动或回复台词 4）</option4>
【初星正文结束】`;
  }

  function buildChoicePhase2Prompt(action, attribute, chosenOptionText, trustGain, actionContext = {}) {
    const actionName = actionLabel(action, attribute);
    const outcomeName = (action === "outing" && trustGain === 10) || (action === "companion" && trustGain === 20)
      ? "【完美互动】"
      : (action === "outing" && trustGain === 8) || (action === "companion" && trustGain === 15)
        ? "【极佳互动】"
        : (action === "outing" && trustGain === 6) || (action === "companion" && trustGain === 10)
          ? "【普通互动】"
          : "【笨拙互动】";

    return `[初星育成系统：互动分支结算与收尾]

担当偶像：${state.idol}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：${actionName}

剧情进展：
制作人刚才做出了以下选择（或行动）：
“${chosenOptionText}”

本次选择的判定结果为：${outcomeName}（给玩家增加了 +${trustGain} 信赖值）

请承接前半段剧情，写出你（${state.idol}）在面对制作人这个选择时的【反应剧情】以及本次【外出的收尾/当天的总结】。

叙事要求：
- 请以符合偶像性格的语调展开，根据选择的优劣档次表现出对应的反应。
- 在本段剧情中完成事件的收束，结束当天的活动。
- 限制在 600 字以内。

输出格式要求：
【初星正文开始】
这里写你的反应与事件收尾剧情正文
【初星正文结束】

- 不要写思考、规则复述、标题或数值复盘。`;
  }

  function buildOpeningPrompt() {
    const profile = idols[state.idol];
    const seed = affinityRouteSeeds[state.idol]?.[0] || affinityNodes[0].theme;
    return `[初星育成系统：好感度0担当开场]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
初始状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

角色核心：
${profile.core}
${buildProducerPromptSection()}

本节点主题：
${affinityNodes[0].theme}

剧情种子：
${seed}

叙事要求：
- 这是玩家选择担当偶像后的开场剧情。
- 写出制作人选择她的理由、她对被选择的反应，以及是否愿意接受担当。
- 结尾停在“育成正式开始”的感觉。
- 不要推进日程。
- 不要增加或改变任何数值。

${outputContract("请写一段 500 字以内的开场剧情。")}`;
  }

  function buildLivePrompt() {
    return `[初星育成系统：First Live 候场]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
最终状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
成长率：Vo ${state.growth?.Vo} / Da ${state.growth?.Da} / Vi ${state.growth?.Vi}
${buildProducerPromptSection()}

请准备进入 First Live 最终演出。
不要重新计算数值。
先写考核前的短暂候场与制作人确认状态，等待玩家点击开始 First Live。`;
  }

  function buildAffinityPrompt(threshold) {
    const profile = idols[state.idol];
    const node = affinityNodes[threshold];
    const seed = affinityRouteSeeds[state.idol]?.[threshold] || node.theme;
    return `[初星育成系统：好感度剧情触发]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
剧情节点：好感度 ${threshold} / ${node.title}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
First Live 状态：${state.firstLive.completed ? (state.firstLive.success ? "已成功" : "已失败") : "尚未演出"}

角色核心：
${profile.core}
${buildProducerPromptSection()}

本节点主题：
${node.theme}

参考剧情种子：
${seed}

叙事要求：
- 这是角色专属好感度剧情，不是普通行动短叙事。
- 参考种子只提供矛盾结构，不要复述原剧情原句。
- 好感度80固定写成 First Live 前夜。
- 好感度100固定写成 First Live 成功后的故事结尾。
- 不要重新计算数值。
- 不要改变前端已经结算的结果。

${outputContract("请写一段 1200 字以内的完整好感度剧情。本次回复需要把整个情景从开端、冲突/交流推进到情绪收束完整写完，不要停在待续。")}`;
  }

  function buildFreeChatPrompt(topic) {
    const profile = idols[state.idol];
    return `[初星育成系统：自由闲聊]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

玩家想聊的话题：
${topic}

角色核心：
${profile.core}
${buildProducerPromptSection()}

闲聊规则：
- 这是制作人与担当偶像之间的一次自由闲聊，不是育成行动。
- 不消耗行动次数，不推进轮次、日期或 First Live 日程。
- 不增加或减少任何数值，不触发随机奖励。
- 围绕玩家输入的话题自然回应，可以加入简短动作、表情和现场氛围。
- 不要擅自把闲聊升级为重大剧情突破或解决尚未到阶段的角色矛盾。

${outputContract("请写一段 800 字以内的完整闲聊场景，在本次回复内自然收束话题，不要停在待续。")}`;
  }

  function buildIdolInteractionPrompt(selectedCharacters, plot, aiDecides) {
    const profile = idols[state.idol];
    const candidates = interactionCharacters.filter((name) => name !== state.idol);
    const castSection = aiDecides
      ? `登场角色模式：由 AI 决定\n候选角色库：${candidates.join("、")}\n请从候选角色库中选择一至三名其他偶像参与本次互动。`
      : `登场角色模式：玩家指定\n指定互动角色：${selectedCharacters.join("、")}`;
    const plotSection = plot
      ? `玩家指定的情节方向：\n${plot}`
      : "玩家没有指定情节，情节也由 AI 自行设计。";
    return `[初星育成系统：偶像互动]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

${castSection}

${plotSection}

担当角色核心：
${profile.core}
${buildProducerPromptSection()}

互动规则：
- 这是担当偶像与其他偶像之间的一次自由互动，不是育成行动。
- 不消耗行动次数，不推进轮次、日期或 First Live 日程。
- 不增加或减少任何数值，不触发随机奖励。
- ${aiDecides ? "只能从候选角色库选择一至三名角色，并让选中的角色实际参与。" : "所有指定角色都必须实际参与，不能只在对话中被提及。"}
- 多人互动必须围绕同一情境自然推进，写出角色之间彼此的反应，不要变成依次轮流说一句话。
- 角色关系、语气与行为遵守角色卡和世界书，不要让任何角色偏离核心性格。
- 玩家输入只规定情节方向，不得覆盖人物核心、推进育成日程或制造未结算的数值变化。

${outputContract("请写一段 1200 字以内的完整偶像互动剧情，在本次回复内从场景建立、互动推进到自然收束全部写完，不要停在待续。")}`;
  }

  function evaluateFirstLive() {
    const stats = ["Vo", "Da", "Vi"].map((key) => ({
      key,
      label: statLabels[key],
      value: state[key],
      target: state.threshold[key],
      margin: state[key] - state.threshold[key]
    }));
    const success = stats.every((item) => item.margin >= 0);
    const highest = [...stats].sort((a, b) => b.value - a.value)[0];
    const weakest = [...stats].sort((a, b) => a.margin - b.margin)[0];
    const surplus = stats.reduce((sum, item) => sum + Math.max(0, item.margin), 0);
    const tone = success
      ? surplus >= 600 ? "三项都明显超过审查基准，First Live 大获成功。" : `${highest.label} 表现最突出，整体达到审查基准。`
      : `${weakest.label} 未达到审查基准，演出留下明确课题。`;
    return { success, stats, highest, weakest, surplus, tone };
  }

  function formatLiveResult(result) {
    const lines = result.stats.map((item) => `${item.label} ${item.value} / ${item.target} ${item.margin >= 0 ? "达标" : "未达标"}`);
    return `${lines.join("\n")}\n\n结果：${result.success ? "First Live 成功" : "First Live 失败"}\n叙事侧重：${result.tone}`;
  }

  function buildFirstLivePrePrompt() {
    const profile = idols[state.idol];
    return `[初星育成系统：First Live 最终演出 - 登台前夜候场]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

角色核心：
${profile.core}
${buildProducerPromptSection()}

叙事时间范围：
- 正文必须限定在后台准备室/候场区，直到登台前的一刻。
- 重点描写偶像与制作人登台前的交流、心理活动、整理服饰、互相打气、做好觉悟的细节。
- 结尾停在偶像推开门走入登台通道，或者踏上台阶、强光照射过来、即将登台的瞬间。
- 绝对不要描写舞台上的具体表演过程。

叙事要求：
- 结合当前的体力、压力 and 信赖度，表现出担当偶像临近大考时的心理张力。
- 突出偶像对制作人至今为止陪伴与付出的内心回应。
- 语言细节符合《初星学园》角色卡设定。

${outputContract(`请写一段 600 字左右、以登台前后台沟通和觉悟为主体的剧情。`)}`;
  }

  function buildFirstLivePostPrompt(result) {
    const profile = idols[state.idol];
    return `[初星育成系统：First Live 最终演出 - 演后总结]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 信赖 ${state.trust}

最终演出判定结果：
${formatLiveResult(result)}

最高项：${result.highest.label} ${result.highest.value}
最低项：${result.weakest.label} ${result.weakest.value}

角色核心：
${profile.core}
${buildProducerPromptSection()}

叙事时间范围：
- 正文必须发生在 First Live 演出刚刚结束、偶像走下舞台回到后台休息室的场景。
- 重点描写偶像走下台后的喘息、兴奋、疲惫，以及与制作人就刚才 Live 表现的面对面交流。
- 绝对不要详细描写舞台演出的进行过程。

叙事要求：
- 必须承认并扣紧 First Live 的前端判定结果（演出成功或失败）。
- 结合最高项和最低项属性，让偶像和制作人讨论刚才舞台上的亮点（最高项）和不足（最低项/未达标项）。
- 成功：偶像释放压力，体验到胜利和成长，流露出对制作人的感激与进一步的野心。
- 失败：偶像面对不甘与泪水，与制作人共同承担失误，并重新坚定继续努力的觉悟。
- 描写结束后的情感变化，为好感度 100 剧情做铺垫。

${outputContract(`请写一段 800 字左右、以演出后后台沟通与总结为主体的剧情。`)}`;
  }

  function startOpeningStory() {
    markAffinityUnlocked(0);
    const prompt = buildOpeningPrompt();
    const requestId = createRequestId();
    state.activeStoryNode = { type: "affinity", threshold: 0, ready: false };
    state.lastPrompt = prompt;
    state.lastStory = `${state.idol}的担当开场正在生成。`;
    saveState();
    render();
    pendingAiRequestId = requestId;
    openEventOverlay("好感度 0：担当开场", "已向当前角色卡发送开场剧情请求。", buildAiWaitingStory("选择担当偶像后，开场剧情将由 AI 生成。"));
    if (!requestHostPromptSend(prompt, requestId)) {
      state.activeStoryNode.ready = true;
      saveState();
      openEventOverlay("好感度 0：担当开场", "当前页面未连接 SillyTavern。提示词已准备，可手动发送给 AI；本地测试时也可以确认进入育成。", "开场剧情等待手动生成。你可以在提示词窗口复制或编辑好感度0开场提示词。");
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制好感度0开场提示词后手动发送。");
    }
  }

  function triggerAffinityStory(threshold) {
    ensureStateShape();
    refreshAffinityUnlocks();
    if (!state.affinity.unlocked.includes(threshold)) {
      showToast("剧情尚未解锁", affinityNodes[threshold]?.timing || "继续推进育成即可解锁。", "warn");
      return;
    }
    const node = affinityNodes[threshold];
    const prompt = threshold === 0 ? buildOpeningPrompt() : buildAffinityPrompt(threshold);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "affinity", threshold, ready: false };
    state.lastPrompt = prompt;
    state.lastStory = `好感度 ${threshold}：${node.title} 正在生成。`;
    saveState();
    closeModal();
    render();
    pendingAiRequestId = requestId;
    openEventOverlay(`好感度 ${threshold}：${node.title}`, `已向当前角色卡发送${node.title}剧情请求。`, buildAiWaitingStory(`${node.title}剧情正文等待 AI 回复。`));
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制好感度剧情提示词后手动发送。");
    }
  }

  // 视频 CDN 配置：本地开发用本地文件，远程部署用 R2
  const VIDEO_CDN = "https://pub-cfdeb8f85de84d8193695eca002e7880.r2.dev";
  const idolVideoFiles = {
    "藤田琴音": "fujita-kotone-live.mp4",
    "月村手毬": "tsukimura-temari-live.mp4",
    "花海咲季": "hanami-saki-live.mp4",
    "花海祐芽": "hanami-yume-live.mp4",
    "篠泽广": "shinosawa-hiro-live.mp4",
    "十王星南": "juo-sena-live.mp4",
    "秦谷美铃": "hataya-misuzu-live.mp4",
    "仓本千奈": "kuramoto-china-live.mp4",
    "葛城莉莉娅": "katsuragi-lilja-live.mp4",
    "紫云清夏": "shiun-sumika-live.mp4",
    "有村麻央": "arimura-mao-live.mp4",
    "姬崎莉波": "himesaki-rinami-live.mp4"
  };
  const idolLiveVideos = Object.fromEntries(
    Object.entries(idolVideoFiles).map(([name, file]) => [
      name,
      `${VIDEO_CDN}/${file}`
    ])
  );

  function playLiveVideo(videoUrl, onComplete) {
    const overlay = document.getElementById("liveTheater");
    const video = document.getElementById("liveVideo");
    const skipBtn = document.getElementById("liveSkipBtn");
    const volBtn = document.getElementById("liveVolumeBtn");
    const playPrompt = document.getElementById("livePlayPrompt");

    if (!overlay || !video) {
      onComplete();
      return;
    }

    setElementHidden("liveTheater", false);
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    video.src = videoUrl;
    video.load();

    // Start unmuted by default
    video.muted = false;
    let isMuted = false;

    function updateVolumeIcon() {
      if (isMuted) {
        volBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
        volBtn.classList.add("muted");
      } else {
        volBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
        volBtn.classList.remove("muted");
      }
    }

    updateVolumeIcon();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        playPrompt.hidden = true;
      }).catch(error => {
        playPrompt.hidden = false;
        console.log("Autoplay blocked, showing click prompt.", error);
      });
    }

    volBtn.onclick = (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      video.muted = isMuted;
      updateVolumeIcon();
    };

    overlay.onclick = () => {
      if (video.paused) {
        video.play().then(() => {
          playPrompt.hidden = true;
        });
      } else {
        isMuted = !isMuted;
        video.muted = isMuted;
        updateVolumeIcon();
      }
    };

    playPrompt.onclick = (e) => {
      e.stopPropagation();
      video.play().then(() => {
        playPrompt.hidden = true;
        isMuted = false;
        video.muted = false;
        updateVolumeIcon();
      });
    };

    let finished = false;
    function cleanupAndFinish() {
      if (finished) return;
      finished = true;
      video.pause();

      volBtn.onclick = null;
      overlay.onclick = null;
      playPrompt.onclick = null;
      skipBtn.onclick = null;
      video.onended = null;
      video.onerror = null;

      overlay.style.opacity = "0";
      setTimeout(() => {
        setElementHidden("liveTheater", true);
        video.src = "";
        onComplete();
      }, 500);
    }

    skipBtn.onclick = (e) => {
      e.stopPropagation();
      cleanupAndFinish();
    };

    video.onended = () => {
      cleanupAndFinish();
    };

    video.onerror = (e) => {
      console.warn("Video load error, skipping theater mode.", e);
      cleanupAndFinish();
    };
  }

  function startFirstLivePostStage() {
    const result = state.firstLive.result;
    state.activeStoryNode = { type: "firstLivePost", ready: false };
    const postRequestId = createRequestId();
    pendingAiRequestId = postRequestId;
    state.lastPrompt = buildFirstLivePostPrompt(result);
    state.lastStory = "演出后后台沟通与总结中...";
    saveState();
    render();

    const sentSuccess = requestHostPromptSend(state.lastPrompt, postRequestId);

    const showPostLiveOverlay = () => {
      if (state.activeStoryNode?.ready) {
        openEventOverlay(
          "First Live 演后记",
          "已收到 SillyTavern 角色回复",
          state.lastStory
        );
      } else {
        openEventOverlay(
          "First Live 演后记", 
          buildAiWaitingResult(formatLiveResult(result)), 
          buildAiWaitingStory("演出后后台剧情等待角色卡 AI 回复生成。")
        );
      }
      if (!sentSuccess) {
        openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制 First Live 演后记提示词后手动发送。");
      }
    };

    const videoUrl = idolLiveVideos[state.idol];
    if (videoUrl) {
      triggerWipeTransition(() => {
        playLiveVideo(videoUrl, showPostLiveOverlay);
      });
    } else {
      showPostLiveOverlay();
    }
  }

  function startFirstLive() {
    if (!state.idol || !state.liveReady) return;
    if (state.firstLive.completed) {
      showToast("First Live 已完成", state.firstLive.success ? "成功后可在羁绊事件中触发好感度100。" : "本轮演出已经结束。", "info");
      return;
    }
    const result = evaluateFirstLive();
    state.firstLive = { completed: true, success: result.success, result };
    state.activeStoryNode = { type: "firstLivePre", ready: false };
    state.lastPrompt = buildFirstLivePrePrompt();
    state.lastStory = "登台前候场准备中...";
    refreshAffinityUnlocks();
    state.lastDebug = formatLiveResult(result);
    state.log.unshift({ day: state.day, round: "Live", phase: "First Live", action: "最终演出", result: result.success ? "演出成功" : "演出失败" });
    state.log = state.log.slice(0, 24);
    saveState();
    render();
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    openEventOverlay("First Live 登台前准备", "正在后台进行登台前的最后准备和交流...", buildAiWaitingStory("正在等待角色卡 AI 回复生成登台前的准备剧情..."));
    if (!requestHostPromptSend(state.lastPrompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制 First Live 提示词后手动发送。");
    }
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
    const canShowGame = hasIdol && state.affinity.openingComplete;
    document.getElementById("selectionStage").classList.toggle("is-hidden", hasIdol);
    document.getElementById("gameStage").classList.toggle("is-hidden", !canShowGame);
  }

  function applySelectStageBackground(idolName) {
    try {
      const selectVisual = document.querySelector(".select-visual");
      if (!selectVisual) return;

      // Find the currently active background element by ID
      let currentBg = document.getElementById("selectVisualBg");

      if (!idolName) {
        if (currentBg) {
          currentBg.classList.remove("has-image");
          selectVisual.classList.remove("has-hover-bg");
          // Keep it in DOM but clear it after fade out to allow reuse
          setTimeout(() => {
            if (!currentBg.classList.contains("has-image") && currentBg.parentNode) {
              currentBg.style.backgroundImage = "";
            }
          }, 400);
        }
        return;
      }

      const idolCode = affinityIdolCodes[idolName]?.toLowerCase();
      if (!idolCode) return;

      const extensions = [".png", ".jpg", ".jpeg"];
      const tryLoadImage = (extIndex) => {
        if (extIndex >= extensions.length) {
          const latestBg = document.getElementById("selectVisualBg");
          if (latestBg) {
            latestBg.classList.remove("has-image");
            selectVisual.classList.remove("has-hover-bg");
            setTimeout(() => {
              if (!latestBg.classList.contains("has-image") && latestBg.parentNode) {
                latestBg.style.backgroundImage = "";
              }
            }, 400);
          }
          return;
        }

        const ext = extensions[extIndex];
        const imgPath = `./assets/select-bg/${idolCode}${ext}`;
        const img = new Image();
        img.onload = () => {
          try {
            const activeHoverIdol = document.querySelector(".idol-card:hover");
            const hoveredName = activeHoverIdol ? activeHoverIdol.id.replace("idol-", "") : null;
            const currentExpected = hoveredName || selectedIdol;
            if (currentExpected === idolName) {
              const newBgUrl = `url("${imgPath}")`;

              // Query the LATEST active background node by ID right now
              const latestBg = document.getElementById("selectVisualBg");

              // Helper to normalize background URLs for comparison (ignoring relative/absolute differences)
              const normalizeBgUrl = (urlStr) => {
                if (!urlStr) return "";
                const match = urlStr.match(/\/assets\/select-bg\/[^\/)]+/i);
                return match ? match[0].toLowerCase() : urlStr;
              };

              const isSameImage = latestBg && normalizeBgUrl(latestBg.style.backgroundImage) === normalizeBgUrl(newBgUrl);

              if (!latestBg) {
                // If somehow no background element exists, create one
                const newBgEl = document.createElement("div");
                newBgEl.className = "select-visual-bg has-image";
                newBgEl.id = "selectVisualBg";
                newBgEl.style.backgroundImage = newBgUrl;
                selectVisual.insertBefore(newBgEl, selectVisual.firstChild);
                selectVisual.classList.add("has-hover-bg");
              } else if (!isSameImage) {
                // Create a new background element for cross-fade
                const newBgEl = document.createElement("div");
                newBgEl.className = "select-visual-bg";
                newBgEl.style.backgroundImage = newBgUrl;
                
                // Insert it immediately after the latest active one so it overlays on top
                selectVisual.insertBefore(newBgEl, latestBg.nextSibling);
                
                // Force reflow
                newBgEl.offsetHeight;
                
                // Fade in new image
                newBgEl.classList.add("has-image");
                selectVisual.classList.add("has-hover-bg");
                
                // Fade out old image
                latestBg.classList.remove("has-image");
                latestBg.id = ""; // Remove ID from old active
                newBgEl.id = "selectVisualBg"; // Set ID on new active
                
                // Remove old element after transition
                setTimeout(() => {
                  if (latestBg && latestBg.parentNode) {
                    latestBg.remove();
                  }
                }, 400);
              } else {
                latestBg.classList.add("has-image");
                selectVisual.classList.add("has-hover-bg");
              }
            }
          } catch (err) {
            console.error("Error in applySelectStageBackground onload:", err);
            showToast("背景加载处理错误", err.message, "error");
          }
        };
        img.onerror = () => {
          tryLoadImage(extIndex + 1);
        };
        img.src = imgPath;
      };
      tryLoadImage(0);
    } catch (err) {
      console.error("Error in applySelectStageBackground:", err);
      showToast("背景切换逻辑错误", err.message, "error");
    }
  }

  function updateSelectVisual(name) {
    const kicker = document.getElementById("selectKicker");
    const title = document.getElementById("selectTitle");
    const desc = document.getElementById("selectDesc");
    const rules = document.getElementById("selectRules");
    const confirmContainer = document.getElementById("selectConfirmContainer");
    const confirmBtn = document.getElementById("confirmIdolBtn");

    if (!name) {
      if (kicker) kicker.textContent = "Hatsuboshi Produce";
      if (title) title.textContent = "选择担当偶像";
      if (desc) desc.textContent = "18 天 First Live 育成。前端裁定数值、行动与随机事件，LLM 负责把结果写成角色叙事。";
      if (rules) rules.style.display = "";
      if (confirmContainer) {
        confirmContainer.style.display = "none";
        confirmContainer.classList.remove("is-visible");
      }
      applySelectStageBackground(null);

      const selectPanel = document.getElementById("selectPanel");
      const producerPanel = document.getElementById("producerPanel");
      if (selectPanel) selectPanel.classList.remove("is-hidden");
      if (producerPanel) producerPanel.classList.add("is-hidden");
      return;
    }

    const profile = idols[name];
    if (!profile) return;

    if (kicker) kicker.textContent = profile.tag || "Hatsuboshi Produce";
    if (title) title.textContent = name;
    if (desc) desc.textContent = profile.bio || "（暂无简介，请在 app.js 中配置该偶像的 bio 字段）";
    if (rules) rules.style.display = "none";

    if (confirmContainer) {
      confirmContainer.style.display = "flex";
      confirmContainer.offsetHeight; // Force reflow
      confirmContainer.classList.add("is-visible");
    }

    if (confirmBtn) {
      confirmBtn.style.backgroundColor = profile.theme;
      confirmBtn.style.boxShadow = `0 8px 24px ${profile.theme}66`;
    }

    const prodStartBtn = document.getElementById("producerStartBtn");
    if (prodStartBtn) {
      prodStartBtn.style.backgroundColor = profile.theme;
      prodStartBtn.style.boxShadow = `0 8px 24px ${profile.theme}66`;
    }

    applySelectStageBackground(name);
  }

  function renderIdols() {
    const list = document.getElementById("idolList");
    list.innerHTML = "";
    
    selectedIdol = null;
    updateSelectVisual(null);

    Object.entries(idols).forEach(([name, profile]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.id = `idol-${name}`;
      button.className = "idol-card";
      button.innerHTML = `
        <span class="idol-avatar" style="--avatar-color:${profile.theme}">
          <b aria-hidden="true">${name.slice(0, 1)}</b>
          <img src="${profile.avatar}" alt="" loading="lazy" decoding="async">
        </span>
        <span class="idol-card-copy"><strong>${name}</strong><span>${profile.tag}</span></span>
      `;
      button.querySelector(".idol-avatar img").addEventListener("error", (event) => {
        event.currentTarget.classList.add("is-missing");
      });
      
      button.addEventListener("click", () => {
        if (selectedIdol === name) return;
        selectedIdol = name;

        document.querySelectorAll(".idol-card").forEach((card) => {
          card.classList.remove("is-selected");
          card.style.borderColor = "";
          card.style.boxShadow = "";
        });
        button.classList.add("is-selected");
        button.style.borderColor = profile.theme;
        button.style.boxShadow = `0 12px 28px ${profile.theme}40`;

        updateSelectVisual(name);
      });

      button.addEventListener("mouseenter", () => {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }
        updateSelectVisual(name);
      });
      button.addEventListener("mouseleave", () => {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
        hoverTimeout = setTimeout(() => {
          updateSelectVisual(selectedIdol);
          hoverTimeout = null;
        }, 50);
      });

      list.appendChild(button);
    });
  }

  function applyIdolBackground(profile, gameStage) {
    const background = profile.background;
    const showDefaultScene = () => {
      gameStage.classList.remove("has-idol-background");
      gameStage.style.removeProperty("--idol-scene-image");
    };
    const showBackground = () => {
      gameStage.style.setProperty("--idol-scene-image", `url("${background}")`);
      gameStage.classList.add("has-idol-background");
    };

    showDefaultScene();
    if (!background) return;
    const status = idolBackgroundStatus.get(background);
    if (status === "ready") {
      showBackground();
      return;
    }
    if (status === "loading" || status === "missing") return;

    idolBackgroundStatus.set(background, "loading");
    const image = new Image();
    image.onload = () => {
      idolBackgroundStatus.set(background, "ready");
      if (idols[state.idol]?.background === background) showBackground();
    };
    image.onerror = () => {
      idolBackgroundStatus.set(background, "missing");
      if (idols[state.idol]?.background === background) showDefaultScene();
    };
    image.src = background;
  }

  function renderHud() {
    const profile = idols[state.idol];
    const gameStage = document.getElementById("gameStage");
    document.documentElement.style.setProperty("--idol-theme", profile.theme);
    applyIdolBackground(profile, gameStage);
    document.getElementById("daysLeftValue").textContent = daysLeft();
    document.getElementById("staminaValue").textContent = state.stamina;
    document.getElementById("staminaFill").style.width = `${clamp(state.stamina, 0, 100)}%`;
    document.getElementById("trustValue").textContent = state.trust;
    document.getElementById("stressValue").textContent = state.stress;
    document.getElementById("targetValue").textContent = Math.round((state.threshold.Vo + state.threshold.Da + state.threshold.Vi) / 4.2);
    document.getElementById("currentIdolLabel").textContent = "当前担当";
    document.getElementById("idolName").textContent = state.idol;
    document.getElementById("phaseBadge").textContent = getPhase();
    const badge = document.getElementById("affinityPendingBadge");
    if (badge) badge.textContent = String(pendingAffinityCount());
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
    if (state.liveReady) {
      container.appendChild(createActionButton(state.firstLive.completed ? "First Live已完成" : "开始First Live", "live", null, "#ff4f9a", state.firstLive.completed ? "已结算" : "最终考核"));
      container.appendChild(createActionButton("闲聊", "freechat", null, "#8c73ff", "行动0"));
      container.appendChild(createActionButton("互动", "interaction", null, "#ff783f", "行动0"));
      document.getElementById("actionModeLabel").textContent = state.firstLive.completed
        ? (state.firstLive.success ? "First Live成功，最终剧情已解锁" : "First Live结束，等待下一阶段")
        : "最终日程：First Live";
      renderActionHighlights();
      return;
    }
    const actions = isExtraRound()
      ? [
          ["外出", "outing", null, "#20dfad", "体力+38"],
          ["交流", "companion", null, "#ff4f9a", "信赖+15"],
          ["闲聊", "freechat", null, "#8c73ff", "行动0"],
          ["互动", "interaction", null, "#ff783f", "行动0"]
        ]
      : [
          ["Vo公开课", "lesson", "Vo", statColors.Vo, getActionCostText(state.idol, "lesson")],
          ["Da公开课", "lesson", "Da", statColors.Da, getActionCostText(state.idol, "lesson")],
          ["Vi公开课", "lesson", "Vi", statColors.Vi, getActionCostText(state.idol, "lesson")],
          ["Vo训练", "training", "Vo", statColors.Vo, getActionCostText(state.idol, "training")],
          ["Da训练", "training", "Da", statColors.Da, getActionCostText(state.idol, "training")],
          ["Vi训练", "training", "Vi", statColors.Vi, getActionCostText(state.idol, "training")],
          ["休息", "rest", null, "#20dfad", getActionCostText(state.idol, "rest")],
          ["闲聊", "freechat", null, "#8c73ff", "行动0"],
          ["互动", "interaction", null, "#ff783f", "行动0"]
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
      if (["freechat", "interaction"].includes(button.dataset.action)) {
        button.disabled = false;
      } else if (button.dataset.action === "live") {
        button.disabled = Boolean(state.firstLive.completed);
      } else {
        button.disabled = Boolean(state.liveReady) || !isActionAvailable(button.dataset.action);
      }
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
    if (typeof window.SillyTavern !== 'undefined' || document.getElementById('hatsu-fullscreen-overlay') || window.isHatsuLoaderST) {
      return true;
    }
    try {
      if (window.parent && window.parent !== window && (window.parent.SillyTavern || window.parent.isHatsuLoaderST)) {
        return true;
      }
    } catch (e) {}
    return window.parent && window.parent !== window && new URLSearchParams(window.location.search).get("host") === "sillytavern";
  }

  function requestHostCharacter() {
    if (!isSillyTavernHost()) return;
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "getCharacter"
    }, "*");
  }

  function requestHostStateSave() {
    if (!isSillyTavernHost() || !hostStateReady || !activeHostSaveScope) return false;
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "saveState",
      saveScope: activeHostSaveScope,
      state: clone(state)
    }, "*");
    return true;
  }

  function requestHostPromptSend(promptText, requestId = pendingAiRequestId || createRequestId()) {
    if (!isSillyTavernHost()) return false;
    const prompt = promptText || state.lastPrompt || document.getElementById("promptText").value || "";
    if (!prompt.trim()) return false;
    pendingAiRequestId = requestId;
    aiReplyRetryCount = 0;
    saveState();
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "sendPrompt",
      requestId,
      prompt
    }, "*");
    showToast("已交给酒馆", "提示词已发送到 SillyTavern 当前对话。", "gold");
    return true;
  }

  function applyHostCharacter(character, saveScope = "", savedState = null, hasSavedState = false) {
    if (!character?.name) return;
    hostStateReady = false;
    activeHostSaveScope = "";
    const switched = switchStorageScope(saveScope);
    const localState = state;
    const resolution = resolveHostState(hasSavedState ? savedState : null, localState);
    if (resolution.source === "remote") {
      state = { ...clone(baseState), ...clone(resolution.state) };
      ensureStateShape();
      if (state.uiVersion !== UI_VERSION || (state.idol && !idols[state.idol])) {
        state = clone(baseState);
        ensureStateShape();
      }
    }
    activeHostSaveScope = String(saveScope || "");
    hostStateReady = Boolean(activeHostSaveScope);
    state.boundCharacter = {
      name: String(character.name),
      avatar: character.avatar ? String(character.avatar) : ""
    };
    const characterIdol = canonicalIdolName(character.name);
    if (!state.idol && idols[characterIdol]) {
      applyIdolPreset(characterIdol, true);
      startOpeningStory();
      return;
    }
    if (resolution.source === "empty") {
      localStorage.setItem(activeStorageKey, JSON.stringify(state));
    } else {
      saveState();
    }
    render();
    resumeOpeningIfNeeded();
    const syncTitle = resolution.source === "remote"
      ? "已载入共享存档"
      : resolution.shouldMigrate
        ? "已迁移本地存档"
        : switched ? "已切换对话存档" : "已绑定角色卡";
    showToast(syncTitle, `当前角色卡：${state.boundCharacter.name}`, "info");
  }

  function closeNotebook() {
    setElementHidden("notebookDrawer", true);
  }

  function openAiPromptOverlay(note) {
    document.getElementById("aiPromptPhaseBadge").textContent = getPhase();
    const noteNode = document.querySelector(".ai-prompt-note");
    if (noteNode && note) noteNode.textContent = note;
    document.getElementById("aiPromptTextarea").value = state.lastPrompt || "";
    setElementHidden("aiPromptOverlay", false);
    document.getElementById("aiPromptTextarea").focus();
  }

  function resumeOpeningIfNeeded() {
    if (!state.idol || state.affinity.openingComplete) return;
    markAffinityUnlocked(0);
    if (!state.activeStoryNode) state.activeStoryNode = { type: "affinity", threshold: 0, ready: false };
    if (!state.lastPrompt) state.lastPrompt = buildOpeningPrompt();
    saveState();
    openEventOverlay("好感度 0：担当开场", "开场剧情尚未确认。", state.lastStory || "请生成并阅读担当开场后开始育成。");
  }

  function closeAiPromptOverlay() {
    setElementHidden("aiPromptOverlay", true);
  }

  function openFreeChatOverlay() {
    document.getElementById("freeChatPhaseBadge").textContent = getPhase();
    document.getElementById("freeChatTextarea").value = "";
    setElementHidden("freeChatOverlay", false);
    document.getElementById("freeChatTextarea").focus();
  }

  function closeFreeChatOverlay() {
    setElementHidden("freeChatOverlay", true);
  }

  function setInteractionMode(mode) {
    interactionMode = mode === "ai" ? "ai" : "specified";
    const aiDecides = interactionMode === "ai";
    const specifiedButton = document.getElementById("interactionModeSpecified");
    const aiButton = document.getElementById("interactionModeAi");
    specifiedButton.classList.toggle("active", !aiDecides);
    aiButton.classList.toggle("active", aiDecides);
    specifiedButton.setAttribute("aria-pressed", String(!aiDecides));
    aiButton.setAttribute("aria-pressed", String(aiDecides));
    document.getElementById("interactionCharacterList").classList.toggle("is-disabled", aiDecides);
    renderInteractionCharacters();
  }

  function renderInteractionCharacters() {
    const list = document.getElementById("interactionCharacterList");
    const aiDecides = interactionMode === "ai";
    list.innerHTML = "";
    interactionCharacters.filter((name) => name !== state.idol).forEach((name, index) => {
      const button = document.createElement("button");
      const selected = selectedInteractionCharacters.has(name);
      button.id = `interaction-character-${index + 1}`;
      button.type = "button";
      button.className = `interaction-character-button${selected ? " selected" : ""}`;
      button.textContent = name;
      button.disabled = aiDecides;
      button.setAttribute("aria-pressed", String(selected));
      button.addEventListener("click", () => {
        if (selectedInteractionCharacters.has(name)) selectedInteractionCharacters.delete(name);
        else selectedInteractionCharacters.add(name);
        renderInteractionCharacters();
      });
      list.appendChild(button);
    });
    const validation = document.getElementById("interactionValidation");
    validation.textContent = aiDecides
      ? "AI 将从角色库中选择一至三名其他偶像。"
      : selectedInteractionCharacters.size
        ? `已选择 ${selectedInteractionCharacters.size} 名偶像。`
        : "请选择至少一名其他偶像。";
    validation.classList.toggle("is-warning", !aiDecides && selectedInteractionCharacters.size === 0);
  }

  function openInteractionOverlay() {
    selectedInteractionCharacters = new Set();
    document.getElementById("interactionPhaseBadge").textContent = getPhase();
    document.getElementById("interactionPlotTextarea").value = "";
    setElementHidden("interactionOverlay", false);
    setInteractionMode("specified");
  }

  function closeInteractionOverlay() {
    setElementHidden("interactionOverlay", true);
  }

  function openOutingOverlay() {
    document.getElementById("outingPhaseBadge").textContent = getPhase();
    document.getElementById("outingCustomInput").value = "";
    const list = document.getElementById("outingDestinationList");
    list.innerHTML = "";
    outingDestinations.forEach((destination, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.id = `outing-destination-${index + 1}`;
      button.className = "outing-destination-button";
      button.innerHTML = `<strong>${destination.name}</strong><span>${destination.description}</span>`;
      button.addEventListener("click", () => confirmOutingDestination(destination.name));
      list.appendChild(button);
    });
    setElementHidden("outingOverlay", false);
  }

  function closeOutingOverlay() {
    setElementHidden("outingOverlay", true);
  }

  function confirmOutingDestination(destination) {
    const location = String(destination || "").trim();
    if (!location) {
      showToast("还没有地点", "请选择预设地点，或输入自定义外出地点。", "warn");
      return;
    }
    closeOutingOverlay();
    settleAction("outing", null, { destination: location });
  }

  function submitCustomOutingDestination() {
    confirmOutingDestination(document.getElementById("outingCustomInput").value);
  }

  function submitFreeChat() {
    const topic = document.getElementById("freeChatTextarea").value.trim();
    if (!topic) {
      showToast("还没有话题", "输入这次想和担当聊的内容后再发送。", "warn");
      return;
    }
    const prompt = buildFreeChatPrompt(topic);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "freechat", topic, ready: false };
    state.lastPrompt = prompt;
    state.lastStory = `正在和${state.idol}聊：${topic}`;
    saveState();
    renderNotebook();
    closeFreeChatOverlay();
    pendingAiRequestId = requestId;
    openEventOverlay("担当闲聊", "闲聊不消耗行动次数，也不会推进日程或改变数值。", buildAiWaitingStory(`正在等待${state.idol}回应这个话题。`));
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制闲聊提示词后手动发送。出于本地测试需要，本次闲聊不会推进日程。 ");
    }
  }

  function submitIdolInteraction() {
    const aiDecides = interactionMode === "ai";
    const selectedCharacters = [...selectedInteractionCharacters];
    if (!aiDecides && selectedCharacters.length === 0) {
      document.getElementById("interactionValidation").textContent = "请先选择至少一名其他偶像，或切换为 AI 决定。";
      document.getElementById("interactionValidation").classList.add("is-warning");
      showToast("还没有互动角色", "选择一名或多名其他偶像，或交给 AI 决定。", "warn");
      return;
    }
    const plot = document.getElementById("interactionPlotTextarea").value.trim();
    const prompt = buildIdolInteractionPrompt(selectedCharacters, plot, aiDecides);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "interaction", selectedCharacters, aiDecides, plot, ready: false };
    state.lastPrompt = prompt;
    state.lastStory = aiDecides
      ? `正在等待 AI 为${state.idol}安排互动角色与情节。`
      : `正在等待${state.idol}与${selectedCharacters.join("、")}的互动剧情。`;
    saveState();
    renderNotebook();
    closeInteractionOverlay();
    pendingAiRequestId = requestId;
    openEventOverlay("偶像互动", "互动不消耗行动次数，也不会推进日程或改变数值。", buildAiWaitingStory("正在等待角色卡生成完整互动剧情。"));
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制互动提示词后手动发送。互动不会推进日程。 ");
    }
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
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    openEventOverlay("AI 生成请求", "已重新发送提示词，等待角色卡回复。", "正在等待角色卡 AI 生成本次小剧情...");
    if (requestHostPromptSend(prompt, requestId)) return;
    openNotebook("prompt");
    showToast("提示词已准备", "当前不在 SillyTavern iframe 中，请从 P 手账复制。", "warn");
  }

  function setEventActionsEnabled(enabled, isGenerating = false) {
    const confirm = document.getElementById("eventConfirmBtn");
    if (confirm) {
      confirm.disabled = !enabled;
      if (isGenerating) {
        confirm.textContent = "正在生成中...";
      } else {
        const node = state.activeStoryNode;
        confirm.textContent = 
          node?.type === "affinity" && node.threshold === 0 
            ? "确认开始育成" 
            : node?.type === "firstLivePre" 
              ? "Live 开始" 
              : "确定";
      }
    }
    const regenBtn = document.getElementById("eventRegenBtn");
    if (regenBtn) regenBtn.disabled = !enabled;
    const aiBtn = document.getElementById("eventAiBtn");
    if (aiBtn) aiBtn.disabled = !enabled;
  }

  function triggerRegeneration() {
    const requestId = state.lastRequestId || createRequestId();
    pendingAiRequestId = requestId;
    state.lastRequestId = requestId;
    saveState();
    
    setEventActionsEnabled(false, true);
    
    const choicesEl = document.getElementById("eventChoices");
    if (choicesEl) {
      choicesEl.innerHTML = "";
      setElementHidden("eventChoices", true);
    }
    
    const storyEl = document.getElementById("eventStory");
    if (storyEl) {
      if (state.choiceStep === 2) {
        const intro = state.lastStory || "";
        const chosenLine = `▶ 制作人的选择：${state.selectedChoiceText || ""} (${state.selectedChoiceRating || ""})`;
        storyEl.innerHTML = `${intro.replace(/\n/g, "<br>")}<br><br><strong style="color:var(--violet)">${chosenLine}</strong><br><br><span id="eventReactionLoading" style="opacity:0.6;">(正在重新生成偶像的反应...)</span>`;
      } else {
        storyEl.textContent = "正在重新生成剧情...";
      }
    }
    
    if (isSillyTavernHost()) {
      window.parent.postMessage({
        source: "hatsuboshi-produce",
        type: "regenerate",
        requestId
      }, "*");
      showToast("正在重新生成", "已向 SillyTavern 发送重新生成请求。", "info");
    } else {
      showToast("未连接酒馆", "当前页面未连接 SillyTavern，无法触发重新生成。", "warn");
    }
  }

  function openEventOverlay(title, result, story) {
    state.lastEventTitle = title || "行动事件";
    state.lastEventResult = result || "本次行动已经完成结算。";
    state.lastEventStory = story || state.lastStory || "本次行动已经完成。";
    saveState();
    document.getElementById("eventTitle").textContent = title || "行动事件";
    document.getElementById("eventPhaseBadge").textContent = getPhase();
    document.getElementById("eventResult").textContent = result || "本次行动已经完成结算。";
    document.getElementById("eventStory").textContent = story || state.lastStory || "本次行动已经完成。";
    const confirm = document.getElementById("eventConfirmBtn");
    
    if (pendingAiRequestId) {
      setEventActionsEnabled(false, true);
    } else {
      setEventActionsEnabled(true, false);
    }

    setElementHidden("eventOverlay", false);
    confirm.focus();
  }

  function skipPendingOpening() {
    markAffinityViewed(0);
    state.affinity.openingComplete = true;
    state.activeStoryNode = null;
    pendingAiRequestId = "";
  }

  function closeEventOverlay() {
    const node = state.activeStoryNode;
    if (node?.type === "affinity") {
      if (!node.ready) {
        if (Number(node.threshold) === 0) {
          skipPendingOpening();
          saveState();
          render();
          setElementHidden("eventOverlay", true);
          return;
        }
        setElementHidden("eventOverlay", true);
        return;
      }
      markAffinityViewed(Number(node.threshold));
      if (Number(node.threshold) === 0) {
        state.affinity.openingComplete = true;
      }
      state.activeStoryNode = null;
      saveState();
      render();
    } else if (node?.type === "firstLivePre") {
      if (!node.ready) {
        setElementHidden("eventOverlay", true);
        return;
      }
      startFirstLivePostStage();
    } else if (node?.type === "firstLivePost") {
      if (!node.ready) {
        setElementHidden("eventOverlay", true);
        return;
      }
      state.activeStoryNode = null;
      refreshAffinityUnlocks();
      saveState();
      render();
    } else if (["freechat", "interaction"].includes(node?.type)) {
      if (!node.ready) {
        setElementHidden("eventOverlay", true);
        return;
      }
      state.activeStoryNode = null;
      saveState();
      render();
    }
    setElementHidden("eventOverlay", true);
  }

  function reopenLastEvent() {
    if (!state.lastEventStory) {
      showToast("暂无事件", "完成一次行动后，这里会保存最近事件。", "warn");
      return;
    }
    openEventOverlay(state.lastEventTitle, state.lastEventResult, state.lastEventStory);
  }

  function openAffinityModal() {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择本次育成的担当。", "warn");
      return;
    }
    refreshAffinityUnlocks();
    activeModal = "affinity";
    activeModalTab = null;
    document.getElementById("modalKicker").textContent = "Bond Stories";
    document.getElementById("modalTitle").textContent = "羁绊事件";
    const tabs = document.getElementById("modalTabs");
    tabs.innerHTML = "";
    const body = document.getElementById("modalBody");
    body.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "modal-grid affinity-grid";
    [0, ...affinityThresholds].forEach((threshold) => {
      const node = affinityNodes[threshold];
      const unlocked = state.affinity.unlocked.includes(threshold);
      const viewed = state.affinity.viewed.includes(threshold);
      const pending = state.affinity.pending.includes(threshold);
      const card = document.createElement("article");
      card.className = `modal-card affinity-card${unlocked ? " unlocked" : " locked"}${pending ? " pending" : ""}`;
      card.id = `affinity-card-${threshold}`;
      const status = viewed ? "已观看" : pending ? "可观看" : unlocked ? "可重看" : "未解锁";
      const actionText = viewed ? "重新生成" : unlocked ? "生成剧情" : "继续育成";
      card.innerHTML = `
        <strong>好感度 ${threshold}：${node.title}</strong>
        <p>${node.theme}</p>
        <small>${node.timing}</small>
        <button id="affinity-trigger-${threshold}" class="affinity-trigger" type="button" ${unlocked ? "" : "disabled"}>${status} / ${actionText}</button>
      `;
      const button = card.querySelector("button");
      button.addEventListener("click", () => triggerAffinityStory(threshold));
      grid.appendChild(card);
    });
    body.appendChild(grid);
    setElementHidden("appModal", false);
    document.getElementById("closeModal").focus();
  }

  function extractReplyText(candidates) {
    const results = candidates
      .map((candidate) => extractReplyCandidate(candidate))
      .filter((result) => result.text);
    const delimited = results.find((result) => result.method === "hatsu")
      || results.find((result) => result.method === "maintext");
    if (delimited) return delimited.text;
    return results
      .filter((result) => result.text.replace(/\s+/g, "").length >= 12 && !isJunkReply(result.text))
      .sort((a, b) => b.text.length - a.text.length)[0]?.text || "";
  }

  function extractReplyCandidate(value) {
    const raw = String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "");
    
    // 1. 过滤掉无前缀但带结束注释的思考段 (从开头到 <!-- end_of_Subtext_think --> 或者是草稿说明)
    let withoutThinking = raw
      .replace(/^[\s\S]*?<!--\s*end_of_Subtext_think\s*-->/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "");

    // 2. 过滤掉所有已闭合和未闭合的思考块/思维链/草稿标签，防止匹配到里面的设定或样例分隔符
    const thinkTags = "thinking|think|details|summary|sum|vars|analysis|planning|plan|konatan_planning|bginfo|bginfor|draft_notes|bginfor";
    const closedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*?<\\/\\1>", "gi");
    const unclosedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*$", "gi");
    
    withoutThinking = withoutThinking
      .replace(closedRegex, "")
      .replace(unclosedRegex, "");

    // 3. 使用【倒数匹配】查找最末尾的“初星正文开始”作为故事正文起点，彻底避开前置的样例与检查表干扰
    const startMatches = [...withoutThinking.matchAll(/[【\[]\s*初星正文开始\s*[】\]]/g)];
    if (startMatches.length > 0) {
      const lastStartMatch = startMatches[startMatches.length - 1];
      const startIndex = lastStartMatch.index + lastStartMatch[0].length;
      let content = withoutThinking.slice(startIndex);
      
      // 剥离结束符及其后面的所有内容 (包括 HatsuStatus 等状态块)
      content = content.replace(/[【\[]\s*初星正文结束\s*[】\]][\s\S]*$/u, "");
      return { method: "hatsu", text: cleanReplyText(content) };
    }

  const mainMatches = [...withoutThinking.matchAll(/<maintext\b[^>]*>([\s\S]*)/gi)];
  if (mainMatches.length > 0) {
    const lastMainMatch = mainMatches[mainMatches.length - 1];
    const content = lastMainMatch[1].replace(/<\/maintext>[\s\S]*$/gi, "");
    return { method: "maintext", text: cleanReplyText(content) };
  }

    return { method: "fallback", text: cleanReplyText(withoutThinking) };
  }

  function cleanReplyText(value) {
    const thinkTags = "thinking|think|details|summary|sum|vars|analysis|planning|plan|konatan_planning|bginfo|bginfor|draft_notes|bginfor";
    const closedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*?<\\/\\1>", "gi");
    const unclosedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*$", "gi");

    return String(value || "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(closedRegex, "")
      .replace(unclosedRegex, "")
      .replace(/<\/?[a-zA-Z_][\w:-]*\b[^>]*>/g, "")
      .replace(/\[\s*\{[\s\S]*?\}\s*\]\s*$/g, "")
      .replace(/^\s*\*{1,2}\s*/gm, "")
      .replace(/\s*\*{1,2}\s*$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function isJunkReply(value) {
    const compact = String(value || "").replace(/\s+/g, "");
    return !compact || compact.length < 2 || /^[.…。·\-—_]+$/.test(compact) || /^正文$/.test(compact) || /^…正文…$/.test(compact);
  }

  function chooseLongestReply(...values) {
    return values
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .sort((a, b) => b.replace(/\s+/g, "").length - a.replace(/\s+/g, "").length)[0] || "";
  }

  function fallbackChoiceSettlement(reply) {
    if (!state.pendingActionContext) return;
    const { action, attribute, actionContext } = state.pendingActionContext;
    
    const delta = {};
    if (action === "outing") {
      delta.stamina = 38;
      delta.stress = -5;
      delta.trust = 5; // 降级时的默认外出信赖值
    } else if (action === "companion") {
      delta.stamina = 18;
      delta.stress = -2;
      delta.trust = 15; // 降级时的默认交流信赖值
    }
    
    Object.entries(delta).forEach(([key, value]) => {
      const max = ["Vo", "Da", "Vi"].includes(key) ? Number(state.cap?.[key] || 999) : 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });
    
    advanceRound();
    refreshAffinityUnlocks();
    rollSpCandidates();
    
    const actionName = actionLabel(action, attribute);
    const resultText = formatDelta(delta);
    const locationText = action === "outing" && actionContext.destination ? `外出地点：${actionContext.destination}` : "";
    const resultSummary = [locationText, resultText].filter(Boolean).join("，");
    
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);
    
    state.lastStory = reply;
    if (state.log[0]) {
      state.log[0].aiReply = reply;
    }
    state.choiceStep = 0;
    saveState();
    render();
    
    setElementHidden("eventChoices", true);
    const actionsEl = document.getElementById("eventActions");
    if (actionsEl) actionsEl.style.display = "grid";
    
    const confirm = document.getElementById("eventConfirmBtn");
    if (confirm) {
      confirm.disabled = false;
      confirm.textContent = "确定";
    }
    
    openEventOverlay(actionName, "已收到 SillyTavern 角色回复（已自动结算）", reply);
  }

  function handleChoiceSelection(index) {
    if (!state.pendingActionContext) return;
    
    const buttons = document.querySelectorAll("#eventChoices .choice-button");
    buttons.forEach(btn => btn.disabled = true);
    
    const { action, attribute, actionContext } = state.pendingActionContext;
    const trustGain = state.pendingChoiceRewards[index] || 5;
    const chosenOptionText = state.pendingOptionTexts[index] || "选择该选项";
    const ratingName = (action === "outing" && trustGain === 10) || (action === "companion" && trustGain === 20)
      ? "【完美】"
      : (action === "outing" && trustGain === 8) || (action === "companion" && trustGain === 15)
        ? "【极佳】"
        : (action === "outing" && trustGain === 6) || (action === "companion" && trustGain === 10)
          ? "【普通】"
          : "【笨拙】";
    
    // 1. 正常结算属性增益
    const delta = {};
    if (action === "outing") {
      delta.stamina = 38;
      delta.stress = -5;
      delta.trust = trustGain;
    } else if (action === "companion") {
      delta.stamina = 18;
      delta.stress = -2;
      delta.trust = trustGain;
    }
    
    Object.entries(delta).forEach(([key, value]) => {
      const max = ["Vo", "Da", "Vi"].includes(key) ? Number(state.cap?.[key] || 999) : 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });
    
    // 2. 推进回合与日常刷新
    advanceRound();
    refreshAffinityUnlocks();
    rollSpCandidates();
    
    // 3. 记录日志
    const actionName = actionLabel(action, attribute);
    const resultText = formatDelta(delta);
    const locationText = action === "outing" && actionContext.destination ? `外出地点：${actionContext.destination}` : "";
    const resultSummary = [locationText, resultText, ratingName].filter(Boolean).join("，");
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);
    
    // 4. 更新选择记录状态并发起第二阶段反应生成
    state.selectedChoiceText = chosenOptionText;
    state.selectedChoiceRating = ratingName;
    state.choiceStep = 2;
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    
    const prompt = buildChoicePhase2Prompt(action, attribute, chosenOptionText, trustGain, actionContext);
    state.lastPrompt = prompt;
    state.lastDebug = `第二阶段剧情生成：已选择“${chosenOptionText}”，获得信赖度 +${trustGain}（${ratingName}）。等待 AI 生成偶像反应。`;
    
    saveState();
    render();
    
    // 5. 更新 UI 状态
    setElementHidden("eventChoices", true);
    
    const actionsEl = document.getElementById("eventActions");
    if (actionsEl) actionsEl.style.display = "grid";
    
    const confirm = document.getElementById("eventConfirmBtn");
    if (confirm) {
      confirm.disabled = true;
      confirm.textContent = "正在生成中...";
    }
    
    const storyEl = document.getElementById("eventStory");
    if (storyEl) {
      const intro = state.lastStory || "";
      storyEl.innerHTML = `${intro.replace(/\n/g, "<br>")}<br><br><strong style="color:var(--violet)">▶ 制作人的选择：${chosenOptionText} (${ratingName})</strong><br><br><span id="eventReactionLoading" style="opacity:0.6;">(正在等待偶像的反应...)</span>`;
    }
    
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制提示词发送获取后续。");
    }
  }

  function applyAiReply(text, requestId = "", rawText = "", renderedText = "", isFinal = true) {
    if (!shouldAcceptAiReply(requestId, pendingAiRequestId)) {
      sendAiReplyAck(requestId, false, false);
      return;
    }
    // For all event story texts, we prioritize the raw markdown text (rawText or text) over the browser's renderedText (innerText)
    // to prevent DOM-injected CSS styling blocks or translation plugins from corrupting the display.
    const rawSource = rawText || text || renderedText;
    const source = rawSource
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "");

    // ==========================================
    // 交互式选项第一阶段：提取剧情和选项标签
    // ==========================================
    if (state.choiceStep === 1) {
      let content = "";
      const startMatches = [...source.matchAll(/[【\[]\s*初星正文开始\s*[】\]]/g)];
      if (startMatches.length > 0) {
        const lastStartMatch = startMatches[startMatches.length - 1];
        const startIndex = lastStartMatch.index + lastStartMatch[0].length;
        content = source.slice(startIndex);
        content = content.replace(/[【\[]\s*初星正文结束\s*[】\]][\s\S]*$/u, "");
      } else {
        const mainMatches = [...source.matchAll(/<maintext\b[^>]*>([\s\S]*)/gi)];
        if (mainMatches.length > 0) {
          const lastMainMatch = mainMatches[mainMatches.length - 1];
          content = lastMainMatch[1].replace(/<\/maintext>[\s\S]*$/gi, "");
        } else {
          content = source;
        }
      }

      // 容错辅助：提取各形式选项标签
      const extractOption = (num) => {
        const regexes = [
          new RegExp(`<option_?${num}>([\\s\\S]*?)<\\/option_?${num}>`, 'i'),
          new RegExp(`<option\\s+${num}>([\\s\\S]*?)<\\/option\\s+${num}>`, 'i')
        ];
        for (const regex of regexes) {
          const match = content.match(regex);
          if (match?.[1]?.trim()) return match[1].trim();
        }
        return null;
      };

      let opt1 = extractOption(1);
      let opt2 = extractOption(2);
      let opt3 = extractOption(3);
      let opt4 = extractOption(4);
      let story = content.match(/<story>([\s\S]*?)<\/story>/i)?.[1]?.trim();

      // 如果选项存在但故事标签缺失，以第一个选项前的所有内容作为故事
      if (opt1 && opt2 && opt3 && opt4 && !story) {
        const firstOptIndex = content.search(/<option/i);
        if (firstOptIndex !== -1) {
          story = cleanReplyText(content.slice(0, firstOptIndex));
        }
      }

      // 进一步降级：如果仍然无法解析，尝试智能按行提取段尾双引号选项/编号选项
      if (!story || !opt1 || !opt2 || !opt3 || !opt4) {
        const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length >= 5) {
          const last4 = lines.slice(-4);
          const isQuotedOrNumbered = last4.every(line => {
            const hasQuotes = (line.startsWith("“") && line.endsWith("”")) ||
                              (line.startsWith('"') && line.endsWith('"')) ||
                              (line.startsWith("「") && line.endsWith("」")) ||
                              (line.startsWith("'") && line.endsWith("'"));
            const hasNumberPrefix = /^[1-4\u2460-\u2463\uff11-\uff14\u4e00-\u56dbA-Da-d][\.\u3002\u3001、\-\s:]/.test(line) ||
                                    /^(选项|Option|分支)[\s1-4\u4e00-\u56dbA-Da-d]/.test(line);
            return hasQuotes || hasNumberPrefix;
          });

          if (isQuotedOrNumbered) {
            const cleanOption = (text) => {
              let cleaned = text.trim();
              cleaned = cleaned.replace(/^(选项|Option|分支|)[1-4\u4e00-\u56dbA-Da-d][\.\u3002\u3001、\-\s：:]*/i, '');
              cleaned = cleaned.replace(/^[1-4\u2460-\u2463\uff11-\uff14][\.\u3002\u3001、\-\s：:]*/i, '');
              cleaned = cleaned.replace(/^[\s“"「\(\[（【'‘]+/g, '').replace(/[\s”"」\)\]）】'’]+$/g, '').trim();
              return cleaned;
            };

            opt1 = cleanOption(last4[0]);
            opt2 = cleanOption(last4[1]);
            opt3 = cleanOption(last4[2]);
            opt4 = cleanOption(last4[3]);
            story = lines.slice(0, -4).join("\n");
          }
        }
      }

      if (story && opt1 && opt2 && opt3 && opt4) {
        state.pendingOptionTexts = [opt1, opt2, opt3, opt4];
        
        if (!isFinal) {
          const storyEl = document.getElementById("eventStory");
          if (storyEl) {
            storyEl.textContent = story;
          }
          setEventActionsEnabled(false, true);
          sendAiReplyAck(requestId, true, false, false);
          return;
        }

        pendingAiRequestId = "";
        state.lastStory = story;
        saveState();

        const actionName = state.pendingActionContext 
          ? actionLabel(state.pendingActionContext.action, state.pendingActionContext.attribute)
          : "外出/交流";
        openEventOverlay(actionName, "请做出你的选择", story);

        // 渲染 4 个选项按钮
        const choicesEl = document.getElementById("eventChoices");
        if (choicesEl) {
          choicesEl.innerHTML = "";
          [opt1, opt2, opt3, opt4].forEach((optText, index) => {
            const btn = document.createElement("button");
            btn.className = "choice-button";
            btn.textContent = optText;
            btn.onclick = () => handleChoiceSelection(index);
            choicesEl.appendChild(btn);
          });
          setElementHidden("eventChoices", false);
        }

        // 禁用确定按钮，但保持 footer 按钮区可见，以便可以重新生成或编辑重发
        const confirmBtn = document.getElementById("eventConfirmBtn");
        if (confirmBtn) {
          confirmBtn.disabled = true;
          confirmBtn.textContent = "请选择选项";
        }
        const regenBtn = document.getElementById("eventRegenBtn");
        if (regenBtn) regenBtn.disabled = false;
        const aiBtn = document.getElementById("eventAiBtn");
        if (aiBtn) aiBtn.disabled = false;
        const actionsEl = document.getElementById("eventActions");
        if (actionsEl) actionsEl.style.display = "grid";
        
        sendAiReplyAck(requestId, true, false);
        return;
      }

      if (!isFinal) {
        // 如果是流式传输，在标签完备前先显示部分纯文本
        const storyEl = document.getElementById("eventStory");
        if (storyEl) {
          storyEl.textContent = cleanReplyText(content);
        }
        setEventActionsEnabled(false, true);
        sendAiReplyAck(requestId, true, false, false);
        return;
      }

      // 完结了但 XML 格式缺失，降级至普通单阶段结算
      console.warn("[Hatsu Choices] XML parsing failed. Falling back to default settlement.");
      const reply = cleanReplyText(content);
      fallbackChoiceSettlement(reply);
      sendAiReplyAck(requestId, true, false);
      return;
    }

    // ==========================================
    // 交互式选项第二阶段：AI 反应与收尾剧情
    // ==========================================
    if (state.choiceStep === 2) {
      const reply = extractReplyText([source]);
      
      const storyEl = document.getElementById("eventStory");
      if (storyEl && reply) {
        const intro = state.lastStory || "";
        const chosenLine = `▶ 制作人的选择：${state.selectedChoiceText || ""} (${state.selectedChoiceRating || ""})`;
        storyEl.innerHTML = `${intro.replace(/\n/g, "<br>")}<br><br><strong style="color:var(--violet)">${chosenLine}</strong><br><br>${reply.replace(/\n/g, "<br>")}`;
      }

      if (!isFinal) {
        setEventActionsEnabled(false, true);
        sendAiReplyAck(requestId, true, false, false);
        return;
      }

      pendingAiRequestId = "";
      state.lastStory = `${state.lastStory}\n\n▶ 制作人的选择：${state.selectedChoiceText} (${state.selectedChoiceRating})\n\n${reply}`;
      if (state.log[0]) {
        state.log[0].aiReply = reply;
      }
      state.choiceStep = 0;
      saveState();
      render();

      const actionName = state.pendingActionContext 
        ? actionLabel(state.pendingActionContext.action, state.pendingActionContext.attribute)
        : "外出/交流";
      openEventOverlay(actionName, "已收到 SillyTavern 角色回复", state.lastStory);
      sendAiReplyAck(requestId, true, false);
      return;
    }

    // ==========================================
    // 普通非选项行动（上课、训练、休息、羁绊剧情）
    // ==========================================
    const reply = extractReplyText([source]);

    if (reply) {
      const storyEl = document.getElementById("eventStory");
      if (storyEl) {
        const isAtBottom = storyEl.scrollHeight - storyEl.clientHeight - storyEl.scrollTop < 40;
        storyEl.textContent = reply;
        if (isAtBottom) {
          storyEl.scrollTop = storyEl.scrollHeight;
        }
      }
    }

    if (!isFinal) {
      setEventActionsEnabled(false, true);
      sendAiReplyAck(requestId, true, false, false);
      return;
    }

    if (!reply || reply.replace(/\s+/g, "").length < 12 || isJunkReply(reply)) {
      if (aiReplyRetryCount < 2) {
        aiReplyRetryCount++;
        sendAiReplyAck(requestId, false, true);
        return;
      }
      aiReplyRetryCount = 0;
      pendingAiRequestId = "";
      const errorText = "生成剧情失败，未获取到酒馆角色的有效回复。请点击右侧“编辑提示词重发”重试。";
      state.lastStory = errorText;
      if (state.activeStoryNode) state.activeStoryNode.ready = true;
      saveState();
      render();
      const node = state.activeStoryNode;
      const title = node?.type === "affinity"
        ? `好感度 ${node.threshold}：${affinityNodes[node.threshold]?.title || "羁绊事件"}`
        : node?.type === "firstLivePre"
          ? "First Live 登台前准备"
          : node?.type === "firstLivePost"
            ? "First Live 演后记"
            : node?.type === "freechat"
              ? "担当闲聊"
              : node?.type === "interaction"
                ? "偶像互动"
                : (state.log[0]?.action || "AI 后续剧情");
      openEventOverlay(title, "生成失败，未收到有效回复", errorText);
      sendAiReplyAck(requestId, false, false);
      return;
    }
    aiReplyRetryCount = 0;
    pendingAiRequestId = "";
    state.lastStory = reply;
    if (state.activeStoryNode) state.activeStoryNode.ready = true;
    if (state.log[0]) {
      state.log[0].aiReply = reply;
    }
    saveState();
    render();
    const node = state.activeStoryNode;
    const title = node?.type === "affinity"
      ? `好感度 ${node.threshold}：${affinityNodes[node.threshold]?.title || "羁绊事件"}`
      : node?.type === "firstLivePre"
        ? "First Live 登台前准备"
        : node?.type === "firstLivePost"
          ? "First Live 演后记"
          : node?.type === "freechat"
            ? "担当闲聊"
            : node?.type === "interaction"
              ? "偶像互动"
              : (state.log[0]?.action || "AI 后续剧情");
    openEventOverlay(title, "已收到 SillyTavern 角色回复", reply);
    sendAiReplyAck(requestId, true, false);
  }

  function sendAiReplyAck(requestId, accepted, retry, isFinal = true) {
    if (!isSillyTavernHost() || !requestId) return;
    window.parent.postMessage({
      source: "hatsuboshi-produce",
      type: "aiReplyAck",
      requestId,
      accepted,
      retry,
      isFinal
    }, "*");
  }

  function shouldAcceptAiReply(requestId, currentRequestId) {
    if (!requestId) return false;
    const activeRequestId = currentRequestId || state.pendingAiRequestId;
    if (!activeRequestId) return false;
    return requestId === activeRequestId;
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
          ["本地存储", `存档键：${activeStorageKey}`],
          ["版本", `UI Version ${UI_VERSION}，结构变化时会重建档案。`],
          ["当前担当", state.idol || "未选择"]
        ],
        "规则": [
          ["日程", "18 天育成，每天 3 次普通行动与 1 次额外行动。"],
          ["普通行动", "上课、训练、休息。休息回复 30 体力。"],
          ["额外行动", "外出回复较多体力并增加信赖，交流增加更多信赖并回复少量体力。"]
        ],
        "制作人设定": [],
        "音频设置": [],
        "开发测试": []
      }
    },
    schedule: {
      kicker: "Calendar",
      title: "日程详情",
      tabs: {
        "日程": [
          ["第 1-6 天", "First Live 前期，建立基础数值与担当关系。"],
          ["第 7-12 天", "First Live 中期，随机互动与信赖剧情开始成为主要变量。"],
          ["第 13-17 天", "First Live 后期，数值门槛与角色矛盾共同推向考核。"],
          ["第 18 天", "最终日程固定为 First Live，不再进行普通行动。"]
        ],
        "轮次": [
          ["普通轮次", "每天第 1、2、3 轮，只显示上课、训练和休息。"],
          ["额外轮次", "每天第 4 轮，只显示外出和交流。"],
          ["防误操作", "体力危险时仍可选择休息，避免路线被单次失误锁死。"]
        ],
        "考核": [
          ["First Live", "第 18 天点击开始最终演出，由前端判定三项数值是否达标。"],
          ["好感度80", "好感度达到 80 后，会在第 18 天前解锁舞台前夜。"],
          ["好感度100", "First Live 成功且好感度达到 100 后解锁最终剧情。"],
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
          ["好感剧情", "0 为强制开场，20/40/60/80/100 由羁绊事件按钮主动触发。"],
          ["考核剧情", "第 18 天由最终状态进入 First Live 数值判定。"]
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
        "场景池": [
          ...Object.entries(actionEventPools).flatMap(([action, attributes]) =>
            Object.entries(attributes).map(([attribute, scenes]) => [
              `${action === "lesson" ? "上课" : "训练"} · ${attribute}`,
              scenes.join("、")
            ])
          ),
          ["小舞台试演", "仅在第13天后训练或本轮SP训练时加入候选池。"]
        ]
      }
    }
  };

  function openModal(type) {
    activeModal = modalRegistry[type] ? type : "system";
    activeModalTab = Object.keys(modalRegistry[activeModal].tabs)[0];
    renderModal();
    setElementHidden("appModal", false);
    document.getElementById("closeModal").focus();
  }

  function closeModal() {
    setElementHidden("appModal", true);
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

    if (activeModal === "system" && activeModalTab === "制作人设定") {
      const prodPanel = document.createElement("div");
      prodPanel.className = "dev-panel-content";
      prodPanel.style.display = "flex";
      prodPanel.style.flexDirection = "column";
      prodPanel.style.gap = "14px";
      prodPanel.style.padding = "10px";
      prodPanel.style.width = "100%";
      prodPanel.innerHTML = `
        <style>
          .prod-setting-row { display: grid; gap: 6px; margin-bottom: 8px; }
          .prod-setting-row label { font-weight: bold; font-size: 14px; color: var(--ink); }
          .prod-setting-row input, .prod-setting-row textarea {
            width: 100%; border: 2px solid rgba(111, 102, 128, 0.14); border-radius: 10px;
            padding: 8px 12px; color: var(--ink); background: rgba(255, 255, 255, 0.85); font: 700 13px var(--font-ui); outline: none; transition: all 0.2s ease;
          }
          .prod-setting-row input:focus, .prod-setting-row textarea:focus { border-color: var(--idol-theme); background: #fff; }
          .prod-save-btn { margin-top: 8px; width: 100%; padding: 10px; font-weight: bold; border-radius: 10px; border: none; background: var(--idol-theme); color: #fff; cursor: pointer; }
        </style>
        <div class="prod-setting-row">
          <label for="modalProdName">制作人称呼</label>
          <input type="text" id="modalProdName" value="${state.producer?.name || '{{user}}'}">
        </div>
        <div class="prod-setting-row">
          <label for="modalProdPersonality">性格特征</label>
          <textarea id="modalProdPersonality" rows="2">${state.producer?.personality || ''}</textarea>
        </div>
        <div class="prod-setting-row">
          <label for="modalProdStyle">说话风格</label>
          <input type="text" id="modalProdStyle" value="${state.producer?.style || ''}">
        </div>
        <div class="prod-setting-row">
          <label for="modalProdSettings">额外设定</label>
          <textarea id="modalProdSettings" rows="2">${state.producer?.settings || ''}</textarea>
        </div>
        <button id="modalProdSaveBtn" class="prod-save-btn">保存修改</button>
      `;
      body.appendChild(prodPanel);

      document.getElementById("modalProdSaveBtn").addEventListener("click", () => {
        state.producer = {
          name: document.getElementById("modalProdName").value.trim() || "{{user}}",
          personality: document.getElementById("modalProdPersonality").value.trim(),
          style: document.getElementById("modalProdStyle").value.trim(),
          settings: document.getElementById("modalProdSettings").value.trim()
        };
        saveState();
        showToast("设置已保存", "制作人信息修改成功，将在下一次行动起生效。", "info");
      });
      return;
    }

    if (activeModal === "system" && activeModalTab === "音频设置") {
      const audioPanel = document.createElement("div");
      audioPanel.className = "dev-panel-content";
      audioPanel.style.display = "flex";
      audioPanel.style.flexDirection = "column";
      audioPanel.style.gap = "14px";
      audioPanel.style.padding = "10px";
      audioPanel.style.width = "100%";
      audioPanel.innerHTML = `
        <style>
          .audio-setting-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.05); }
          .audio-setting-row:last-child { border-bottom: none; }
          .audio-label { display: flex; flex-direction: column; gap: 4px; }
          .audio-title { font-weight: bold; font-size: 15px; color: var(--ink); }
          .audio-desc { font-size: 12px; color: var(--soft-ink); }
          .audio-control { display: flex; align-items: center; gap: 12px; }
          .audio-slider { width: 120px; cursor: pointer; accent-color: var(--pink); }
          .audio-toggle-btn { padding: 8px 16px; font-size: 13px; font-weight: bold; border-radius: 8px; border: 2px solid rgba(0,0,0,0.1); background: #fff; color: var(--ink); cursor: pointer; transition: all 0.2s; }
          .audio-toggle-btn.active { background: var(--pink); color: #fff; border-color: var(--pink); }
        </style>
        <div class="audio-setting-row">
          <div class="audio-label"><span class="audio-title">背景音乐 (BGM)</span><span class="audio-desc">开启或关闭育成的背景音乐</span></div>
          <div class="audio-control"><button id="bgmMuteBtn" class="audio-toggle-btn ${bgmManager.muted ? "" : "active"}">${bgmManager.muted ? "已静音" : "播放中"}</button></div>
        </div>
        <div class="audio-setting-row">
          <div class="audio-label"><span class="audio-title">BGM 音量</span><span class="audio-desc">调整背景音乐的播放音量</span></div>
          <div class="audio-control">
            <input id="bgmVolumeSlider" type="range" class="audio-slider" min="0" max="1" step="0.05" value="${bgmManager.volume}">
            <span id="bgmVolumeLabel" style="font-weight:bold; font-size:14px; width:30px; text-align:right;">${Math.round(bgmManager.volume * 100)}%</span>
          </div>
        </div>
      `;
      body.appendChild(audioPanel);
      const muteBtn = document.getElementById("bgmMuteBtn");
      if (muteBtn) {
        muteBtn.addEventListener("click", () => {
          const newMuted = !bgmManager.muted;
          bgmManager.setMuted(newMuted);
          muteBtn.textContent = newMuted ? "已静音" : "播放中";
          muteBtn.classList.toggle("active", !newMuted);
        });
      }
      const slider = document.getElementById("bgmVolumeSlider");
      const volLabel = document.getElementById("bgmVolumeLabel");
      if (slider) {
        slider.addEventListener("input", (e) => {
          const vol = parseFloat(e.target.value);
          bgmManager.setVolume(vol);
          if (volLabel) volLabel.textContent = `${Math.round(vol * 100)}%`;
        });
      }
      return;
    }

    if (activeModal === "system" && activeModalTab === "开发测试") {
      const devPanel = document.createElement("div");
      devPanel.className = "dev-panel-content";
      devPanel.style.display = "flex";
      devPanel.style.flexDirection = "column";
      devPanel.style.gap = "14px";
      devPanel.style.padding = "10px";
      devPanel.style.width = "100%";
      
      devPanel.innerHTML = `
        <style>
          .dev-form-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
          }
          .dev-form-row label {
            font-weight: bold;
            font-size: 13px;
            color: var(--ink);
            width: 70px;
          }
          .dev-form-row input[type="number"] {
            flex: 1;
            padding: 6px 10px;
            border: 2px solid rgba(0,0,0,0.1);
            border-radius: 8px;
            font-family: inherit;
            background: #fff;
            color: var(--ink);
            text-align: center;
            font-weight: bold;
          }
          .dev-btn-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
          }
          .dev-action-btn {
            background: linear-gradient(135deg, var(--pink), var(--violet));
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .dev-action-btn:hover {
            opacity: 0.9;
          }
          .dev-action-btn.secondary {
            background: #6c757d;
          }
        </style>
        <div class="dev-form-row">
          <label>育成天数</label>
          <input type="number" id="devInputDay" min="1" max="18" value="${state.day}">
          <label>日程轮次</label>
          <input type="number" id="devInputRound" min="1" max="4" value="${state.round}">
        </div>
        <div class="dev-form-row">
          <label>Vocal</label>
          <input type="number" id="devInputVo" min="0" max="3000" value="${state.Vo}">
          <label>Dance</label>
          <input type="number" id="devInputDa" min="0" max="3000" value="${state.Da}">
        </div>
        <div class="dev-form-row">
          <label>Visual</label>
          <input type="number" id="devInputVi" min="0" max="3000" value="${state.Vi}">
          <label>信赖度</label>
          <input type="number" id="devInputTrust" min="0" max="1000" value="${state.trust}">
        </div>
        <div class="dev-form-row">
          <label>当前体力</label>
          <input type="number" id="devInputStamina" min="0" max="100" value="${state.stamina}">
          <label>当前压力</label>
          <input type="number" id="devInputStress" min="0" max="100" value="${state.stress}">
        </div>
        <div class="dev-btn-group">
          <button type="button" id="devApplyBtn" class="dev-action-btn">保存并应用数值</button>
          <button type="button" id="devLiveReadyBtn" class="dev-action-btn secondary">${state.liveReady ? "取消 Live 准备就绪" : "直接准备好 First Live"}</button>
        </div>
        <div class="dev-btn-group" style="margin-top: 0;">
          <button type="button" id="devResetLiveStateBtn" class="dev-action-btn secondary">重置 First Live 状态</button>
          <button type="button" id="devInstantLiveBtn" class="dev-action-btn">直接启动最终演出</button>
        </div>
      `;
      
      body.appendChild(devPanel);
      
      document.getElementById("devApplyBtn").addEventListener("click", () => {
        state.day = clamp(parseInt(document.getElementById("devInputDay").value) || 1, 1, 18);
        state.round = clamp(parseInt(document.getElementById("devInputRound").value) || 1, 1, 4);
        state.Vo = Math.max(0, parseInt(document.getElementById("devInputVo").value) || 0);
        state.Da = Math.max(0, parseInt(document.getElementById("devInputDa").value) || 0);
        state.Vi = Math.max(0, parseInt(document.getElementById("devInputVi").value) || 0);
        state.trust = Math.max(0, parseInt(document.getElementById("devInputTrust").value) || 0);
        state.stamina = clamp(parseInt(document.getElementById("devInputStamina").value) || 100, 0, 100);
        state.stress = clamp(parseInt(document.getElementById("devInputStress").value) || 0, 0, 100);
        
        saveState();
        render();
        showToast("数值已应用", "开发数值已成功更新至本地状态。", "success");
        closeModal();
      });

      document.getElementById("devLiveReadyBtn").addEventListener("click", () => {
        state.liveReady = !state.liveReady;
        saveState();
        render();
        showToast("Live 状态已更改", `liveReady = ${state.liveReady}`, "info");
        closeModal();
      });

      document.getElementById("devResetLiveStateBtn").addEventListener("click", () => {
        state.firstLive = { completed: false, success: false, result: null };
        saveState();
        render();
        showToast("已重置 First Live", "First Live 状态已重置为未完成。", "info");
        closeModal();
      });

      document.getElementById("devInstantLiveBtn").addEventListener("click", () => {
        closeModal();
        state.liveReady = true;
        saveState();
        render();
        startFirstLive();
      });
      return;
    }

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
    if (button.dataset.action === "freechat") {
      openFreeChatOverlay();
      return;
    }
    if (button.dataset.action === "interaction") {
      openInteractionOverlay();
      return;
    }
    if (button.dataset.action === "outing") {
      openOutingOverlay();
      return;
    }
    settleAction(button.dataset.action, button.dataset.attribute);
  });

  // Handle click on "开始育成" (Confirm Idol Selection)
  document.getElementById("confirmIdolBtn").addEventListener("click", () => {
    if (!selectedIdol) return;
    
    triggerWipeTransition(() => {
      // UI Transitions: swap right panel to producer setup, update left description
      const selectPanel = document.getElementById("selectPanel");
      const producerPanel = document.getElementById("producerPanel");
      if (selectPanel) selectPanel.classList.add("is-hidden");
      if (producerPanel) producerPanel.classList.remove("is-hidden");

      const kicker = document.getElementById("selectKicker");
      const title = document.getElementById("selectTitle");
      const desc = document.getElementById("selectDesc");
      const confirmContainer = document.getElementById("selectConfirmContainer");

      if (kicker) kicker.textContent = "Producer Setup";
      if (title) title.textContent = `${selectedIdol} · 制作人合约`;
      if (desc) desc.textContent = `签署与 ${selectedIdol} 的专属育成合约。请在右侧设定您在游戏中的性格、说话风格及额外人设。`;
      if (confirmContainer) {
        confirmContainer.style.display = "none";
        confirmContainer.classList.remove("is-visible");
      }

      // Populate producer setup form with existing state if any
      document.getElementById("prodNameInput").value = state.producer?.name || "{{user}}";
      document.getElementById("prodPersonalityInput").value = state.producer?.personality || "";
      document.getElementById("prodStyleInput").value = state.producer?.style || "";
      document.getElementById("prodSettingsInput").value = state.producer?.settings || "";
    });
  });

  // Handle click on "返回选择" inside producer form
  document.getElementById("producerBackBtn").addEventListener("click", () => {
    if (!selectedIdol) return;

    triggerWipeTransition(() => {
      // UI Transitions: swap right panel back to idol list, restore left description
      const selectPanel = document.getElementById("selectPanel");
      const producerPanel = document.getElementById("producerPanel");
      if (selectPanel) selectPanel.classList.remove("is-hidden");
      if (producerPanel) producerPanel.classList.add("is-hidden");

      const kicker = document.getElementById("selectKicker");
      const title = document.getElementById("selectTitle");
      const desc = document.getElementById("selectDesc");
      const confirmContainer = document.getElementById("selectConfirmContainer");
      const profile = idols[selectedIdol];

      if (profile) {
        if (kicker) kicker.textContent = profile.tag || "Hatsuboshi Produce";
        if (title) title.textContent = selectedIdol;
        if (desc) desc.textContent = profile.bio || "";
      }
      if (confirmContainer) {
        confirmContainer.style.display = "flex";
        confirmContainer.classList.add("is-visible");
      }
    });
  });

  // Helper for quick tag clicks inside producer form
  const registerQuickTagBehavior = (containerId, inputId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".quick-tag-btn");
      if (!btn) return;
      const val = btn.dataset.val;
      const input = document.getElementById(inputId);
      if (input) {
        const current = input.value.trim();
        if (current) {
          if (!current.includes(val)) {
            input.value = `${current}、${val}`;
          }
        } else {
          input.value = val;
        }
      }
    });
  };
  registerQuickTagBehavior("prodPersonalityTags", "prodPersonalityInput");
  registerQuickTagBehavior("prodStyleTags", "prodStyleInput");

  // Handle click on "签署合约，开启星途"
  document.getElementById("producerStartBtn").addEventListener("click", () => {
    if (!selectedIdol) return;

    // Save producer settings immediately
    const name = document.getElementById("prodNameInput").value.trim() || "{{user}}";
    const personality = document.getElementById("prodPersonalityInput").value.trim();
    const style = document.getElementById("prodStyleInput").value.trim();
    const settings = document.getElementById("prodSettingsInput").value.trim();
    state.producer = { name, personality, style, settings };

    triggerWipeTransition(() => {
      // Start produce game
      applyIdolPreset(selectedIdol, true);
      startOpeningStory();
      saveState();

      // Toggle panels back to default selection layout
      const selectPanel = document.getElementById("selectPanel");
      const producerPanel = document.getElementById("producerPanel");
      if (selectPanel) selectPanel.classList.remove("is-hidden");
      if (producerPanel) producerPanel.classList.add("is-hidden");

      showToast("合约签署完成", `制作人与 ${selectedIdol} 的专属育成正式开启！`, "gold");
    });
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
  document.getElementById("eventRegenBtn").addEventListener("click", triggerRegeneration);
  document.getElementById("eventAiBtn").addEventListener("click", () => {
    setElementHidden("eventOverlay", true);
    openAiPromptOverlay();
  });
  document.getElementById("eventOverlay").addEventListener("click", (event) => {
    if (event.target.id === "eventOverlay") closeEventOverlay();
  });
  document.getElementById("sideItemLastEvent").addEventListener("click", reopenLastEvent);
  document.getElementById("sideItemStory").addEventListener("click", openAffinityModal);
  document.getElementById("aiPromptCancelBtn").addEventListener("click", closeAiPromptOverlay);
  document.getElementById("aiPromptSendBtn").addEventListener("click", submitAiPrompt);
  document.getElementById("aiPromptOverlay").addEventListener("click", (event) => {
    if (event.target.id === "aiPromptOverlay") closeAiPromptOverlay();
  });
  document.getElementById("freeChatCancelBtn").addEventListener("click", closeFreeChatOverlay);
  document.getElementById("freeChatSendBtn").addEventListener("click", submitFreeChat);
  document.getElementById("freeChatOverlay").addEventListener("click", (event) => {
    if (event.target.id === "freeChatOverlay") closeFreeChatOverlay();
  });
  document.getElementById("interactionModeSpecified").addEventListener("click", () => setInteractionMode("specified"));
  document.getElementById("interactionModeAi").addEventListener("click", () => setInteractionMode("ai"));
  document.getElementById("interactionCancelBtn").addEventListener("click", closeInteractionOverlay);
  document.getElementById("interactionSendBtn").addEventListener("click", submitIdolInteraction);
  document.getElementById("interactionOverlay").addEventListener("click", (event) => {
    if (event.target.id === "interactionOverlay") closeInteractionOverlay();
  });
  document.getElementById("outingCancelBtn").addEventListener("click", closeOutingOverlay);
  document.getElementById("outingCustomConfirmBtn").addEventListener("click", submitCustomOutingDestination);
  document.getElementById("outingOverlay").addEventListener("click", (event) => {
    if (event.target.id === "outingOverlay") closeOutingOverlay();
  });
  window.addEventListener("message", (event) => {
    const data = event.data || {};
    
    // 安全校验：允许来自父窗口（跨域 iframe 模式）、相同窗口（同域直接载入模式）或同源的消息
    const isFromParent = event.source === window.parent;
    const isFromSelf = event.source === window || event.source === null;
    const isSameOrigin = event.origin === window.location.origin;
    
    if (data.source === "hatsuboshi-produce-host") {
      console.log("[app.js] Received message from host:", data.type, "origin:", event.origin, "isFromParent:", isFromParent, "isFromSelf:", isFromSelf, "isSameOrigin:", isSameOrigin);
    }
    
    if (!isFromParent && !isFromSelf && !isSameOrigin) {
      if (data.source === "hatsuboshi-produce-host") {
        console.warn("[app.js] Origin/source validation failed. origin:", event.origin, "local:", window.location.origin);
      }
      return;
    }
    
    if (data.source !== "hatsuboshi-produce-host") return;
    if (data.type === "character") {
      console.log("[app.js] Applying character payload. Name:", data.character?.name, "SaveScope:", data.saveScope);
      applyHostCharacter(data.character, data.saveScope, data.savedState, data.hasSavedState);
    }
    if (data.type === "aiReply") applyAiReply(data.text, data.requestId, data.rawText, data.renderedText, data.isFinal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeEventOverlay();
      closeAiPromptOverlay();
      closeFreeChatOverlay();
      closeInteractionOverlay();
      closeOutingOverlay();
      if (activeModal) closeModal();
      closeNotebook();
    }
  });

  document.getElementById("dockResetRun").addEventListener("click", () => {
    if (!state.idol) return;
    const idolName = state.idol;
    triggerWipeTransition(() => {
      state = clone(baseState);
      applyIdolPreset(idolName, true);
      startOpeningStory();
      showToast("育成已重置", "保留当前担当并重建第 1 天档案。", "warn");
    });
  });

  document.getElementById("dockChangeIdol").addEventListener("click", () => {
    triggerWipeTransition(() => {
      state = clone(baseState);
      localStorage.removeItem(STORAGE_KEY);
      render();
      showToast("已返回担当选择", "请选择新的担当偶像。", "info");
    });
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
  // Expose developer commands globally
  window.produceDev = {
    setDay: (d) => { state.day = clamp(d, 1, 18); saveState(); render(); return `Day set to ${state.day}`; },
    setRound: (r) => { state.round = clamp(r, 1, 4); saveState(); render(); return `Round set to ${state.round}`; },
    setStamina: (s) => { state.stamina = clamp(s, 0, 100); saveState(); render(); return `Stamina set to ${state.stamina}`; },
    setStress: (s) => { state.stress = clamp(s, 0, 100); saveState(); render(); return `Stress set to ${state.stress}`; },
    setTrust: (t) => { state.trust = Math.max(0, t); saveState(); render(); return `Trust set to ${state.trust}`; },
    setStats: (vo, da, vi) => { state.Vo = Math.max(0, vo); state.Da = Math.max(0, da); state.Vi = Math.max(0, vi); saveState(); render(); return `Stats set to Vo: ${state.Vo}, Da: ${state.Da}, Vi: ${state.Vi}`; },
    setLiveReady: (b) => { state.liveReady = Boolean(b); saveState(); render(); return `LiveReady set to ${state.liveReady}`; },
    resetLiveState: () => { state.firstLive = { completed: false, success: false, result: null }; saveState(); render(); return "First Live state reset."; },
    triggerLive: () => { state.liveReady = true; saveState(); render(); startFirstLive(); return "First Live started."; }
  };

  ensureStateShape();
  refreshAffinityUnlocks();
  saveState();
  render();
  bgmManager.init();
  updateBgm();
  if (!isSillyTavernHost()) resumeOpeningIfNeeded();
  requestHostCharacter();

  // ── Splash Screen 自动退出 ──
  const splashEl = document.getElementById("splashScreen");
  if (splashEl) {
    const dismissSplash = () => {
      if (splashEl.classList.contains("is-dismissed")) return;
      splashEl.classList.add("is-dismissed");
    };
    // 点击任意位置可跳过
    splashEl.style.pointerEvents = "auto";
    splashEl.addEventListener("click", dismissSplash, { once: true });
    // 动画结束后自动从 DOM 中移除
    splashEl.addEventListener("animationend", (e) => {
      if (e.target === splashEl) {
        splashEl.remove();
      }
    });
  }

  // Global error handler to catch and display unhandled runtime exceptions in toasts
  window.addEventListener("error", (event) => {
    try {
      const errMsg = event.error ? event.error.stack || event.error.message : event.message;
      showToast("系统脚本错误", errMsg, "error");
    } catch (e) {
      console.error("Error logging failed:", e);
    }
  });
})();
