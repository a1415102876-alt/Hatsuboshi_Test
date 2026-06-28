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
      background: "./assets/idols/fujita-kotone.png",
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
      background: "./assets/idols/tsukimura-temari.png",
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
      background: "./assets/idols/hanami-saki.png",
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
      tag: "辣妹 / <s>喜多川海梦</s>",
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
      tag: "MAO / <s>円香</s>",
      bio: "目标是成为帅气的偶像的三年级女孩，同时也是初星学园偶像科宿舍的宿舍长，很会照顾人。被后辈们视为小王子（Little Prince）的存在，深受尊敬。从小就憧憬歌剧明星，过去曾以童星的身份活跃。",
      theme: "#A453A6",
      background: "./assets/idols/arimura-mao.png",
      avatar: "./assets/avatars/arimura-mao.png",
      core: "永远屈居星南之下的No.2执念——既渴望超越又藏着惜与依赖；把'怕再输'的自我设限伪装成好强与嘴硬的铠甲；完美副会长外壳与私藏的动画宅柔软内里相互拉扯；终极成长是从'为追上星南而活'走向'为自己而赢'。",
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
    },
    "雨夜燕": {
      tag: "雨姐 / 黑色毛球",
      bio: "初星学园的学生会副会长，学园第二名的偶像，拥有与实力相应的自豪感并且态度傲慢。虽然对自己和别人都很严格，但是很会照顾人。视青梅竹马的星南为竞争对手，并且公开宣称总有一天要超过星南成为“一番星”。",
      theme: "#a396f3",
      background: "./assets/idols/amaya-tsubame.png",
      avatar: "./assets/avatars/amaya-tsubame.png",
      core: "雨夜燕的正式人物定位待补充；当前占位为沉静、敏锐、带有雨夜意象的偶像候补。",
      styles: {
        lesson: "一丝不苟、提前做足功课，绝不容许自己在课堂上出错——上课也是不能输给星南的战场。偶尔因熬夜补番硬撑着，但死不承认。",
        training: "给自己加码、练到超出要求的量，死撑也不喊停。把每次训练都当成追赶星南的筹码，却要面子，不肯让人看出自己已经到极限。",
        outing: "嘴上把外出说成'考察''顺路'，绝不承认是想一起玩；实则会借机绕去动漫店或周边店，被撞见就慌乱否认。外出是她难得卸下No.2外壳、露出宅趣味的场合。",
        companion: "她的陪伴是别扭、训斥式的——用毒舌包装关心（'这点小事都不会，真拿你没办法'）。亲近后会暴露想被陪、怕一个人的一面却绝不直说；独占欲化作'你是我的制作人，别老往别人那边跑'。",
        rest: "最不擅长休息——闲不下来就找事做、复盘，或偷偷补番。真正放松只在确信没人看的时候；在制作人面前从硬撑'我不累'到肯卸力，是她交付信任的标志。"
      }
    }
  };

  const idolPresets = {
    "藤田琴音": [90, 90, 120, 8, 29.5, 25.5, 1030, 1510, 1580, 1730, 2210, 2280],
    "月村手毬": [120, 100, 80, 27, 22.5, 11.5, 1580, 1370, 970, 2280, 2080, 1580],
    "花海咲季": [100, 100, 105, 16.5, 16.5, 20.5, 1280, 1280, 1360, 1930, 1930, 2030],
    "秦谷美铃": [95, 125, 140, 27, 13, 20, 1480, 1080, 1390, 2180, 1680, 2050],
    "篠泽广": [70, 55, 120, 22, 8, 26, 1180, 820, 1450, 1880, 1420, 2150],
    "十王星南": [175, 125, 140, 15, 8, 20.5, 1280, 1050, 1500, 1930, 1650, 2200],
    "花海祐芽": [120, 115, 110, 24, 24, 20, 1500, 1480, 1380, 2200, 2180, 2080],
    "仓本千奈": [75, 115, 125, 10, 24, 20.5, 1050, 1520, 1450, 1650, 2220, 2150],
    "葛城莉莉娅": [80, 100, 115, 18, 20, 18, 1300, 1380, 1450, 2000, 2080, 2150],
    "紫云清夏": [100, 115, 90, 9, 23, 23, 1050, 1500, 1450, 1650, 2200, 2150],
    "有村麻央": [125, 90, 100, 22, 8, 23, 1480, 950, 1500, 2180, 1550, 2200],
    "姬崎莉波": [85, 120, 125, 13, 21.5, 25.5, 1100, 1430, 1580, 1800, 2130, 2280],
    "雨夜燕": [115, 125, 100, 20, 23, 17, 1300, 1350, 1150, 2100, 2250, 1800]
  };

  const exactPresetIdols = new Set(["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃"]);
  const idolAliases = {
    "花海佑芽": "花海祐芽",
    "佑芽": "花海祐芽",
    "祐芽": "花海祐芽",
    "藤田 琴音": "藤田琴音",
    "琴音": "藤田琴音",
    "月村 手毬": "月村手毬",
    "手毬": "月村手毬",
    "花海 咲季": "花海咲季",
    "咲季": "花海咲季",
    "篠泽 广": "篠泽广",
    "篠泽广": "篠泽广",
    "篠澤廣": "篠泽广",
    "广": "篠泽广",
    "篠澤 廣": "篠泽广",
    "十王 星南": "十王星南",
    "星南": "十王星南",
    "秦谷 美铃": "秦谷美铃",
    "秦谷美铃": "秦谷美铃",
    "秦谷美鈴": "秦谷美铃",
    "美铃": "秦谷美铃",
    "美鈴": "秦谷美铃",
    "仓本 千奈": "仓本千奈",
    "千奈": "仓本千奈",
    "葛城 莉莉娅": "葛城莉莉娅",
    "葛城莉莉雅": "葛城莉莉娅",
    "莉莉娅": "葛城莉莉娅",
    "莉莉雅": "葛城莉莉娅",
    "紫云 清夏": "紫云清夏",
    "清夏": "紫云清夏",
    "有村 麻央": "有村麻央",
    "麻央": "有村麻央",
    "姬崎 莉波": "姬崎莉波",
    "莉波": "姬崎莉波",
    "雨夜 燕": "雨夜燕",
    "燕": "雨夜燕"
  };
  const selectBackgroundCodes = {
    "雨夜燕": "amaya"
  };
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
    "姬崎莉波": "RINAMI",
    "雨夜燕": "TSUBAME"
  };
  const idolSchoolClasses = {
    "紫云清夏": "1年1班",
    "葛城莉莉娅": "1年1班",
    "藤田琴音": "1年1班",
    "月村手毬": "1年1班",
    "花海咲季": "1年1班",
    "篠泽广": "1年2班",
    "花海祐芽": "1年2班",
    "秦谷美铃": "1年2班",
    "仓本千奈": "1年2班",
    "十王星南": "3年1班",
    "雨夜燕": "3年1班",
    "有村麻央": "3年1班",
    "姬崎莉波": "3年1班"
  };
  const interactionCharacters = ["藤田琴音", "月村手毬", "花海咲季", "秦谷美铃", "篠泽广", "十王星南", "花海祐芽", "仓本千奈", "紫云清夏", "葛城莉莉娅", "有村麻央", "姬崎莉波", "雨夜燕"];
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
  const FREE_MODE_OUTING_DESTINATIONS = [
    { name: "商店街", description: "小吃、饮料和便宜日用品，适合放学后闲逛与偶遇。" },
    { name: "购物中心", description: "买衣服、逛店，寻找舞台服装或私服灵感。" },
    { name: "游戏厅", description: "轻松竞技、游戏反差和不服输挑战。" },
    { name: "游乐园", description: "约会感、胆量与体力对比，适合关系推进。" },
    { name: "拉面店", description: "高热量美食与饮食管理，尤其容易触发手毬的反应。" },
    { name: "琴音打工的快餐店", description: "打工、收入、家庭压力，以及努力被看见的地方。" }
  ];
  const FREE_MODE_OUTING_LOCATION_ID = "free_outing";
  const WORLD_MAP_LOCATION_SCENES = {
    school_entrance: "./assets/scenes/School_Entrance.png",
    club_room: "./assets/scenes/campus.png",
    auditorium: "./assets/scenes/Auditorium.png",
    outstage: "./assets/scenes/OutStage.png",
    playground: "./assets/scenes/Playground.png",
    swimming_pool: "./assets/scenes/Swimming_Pool.png",
    gymnasium: "./assets/scenes/Gymnasium.png",
    idol_classroom: "./assets/scenes/IDOL_Class.png",
    special_education: "./assets/scenes/SpecialEducation_Detailed.png",
    producer_classroom: "./assets/scenes/Producer_Class.png",
    dining_hall: "./assets/scenes/Dining.png",
    student_store: "./assets/scenes/Student Store.png",
    [FREE_MODE_OUTING_LOCATION_ID]: "./assets/scenes/campus.png"
  };
  const FINAL_LIVE_DAY = 22;
  const SUMMARY_ROUND = 5;
  const INTIMACY_UNLOCK_TRUST = 60;
  const INTIMACY_NSFW_UNLOCK_TRUST = 100;
  const INTIMACY_NORMAL_TRUST_GAIN = 20;
  const WORLD_MAP_IMAGE_DAY = "./assets/MAP/Gakuen.png";
  const WORLD_MAP_IMAGE_DUSK = "./assets/MAP/Gakuen_Dawn.png";
  const WORLD_MAP_IMAGE_NIGHT = "./assets/MAP/Gakuen_Night.png";
  const FREE_MODE_MAP_DUSK_START_MINUTES = 17 * 60;
  const FREE_MODE_MAP_NIGHT_START_MINUTES = 20 * 60;
  const WORLD_MAP_LOCATIONS = [
    { id: "school_entrance", name: "学园正门", shortLabel: "正门", description: "初星学园的入口。新生、访客与偶像们每天经过这里。", x: 52.8, y: 96.8, image: "./assets/MAP/School_Entrance.png" },
    { id: "club_room", name: "部室栋", shortLabel: "部室", description: "各社团与活动部室所在的楼栋，日常练习与准备常在这里进行。", x: 17.8, y: 39.6, image: "" },
    { id: "auditorium", name: "讲堂", shortLabel: "讲堂", description: "拥有圆顶的大型讲堂，学园重要集会与发表会在此举行。", x: 50.8, y: 33, image: "./assets/MAP/MeetingRoom.png" },
    { id: "outstage", name: "野外舞台", shortLabel: "野外", description: "学园右上角的公开舞台，适合排练、试演与小型演出。", x: 80.3, y: 13.7, image: "./assets/MAP/OutStage.png" },
    { id: "playground", name: "运动场", shortLabel: "操场", description: "带跑道与足球场的运动区，体能训练与户外练习的主要场地。", x: 26.3, y: 52.3, image: "./assets/MAP/PlayGround.png" },
    { id: "swimming_pool", name: "泳池", shortLabel: "泳池", description: "室内游泳设施，体能与恢复训练时会来到这里。", x: 37.5, y: 84.9, image: "./assets/MAP/SwimmingPool.png" },
    { id: "gymnasium", name: "体育馆", shortLabel: "体育馆", description: "学园中央的室内体育馆，各类体能与舞台基础训练在此进行。", x: 52.2, y: 63.7, image: "./assets/MAP/Gymnasium.png" },
    { id: "idol_classroom", name: "偶像科教室", shortLabel: "偶像", description: "偶像们上课、讨论与彼此较量的教室区域。", x: 82.3, y: 61.2, image: "./assets/MAP/Idol_Classroom_Detailed.png" },
    { id: "special_education", name: "特别教育栋", shortLabel: "特教", description: "特别教育科所在的楼栋，藏着更多学园内幕与特殊课程。", x: 90, y: 55, image: "./assets/MAP/SpecialEducation_Detailed.png" },
    { id: "producer_classroom", name: "制作人科教室", shortLabel: "P科", description: "培育担当偶像的专属教室，也是日常育成的主舞台。", x: 84.5, y: 93.9, image: "./assets/MAP/Producer_Classroom_Detailed.png" },
    { id: "dining_hall", name: "食堂", shortLabel: "食堂", description: "学园内的用餐区，午餐、点心与偶像们的日常闲聊常在这里发生。", x: 87.2, y: 86.4, image: "./assets/MAP/Dining.png" },
    { id: "student_store", name: "小卖部", shortLabel: "小卖", description: "贩卖零食、文具与小物件的校内商店，适合短暂停留与偶遇。", x: 92.8, y: 85.6, image: "./assets/MAP/Student Store.png" }
  ];
  const WORLD_MAP_LAYOUT_VERSION = 1;
  const WORLD_MAP_LAYOUT_STORAGE_KEY = "hatsuProduceWorldMapLayout";
  const WORLD_MAP_LAYOUT_FILE = "./assets/MAP/world-map-layout.json";
  const FREE_MODE_DAY_START_MINUTES = 8 * 60;
  const FREE_MODE_DAY_END_MINUTES = 22 * 60;
  const FREE_MODE_MAP_ARRIVAL_MINUTES = 15;
  const FREE_MODE_MAP_CHOICE_MINUTES = 15;
  const FREE_MODE_MAP_MINUTES_MAX = 120;
  const FREE_MODE_PRESENCE_CHANCE = 0.2;
  const worldMapLayoutState = {
    overrides: {},
    mapFit: "cover",
    editorActive: false,
    drag: null
  };
  const PHONE_CHAT_LINE_DELAY_MS = 2800;
  const phoneAppRegistry = [
    {
      id: "line",
      name: "LINE",
      subtitle: "聊天",
      theme: "#06c755",
      iconText: "L",
      installed: true
    },
    {
      id: "music",
      name: "音乐",
      subtitle: "音乐",
      theme: "#1db954",
      iconText: "M",
      installed: true
    }
  ];

  // 音乐文件托管在 R2（与 Live 视频同一桶，桶内同名 PlayList 文件夹）。换桶只改这一行。
  const MUSIC_CDN = "https://pub-cfdeb8f85de84d8193695eca002e7880.r2.dev";
  // 把歌单里的相对 key（PlayList/...）拼成完整地址，并对路径分段做 URI 编码。
  function musicUrl(key) {
    if (!key) return "";
    if (/^https?:\/\//i.test(key)) return key;
    return MUSIC_CDN + "/" + key.split("/").map(encodeURIComponent).join("/");
  }

  // 歌单数据：由 generate-playlist.cjs 自动写入，请勿手改。重新生成: node generate-playlist.cjs
  // === HATSU_MUSIC_TRACKS_START ===
  const phoneMusicTracks = [
    { title: "Campus mode!!", artist: "初星学園", file: "PlayList/初星学園 - Campus mode!!.mp3", cover: "PlayList/covers/初星学園 - Campus mode!!.jpg" },
    { title: "初", artist: "初星学園", file: "PlayList/初星学園 - 初.mp3", cover: "PlayList/covers/初星学園 - 初.jpg" },
    { title: "VEIL", artist: "GUCCHO / Dubscribe / 秦谷美鈴", file: "PlayList/初星学園, GUCCHO, Dubscribe, 秦谷美鈴 - VEIL.mp3", cover: "PlayList/covers/初星学園, GUCCHO, Dubscribe, 秦谷美鈴 - VEIL.jpg" },
    { title: "MY STAGE", artist: "MOMONADY / YUKI FUNAKOSHI / 雨夜 燕", file: "PlayList/初星学園, MOMONADY, YUKI FUNAKOSHI, 雨夜 燕 - MY STAGE.mp3", cover: "PlayList/covers/初星学園, MOMONADY, YUKI FUNAKOSHI, 雨夜 燕 - MY STAGE.jpg" },
    { title: "三分半の創世", artist: "Shuntaro / 雨夜 燕", file: "PlayList/初星学園, Shuntaro, 雨夜 燕 - 三分半の創世.mp3", cover: "PlayList/covers/初星学園, Shuntaro, 雨夜 燕 - 三分半の創世.jpg" },
    { title: "ガラクタロード", artist: "佐藤貴文", file: "PlayList/初星学園, 佐藤貴文 - ガラクタロード.mp3", cover: "PlayList/covers/初星学園, 佐藤貴文 - ガラクタロード.jpg" },
    { title: "SUGAR FLAVOR", artist: "有村麻央 / 姫崎莉波", file: "PlayList/初星学園, 有村麻央, 姫崎莉波 - SUGAR FLAVOR.mp3", cover: "PlayList/covers/初星学園, 有村麻央, 姫崎莉波 - SUGAR FLAVOR.jpg" },
    { title: "わかし・さわがし・スカパンク", artist: "AYATOMO / 木村孝明", file: "PlayList/初星学園,AYATOMO,木村孝明 - わかし・さわがし・スカパンク.mp3", cover: "PlayList/covers/初星学園,AYATOMO,木村孝明 - わかし・さわがし・スカパンク.jpg" },
    { title: "Feel Jewel Dream", artist: "DE DE MOUSE / 有村麻央", file: "PlayList/初星学園,DE DE MOUSE,有村麻央 - Feel Jewel Dream.mp3", cover: "PlayList/covers/初星学園,DE DE MOUSE,有村麻央 - Feel Jewel Dream.jpg" },
    { title: "空と約束", artist: "Evan Call / 倉本千奈", file: "PlayList/初星学園,Evan Call,倉本千奈 - 空と約束.mp3", cover: "PlayList/covers/初星学園,Evan Call,倉本千奈 - 空と約束.jpg" },
    { title: "Fighting My Way", artist: "Giga / 花海咲季", file: "PlayList/初星学園,Giga,花海咲季 - Fighting My Way.mp3", cover: "PlayList/covers/初星学園,Giga,花海咲季 - Fighting My Way.png" },
    { title: "Wildest Flower", artist: "Giga / 花海咲季", file: "PlayList/初星学園,Giga,花海咲季 - Wildest Flower.mp3", cover: "PlayList/covers/初星学園,Giga,花海咲季 - Wildest Flower.jpg" },
    { title: "Atmosphere", artist: "Heart's Cry / 葛城リーリヤ", file: "PlayList/初星学園,Heart's Cry,葛城リーリヤ - Atmosphere.mp3", cover: "PlayList/covers/初星学園,Heart's Cry,葛城リーリヤ - Atmosphere.jpg" },
    { title: "世界一可愛い私", artist: "HoneyWorks / 藤田ことね", file: "PlayList/初星学園,HoneyWorks,藤田ことね - 世界一可愛い私.mp3", cover: "PlayList/covers/初星学園,HoneyWorks,藤田ことね - 世界一可愛い私.jpg" },
    { title: "見て", artist: "kamome sano / 有村麻央", file: "PlayList/初星学園,kamome sano,有村麻央 - 見て.mp3", cover: "PlayList/covers/初星学園,kamome sano,有村麻央 - 見て.jpg" },
    { title: "EGO", artist: "Kijibato / 花海咲季", file: "PlayList/初星学園,Kijibato,花海咲季 - EGO.mp3", cover: "PlayList/covers/初星学園,Kijibato,花海咲季 - EGO.jpg" },
    { title: "Try it now", artist: "Kijibato / 花海咲季", file: "PlayList/初星学園,Kijibato,花海咲季 - Try it now.mp3", cover: "PlayList/covers/初星学園,Kijibato,花海咲季 - Try it now.jpg" },
    { title: "Let's GO!! ICHI-NO-NI!!", artist: "midori nao / 倉本千奈", file: "PlayList/初星学園,midori nao,倉本千奈 - Let's GO!! ICHI-NO-NI!!.mp3", cover: "PlayList/covers/初星学園,midori nao,倉本千奈 - Let's GO!! ICHI-NO-NI!!.jpg" },
    { title: "Fluorite", artist: "Moe Shop / 有村麻央", file: "PlayList/初星学園,Moe Shop,有村麻央 - Fluorite.mp3", cover: "PlayList/covers/初星学園,Moe Shop,有村麻央 - Fluorite.jpg" },
    { title: "Cosmetic", artist: "MOMONADY / Yuki Funakoshi", file: "PlayList/初星学園,MOMONADY,Yuki Funakoshi - Cosmetic.mp3", cover: "PlayList/covers/初星学園,MOMONADY,Yuki Funakoshi - Cosmetic.jpg" },
    { title: "ヨルニテ", artist: "Shogo Nomura / 秦谷美鈴", file: "PlayList/初星学園,Shogo Nomura,秦谷美鈴 - ヨルニテ.mp3", cover: "PlayList/covers/初星学園,Shogo Nomura,秦谷美鈴 - ヨルニテ.jpg" },
    { title: "Sweet Magic", artist: "SHOW / 有村麻央", file: "PlayList/初星学園,SHOW,有村麻央 - Sweet Magic.mp3", cover: "PlayList/covers/初星学園,SHOW,有村麻央 - Sweet Magic.jpg" },
    { title: "Top Secret", artist: "SHOW / 有村麻央", file: "PlayList/初星学園,SHOW,有村麻央 - Top Secret.mp3", cover: "PlayList/covers/初星学園,SHOW,有村麻央 - Top Secret.jpg" },
    { title: "Superlative", artist: "siqlo / 秦谷美鈴", file: "PlayList/初星学園,siqlo,秦谷美鈴 - Superlative.mp3", cover: "PlayList/covers/初星学園,siqlo,秦谷美鈴 - Superlative.jpg" },
    { title: "SUPREMACY", artist: "アオワイファイ / 花海咲季", file: "PlayList/初星学園,アオワイファイ,花海咲季 - SUPREMACY.mp3", cover: "PlayList/covers/初星学園,アオワイファイ,花海咲季 - SUPREMACY.jpg" },
    { title: "みちなるひろがる", artist: "いよわ / 倉本千奈", file: "PlayList/初星学園,いよわ,倉本千奈 - みちなるひろがる.mp3", cover: "PlayList/covers/初星学園,いよわ,倉本千奈 - みちなるひろがる.jpg" },
    { title: "Star-mine", artist: "じん / Begrazia", file: "PlayList/初星学園,じん,Begrazia - Star-mine.mp3", cover: "PlayList/covers/初星学園,じん,Begrazia - Star-mine.jpg" },
    { title: "アイヴイ", artist: "ツミキ / 月村手毬", file: "PlayList/初星学園,ツミキ,月村手毬 - アイヴイ.mp3", cover: "PlayList/covers/初星学園,ツミキ,月村手毬 - アイヴイ.jpg" },
    { title: "ハッピーミルフィーユ", artist: "ナナホシ管弦楽団 / 篠澤 広", file: "PlayList/初星学園,ナナホシ管弦楽団,篠澤 広 - ハッピーミルフィーユ.mp3", cover: "PlayList/covers/初星学園,ナナホシ管弦楽団,篠澤 広 - ハッピーミルフィーユ.jpg" },
    { title: "自己肯定感爆上げ↑↑しゅきしゅきソング", artist: "ヒゲドライバー / 藤田ことね", file: "PlayList/初星学園,ヒゲドライバー,藤田ことね - 自己肯定感爆上げ↑↑しゅきしゅきソング.mp3", cover: "PlayList/covers/初星学園,ヒゲドライバー,藤田ことね - 自己肯定感爆上げ↑↑しゅきしゅきソング.jpg" },
    { title: "メクルメ", artist: "フロクロ / 篠澤 広", file: "PlayList/初星学園,フロクロ,篠澤 広 - メクルメ.mp3", cover: "PlayList/covers/初星学園,フロクロ,篠澤 広 - メクルメ.jpg" },
    { title: "たいせつなもの", artist: "フワリ / 秦谷美鈴", file: "PlayList/初星学園,フワリ,秦谷美鈴 - たいせつなもの.mp3", cover: "PlayList/covers/初星学園,フワリ,秦谷美鈴 - たいせつなもの.jpg" },
    { title: "ツキノカメ", artist: "ミフメイ / 秦谷美鈴", file: "PlayList/初星学園,ミフメイ,秦谷美鈴 - ツキノカメ.mp3", cover: "PlayList/covers/初星学園,ミフメイ,秦谷美鈴 - ツキノカメ.jpg" },
    { title: "赤裸々", artist: "岡部啓一 / 十王星南", file: "PlayList/初星学園,岡部啓一,十王星南 - 赤裸々.mp3", cover: "PlayList/covers/初星学園,岡部啓一,十王星南 - 赤裸々.jpg" },
    { title: "Boom Boom Pow", artist: "花海咲季", file: "PlayList/初星学園,花海咲季 - Boom Boom Pow.mp3", cover: "PlayList/covers/初星学園,花海咲季 - Boom Boom Pow.jpg" },
    { title: "ENDLESS DANCE (花海佑芽・秦谷美鈴・十王星南 ver.)", artist: "花海佑芽 / 秦谷美鈴", file: "PlayList/初星学園,花海佑芽,秦谷美鈴 - ENDLESS DANCE (花海佑芽・秦谷美鈴・十王星南 ver.).mp3", cover: "PlayList/covers/初星学園,花海佑芽,秦谷美鈴 - ENDLESS DANCE (花海佑芽・秦谷美鈴・十王星南 ver.).jpg" },
    { title: "Fragile Heart", artist: "葛城リーリヤ", file: "PlayList/初星学園,葛城リーリヤ - Fragile Heart.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ - Fragile Heart.jpg" },
    { title: "Wake up!!", artist: "葛城リーリヤ", file: "PlayList/初星学園,葛城リーリヤ - Wake up!!.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ - Wake up!!.jpg" },
    { title: "極光", artist: "葛城リーリヤ", file: "PlayList/初星学園,葛城リーリヤ - 極光.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ - 極光.jpg" },
    { title: "白線", artist: "葛城リーリヤ / ナユタン星人", file: "PlayList/初星学園,葛城リーリヤ,ナユタン星人 - 白線.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ,ナユタン星人 - 白線.jpg" },
    { title: "冠菊", artist: "葛城リーリヤ / 花海咲季", file: "PlayList/初星学園,葛城リーリヤ,花海咲季 - 冠菊.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ,花海咲季 - 冠菊.jpg" },
    { title: "White Night! White Wish!", artist: "葛城リーリヤ / 花海佑芽", file: "PlayList/初星学園,葛城リーリヤ,花海佑芽 - White Night! White Wish!.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ,花海佑芽 - White Night! White Wish!.jpg" },
    { title: "桜フォトグラフ", artist: "葛城リーリヤ / 紫雲清夏", file: "PlayList/初星学園,葛城リーリヤ,紫雲清夏 - 桜フォトグラフ.mp3", cover: "PlayList/covers/初星学園,葛城リーリヤ,紫雲清夏 - 桜フォトグラフ.jpg" },
    { title: "The Cute!!!", artist: "金山秀士 / 藤田ことね", file: "PlayList/初星学園,金山秀士,藤田ことね - The Cute!!!.mp3", cover: "PlayList/covers/初星学園,金山秀士,藤田ことね - The Cute!!!.jpg" },
    { title: "Unhappy Light", artist: "月村手毬", file: "PlayList/初星学園,月村手毬 - Unhappy Light.mp3", cover: "PlayList/covers/初星学園,月村手毬 - Unhappy Light.jpg" },
    { title: "一体いつから", artist: "月村手毬", file: "PlayList/初星学園,月村手毬 - 一体いつから.mp3", cover: "PlayList/covers/初星学園,月村手毬 - 一体いつから.jpg" },
    { title: "Wonder Scale", artist: "兼松衆 / 倉本千奈", file: "PlayList/初星学園,兼松衆,倉本千奈 - Wonder Scale.mp3", cover: "PlayList/covers/初星学園,兼松衆,倉本千奈 - Wonder Scale.jpg" },
    { title: "憧れをいっぱい", artist: "高木龍一 / 倉本千奈", file: "PlayList/初星学園,高木龍一,倉本千奈 - 憧れをいっぱい.mp3", cover: "PlayList/covers/初星学園,高木龍一,倉本千奈 - 憧れをいっぱい.jpg" },
    { title: "コントラスト", artist: "佐々木恵梨 / 鵜飼大幹", file: "PlayList/初星学園,佐々木恵梨,鵜飼大幹 - コントラスト.mp3", cover: "PlayList/covers/初星学園,佐々木恵梨,鵜飼大幹 - コントラスト.jpg" },
    { title: "The Rolling Riceball", artist: "佐藤貴文 / 花海佑芽", file: "PlayList/初星学園,佐藤貴文,花海佑芽 - The Rolling Riceball.mp3", cover: "PlayList/covers/初星学園,佐藤貴文,花海佑芽 - The Rolling Riceball.jpg" },
    { title: "グースーピー", artist: "佐藤貴文 / 花海佑芽", file: "PlayList/初星学園,佐藤貴文,花海佑芽 - グースーピー.mp3", cover: "PlayList/covers/初星学園,佐藤貴文,花海佑芽 - グースーピー.jpg" },
    { title: "真っ白いページと水彩の主人公", artist: "佐藤貴文 / 花海佑芽", file: "PlayList/初星学園,佐藤貴文,花海佑芽 - 真っ白いページと水彩の主人公.mp3", cover: "PlayList/covers/初星学園,佐藤貴文,花海佑芽 - 真っ白いページと水彩の主人公.jpg" },
    { title: "ナイワ", artist: "佐伯ユウスケ / 3年1組", file: "PlayList/初星学園,佐伯ユウスケ,3年1組 - ナイワ.mp3", cover: "PlayList/covers/初星学園,佐伯ユウスケ,3年1組 - ナイワ.jpg" },
    { title: "Kira Kira", artist: "紫雲清夏", file: "PlayList/初星学園,紫雲清夏 - Kira Kira.mp3", cover: "PlayList/covers/初星学園,紫雲清夏 - Kira Kira.jpg" },
    { title: "Love & Joy", artist: "紫雲清夏", file: "PlayList/初星学園,紫雲清夏 - Love & Joy.mp3", cover: "PlayList/covers/初星学園,紫雲清夏 - Love & Joy.jpg" },
    { title: "Tame-Lie-One-Step", artist: "紫雲清夏", file: "PlayList/初星学園,紫雲清夏 - Tame-Lie-One-Step.mp3", cover: "PlayList/covers/初星学園,紫雲清夏 - Tame-Lie-One-Step.jpg" },
    { title: "カクシタワタシ", artist: "紫雲清夏", file: "PlayList/初星学園,紫雲清夏 - カクシタワタシ.mp3", cover: "PlayList/covers/初星学園,紫雲清夏 - カクシタワタシ.jpg" },
    { title: "サンフェーデッド", artist: "篠澤 広", file: "PlayList/初星学園,篠澤 広 - サンフェーデッド.mp3", cover: "PlayList/covers/初星学園,篠澤 広 - サンフェーデッド.jpg" },
    { title: "光景", artist: "篠澤 広", file: "PlayList/初星学園,篠澤 広 - 光景.mp3", cover: "PlayList/covers/初星学園,篠澤 広 - 光景.jpg" },
    { title: "Choo Choo Choo", artist: "十王星南", file: "PlayList/初星学園,十王星南 - Choo Choo Choo.mp3", cover: "PlayList/covers/初星学園,十王星南 - Choo Choo Choo.jpg" },
    { title: "理論武装して", artist: "松隈ケンタ / 雨夜 燕", file: "PlayList/初星学園,松隈ケンタ,雨夜 燕 - 理論武装して.mp3", cover: "PlayList/covers/初星学園,松隈ケンタ,雨夜 燕 - 理論武装して.jpg" },
    { title: "コンテンポラリのダンス", artist: "真島ゆろ / 篠澤 広", file: "PlayList/初星学園,真島ゆろ,篠澤 広 - コンテンポラリのダンス.mp3", cover: "PlayList/covers/初星学園,真島ゆろ,篠澤 広 - コンテンポラリのダンス.jpg" },
    { title: "ときめきエモーション", artist: "神山羊 / 葛城リーリヤ", file: "PlayList/初星学園,神山羊,葛城リーリヤ - ときめきエモーション.mp3", cover: "PlayList/covers/初星学園,神山羊,葛城リーリヤ - ときめきエモーション.jpg" },
    { title: "雨上がりのアイリス", artist: "神前暁 / Re;IRIS", file: "PlayList/初星学園,神前暁,Re;IRIS - 雨上がりのアイリス.mp3", cover: "PlayList/covers/初星学園,神前暁,Re;IRIS - 雨上がりのアイリス.jpg" },
    { title: "marble heart", artist: "須藤幽玄 / 姫崎莉波", file: "PlayList/初星学園,須藤幽玄,姫崎莉波 - marble heart.mp3", cover: "PlayList/covers/初星学園,須藤幽玄,姫崎莉波 - marble heart.jpg" },
    { title: "ときめきのソルフェージュ", artist: "倉本千奈", file: "PlayList/初星学園,倉本千奈 - ときめきのソルフェージュ.mp3", cover: "PlayList/covers/初星学園,倉本千奈 - ときめきのソルフェージュ.jpg" },
    { title: "仮装狂騒曲", artist: "倉本千奈 / 月村手毬", file: "PlayList/初星学園,倉本千奈,月村手毬 - 仮装狂騒曲.mp3", cover: "PlayList/covers/初星学園,倉本千奈,月村手毬 - 仮装狂騒曲.jpg" },
    { title: "古今東西ちょちょいのちょい (花海咲季・月村手毬・藤田ことね ver.)", artist: "大澤めい / 花海咲季", file: "PlayList/初星学園,大澤めい,花海咲季 - 古今東西ちょちょいのちょい (花海咲季・月村手毬・藤田ことね ver.).mp3", cover: "PlayList/covers/初星学園,大澤めい,花海咲季 - 古今東西ちょちょいのちょい (花海咲季・月村手毬・藤田ことね ver.).jpg" },
    { title: "金の斧、銀の斧、エメラルドの斧", artist: "大澤めい / 花海佑芽", file: "PlayList/初星学園,大澤めい,花海佑芽 - 金の斧、銀の斧、エメラルドの斧.mp3", cover: "PlayList/covers/初星学園,大澤めい,花海佑芽 - 金の斧、銀の斧、エメラルドの斧.jpg" },
    { title: "Our Chant", artist: "中鶴潤一 / Fra", file: "PlayList/初星学園,中鶴潤一,Fra - Our Chant.mp3", cover: "PlayList/covers/初星学園,中鶴潤一,Fra - Our Chant.jpg" },
    { title: "小さな野望", artist: "椎名豪 / 十王星南", file: "PlayList/初星学園,椎名豪,十王星南 - 小さな野望.mp3", cover: "PlayList/covers/初星学園,椎名豪,十王星南 - 小さな野望.jpg" },
    { title: "つよつよ最強エクササイズ", artist: "坪井リヒト / 佐藤貴文", file: "PlayList/初星学園,坪井リヒト,佐藤貴文 - つよつよ最強エクササイズ.mp3", cover: "PlayList/covers/初星学園,坪井リヒト,佐藤貴文 - つよつよ最強エクササイズ.jpg" },
    { title: "叶えたい、ことばかり", artist: "田中透真 / 月村手毬", file: "PlayList/初星学園,田中透真,月村手毬 - 叶えたい、ことばかり.mp3", cover: "PlayList/covers/初星学園,田中透真,月村手毬 - 叶えたい、ことばかり.jpg" },
    { title: "Ride on Beat", artist: "田中龍志 / 柿迫ヒカル", file: "PlayList/初星学園,田中龍志,柿迫ヒカル - Ride on Beat.mp3", cover: "PlayList/covers/初星学園,田中龍志,柿迫ヒカル - Ride on Beat.jpg" },
    { title: "clumsy trick", artist: "渡辺翔 / 姫崎莉波", file: "PlayList/初星学園,渡辺翔,姫崎莉波 - clumsy trick.mp3", cover: "PlayList/covers/初星学園,渡辺翔,姫崎莉波 - clumsy trick.jpg" },
    { title: "ふわふわ", artist: "藤田ことね", file: "PlayList/初星学園,藤田ことね - ふわふわ.mp3", cover: "PlayList/covers/初星学園,藤田ことね - ふわふわ.jpg" },
    { title: "歌声は君いろ", artist: "姫崎莉波", file: "PlayList/初星学園,姫崎莉波 - 歌声は君いろ.mp3", cover: "PlayList/covers/初星学園,姫崎莉波 - 歌声は君いろ.jpg" },
    { title: "L.U.V", artist: "諭吉佳作men / 姫崎莉波", file: "PlayList/初星学園,諭吉佳作men,姫崎莉波 - L.U.V.mp3", cover: "PlayList/covers/初星学園,諭吉佳作men,姫崎莉波 - L.U.V.jpg" },
    { title: "SEARCH RIGHT", artist: "涼木シンジ", file: "PlayList/初星学園,涼木シンジ - SEARCH RIGHT.mp3", cover: "PlayList/covers/初星学園,涼木シンジ - SEARCH RIGHT.jpg" }
  ];
  // === HATSU_MUSIC_TRACKS_END ===
  const REQUIRED_BOND_THRESHOLDS = [20, 40, 60, 80];
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
    80: { title: "路线后半转折", theme: "First Live 前的重要个人主线节点，回收旧关系、核心矛盾或上台前必须面对的课题。", timing: "好感度达到 80 后解锁，下一天进入羁绊事件日。" },
    100: { title: "First Live 之后", theme: "演出成功后的故事收尾，让角色关系完成 First Live 篇章的闭环。", timing: "First Live 成功且好感度达到 100 后解锁。" }
  };
  const affinityRouteSeeds = {
    "藤田琴音": {
      0: "最初的接触与被选择。状态：仍把自己视作成绩不起眼、实绩不足的底层偶像候补。她会用可爱营业、吐槽和夸张反应撑住场面，嘴上说得很有气势，心里却还不相信自己真的会被认真选择。锚点：打工后的初遇、对制作人身份的怀疑、“这不是搭讪吧”的确认、为什么偏偏选择自己的不安、被制作人看见潜力后的狂喜、将“也许我还有机会”转化成“我要出人头地，成为顶级偶像，让家里人安心”的第一声宣言。",
      20: "暴露短板与确认不会被放弃。状态：接受担当关系，但还没相信自己。被制作人看见训练失败、唱歌短板和不稳定状态时，会立刻害怕对方后悔选择自己。锚点：训练表现差、催促制作人“你倒是说点什么”、确认“不会撤回劝诱吧”“不会抛弃我吧”、因为被夸奖而轻易动摇、承认自己很久没有被人这样夸过、开始把制作人的眼光当作临时支架。",
      40: "从廉价打工转向偶像工作。状态：仍被赚钱焦虑推着走，无法安心休息，总想把打工和偶像活动两边都抓住。制作人开始实际介入她的生活，让她第一次感到“被照顾”不是空口安慰，而是具体解决问题。锚点：奖学金和补助申请、减少打工、强制休息、禁止偷偷兼职、收到水果和食物、吐槽制作人像家长、被“报酬不低于目前且能成长的偶像工作”击中、把感谢包装成撒娇和“制作人是不是超级喜欢我”的玩笑。",
      60: "重新理解自己的偶像资本。状态：逐渐理解偶像的价值不只在唱功。她虽然仍承认自己唱歌差、实绩不足，但开始明白可爱、舞蹈、表情、人际经营、工作态度和观众缘都可以成为偶像实力。锚点：玩偶秀和宿舍打扫等怪工作、抱怨体力活却认真完成、理解体能和评价提升的重要性、主动经营宿舍学姐和同级生关系、被制作人指出“想成为大家都想合作的偶像”、把零成本社交视为生存智慧、开始把“可爱”和“赚钱”接入偶像道路。",
      80: "初 Live 前的自信搭建。状态：Live 前面对唱歌短板产生强烈不安。她不能完全相信自己，但已经可以相信制作人的眼光，并主动请求制作人在身边看着她、继续夸奖她。锚点：被指出唱歌差、理解 Live 不是只听歌而是传达自己的全部魅力、确认可爱容貌和舞蹈是自己的武器、被认真夸奖后失速脸红、要求“请在身边看着我”“像现在这样多夸夸我”、把制作人的认可转化成堂堂正正站上舞台的勇气。",
      100: "作为偶像被看见与家庭告白。状态：完成初 Live 后，第一次强烈感到自己真的作为偶像被观众、同学、网络和家人看见。她仍然爱钱、爱夸、会撒娇，但已经开始把“赚钱”理解为作为偶像获得价值、回报家庭、证明自己没有白来初星学园的方式。锚点：初 Live 满席、PV 传播、SNS 话题、出场费上涨、家人说她像偶像、游乐园约会作为“报答”、主动讲出家庭贫困、弟妹、学费、父亲离家和自责、把沉重话题用笑容收束、确认自己要成为顶级偶像和大富豪，给家里带回真正的好消息。"
    },
    "月村手毬": {
      0: "冷淡拒绝，但因为制作人知道她的失败与丑闻仍然选择她而动摇。",
      20: "她嘴硬地设下界限，实际在观察制作人是否能理解现在的自己。",
      40: "体力、体重、心理疲劳和组合崩坏暴露出来，她害怕再次失控。",
      60: "首场 Live 失败：彩排用力过猛导致正式上场体力不足。制作人分析手毬实力受感情影响极大，上限很高、下限也很低；今后的目标不是压低输出，而是稳定发挥并充分利用她的上限。",
      80: "电话依赖、美铃视角、SyngUp 重组提案、拒绝回到过去、下场 Live 赌约。手毬越来越依赖制作人，美铃担心她一个人不行并请求重组 SyngUp；制作人承认担心但拒绝简单回到旧组合，以下一场 Live 作为赌约，让美铃见证手毬的改变。",
      100: "First Live 成功后：赌约兑现、美铃放手、关系修复、不能回到过去、只属于自己的制作人、成为偶像的根源、人工翅膀、陪我到最高峰。手毬与美铃互相道歉，承认无法回到过去的 SyngUp，但可以重新成为朋友；之后手毬向制作人说出自己成为偶像的根源，制作人确认选择的正是这个靠痛苦努力长出人工翅膀的手毬。"
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
      0: "制作人登门招揽这位『一等星·启明星』——学园顶点、学生会会长、前任 H.I.F 冠军。星南先以优雅从容的姿态拒绝：自认才能有限、毕业后要转做制作人、梦想是『培养出超越自己的偶像』，而非继续当偶像。制作人追问『对你而言顶级偶像是什么』，以『顶级偶像存在于每个人心中，应亲手实现』反驳，戳中她仍想再相信一次『偶像·十王星南』的心情。她最终同意签约一年，带着高位者的矜持与试探进入试用期——既观察制作人本事，又以『未来制作人候补』身份暗中学习。【钩子：顶点偶像与转制作人的拉锯、一年合约的赌约感、对制作人判断的好奇与距离感】",
      20: "签约后首次目标会议，制作人点破自 H.I.F 夺冠成为一等星以来实力零成长——这正是对十王星南最致命的问题。星南从期待高要求到直面停滞，承认三维数值没有变化；制作人提出『偶像能力不止 Dance/Vocal/Visual 三项』，她从未尝试提升不可见能力，却在引导下看到新出路，决定『如果真的还有希望，就再拼一次』。此刻她仍保留学园第一的余裕，但对自身极限已坦率承认。【钩子：零成长危机、不可见能力的新方向、被制作人示范压过时的不甘心、『我讨厌你』式的别扭竞争】",
      40: "制作人推她做从未尝试过的事——视频直播，访谈中意新生藤田琴音。星南两次错误邀请（『成为我的人吧』、不合理报酬）致琴音逃跑，制作人当场示范成功邀请；直播正式播出时，琴音播放无剧本排练录像，全校看到紧张发抖、非偶像的会长。星南羞耻后承认完美形象只是『一厢情愿的目标』，开始思考『偶像以外的我』是否才是未被发现的魅力。【钩子：社交笨拙出丑、完美外壳在全校面前裂开、对制作人生气却逐渐理解其意图】",
      60: "直播后星南与制作人对峙，长段自白完美枷锁——从小为偶像而生、必须完美、逃避与校外顶尖偶像比较、自认不如她们。制作人激将『胆小鬼配得上学园顶点吗』，她否认被激将，但决定不再拿后辈当逃避理由。宿敌雨夜燕随后兴师问罪，要她回到完美榜样；星南拒绝改方向，首次对追随者公开誓言：『我要成为顶级偶像』——即使破坏至今建立的十王星南形象，也没有退路。【钩子：完美主义核心崩溃、与旧形象的公开决裂、燕作为旧期待的对立面、对制作人的信任前提下的生气】",
      80: "星南找制作人要『飞出学院』的相称舞台，坦白能力值自去年起仍无变化、怕动摇快哭；制作人指『舞台下笨拙』才是变化，粉丝出现『请加油』『你好可爱』。她接受可爱偶像的新定位，阐明顶级偶像=『梦想成为偶像的人们的指路明灯』，邀请制作人陪自己进行人生最重要赌局——与校外顶级偶像前辈同台，即使实力垫底也要让全世界知道自己是顶级偶像。【钩子：数值不变与粉丝结构变化的悖论、背水一战的孤注一掷、对制作人的高度信赖、顶级偶像定义的落地】",
      100: "学园礼堂演唱会，星南即兴喊出『以一等星为目标吧！偶像的顶点就在这里！』，自认人生中最棒的演唱会、没有输给任何人，感谢制作人『这一切都是多亏了你』。次日她却闷闷不乐——粉丝与前辈粉丝网上争吵，能力自知未达顶级、压力反增，一度动摇『转制作人是否更优』。最终她告白：将最闪耀的顶级偶像十王星南培养成的制作人，才是她当制作人的憧憬、梦想和目标；决定留在身边学习——『今后也请多多指教啦，我最棒的顶级制作人！』【钩子：梦想实现后的新不安、制作人成为制作人之梦、长期同行的关系落点、顶级偶像之后的更大责任】"
    },
    "秦谷美铃": {
      0: "初见即表现出超然物外的懒散态度，制作人通过调查理解其本质并提出培育。锚点是：茶道室的午睡、前优等生的伪装、选择“慢悠悠”的偶像道路、与制作人定下悠闲登顶的约定。",
      20: "确立制作人作为“同行者”的关系，并揭露曾经的组合羁绊。锚点是：阴天训练约定、作为“前优等生”的过去、对SyngUp的执着怀念、决心阻止手毬为了冲动而自我毁灭。",
      40: "打破对“努力”的定义，将“散步”转化为实力提升的捷径。锚点是：练习室歌唱训练、制作人对她独特的“努力”方式的肯定、为她铺平前路的捷径、确认以自身步调散步超越手毬的战略。",
      60: "面对单人偶像的挑战，剖析内心真实的执念与独占欲。锚点是：筹备个人演出、否定组合式的依赖唱法、制作人要求融入“真情实感”、揭露内心深处想让观众“离不开自己”的恐怖且强烈的独占欲。",
      80: "通过观摩手毬演出确认差距与决心，发出回应式的挑战。锚点是：作为“头号粉丝”观摩手毬演出、对不顾一切演出的担忧与胃药关怀、以自身歌声为回击的“战书”、亲口教训并直面手毬。",
      100: "First Live 成功后：自我觉醒、关系重塑。锚点是：Live获得认可、与手毬互相道歉并承认无法回到过去的组合，但确认了新的同伴关系；美铃向制作人吐露成为偶像的根源（并非憧憬，而是对光的占有欲与不甘心）；确认制作人是让自己登上最高峰、并能在那里安稳小睡的唯一共犯。"
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
    },
    "雨夜燕": {
      0: "制作人暗中调查这位『学园No.2』——她严管后辈、私下加练、嘴上永远挂着『超越星南』，却拒绝一切制作人邀约。正式登门时她一口回绝；制作人以『你不过是满足于第二名、从没真正赢过星南』激她，她暴怒之下反被勾起野心，撂下『半吊子方案就等着见血』签下担当。此刻她带着No.2的矜持与戒备进入试用期，既想验证制作人本事，又不肯承认自己需要谁。【钩子：签约当天的别扭、被耍还上钩的不甘、对制作人能力的暗中考察】",
      20: "燕认真投入训练，却在制作人调整方案时暴怒——她把『训练量不能输星南』当尊严，被点破『漫无目的、想象不出超越星南后的自己』时陷入自我厌恶。紧接着传来星南要毕业后退出偶像、转做制作人的消息，燕无法接受，解读为『她根本没把我当对手』，决心夺下一等星、阻止星南退圈。【钩子：说不清『赢了之后要成为什么偶像』、对星南退圈的震怒、训练中死要面子进步全归自己】",
      40: "制作人点破她『做不出可爱』的短板，提议把缺陷翻转成『帅气凛然』的武器。燕一面抗拒『过去的偶像人生被否定』，一面被推着尝试陌生形象——苦战参考、出丑、重练。SNS 因帅气方向爆火，她开始轻敌：『那种货色也想超过我？』【钩子：被迫暴露不擅长的一面、嘴硬接受新形象、对一年级后辈的轻视埋下伏笔】",
      60: "H.I.F 选拔，燕轻敌应战却输给一年级的秦谷美铃、跌到第二，连『学园No.2』的实质都没保住。后台无人时她崩溃痛哭；制作人坦白这场较量是自己设的局，目的就是粉碎她『安于第二』的扭曲自尊。燕在痛哭中自省：『我一直在假装追赶，其实早就放弃了』，第一次把怒火与脆弱都交给制作人，要求『你要支撑着我』，真正以星南为对手重新站起。【钩子：失态痛哭、对制作人又恨又依赖、交出信任的瞬间、『低头只看脚下』的自省】",
      80: "星南因制作人让燕来挑战自己而失望离开；夜练中燕讲起与星南青梅竹马的往事，被制作人点破『你其实一直憧憬星南，神化对手才是屡败的原因』。她勉强承认、同意封存憧憬、用平视的眼光面对对手。随后的试镜，她第一次体会『绝对不能输』的紧张，登台战胜星南夺第一——打断制作人的谦虚：『能赢星南，是我们的力量。』【钩子：被逼到边缘承认憧憬、毕业前重新相信自己有资格、把制作人认作并肩的人】",
      100: "战胜星南后，制作人特意选了家和食店犒赏。燕承认被那套『策略』打动、感谢制作人改变了她；随后吐露最原始的动机——不是不甘、也不只是憧憬，而是『想让星南从为偶像而生里被解放，意识到她不过是个普通孩子』，可自己最终也被她吸引。她立下新目标：在 H.I.F 再次战胜星南，让她尝到竞争的喜悦，且绝不让星南放弃当偶像。制作人说出『培育顶级偶像』的梦想，燕『理所当然』地应下继续同行——『同行前往，直至顶点。』【钩子：坦荡的感谢与依赖、为自己也为星南而战的双重动机、与制作人共赴顶点的关系落点】"
    }
  };
  const seinaBondRoutes = {
    20: {
      title: "零成长危机",
      objective: "让星南直面 H.I.F 夺冠后一等星实力零成长的问题，并把不可见能力作为重新前进的新方向。",
      canonAnchor: "首次目标会议、H.I.F夺冠以来实力零成长、三维数值没有变化、偶像能力不止 Dance/Vocal/Visual 三项、不可见能力的新方向、被制作人示范压过时的不甘心、我讨厌你式别扭竞争。",
      phase1Title: "第一轮选项：制作人如何点破零成长",
      phase1Setup: "开场写签约后的首次目标会议。星南以一等星的余裕期待高要求，却停在制作人必须指出她真正问题的时刻。",
      phase1Options: [
        "直接指出她自 H.I.F 夺冠以来实力没有任何成长",
        "要求她把去年和现在的 Vo、Da、Vi 记录摆在同一张表上",
        "问她作为一等星，是否已经习惯用顶点位置掩盖停滞",
        "用制作人的示范压过她一次，让她亲身体会不甘"
      ],
      phase2Title: "第二轮选项：制作人如何提出不可见能力",
      phase2Setup: "中段必须让星南承认三维数值没有变化。她仍优雅，却第一次坦率承认自身极限，停在制作人给出新方向的时刻。",
      phase2Options: [
        "“偶像能力不止 Dance、Vocal、Visual 三项。”",
        "“你没变弱，只是从未训练过不可见的魅力。”",
        "“如果还有希望，就从数值之外重新开始。”",
        "“讨厌我也可以。至少现在你又有了想赢的对象。”"
      ],
      resolution: "星南承认停滞带来的致命危机，却也看到不可见能力的新路；她保留学园第一的余裕，同时以别扭竞争心决定再拼一次。"
    },
    40: {
      title: "完美外壳裂开",
      objective: "通过视频直播、访谈与邀请琴音失败，让星南在全校面前暴露非偶像的笨拙，并开始思考偶像以外的自己。",
      canonAnchor: "视频直播、访谈中意新生藤田琴音、两次错误邀请、成为我的人吧、不合理报酬、制作人示范邀请成功、无剧本排练录像、紧张发抖的会长、完美形象只是一厢情愿的目标。",
      phase1Title: "第一轮选项：制作人如何把她推向直播",
      phase1Setup: "开场写制作人要求星南尝试从未做过的视频直播与访谈。星南保持优雅，却明显不理解这和顶级偶像有什么关系。",
      phase1Options: [
        "要求她直播采访中意的新生藤田琴音",
        "告诉她完美会长以外的反应也可能成为魅力",
        "让她不要准备标准答案，只用真实反应面对镜头",
        "把这次任务定义成训练不可见能力的第一步"
      ],
      phase2Title: "第二轮选项：琴音逃跑后，制作人如何示范",
      phase2Setup: "中段必须写星南两次错误邀请琴音失败，并在正式播出时被无剧本排练录像暴露紧张发抖的样子。",
      phase2Options: [
        "当场示范如何用正常条件邀请琴音，而不是压迫她",
        "不替她遮掩录像，让全校看见会长也会紧张",
        "告诉她那份羞耻不是失败，而是完美外壳终于裂开",
        "指出偶像以外的十王星南，可能才是未被发现的魅力"
      ],
      resolution: "星南羞耻又生气，却承认完美形象只是一厢情愿的目标；她开始理解制作人要挖出的不是破绽，而是偶像以外的自己。"
    },
    60: {
      title: "破坏十王星南",
      objective: "让星南自白完美主义枷锁，并在雨夜燕兴师问罪时公开拒绝回到旧形象，宣言要成为顶级偶像。",
      canonAnchor: "直播后对峙、从小为偶像而生、必须完美、逃避与校外顶尖偶像比较、自认不如她们、胆小鬼配得上学园顶点吗、雨夜燕兴师问罪、拒绝改方向、我要成为顶级偶像、破坏至今建立的十王星南形象。",
      phase1Title: "第一轮选项：制作人如何逼出完美枷锁",
      phase1Setup: "开场写直播后星南与制作人对峙。她生气，却没有离开，停在制作人是否继续追问她真正恐惧的时刻。",
      phase1Options: [
        "追问她为什么一定要作为完美偶像存在",
        "指出她不是才能有限，而是在逃避校外顶尖偶像的比较",
        "用胆小鬼配得上学园顶点吗激她反击",
        "承认她可以生气，但不能再拿后辈当退路"
      ],
      phase2Title: "第二轮选项：雨夜燕要求她回到榜样时，制作人如何支撑",
      phase2Setup: "中段必须让雨夜燕兴师问罪，要求星南回到完美榜样的位置。星南站在旧期待与新方向之间。",
      phase2Options: [
        "让星南自己回答燕，而不是由制作人替她解释",
        "提醒她如果想成为顶级偶像，就不能只维护过去的十王星南",
        "支持她公开说出我要成为顶级偶像",
        "告诉她破坏旧形象不是退路断绝，而是终于开始前进"
      ],
      resolution: "星南拒绝回到完美榜样，首次对追随者公开誓言“我要成为顶级偶像”；她仍因制作人的激将生气，却以信任为前提选择继续。"
    },
    80: {
      title: "飞出学院",
      objective: "让星南接受数值不变与粉丝结构变化的悖论，定义顶级偶像为指路明灯，并邀请制作人陪她进行人生最重要赌局。",
      canonAnchor: "飞出学院的相称舞台、能力值自去年起仍无变化、怕动摇快哭、舞台下笨拙才是变化、请加油、你好可爱、可爱偶像新定位、顶级偶像等于梦想成为偶像的人们的指路明灯、与校外顶级偶像前辈同台、即使实力垫底也要让全世界知道自己是顶级偶像。",
      phase1Title: "第一轮选项：制作人如何回应她的数值不变",
      phase1Setup: "开场写星南主动来找制作人，要一个能够飞出学院的舞台。她坦白能力值仍无变化，动摇到快哭。",
      phase1Options: [
        "指出变化不在数值，而在舞台下暴露出的笨拙",
        "拿出粉丝留言，请她看见请加油和你好可爱",
        "告诉她顶级偶像不是无缺点，而是能让人想跟随",
        "承认这会很危险，但正因为危险才配得上飞出学院"
      ],
      phase2Title: "第二轮选项：她提出赌局时，制作人如何答应",
      phase2Setup: "中段必须写星南接受可爱偶像的新定位，并说出顶级偶像是梦想成为偶像的人们的指路明灯。随后她提出与校外顶级偶像前辈同台。",
      phase2Options: [
        "“我会陪你赌上这一局。”",
        "“即使实力垫底，也要让全世界知道十王星南在这里。”",
        "“你不是逃出学院，而是把学院的一等星带到更远的地方。”",
        "“如果你要成为指路明灯，我就负责把舞台点亮。”"
      ],
      resolution: "星南接受可爱偶像的新定位，并把顶级偶像定义落到指路明灯；她高度信赖制作人，邀请他陪自己进行人生最重要的背水一战。"
    }
  };

  const kotoneBondRoutes = {
    20: {
      title: "不会被放弃",
      objective: "让琴音在训练短板暴露后确认制作人不会撤回担当选择，并开始把制作人的夸奖当作临时支架。",
      canonAnchor: "训练表现差、唱歌短板、不稳定状态、催促制作人说话、确认不会撤回劝诱与不会抛弃、被夸奖后轻易动摇、承认很久没有被这样夸过。",
      phase1Title: "第一轮选项：制作人如何回应训练失败",
      phase1Setup: "开场从一次明显失败的训练开始。琴音用吐槽和可爱姿态撑场，却很快慌张地催促制作人“你倒是说点什么”，停在制作人必须回应她短板的时刻。",
      phase1Options: [
        "直接指出唱歌短板，但同时说明这不是撤回选择的理由",
        "先让她冷静下来，再问她最害怕制作人说什么",
        "从训练记录里找出她做得好的瞬间，证明失败不是全部",
        "告诉她制作人早就知道她不稳定，仍然选择了她"
      ],
      phase2Title: "第二轮选项：面对“会不会抛弃我”时，制作人如何确认",
      phase2Setup: "中段必须让琴音说出或绕着说出“不会撤回劝诱吧”“不会抛弃我吧”的不安。她一边开玩笑，一边紧盯制作人的反应。",
      phase2Options: [
        "“不会。你失败的样子也在我的担当范围内。”",
        "“我选择的不是已经完成的偶像，而是会从这里变强的藤田琴音。”",
        "“害怕就直接问。我会每次都认真回答你。”",
        "“今天可以先靠我的眼光站稳，之后再换成你自己的自信。”"
      ],
      resolution: "琴音被认真夸奖后明显动摇，承认自己很久没有被人这样肯定过；她暂时还不相信自己，却开始愿意相信制作人的眼光。"
    },
    40: {
      title: "从打工到偶像工作",
      objective: "把琴音从廉价打工和赚钱焦虑里拉出来，让她感到制作人的照顾是具体解决问题，而不是空口安慰。",
      canonAnchor: "奖学金和补助申请、减少打工、强制休息、禁止偷偷兼职、收到水果和食物、吐槽制作人像家长、被“报酬不低于目前且能成长的偶像工作”击中、把感谢包装成撒娇玩笑。",
      phase1Title: "第一轮选项：制作人如何介入她的打工生活",
      phase1Setup: "开场写琴音训练后还准备赶去打工，嘴上说自己很能干，实际已经累到无法集中。停在制作人必须决定如何阻止她继续硬撑的时刻。",
      phase1Options: [
        "拿出奖学金和补助申请表，要求她现在一起填完",
        "直接禁止她今天偷偷兼职，先把休息排进日程",
        "把水果和食物递给她，指出她连好好吃饭都在省钱",
        "问她愿不愿意把赚钱欲望转成更高报酬的偶像工作"
      ],
      phase2Title: "第二轮选项：制作人如何让她接受被照顾",
      phase2Setup: "中段必须写出琴音抗拒减少打工，担心少赚一天就会落后。制作人需要给出实际替代方案，而不是只说“别勉强”。",
      phase2Options: [
        "“我会找报酬不低于目前、而且能让你成长的偶像工作。”",
        "“休息不是浪费时间，是为了让你明天还能站在训练室。”",
        "“如果你偷偷兼职，我就把训练计划改成睡眠管理。”",
        "“你可以想赚钱，但不能用把自己弄坏的方式赚钱。”"
      ],
      resolution: "琴音嘴上吐槽制作人像家长，又把感谢包装成撒娇和“制作人是不是超级喜欢我”的玩笑；她第一次感到被照顾是现实层面的支撑。"
    },
    60: {
      title: "可爱也是资本",
      objective: "让琴音重新理解自己的偶像资本：唱功之外，可爱、舞蹈、表情、人际经营、工作态度和观众缘都能成为实力。",
      canonAnchor: "玩偶秀和宿舍打扫等怪工作、抱怨体力活却认真完成、理解体能与评价提升的重要性、经营宿舍学姐和同级生关系、被指出想成为大家都想合作的偶像、把零成本社交视为生存智慧。",
      phase1Title: "第一轮选项：制作人如何解释怪工作的意义",
      phase1Setup: "开场从玩偶秀、宿舍打扫或类似看似不像偶像工作的任务开始。琴音抱怨这是体力活，却还是认真做完，停在制作人解释这份工作价值的时刻。",
      phase1Options: [
        "告诉她体能、表情和观众缘都是舞台实力的一部分",
        "指出她刚才对孩子和同学的反应本身就是偶像资本",
        "把宿舍关系经营写进训练计划，要求她认真维护评价",
        "承认这不是闪亮工作，但它会让更多人想和她合作"
      ],
      phase2Title: "第二轮选项：制作人如何定义她的生存智慧",
      phase2Setup: "中段必须让琴音谈到自己习惯零成本社交、讨好前辈和同级生，因为现实里人脉和评价都很重要。制作人需要把这份生存智慧接回偶像道路。",
      phase2Options: [
        "“你不是只会讨好别人，你是在让别人愿意把机会交给你。”",
        "“可爱不是装饰。对你来说，它可以变成工作能力。”",
        "“想赚钱也没问题，把它变成让观众愿意支持你的理由。”",
        "“你的目标不是唱得最完美，而是成为大家都想合作的偶像。”"
      ],
      resolution: "琴音开始承认可爱、赚钱欲和人际经营都能接入偶像道路；她仍会抱怨辛苦，却第一次把这些现实技巧当成自己的武器。"
    },
    80: {
      title: "初 Live 前的自信",
      objective: "在 First Live 前为琴音搭建自信，让她把对制作人眼光的信任转化成堂堂正正站上舞台的勇气。",
      canonAnchor: "被指出唱歌差、理解 Live 不是只听歌而是传达全部魅力、确认可爱容貌和舞蹈是武器、被认真夸奖后失速脸红、要求请在身边看着我、像现在这样多夸夸我。",
      phase1Title: "第一轮选项：制作人如何处理 Live 前唱歌不安",
      phase1Setup: "开场写 First Live 前的候场或最终确认。琴音因为唱歌短板强烈不安，用夸张玩笑掩饰，停在制作人必须指出 Live 意义的时刻。",
      phase1Options: [
        "承认唱歌是短板，但告诉她 Live 不是只听歌",
        "让她回忆舞蹈、表情和可爱如何吸引观众",
        "直接告诉她：今天要传达的是藤田琴音的全部魅力",
        "把她一路完成的工作和训练一项项数给她听"
      ],
      phase2Title: "第二轮选项：制作人如何把夸奖变成勇气",
      phase2Setup: "中段必须写出琴音被认真夸奖后失速脸红，嘴上想逃开，实际主动要求制作人继续看着她、继续夸奖她。",
      phase2Options: [
        "“我会在这里看着你。你只要把最可爱的自己交给观众。”",
        "“你不是靠完美唱功站上去的，是靠藤田琴音全部的魅力。”",
        "“害羞也可以。把这份被看见的感觉带上舞台。”",
        "“今天之后，你要自己证明我选择你的眼光没错。”"
      ],
      resolution: "琴音把制作人的认可转成勇气，要求制作人在身边看着她、像现在这样多夸夸她；最后以不完全自信却堂堂正正站上舞台。"
    }
  };

  const temariBondRoutes = {
    20: {
      title: "相互试探",
      objective: "分析手毬状态下滑的原因，并确立制作人成为新同伴的关系。",
      canonAnchor: "胖了、报复性节食、组合解散、失去燐羽和美铃的支撑、重新说出顶级偶像目标。",
      phase1Title: "第一轮选项：制作人先指出什么问题",
      phase1Setup: "开场要从手毬状态下滑、嘴硬和回避开始，停在制作人必须决定如何切入问题的时刻。",
      phase1Options: [
        "直接指出体重和体力管理出了问题",
        "先问她最近有没有好好吃饭",
        "从训练录像里指出她动作变钝的原因",
        "不谈体重，先说“你现在像是在惩罚自己”"
      ],
      phase2Title: "第二轮选项：组合解散后，制作人如何回应",
      phase2Setup: "中段必须让她说出组合解散、燐羽和美铃不在身边、自己无法被托住的痛点。",
      phase2Options: [
        "“那从今天开始，我来托住你。”",
        "“你不需要回到以前的组合，也能重新成为顶级偶像。”",
        "“燐羽和美铃不在，不代表你只能一个人摔下去。”",
        "“如果你还想成为顶级偶像，就把这个目标重新说出口。”"
      ],
      resolution: "改善饮食计划成立，制作人承诺托住她，手毬重新说出成为顶级偶像的目标。"
    },
    40: {
      title: "核心问题暴露",
      objective: "揭开 SyngUp 旧关系和手毬体力燃尽的根本问题，确立单人偶像训练目标。",
      canonAnchor: "制作人邀请手毬讨论训练计划；手毬看到一整墙自己的照片被吓到。她讲述 SyngUp 时期燐羽和美铃为了配合她压制实力。制作人指出她越集中越能发挥实力，但体力会燃尽。手毬因愧疚退出组合。之后用录像复盘训练，发生拍照误会与课堂看制作人照片被没收手机的日常插曲。",
      phase1Title: "第一轮选项：制作人如何揭开 SyngUp 的真相",
      phase1Setup: "开场从训练计划讨论和照片墙误会切入，停在制作人必须决定如何揭开 SyngUp 真相的时刻。",
      phase1Options: [
        "直接播放训练录像，对比手毬集中前后的体力消耗",
        "先问她为什么认为燐羽和美铃是在“迁就”自己",
        "用数据说明她不是实力不够，而是输出方式太极端",
        "直接指出她退出组合不是因为讨厌两人，而是受不了善意"
      ],
      phase2Title: "第二轮选项：训练目标如何落地",
      phase2Setup: "中段必须写出她对燐羽和美铃的愧疚，以及她不想再被同伴温柔托住的痛苦。",
      phase2Options: [
        "制作人提出从体力分配训练开始，先做到完整唱完一首歌",
        "制作人提出录像复盘，把燃尽的瞬间一帧一帧找出来",
        "制作人要求她不要再把同伴的善意当成羞辱",
        "制作人让她亲口说出：这一次要作为单人偶像唱到最后"
      ],
      resolution: "训练目标定为作为单人偶像唱到最后；随后用录像复盘和拍照误会收束，让严肃剖析转成关系变近的日常。"
    },
    60: {
      title: "关系转折",
      objective: "通过首场 Live 失败确认手毬的能力波动：上限极高，下限也低，受感情影响强。",
      canonAnchor: "手毬举办首场 Live，彩排用力过猛导致正式上场时体力不足，Live 失败。制作人分析她不是没有实力，而是感情越高涨越会燃尽，今后要训练稳定发挥上限。",
      phase1Title: "第一轮选项：制作人如何处理彩排用力过猛",
      phase1Setup: "开场写首场 Live 前的彩排，手毬因紧张和兴奋过度投入，停在制作人是否介入彩排的时刻。",
      phase1Options: [
        "立刻中止彩排，要求她保存体力",
        "记录彩排中爆发最好的一瞬间",
        "不打断她，先观察她为什么停不下来",
        "告诉她真正的舞台不是彩排，必须把热量留到正式演出"
      ],
      phase2Title: "第二轮选项：Live 失败后，制作人如何定义这次失败",
      phase2Setup: "中段必须写出正式演出体力不足、声音或动作失误，Live 失败明确发生。",
      phase2Options: [
        "“失败不是因为你弱，而是因为你的上限太高，身体追不上。”",
        "“你需要学会把感情留到最该燃烧的地方。”",
        "“今天不是终点，是我们第一次看清你的波动幅度。”",
        "“我要训练的不是平均的你，而是能稳定到达最高点的你。”"
      ],
      resolution: "手毬承认自己无法稳定控制状态；制作人确认训练目标不是压低输出，而是让她在正式舞台上充分发挥上限。"
    },
    80: {
      title: "路线后半转折",
      objective: "让美铃重新进入主线，建立下场 Live 赌约，为 100 的成功与和解铺路。",
      canonAnchor: "手毬频繁打电话，表现对制作人的依赖。制作人遇见美铃，美铃担心手毬一个人不行并提出重组 SyngUp。手毬赶到后听见提案。制作人拒绝简单回到过去，提出下场 Live 赌约：如果美铃看完仍担心，就考虑提案；如果手毬证明自己，美铃要和手毬好好谈。",
      phase1Title: "第一轮选项：制作人如何回应手毬的电话依赖",
      phase1Setup: "开场写手毬打电话、抱怨制作人没有立刻接、又小心确认制作人是否生气，停在制作人如何回应她依赖的时刻。",
      phase1Options: [
        "先接电话，告诉她自己正在处理她的负面传闻",
        "故意晚一点回拨，观察她为什么这么不安",
        "直接问她是不是害怕自己生气",
        "让她稍后当面来谈，不在电话里继续绕圈"
      ],
      phase2Title: "第二轮选项：面对美铃的 SyngUp 重组提案",
      phase2Setup: "中段必须写制作人与美铃会谈、手毬赶到、重组 SyngUp 提案被摆到台面上。美铃希望制作人可以当SyngUp的制作人",
      phase2Options: [
        "直接拒绝：手毬不能靠回到过去解决现在的问题",
        "先承认美铃的担心，再指出重组不是唯一答案",
        "要求美铃看完手毬下一场 Live 后再判断",
        "当着手毬的面说明：现在托住她的人会是制作人"
      ],
      resolution: "美铃的担心被承认，手毬没有被简单塞回 SyngUp；制作人以下一场 Live 作为验证，让美铃见证手毬的改变。"
    }
  };

  const misuzuBondRoutes = {
    20: {
      title: "同行者关系",
      objective: "确立制作人作为美铃的同行者，并揭露她对 SyngUp 与手毬的执着怀念。",
      canonAnchor: "阴天训练约定、作为前优等生的过去、对 SyngUp 的执着怀念、决心阻止手毬为了冲动而自我毁灭。",
      phase1Title: "第一轮选项：制作人如何理解她的懒散与过去",
      phase1Setup: "开场从阴天训练约定切入。美铃照常慢悠悠，却没有真的逃避训练；停在制作人必须决定如何触碰她“前优等生”过去的时刻。",
      phase1Options: [
        "直接指出她不是懒散，而是在用自己的方式保存余力",
        "先问她为什么明明讨厌麻烦，却还是准时来到训练室",
        "提起前优等生时期的资料，确认她是不是故意藏起锋芒",
        "不拆穿她，只说今天可以按她的步调慢慢开始"
      ],
      phase2Title: "第二轮选项：面对 SyngUp 与手毬时，制作人如何回应",
      phase2Setup: "中段必须让美铃谈起 SyngUp，谈起她对手毬的担忧：她怀念组合，也害怕手毬又为了冲动把自己毁掉。",
      phase2Options: [
        "“你不是想把她拉回过去，而是不想再看她一个人摔下去。”",
        "“如果你要阻止手毬，那我会陪你一起找不会毁掉她的方法。”",
        "“怀念 SyngUp 不丢人，但你现在也需要自己的道路。”",
        "“那就别只站在旁边担心，秦谷小姐。把你的歌也拿出来。”"
      ],
      resolution: "制作人被确认为能与她同速同行的人；美铃承认自己仍怀念 SyngUp，也承认阻止手毬自毁是她继续成为偶像的重要理由。"
    },
    40: {
      title: "散步即努力",
      objective: "打破对努力的定义，把美铃的散步、观察和慢节奏转化为实力提升的捷径。",
      canonAnchor: "练习室歌唱训练、制作人对她独特努力方式的肯定、为她铺平前路的捷径、确认以自身步调散步超越手毬的战略。",
      phase1Title: "第一轮选项：制作人如何重新定义美铃的努力",
      phase1Setup: "开场从练习室歌唱训练开始。美铃看起来像是在散步、喝茶、偷懒，却准确抓住训练重点；停在制作人要不要承认这种方式也是努力的时刻。",
      phase1Options: [
        "告诉她这不是偷懒，而是她独有的观察和吸收方式",
        "把她刚才散步时记住的节奏变化全部指出来",
        "要求她不用模仿热血训练，把慢节奏继续贯彻到底",
        "故意把训练计划写成散步路线图，让她按路线完成"
      ],
      phase2Title: "第二轮选项：捷径如何变成超越手毬的战略",
      phase2Setup: "中段必须写出制作人为她铺路：不否定努力，而是寻找适合美铃的捷径。美铃开始确认自己可以用自身步调散步般接近甚至超越手毬。",
      phase2Options: [
        "“捷径不是作弊，是为了让你把力气用在最可怕的地方。”",
        "“你不用追着手毬跑。你可以慢慢走到她前面。”",
        "“从今天开始，散步就是你的训练项目之一。”",
        "“如果别人靠燃烧抵达舞台，你就靠不浪费一步抵达。”"
      ],
      resolution: "美铃接受自己的慢节奏不是缺陷；制作人与她确立以散步、观察、精准发力为核心的训练战略，把捷径变成属于她的正攻法。"
    },
    60: {
      title: "独占欲暴露",
      objective: "面对单人偶像挑战，剖析美铃内心真实的执念与独占欲。",
      canonAnchor: "筹备个人演出、否定组合式的依赖唱法、制作人要求融入真情实感、揭露内心深处想让观众离不开自己的恐怖且强烈的独占欲。",
      phase1Title: "第一轮选项：制作人如何拆掉组合式唱法",
      phase1Setup: "开场从个人演出筹备开始。美铃的唱法依然像是在照顾旁边的同伴，漂亮、稳定，却没有把自己放到中心；停在制作人必须指出问题的时刻。",
      phase1Options: [
        "直接否定她依赖组合呼吸的唱法，要求她把自己放在中央",
        "让她关掉伴奏，只用自己的声音填满练习室",
        "指出她不是不会独唱，而是不愿承认自己想被独占地听见",
        "要求她别再替不存在的同伴留位置"
      ],
      phase2Title: "第二轮选项：制作人如何逼近她的真情实感",
      phase2Setup: "中段必须让美铃说出或被迫面对内心深处的欲望：她并不只是温柔照顾别人，也想让观众离不开自己、把目光留在自己身上。",
      phase2Options: [
        "“把那份想让所有人离不开你的心情唱出来。”",
        "“这不是温柔的歌也没关系。让我听见你真正想占有的东西。”",
        "“你害怕的不是一个人唱，而是承认自己想成为唯一。”",
        "“秦谷小姐，今天不用照顾任何人。只要让大家看着你。”"
      ],
      resolution: "美铃承认自己温柔外壳下存在强烈的独占欲；制作人没有否定这份恐怖的真情，而是把它定义为她作为单人偶像最锋利的核心。"
    },
    80: {
      title: "回应式战书",
      objective: "通过观摩手毬演出确认差距与决心，让美铃以自己的歌声向手毬发出回应式挑战。",
      canonAnchor: "作为头号粉丝观摩手毬演出、对不顾一切演出的担忧与胃药关怀、以自身歌声为回击的战书、亲口教训并直面手毬。",
      phase1Title: "第一轮选项：制作人如何陪她看完手毬的演出",
      phase1Setup: "开场写美铃作为头号粉丝观摩手毬演出。她看得很认真，也因为手毬不顾一切的燃烧方式而担心；停在制作人如何回应她复杂表情的时刻。",
      phase1Options: [
        "承认手毬很强，同时指出美铃看见的是自己必须回应的光",
        "把胃药递给她，提醒她担心也可以成为战斗理由",
        "问她现在更想照顾手毬，还是更想赢过手毬",
        "告诉她不用假装冷静，她现在的嫉妒和担心都是真的"
      ],
      phase2Title: "第二轮选项：美铃如何把担忧变成战书",
      phase2Setup: "中段必须推进到美铃决定用自己的歌声回应手毬。她不是回到过去做支撑者，而是亲口教训、直面手毬，并把下一次演出变成战书。",
      phase2Options: [
        "“那就用你的歌告诉她：别再一个人乱来了。”",
        "“如果你是她的头号粉丝，就亲口去教训她。”",
        "“这次不是胃药，也不是搀扶。把你的歌递到她面前。”",
        "“别回到 SyngUp 的位置。站在她对面，让她听见你。”"
      ],
      resolution: "美铃把担忧、嫉妒和怀念整理成回应式挑战；她决定不再只照顾手毬，而是用自己的舞台与歌声直面手毬。"
    }
  };

  const amayaBondRoutes = {
    20: {
      title: "不承认需要谁",
      objective: "让燕在训练方案冲突中意识到自己并没有想象过超越星南后的偶像形态，并把星南退圈消息转化成明确目标。",
      canonAnchor: "训练量不能输星南、漫无目的、想象不出超越星南后的自己、星南要毕业后退出偶像转做制作人、燕震怒并决心夺下一等星阻止星南退圈。",
      phase1Title: "第一轮选项：制作人如何打断她的死撑训练",
      phase1Setup: "开场写燕认真投入训练，擅自加量到接近极限。她把每一次调整都理解成制作人小看自己，停在制作人必须指出训练问题的时刻。",
      phase1Options: [
        "直接指出她只是在堆训练量，不是在设计胜利路线",
        "要求她说出超越星南之后想成为什么样的偶像",
        "把训练记录摊开，证明她把尊严和效率混在一起",
        "激她承认：现在的她只是害怕输给星南才停不下来"
      ],
      phase2Title: "第二轮选项：星南退圈消息传来后，制作人如何回应",
      phase2Setup: "中段必须让星南毕业后可能退出偶像、转做制作人的消息传来。燕无法接受，把它理解成星南从未把自己当对手。",
      phase2Options: [
        "“那就夺下一等星，让她没法装作你不是对手。”",
        "“你愤怒不是因为她要离开，而是因为你还没赢过她。”",
        "“阻止她退圈可以成为目标，但别再只用训练量证明自己。”",
        "“先想清楚赢过星南以后，你要站在哪里。”"
      ],
      resolution: "燕把退圈消息转化成夺下一等星的目标；她仍嘴硬地把进步全归自己，却开始按制作人的方案寻找真正的胜利路线。"
    },
    40: {
      title: "帅气凛然",
      objective: "把燕做不出可爱的短板翻转成帅气凛然的武器，让她在抗拒中尝试陌生形象，并埋下轻敌伏笔。",
      canonAnchor: "做不出可爱、缺陷翻转成帅气凛然、抗拒过去偶像人生被否定、苦战参考、出丑、重练、SNS爆火、轻视一年级后辈。",
      phase1Title: "第一轮选项：制作人如何指出可爱短板",
      phase1Setup: "开场写燕试图完成可爱方向的表现，却因自尊和习惯显得僵硬。她不肯承认失败，停在制作人必须点破短板的时刻。",
      phase1Options: [
        "直接说她现在做不出可爱，但这不等于没有魅力",
        "让她看录像，指出她最自然的瞬间反而是凛然表情",
        "把可爱训练暂停，要求她先尝试帅气方向",
        "承认这会否定她过去的偶像习惯，但不是否定她本人"
      ],
      phase2Title: "第二轮选项：新形象爆火后，制作人如何压住轻敌",
      phase2Setup: "中段必须写燕苦战参考、出丑、重练后，以帅气方向在 SNS 爆火。成功让她重新抬高姿态，并开始轻视一年级后辈。",
      phase2Options: [
        "“爆火只是证明方向有效，不代表你已经赢了。”",
        "“你刚学会一种武器，现在最危险的是以为自己无敌。”",
        "“别用看不起后辈的方式，重演你对星南的不甘。”",
        "“如果你真想成为一等星，就把所有对手都当成会刺伤你的人。”"
      ],
      resolution: "燕嘴硬接受帅气凛然方向，把短板转成新的舞台武器；但她对后辈的轻视也被留下，成为下一节点失利的伏笔。"
    },
    60: {
      title: "跌落第二",
      objective: "让燕在 H.I.F 选拔中输给秦谷美铃，粉碎安于第二的扭曲自尊，并第一次把脆弱和信任交给制作人。",
      canonAnchor: "H.I.F选拔、轻敌应战、输给一年级秦谷美铃、跌到第二、后台崩溃痛哭、制作人坦白设局、粉碎安于第二、假装追赶其实早就放弃、要求你要支撑着我。",
      phase1Title: "第一轮选项：制作人如何把她推向选拔局",
      phase1Setup: "开场写 H.I.F 选拔前，燕因 SNS 爆火而轻敌，尤其看不起一年级的美铃。停在制作人是否提醒她这场较量危险的时刻。",
      phase1Options: [
        "不阻止她轻敌，只记录她怎样把对手看低",
        "提醒她美铃不是随便能踩过去的后辈",
        "告诉她这场选拔会夺走她学园No.2的安全感",
        "让她带着现在的自负上场，亲眼确认自己会被刺伤"
      ],
      phase2Title: "第二轮选项：后台崩溃后，制作人如何承认设局",
      phase2Setup: "中段必须写燕轻敌应战后输给美铃，连学园No.2的实质都没守住。后台无人时她失态痛哭，制作人坦白这场较量是自己设的局。",
      phase2Options: [
        "“是我设的局。我要粉碎你安于第二的自尊。”",
        "“你不是一直追赶星南，你是在用第二名保护自己。”",
        "“恨我也可以。但你现在终于能抬头看她了。”",
        "“哭完就站起来。接下来由我支撑着你。”"
      ],
      resolution: "燕在痛哭中承认自己一直假装追赶、其实早已放弃；她对制作人又恨又依赖，第一次要求“你要支撑着我”，真正以星南为对手重新站起。"
    },
    80: {
      title: "平视一等星",
      objective: "让燕承认自己一直憧憬并神化星南，封存憧憬后以平视的眼光挑战并战胜星南，把制作人认作并肩的人。",
      canonAnchor: "星南因制作人让燕挑战自己而失望离开、夜练回忆青梅竹马、承认憧憬星南、神化对手导致屡败、封存憧憬、试镜紧张、战胜星南、能赢星南是我们的力量。",
      phase1Title: "第一轮选项：夜练中制作人如何逼她承认憧憬",
      phase1Setup: "开场写星南因制作人让燕来挑战自己而失望离开。夜练中，燕讲起与星南青梅竹马的往事，停在制作人是否点破她真正感情的时刻。",
      phase1Options: [
        "直接说她一直憧憬星南，才会把对手神化到无法战胜",
        "问她眼里的星南到底是人，还是永远追不上的光",
        "指出她每次说要超越，其实都在确认星南有多特别",
        "让她把青梅竹马的回忆和舞台上的对手分开"
      ],
      phase2Title: "第二轮选项：登台前，制作人如何让她平视星南",
      phase2Setup: "中段必须推进到试镜前。燕第一次体会绝对不能输的紧张，却也同意暂时封存憧憬，用平视的眼光面对星南。",
      phase2Options: [
        "“今天不要仰望她。看着她的眼睛，把她当成要赢的对手。”",
        "“憧憬可以留到台下，台上只需要雨夜燕。”",
        "“你不是一个人挑战星南。我们的方案会一起站上去。”",
        "“紧张就对了。那说明你终于相信自己有资格赢。”"
      ],
      resolution: "燕登台战胜星南夺第一，并打断制作人的谦虚，确认能赢星南是“我们的力量”；她把制作人认作并肩的人，而不只是利用的策士。"
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
    freeMode: {
      unlocked: false,
      active: false,
      entryPromptSeen: false,
      layoutEditBypass: false,
      postLiveDay: 1,
      clockMinutes: FREE_MODE_DAY_START_MINUTES,
      presenceSlotKey: "",
      presence: {},
      activeLocationId: null
    },
    activeStoryNode: null,
    log: [],
    boundCharacter: null,
    producer: {
      name: "{{user}}",
      gender: "",
      personality: "",
      style: "",
      settings: ""
    },
    produceOptions: {
      skipLessonTrainingAiStory: false
    },
    lastStory: "请选择行动",
    lastEventTitle: "",
    lastEventResult: "",
    lastEventStory: "",
    lastPrompt: "",
    lastDebug: "尚未结算行动。",
    pendingAiRequestId: "",
    lastRequestId: "",
    eventMode: "none",
    choiceStep: 0,
    pendingChoiceRewards: [],
    pendingActionContext: null,
    intimacyRoute: null,
    pendingOptionTexts: [],
    pendingOptionMinutes: [],
    selectedChoiceText: "",
    selectedChoiceRating: "",
    bondChoiceRound: 0,
    bondFirstChoiceText: "",
    dailySummary: {
      day: 0,
      intro: "",
      status: "",
      producer: "",
      raw: "",
      complete: false
    },
    phoneChat: {
      activeView: "home",
      activeThreadId: "",
      threads: [],
      messages: {},
      friends: [],
      isAwaitingReply: false,
      pendingRequestId: "",
      retryAvailable: false
    }
  };

  const statLabels = { Vo: "Vocal", Da: "Dance", Vi: "Visual", stamina: "体力", stress: "压力", trust: "信赖" };
  const statShort = { Vo: "Vo.", Da: "Da.", Vi: "Vi." };
  const statIcons = { Vo: "mic", Da: "dance", Vi: "visual" };
  const statColors = { Vo: "#ff4f9a", Da: "#26a9f4", Vi: "#ffca35" };
  const actionIcons = { lesson: "book", training: "dance", rest: "rest", outing: "map", companion: "chat", intimacy: "heart", freechat: "chat", interaction: "star", bond: "heart", day_summary: "file", phone: "phone", next_day: "calendar", world_map: "map", live: "mic" };
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
    outing: "./assets/bgm/out.mp3",
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

  function isPhoneMusicPlaying() {
    const audio = document.getElementById("phoneMusicAudio");
    return !!(audio && !audio.paused && !audio.ended && audio.currentTime > 0);
  }

  function updateBgm() {
    // 小手机音乐播放器优先：只要在放歌，游戏 BGM 让位（即使切换场景也不会盖上来）。
    if (isPhoneMusicPlaying()) {
      bgmManager.stop();
      return;
    }

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

    const companionOverlay = document.getElementById("companionOverlay");
    if (companionOverlay && !companionOverlay.hidden) {
      bgmManager.play("talk");
      return;
    }

    const intimacyOverlay = document.getElementById("intimacyOverlay");
    if (intimacyOverlay && !intimacyOverlay.hidden) {
      bgmManager.play("talk");
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
  let phoneChatTypingVisible = false;
  let phoneChatDeliveryTimer = null;
  let deferredLivePostReply = null;
  let interactionMode = "specified";
  let selectedInteractionCharacters = new Set();
  let activeStorageKey = STORAGE_KEY;
  let activeHostSaveScope = "";
  let hostStateReady = false;
  const aiBridgeDebug = {
    lastPromptRequest: null,
    lastReply: null,
    lastAck: null,
    lastOverlay: null,
    lastMessage: "尚未记录 AI 桥接事件",
    promptHistory: [],
    openingDispatches: []
  };
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
      // 不恢复在途请求：pendingAiRequestId 是“本页正在等待某次生成回复”的会话级状态。
      // 页面重载（退出后重进前端）后，之前那次生成不会再向新页面投递回复，若把它恢复为真值，
      // openEventOverlay 会一直走 isLoading 分支——把整段剧情塞进单个对话框且禁用点击，导致卡死。
      loaded.pendingAiRequestId = "";
      pendingAiRequestId = "";
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
      bondUnlockDay: {},
      ...(state.affinity || {})
    };
    state.affinity.unlocked = Array.from(new Set(state.affinity.unlocked || [])).map(Number).sort((a, b) => a - b);
    state.affinity.pending = Array.from(new Set(state.affinity.pending || [])).map(Number).sort((a, b) => a - b);
    state.affinity.viewed = Array.from(new Set(state.affinity.viewed || [])).map(Number).sort((a, b) => a - b);
    state.firstLive = { completed: false, success: false, result: null, ...(state.firstLive || {}) };
    state.freeMode = {
      unlocked: false,
      active: false,
      entryPromptSeen: false,
      layoutEditBypass: false,
      postLiveDay: 1,
      clockMinutes: FREE_MODE_DAY_START_MINUTES,
      presenceSlotKey: "",
      presence: {},
      activeLocationId: null,
      ...(state.freeMode || {})
    };
    if (!Number.isFinite(Number(state.freeMode.postLiveDay)) || state.freeMode.postLiveDay < 1) {
      state.freeMode.postLiveDay = 1;
    }
    if (!Number.isFinite(Number(state.freeMode.clockMinutes))) {
      state.freeMode.clockMinutes = FREE_MODE_DAY_START_MINUTES;
    }
    if (!state.freeMode.presence || typeof state.freeMode.presence !== "object") {
      state.freeMode.presence = {};
    }
    if (state.freeMode.locationId && !state.freeMode.activeLocationId) {
      state.freeMode.activeLocationId = state.freeMode.locationId;
    }
    delete state.freeMode.locationId;
    if (state.firstLive.completed && !state.freeMode.unlocked) {
      state.freeMode.unlocked = true;
    }
    state.activeStoryNode = state.activeStoryNode || null;
    state.producer = {
      name: "{{user}}",
      gender: "",
      personality: "",
      style: "",
      settings: "",
      ...(state.producer || {})
    };
    state.produceOptions = {
      skipLessonTrainingAiStory: false,
      ...(state.produceOptions || {})
    };
    if (state.produceOptions.skipTrainingAiStory) {
      state.produceOptions.skipLessonTrainingAiStory = true;
      delete state.produceOptions.skipTrainingAiStory;
    }
    state.produceOptions.skipLessonTrainingAiStory = Boolean(state.produceOptions.skipLessonTrainingAiStory);
    state.eventMode = state.eventMode || "none";
    state.choiceStep = Number.isInteger(state.choiceStep) ? state.choiceStep : 0;
    state.pendingChoiceRewards = Array.isArray(state.pendingChoiceRewards) ? state.pendingChoiceRewards : [];
    state.pendingActionContext = state.pendingActionContext || null;
    state.intimacyRoute = state.intimacyRoute || null;
    state.pendingOptionTexts = Array.isArray(state.pendingOptionTexts) ? state.pendingOptionTexts : [];
    state.pendingOptionMinutes = Array.isArray(state.pendingOptionMinutes) ? state.pendingOptionMinutes : [];
    state.selectedChoiceText = state.selectedChoiceText || "";
    state.selectedChoiceRating = state.selectedChoiceRating || "";
    state.bondChoiceRound = Number.isInteger(state.bondChoiceRound) ? state.bondChoiceRound : 0;
    state.bondFirstChoiceText = state.bondFirstChoiceText || "";
    state.dailySummary = {
      day: 0,
      intro: "",
      status: "",
      producer: "",
      raw: "",
      complete: false,
      ...(state.dailySummary || {})
    };
    state.phoneChat = {
      activeView: "home",
      activeThreadId: "",
      threads: [],
      messages: {},
      friends: [],
      isAwaitingReply: false,
      pendingRequestId: "",
      retryAvailable: false,
      ...(state.phoneChat || {})
    };
    state.phoneChat.friends = Array.from(new Set((state.phoneChat.friends || [])
      .map((name) => canonicalIdolName(name))
      .filter((name) => name && idols[name] && name !== state.idol)));
    if (!state.phoneChat.messages || typeof state.phoneChat.messages !== "object") {
      state.phoneChat.messages = {};
    }
    if (!Array.isArray(state.phoneChat.threads)) {
      state.phoneChat.threads = [];
    }
    if (!Number.isInteger(state.round) || state.round < 1) state.round = 1;
    if (state.round > SUMMARY_ROUND) state.round = SUMMARY_ROUND;
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
    if (state.day <= FINAL_LIVE_DAY - 1) return "First Live 后期";
    return "First Live 当日";
  }

  function daysLeft() {
    return Math.max(0, FINAL_LIVE_DAY + 1 - state.day);
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
      if (REQUIRED_BOND_THRESHOLDS.includes(Number(threshold))) {
        state.affinity.bondUnlockDay = state.affinity.bondUnlockDay || {};
        state.affinity.bondUnlockDay[threshold] = state.day;
      }
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
    if (state.trust >= 80) markAffinityUnlocked(80);
    if (state.trust >= 100 && state.firstLive.success) markAffinityUnlocked(100);
  }

  function pendingAffinityCount() {
    ensureStateShape();
    return state.affinity.pending.filter((threshold) => threshold !== 0 || !state.affinity.openingComplete).length;
  }

  function pendingRequiredBondThreshold() {
    ensureStateShape();
    const pending = state.affinity.pending || [];
    return REQUIRED_BOND_THRESHOLDS.find((threshold) => {
      if (!pending.includes(threshold) || state.affinity.viewed.includes(threshold)) return false;
      const unlockDay = Number(state.affinity.bondUnlockDay?.[threshold]);
      return !Number.isFinite(unlockDay) || state.day > unlockDay;
    }) || null;
  }

  function isBondEventDay() {
    return Boolean(state.idol && !state.liveReady && pendingRequiredBondThreshold());
  }

  function pendingFinalAffinityThreshold() {
    ensureStateShape();
    const threshold = 100;
    if (!state.idol || !state.firstLive.success) return null;
    if (!state.affinity.pending.includes(threshold) || state.affinity.viewed.includes(threshold)) return null;
    return threshold;
  }

  function pendingAffinityActionThreshold() {
    return pendingRequiredBondThreshold() || pendingFinalAffinityThreshold();
  }

  function completeBondEventDay(threshold) {
    markAffinityViewed(Number(threshold));
    state.activeStoryNode = null;
    state.round = 1;
    if (state.day >= FINAL_LIVE_DAY - 1) {
      state.day = FINAL_LIVE_DAY;
      state.liveReady = true;
    } else {
      state.day += 1;
    }
  }

  function actionLabel(action, attribute) {
    const names = {
      lesson: "上课",
      training: "训练",
      rest: "休息",
      outing: "外出",
      companion: "交流",
      intimacy: "亲密",
      bond: "羁绊事件",
      map_location: "地图探索"
    };
    const sp = action === "training" && attribute && state.sp?.[attribute] ? "SP" : "";
    return attribute ? `${attribute}${sp}${names[action]}` : names[action];
  }

  function isChoicePromptAction(action) {
    return action === "outing" || action === "companion" || action === "intimacy" || action === "bond" || action === "map_location";
  }

  function isChoicePromptMode() {
    return state.eventMode === "choice_prompt" && isChoicePromptAction(state.pendingActionContext?.action);
  }

  function isChoiceResolutionMode() {
    return state.eventMode === "choice_resolution";
  }

  function currentChoiceActionTitle() {
    if (isNsfwIntimacyActive()) return nsfwIntimacyActionTitle();
    if (state.pendingActionContext?.action === "map_location") {
      const actionContext = state.pendingActionContext.actionContext || {};
      const location = resolveMapExploreLocation(actionContext.locationId, actionContext);
      const locationName = location?.name || actionContext.locationName || "地图探索";
      return `${locationName} · 探索`;
    }
    if (state.pendingActionContext?.action === "bond") {
      const threshold = state.pendingActionContext.threshold;
      return `好感度 ${threshold}：${affinityNodes[threshold]?.title || "羁绊事件"}`;
    }
    return state.pendingActionContext
      ? actionLabel(state.pendingActionContext.action, state.pendingActionContext.attribute)
      : "外出/交流/亲密";
  }

  function roundLabel() {
    if (state.round === SUMMARY_ROUND) return "每日总结轮次";
    if (state.round === 4) return "每日额外轮次";
    return `第 ${state.round || 1} / 3 轮行动`;
  }

  function isExtraRound() {
    return state.round === 4;
  }

  function isSummaryRound() {
    return state.round === SUMMARY_ROUND;
  }

  function advanceDay() {
    if (!isSummaryRound()) return false;
    state.round = 1;
    if (state.day >= FINAL_LIVE_DAY - 1) {
      state.day = FINAL_LIVE_DAY;
      state.liveReady = true;
    } else {
      state.day += 1;
    }
    state.dailySummary = {
      day: state.day,
      intro: "",
      status: "",
      producer: "",
      raw: "",
      complete: false
    };
    return true;
  }

  function enterNextDay() {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择本次育成的担当。", "warn");
      return;
    }
    if (!isSummaryRound()) {
      showToast("尚未到总结轮次", "完成四轮行动后，才能进入下一天。", "warn");
      return;
    }
    if (state.liveReady) {
      showToast("日程已锁定", "当前已进入最终日程，无法继续推进天数。", "warn");
      return;
    }
    if (!advanceDay()) return;
    rollSpCandidates();
    saveState();
    render();
    if (state.liveReady) {
      showToast("最终日程", "First Live 已解锁，请开始最终演出。", "gold");
      return;
    }
    showToast("进入新一天", `第 ${state.day} 天开始了。`, "info");
    if (isBondEventDay()) {
      const threshold = pendingRequiredBondThreshold();
      showToast("羁绊事件日", threshold ? `今天需要先完成好感度 ${threshold} 的羁绊事件。` : "今天需要先完成羁绊事件。", "warn");
    }
  }

  function hasEnoughStaminaForAction(action) {
    const staminaDelta = getActionTuning(state.idol, action).staminaDelta;
    return staminaDelta >= 0 || Number(state.stamina || 0) >= Math.abs(staminaDelta);
  }

  function isIntimacyUnlocked() {
    return Number(state.trust || 0) >= INTIMACY_UNLOCK_TRUST;
  }

  function isIntimacyNsfwUnlocked() {
    return Number(state.trust || 0) >= INTIMACY_NSFW_UNLOCK_TRUST;
  }

  function getIntimacyMode() {
    if (state.pendingActionContext?.action !== "intimacy") return "";
    return state.intimacyRoute
      || state.pendingActionContext?.intimacyMode
      || state.pendingActionContext?.actionContext?.intimacyMode
      || "normal";
  }

  function isNsfwIntimacyActive() {
    return state.pendingActionContext?.action === "intimacy" && getIntimacyMode() === "nsfw";
  }

  function clearIntimacyRoute() {
    state.intimacyRoute = null;
  }

  function buildNsfwIntimacyChatContextLine() {
    return `上下文说明：
- 本次 NSFW 亲密的前文剧情与互动已在当前 SillyTavern 聊天记录中，请直接承接上文。
- 不要复述前文，只写本轮新增内容。`;
  }

  function nsfwIntimacyActionTitle() {
    return "NSFW 亲密";
  }

  function isActionAvailable(action) {
    if (isBondEventDay()) return action === "bond";
    const scheduleAvailable = isExtraRound()
      ? (action === "intimacy" ? isIntimacyUnlocked() : new Set(["outing", "companion"]).has(action))
      : new Set(["lesson", "training", "rest"]).has(action);
    return scheduleAvailable && hasEnoughStaminaForAction(action);
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
    if (state.round === 4) {
      state.round = SUMMARY_ROUND;
    }
  }

  function isSkipLessonTrainingAiStoryEnabled() {
    return Boolean(state.produceOptions?.skipLessonTrainingAiStory);
  }

  function finalizeProduceActionWithoutAi(actionName, resultSummary) {
    pendingAiRequestId = "";
    state.pendingAiRequestId = "";
    state.eventMode = "none";
    state.choiceStep = 0;
    state.lastStory = `${actionName}已完成（已跳过 AI 叙事）。\n\n${resultSummary}`;
    state.lastEventTitle = actionName;
    state.lastEventResult = resultSummary;
    state.lastEventStory = state.lastStory;
    state.lastDebug = `${actionName}：前端已结算并跳过 SillyTavern 叙事。`;
    saveState();
    render();
    showToast("行动完成", `${actionName}已结算，已跳过 AI 叙事并进入下一轮。`, "info");
  }

  function settleAction(action, attribute, actionContext = {}) {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择本次育成的担当。", "warn");
      return;
    }
    if (!state.affinity.openingComplete) {
      recordDebugOpeningDispatch("行动拦截：openingComplete 为 false");
      triggerAffinityStory(0);
      return;
    }
    if (state.liveReady) {
      startFirstLive();
      return;
    }
    if (isBondEventDay()) {
      showToast("羁绊事件日", "今天需要先完成已解锁的羁绊事件。", "warn");
      triggerAffinityStory(pendingRequiredBondThreshold());
      return;
    }
    if (!isActionAvailable(action)) {
      if (isSummaryRound()) {
        showToast("总结轮次", "请选择今日总结或进入下一天。", "warn");
      } else {
        showToast("当前轮次不可用", "前三轮只开放上课、训练和休息；额外轮次开放外出、交流和信赖60后的亲密。", "warn");
      }
      return;
    }

    if (action === "companion" && !String(actionContext.companionTopic || "").trim()) {
      openCompanionOverlay();
      return;
    }

    state.pendingActionContext = {
      action,
      attribute,
      intimacyMode: action === "intimacy" ? (actionContext.intimacyMode === "nsfw" ? "nsfw" : "normal") : undefined,
      actionContext: {
        ...actionContext,
        intimacyMode: action === "intimacy" ? (actionContext.intimacyMode === "nsfw" ? "nsfw" : "normal") : actionContext.intimacyMode,
        isDailyFinalAction: isExtraRound() && ["outing", "companion", "intimacy"].includes(action)
      }
    };
    if (action === "intimacy") {
      state.intimacyRoute = state.pendingActionContext.intimacyMode;
    } else {
      clearIntimacyRoute();
    }

    if (action === "outing" || action === "companion" || action === "intimacy") {
      const choiceContext = state.pendingActionContext.actionContext;
      state.eventMode = "choice_prompt";
      state.choiceStep = 1;
      
      const baseRewards = action === "outing" ? [10, 8, 6, 4] : action === "companion" ? [20, 15, 10, 5] : [0, 0, 0, 0];
      // 随机分配
      const shuffled = [...baseRewards].sort(() => Math.random() - 0.5);
      state.pendingChoiceRewards = shuffled;
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
      
      const actionName = isNsfwIntimacyActive() ? nsfwIntimacyActionTitle() : actionLabel(action, attribute);
      const requestId = createRequestId();
      pendingAiRequestId = requestId;
      
      const prompt = isNsfwIntimacyActive()
        ? buildNsfwIntimacyOpeningPrompt(choiceContext)
        : buildChoicePhase1Prompt(action, attribute, shuffled, choiceContext);
      
      const resultSummary = action === "outing" 
        ? `准备前往：${actionContext.destination || "散步"}` 
        : action === "companion"
          ? `交流主题：${actionContext.companionTopic || "日常闲聊"}`
          : isNsfwIntimacyActive()
            ? `与${state.idol}进行 NSFW 亲密互动`
            : `与${state.idol}进行普通亲密互动`;
      
      const story = action === "outing"
        ? `正在前往 ${actionContext.destination || "散步"}...`
        : action === "companion"
          ? `正在围绕「${actionContext.companionTopic || "日常闲聊"}」与${state.idol}展开交流...`
          : isNsfwIntimacyActive()
            ? `正在准备与${state.idol}的 NSFW 亲密场景...`
            : `正在准备与${state.idol}的普通亲密场景...`;
        
      state.lastStory = story;
      state.lastPrompt = prompt;
      state.lastDebug = action === "intimacy"
        ? isNsfwIntimacyActive()
          ? "NSFW 亲密开场：等待 AI 生成 VN 剧情与 4 个选项（含自定义/结束入口）。"
          : "普通亲密：等待 AI 设计 4 个选项。本行动固定结算体力 +38、压力 -10、信赖 +20。"
        : `第一阶段剧情生成：等待 AI 设计 4 个选项。加成映射：\n` + shuffled.map((r, i) => `选项 ${i + 1} 对应加成 +${r}`).join("\n");
      
      saveState();
      render();
      
      setElementHidden("eventChoices", true);
      const actionsEl = document.getElementById("eventActions");
      if (actionsEl) actionsEl.style.display = "none";
      
      openEventOverlay(actionName, buildAiWaitingResult(resultSummary), buildAiWaitingStory(story));
      
      if (!requestHostPromptSend(prompt, requestId)) {
        openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制提示词后手动发送。");
      }
      showToast("开始发起活动", isNsfwIntimacyActive()
        ? "正在等待 AI 生成 NSFW 亲密剧情与选项..."
        : `正在等待 AI 生成${actionName}剧情与互动选项...`, "info");
      return;
    }

    state.eventMode = "none";
    state.choiceStep = 0;
    state.pendingChoiceRewards = [];
    state.pendingOptionTexts = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";

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
    } else if (action === "intimacy") {
      delta.stamina = 38;
      delta.stress = -10;
      delta.trust = INTIMACY_NORMAL_TRUST_GAIN;
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
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary, rawAction: action, rawAttribute: attribute });
    state.log = state.log.slice(0, 24);

    refreshAffinityUnlocks();
    advanceRound();
    rollSpCandidates();
    saveState();
    render();
    if (["lesson", "training"].includes(action) && isSkipLessonTrainingAiStoryEnabled()) {
      finalizeProduceActionWithoutAi(actionName, resultSummary);
      return;
    }
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

  function galgameRenderContract(mode = "normal") {
    if (mode === "choice") {
      return `【初星学园 Galgame 渲染规则契约】

选项剧情模式：
如果本次提示词明确要求输出 <option1> 到 <option4>，则必须使用以下结构：

【初星正文开始】
<story>
<narration>...</narration>
<dialogue char="角色名">“...”</dialogue>
</story>
<option1>选项文本</option1>
<option2>选项文本</option2>
<option3>选项文本</option3>
<option4>选项文本</option4>
【初星正文结束】

限制：
- 选项剧情必须输出完整四个 option。
- <story> 内部只能使用 <dialogue> 和 <narration>。
- 不要输出 Markdown、列表、数值结算、解释文本。`;
    }

    return `【初星学园 Galgame 渲染规则契约】

普通剧情模式：
正文必须放在：
【初星正文开始】
...
【初星正文结束】

普通剧情中只使用：
<dialogue char="角色名">“台词”</dialogue>
<narration>旁白或动作</narration>

限制：
- 普通剧情不要输出 option。
- 不要输出 Markdown、列表、数值结算、解释文本。`;
  }

  function outputContract(maxText) {
    return `${galgameRenderContract("normal")}

输出格式要求：
1. 不要改变或重新计算前端已结算的数值。
2. 不要在【初星正文开始】之前或【初星正文结束】之后输出任何内容。
- ${maxText}`;
  }

  function buildProducerPromptSection() {
    if (!state.producer) return "";
    return `
制作人（{{user}}）设定：
- 称呼：${state.producer.name || "{{user}}"}
- 性别：${state.producer.gender || "由 AI 自行发挥"}
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

    const narrativeLength = ["outing", "companion", "intimacy"].includes(action)
      ? "请写一段 900 字以内的完整场景叙事。本次回复需要把本次行动的情景从开始、互动推进到当天收束完整写完，不要停在待续。"
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
    if (action === "intimacy" && getIntimacyMode() === "nsfw") {
      return buildNsfwIntimacyOpeningPrompt(actionContext);
    }

    const profile = idols[state.idol];
    const actionName = actionLabel(action, attribute);
    const actionStyle = action === "intimacy"
      ? `${profile.styles.companion || profile.styles.rest} 这是信赖值60后解锁的普通亲密互动，重点写安心、信任、被允许靠近与互相照顾。`
      : profile.styles[action] || profile.styles.rest;
    
    const destinationPrompt = action === "outing" && actionContext.destination ? `
本次外出地点：${actionContext.destination}

外出场景要求：
- 制作人与担当偶像确实来到该地点活动。
- 利用该地点可见的设施、商品、声音、气味或人群推动互动。
- 剧情前半部分在抵达并展开活动、进入需要制作人表态或做选择的时刻停下。
` : "";

    const companionTopicPrompt = action === "companion" && actionContext.companionTopic ? `
制作人指定的交流内容：
${actionContext.companionTopic}

交流场景要求：
- 前半段剧情必须围绕制作人指定的交流内容展开，不要擅自改成无关话题。
- 选项必须是制作人对当前交流情境的四种不同回应方式，且应与指定内容相关。
- 剧情前半部分在交流自然推进、进入需要制作人表态或做选择的时刻停下。
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

    const optionsPrompt = action === "intimacy"
      ? [
          "- 选项 1：摸头、整理发丝、轻声夸奖之类的温柔安抚。",
          "- 选项 2：牵手、并肩坐下、靠肩休息之类的安心陪伴。",
          "- 选项 3：短暂拥抱、披外套、递热饮之类的照顾动作。",
          "- 选项 4：带一点笨拙或害羞，的亲近举动。"
        ].join("\n")
      : shuffledRewards.map((reward, index) => {
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

${destinationPrompt}${companionTopicPrompt}

请为本次${actionName}生成【前半段剧情】并设计【4个互动分支选项】供制作人选择。
${action === "intimacy"
  ? "\n普通亲密限制：本次写亲密、照顾、安抚、撒娇、拥抱、牵手、摸头、靠肩等清水向内容。不要写 NSFW 或成人向描写。"
  : ""}

${galgameRenderContract("choice")}

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

${action === "intimacy" ? "亲密选项方向（四个选项都应是正向但风味不同的亲近方式）：" : "选项生成质量映射规则（请根据以下等级设计对应好感的回复）："}
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

  function buildMapLocationPresenceLine(locationId) {
    if (locationId === FREE_MODE_OUTING_LOCATION_ID) return "";
    const idolsHere = getIdolsPresentAtLocation(locationId);
    if (!idolsHere.length) return "当前该地点没有已确认到场的其他偶像。";
    return `当前该地点可能在场的偶像：${idolsHere.join("、")}。请自然写入剧情，但不要替前端重新决定她们是否在场。`;
  }

  function summarizeMapExploreContext() {
    const text = String(state.lastStory || "").trim();
    if (!text) return "（暂无上文）";
    return text.length > 1200 ? text.slice(-1200) : text;
  }

  function buildMapLocationVisitModeLine(visitMode = "with_idol") {
    const idol = state.idol || "担当偶像";
    if (visitMode === "alone") {
      return `到场方式：制作人独自前往，担当偶像 ${idol} 不在身边同行。`;
    }
    return `到场方式：制作人与担当偶像 ${idol} 一起到场。`;
  }

  function getMapLocationVisitMode() {
    return state.pendingActionContext?.actionContext?.visitMode === "alone" ? "alone" : "with_idol";
  }

  function buildMapLocationExplorePrompt(locationId, options = {}) {
    const { continuation = false } = options;
    const actionContext = options.actionContext || state.pendingActionContext?.actionContext || {};
    const location = resolveMapExploreLocation(locationId, actionContext);
    if (!location) return "";
    const visitMode = options.visitMode || getMapLocationVisitMode();
    const idol = state.idol || "担当偶像";
    const sceneInstruction = continuation
      ? `请承接下文摘要，写制作人继续留在 ${location.name} 的下一轮场景，并设计 4 个新的下一步行动选项。
- 不要重复已经发生过的事件；从当前时间点自然续写。
- 上文摘要（仅供衔接，不要原文复述）：
${summarizeMapExploreContext()}`
      : visitMode === "alone"
        ? `请写制作人独自来到 ${location.name} 刚到达时的开场场景，并设计 4 个不同的下一步行动选项。担当偶像 ${idol} 不在身边同行。`
        : `请写制作人与担当偶像 ${idol} 一起来到 ${location.name} 刚到达时的开场场景，并设计 4 个不同的下一步行动选项。`;
    const presenceLine = buildMapLocationPresenceLine(locationId);
    return `[初星育成系统：自由模式 · 地点探索]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前时间：${formatFreeModeDayLabel()} ${formatFreeModeClock()}
地点：${location.name}
地点说明：${location.description}

${buildMapLocationVisitModeLine(visitMode)}
${presenceLine ? `\n${presenceLine}` : ""}

${buildProducerPromptSection()}

${sceneInstruction}
- 这是 First Live 后的学园自由探索，不是育成日程行动。
- 抵达该地点时前端已推进 ${FREE_MODE_MAP_ARRIVAL_MINUTES} 分钟；玩家每选择一项 option 后，前端会按对应 time 标签推进分钟数（缺失时默认 ${FREE_MODE_MAP_CHOICE_MINUTES} 分钟），并立即进入下一轮选项。
- 你只需写当前场景、4 个 option 与 4 个 time 标记，不要写选项被选中后的收尾或结算段落。
- 不要结算或修改任何数值。
- 选项必须是制作人第一人称口吻，风味不同，且都适合在该地点继续推进。

选项耗时标记：
- 请为每个 option 额外输出对应的 <time1> 到 <time4>，内容为纯整数分钟（建议 5-${FREE_MODE_MAP_MINUTES_MAX}）。
- 表示执行该 option 预计消耗的时间；简短行动可 5-15 分钟，较耗时行动可 30-90 分钟。

${galgameRenderContract("choice")}

地图选项输出示例：
【初星正文开始】
<story>...</story>
<option1>...</option1>
<time1>15</time1>
<option2>...</option2>
<time2>45</time2>
<option3>...</option3>
<time3>10</time3>
<option4>...</option4>
<time4>30</time4>
【初星正文结束】

==================================================
⚠️⚠️【输出硬规则：违反本规则将导致整个游戏崩溃报错，请务必严格服从！】⚠️⚠️
1. 你必须严格且完整地把所有输出包裹在【初星正文开始】与【初星正文结束】分隔符内。
2. 分隔符之内，必须包含 <story>、<option1> 到 <option4>，以及 <time1> 到 <time4> 共 9 个 XML 标签。
3. time 标签内只能是整数分钟；缺失或无效时前端默认 ${FREE_MODE_MAP_CHOICE_MINUTES} 分钟。
4. 选项标签内部不要带“选项 1：”等系统前缀。
5. 不要在标签外写任何思考、计划、规则复述或系统说明。
==================================================`;
  }

  function buildFreeModeOutingExplorePrompt(options = {}) {
    const { continuation = false } = options;
    const actionContext = options.actionContext || state.pendingActionContext?.actionContext || {};
    const location = resolveMapExploreLocation(FREE_MODE_OUTING_LOCATION_ID, actionContext);
    if (!location) return "";
    const visitMode = options.visitMode || getMapLocationVisitMode();
    const idol = state.idol || "担当偶像";
    const sceneInstruction = continuation
      ? `请承接下文摘要，写制作人继续在校外 ${location.name} 活动的下一轮场景，并设计 4 个新的下一步行动选项。
- 不要重复已经发生过的事件；从当前时间点自然续写。
- 上文摘要（仅供衔接，不要原文复述）：
${summarizeMapExploreContext()}`
      : visitMode === "alone"
        ? `请写制作人独自离开学园，来到 ${location.name} 刚到达时的开场场景，并设计 4 个不同的下一步行动选项。担当偶像 ${idol} 不在身边同行。`
        : `请写制作人与担当偶像 ${idol} 一起离开学园，来到 ${location.name} 刚到达时的开场场景，并设计 4 个不同的下一步行动选项。`;
    return `[初星育成系统：自由模式 · 校外外出探索]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前时间：${formatFreeModeDayLabel()} ${formatFreeModeClock()}
外出地点：${location.name}
外出说明：${location.description}

${buildMapLocationVisitModeLine(visitMode)}

${buildProducerPromptSection()}

${sceneInstruction}

【与育成日程外出完全不同 · 必须遵守】
- 这不是育成第 4 轮的“一次性外出行动”，不要写当天收束、不要结算体力/信赖/压力，也不要把本次回复写成完整一日游结束。
- 玩法与校内地点探索相同：玩家会连续多轮选择 option；你每轮只输出当前场景 + 4 个 option + 4 个 time，选中后前端立刻请求下一轮。
- 离开学园并抵达外出地点时，前端已推进 ${FREE_MODE_MAP_ARRIVAL_MINUTES} 分钟；玩家每选择一项 option 后，前端会按对应 time 标签推进分钟数（缺失时默认 ${FREE_MODE_MAP_CHOICE_MINUTES} 分钟）。
- 你只需写当前场景、4 个 option 与 4 个 time 标记，不要写选项被选中后的收尾段落。
- 不要结算或修改任何数值。

校外场景要求：
- 地点氛围要贴合 ${location.name} 的真实特征；可写路人、店员、偶遇对象或环境细节。
- 重点写制作人与担当在该地点的互动、发现与关系推进。
- 选项必须是制作人第一人称口吻，风味不同，且都适合继续在该外出地点推进。

选项耗时标记：
- 请为每个 option 额外输出对应的 <time1> 到 <time4>，内容为纯整数分钟（建议 5-${FREE_MODE_MAP_MINUTES_MAX}）。
- 表示执行该 option 预计消耗的时间；简短行动可 5-15 分钟，较耗时行动可 30-90 分钟。

${galgameRenderContract("choice")}

外出选项输出示例：
【初星正文开始】
<story>...</story>
<option1>...</option1>
<time1>15</time1>
<option2>...</option2>
<time2>45</time2>
<option3>...</option3>
<time3>10</time3>
<option4>...</option4>
<time4>30</time4>
【初星正文结束】

==================================================
⚠️⚠️【输出硬规则：违反本规则将导致整个游戏崩溃报错，请务必严格服从！】⚠️⚠️
1. 你必须严格且完整地把所有输出包裹在【初星正文开始】与【初星正文结束】分隔符内。
2. 分隔符之内，必须包含 <story>、<option1> 到 <option4>，以及 <time1> 到 <time4> 共 9 个 XML 标签。
3. time 标签内只能是整数分钟；缺失或无效时前端默认 ${FREE_MODE_MAP_CHOICE_MINUTES} 分钟。
4. 选项标签内部不要带“选项 1：”等系统前缀。
5. 不要在标签外写任何思考、计划、规则复述或系统说明。
==================================================`;
  }

  function buildMapLocationReturnPrompt(locationId) {
    const actionContext = state.pendingActionContext?.actionContext || {};
    const location = resolveMapExploreLocation(locationId, actionContext);
    if (!location) return "";
    return `[初星育成系统：自由模式 · 离开地点返回地图]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
当前时间：${formatFreeModeDayLabel()} ${formatFreeModeClock()}
地点：${location.name}
地点说明：${location.description}

${buildMapLocationPresenceLine(locationId)}

${buildMapLocationVisitModeLine(getMapLocationVisitMode())}

制作人决定不再继续探索 ${location.name}，准备回到学园大地图。
请写一段简短的离开描写，交代制作人如何结束本次停留、离开该地点时的余韵或途中一两句感受。
- 这是中途离开，不是完成一次 15 分钟行动；不要推进时间。
- 不要再提供选项。
- 不要结算或修改任何数值。

${outputContract("请写一段 300 字以内的离开正文。")}`;
  }

  function buildFreeModeOutingReturnPrompt() {
    const actionContext = state.pendingActionContext?.actionContext || {};
    const location = resolveMapExploreLocation(FREE_MODE_OUTING_LOCATION_ID, actionContext);
    if (!location) return "";
    return `[初星育成系统：自由模式 · 结束校外外出返回地图]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
当前时间：${formatFreeModeDayLabel()} ${formatFreeModeClock()}
外出地点：${location.name}
外出说明：${location.description}

${buildMapLocationVisitModeLine(getMapLocationVisitMode())}

制作人决定不再继续在 ${location.name} 外出，准备回到学园大地图。
请写一段简短的离开描写，交代制作人如何结束本次校外停留、离开时的余韵或回学园途中一两句感受。
- 这是中途离开，不是完成一次行动；不要推进时间。
- 不要再提供选项。
- 不要结算或修改任何数值。

${outputContract("请写一段 300 字以内的离开正文。")}`;
  }

  function getMapExplorePrompt(locationId, options = {}) {
    if (locationId === FREE_MODE_OUTING_LOCATION_ID) {
      return buildFreeModeOutingExplorePrompt(options);
    }
    return buildMapLocationExplorePrompt(locationId, options);
  }

  function getMapExploreReturnPrompt(locationId) {
    if (locationId === FREE_MODE_OUTING_LOCATION_ID) {
      return buildFreeModeOutingReturnPrompt();
    }
    return buildMapLocationReturnPrompt(locationId);
  }

  function buildTodayActionRecapForSummary() {
    const entries = (state.log || []).filter((item) => Number(item.day) === Number(state.day));
    if (!entries.length) {
      return "今日尚无已记录行动。";
    }
    return entries
      .slice()
      .reverse()
      .map((item, index) => `${index + 1}. ${item.action}：${item.result}`)
      .join("\n");
  }

  function buildDailySummaryContract() {
    const profile = idols[state.idol] || {};
    return `
==================================================
【今日育成总结 · 必须在正文之后追加】

你是初星学园育成系统的记录员。第四轮额外行动已经由前端结算完毕，请在【初星正文结束】之后，另起一段输出今日总结。

【今日总结开始】
<summary_intro>角色介绍：以学园档案口吻介绍 ${state.idol} 的核心性格、矛盾与育成定位，结合今日四轮行动后的整体印象，80-120字。</summary_intro>
<summary_status>当前状态评估：结合下方“今日行动回顾”和当前数值，评估体力、压力、信赖、Vo/Da/Vi 与羁绊阶段，说明今日育成进展与风险，120-180字。</summary_status>
<summary_producer>制作人视角：以制作人第一人称（使用 {{user}} 或当前制作人设定称呼）写接下来要优先解决的问题、明日关注与推进方向，80-120字。</summary_producer>
【今日总结结束】

硬规则：
1. 三段必须分别写在对应标签内，不要列表，不要 Markdown，不要 emoji。
2. 当前状态评估必须承认前端已结算数值，不得修改或追加数值。
3. 制作人视角是制作人的判断与计划，不是偶像台词。
4. 角色介绍可参考担当核心：${profile.core || "按担当偶像设定发挥"}`;
  }

  function buildChoicePhase2Prompt(action, attribute, chosenOptionText, trustGain, actionContext = {}) {
    const actionName = actionLabel(action, attribute);
    const outcomeName = action === "intimacy"
      ? "【亲密】"
      : (action === "outing" && trustGain === 10) || (action === "companion" && trustGain === 20)
      ? "【完美互动】"
      : (action === "outing" && trustGain === 8) || (action === "companion" && trustGain === 15)
        ? "【极佳互动】"
        : (action === "outing" && trustGain === 6) || (action === "companion" && trustGain === 10)
          ? "【普通互动】"
          : "【笨拙互动】";
    const outcomeLine = action === "intimacy"
      ? `本次选择的判定结果为：${outcomeName}（前端已结算：体力 +38，压力 -10，信赖 +${INTIMACY_NORMAL_TRUST_GAIN}）`
      : `本次选择的判定结果为：${outcomeName}（给玩家增加了 +${trustGain} 信赖值）`;
    const closureTarget = action === "intimacy"
      ? "亲密互动的收尾/当天的安抚总结"
      : action === "companion"
        ? "交流的收尾/当天的总结"
        : "外出的收尾/当天的总结";
    const intimacyRule = action === "intimacy" && getIntimacyMode() !== "nsfw"
      ? "\n- 本次为普通亲密路线，只写温柔、安心、信任、撒娇、拥抱、牵手、摸头、靠肩等清水向内容。"
      : "";
    const companionTopicLine = action === "companion" && actionContext.companionTopic
      ? `\n- 本次交流由制作人指定主题为：「${actionContext.companionTopic}」。收尾应回扣这一主题，不要另起无关话题。`
      : "";
    const dailySummarySection = actionContext.isDailyFinalAction
      ? `

今日行动回顾（供总结使用，不要原样复述成列表）：
${buildTodayActionRecapForSummary()}

当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
${getAffinityStageLine(state.idol, state.trust)}

${buildDailySummaryContract()}`
      : "";

    const renderContract = actionContext.isDailyFinalAction
      ? `${galgameRenderContract("normal")}

输出格式要求：
1. 先完成【初星正文开始】…【初星正文结束】内的反应与事件收尾剧情。
2. 正文结束后再输出【今日总结开始】…【今日总结结束】，两段不可混写。
3. 不要改变或重新计算前端已结算的数值。
- 请写一段 600 字以内的反应与事件收尾剧情正文。${dailySummarySection}`
      : `${outputContract("请写一段 600 字以内的反应与事件收尾剧情正文。")}`;

    return `[初星育成系统：互动分支结算与收尾]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：${actionName}

剧情进展：
制作人刚才做出了以下选择（或行动）：
“${chosenOptionText}”

${outcomeLine}

请承接前半段剧情，写出你（${state.idol}）在面对制作人这个选择时的【反应剧情】以及本次【${closureTarget}】。

叙事要求：
- 请以符合偶像性格的语调展开，根据选择的优劣档次表现出对应的反应。
- 在本段剧情中完成事件的收束，结束当天的活动。
- 限制在 600 字以内。
${intimacyRule}${companionTopicLine}

${renderContract}`;
  }

  function buildNsfwIntimacyOptionContract() {
    return `选项生成要求：
- 必须输出 4 个由 AI 设计的制作人行动选项，供玩家在 VN 界面点选。
- 每个选项必须是制作人第一人称口吻的一句行动或台词，风味不同但都应推进 NSFW 亲密。
- 这不是【普通亲密】【清水亲密】模式：不要写摸头、靠肩、递热饮、整理发丝等仅限清水互动的选项。
- 玩家界面还会额外提供“自定义输入”和“结束”按钮；你只需负责输出 4 个 option 标签。`;
  }

  function buildNsfwIntimacyOpeningPrompt(actionContext = {}) {
    const profile = idols[state.idol] || {};
    const actionStyle = `${profile.styles.companion || profile.styles.rest} 这是信赖值100后解锁的 NSFW 亲密互动，必须写成人向亲密、情欲张力、身体接触与彼此允许靠近的内容。`;
    return `[初星育成系统：NSFW 亲密 · 开场]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：NSFW 亲密（不是普通亲密 / 清水亲密）

角色设定前提：
- 本次为私密、自愿、互相信赖的成人向亲密场景。
- 前端会在 VN 界面展示 4 个选项，并额外提供自定义输入与结束按钮；玩家可随时点“结束”进入收尾。
- 禁止把本次写成普通亲密、摸头安抚、递热饮、靠肩休息等清水向互动。

当前担当偶像的性格基调（NSFW 亲密行为指南）：
${actionStyle}

${buildProducerPromptSection()}

请生成本次 NSFW 亲密的开场剧情，并设计 4 个互动分支选项。
${buildNsfwIntimacyOptionContract()}

${galgameRenderContract("choice")}

==================================================
⚠️⚠️【输出硬规则：违反本规则将导致整个游戏崩溃报错，请务必严格服从！】⚠️⚠️
1. 你必须严格且完整地把所有输出包裹在【初星正文开始】与【初星正文结束】分隔符内。
2. 分隔符之内，【必须且只能】包含以下 5 个 XML 标签，绝对不能夹杂任何标签外的散落文本、Markdown 列表（如 - 或 1. 2. 等）、或者解释：
   <story>写开场剧情，停留在需要制作人做选择的转折点</story>
   <option1>选项 1 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option1>
   <option2>选项 2 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option2>
   <option3>选项 3 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option3>
   <option4>选项 4 的文本内容（必须以制作人第一人称口吻写一句回复或行动）</option4>
3. 选项标签内部的文本【绝对不能】带任何“选项 1：”等系统前缀或数值标签。
4. 不要在标签外写任何思考（thinking/details）、计划、规则复述、系统说明。
==================================================

输出示例：
【初星正文开始】
<story>（开场剧情）</story>
<option1>（选项 1）</option1>
<option2>（选项 2）</option2>
<option3>（选项 3）</option3>
<option4>（选项 4）</option4>
【初星正文结束】`;
  }

  function buildNsfwIntimacyContinuePrompt(producerAction) {
    const profile = idols[state.idol] || {};
    return `[初星育成系统：NSFW 亲密 · 继续]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：NSFW 亲密（多轮进行中）

角色设定前提：
- 本次仍为私密、自愿、互相信赖的成人向亲密场景，不是普通亲密 / 清水亲密。
- 玩家仍可在 VN 界面选择 4 个选项、自定义输入，或随时点“结束”进入收尾。
- 不要写摸头、靠肩、递热饮等仅限清水互动的选项。

${buildNsfwIntimacyChatContextLine()}

制作人刚才的行动或台词：
${producerAction}

角色核心：
${profile.core || "按初星学园偶像设定自然发挥。"}

请承接上文，写出 ${state.idol} 的反应与场景推进，并重新设计 4 个新的互动分支选项。
${buildNsfwIntimacyOptionContract()}

${galgameRenderContract("choice")}

==================================================
⚠️⚠️【输出硬规则：违反本规则将导致整个游戏崩溃报错，请务必严格服从！】⚠️⚠️
1. 你必须严格且完整地把所有输出包裹在【初星正文开始】与【初星正文结束】分隔符内。
2. 分隔符之内，【必须且只能】包含 <story> 与 <option1> 到 <option4> 共 5 个 XML 标签。
3. <story> 只写本轮新增反应与推进，不要重复已发生剧情全文。
4. 不要在标签外写任何思考、计划、规则复述或系统说明。
==================================================`;
  }

  function buildNsfwIntimacyClosingPrompt() {
    const profile = idols[state.idol] || {};
    const dailySummarySection = state.pendingActionContext?.actionContext?.isDailyFinalAction
      ? `

今日行动回顾（供总结使用，不要原样复述成列表）：
${buildTodayActionRecapForSummary()}

当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}
${getAffinityStageLine(state.idol, state.trust)}

${buildDailySummaryContract()}`
      : "";
    const renderContract = state.pendingActionContext?.actionContext?.isDailyFinalAction
      ? `${galgameRenderContract("normal")}

输出格式要求：
1. 先完成【初星正文开始】…【初星正文结束】内的收尾剧情。
2. 正文结束后再输出【今日总结开始】…【今日总结结束】，两段不可混写。
3. 不要改变或重新计算前端已结算的数值。
- 请写一段 600 字以内的 NSFW 亲密收尾正文。${dailySummarySection}`
      : `${outputContract("请写一段 600 字以内的 NSFW 亲密收尾正文。")}`;

    return `[初星育成系统：NSFW 亲密 · 收尾]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前日程：第 ${state.day} 天，${roundLabel()}
行动：NSFW 亲密（玩家选择结束）

角色设定前提：
- 制作人刚刚选择结束本次 NSFW 亲密互动。

${buildNsfwIntimacyChatContextLine()}

前端已结算：体力 +38，压力 -10，不增加信赖值。

请写出 ${state.idol} 在亲密结束时的反应，以及本次 NSFW 互动的余韵收尾。
- 不要再提供新的选项。
- 让场景自然收束，可写亲密后的安抚、余韵与告别。
- 不要退回到普通亲密 / 清水互动的语气。
- 限制在 600 字以内。

${renderContract}`;
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
先写考核前的短暂候场与制作人确认状态，等待玩家点击开始 First Live。

${outputContract("请写一段 400 字以内的 First Live 候场剧情，停在正式开始演出之前。")}`;
  }

  function formatBondOptions(options) {
    return options.map((option, index) => `<option${index + 1}>${option}</option${index + 1}>`).join("\n");
  }

  function specialBondRoutesFor(idolName = state.idol) {
    if (idolName === "十王星南") return seinaBondRoutes;
    if (idolName === "藤田琴音") return kotoneBondRoutes;
    if (idolName === "月村手毬") return temariBondRoutes;
    if (idolName === "秦谷美铃") return misuzuBondRoutes;
    if (idolName === "雨夜燕") return amayaBondRoutes;
    return null;
  }

  function specialBondLabel(idolName = state.idol) {
    if (idolName === "十王星南") return "星南羁绊事件";
    if (idolName === "藤田琴音") return "琴音羁绊事件";
    if (idolName === "月村手毬") return "手毬羁绊事件";
    if (idolName === "秦谷美铃") return "美铃羁绊事件";
    if (idolName === "雨夜燕") return "燕羁绊事件";
    return `${idolName || "偶像"}羁绊事件`;
  }

  function buildSpecialBondPhase1Prompt(threshold) {
    const profile = idols[state.idol];
    const route = specialBondRoutesFor()?.[threshold];
    return `[初星育成系统：${specialBondLabel()} - 第一轮选择]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
剧情节点：好感度 ${threshold} / ${route.title}
当前阶段：${getPhase()}
当前日程：第 ${state.day} 天，羁绊事件日
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

角色核心：
${profile.core}
${buildProducerPromptSection()}

本节点目标：
${route.objective}

原作锚点：
${route.canonAnchor}

第一段要求：
${route.phase1Setup}

${route.phase1Title}：
${formatBondOptions(route.phase1Options)}

${galgameRenderContract("choice")}

输出硬规则：
1. 必须输出【初星正文开始】与【初星正文结束】。
2. 分隔符内部只能包含一个 <story> 与四个 <option1> 到 <option4>。
3. <story> 只写本羁绊事件开场，不要把整个事件写完。
4. 四个选项必须严格使用上方给定选项文本，不要改写含义，不要添加数值。
5. 不要写系统说明、列表解释、思考过程。

输出示例：
【初星正文开始】
<story>这里写开场剧情，停在制作人需要做第一次选择的转折点。</story>
${formatBondOptions(route.phase1Options)}
【初星正文结束】`;
  }

  function buildSpecialBondPhase2Prompt(threshold, firstChoiceText) {
    const route = specialBondRoutesFor()?.[threshold];
    return `[初星育成系统：${specialBondLabel()} - 第二轮选择]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
剧情节点：好感度 ${threshold} / ${route.title}
当前日程：第 ${state.day} 天，羁绊事件日

第一轮制作人选择：
${firstChoiceText}

中段要求：
${route.phase2Setup}

${route.phase2Title}：
${formatBondOptions(route.phase2Options)}

叙事要求：
- 承接第一轮选择，不要重写开场。
- 让剧情推进到更深层矛盾暴露处，再停在制作人需要做第二次选择的时刻。
- 四个选项必须严格使用上方给定选项文本。
- 不要结算或推进数值。

${galgameRenderContract("choice")}

输出硬规则：
【初星正文开始】
<story>这里写中段剧情，停在第二次选择前。</story>
${formatBondOptions(route.phase2Options)}
【初星正文结束】`;
  }

  function buildSpecialBondFinalPrompt(threshold, firstChoiceText, secondChoiceText) {
    const route = specialBondRoutesFor()?.[threshold];
    return `[初星育成系统：${specialBondLabel()} - 收束]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
剧情节点：好感度 ${threshold} / ${route.title}
当前日程：第 ${state.day} 天，羁绊事件日

第一轮制作人选择：
${firstChoiceText}

第二轮制作人选择：
${secondChoiceText}

最终收束目标：
${route.resolution}

叙事要求：
- 承接前两轮选择，写出本羁绊事件最后一段。
- 不要重新写开场，不要生成新的选项。
- 不要改变数值，不要推进日程。
- 结尾必须完成本节点的情绪收束，并为后续节点留下自然余韵。

${outputContract("请写一段 900 字以内的羁绊事件收束剧情。")}`;
  }

  function buildTemariBondPhase1Prompt(threshold) {
    return buildSpecialBondPhase1Prompt(threshold);
  }

  function buildTemariBondPhase2Prompt(threshold, firstChoiceText) {
    return buildSpecialBondPhase2Prompt(threshold, firstChoiceText);
  }

  function buildTemariBondFinalPrompt(threshold, firstChoiceText, secondChoiceText) {
    return buildSpecialBondFinalPrompt(threshold, firstChoiceText, secondChoiceText);
  }

  function buildAffinityPrompt(threshold) {
    const profile = idols[state.idol];
    const node = affinityNodes[threshold];
    const seed = affinityRouteSeeds[state.idol]?.[threshold] || node.theme;
    if (specialBondRoutesFor()?.[threshold]) {
      return buildSpecialBondPhase1Prompt(threshold);
    }
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
- 好感度80不要固定写成 First Live 前夜；请按参考种子推进该偶像的路线后半转折。
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

  function buildPhoneChatScheduleLine() {
    if (isSummaryRound()) {
      return `当前日程：第 ${state.day} 天，${roundLabel()}（总结轮次，当日行动已结束）`;
    }
    return `当前日程：第 ${state.day} 天，${roundLabel()}`;
  }

  function buildPhoneChatScenarioRules() {
    return [
      "- 这是小手机 LINE 私聊，不是育成行动。",
      "- 不消耗行动次数，不推进轮次、日期或 First Live 日程。",
      "- 不增加或减少任何数值，不触发随机奖励。"
    ].join("\n");
  }

  function buildPhoneChatPrompt(userMessage, threadId = "idol") {
    const contactName = getPhoneThreadContactName(threadId);
    const profile = idols[contactName] || {};
    const history = getPhoneThreadMessages(threadId)
      .slice(-14)
      .map((message) => {
        if (message.sender === "producer") return `制作人：${message.text}`;
        if (message.sender === "idol") return `${contactName}：${message.text}`;
        return null;
      })
      .filter(Boolean)
      .join("\n");

    return `[初星育成系统：小手机私聊]

当前聊天对象：${contactName}
担当偶像：${state.idol}
${contactName === state.idol ? getAffinityStageLine(state.idol, state.trust) : "关系：学院内其他偶像"}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按当前聊天对象写"}
当前阶段：${getPhase()}
${buildPhoneChatScheduleLine()}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

最近聊天记录：
${history || "（尚无历史）"}

制作人刚才发来的消息：
${userMessage}

角色核心：
${profile.core || "按初星学园偶像设定自然发挥。"}
${buildProducerPromptSection()}

私聊规则：
${buildPhoneChatScenarioRules()}
- 用${contactName}的口吻回复制作人刚才的消息，可以分多条短消息发送。
- 每条消息保持口语化，像真实聊天，不要写成完整小说段落。

输出格式（必须严格遵守）：
<初星私聊 from="${contactName}">
第一行对应第一条消息气泡
第二行对应第二条消息气泡
如有更多回复继续逐行写
</初星私聊>

输出硬规则：
1. 只能输出一个 <初星私聊> 标签块，不要在标签外写任何内容、说明或 Markdown。
2. from 属性必须是 "${contactName}"。
3. 标签内每行一条消息，一行一个气泡，不要空行，不要把多条消息写在同一行。
4. 不要写制作人台词，不要写选项、数值或系统说明。`;
  }

  function buildPhoneAddFriendGreetingPrompt(friendName) {
    const profile = idols[friendName] || {};
    const scenarioLine = isSummaryRound()
      ? `- 制作人在总结轮次的小手机里，刚刚把 ${friendName} 加为好友。`
      : `- 制作人在小手机里，刚刚把 ${friendName} 加为好友。`;
    return `[初星育成系统：小手机添加好友问候]

制作人：${getPhoneProducerLabel()}
担当偶像：${state.idol}
刚添加的好友：${friendName}
当前阶段：${getPhase()}
${buildPhoneChatScheduleLine()}

场景：
${scenarioLine}
- 请让 ${friendName} 主动发来添加好友后的第一条问候私聊。
- 问候应自然、简短，像 LINE 上刚加好友后的第一句话。
- 可以分 1 到 3 条短消息，不要写成长段落。

角色核心：
${profile.core || "按初星学园偶像设定自然发挥。"}

私聊规则：
- 不是育成行动，不改变任何数值，不推进日程。
- 只写 ${friendName} 的问候，不要替制作人发言。

输出格式（必须严格遵守）：
<初星私聊 from="${friendName}">
第一行对应第一条问候气泡
第二行对应第二条问候气泡
</初星私聊>

输出硬规则：
1. 只能输出一个 <初星私聊> 标签块，不要在标签外写任何内容、说明或 Markdown。
2. from 属性必须是 "${friendName}"。
3. 标签内每行一条消息，一行一个气泡，不要空行。`;
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
    const preSeed = state.idol === "月村手毬"
      ? "手毬登台前想起与美铃的赌约，担心自己能否赢、能否让美铃放心；她确认制作人是否仍愿意支持自己，甚至担心制作人会不会厌烦 SyngUp 的麻烦。制作人需要把她拉回舞台，提醒她不要在彩排或候场里耗尽自己，这次要在正式舞台上发挥全部实力。"
      : "";
    return `[初星育成系统：First Live 最终演出 - 登台前夜候场]

担当偶像：${state.idol}
${getAffinityStageLine(state.idol, state.trust)}
绑定角色卡：${state.boundCharacter?.name || "未绑定，按担当偶像写"}
当前状态：Vo ${state.Vo} / Da ${state.Da} / Vi ${state.Vi} / 体力 ${state.stamina} / 压力 ${state.stress} / 信赖 ${state.trust}

角色核心：
${profile.core}
${buildProducerPromptSection()}
${preSeed ? `\n角色专属登台前种子：\n${preSeed}\n` : ""}

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

  function startOpeningStory(source = "startOpeningStory") {
    recordDebugOpeningDispatch(source);
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
    if (threshold === 0) {
      recordDebugOpeningDispatch("triggerAffinityStory(0)");
    }
    const node = affinityNodes[threshold];
    const prompt = threshold === 0 ? buildOpeningPrompt() : buildAffinityPrompt(threshold);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "affinity", threshold, ready: false };
    if (specialBondRoutesFor()?.[threshold]) {
      state.eventMode = "choice_prompt";
      state.choiceStep = 1;
      state.bondChoiceRound = 1;
      state.bondFirstChoiceText = "";
      state.pendingActionContext = { action: "bond", threshold };
      state.pendingChoiceRewards = [0, 0, 0, 0];
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
    } else {
      state.eventMode = "none";
      state.choiceStep = 0;
      state.bondChoiceRound = 0;
      state.bondFirstChoiceText = "";
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
    }
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

  // First Live 演出视频：仅使用远程 CDN，本地不 bundled 视频资源
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

  function isLiveTheaterActive() {
    const overlay = document.getElementById("liveTheater");
    return Boolean(overlay && !overlay.hidden);
  }

  function flushDeferredLivePostReply() {
    if (!deferredLivePostReply) return false;
    const payload = deferredLivePostReply;
    deferredLivePostReply = null;
    openEventOverlay(payload.title, payload.result, payload.story);
    return true;
  }

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

    pausePhoneMusic();
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
        if (!flushDeferredLivePostReply()) {
          onComplete();
        }
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
    deferredLivePostReply = null;
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

  function isFreeModeUnlocked() {
    return Boolean(state.freeMode?.unlocked && state.firstLive?.completed);
  }

  function isFreeModeActive() {
    return Boolean(state.freeMode?.active && (isFreeModeUnlocked() || state.freeMode?.layoutEditBypass));
  }

  function roundMapCoord(value) {
    return Math.round(Number(value) * 10) / 10;
  }

  function getEffectiveWorldMapLocations() {
    return WORLD_MAP_LOCATIONS.map((location) => {
      const override = worldMapLayoutState.overrides[location.id];
      if (!override) return { ...location };
      return {
        ...location,
        x: roundMapCoord(override.x ?? location.x),
        y: roundMapCoord(override.y ?? location.y)
      };
    });
  }

  function getWorldMapLocation(locationId) {
    return getEffectiveWorldMapLocations().find((location) => location.id === locationId) || null;
  }

  function resolveMapExploreLocation(locationId, actionContext = {}) {
    if (locationId === FREE_MODE_OUTING_LOCATION_ID) {
      const destination = String(
        actionContext.outingDestination
        || actionContext.locationName
        || state.freeMode?.activeOutingDestination
        || ""
      ).trim();
      if (!destination) return null;
      return {
        id: FREE_MODE_OUTING_LOCATION_ID,
        name: destination,
        shortLabel: "外出",
        description: `离开学园，前往${destination}。`,
        x: 0,
        y: 0,
        image: ""
      };
    }
    return getWorldMapLocation(locationId);
  }

  function getMapLocationSceneBackground(actionContext = {}) {
    const locationId = actionContext.locationId;
    if (!locationId) return "./assets/scenes/campus.png";
    return WORLD_MAP_LOCATION_SCENES[locationId] || "./assets/scenes/campus.png";
  }

  function isFreeModeOffCampusExplore(actionContext = state.pendingActionContext?.actionContext) {
    return actionContext?.locationId === FREE_MODE_OUTING_LOCATION_ID || Boolean(actionContext?.isOffCampus);
  }

  function ensureFreeModeTimeDefaults() {
    if (!state.freeMode) state.freeMode = {};
    if (!Number.isFinite(Number(state.freeMode.postLiveDay)) || state.freeMode.postLiveDay < 1) {
      state.freeMode.postLiveDay = 1;
    }
    if (!Number.isFinite(Number(state.freeMode.clockMinutes))) {
      state.freeMode.clockMinutes = FREE_MODE_DAY_START_MINUTES;
    }
    if (!state.freeMode.presence || typeof state.freeMode.presence !== "object") {
      state.freeMode.presence = {};
    }
  }

  function formatFreeModeClock(minutes = state.freeMode?.clockMinutes) {
    const total = Number(minutes);
    const safe = Number.isFinite(total) ? total : FREE_MODE_DAY_START_MINUTES;
    const hours = Math.floor(safe / 60);
    const mins = String(safe % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  }

  function getWorldMapTimePhase(minutes = state.freeMode?.clockMinutes) {
    const safe = Number.isFinite(Number(minutes)) ? Number(minutes) : FREE_MODE_DAY_START_MINUTES;
    if (safe >= FREE_MODE_MAP_NIGHT_START_MINUTES) return "night";
    if (safe >= FREE_MODE_MAP_DUSK_START_MINUTES) return "dusk";
    return "day";
  }

  function getWorldMapImageForClock(minutes = state.freeMode?.clockMinutes) {
    const phase = getWorldMapTimePhase(minutes);
    if (phase === "night") return WORLD_MAP_IMAGE_NIGHT;
    if (phase === "dusk") return WORLD_MAP_IMAGE_DUSK;
    return WORLD_MAP_IMAGE_DAY;
  }

  function updateWorldMapImage() {
    const mapImage = document.getElementById("worldMapImage");
    if (!mapImage) return;
    const nextSrc = getWorldMapImageForClock();
    if (mapImage.getAttribute("src") === nextSrc) return;
    mapImage.src = nextSrc;
  }

  function formatFreeModeDayLabel() {
    ensureFreeModeTimeDefaults();
    return `Live后${state.freeMode.postLiveDay}天`;
  }

  function getFreeModePresenceSlotKey() {
    ensureFreeModeTimeDefaults();
    return `${state.freeMode.postLiveDay}@${state.freeMode.clockMinutes}`;
  }

  function isMapLocationExploreActive() {
    return state.pendingActionContext?.action === "map_location";
  }

  function isFreeModeTravelAllowed() {
    if (worldMapLayoutState.editorActive) return true;
    ensureFreeModeTimeDefaults();
    return state.freeMode.clockMinutes < FREE_MODE_DAY_END_MINUTES;
  }

  function rollFreeModePresence(force = false) {
    ensureFreeModeTimeDefaults();
    const slotKey = getFreeModePresenceSlotKey();
    if (!force && state.freeMode.presenceSlotKey === slotKey) return;
    state.freeMode.presenceSlotKey = slotKey;
    state.freeMode.presence = {};
    Object.keys(idols).forEach((idolName) => {
      if (Math.random() >= FREE_MODE_PRESENCE_CHANCE) return;
      const location = WORLD_MAP_LOCATIONS[Math.floor(Math.random() * WORLD_MAP_LOCATIONS.length)];
      if (!location) return;
      state.freeMode.presence[idolName] = location.id;
    });
  }

  function getIdolsPresentAtLocation(locationId) {
    ensureFreeModeTimeDefaults();
    return Object.entries(state.freeMode.presence || {})
      .filter(([, locId]) => locId === locationId)
      .map(([idolName]) => idolName);
  }

  function advanceFreeModeToNextDay() {
    ensureFreeModeTimeDefaults();
    state.freeMode.postLiveDay += 1;
    state.freeMode.clockMinutes = FREE_MODE_DAY_START_MINUTES;
    rollFreeModePresence(true);
    closeFreeModeTimeOverlay();
    saveState();
    renderFreeModeStage();
    showToast("新的一天", `${formatFreeModeDayLabel()} ${formatFreeModeClock()} 开始。`, "info");
  }

  function parseFreeModeManualAdvanceMinutes(raw) {
    const cleaned = String(raw ?? "").trim().replace(/分钟|min|小时|hour|h/gi, "");
    const num = Number.parseInt(cleaned, 10);
    if (!Number.isFinite(num) || num <= 0) return null;
    const daySpan = FREE_MODE_DAY_END_MINUTES - FREE_MODE_DAY_START_MINUTES;
    return clamp(num, 1, daySpan);
  }

  function updateFreeModeTimeOverlayUI() {
    const current = document.getElementById("freeModeTimeCurrent");
    if (!current) return;
    ensureFreeModeTimeDefaults();
    const travelAllowed = isFreeModeTravelAllowed();
    const hint = document.getElementById("freeModeTimeHint");
    const dayBtn = document.getElementById("freeModeAdvanceDayBtn");
    const advanceBtn = document.getElementById("freeModeTimeAdvanceBtn");
    const input = document.getElementById("freeModeTimeAdvanceInput");
    current.textContent = `${formatFreeModeDayLabel()} · ${formatFreeModeClock()}`;
    if (hint) {
      hint.textContent = travelAllowed
        ? "输入分钟数可将时间推进至 22:00。"
        : "今日活动已结束，可点击下方进入下一天。";
    }
    if (dayBtn) dayBtn.hidden = travelAllowed;
    if (advanceBtn) advanceBtn.disabled = !travelAllowed;
    if (input) input.disabled = !travelAllowed;
    document.querySelectorAll(".free-mode-time-quick-btn").forEach((button) => {
      button.disabled = !travelAllowed;
    });
  }

  function openFreeModeTimeOverlay() {
    if (!isFreeModeActive()) return;
    setElementHidden("freeModeTimeOverlay", false);
    updateFreeModeTimeOverlayUI();
    const input = document.getElementById("freeModeTimeAdvanceInput");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function closeFreeModeTimeOverlay() {
    setElementHidden("freeModeTimeOverlay", true);
  }

  function applyFreeModeManualTimeAdvance(minutes) {
    if (!isFreeModeActive()) return;
    if (!isFreeModeTravelAllowed()) {
      showToast("今日已结束", "请进入下一天。", "warn");
      updateFreeModeTimeOverlayUI();
      return;
    }
    if (isMapLocationExploreActive()) {
      showToast("请先返回地图", "地点探索中无法手动推进时间。", "warn");
      return;
    }
    const parsed = parseFreeModeManualAdvanceMinutes(minutes);
    if (!parsed) {
      showToast("请输入时间", "请填写有效的分钟数。", "warn");
      return;
    }
    ensureFreeModeTimeDefaults();
    const remaining = FREE_MODE_DAY_END_MINUTES - state.freeMode.clockMinutes;
    if (remaining <= 0) {
      showToast("今日已结束", "请进入下一天。", "warn");
      updateFreeModeTimeOverlayUI();
      return;
    }
    const toAdvance = Math.min(parsed, remaining);
    const result = advanceFreeModeTime(toAdvance);
    saveState();
    renderFreeModeStage();
    updateFreeModeTimeOverlayUI();
    showToast("时间推进", `已推进 ${toAdvance} 分钟，当前 ${formatFreeModeClock()}。`, "info");
    if (result.hitDayEnd) {
      showToast("今日活动结束", "时间已到 22:00。", "info");
    }
  }

  function submitFreeModeManualTimeAdvance() {
    const input = document.getElementById("freeModeTimeAdvanceInput");
    applyFreeModeManualTimeAdvance(input?.value);
  }

  function handleFreeModeAdvanceDay() {
    if (!isFreeModeActive()) return;
    if (isMapLocationExploreActive()) {
      showToast("请先返回地图", "地点探索中无法进入下一天。", "warn");
      return;
    }
    advanceFreeModeToNextDay();
  }

  function advanceFreeModeTime(minutes = FREE_MODE_MAP_CHOICE_MINUTES) {
    ensureFreeModeTimeDefaults();
    const next = state.freeMode.clockMinutes + minutes;
    if (next >= FREE_MODE_DAY_END_MINUTES) {
      state.freeMode.clockMinutes = FREE_MODE_DAY_END_MINUTES;
      rollFreeModePresence(true);
      return { hitDayEnd: true };
    }
    state.freeMode.clockMinutes = next;
    rollFreeModePresence(true);
    return { hitDayEnd: false };
  }

  function parseMapOptionMinutes(raw) {
    const cleaned = String(raw || "").trim().replace(/分钟|min/gi, "");
    const num = Number.parseInt(cleaned, 10);
    if (!Number.isFinite(num) || num <= 0) return null;
    return clamp(num, 1, FREE_MODE_MAP_MINUTES_MAX);
  }

  function resolveMapOptionMinutes(rawMinutes) {
    return parseMapOptionMinutes(rawMinutes) ?? FREE_MODE_MAP_CHOICE_MINUTES;
  }

  function syncMapOptionMinutesFromPayload(payload) {
    if (state.pendingActionContext?.action !== "map_location") {
      state.pendingOptionMinutes = [];
      return;
    }
    const minutes = Array.isArray(payload?.optionMinutes) ? payload.optionMinutes.slice(0, 4) : [];
    while (minutes.length < 4) minutes.push(null);
    state.pendingOptionMinutes = minutes;
  }

  function returnToFreeModeMap(options = {}) {
    const { cancelled = false } = options;
    pendingAiRequestId = "";
    state.eventMode = "none";
    state.choiceStep = 0;
    state.pendingActionContext = null;
    state.pendingOptionTexts = [];
    state.pendingOptionMinutes = [];
    state.pendingChoiceRewards = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    if (state.freeMode) {
      state.freeMode.activeLocationId = null;
      state.freeMode.activeOutingDestination = null;
    }
    closeVnChoicesOverlay();
    hideVnCustomChoicePanel();
    setElementHidden("eventChoices", true);
    setElementHidden("eventOverlay", true);
    stopVnAuto();
    if (!cancelled) {
      saveState();
    }
    render();
    if (isFreeModeActive()) {
      renderFreeModeStage();
    }
  }

  function handleMapLocationReturn() {
    if (!isMapLocationExploreActive()) {
      returnToFreeModeMap({ cancelled: true });
      return;
    }
    if (state.eventMode === "choice_resolution" && pendingAiRequestId) return;
    const actionContext = state.pendingActionContext?.actionContext || {};
    const locationId = actionContext.locationId;
    const location = resolveMapExploreLocation(locationId, actionContext);
    if (!locationId || !location) {
      returnToFreeModeMap({ cancelled: true });
      return;
    }
    closeVnChoicesOverlay();
    const leaveLine = `<narration>▶ 制作人决定离开 ${location.name}，返回大地图。</narration>`;
    state.pendingActionContext.actionContext = { ...actionContext, isReturn: true };
    state.selectedChoiceText = "返回地图";
    state.selectedChoiceRating = "【离开地点】";
    state.eventMode = "choice_resolution";
    state.choiceStep = 2;
    state.pendingOptionTexts = [];
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    state.lastPrompt = getMapExploreReturnPrompt(locationId);
    state.lastDebug = `自由模式：${location.name} 返回地图，等待离开描写。`;
    state.lastStory = state.lastStory ? `${state.lastStory}\n\n${leaveLine}` : leaveLine;
    saveState();
    render();
    setEventActionsEnabled(false, true);
    setElementHidden("eventChoices", true);
    openEventOverlay(`${location.name} · 离开`, "正在生成返回地图的简短描写...", buildChoicePendingDisplayStory("", leaveLine));
    if (!requestHostPromptSend(state.lastPrompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制离开地点提示词后手动发送。");
    }
  }

  function startMapLocationExplore(locationId, visitMode = "with_idol") {
    if (!isFreeModeActive()) return;
    if (worldMapLayoutState.editorActive) return;
    if (!isFreeModeTravelAllowed()) {
      showToast("今日已不能外出", "22:00 后地图地点不可进入，点击右上角时间开始新的一天。", "warn");
      return;
    }
    const location = getWorldMapLocation(locationId);
    if (!location) return;
    beginMapLocationExploreSession({
      locationId,
      locationName: location.name,
      visitMode,
      isOffCampus: false
    });
  }

  function startFreeModeOuting(destination, visitMode = "with_idol") {
    if (!isFreeModeActive()) return;
    if (worldMapLayoutState.editorActive) return;
    if (!isFreeModeTravelAllowed()) {
      showToast("今日已不能外出", "22:00 后无法离开学园，点击右上角时间开始新的一天。", "warn");
      return;
    }
    const locationName = String(destination || "").trim();
    if (!locationName) {
      showToast("还没有地点", "请选择预设地点，或输入自定义外出地点。", "warn");
      return;
    }
    beginMapLocationExploreSession({
      locationId: FREE_MODE_OUTING_LOCATION_ID,
      locationName,
      outingDestination: locationName,
      visitMode,
      isOffCampus: true
    });
  }

  function beginMapLocationExploreSession(session = {}) {
    const {
      locationId,
      locationName,
      outingDestination = "",
      visitMode = "with_idol",
      isOffCampus = false
    } = session;
    const location = resolveMapExploreLocation(locationId, {
      locationName,
      outingDestination,
      visitMode,
      isOffCampus
    });
    if (!location) return;
    const normalizedVisitMode = visitMode === "alone" ? "alone" : "with_idol";
    ensureFreeModeTimeDefaults();
    const arrivalResult = advanceFreeModeTime(FREE_MODE_MAP_ARRIVAL_MINUTES);
    state.freeMode.activeLocationId = locationId;
    state.freeMode.activeOutingDestination = isOffCampus ? locationName : null;
    state.pendingActionContext = {
      action: "map_location",
      attribute: null,
      actionContext: {
        locationId,
        locationName: location.name,
        outingDestination: isOffCampus ? locationName : "",
        visitMode: normalizedVisitMode,
        isOffCampus
      }
    };
    state.eventMode = "choice_prompt";
    state.choiceStep = 1;
    state.pendingChoiceRewards = [0, 0, 0, 0];
    state.pendingOptionTexts = [];
    state.pendingOptionMinutes = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    const prompt = getMapExplorePrompt(locationId, { visitMode: normalizedVisitMode });
    state.lastPrompt = prompt;
    const visitLabel = normalizedVisitMode === "alone" ? "独自前往" : "与担当同来";
    const exploreLabel = isOffCampus ? `外出 · ${location.name}` : location.name;
    state.lastStory = isOffCampus
      ? `正在与担当一起前往 ${location.name}（${visitLabel}）...`
      : `正在前往 ${location.name}（${visitLabel}）...`;
    state.lastDebug = `自由模式${isOffCampus ? "外出" : "地点"}探索：${exploreLabel} · ${visitLabel}，抵达 +15 分钟，当前 ${formatFreeModeClock()}，等待 AI 生成本次选项。`;
    saveState();
    render();
    renderFreeModeStage();
    if (arrivalResult.hitDayEnd) {
      showToast("今日活动结束", "抵达后时间已到 22:00，请尽快返回大地图。", "info");
    }
    openEventOverlay(`${exploreLabel} · 探索`, "正在等待 AI 生成本次行动选项", buildAiWaitingStory(`正在等待 ${exploreLabel} 的场景与选项生成...`));
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制地点探索提示词后手动发送。");
    }
  }

  function requestNextMapLocationOptions() {
    if (!isMapLocationExploreActive()) return;
    if (!isFreeModeTravelAllowed()) {
      showToast("今日已不能外出", "22:00 后无法继续探索，请返回大地图。", "warn");
      showVnChoicesOverlay();
      return;
    }
    const locationId = state.pendingActionContext?.actionContext?.locationId || state.freeMode?.activeLocationId;
    const actionContext = state.pendingActionContext?.actionContext || {};
    const location = resolveMapExploreLocation(locationId, actionContext);
    if (!locationId || !location) return;
    const visitMode = getMapLocationVisitMode();
    closeVnChoicesOverlay();
    state.freeMode.activeLocationId = locationId;
    if (isFreeModeOffCampusExplore(actionContext)) {
      state.freeMode.activeOutingDestination = actionContext.outingDestination || location.name;
    }
    state.pendingActionContext.actionContext = {
      ...actionContext,
      locationId,
      locationName: location.name,
      isReturn: false,
      visitMode
    };
    state.eventMode = "choice_prompt";
    state.choiceStep = 1;
    state.pendingChoiceRewards = [0, 0, 0, 0];
    state.pendingOptionTexts = [];
    state.pendingOptionMinutes = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    const prompt = getMapExplorePrompt(locationId, { continuation: true, visitMode });
    const exploreLabel = locationId === FREE_MODE_OUTING_LOCATION_ID ? `外出 · ${location.name}` : location.name;
    state.lastPrompt = prompt;
    state.lastDebug = `自由模式${locationId === FREE_MODE_OUTING_LOCATION_ID ? "外出" : "地点"}探索：${location.name}，等待下一轮行动选项。`;
    saveState();
    render();
    setEventActionsEnabled(false, true);
    setElementHidden("eventChoices", true);
    openEventOverlay(
      `${exploreLabel} · 探索`,
      "正在等待 AI 生成本次行动选项",
      buildAiWaitingStory(`正在等待 ${exploreLabel} 的下一轮行动选项...`)
    );
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制地点探索提示词后手动发送。");
    }
  }

  function handleMapLocationChoiceSelection(index) {
    const actionContext = state.pendingActionContext?.actionContext || {};
    const locationId = actionContext.locationId;
    const location = resolveMapExploreLocation(locationId, actionContext);
    const chosenOptionText = state.pendingOptionTexts[index] || "选择该选项";
    const chosenMinutes = resolveMapOptionMinutes(state.pendingOptionMinutes?.[index]);
    const timeResult = advanceFreeModeTime(chosenMinutes);
    const chosenLine = `<narration>▶ 制作人的选择：${chosenOptionText}</narration>`;
    state.lastStory = state.lastStory ? `${state.lastStory}\n\n${chosenLine}` : chosenLine;
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    state.pendingOptionTexts = [];
    state.pendingOptionMinutes = [];
    state.eventMode = "choice_prompt";
    state.choiceStep = 1;
    state.lastDebug = `自由模式：${location?.name || "地点探索"} 已选择行动，时间 +${chosenMinutes} 分钟，准备下一组选项。`;
    state.log.unshift({
      day: state.freeMode?.postLiveDay || 1,
      round: formatFreeModeClock(),
      phase: "自由模式",
      action: `${location?.name || "地图探索"}`,
      result: `${chosenOptionText} · +${chosenMinutes}分 · ${formatFreeModeClock()}`
    });
    state.log = state.log.slice(0, 24);
    saveState();
    render();
    renderFreeModeStage();
    closeVnChoicesOverlay();
    if (timeResult.hitDayEnd) {
      showToast("今日活动结束", "时间已到 22:00，地图地点已关闭。", "info");
    }
    if (!isFreeModeTravelAllowed()) {
      showVnChoicesOverlay();
      return;
    }
    requestNextMapLocationOptions();
  }

  function handleMapLocationCustomChoice(rawText) {
    const producerAction = String(rawText || "").trim();
    if (!producerAction) {
      showToast("还没有内容", "请输入本次自定义行动。", "warn");
      return;
    }
    const actionContext = state.pendingActionContext?.actionContext || {};
    const locationId = actionContext.locationId;
    const location = resolveMapExploreLocation(locationId, actionContext);
    const chosenMinutes = FREE_MODE_MAP_CHOICE_MINUTES;
    const timeResult = advanceFreeModeTime(chosenMinutes);
    const chosenLine = `<narration>▶ 制作人的选择：${producerAction}</narration>`;
    state.lastStory = state.lastStory ? `${state.lastStory}\n\n${chosenLine}` : chosenLine;
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    state.pendingOptionTexts = [];
    state.pendingOptionMinutes = [];
    state.eventMode = "choice_prompt";
    state.choiceStep = 1;
    state.lastDebug = `自由模式：${location?.name || "地点探索"} 已发送自定义行动“${producerAction}”，时间 +${chosenMinutes} 分钟，准备下一组选项。`;
    state.log.unshift({
      day: state.freeMode?.postLiveDay || 1,
      round: formatFreeModeClock(),
      phase: "自由模式",
      action: `${location?.name || "地图探索"}`,
      result: `自定义：${producerAction} · +${chosenMinutes}分 · ${formatFreeModeClock()}`
    });
    state.log = state.log.slice(0, 24);
    saveState();
    render();
    renderFreeModeStage();
    closeVnChoicesOverlay();
    if (timeResult.hitDayEnd) {
      showToast("今日活动结束", "时间已到 22:00，地图地点已关闭。", "info");
    }
    if (!isFreeModeTravelAllowed()) {
      showVnChoicesOverlay();
      return;
    }
    requestNextMapLocationOptions();
  }

  function mergeWorldMapLayoutEnvelope(data) {
    if (!data || typeof data !== "object") return;
    if (data.mapFit === "cover" || data.mapFit === "contain") {
      worldMapLayoutState.mapFit = data.mapFit;
    }
    const locations = data.locations && typeof data.locations === "object" ? data.locations : null;
    if (!locations) return;
    Object.entries(locations).forEach(([id, point]) => {
      if (!point || !WORLD_MAP_LOCATIONS.some((location) => location.id === id)) return;
      if (!Number.isFinite(Number(point.x)) || !Number.isFinite(Number(point.y))) return;
      worldMapLayoutState.overrides[id] = {
        x: roundMapCoord(point.x),
        y: roundMapCoord(point.y)
      };
    });
  }

  function buildWorldMapLayoutEnvelope() {
    return {
      version: WORLD_MAP_LAYOUT_VERSION,
      updatedAt: new Date().toISOString(),
      mapFit: worldMapLayoutState.mapFit,
      locations: Object.fromEntries(
        getEffectiveWorldMapLocations().map((location) => [location.id, { x: location.x, y: location.y }])
      )
    };
  }

  function applyWorldMapLayoutFit() {
    const mapImage = document.getElementById("worldMapImage");
    const canvas = document.querySelector(".world-map-canvas");
    if (mapImage) {
      mapImage.style.objectFit = worldMapLayoutState.mapFit;
    }
    if (canvas) {
      canvas.dataset.mapFit = worldMapLayoutState.mapFit;
    }
    const fitButton = document.getElementById("worldMapLayoutFitBtn");
    if (fitButton) {
      fitButton.textContent = `地图：${worldMapLayoutState.mapFit}`;
    }
  }

  function persistWorldMapLayoutToBrowser(showToastOnSave = true) {
    const envelope = buildWorldMapLayoutEnvelope();
    localStorage.setItem(WORLD_MAP_LAYOUT_STORAGE_KEY, JSON.stringify(envelope));
    if (showToastOnSave) {
      showToast("布局已保存", "坐标已写入浏览器本地存储。", "success");
    }
    return envelope;
  }

  async function hydrateWorldMapLayout() {
    worldMapLayoutState.overrides = {};
    worldMapLayoutState.mapFit = "cover";
    try {
      const response = await fetch(WORLD_MAP_LAYOUT_FILE, { cache: "no-store" });
      if (response.ok) {
        mergeWorldMapLayoutEnvelope(await response.json());
      }
    } catch {
      // 本地未放置 world-map-layout.json 时忽略
    }
    try {
      const saved = localStorage.getItem(WORLD_MAP_LAYOUT_STORAGE_KEY);
      if (saved) mergeWorldMapLayoutEnvelope(JSON.parse(saved));
    } catch {
      localStorage.removeItem(WORLD_MAP_LAYOUT_STORAGE_KEY);
    }
    applyWorldMapLayoutFit();
  }

  function updateWorldMapLayoutEditorUI(activeLocationId = "", x = null, y = null) {
    const editor = document.getElementById("worldMapLayoutEditor");
    const editToggle = document.getElementById("worldMapLayoutEditBtn");
    const coord = document.getElementById("worldMapLayoutEditorCoord");
    const status = document.getElementById("worldMapLayoutEditorStatus");
    const stage = document.getElementById("freeModeStage");
    const badge = document.getElementById("freeModeLocationBadge");
    if (editor) editor.classList.toggle("is-hidden", !worldMapLayoutState.editorActive);
    if (editToggle) editToggle.classList.toggle("is-hidden", worldMapLayoutState.editorActive);
    if (stage) stage.classList.toggle("is-layout-editing", worldMapLayoutState.editorActive);
    if (status) {
      status.textContent = worldMapLayoutState.editorActive ? "拖动热点后保存或导出 JSON" : "拖动热点调整位置";
    }
    if (badge && worldMapLayoutState.editorActive) {
      badge.textContent = "布局编辑中：拖动粉色热点，完成后导出 JSON";
    }
    if (coord) {
      if (activeLocationId && Number.isFinite(x) && Number.isFinite(y)) {
        const location = getWorldMapLocation(activeLocationId);
        coord.textContent = `当前：${location?.name || activeLocationId} · x ${roundMapCoord(x)}% · y ${roundMapCoord(y)}%`;
      } else {
        coord.textContent = "当前：--";
      }
    }
    applyWorldMapLayoutFit();
  }

  function setWorldMapHotspotPosition(locationId, x, y, button) {
    worldMapLayoutState.overrides[locationId] = {
      x: roundMapCoord(x),
      y: roundMapCoord(y)
    };
    if (button) {
      button.style.left = `${worldMapLayoutState.overrides[locationId].x}%`;
      button.style.top = `${worldMapLayoutState.overrides[locationId].y}%`;
    }
    updateWorldMapLayoutEditorUI(locationId, worldMapLayoutState.overrides[locationId].x, worldMapLayoutState.overrides[locationId].y);
  }

  function bindWorldMapHotspotInteractions(button, location) {
    button.addEventListener("pointerdown", (event) => {
      if (!worldMapLayoutState.editorActive) return;
      event.preventDefault();
      event.stopPropagation();
      button.setPointerCapture(event.pointerId);
      worldMapLayoutState.drag = { id: location.id, pointerId: event.pointerId, moved: false };
      updateWorldMapLayoutEditorUI(location.id, location.x, location.y);
    });

    button.addEventListener("pointermove", (event) => {
      const drag = worldMapLayoutState.drag;
      if (!drag || drag.id !== location.id || drag.pointerId !== event.pointerId) return;
      const canvas = document.querySelector(".world-map-canvas");
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      drag.moved = true;
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      setWorldMapHotspotPosition(location.id, x, y, button);
    });

    const finishDrag = (event) => {
      const drag = worldMapLayoutState.drag;
      if (!drag || drag.id !== location.id) return;
      if (event.pointerId !== drag.pointerId) return;
      if (button.hasPointerCapture(event.pointerId)) {
        button.releasePointerCapture(event.pointerId);
      }
      if (drag.moved) {
        persistWorldMapLayoutToBrowser(false);
      }
      worldMapLayoutState.drag = null;
    };

    button.addEventListener("pointerup", finishDrag);
    button.addEventListener("pointercancel", finishDrag);

    button.addEventListener("click", (event) => {
      if (!worldMapLayoutState.editorActive) {
        if (!isFreeModeTravelAllowed()) {
          showToast("今日已不能外出", "22:00 后地图地点不可进入，点击右上角时间开始新的一天。", "warn");
          return;
        }
        openMapLocationOverlay(location.id);
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const current = getWorldMapLocation(location.id);
      if (current) updateWorldMapLayoutEditorUI(current.id, current.x, current.y);
    });
  }

  function openWorldMapLayoutEditor() {
    if (!state.idol) {
      showToast("需要担当偶像", "请先选择担当后再编辑地图布局。", "warn");
      return;
    }
    state.freeMode = {
      ...(state.freeMode || {}),
      layoutEditBypass: true,
      unlocked: true,
      active: true,
      entryPromptSeen: true
    };
    document.body.classList.add("is-free-mode-active");
    worldMapLayoutState.editorActive = true;
    closeMapLocationOverlay();
    saveState();
    render();
    updateWorldMapLayoutEditorUI();
    showToast("布局编辑", "拖动热点调整位置。完成后导出 JSON 到 assets/MAP/world-map-layout.json。", "info");
  }

  function closeWorldMapLayoutEditor() {
    worldMapLayoutState.editorActive = false;
    worldMapLayoutState.drag = null;
    updateWorldMapLayoutEditorUI();
    renderFreeModeStage();
  }

  async function exportWorldMapLayout() {
    const envelope = persistWorldMapLayoutToBrowser(false);
    const json = `${JSON.stringify(envelope, null, 2)}\n`;
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      // 剪贴板不可用时仍允许下载
    }
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "world-map-layout.json";
    anchor.click();
    URL.revokeObjectURL(url);
    showToast("已导出布局", "JSON 已下载并尝试复制。请保存到 assets/MAP/world-map-layout.json。", "gold");
  }

  function resetWorldMapLayout() {
    worldMapLayoutState.overrides = {};
    localStorage.removeItem(WORLD_MAP_LAYOUT_STORAGE_KEY);
    persistWorldMapLayoutToBrowser(false);
    renderWorldMapHotspots();
    updateWorldMapLayoutEditorUI();
    showToast("已恢复默认", "地图热点坐标已恢复为代码内置默认值。", "info");
  }

  function toggleWorldMapLayoutFit() {
    worldMapLayoutState.mapFit = worldMapLayoutState.mapFit === "cover" ? "contain" : "cover";
    persistWorldMapLayoutToBrowser(false);
    applyWorldMapLayoutFit();
    renderWorldMapHotspots();
    showToast("地图显示", `已切换为 object-fit: ${worldMapLayoutState.mapFit}`, "info");
  }

  function syncFreeModeUnlockFromProgress() {
    if (!state.firstLive?.completed) return false;
    if (state.freeMode?.unlocked) return false;
    state.freeMode = { ...(state.freeMode || {}), unlocked: true };
    return true;
  }

  function openFreeModeEntryOverlay() {
    if (!isFreeModeUnlocked()) return;
    const note = document.getElementById("freeModeEntryNote");
    if (note) {
      note.textContent = state.firstLive.success
        ? "First Live 已成功结束。你可以继续留在育成界面整理后续，或进入学园自由探索。"
        : "First Live 已结束。你可以继续留在育成界面，或进入学园自由探索。";
    }
    setElementHidden("freeModeEntryOverlay", false);
  }

  function closeFreeModeEntryOverlay(markSeen = true) {
    if (markSeen && state.freeMode) {
      state.freeMode.entryPromptSeen = true;
      saveState();
    }
    setElementHidden("freeModeEntryOverlay", true);
  }

  function renderWorldMapHotspots() {
    const container = document.getElementById("worldMapHotspots");
    if (!container) return;
    container.innerHTML = "";
    const travelAllowed = isFreeModeTravelAllowed();
    getEffectiveWorldMapLocations().forEach((location) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `world-map-hotspot${worldMapLayoutState.editorActive ? " is-editing" : ""}${travelAllowed ? "" : " is-locked"}`;
      button.style.left = `${location.x}%`;
      button.style.top = `${location.y}%`;
      button.dataset.locationId = location.id;
      button.setAttribute("aria-label", location.name);
      button.disabled = !travelAllowed && !worldMapLayoutState.editorActive;
      if (!travelAllowed && !worldMapLayoutState.editorActive) {
        button.title = "22:00 后不可外出";
      }
      button.innerHTML = `<span class="world-map-hotspot-marker">${location.shortLabel}</span><span class="world-map-hotspot-label">${location.name}</span>`;
      bindWorldMapHotspotInteractions(button, location);
      container.appendChild(button);
    });
    renderWorldMapIdolMarkers();
    updateWorldMapLayoutEditorUI();
  }

  function renderWorldMapIdolMarkers() {
    const container = document.getElementById("worldMapIdolMarkers");
    if (!container) return;
    container.innerHTML = "";
    if (worldMapLayoutState.editorActive) return;
    ensureFreeModeTimeDefaults();
    const groups = {};
    Object.entries(state.freeMode.presence || {}).forEach(([idolName, locationId]) => {
      if (!groups[locationId]) groups[locationId] = [];
      groups[locationId].push(idolName);
    });
    Object.entries(groups).forEach(([locationId, idolNames]) => {
      const location = getWorldMapLocation(locationId);
      if (!location) return;
      idolNames.forEach((idolName, index) => {
        const profile = idols[idolName];
        if (!profile) return;
        const marker = document.createElement("div");
        marker.className = "world-map-idol-marker idol-avatar";
        marker.style.setProperty("--avatar-color", profile.theme || "#8c73ff");
        marker.style.left = `calc(${location.x}% + ${index * 20}px)`;
        marker.style.top = `calc(${location.y}% - 28px)`;
        marker.title = `${idolName} 在 ${location.name}`;
        marker.innerHTML = `<b aria-hidden="true">${idolName.slice(0, 1)}</b><img src="${profile.avatar}" alt="" loading="lazy" decoding="async">`;
        marker.querySelector("img")?.addEventListener("error", (event) => {
          event.currentTarget.classList.add("is-missing");
        });
        container.appendChild(marker);
      });
    });
  }

  function updateFreeModeHeader() {
    ensureFreeModeTimeDefaults();
    const travelAllowed = isFreeModeTravelAllowed();
    const label = travelAllowed
      ? `${formatFreeModeDayLabel()} · ${formatFreeModeClock()}`
      : `${formatFreeModeDayLabel()} · ${formatFreeModeClock()} · 今日已结束`;
    ["freeModeStatusBadge", "vnFreeModeClock"].forEach((id) => {
      const badge = document.getElementById(id);
      if (!badge) return;
      badge.textContent = label;
      badge.classList.toggle("is-day-ended", !travelAllowed);
    });
    const vnClock = document.getElementById("vnFreeModeClock");
    if (vnClock) vnClock.hidden = !isFreeModeActive();
  }

  function renderFreeModeStage() {
    updateFreeModeHeader();
    updateFreeModeTimeOverlayUI();
    updateWorldMapImage();
    applyWorldMapLayoutFit();
    renderWorldMapHotspots();
    if (worldMapLayoutState.editorActive) return;
    const locationBadge = document.getElementById("freeModeLocationBadge");
    if (locationBadge) {
      locationBadge.textContent = isFreeModeTravelAllowed()
        ? "点击地图上的地点开始探索"
        : "22:00 后不可外出，点击右上角时间管理进入下一天";
    }
  }

  function enterFreeMode() {
    if (!isFreeModeUnlocked()) {
      showToast("尚未解锁", "完成 First Live 演后记后解锁学园自由模式。", "warn");
      return;
    }
    closeFreeModeEntryOverlay(true);
    ensureFreeModeTimeDefaults();
    rollFreeModePresence(true);
    state.freeMode = { ...(state.freeMode || {}), active: true };
    document.body.classList.add("is-free-mode-active");
    saveState();
    render();
    showToast("自由模式", `已进入学园大地图。当前 ${formatFreeModeDayLabel()} ${formatFreeModeClock()}。`, "info");
  }

  function exitFreeMode() {
    if (!state.freeMode) return;
    worldMapLayoutState.editorActive = false;
    worldMapLayoutState.drag = null;
    state.freeMode.active = false;
    state.freeMode.layoutEditBypass = false;
    state.freeMode.activeLocationId = null;
    document.body.classList.remove("is-free-mode-active");
    closeMapLocationOverlay();
    returnToFreeModeMap({ cancelled: true });
    saveState();
    render();
  }

  function openMapLocationOverlay(locationId) {
    const location = getWorldMapLocation(locationId);
    if (!location) return;
    const title = document.getElementById("mapLocationTitle");
    const desc = document.getElementById("mapLocationDesc");
    const visual = document.getElementById("mapLocationVisual");
    const image = document.getElementById("mapLocationImage");
    const idolsHere = getIdolsPresentAtLocation(locationId);
    if (title) title.textContent = location.name;
    if (desc) desc.textContent = location.description;
    const presenceBlock = document.getElementById("mapLocationPresence");
    const presenceAvatars = document.getElementById("mapLocationPresenceAvatars");
    if (presenceBlock && presenceAvatars) {
      presenceAvatars.innerHTML = "";
      presenceBlock.hidden = idolsHere.length === 0;
      idolsHere.forEach((idolName) => {
        const profile = idols[idolName];
        if (!profile) return;
        const avatar = document.createElement("span");
        avatar.className = "map-location-presence-avatar idol-avatar";
        avatar.style.setProperty("--avatar-color", profile.theme || "#8c73ff");
        avatar.title = idolName;
        avatar.innerHTML = `<b aria-hidden="true">${idolName.slice(0, 1)}</b><img src="${profile.avatar}" alt="" loading="lazy" decoding="async">`;
        avatar.querySelector("img")?.addEventListener("error", (event) => {
          event.currentTarget.classList.add("is-missing");
        });
        presenceAvatars.appendChild(avatar);
      });
    }
    const imagePath = String(location.image || "").trim();
    if (visual) visual.hidden = !imagePath;
    if (image) {
      if (imagePath) {
        image.src = imagePath;
        image.alt = location.name;
        image.hidden = false;
      } else {
        image.removeAttribute("src");
        image.alt = "";
        image.hidden = true;
      }
    }
    document.getElementById("mapLocationOverlay")?.setAttribute("data-location-id", location.id);
    const outingBtn = document.getElementById("mapLocationOutingBtn");
    if (outingBtn) outingBtn.hidden = location.id !== "school_entrance";
    setElementHidden("mapLocationOverlay", false);
  }

  function closeMapLocationOverlay() {
    setElementHidden("mapLocationOverlay", true);
    document.getElementById("mapLocationOverlay")?.removeAttribute("data-location-id");
  }

  function openFreeModeOutingOverlay() {
    if (!isFreeModeActive()) return;
    document.getElementById("freeModeOutingCustomInput").value = "";
    const list = document.getElementById("freeModeOutingDestinationList");
    if (list) {
      list.innerHTML = "";
      FREE_MODE_OUTING_DESTINATIONS.forEach((destination, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.id = `free-mode-outing-destination-${index + 1}`;
        button.className = "outing-destination-button";
        button.innerHTML = `<strong>${destination.name}</strong><span>${destination.description}</span>`;
        button.addEventListener("click", () => confirmFreeModeOutingDestination(destination.name));
        list.appendChild(button);
      });
    }
    setElementHidden("freeModeOutingOverlay", false);
  }

  function closeFreeModeOutingOverlay() {
    setElementHidden("freeModeOutingOverlay", true);
  }

  function confirmFreeModeOutingDestination(destination) {
    const location = String(destination || "").trim();
    if (!location) {
      showToast("还没有地点", "请选择预设地点，或输入自定义外出地点。", "warn");
      return;
    }
    closeFreeModeOutingOverlay();
    closeMapLocationOverlay();
    startFreeModeOuting(location, "with_idol");
  }

  function submitCustomFreeModeOutingDestination() {
    runAfterImeCommit("freeModeOutingCustomInput", () => {
      confirmFreeModeOutingDestination(readTextInputValue("freeModeOutingCustomInput"));
    });
  }

  function confirmMapLocationEntry(visitMode = "with_idol") {
    const locationId = document.getElementById("mapLocationOverlay")?.getAttribute("data-location-id");
    if (!locationId) return;
    closeMapLocationOverlay();
    startMapLocationExplore(locationId, visitMode);
  }

  function completeFirstLivePostFlow() {
    state.activeStoryNode = null;
    refreshAffinityUnlocks();
    const justUnlocked = syncFreeModeUnlockFromProgress();
    saveState();
    render();
    if (justUnlocked && !state.freeMode?.entryPromptSeen) {
      openFreeModeEntryOverlay();
    }
  }

  function renderShellMode() {
    const hasIdol = Boolean(state.idol);
    const canShowGame = hasIdol && state.affinity.openingComplete;
    const inFreeMode = isFreeModeActive();
    document.body.classList.toggle("is-free-mode-active", inFreeMode);
    document.getElementById("selectionStage").classList.toggle("is-hidden", hasIdol);
    document.getElementById("gameStage").classList.toggle("is-hidden", !canShowGame || inFreeMode);
    const freeModeStage = document.getElementById("freeModeStage");
    if (freeModeStage) {
      freeModeStage.classList.toggle("is-hidden", !canShowGame || !inFreeMode);
      if (inFreeMode) renderFreeModeStage();
    }
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

      const idolCode = selectBackgroundCodes[idolName] || affinityIdolCodes[idolName]?.toLowerCase();
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
      if (desc) desc.textContent = "22 天 First Live 育成。20/40/60/80 羁绊事件会占用专属剧情日，LLM 负责把前端结果写成角色叙事。";
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
    const targetVo = document.getElementById("targetVo");
    const targetDa = document.getElementById("targetDa");
    const targetVi = document.getElementById("targetVi");
    if (targetVo) targetVo.textContent = state.threshold.Vo;
    if (targetDa) targetDa.textContent = state.threshold.Da;
    if (targetVi) targetVi.textContent = state.threshold.Vi;
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
    const pendingAffinityThreshold = pendingAffinityActionThreshold();
    if (pendingAffinityThreshold) {
      const threshold = pendingAffinityThreshold;
      const node = affinityNodes[threshold];
      const costText = REQUIRED_BOND_THRESHOLDS.includes(Number(threshold)) ? "剧情日" : "剧情";
      container.appendChild(createActionButton(`好感度${threshold}羁绊`, "bond", null, "#ff4f9a", costText));
      container.appendChild(createActionButton("闲聊", "freechat", null, "#8c73ff", "行动0"));
      container.appendChild(createActionButton("互动", "interaction", null, "#ff783f", "行动0"));
      document.getElementById("actionModeLabel").textContent = REQUIRED_BOND_THRESHOLDS.includes(Number(threshold))
        ? `羁绊事件日：${node?.title || "羁绊事件"}`
        : `羁绊事件：${node?.title || "羁绊事件"}`;
      renderActionHighlights();
      return;
    }
    if (state.liveReady) {
      container.appendChild(createActionButton(state.firstLive.completed ? "First Live已完成" : "开始First Live", "live", null, "#ff4f9a", state.firstLive.completed ? "已结算" : "最终考核"));
      if (isFreeModeUnlocked()) {
        container.appendChild(createActionButton("学园地图", "world_map", null, "#26a9f4", "自由探索"));
      }
      container.appendChild(createActionButton("闲聊", "freechat", null, "#8c73ff", "行动0"));
      container.appendChild(createActionButton("互动", "interaction", null, "#ff783f", "行动0"));
      document.getElementById("actionModeLabel").textContent = state.firstLive.completed
        ? (isFreeModeUnlocked()
          ? (state.firstLive.success ? "First Live 成功，可进入学园自由探索" : "First Live 已结束，可进入学园自由探索")
          : (state.firstLive.success ? "First Live成功，最终剧情已解锁" : "First Live结束，等待下一阶段"))
        : "最终日程：First Live";
      renderActionHighlights();
      return;
    }
    if (isSummaryRound()) {
      container.appendChild(createActionButton("今日总结", "day_summary", null, "#8c73ff", "占位"));
      container.appendChild(createActionButton("进入下一天", "next_day", null, "#ff4f9a", "推进日程"));
      document.getElementById("actionModeLabel").textContent = `第 ${state.day} 天总结轮次：整理今日进度，或进入下一天`;
      renderActionHighlights();
      return;
    }
    const actions = isExtraRound()
      ? [
          ["外出", "outing", null, "#20dfad", "体力+38"],
          ["交流", "companion", null, "#ff4f9a", "信赖+15"],
          ["亲密", "intimacy", null, "#f58ab5", isIntimacyUnlocked() ? "信赖+20" : "信赖60解锁"],
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
      const button = createActionButton(label, action, attribute, color, cost);
      if (action === "intimacy" && !isIntimacyUnlocked()) {
        button.title = `信赖值达到 ${INTIMACY_UNLOCK_TRUST} 后解锁亲密行动`;
        button.setAttribute("aria-label", `亲密，信赖值${INTIMACY_UNLOCK_TRUST}解锁`);
      }
      container.appendChild(button);
    });
    document.getElementById("actionModeLabel").textContent = isExtraRound()
      ? "请选择额外行动"
      : "请选择行动";
    const actionZone = document.getElementById("actionZone");
    if (actionZone) actionZone.classList.remove("is-summary-round");
    renderActionHighlights();
  }

  function renderActionHighlights() {
    const actionZone = document.getElementById("actionZone");
    if (actionZone) actionZone.classList.toggle("is-summary-round", isSummaryRound());
    document.querySelectorAll(".action-button").forEach((button) => {
      if (["day_summary", "next_day"].includes(button.dataset.action)) {
        button.disabled = !isSummaryRound();
      } else if (["freechat", "interaction"].includes(button.dataset.action)) {
        button.disabled = false;
      } else if (button.dataset.action === "bond") {
        button.disabled = !pendingAffinityActionThreshold();
      } else if (button.dataset.action === "live") {
        button.disabled = Boolean(state.firstLive.completed);
      } else if (button.dataset.action === "world_map") {
        button.disabled = !isFreeModeUnlocked();
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

  let hostPromptSendSource = "general";

  function resetPhoneChatPendingState() {
    state.phoneChat.isAwaitingReply = false;
    state.phoneChat.pendingRequestId = "";
    state.phoneChat.retryAvailable = false;
    setPhoneChatTyping(false);
    setPhoneChatComposerEnabled(true);
    updatePhoneChatRetryUi();
  }

  function sendPhoneChatPromptToHost(promptText, requestId = pendingAiRequestId || createRequestId()) {
    const prevSource = hostPromptSendSource;
    hostPromptSendSource = "phonechat";
    const sent = requestHostPromptSend(promptText, requestId);
    hostPromptSendSource = prevSource;
    return sent;
  }

  function requestHostPromptSend(promptText, requestId = pendingAiRequestId || createRequestId()) {
    if (!isSillyTavernHost()) return false;
    const prompt = promptText || state.lastPrompt || document.getElementById("promptText").value || "";
    if (!prompt.trim()) return false;
    const source = hostPromptSendSource === "phonechat" ? "phonechat" : "general";
    if (source !== "phonechat" && state.activeStoryNode?.type === "phonechat") {
      state.activeStoryNode = null;
      resetPhoneChatPendingState();
    }
    pendingAiRequestId = requestId;
    aiReplyRetryCount = 0;
    recordDebugPromptDispatch(prompt, requestId);
    aiBridgeDebug.lastMessage = "已向 SillyTavern 发送提示词";
    refreshVnDebugView();
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
      startOpeningStory("ST角色卡自动绑定");
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

  function closeFreeChatOverlay() {
    setElementHidden("freeChatOverlay", true);
  }

  const daySummaryRadarAxes = [
    { key: "Vo", label: "歌唱技巧" },
    { key: "Vi", label: "表现技巧" },
    { key: "trust", label: "自信" },
    { key: "stamina", label: "体力" },
    { key: "Da", label: "舞蹈技巧" }
  ];

  function formatIdolDisplayName(name) {
    const text = String(name || "").trim();
    if (text.length <= 2) return text;
    return `${text.slice(0, 2)} ${text.slice(2)}`;
  }

  function getIdolSchoolClass(idolName) {
    const canonical = canonicalIdolName(idolName);
    return idolSchoolClasses[canonical] || "—";
  }

  function statToRadarPercent(key) {
    if (key === "stamina" || key === "trust") {
      return clamp(Number(state[key] || 0), 0, 100);
    }
    const cap = Number(state.cap?.[key] || 1);
    return clamp((Number(state[key] || 0) / cap) * 100, 0, 100);
  }

  function radarVertex(cx, cy, radius, index, total = 5) {
    const angle = ((Math.PI * 2 * index) / total) - (Math.PI / 2);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    };
  }

  function radarPolygonPoints(values, cx, cy, maxRadius) {
    return values.map((value, index) => {
      const point = radarVertex(cx, cy, maxRadius * (clamp(value, 0, 100) / 100), index, values.length);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    }).join(" ");
  }

  function renderDaySummaryRadar() {
    const grid = document.getElementById("daySummaryRadarGrid");
    const labels = document.getElementById("daySummaryRadarLabels");
    const shape = document.getElementById("daySummaryRadarShape");
    if (!grid || !labels || !shape) return;

    const cx = 160;
    const cy = 150;
    const maxRadius = 88;
    const values = daySummaryRadarAxes.map((axis) => statToRadarPercent(axis.key));

    grid.innerHTML = [0.25, 0.5, 0.75, 1].map((level) => {
      const points = radarPolygonPoints(daySummaryRadarAxes.map(() => level * 100), cx, cy, maxRadius);
      return `<polygon class="day-summary-radar-grid" points="${points}"></polygon>`;
    }).join("");

    shape.setAttribute("points", radarPolygonPoints(values, cx, cy, maxRadius));

    labels.innerHTML = daySummaryRadarAxes.map((axis, index) => {
      const anchor = radarVertex(cx, cy, maxRadius + 22, index, daySummaryRadarAxes.length);
      const align = index === 0 ? "middle" : index === 1 || index === 2 ? "start" : index === 4 ? "end" : "middle";
      const dx = index === 1 ? 6 : index === 2 ? 8 : index === 4 ? -8 : index === 3 ? -8 : 0;
      const dy = index === 0 ? -6 : index === 3 || index === 4 ? 10 : 4;
      return `<text x="${(anchor.x + dx).toFixed(1)}" y="${(anchor.y + dy).toFixed(1)}" text-anchor="${align}">${axis.label}</text>`;
    }).join("");
  }

  function getDaySummaryDisplayLines() {
    const summary = state.dailySummary || {};
    const sameDay = Number(summary.day) === Number(state.day);
    const lines = [summary.intro, summary.status, summary.producer].filter(Boolean);
    if (sameDay && summary.complete) {
      return lines;
    }
    if (sameDay && lines.length) {
      return [
        ...lines,
        "今日总结尚未完整，缺少必要段落。可在第四轮额外行动的事件面板重新生成该次回复。"
      ];
    }
    return [
      "今日总结尚未生成。",
      "请先完成第四轮额外行动，并等待 AI 在行动收尾回复中写入【今日总结开始】…【今日总结结束】。",
      "总结应包含：角色介绍、当前状态评估、制作人视角的下一步问题。"
    ];
  }

  function renderDaySummaryNotes(lines) {
    const container = document.getElementById("daySummaryNotes");
    if (!container) return;
    const displayLines = Array.isArray(lines) ? lines : getDaySummaryDisplayLines();
    container.innerHTML = displayLines.map((line) => `<p class="day-summary-line">${line}</p>`).join("");
  }

  function renderDaySummary() {
    const profile = idols[state.idol] || {};
    const avatar = document.getElementById("daySummaryAvatar");
    const schedule = document.getElementById("daySummarySchedule");
    const name = document.getElementById("daySummaryName");

    if (avatar) {
      avatar.src = profile.avatar || "";
      avatar.alt = state.idol ? `${state.idol}头像` : "担当头像";
    }
    if (schedule) {
      schedule.textContent = getIdolSchoolClass(state.idol);
    }
    const dayValue = document.getElementById("daySummaryDayValue");
    if (dayValue) {
      dayValue.textContent = String(state.day || 1);
    }
    if (name) {
      name.textContent = formatIdolDisplayName(state.idol || "未选择");
    }

    renderDaySummaryRadar();
    renderDaySummaryNotes();
  }

  function openDaySummaryOverlay() {
    renderDaySummary();
    setElementHidden("daySummaryOverlay", false);
  }

  function closeDaySummaryOverlay() {
    setElementHidden("daySummaryOverlay", true);
  }

  function escapePhoneText(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatPhoneClock(date = new Date()) {
    if (isFreeModeActive() && Number.isFinite(Number(state.freeMode?.clockMinutes))) {
      return formatFreeModeClock(state.freeMode.clockMinutes);
    }
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function phoneChatMessageId() {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function getPhoneProducerLabel() {
    const name = String(state.producer?.name || "").trim();
    if (!name || name === "{{user}}") return "制作人";
    return name;
  }

  function formatPhoneHomeDate(date = new Date()) {
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  }

  function setPhoneStatusBarMode(mode) {
    const bar = document.getElementById("phoneStatusBar");
    if (!bar) return;
    bar.classList.toggle("is-home", mode === "home");
    bar.classList.toggle("is-line", mode === "line");
    bar.classList.toggle("is-music", mode === "music");
  }

  function setPhoneNavBarVisible(visible) {
    const bar = document.getElementById("phoneNavBar");
    if (bar) bar.hidden = !visible;
  }

  // 底部功能栏“返回”：按当前所在的 app / 子视图逐级回退，最后回到主屏幕。
  function phoneNavBack() {
    const musicApp = document.getElementById("phoneMusicApp");
    if (musicApp && !musicApp.hidden) {
      const now = document.getElementById("phoneMusicNow");
      if (now && now.classList.contains("open")) { closeMusicNow(); return; }
      showPhoneHomeView();
      return;
    }
    const lineApp = document.getElementById("phoneLineApp");
    if (lineApp && !lineApp.hidden) {
      const chat = document.getElementById("phoneLineChatView");
      const addFriend = document.getElementById("phoneLineAddFriendView");
      if ((chat && !chat.hidden) || (addFriend && !addFriend.hidden)) {
        showPhoneListView();
        return;
      }
      showPhoneHomeView();
      return;
    }
    showPhoneHomeView();
  }

  function renderPhoneHomeAppIcon(app) {
    return `
      <button type="button" class="phone-app-icon" data-phone-app="${app.id}" role="listitem">
        <span class="phone-app-icon-badge" style="--app-color: ${app.theme}">${escapePhoneText(app.iconText)}</span>
        <span class="phone-app-icon-label">${escapePhoneText(app.name)}</span>
      </button>
    `;
  }

  function renderPhoneHome() {
    const grid = document.getElementById("phoneAppGrid");
    const dock = document.getElementById("phoneDockApps");
    const date = document.getElementById("phoneHomeDate");
    if (date) date.textContent = formatPhoneHomeDate();
    renderPhoneStatusBar();

    const installedApps = phoneAppRegistry.filter((app) => app.installed);
    const appIcons = installedApps.map(renderPhoneHomeAppIcon).join("");
    const emptySlot = `
      <div class="phone-app-slot phone-app-slot-empty" aria-hidden="true">
        <span class="phone-app-slot-badge">+</span>
        <span class="phone-app-icon-label">添加应用</span>
      </div>
    `;
    if (grid) grid.innerHTML = `${appIcons}${emptySlot}`;
    if (dock) dock.innerHTML = installedApps.slice(0, 4).map(renderPhoneHomeAppIcon).join("");
  }

  function showPhoneLineAppShell() {
    setElementHidden("phoneHomeView", true);
    setElementHidden("phoneMusicApp", true);
    setElementHidden("phoneLineApp", false);
    setPhoneStatusBarMode("line");
    setPhoneNavBarVisible(true);
  }

  function showPhoneHomeView() {
    ensureStateShape();
    state.phoneChat.activeView = "home";
    state.phoneChat.activeThreadId = "";
    setElementHidden("phoneLineApp", true);
    setElementHidden("phoneMusicApp", true);
    setElementHidden("phoneHomeView", false);
    setPhoneStatusBarMode("home");
    setPhoneNavBarVisible(false);
    renderPhoneHome();
  }

  function openPhoneLineApp() {
    showPhoneLineAppShell();
    showPhoneListView();
  }

  function launchPhoneApp(appId) {
    const app = phoneAppRegistry.find((entry) => entry.id === appId && entry.installed);
    if (!app) return;
    if (appId === "line") {
      openPhoneLineApp();
    } else if (appId === "music") {
      openPhoneMusicApp();
    }
  }

  // ===== 小手机 · 音乐播放器 =====
  const PHONE_MUSIC_LIKED_KEY = "hatsu_phone_music_liked_v1";
  const PHONE_MUSIC_PALETTE = [
    ["#7b4dff", "#3a1d6e"], ["#ff7ab8", "#7a2f5e"], ["#2fd4c9", "#155e66"],
    ["#ff5a3c", "#7a1f2e"], ["#5aa9ff", "#1f3a7a"], ["#ffc24d", "#7a4f15"],
    ["#ff4f9a", "#3a1d6e"], ["#9d7bff", "#2a1f5e"], ["#4ade80", "#155e3a"]
  ];
  const musicTracks = phoneMusicTracks.map((t, i) => ({ ...t, _pal: PHONE_MUSIC_PALETTE[i % PHONE_MUSIC_PALETTE.length] }));
  let musicLikedSet = loadMusicLiked();
  let musicCur = -1;
  let musicPlaying = false;
  let musicShuffle = false;
  let musicRepeat = false;
  let musicFilter = "all";
  let musicQueue = [];
  let musicQueuePos = -1;
  let musicInited = false;
  let musicAudioEl = null;

  function loadMusicLiked() {
    try { return new Set(JSON.parse(localStorage.getItem(PHONE_MUSIC_LIKED_KEY) || "[]")); }
    catch (error) { return new Set(); }
  }
  function saveMusicLiked() {
    try { localStorage.setItem(PHONE_MUSIC_LIKED_KEY, JSON.stringify([...musicLikedSet])); }
    catch (error) { /* 忽略存储失败 */ }
  }
  function musicTrackKey(t) { return t.file; }
  function isMusicLiked(i) { return musicLikedSet.has(musicTrackKey(musicTracks[i])); }
  function musicCoverCss(t) { return `background:linear-gradient(150deg, ${t._pal[0]}, ${t._pal[1]});`; }
  function musicInitial(t) { return String(t.title || "?").trim().charAt(0).toUpperCase(); }
  function musicCoverInner(t) {
    const span = `<span>${escapePhoneText(musicInitial(t))}</span>`;
    if (!t.cover) return span;
    return `<img src="${musicUrl(t.cover)}" alt="" loading="lazy" onerror="this.remove()">${span}`;
  }
  function musicFmt(s) {
    if (!Number.isFinite(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  }
  function musicLikedIndices() { return musicTracks.map((_, i) => i).filter((i) => isMusicLiked(i)); }
  function musicViewIndices() { return musicFilter === "liked" ? musicLikedIndices() : musicTracks.map((_, i) => i); }

  function ensureMusicAudio() {
    if (!musicAudioEl) musicAudioEl = document.getElementById("phoneMusicAudio");
    return musicAudioEl;
  }

  function openPhoneMusicApp() {
    setElementHidden("phoneHomeView", true);
    setElementHidden("phoneLineApp", true);
    setElementHidden("phoneMusicApp", false);
    setPhoneStatusBarMode("music");
    setPhoneNavBarVisible(true);
    if (!musicInited) {
      musicInited = true;
      bindPhoneMusicEvents();
    }
    closeMusicNow();
    renderMusicLibrary();
  }

  function renderMusicLibrary() {
    const grid = document.getElementById("phoneMusicQuickGrid");
    const list = document.getElementById("phoneMusicTrackList");
    const countEl = document.getElementById("phoneMusicLikedCount");
    if (!grid || !list) return;
    if (countEl) countEl.textContent = String(musicLikedSet.size);

    if (!musicTracks.length) {
      grid.innerHTML = "";
      list.innerHTML = `<div class="music-empty">未找到歌曲。<br>请把音频放入 assets/PlayList 后运行 generate-playlist.cjs。</div>`;
      return;
    }

    const likedTile = `
      <div class="music-quick-card liked-tile" data-pm-tile="liked">
        <div class="music-cover music-qc-cover"><svg aria-hidden="true"><use href="#icon-heart"></use></svg></div>
        <div class="music-qc-name">已点赞的歌曲</div>
      </div>`;
    const songTiles = musicTracks.slice(0, 3).map((t, i) => `
      <div class="music-quick-card" data-pm-index="${i}">
        <div class="music-cover music-qc-cover" style="${musicCoverCss(t)}">${musicCoverInner(t)}</div>
        <div class="music-qc-name">${escapePhoneText(t.title)}</div>
      </div>`).join("");
    grid.innerHTML = likedTile + songTiles;

    document.querySelectorAll(".music-tab").forEach((b) => {
      b.classList.toggle("music-tab-active", b.dataset.pmFilter === musicFilter);
    });

    const idxs = musicViewIndices();
    if (!idxs.length) {
      list.innerHTML = `<div class="music-empty">还没有点赞的歌曲。<br>点击歌曲右侧的红心即可收藏。</div>`;
      return;
    }

    const actionsBar = musicFilter === "liked" ? `
      <div class="music-liked-actions">
        <button type="button" class="music-liked-play" data-pm-action="play"><svg aria-hidden="true"><use href="#icon-play"></use></svg>播放</button>
        <button type="button" class="music-liked-shuffle" data-pm-action="shuffle"><svg aria-hidden="true"><use href="#icon-shuffle"></use></svg>随机播放</button>
      </div>` : "";

    list.innerHTML = actionsBar + idxs.map((i) => {
      const t = musicTracks[i];
      return `
        <div class="music-track-row${i === musicCur ? " is-playing" : ""}" data-pm-index="${i}">
          <div class="music-cover music-tr-cover" style="${musicCoverCss(t)}">${musicCoverInner(t)}</div>
          <div class="music-tr-meta">
            <div class="music-tr-title">${escapePhoneText(t.title)}</div>
            <div class="music-tr-artist">${escapePhoneText(t.artist)}</div>
          </div>
          <div class="music-tr-eq"><span></span><span></span><span></span></div>
          <button type="button" class="music-tr-like${isMusicLiked(i) ? " liked" : ""}" data-pm-like="${i}" aria-label="点赞"><svg aria-hidden="true"><use href="#icon-heart"></use></svg></button>
        </div>`;
    }).join("");
  }

  function setMusicFilter(f) {
    musicFilter = f === "liked" ? "liked" : "all";
    const scroller = document.querySelector("#phoneMusicApp .music-scroll");
    const top = scroller ? scroller.scrollTop : 0;
    renderMusicLibrary();
    if (scroller) scroller.scrollTop = top;
  }

  function toggleMusicLike(i) {
    if (!musicTracks[i]) return;
    const key = musicTrackKey(musicTracks[i]);
    if (musicLikedSet.has(key)) musicLikedSet.delete(key); else musicLikedSet.add(key);
    saveMusicLiked();
    const scroller = document.querySelector("#phoneMusicApp .music-scroll");
    const top = scroller ? scroller.scrollTop : 0;
    renderMusicLibrary();
    if (scroller) scroller.scrollTop = top;
    if (musicCur === i) updateMusicNowLike();
  }

  function updateMusicNowLike() {
    const btn = document.getElementById("phoneMusicNowLikeBtn");
    if (btn) btn.classList.toggle("liked", musicCur >= 0 && isMusicLiked(musicCur));
  }

  function musicSelectTrack(i, context) {
    const audio = ensureMusicAudio();
    if (!audio || !musicTracks[i]) return;
    musicCur = i;
    musicQueue = (context && context.length) ? context.slice() : musicViewIndices();
    if (!musicQueue.includes(i)) musicQueue = musicTracks.map((_, k) => k);
    musicQueuePos = musicQueue.indexOf(i);
    notifyMusicPlaybackStart();
    audio.src = musicUrl(musicTracks[i].file);
    audio.play().catch(() => {});
    syncMusicTrackUi();
  }

  function syncMusicTrackUi() {
    const t = musicTracks[musicCur];
    if (!t) return;
    const mini = document.getElementById("phoneMusicMini");
    if (mini) mini.hidden = false;
    setMusicCover("phoneMusicMiniCover", t);
    setText("phoneMusicMiniTitle", t.title);
    setText("phoneMusicMiniArtist", t.artist);
    setMusicCover("phoneMusicNowCover", t);
    setText("phoneMusicNowSong", t.title);
    setText("phoneMusicNowSinger", t.artist);
    const now = document.getElementById("phoneMusicNow");
    if (now) now.style.setProperty("--np-accent", t._pal[1]);
    document.querySelectorAll("#phoneMusicTrackList .music-track-row").forEach((r) => {
      r.classList.toggle("is-playing", Number(r.dataset.pmIndex) === musicCur);
    });
    updateMusicNowLike();
    syncMusicPlayButtons();
    updateMusicProgress();
  }

  function setMusicCover(id, t) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.cssText = musicCoverCss(t);
    el.innerHTML = musicCoverInner(t);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function syncMusicPlayButtons() {
    const icon = musicPlaying ? "#icon-pause" : "#icon-play";
    ["phoneMusicPlayBtn", "phoneMusicMiniPlayBtn"].forEach((id) => {
      const use = document.querySelector(`#${id} use`);
      if (use) use.setAttribute("href", icon);
    });
  }

  function updateMusicProgress() {
    const audio = ensureMusicAudio();
    if (!audio) return;
    const dur = audio.duration || 0;
    const pos = audio.currentTime || 0;
    const pct = dur ? Math.min(100, (pos / dur) * 100) : 0;
    const fill = document.getElementById("phoneMusicFill");
    const knob = document.getElementById("phoneMusicKnob");
    const miniProg = document.getElementById("phoneMusicMiniProg");
    if (fill) fill.style.width = pct + "%";
    if (knob) knob.style.left = pct + "%";
    if (miniProg) miniProg.style.width = pct + "%";
    setText("phoneMusicCur", musicFmt(pos));
    setText("phoneMusicDur", musicFmt(dur));
  }

  function toggleMusicPlay() {
    const audio = ensureMusicAudio();
    if (!audio) return;
    if (musicCur < 0) { musicSelectTrack(0); return; }
    if (audio.paused) audio.play().catch(() => {}); else audio.pause();
  }

  function ensureMusicQueue() {
    if (!musicQueue.length) {
      musicQueue = musicViewIndices();
      if (!musicQueue.length) musicQueue = musicTracks.map((_, k) => k);
    }
    if (musicQueuePos < 0) musicQueuePos = Math.max(0, musicQueue.indexOf(musicCur));
  }

  function musicNext() {
    if (!musicTracks.length) return;
    ensureMusicQueue();
    let pos;
    if (musicShuffle) {
      if (musicQueue.length <= 1) pos = musicQueuePos;
      else { do { pos = Math.floor(Math.random() * musicQueue.length); } while (pos === musicQueuePos); }
    } else {
      pos = (musicQueuePos + 1) % musicQueue.length;
    }
    musicQueuePos = pos;
    musicSelectTrack(musicQueue[pos], musicQueue);
  }

  function musicPrev() {
    const audio = ensureMusicAudio();
    if (audio && audio.currentTime > 3) { audio.currentTime = 0; return; }
    ensureMusicQueue();
    const pos = (musicQueuePos - 1 + musicQueue.length) % musicQueue.length;
    musicQueuePos = pos;
    musicSelectTrack(musicQueue[pos], musicQueue);
  }

  function playMusicLiked(shuffleMode) {
    const idxs = musicLikedIndices();
    if (!idxs.length) return;
    musicShuffle = shuffleMode;
    const sb = document.getElementById("phoneMusicShuffleBtn");
    if (sb) sb.classList.toggle("active", musicShuffle);
    musicQueue = idxs.slice();
    musicQueuePos = shuffleMode ? Math.floor(Math.random() * musicQueue.length) : 0;
    musicSelectTrack(musicQueue[musicQueuePos], musicQueue);
    openMusicNow();
  }

  function openMusicNow() {
    const now = document.getElementById("phoneMusicNow");
    if (now) now.classList.add("open");
  }
  function closeMusicNow() {
    const now = document.getElementById("phoneMusicNow");
    if (now) now.classList.remove("open");
  }

  // 与直播视频/其它音源互斥：开始播歌时暂停直播视频。
  function notifyMusicPlaybackStart() {
    try {
      const live = document.getElementById("liveVideo");
      if (live && !live.paused) live.pause();
    } catch (error) { /* 忽略 */ }
  }

  // 直播等场景开始时调用，暂停音乐。
  function pausePhoneMusic() {
    const audio = ensureMusicAudio();
    if (audio && !audio.paused) audio.pause();
  }

  function bindPhoneMusicEvents() {
    const audio = ensureMusicAudio();
    const grid = document.getElementById("phoneMusicQuickGrid");
    const list = document.getElementById("phoneMusicTrackList");

    if (grid) grid.addEventListener("click", (event) => {
      const tile = event.target.closest("[data-pm-tile]");
      if (tile) { setMusicFilter("liked"); return; }
      const card = event.target.closest("[data-pm-index]");
      if (card) { musicSelectTrack(Number(card.dataset.pmIndex)); openMusicNow(); }
    });

    if (list) list.addEventListener("click", (event) => {
      const likeBtn = event.target.closest("[data-pm-like]");
      if (likeBtn) { event.stopPropagation(); toggleMusicLike(Number(likeBtn.dataset.pmLike)); return; }
      const action = event.target.closest("[data-pm-action]");
      if (action) { playMusicLiked(action.dataset.pmAction === "shuffle"); return; }
      const row = event.target.closest("[data-pm-index]");
      if (row) { musicSelectTrack(Number(row.dataset.pmIndex)); openMusicNow(); }
    });

    document.querySelectorAll(".music-tab").forEach((b) => {
      b.addEventListener("click", () => setMusicFilter(b.dataset.pmFilter));
    });

    const bind = (id, handler, evt = "click") => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(evt, handler);
    };
    bind("phoneMusicMini", openMusicNow);
    bind("phoneMusicMiniPlayBtn", (e) => { e.stopPropagation(); toggleMusicPlay(); });
    bind("phoneMusicPlayBtn", toggleMusicPlay);
    bind("phoneMusicNextBtn", musicNext);
    bind("phoneMusicPrevBtn", musicPrev);
    bind("phoneMusicNowCloseBtn", closeMusicNow);
    bind("phoneMusicNowLikeBtn", () => { if (musicCur >= 0) toggleMusicLike(musicCur); });
    bind("phoneMusicShuffleBtn", () => {
      musicShuffle = !musicShuffle;
      document.getElementById("phoneMusicShuffleBtn")?.classList.toggle("active", musicShuffle);
    });
    bind("phoneMusicRepeatBtn", () => {
      musicRepeat = !musicRepeat;
      document.getElementById("phoneMusicRepeatBtn")?.classList.toggle("active", musicRepeat);
    });
    bind("phoneMusicTrack", (event) => {
      if (!audio) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const dur = audio.duration || 0;
      if (dur) audio.currentTime = ((event.clientX - rect.left) / rect.width) * dur;
    });

    if (audio) {
      audio.addEventListener("play", () => {
        musicPlaying = true;
        syncMusicPlayButtons();
        bgmManager.stop();
      });
      audio.addEventListener("pause", () => {
        musicPlaying = false;
        syncMusicPlayButtons();
        // 切歌瞬间也会触发 pause；延迟校验，仅在确实停下时才恢复 BGM。
        setTimeout(() => { if (audio.paused) updateBgm(); }, 200);
      });
      audio.addEventListener("timeupdate", updateMusicProgress);
      audio.addEventListener("loadedmetadata", updateMusicProgress);
      audio.addEventListener("ended", () => {
        if (musicRepeat) { audio.currentTime = 0; audio.play().catch(() => {}); }
        else musicNext();
      });
    }
  }

  function phoneFriendThreadId(friendName) {
    return `friend:${canonicalIdolName(friendName)}`;
  }

  function isPhoneFriendThreadId(threadId) {
    return String(threadId || "").startsWith("friend:");
  }

  function getPhoneFriendNameFromThreadId(threadId) {
    return canonicalIdolName(String(threadId || "").replace(/^friend:/, ""));
  }

  function getPhoneThreadContactName(threadId) {
    if (threadId === "idol") return state.idol || "";
    if (isPhoneFriendThreadId(threadId)) return getPhoneFriendNameFromThreadId(threadId);
    return "";
  }

  function resolvePhoneFriendName(rawInput) {
    const trimmed = String(rawInput || "").trim();
    if (!trimmed) return "";
    const canonical = canonicalIdolName(trimmed);
    if (idols[canonical]) return canonical;
    const exact = Object.keys(idols).find((name) => name === trimmed);
    if (exact) return exact;
    const partial = Object.keys(idols).find((name) => name.includes(trimmed) || trimmed.includes(name));
    return partial || "";
  }

  function getPhoneAddFriendCandidates() {
    ensureStateShape();
    const taken = new Set([state.idol, ...(state.phoneChat.friends || [])]);
    return interactionCharacters.filter((name) => !taken.has(name) && idols[name]);
  }

  function buildPhoneThreadDefinitions() {
    const idolName = state.idol;
    const profile = idols[idolName] || {};
    const friendThreads = (state.phoneChat?.friends || []).map((friendName) => {
      const friendProfile = idols[friendName] || {};
      return {
        id: phoneFriendThreadId(friendName),
        name: friendName,
        contactName: friendName,
        avatar: friendProfile.avatar || "",
        type: "direct",
        pinned: false,
        writable: true,
        subtitle: "好友"
      };
    });
    return [
      {
        id: "idol",
        name: idolName || "担当偶像",
        contactName: idolName || "",
        avatar: profile.avatar || "",
        type: "direct",
        pinned: true,
        writable: true,
        subtitle: "在线"
      },
      ...friendThreads
    ];
  }

  function getPhoneThreadDefinition(threadId) {
    return buildPhoneThreadDefinitions().find((thread) => thread.id === threadId) || null;
  }

  function getPhoneThreadMessages(threadId) {
    ensureStateShape();
    return Array.isArray(state.phoneChat.messages[threadId]) ? state.phoneChat.messages[threadId] : [];
  }

  function getPhoneThreadPreview(threadId) {
    const messages = getPhoneThreadMessages(threadId);
    const last = messages[messages.length - 1];
    return last ? String(last.text || "") : "暂无消息";
  }

  function getPhoneThreadTime(threadId) {
    const messages = getPhoneThreadMessages(threadId);
    const last = messages[messages.length - 1];
    return last ? String(last.time || "") : "";
  }

  function getPhoneUnreadCount(threadId) {
    const thread = getPhoneThreadDefinition(threadId);
    if (!thread || thread.type !== "direct") return 0;
    return getPhoneThreadMessages(threadId).filter((message) => message.sender === "idol" && !message.read).length;
  }

  function renderPhoneStatusBar() {
    const clock = document.getElementById("phoneStatusTime");
    if (clock) clock.textContent = formatPhoneClock();
  }

  function renderPhoneChatList() {
    const list = document.getElementById("phoneChatList");
    if (!list) return;

    const threads = buildPhoneThreadDefinitions();
    const pinned = threads.filter((thread) => thread.pinned);
    const regular = threads.filter((thread) => !thread.pinned);
    const ordered = [...pinned, ...regular];

    list.innerHTML = ordered.map((thread) => {
      const unread = getPhoneUnreadCount(thread.id);
      const preview = getPhoneThreadPreview(thread.id);
      const time = getPhoneThreadTime(thread.id);
      const avatarMarkup = thread.avatar
        ? `<img class="line-thread-avatar" src="${thread.avatar}" alt="${thread.name}头像" draggable="false">`
        : `<div class="line-thread-avatar ${thread.type === "official" ? "is-official" : "is-group"}" aria-hidden="true">${thread.type === "official" ? "校" : "群"}</div>`;
      return `
        <button class="line-thread" type="button" data-thread-id="${thread.id}" role="listitem">
          ${avatarMarkup}
          <span class="line-thread-body">
            <span class="line-thread-head">
              <span class="line-thread-name">${escapePhoneText(thread.name)}</span>
              <span class="line-thread-time">${escapePhoneText(time)}</span>
            </span>
            <span class="line-thread-preview">
              <span class="line-thread-text">${escapePhoneText(preview)}</span>
              ${unread ? `<span class="line-thread-badge">${unread}</span>` : ""}
            </span>
          </span>
        </button>
      `;
    }).join("");
  }

  function renderPhoneChatMessages(threadId, options = {}) {
    const container = document.getElementById("phoneChatMessages");
    if (!container) return;

    const thread = getPhoneThreadDefinition(threadId);
    const messages = getPhoneThreadMessages(threadId);
    const contactName = getPhoneThreadContactName(threadId);
    const contactAvatar = idols[contactName]?.avatar || "";
    const showTyping = options.showTyping ?? isPhoneChatTyping();
    const showTypingRetry = showTyping && state.activeStoryNode?.type === "phonechat";

    container.innerHTML = `
      <div class="line-date-chip">今天</div>
      ${messages.map((message) => {
        if (message.sender === "producer") {
          return `
            <div class="line-msg line-msg-out">
              <span class="line-msg-read">${message.read ? "已读" : ""}</span>
              <div class="line-msg-bubble">${escapePhoneText(message.text)}</div>
              <span class="line-msg-time">${escapePhoneText(message.time)}</span>
            </div>
          `;
        }
        const isSystem = message.sender === "system";
        return `
          <div class="line-msg line-msg-in">
            ${isSystem
              ? `<div class="line-thread-avatar is-official" aria-hidden="true">通</div>`
              : `<img class="line-msg-avatar" src="${contactAvatar}" alt="${escapePhoneText(contactName || "偶像")}头像" draggable="false">`}
            <div class="line-msg-bubble">${escapePhoneText(message.text)}</div>
            <span class="line-msg-time">${escapePhoneText(message.time)}</span>
          </div>
        `;
      }).join("")}
      ${showTyping ? `
        <div class="line-msg line-msg-in line-msg-typing" aria-live="polite">
          <img class="line-msg-avatar" src="${contactAvatar}" alt="" draggable="false">
          <div class="line-msg-bubble line-typing-bubble">
            <span class="line-typing-label">正在输入中</span>
            <span class="line-typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>
            ${showTypingRetry ? `<button type="button" class="line-typing-retry" data-phone-retry>未收到？重试</button>` : ""}
          </div>
        </div>
      ` : ""}
    `;

    container.scrollTop = container.scrollHeight;
    if (thread?.writable && !showTyping) {
      let changed = false;
      messages.forEach((message) => {
        if (message.sender === "idol" && !message.read) {
          message.read = true;
          changed = true;
        }
      });
      if (changed) saveState();
    }
    updatePhoneChatRetryUi();
  }

  function isPhoneChatTyping() {
    return phoneChatTypingVisible || Boolean(state.phoneChat?.isAwaitingReply);
  }

  function isPhoneChatBusy() {
    return isPhoneChatTyping() || Boolean(phoneChatDeliveryTimer);
  }

  function shouldShowPhoneChatRetryHint() {
    if (state.phoneChat?.activeView !== "chat") return false;
    const thread = getPhoneThreadDefinition(state.phoneChat?.activeThreadId);
    if (!thread?.writable) return false;
    return Boolean(state.phoneChat?.retryAvailable && !isPhoneChatTyping());
  }

  function canRetryPhoneChatNow() {
    if (state.activeStoryNode?.type !== "phonechat") return false;
    const thread = getPhoneThreadDefinition(state.phoneChat?.activeThreadId);
    if (!thread?.writable) return false;
    return Boolean(state.phoneChat?.isAwaitingReply || state.phoneChat?.retryAvailable || phoneChatDeliveryTimer);
  }

  function updatePhoneChatRetryUi() {
    const hint = document.getElementById("phoneChatRetryHint");
    if (hint) hint.hidden = !shouldShowPhoneChatRetryHint();
  }

  function triggerPhoneChatRegeneration() {
    if (!canRetryPhoneChatNow()) {
      showToast("暂无法重试", "当前没有等待中的私聊回复。", "warn");
      return;
    }

    clearPhoneChatDelivery();
    aiReplyRetryCount = 0;
    const requestId = state.phoneChat.pendingRequestId || state.lastRequestId || createRequestId();
    pendingAiRequestId = requestId;
    state.lastRequestId = requestId;
    state.phoneChat.pendingRequestId = requestId;
    state.phoneChat.isAwaitingReply = true;
    state.phoneChat.retryAvailable = false;
    setPhoneChatTyping(true);
    setPhoneChatComposerEnabled(false);
    updatePhoneChatRetryUi();
    saveState();

    const prompt = state.lastPrompt || "";
    if (isSillyTavernHost()) {
      window.parent.postMessage({
        source: "hatsuboshi-produce",
        type: "regenerate",
        requestId
      }, "*");
      showToast("正在重新生成", "已向 SillyTavern 请求重新生成私聊回复。", "info");
      return;
    }
    if (prompt && sendPhoneChatPromptToHost(prompt, requestId)) {
      showToast("正在重新生成", "已重新发送私聊提示词。", "info");
      return;
    }
    state.phoneChat.isAwaitingReply = false;
    state.phoneChat.retryAvailable = true;
    pendingAiRequestId = "";
    setPhoneChatTyping(false);
    setPhoneChatComposerEnabled(true);
    updatePhoneChatRetryUi();
    saveState();
    openAiPromptOverlay("当前页面未连接 SillyTavern。请复制私聊提示词后手动发送。");
  }

  function setPhoneChatTyping(visible) {
    phoneChatTypingVisible = visible;
    const threadId = state.phoneChat?.activeThreadId;
    if (threadId && state.phoneChat?.activeView === "chat") {
      renderPhoneChatMessages(threadId, { showTyping: visible });
    }
    updatePhoneChatRetryUi();
  }

  function setPhoneChatComposerEnabled(enabled) {
    const thread = getPhoneThreadDefinition(state.phoneChat?.activeThreadId);
    if (!thread?.writable) return;
    const input = document.getElementById("phoneChatInput");
    const sendBtn = document.querySelector("#phoneChatForm .line-send-btn");
    if (input) input.disabled = !enabled;
    if (sendBtn) sendBtn.disabled = !enabled;
  }

  function clearPhoneChatDelivery() {
    if (phoneChatDeliveryTimer) {
      clearTimeout(phoneChatDeliveryTimer);
      phoneChatDeliveryTimer = null;
    }
  }

  function startPhoneChatLineDelivery(threadId, lines) {
    clearPhoneChatDelivery();
    const queue = lines.map((line) => String(line || "").trim()).filter(Boolean);
    if (!queue.length) {
      setPhoneChatTyping(false);
      setPhoneChatComposerEnabled(true);
      return;
    }

    const deliverNext = () => {
      setPhoneChatTyping(true);
      phoneChatDeliveryTimer = window.setTimeout(() => {
        const line = queue.shift();
        appendPhoneChatMessage(threadId, "idol", line);
        saveState();
        if (state.phoneChat?.activeView === "chat" && state.phoneChat.activeThreadId === threadId) {
          renderPhoneChatMessages(threadId, { showTyping: queue.length > 0 });
        }
        renderPhoneChatList();

        if (queue.length) {
          deliverNext();
          return;
        }

        phoneChatDeliveryTimer = null;
        setPhoneChatTyping(false);
        setPhoneChatComposerEnabled(true);
      }, PHONE_CHAT_LINE_DELAY_MS);
    };

    deliverNext();
  }

  function sendPhoneChatToHost(userMessage, threadId = "idol") {
    const prompt = buildPhoneChatPrompt(userMessage, threadId);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "phonechat", threadId, mode: "chat", ready: false };
    state.lastPrompt = prompt;
    state.phoneChat.isAwaitingReply = true;
    state.phoneChat.pendingRequestId = requestId;
    state.phoneChat.retryAvailable = false;
    setPhoneChatTyping(true);
    setPhoneChatComposerEnabled(false);
    saveState();

    pendingAiRequestId = requestId;
    if (!sendPhoneChatPromptToHost(prompt, requestId)) {
      state.phoneChat.isAwaitingReply = false;
      state.phoneChat.pendingRequestId = "";
      state.phoneChat.retryAvailable = true;
      pendingAiRequestId = "";
      setPhoneChatTyping(false);
      setPhoneChatComposerEnabled(true);
      updatePhoneChatRetryUi();
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制私聊提示词后手动发送。");
    }
  }

  function sendPhoneAddFriendGreeting(friendName, threadId) {
    const prompt = buildPhoneAddFriendGreetingPrompt(friendName);
    const requestId = createRequestId();
    state.activeStoryNode = { type: "phonechat", threadId, mode: "greeting", contactName: friendName, ready: false };
    state.lastPrompt = prompt;
    state.phoneChat.isAwaitingReply = true;
    state.phoneChat.pendingRequestId = requestId;
    state.phoneChat.retryAvailable = false;
    setPhoneChatTyping(true);
    setPhoneChatComposerEnabled(false);
    saveState();

    pendingAiRequestId = requestId;
    if (!sendPhoneChatPromptToHost(prompt, requestId)) {
      state.phoneChat.isAwaitingReply = false;
      state.phoneChat.pendingRequestId = "";
      state.phoneChat.retryAvailable = true;
      pendingAiRequestId = "";
      setPhoneChatTyping(false);
      setPhoneChatComposerEnabled(true);
      updatePhoneChatRetryUi();
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制添加好友问候提示词后手动发送。");
    }
  }

  function handlePhoneChatAiReply(source, requestId, isFinal) {
    if (!isFinal) {
      state.phoneChat.isAwaitingReply = true;
      setPhoneChatTyping(true);
      setPhoneChatComposerEnabled(false);
      sendAiReplyAck(requestId, true, false, false);
      return;
    }

    const parsed = extractPhoneChatReply(source);
    if (!parsed.complete) {
      if (aiReplyRetryCount < 2) {
        aiReplyRetryCount += 1;
        state.phoneChat.isAwaitingReply = true;
        setPhoneChatTyping(true);
        sendAiReplyAck(requestId, false, true);
        return;
      }
      aiReplyRetryCount = 0;
      pendingAiRequestId = "";
      state.phoneChat.isAwaitingReply = false;
      state.phoneChat.pendingRequestId = "";
      state.phoneChat.retryAvailable = true;
      if (state.activeStoryNode?.type === "phonechat") state.activeStoryNode.ready = true;
      setPhoneChatTyping(false);
      setPhoneChatComposerEnabled(true);
      updatePhoneChatRetryUi();
      saveState();
      showToast("私聊回复异常", "未找到有效的 <初星私聊> 回复，可点重试重新生成。", "warn");
      sendAiReplyAck(requestId, false, false);
      return;
    }

    aiReplyRetryCount = 0;
    pendingAiRequestId = "";
    state.phoneChat.isAwaitingReply = false;
    state.phoneChat.pendingRequestId = "";
    state.phoneChat.retryAvailable = false;
    if (state.activeStoryNode?.type === "phonechat") state.activeStoryNode.ready = true;
    const threadId = state.activeStoryNode?.threadId || "idol";
    startPhoneChatLineDelivery(threadId, parsed.lines);
    sendAiReplyAck(requestId, true, false);
    saveState();
    updatePhoneChatRetryUi();
  }

  function showPhoneListView() {
    ensureStateShape();
    showPhoneLineAppShell();
    state.phoneChat.activeView = "list";
    state.phoneChat.activeThreadId = "";
    setElementHidden("phoneLineChatView", true);
    setElementHidden("phoneLineAddFriendView", true);
    setElementHidden("phoneLineListView", false);
    renderPhoneChatList();
  }

  function renderPhoneAddFriendSuggestions() {
    const container = document.getElementById("phoneAddFriendSuggestions");
    if (!container) return;
    const candidates = getPhoneAddFriendCandidates();
    if (!candidates.length) {
      container.innerHTML = `<p class="line-add-friend-note">暂无可添加的学院偶像。</p>`;
      return;
    }
    container.innerHTML = candidates.map((name) => (
      `<button type="button" class="line-add-friend-chip" data-friend-name="${escapePhoneText(name)}">${escapePhoneText(name)}</button>`
    )).join("");
  }

  function openPhoneAddFriendView() {
    if (isPhoneChatBusy()) {
      showToast("请稍候", "请等待当前私聊回复完成。", "warn");
      return;
    }
    ensureStateShape();
    state.phoneChat.activeView = "add_friend";
    showPhoneLineAppShell();
    const input = document.getElementById("phoneAddFriendInput");
    const submitBtn = document.getElementById("phoneAddFriendSubmitBtn");
    if (input) input.value = "";
    if (submitBtn) submitBtn.disabled = false;
    renderPhoneAddFriendSuggestions();
    setElementHidden("phoneLineChatView", true);
    setElementHidden("phoneLineListView", true);
    setElementHidden("phoneLineAddFriendView", false);
    input?.focus();
  }

  function closePhoneAddFriendView() {
    setElementHidden("phoneLineAddFriendView", true);
    showPhoneListView();
  }

  function confirmPhoneAddFriend(rawName) {
    if (isPhoneChatBusy()) {
      showToast("请稍候", "请等待当前私聊回复完成。", "warn");
      return;
    }
    const friendName = resolvePhoneFriendName(rawName);
    if (!friendName) {
      showToast("未找到偶像", "请输入初星学园偶像的姓名。", "warn");
      return;
    }
    if (friendName === state.idol) {
      showToast("已是担当", "担当偶像已在聊天列表中。", "warn");
      return;
    }

    ensureStateShape();
    const threadId = phoneFriendThreadId(friendName);
    if ((state.phoneChat.friends || []).includes(friendName)) {
      closePhoneAddFriendView();
      openPhoneThread(threadId);
      showToast("已是好友", "已打开与该偶像的聊天。", "info");
      return;
    }

    state.phoneChat.friends.push(friendName);
    state.phoneChat.messages[threadId] = [];
    saveState();
    closePhoneAddFriendView();
    openPhoneThread(threadId);
    sendPhoneAddFriendGreeting(friendName, threadId);
  }

  function submitPhoneAddFriend(event) {
    event.preventDefault();
    const input = document.getElementById("phoneAddFriendInput");
    confirmPhoneAddFriend(input?.value || "");
  }

  function openPhoneThread(threadId) {
    const thread = getPhoneThreadDefinition(threadId);
    if (!thread) return;

    ensureStateShape();
    state.phoneChat.activeView = "chat";
    state.phoneChat.activeThreadId = threadId;
    showPhoneLineAppShell();

    const title = document.getElementById("phoneChatTitle");
    const subtitle = document.getElementById("phoneChatSubtitle");
    const form = document.getElementById("phoneChatForm");
    const readonlyNote = document.getElementById("phoneChatReadonlyNote");
    const input = document.getElementById("phoneChatInput");

    if (title) title.textContent = thread.name;
    if (subtitle) subtitle.textContent = thread.subtitle || "";
    if (form) form.hidden = !thread.writable;
    if (readonlyNote) readonlyNote.hidden = Boolean(thread.writable);
    if (input) {
      input.value = "";
      input.disabled = !thread.writable || isPhoneChatBusy();
    }

    setElementHidden("phoneLineListView", true);
    setElementHidden("phoneLineAddFriendView", true);
    setElementHidden("phoneLineChatView", false);
    renderPhoneChatMessages(threadId);
    renderPhoneChatList();
    setPhoneChatComposerEnabled(thread.writable && !isPhoneChatBusy());
    if (state.activeStoryNode?.type === "phonechat" && pendingAiRequestId) {
      state.phoneChat.isAwaitingReply = true;
      setPhoneChatTyping(true);
      setPhoneChatComposerEnabled(false);
    }
    if (thread.writable && !isPhoneChatBusy()) input?.focus();
  }

  function appendPhoneChatMessage(threadId, sender, text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return false;

    ensureStateShape();
    if (!Array.isArray(state.phoneChat.messages[threadId])) {
      state.phoneChat.messages[threadId] = [];
    }

    state.phoneChat.messages[threadId].push({
      id: phoneChatMessageId(),
      sender,
      text: trimmed,
      time: formatPhoneClock(),
      read: sender === "producer"
    });
    return true;
  }

  function submitPhoneChatMessage(event) {
    event.preventDefault();
    const threadId = state.phoneChat?.activeThreadId;
    const thread = getPhoneThreadDefinition(threadId);
    if (!thread?.writable) return;

    if (isPhoneChatBusy()) {
      showToast("请稍候", "上一条消息还在回复中。", "warn");
      return;
    }

    const input = document.getElementById("phoneChatInput");
    const text = input?.value || "";
    if (!appendPhoneChatMessage(threadId, "producer", text)) return;

    if (input) input.value = "";
    renderPhoneChatMessages(threadId);
    renderPhoneChatList();
    saveState();
    sendPhoneChatToHost(text, threadId);
  }

  function renderPhoneApp() {
    renderPhoneStatusBar();
    if (state.phoneChat.activeView === "home") {
      showPhoneHomeView();
      return;
    }
    showPhoneLineAppShell();
    if (state.phoneChat.activeView === "add_friend") {
      openPhoneAddFriendView();
      return;
    }
    if (state.phoneChat.activeView === "chat" && state.phoneChat.activeThreadId) {
      openPhoneThread(state.phoneChat.activeThreadId);
      return;
    }
    showPhoneListView();
  }

  function openPhoneOverlay() {
    if (!state.idol) {
      showToast("尚未选择担当", "请先选择担当偶像后再打开手机。", "warn");
      return;
    }
    ensureStateShape();
    renderPhoneApp();
    setElementHidden("phoneOverlay", false);
  }

  function closePhoneOverlay() {
    showPhoneHomeView();
    setElementHidden("phoneOverlay", true);
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

  function openCompanionOverlay() {
    document.getElementById("companionPhaseBadge").textContent = getPhase();
    document.getElementById("companionTopicTextarea").value = "";
    setElementHidden("companionOverlay", false);
    document.getElementById("companionTopicTextarea").focus();
  }

  function closeCompanionOverlay() {
    setElementHidden("companionOverlay", true);
  }

  function confirmCompanionTopic(topic) {
    const companionTopic = String(topic || "").trim();
    if (!companionTopic) {
      showToast("还没有内容", "输入这次想与担当交流的话题或互动后再开始。", "warn");
      return;
    }
    closeCompanionOverlay();
    settleAction("companion", null, { companionTopic });
  }

  function submitCompanionTopic() {
    confirmCompanionTopic(document.getElementById("companionTopicTextarea").value);
  }

  const imeComposingInputs = {};

  function bindImeSafeTextInput(inputId, onSubmit) {
    const input = document.getElementById(inputId);
    if (!input || input.dataset.imeBound === "true") return;
    input.dataset.imeBound = "true";
    input.addEventListener("compositionstart", () => {
      imeComposingInputs[inputId] = true;
    });
    input.addEventListener("compositionend", () => {
      imeComposingInputs[inputId] = false;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      runAfterImeCommit(inputId, onSubmit);
    });
  }

  function runAfterImeCommit(inputId, callback) {
    const input = document.getElementById(inputId);
    if (!input) {
      callback();
      return;
    }
    const run = () => callback();
    if (imeComposingInputs[inputId]) {
      input.addEventListener("compositionend", run, { once: true });
      return;
    }
    run();
  }

  function readTextInputValue(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return "";
    return String(input.value || "").trim();
  }

  function openIntimacyOverlay() {
    if (!isIntimacyUnlocked()) {
      showToast("尚未解锁", `信赖值达到 ${INTIMACY_UNLOCK_TRUST} 后解锁亲密行动。`, "warn");
      return;
    }
    document.getElementById("intimacyPhaseBadge").textContent = getPhase();
    const note = document.getElementById("intimacyModeNote");
    if (note) {
      note.textContent = `当前信赖 ${state.trust}。普通亲密已解锁；NSFW 亲密需信赖 ${INTIMACY_NSFW_UNLOCK_TRUST}。`;
    }
    const nsfwButton = document.getElementById("intimacyNsfwBtn");
    const nsfwBadge = document.getElementById("intimacyNsfwBadge");
    const nsfwReady = isIntimacyNsfwUnlocked();
    if (nsfwButton) {
      nsfwButton.disabled = !nsfwReady;
      nsfwButton.title = nsfwReady ? "NSFW 亲密占位入口" : `信赖值达到 ${INTIMACY_NSFW_UNLOCK_TRUST} 后解锁`;
    }
    if (nsfwBadge) {
      nsfwBadge.textContent = nsfwReady ? "VN多轮" : "信赖100解锁";
      nsfwBadge.classList.toggle("is-ready", nsfwReady);
      nsfwBadge.classList.toggle("is-locked", !nsfwReady);
    }
    setElementHidden("intimacyOverlay", false);
  }

  function closeIntimacyOverlay() {
    setElementHidden("intimacyOverlay", true);
  }

  function confirmIntimacyMode(mode) {
    if (mode === "nsfw") {
      if (!isIntimacyNsfwUnlocked()) {
        showToast("尚未解锁", `信赖值达到 ${INTIMACY_NSFW_UNLOCK_TRUST} 后解锁 NSFW 亲密。`, "warn");
        return;
      }
      closeIntimacyOverlay();
      settleAction("intimacy", null, { intimacyMode: "nsfw" });
      return;
    }
    closeIntimacyOverlay();
    settleAction("intimacy", null, { intimacyMode: "normal" });
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
    runAfterImeCommit("outingCustomInput", () => {
      confirmOutingDestination(readTextInputValue("outingCustomInput"));
    });
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
    if (state.activeStoryNode?.type === "phonechat") {
      state.phoneChat.isAwaitingReply = true;
      state.phoneChat.pendingRequestId = requestId;
      setPhoneChatTyping(true);
      setPhoneChatComposerEnabled(false);
      saveState();
      if (sendPhoneChatPromptToHost(prompt, requestId)) return;
      state.phoneChat.isAwaitingReply = false;
      state.phoneChat.pendingRequestId = "";
      pendingAiRequestId = "";
      setPhoneChatTyping(false);
      setPhoneChatComposerEnabled(true);
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制私聊提示词后手动发送。");
      return;
    }
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
    setVnControlsEnabled(enabled);
  }

  function setVnControlsEnabled(enabled) {
    ["vnBtnRegen", "vnBtnEdit", "vnBtnAuto", "vnBtnSkip"].forEach((id) => {
      const button = document.getElementById(id);
      if (button) button.disabled = !enabled;
    });
  }

  function buildChoiceContinuationDisplayStory(intro, chosenLine, reply) {
    return [chosenLine, reply].filter(Boolean).join("\n\n");
  }

  function buildChoicePendingDisplayStory(intro, chosenLine) {
    return [
      chosenLine,
      "<narration>正在等待 SillyTavern 生成偶像的回应，请稍候...</narration>"
    ].filter(Boolean).join("\n\n");
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
    
    const loadText = isChoiceResolutionMode()
      ? "正在重新生成偶像的反应..."
      : "正在重新生成剧情...";

    const storyEl = document.getElementById("eventStory");
    if (storyEl) {
      if (isChoiceResolutionMode()) {
        const intro = state.lastStory || "";
        const chosenLine = `▶ 制作人的选择：${state.selectedChoiceText || ""} (${state.selectedChoiceRating || ""})`;
        storyEl.innerHTML = `${formatStoryText(intro + "\n\n" + chosenLine)}<br><br><span id="eventReactionLoading" style="opacity:0.6;">(正在重新生成偶像的反应...)</span>`;
      } else {
        storyEl.textContent = loadText;
      }
    }
    
    // 同步 VN 播放器显示为重新生成中的加载状态
    openEventOverlay(state.lastEventTitle, "正在重新生成...", loadText);

    if (isChoicePromptMode()) {
      if (requestHostPromptSend(state.lastPrompt, requestId)) {
        showToast("正在重新生成选项", "已重新发送完整选项提示词，等待 SillyTavern 回复。", "info");
        return;
      }
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制或编辑完整选项提示词后手动发送。");
      showToast("提示词已准备", "重新生成选项需要发送完整提示词。", "warn");
      return;
    }
    
    if (isSillyTavernHost()) {
      console.log('[Hatsu Produce] 正在发送 regenerate 消息到宿主端...', requestId);
      window.parent.postMessage({
        source: "hatsuboshi-produce",
        type: "regenerate",
        requestId
      }, "*");
      showToast("正在重新生成", "已向 SillyTavern 发送重新生成请求。", "info");
    } else {
      console.warn('[Hatsu Produce] 检测到未连接宿主，无法重新生成。');
      showToast("未连接酒馆", "当前页面未连接 SillyTavern，无法触发重新生成。", "warn");
    }
  }

  function openEventOverlay(title, result, story) {
    if (typeof closeVnLogView === "function") closeVnLogView();
    if (typeof closeVnDebugView === "function") closeVnDebugView();
    state.lastEventTitle = title || "行动事件";
    state.lastEventResult = result || "本次行动已经完成结算。";
    state.lastEventStory = story || state.lastStory || "本次行动已经完成。";
    saveState();
    
    // 1. 填充古典面板（用于 LOG 切换查看）
    const titleEl = document.getElementById("eventTitle");
    if (titleEl) titleEl.textContent = title || "行动事件";
    const phaseEl = document.getElementById("eventPhaseBadge");
    if (phaseEl) phaseEl.textContent = getPhase();
    const resultEl = document.getElementById("eventResult");
    if (resultEl) resultEl.textContent = result || "本次行动已经完成结算。";
    const storyEl = document.getElementById("eventStory");
    if (storyEl) storyEl.innerHTML = formatStoryText(story || state.lastStory || "本次行动已经完成。");

    const choicesEl = document.getElementById("eventChoices");
    if (choicesEl) {
      choicesEl.innerHTML = "";
      setElementHidden("eventChoices", true);
    }
    const vnChoicesOverlay = document.getElementById("vnChoicesOverlay");
    if (vnChoicesOverlay) vnChoicesOverlay.style.display = "none";
    const vnChoicesContainer = document.getElementById("vnChoicesContainer");
    if (vnChoicesContainer) vnChoicesContainer.innerHTML = "";
    
    if (pendingAiRequestId) {
      setEventActionsEnabled(false, true);
    } else {
      setEventActionsEnabled(true, false);
    }

    // 同步 VN 控制按钮的可点击状态
    setVnControlsEnabled(!pendingAiRequestId);

    const eventOverlay = document.getElementById("eventOverlay");
    const isAlreadyOpen = eventOverlay && !eventOverlay.hidden;

    const initContent = () => {
      setElementHidden("eventOverlay", false);
      if (isFreeModeActive()) updateFreeModeHeader();
      
      // 2. 判断当前是否为加载状态
      const isLoading = pendingAiRequestId || story.includes("等待角色卡") || story.includes("等待 AI") || story.includes("等待 SillyTavern") || story.includes("正在重新生成");
      aiBridgeDebug.lastOverlay = {
        at: Date.now(),
        title: title || "行动事件",
        result: result || "",
        storyLength: String(story || "").length,
        isLoading: Boolean(isLoading),
        pendingAiRequestId,
        eventMode: state.eventMode,
        choiceStep: state.choiceStep
      };
      refreshVnDebugView();
      
      if (isLoading) {
        // 如果正在加载，直接显示一行静态文本，并禁用 VN 对话框点击动作
        const slides = [{ type: "narration", speaker: "", text: story }];
        initVisualNovelPlayer(slides);
        completeVnSlideText();
        const dialogueBox = document.getElementById("vnDialogueBox");
        if (dialogueBox) dialogueBox.onclick = null;
      } else {
        // 解析流式生成/已完成的剧本并启动 VN 对话播放
        const slides = buildVnSlidesFromStory(story);
        const isResume = (isChoiceResolutionMode() || !!state.selectedChoiceText);
        initVisualNovelPlayer(slides, isResume);
      }
    };

    if (isAlreadyOpen) {
      initContent();
    } else {
      triggerWipeTransition(initContent);
    }
  }

  function skipPendingOpening() {
    markAffinityViewed(0);
    state.affinity.openingComplete = true;
    state.activeStoryNode = null;
    pendingAiRequestId = "";
  }

  // ==========================================
  // Galgame Visual Novel Player State & Logic
  // ==========================================
  let vnSlides = [];
  let vnCurrentIndex = 0;
  let vnTypewriterTimer = 0;
  let vnIsTyping = false;
  let vnIsAuto = false;
  let vnAutoTimer = 0;
  let vnSpeed = 25; // Typewriter speed (ms/char)
  let vnAutoDelay = 1800; // Auto play delay after text finished
  let vnCurrentText = "";

  function parseNovelSlides(text) {
    if (!text) return [];
    
    // 清除初星开始/结束标记
    let cleanText = text
      .replace(/[【\[]\s*初星正文开始\s*[】\]]/g, "")
      .replace(/[【\[]\s*初星正文结束\s*[】\]][\s\S]*$/g, "")
      .trim();

    const slides = [];
    const xmlRegex = /<(dialogue|narration)(?:\s+char="([^"]+)")?>([\s\S]*?)<\/\1>/gi;
    let match;
    let lastIndex = 0;
    let hasXmlTags = false;
    
    // Helper to parse plain text segments using the same paragraph-splitting logic
    const parseFallbackParagraphs = (str) => {
      const paragraphs = str
        .split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean);

      for (const p of paragraphs) {
        if (p.startsWith("▶") || p.startsWith("?")) {
          slides.push({ type: "narration", speaker: "", text: p });
          continue;
        }
        
        const speakerMatch = p.match(/^([^：:「“"'\s]{1,10})\s*[：:]\s*([\s\S]+)$/);
        if (speakerMatch) {
          const speaker = speakerMatch[1].trim();
          const content = speakerMatch[2].trim();
          slides.push({ type: "dialogue", speaker, text: content });
        } else if (p.startsWith("“") || p.startsWith("「") || p.startsWith('"') || p.startsWith("'")) {
          slides.push({ type: "dialogue", speaker: state.idol || "偶像", text: p });
        } else {
          slides.push({ type: "narration", speaker: "", text: p });
        }
      }
    };

    while ((match = xmlRegex.exec(cleanText)) !== null) {
      hasXmlTags = true;
      // Parse any raw text that appears before this XML tag
      const rawTextBefore = cleanText.slice(lastIndex, match.index).trim();
      if (rawTextBefore) {
        parseFallbackParagraphs(rawTextBefore);
      }
      
      const type = match[1].toLowerCase();
      const speaker = match[2] || "";
      const content = match[3].trim();
      if (content) {
        slides.push({ type, speaker, text: content });
      }
      lastIndex = xmlRegex.lastIndex;
    }

    if (hasXmlTags) {
      // Parse any remaining raw text that appears after the last XML tag
      const rawTextAfter = cleanText.slice(lastIndex).trim();
      if (rawTextAfter) {
        parseFallbackParagraphs(rawTextAfter);
      }
      return slides;
    }

    // Fallback: entire text is treated as plain text paragraphs
    parseFallbackParagraphs(cleanText);
    return slides;
  }

  function buildVnSlidesFromStory(story) {
    const parsed = parseNovelSlides(story);
    if (parsed.length) return parsed;
    const clean = cleanReplyText(String(story || "").trim());
    if (!clean) return [];
    return [{ type: "narration", speaker: "", text: clean }];
  }

  function getSceneBackground() {
    const node = state.activeStoryNode;
    if (node) {
      if (node.type === "firstLivePre" || node.type === "firstLivePost") {
        return "./assets/scenes/campus.png";
      }
      if (node.type === "affinity") {
        return "./assets/scenes/campus.png";
      }
    }

    const context = state.pendingActionContext || (state.log && state.log[0]);
    if (context) {
      const action = context.rawAction || context.action;
      const attr = context.rawAttribute || context.attribute;
      
      if (action === "lesson") {
        return "./assets/scenes/Class.png";
      }
      if (action === "training") {
        if (attr === "Vo") return "./assets/scenes/vo_class.png";
        if (attr === "Da") return "./assets/scenes/da_class.png";
        if (attr === "Vi") return "./assets/scenes/vi_class.png";
      }
      if (action === "rest") {
        return "./assets/scenes/rest.png";
      }
      if (action === "outing") {
        return "./assets/scenes/campus.png";
      }
      if (action === "companion" || action === "intimacy") {
        return "./assets/scenes/rest.png";
      }
      if (action === "map_location") {
        const actionContext = context.actionContext || state.pendingActionContext?.actionContext || {};
        return getMapLocationSceneBackground(actionContext);
      }
    }
    return "./assets/scenes/campus.png";
  }

  function initVisualNovelPlayer(slides, isResume = false) {
    vnSlides = slides || [];
    vnCurrentIndex = 0;
    vnIsTyping = false;
    stopVnAuto();

    if (isResume) {
      const choiceIdx = vnSlides.findIndex(slide => slide.text && (slide.text.includes("制作人的选择") || slide.text.includes("▶ 制作人的选择")));
      if (choiceIdx !== -1) {
        vnCurrentIndex = choiceIdx;
      }
    }
    
    // 切换背景
    const bgUrl = getSceneBackground();
    const backdropEl = document.getElementById("vnBackdrop");
    if (backdropEl) {
      backdropEl.style.backgroundImage = `linear-gradient(180deg, rgba(18, 18, 24, 0.08) 0%, transparent 42%, rgba(18, 18, 24, 0.22) 100%), url('${bgUrl}')`;
    }
    
    // 初始化显示层
    document.getElementById("vnContainer").style.display = "flex";
    document.getElementById("vnClassicPanel").style.display = "none";
    document.getElementById("vnChoicesOverlay").style.display = "none";
    
    const dialogueBox = document.getElementById("vnDialogueBox");
    if (dialogueBox) {
      dialogueBox.onclick = null;
      dialogueBox.onclick = (e) => {
        if (e.target.closest(".vn-controls") || e.target.closest(".vn-btn")) {
          return;
        }
        handleVnBoxClick();
      };
    }
    
    renderVnSlide(vnCurrentIndex);
  }

  function handleVnBoxClick() {
    if (vnIsTyping) {
      completeVnSlideText();
    } else {
      advanceVnSlide();
    }
  }

  function renderVnSlide(index) {
    if (vnTypewriterTimer) {
      clearInterval(vnTypewriterTimer);
      vnTypewriterTimer = 0;
    }
    if (vnAutoTimer) {
      clearTimeout(vnAutoTimer);
      vnAutoTimer = 0;
    }

    vnCurrentIndex = index;
    
    if (index >= vnSlides.length) {
      handleVnSlidesEnd();
      return;
    }
    
    const slide = vnSlides[index];
    const nameplateEl = document.getElementById("vnNameplate");
    const textEl = document.getElementById("vnText");
    const standeeEl = document.getElementById("vnStandee");
    
    // 1. 设置名字框和立绘显示
    if (slide.type === "narration" || !slide.speaker) {
      nameplateEl.style.display = "none";
      if (standeeEl) {
        standeeEl.classList.remove("active");
        standeeEl.classList.add("fade-out");
        setTimeout(() => {
          if (standeeEl.classList.contains("fade-out")) {
            standeeEl.style.display = "none";
          }
        }, 350);
      }
    } else {
      nameplateEl.style.display = "block";
      nameplateEl.textContent = slide.speaker;
      
      // 决定主题色
      let themeColor = "#7e57c2";
      const isProducer = slide.speaker === "制作人" || slide.speaker === "P" || (state.producer && slide.speaker === state.producer.name);
      const speakerCanonical = canonicalIdolName(slide.speaker);
      
      if (isProducer) {
        themeColor = "#5c6bc0"; // 制作人专属蓝色
      } else if (idols[speakerCanonical]) {
        themeColor = idols[speakerCanonical].theme;
      }
      nameplateEl.style.setProperty("--speaker-theme-color", themeColor);
      
      // 2. 加载发言者立绘并置于中央
      if (standeeEl) {
        let standeeSrc = "";
        if (isProducer) {
          standeeSrc = "./assets/novel-standees/producer.png";
        } else if (idols[speakerCanonical] && idols[speakerCanonical].background) {
          const baseName = idols[speakerCanonical].background.split("/").pop();
          standeeSrc = `./assets/novel-standees/${baseName}`;
        }
        
        if (standeeSrc) {
          standeeEl.src = standeeSrc;
          standeeEl.style.display = "block";
          setTimeout(() => {
            standeeEl.classList.remove("fade-out");
            standeeEl.classList.add("active");
          }, 20);
        } else {
          standeeEl.classList.remove("active");
          standeeEl.classList.add("fade-out");
          setTimeout(() => {
            if (standeeEl.classList.contains("fade-out")) {
              standeeEl.style.display = "none";
            }
          }, 350);
        }
      }
    }

    // 3. 启动打字机动画
    vnCurrentText = formatStoryText(slide.text);
    textEl.innerHTML = "";
    vnIsTyping = true;
    
    let totalLength = vnCurrentText.length;
    let step = 0;
    
    vnTypewriterTimer = setInterval(() => {
      step += 2;
      if (step >= totalLength) {
        clearInterval(vnTypewriterTimer);
        vnTypewriterTimer = 0;
        textEl.innerHTML = vnCurrentText;
        vnIsTyping = false;
        if (vnIsAuto) {
          scheduleVnAutoAdvance();
        }
      } else {
        let sliceStr = vnCurrentText.slice(0, step);
        const openTags = (sliceStr.match(/<[a-zA-Z1-6]+/g) || []).length;
        const closeTags = (sliceStr.match(/<\/[a-zA-Z1-6]+/g) || []).length;
        
        if (openTags > closeTags) {
          const nextClose = vnCurrentText.indexOf(">", step);
          if (nextClose !== -1) {
            step = nextClose + 1;
            sliceStr = vnCurrentText.slice(0, step);
          }
        }
        textEl.innerHTML = sliceStr;
      }
    }, vnSpeed);
  }

  function completeVnSlideText() {
    if (vnTypewriterTimer) {
      clearInterval(vnTypewriterTimer);
      vnTypewriterTimer = 0;
    }
    const textEl = document.getElementById("vnText");
    if (textEl) {
      textEl.innerHTML = vnCurrentText;
    }
    vnIsTyping = false;
    if (vnIsAuto) {
      scheduleVnAutoAdvance();
    }
  }

  function advanceVnSlide() {
    if (vnCurrentIndex < vnSlides.length - 1) {
      renderVnSlide(vnCurrentIndex + 1);
    } else {
      handleVnSlidesEnd();
    }
  }

  function handleVnSlidesEnd() {
    stopVnAuto();
    
    const hasOptionChoices = isChoicePromptMode() && state.pendingOptionTexts && state.pendingOptionTexts.length === 4;
    const showMapReturnOnly = isMapLocationExploreActive()
      && state.eventMode === "none"
      && !isFreeModeTravelAllowed()
      && !pendingAiRequestId;
    const hasMapLocationControls = isMapLocationExploreActive() && (
      hasOptionChoices
      || showMapReturnOnly
      || (isChoicePromptMode() && !pendingAiRequestId && state.pendingOptionTexts.length === 0)
    );
    
    if (hasOptionChoices || hasMapLocationControls) {
      showVnChoicesOverlay();
    } else {
      const choiceOverlay = document.getElementById("vnChoicesOverlay");
      if (choiceOverlay) choiceOverlay.style.display = "none";
      const choiceContainer = document.getElementById("vnChoicesContainer");
      if (choiceContainer) choiceContainer.innerHTML = "";

      const textEl = document.getElementById("vnText");
      if (textEl) {
        textEl.innerHTML = "<strong>[ 本次事件已播放完毕，点击对话框以继续 ]</strong>";
      }
      
      const nameplateEl = document.getElementById("vnNameplate");
      if (nameplateEl) nameplateEl.style.display = "none";
      
      const dialogueBox = document.getElementById("vnDialogueBox");
      if (dialogueBox) {
        dialogueBox.onclick = null;
        dialogueBox.onclick = (event) => {
          if (event.target.closest(".vn-controls") || event.target.closest(".vn-btn")) {
            return;
          }
          const confirmBtn = document.getElementById("eventConfirmBtn");
          if (confirmBtn && !confirmBtn.disabled) {
            confirmBtn.click();
          } else {
            closeEventOverlay();
          }
        };
      }
    }
  }

  function closeVnChoicesOverlay() {
    const overlay = document.getElementById("vnChoicesOverlay");
    if (overlay) overlay.style.display = "none";
    hideVnCustomChoicePanel();
  }

  function hideVnCustomChoicePanel() {
    const panel = document.getElementById("vnCustomChoicePanel");
    const container = document.getElementById("vnChoicesContainer");
    const title = document.getElementById("vnChoicesTitle");
    const input = document.getElementById("vnCustomChoiceInput");
    if (panel) panel.hidden = true;
    if (container) container.hidden = false;
    if (title) title.hidden = false;
    if (input) input.value = "";
  }

  function showVnCustomChoicePanel() {
    const panel = document.getElementById("vnCustomChoicePanel");
    const container = document.getElementById("vnChoicesContainer");
    const title = document.getElementById("vnChoicesTitle");
    const input = document.getElementById("vnCustomChoiceInput");
    if (panel) panel.hidden = false;
    if (container) container.hidden = true;
    if (title) title.hidden = true;
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function settleNsfwIntimacyStats() {
    const delta = { stamina: 38, stress: -10 };
    Object.entries(delta).forEach(([key, value]) => {
      const max = 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });
    refreshAffinityUnlocks();
    advanceRound();
    rollSpCandidates();
    const actionName = nsfwIntimacyActionTitle();
    const resultSummary = `${formatDelta(delta)}，【NSFW亲密·结束】`;
    state.log.unshift({
      day: state.day,
      round: state.round,
      phase: getPhase(),
      action: actionName,
      result: resultSummary
    });
    state.log = state.log.slice(0, 24);
    return delta;
  }

  function requestNsfwIntimacyAiRound(producerAction, prompt, debugLine) {
    if (!state.pendingActionContext) return;
    const chosenLine = `<narration>▶ 制作人：${producerAction}</narration>`;
    state.pendingOptionTexts = [];
    state.eventMode = "choice_prompt";
    state.choiceStep = 1;
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    state.lastPrompt = prompt;
    state.lastDebug = debugLine;
    state.lastStory = state.lastStory ? `${state.lastStory}\n\n${chosenLine}` : chosenLine;
    saveState();
    render();
    closeVnChoicesOverlay();
    setElementHidden("eventChoices", true);
    const actionsEl = document.getElementById("eventActions");
    if (actionsEl) actionsEl.style.display = "grid";
    const confirm = document.getElementById("eventConfirmBtn");
    if (confirm) {
      confirm.disabled = true;
      confirm.textContent = "正在生成中...";
    }
    const pendingStory = buildChoicePendingDisplayStory(state.lastStory, chosenLine);
    openEventOverlay(nsfwIntimacyActionTitle(), "正在等待 SillyTavern 角色回复", pendingStory);
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制提示词发送获取后续。");
    }
  }

  function handleNsfwIntimacyPresetChoice(index) {
    const chosenOptionText = state.pendingOptionTexts[index] || "选择该选项";
    requestNsfwIntimacyAiRound(
      chosenOptionText,
      buildNsfwIntimacyContinuePrompt(chosenOptionText),
      `NSFW 亲密继续：已选择“${chosenOptionText}”，等待 AI 生成下一段剧情与 4 个选项。`
    );
  }

  function handleNsfwIntimacyCustomChoice(rawText) {
    const producerAction = String(rawText || "").trim();
    if (!producerAction) {
      showToast("还没有内容", "请输入自定义行动或台词。", "warn");
      return;
    }
    requestNsfwIntimacyAiRound(
      producerAction,
      buildNsfwIntimacyContinuePrompt(producerAction),
      `NSFW 亲密继续：已发送自定义行动“${producerAction}”，等待 AI 生成下一段剧情与 4 个选项。`
    );
  }

  function handleVnCustomChoiceSubmit() {
    const customText = document.getElementById("vnCustomChoiceInput")?.value || "";
    if (isNsfwIntimacyActive()) {
      handleNsfwIntimacyCustomChoice(customText);
      return;
    }
    if (isMapLocationExploreActive() && isChoicePromptMode()) {
      handleMapLocationCustomChoice(customText);
      return;
    }
    showToast("当前不可用", "此处暂不支持自定义输入。", "warn");
  }

  function handleNsfwIntimacyEndChoice() {
    if (!state.pendingActionContext) return;
    closeVnChoicesOverlay();
    settleNsfwIntimacyStats();
    const producerAction = "（结束本次亲密互动）";
    const chosenLine = `<narration>▶ 制作人选择结束本次 NSFW 亲密互动</narration>`;
    state.selectedChoiceText = "结束亲密";
    state.selectedChoiceRating = "【NSFW亲密·结束】";
    state.eventMode = "choice_resolution";
    state.choiceStep = 2;
    state.pendingOptionTexts = [];
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    const prompt = buildNsfwIntimacyClosingPrompt();
    state.lastPrompt = prompt;
    state.lastDebug = "NSFW 亲密收尾：玩家已选择结束，等待 AI 生成收尾剧情。";
    state.lastStory = state.lastStory ? `${state.lastStory}\n\n${chosenLine}` : chosenLine;
    saveState();
    render();
    setElementHidden("eventChoices", true);
    const actionsEl = document.getElementById("eventActions");
    if (actionsEl) actionsEl.style.display = "grid";
    const confirm = document.getElementById("eventConfirmBtn");
    if (confirm) {
      confirm.disabled = true;
      confirm.textContent = "正在生成收尾...";
    }
    const pendingStory = buildChoicePendingDisplayStory(state.lastStory, chosenLine);
    openEventOverlay(nsfwIntimacyActionTitle(), "正在生成收尾剧情...", pendingStory);
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制提示词发送获取收尾。");
    }
  }

  function appendMapLocationControlButtons(container) {
    const backBtn = document.createElement("button");
    backBtn.className = "vn-choice-btn vn-choice-btn-map-back";
    backBtn.type = "button";
    backBtn.textContent = "返回地图";
    backBtn.onclick = () => handleMapLocationReturn();
    container.appendChild(backBtn);

    const directBackBtn = document.createElement("button");
    directBackBtn.className = "vn-choice-btn vn-choice-btn-map-back vn-choice-btn-map-back-direct";
    directBackBtn.type = "button";
    directBackBtn.textContent = "直接返回";
    directBackBtn.onclick = () => returnToFreeModeMap({ cancelled: true });
    container.appendChild(directBackBtn);
  }

  function showVnChoicesOverlay() {
    const overlay = document.getElementById("vnChoicesOverlay");
    const container = document.getElementById("vnChoicesContainer");
    if (!overlay || !container) return;

    hideVnCustomChoicePanel();
    container.innerHTML = "";
    const nsfwMode = isNsfwIntimacyActive();
    const hasOptionChoices = isChoicePromptMode() && state.pendingOptionTexts?.length === 4;
    const showMapReturnOnly = isMapLocationExploreActive()
      && state.eventMode === "none"
      && !isFreeModeTravelAllowed()
      && !pendingAiRequestId;
    const titleEl = document.getElementById("vnChoicesTitle");
    if (titleEl) {
      titleEl.textContent = nsfwMode ? "选择下一步（可自定义或结束）" : "请做出你的选择";
      titleEl.hidden = false;
    }

    state.pendingOptionTexts.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.className = "vn-choice-btn";
      btn.type = "button";
      const optionMinutes = isMapLocationExploreActive() && hasOptionChoices
        ? resolveMapOptionMinutes(state.pendingOptionMinutes?.[index])
        : null;
      btn.textContent = optionMinutes ? `${optText}（约${optionMinutes}分）` : optText;
      btn.onclick = () => {
        if (nsfwMode) {
          handleNsfwIntimacyPresetChoice(index);
          return;
        }
        closeVnChoicesOverlay();
        handleChoiceSelection(index);
      };
      container.appendChild(btn);
    });

    if (isMapLocationExploreActive() && (hasOptionChoices || showMapReturnOnly || (isChoicePromptMode() && !pendingAiRequestId))) {
      appendMapLocationControlButtons(container);
    }

    if (nsfwMode || (isMapLocationExploreActive() && hasOptionChoices)) {
      const customBtn = document.createElement("button");
      customBtn.className = "vn-choice-btn vn-choice-btn-custom";
      customBtn.type = "button";
      customBtn.textContent = "自定义输入";
      customBtn.onclick = () => showVnCustomChoicePanel();
      container.appendChild(customBtn);
    }

    if (nsfwMode) {
      const endBtn = document.createElement("button");
      endBtn.className = "vn-choice-btn vn-choice-btn-end";
      endBtn.type = "button";
      endBtn.textContent = "结束";
      endBtn.onclick = () => handleNsfwIntimacyEndChoice();
      container.appendChild(endBtn);
    }

    overlay.style.display = "flex";
  }

  function scheduleVnAutoAdvance() {
    if (vnAutoTimer) clearTimeout(vnAutoTimer);
    vnAutoTimer = setTimeout(() => {
      advanceVnSlide();
    }, vnAutoDelay);
  }

  function toggleVnAuto() {
    vnIsAuto = !vnIsAuto;
    const btn = document.getElementById("vnBtnAuto");
    if (btn) {
      if (vnIsAuto) {
        btn.classList.add("active");
        btn.textContent = "自动中 (AUTO)";
        if (!vnIsTyping) {
          scheduleVnAutoAdvance();
        }
      } else {
        btn.classList.remove("active");
        btn.textContent = "自动 (AUTO)";
      }
    }
  }

  function stopVnAuto() {
    vnIsAuto = false;
    const btn = document.getElementById("vnBtnAuto");
    if (btn) {
      btn.classList.remove("active");
      btn.textContent = "自动 (AUTO)";
    }
    if (vnAutoTimer) {
      clearTimeout(vnAutoTimer);
      vnAutoTimer = 0;
    }
  }

  function skipAllVnDialogue() {
    stopVnAuto();
    if (vnSlides.length > 0) {
      renderVnSlide(vnSlides.length - 1);
      completeVnSlideText();
      handleVnSlidesEnd();
    }
  }

  function escapeDebugHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDebugTime(value) {
    if (!value) return "--";
    try {
      return new Date(value).toLocaleTimeString("zh-CN", { hour12: false });
    } catch {
      return "--";
    }
  }

  function summarizeDebugText(value, maxLength = 360) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  function detectSelectedReplySource(text, rawText, renderedText, source) {
    const decode = (value) => String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "")
      .trim();
    const selected = String(source || "").trim();
    if (selected && selected === decode(rawText)) return "rawText";
    if (selected && selected === decode(text)) return "text";
    if (selected && selected === decode(renderedText)) return "renderedText";
    return selected ? "mixed/unknown" : "none";
  }

  function recordAiReplyDebug({ text = "", rawText = "", renderedText = "", requestId = "", isFinal = true, source = "", accepted = true } = {}) {
    const payload = source ? extractChoicePayload(source) : { story: "", options: [], optionMinutes: [] };
    aiBridgeDebug.lastReply = {
      at: Date.now(),
      requestId,
      pendingAiRequestId,
      accepted,
      isFinal: Boolean(isFinal),
      eventMode: state.eventMode,
      choiceStep: state.choiceStep,
      action: state.pendingActionContext?.action || "",
      textLength: String(text || "").length,
      rawTextLength: String(rawText || "").length,
      renderedTextLength: String(renderedText || "").length,
      selectedSource: detectSelectedReplySource(text, rawText, renderedText, source),
      selectedLength: String(source || "").length,
      hasStartMarker: /[【\[]\s*初星正文开始\s*[】\]]/.test(source),
      hasEndMarker: /[【\[]\s*初星正文结束\s*[】\]]/.test(source),
      hasStoryTag: /<story[\s>]/i.test(source),
      storyLength: payload.story.length,
      optionCount: payload.options.length,
      options: payload.options.slice(0, 4),
      optionMinutes: payload.optionMinutes,
      sample: summarizeDebugText(source)
    };
    aiBridgeDebug.lastMessage = accepted ? "已收到匹配当前 requestId 的 AI 回复" : "收到 AI 回复，但 requestId 不匹配，已拒收";
    refreshVnDebugView();
  }

  function recordAiAckDebug(requestId, accepted, retry, isFinal = true) {
    aiBridgeDebug.lastAck = {
      at: Date.now(),
      requestId,
      accepted: Boolean(accepted),
      retry: Boolean(retry),
      isFinal: Boolean(isFinal),
      pendingAiRequestId,
      eventMode: state.eventMode,
      choiceStep: state.choiceStep
    };
    aiBridgeDebug.lastMessage = `ACK ${accepted ? "accepted" : "rejected"}${retry ? " / retry" : ""}${isFinal ? " / final" : " / partial"}`;
    refreshVnDebugView();
  }

  function classifyPromptKind(promptText = "") {
    const text = String(promptText || "");
    if (!text.trim()) return "empty";
    if (text.includes("小手机私聊")) return "phone_chat";
    if (text.includes("小手机添加好友问候")) return "phone_greeting";
    if (text.includes("NSFW 亲密")) {
      if (text.includes("收尾")) return "nsfw_intimacy_close";
      if (text.includes("继续") || text.includes("承接上文")) return "nsfw_intimacy_continue";
      return "nsfw_intimacy_open";
    }
    if (text.includes("互动分支结算与收尾")) return "choice_phase2";
    if (text.includes("互动分支设计")) return "choice_phase1";
    if (text.includes("羁绊") && text.includes("最终收束")) return "bond_final";
    if (text.includes("羁绊") && text.includes("第二轮选择")) return "bond_phase2";
    if (text.includes("羁绊") && text.includes("第一轮选择")) return "bond_phase1";
    if (text.includes("好感度0担当开场")) return "opening";
    if (text.includes("First Live")) return "first_live";
    if (text.includes("行动已经由前端结算")) return "produce_action";
    if (text.includes("自由闲聊")) return "free_chat";
    if (text.includes("偶像互动")) return "idol_interaction";
    if (text.includes("初星育成系统")) return "produce_other";
    return "unknown";
  }

  function extractPromptHeader(promptText = "") {
    const text = String(promptText || "");
    const bracketMatch = text.match(/^\[(初星育成系统[^\]]+)\]/);
    if (bracketMatch) return bracketMatch[1];
    return summarizeDebugText(text, 56);
  }

  function expectedPromptKindForState() {
    if (state.phoneChat?.isAwaitingReply) {
      return state.activeStoryNode?.mode === "greeting" ? "phone_greeting" : "phone_chat";
    }
    if (state.activeStoryNode?.type === "phonechat") {
      return state.activeStoryNode?.mode === "greeting" ? "phone_greeting" : "phone_chat";
    }
    if (state.activeStoryNode?.type === "affinity" && Number(state.activeStoryNode?.threshold) === 0) {
      return "opening";
    }
    if (state.eventMode === "choice_resolution") {
      if (state.pendingActionContext?.action === "bond") {
        return state.bondChoiceRound === 2 ? "bond_final" : "bond_phase2";
      }
      if (isNsfwIntimacyActive()) return "nsfw_intimacy_close";
      return "choice_phase2";
    }
    if (isChoicePromptMode()) {
      if (state.pendingActionContext?.action === "bond") {
        return state.bondChoiceRound === 2 ? "bond_phase2" : "bond_phase1";
      }
      if (isNsfwIntimacyActive()) return "nsfw_intimacy_continue";
      return "choice_phase1";
    }
    if (state.pendingActionContext?.action) {
      const action = state.pendingActionContext.action;
      if (["outing", "companion", "intimacy"].includes(action)) return "choice_phase1";
      if (action === "map_location") return "produce_other";
      return "produce_action";
    }
    if (state.activeStoryNode?.type === "affinity") return "produce_other";
    return "";
  }

  function recordDebugOpeningDispatch(source = "unknown") {
    aiBridgeDebug.openingDispatches.unshift({
      at: Date.now(),
      source: String(source || "unknown"),
      openingComplete: Boolean(state.affinity.openingComplete),
      idol: state.idol || "",
      requestId: pendingAiRequestId || state.pendingAiRequestId || ""
    });
    if (aiBridgeDebug.openingDispatches.length > 6) {
      aiBridgeDebug.openingDispatches.length = 6;
    }
    refreshVnDebugView();
  }

  function recordDebugPromptDispatch(promptText, requestId) {
    const entry = {
      at: Date.now(),
      requestId: String(requestId || ""),
      promptKind: classifyPromptKind(promptText),
      promptHeader: extractPromptHeader(promptText),
      promptLength: String(promptText || "").length,
      eventMode: state.eventMode,
      choiceStep: state.choiceStep,
      action: state.pendingActionContext?.action || "",
      activeNode: state.activeStoryNode?.type || "",
      activeNodeMode: state.activeStoryNode?.mode || "",
      openingComplete: Boolean(state.affinity.openingComplete),
      hostSource: hostPromptSendSource,
      day: state.day,
      round: state.round,
      selectedChoice: state.selectedChoiceText || ""
    };
    aiBridgeDebug.lastPromptRequest = entry;
    aiBridgeDebug.promptHistory.unshift(entry);
    if (aiBridgeDebug.promptHistory.length > 8) {
      aiBridgeDebug.promptHistory.length = 8;
    }
    refreshVnDebugView();
  }

  function buildDebugDiagnoses() {
    const issues = [];
    const prompt = aiBridgeDebug.lastPromptRequest || {};
    const reply = aiBridgeDebug.lastReply || {};
    const sentKind = prompt.promptKind || classifyPromptKind(state.lastPrompt);
    const expectedKind = expectedPromptKindForState();

    if (aiBridgeDebug.openingDispatches.length >= 2) {
      const sources = aiBridgeDebug.openingDispatches.map((item) => item.source).join("；");
      issues.push({
        level: "error",
        message: `本页已触发 ${aiBridgeDebug.openingDispatches.length} 次担当开场（${sources}）。若包含“ST角色卡自动绑定”和“签署合约”，就会出现开场播两次。`
      });
    }

    if (state.idol && !state.affinity.openingComplete) {
      issues.push({
        level: "warn",
        message: "openingComplete 仍为 false。此时任何训练/上课/休息都会被拦截并再次触发 threshold 0 开场剧情。"
      });
    }

    if (isSillyTavernHost() && !hostStateReady) {
      issues.push({
        level: "warn",
        message: "已嵌入 SillyTavern，但聊天存档 scope 尚未就绪。切换聊天后状态可能回滚，导致 openingComplete 或轮次异常。"
      });
    }

    if (pendingAiRequestId && state.pendingAiRequestId && pendingAiRequestId !== state.pendingAiRequestId) {
      issues.push({
        level: "warn",
        message: `pending 请求 ID 不一致（内存 ${pendingAiRequestId} / 存档 ${state.pendingAiRequestId}）。可能导致回复路由失败。`
      });
    }

    if (reply.accepted === false) {
      issues.push({
        level: "error",
        message: `最近一次 AI 回复 requestId 不匹配（收到 ${reply.requestId || "--"}，当前 pending ${pendingAiRequestId || "--"}），回复已被丢弃。`
      });
    }

    if (expectedKind && sentKind && expectedKind !== sentKind) {
      issues.push({
        level: "error",
        message: `提示词类型与当前状态不一致：期望 ${expectedKind}，最近发送 ${sentKind}。常见于选项选完后 Phase2 未发出，或 ST 仍按上一轮上下文生成。`
      });
    }

    if (state.eventMode === "choice_resolution" && state.choiceStep === 2 && sentKind === "choice_phase1") {
      issues.push({
        level: "error",
        message: "当前处于选项结算阶段 (choiceStep=2)，但最近发送仍是 Phase1“互动分支设计”提示词。这会导致 AI 继续出选项而不是写反应。"
      });
    }

    if (state.eventMode === "choice_prompt" && pendingAiRequestId && reply.optionCount === 4 && reply.requestId === prompt.requestId) {
      issues.push({
        level: "info",
        message: "Phase1 选项已收到，等待玩家选择。选完后应发送 choice_phase2。"
      });
    }

    if (state.phoneChat?.isAwaitingReply && !["phone_chat", "phone_greeting"].includes(sentKind)) {
      issues.push({
        level: "error",
        message: `私聊正在等待回复，但最近发送的提示词类型是 ${sentKind || "unknown"}，不是 phone_chat / phone_greeting。`
      });
    }

    if (state.phoneChat?.retryAvailable && state.lastPrompt) {
      issues.push({
        level: "warn",
        message: "私聊处于可重试状态。重试会复用 state.lastPrompt，不会按最新聊天记录重建；若对话已前进，可能造成重复回复。"
      });
    }

    if (reply.optionCount === 4 && state.eventMode === "choice_resolution") {
      issues.push({
        level: "warn",
        message: "当前应进入选项结算，但最近回复仍像 Phase1（含 4 个 option）。可能是 Phase1 回复迟到，或模型没有按 Phase2 提示词写作。"
      });
    }

    if (!issues.length) {
      issues.push({
        level: "ok",
        message: "未发现已知异常模式。若仍有问题，请对照下方“提示词历史”和 SillyTavern 聊天楼层核对 requestId。"
      });
    }

    return issues;
  }

  function buildDebugDiagnosisHtml() {
    const issues = buildDebugDiagnoses();
    return `
      <section class="vn-debug-card vn-debug-card-full vn-debug-diagnosis">
        <h3>自动诊断</h3>
        <ul class="vn-debug-alert-list">
          ${issues.map((issue) => `
            <li class="vn-debug-alert vn-debug-alert-${issue.level}">
              ${escapeDebugHtml(issue.message)}
            </li>
          `).join("")}
        </ul>
      </section>
    `;
  }

  function buildDebugHistoryHtml() {
    const history = aiBridgeDebug.promptHistory || [];
    if (!history.length) {
      return `<section class="vn-debug-card vn-debug-card-full"><h3>提示词历史</h3><p class="vn-debug-empty">尚无发送记录。</p></section>`;
    }
    return `
      <section class="vn-debug-card vn-debug-card-full">
        <h3>提示词历史（最近 ${history.length} 次）</h3>
        <div class="vn-debug-history">
          ${history.map((entry, index) => `
            <article class="vn-debug-history-item">
              <div class="vn-debug-history-head">
                <strong>${index === 0 ? "最近" : `#${index + 1}`} · ${escapeDebugHtml(entry.promptKind || "unknown")}</strong>
                <span>${escapeDebugHtml(formatDebugTime(entry.at))}</span>
              </div>
              <dl>${buildDebugRows([
                ["header", entry.promptHeader || "--"],
                ["requestId", entry.requestId || "--"],
                ["mode/step", `${entry.eventMode || "none"} / ${entry.choiceStep ?? 0}`],
                ["day/round", `第 ${entry.day ?? "?"} 天 · 第 ${entry.round ?? "?"} 轮`],
                ["openingComplete", entry.openingComplete ? "true" : "false"],
                ["来源", entry.hostSource || "general"],
                ["选中项", entry.selectedChoice || "无"]
              ])}</dl>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function buildDebugOpeningHtml() {
    const dispatches = aiBridgeDebug.openingDispatches || [];
    if (!dispatches.length) {
      return "";
    }
    return `
      <section class="vn-debug-card vn-debug-card-full">
        <h3>担当开场触发记录</h3>
        <div class="vn-debug-history">
          ${dispatches.map((entry, index) => `
            <article class="vn-debug-history-item">
              <div class="vn-debug-history-head">
                <strong>${index === 0 ? "最近" : `#${index + 1}`} · ${escapeDebugHtml(entry.source || "unknown")}</strong>
                <span>${escapeDebugHtml(formatDebugTime(entry.at))}</span>
              </div>
              <dl>${buildDebugRows([
                ["idol", entry.idol || "--"],
                ["openingComplete", entry.openingComplete ? "true" : "false"],
                ["requestId", entry.requestId || "--"]
              ])}</dl>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function buildDebugRows(rows) {
    return rows.map(([key, value]) => `<dt>${escapeDebugHtml(key)}</dt><dd>${escapeDebugHtml(value)}</dd>`).join("");
  }

  function buildVnDebugHtml() {
    const prompt = aiBridgeDebug.lastPromptRequest || {};
    const reply = aiBridgeDebug.lastReply || {};
    const ack = aiBridgeDebug.lastAck || {};
    const overlay = aiBridgeDebug.lastOverlay || {};
    const sentKind = prompt.promptKind || classifyPromptKind(state.lastPrompt);
    const expectedKind = expectedPromptKindForState();
    const canShowGame = Boolean(state.idol) && Boolean(state.affinity.openingComplete);
    const liveStory = String(state.lastEventStory || "");
    const liveLoading = Boolean(pendingAiRequestId)
      || liveStory.includes("等待角色卡")
      || liveStory.includes("等待 AI")
      || liveStory.includes("等待 SillyTavern")
      || liveStory.includes("正在重新生成");
    const phoneThread = getPhoneThreadDefinition(state.phoneChat?.activeThreadId);
    return `
      ${buildDebugDiagnosisHtml()}
      <div class="vn-debug-grid">
        <section class="vn-debug-card">
          <h3>育成门禁</h3>
          <dl>${buildDebugRows([
            ["担当", state.idol || "未选择"],
            ["openingComplete", state.affinity.openingComplete ? "true" : "false"],
            ["主界面可见", canShowGame ? "是" : "否"],
            ["activeNode", state.activeStoryNode?.type || "无"],
            ["threshold", state.activeStoryNode?.threshold ?? "无"],
            ["node.ready", state.activeStoryNode?.ready === undefined ? "无" : state.activeStoryNode.ready ? "true" : "false"],
            ["day / round", `第 ${state.day} 天 · ${roundLabel()}`]
          ])}</dl>
        </section>
        <section class="vn-debug-card">
          <h3>桥接环境</h3>
          <dl>${buildDebugRows([
            ["运行环境", isSillyTavernHost() ? "SillyTavern iframe" : "独立页面"],
            ["hostStateReady", hostStateReady ? "true" : "false"],
            ["saveScope", activeHostSaveScope || "无"],
            ["绑定角色卡", state.boundCharacter?.name || "未绑定"],
            ["最后消息", aiBridgeDebug.lastMessage]
          ])}</dl>
        </section>
        <section class="vn-debug-card">
          <h3>当前状态</h3>
          <dl>${buildDebugRows([
            ["pending", pendingAiRequestId || "无"],
            ["state.pending", state.pendingAiRequestId || "无"],
            ["eventMode", state.eventMode || "none"],
            ["choiceStep", state.choiceStep ?? ""],
            ["action", state.pendingActionContext?.action || "无"],
            ["期望 prompt", expectedKind || "无"],
            ["最近 prompt", sentKind || "无"],
            ["VN loading", liveLoading ? "是" : "否"]
          ])}</dl>
        </section>
        <section class="vn-debug-card">
          <h3>私聊状态</h3>
          <dl>${buildDebugRows([
            ["view", state.phoneChat?.activeView || "home"],
            ["thread", phoneThread?.name || state.phoneChat?.activeThreadId || "无"],
            ["awaiting", state.phoneChat?.isAwaitingReply ? "是" : "否"],
            ["retryAvailable", state.phoneChat?.retryAvailable ? "是" : "否"],
            ["pendingRequestId", state.phoneChat?.pendingRequestId || "无"],
            ["thread消息数", String(getPhoneThreadMessages(state.phoneChat?.activeThreadId || "idol").length)]
          ])}</dl>
        </section>
        <section class="vn-debug-card">
          <h3>最近发送</h3>
          <dl>${buildDebugRows([
            ["时间", formatDebugTime(prompt.at)],
            ["requestId", prompt.requestId || "--"],
            ["类型", sentKind || "--"],
            ["header", prompt.promptHeader || "--"],
            ["prompt长度", prompt.promptLength ?? "--"],
            ["发送时 mode/step", `${prompt.eventMode || "--"} / ${prompt.choiceStep ?? "--"}`],
            ["发送时 opening", prompt.openingComplete === undefined ? "--" : prompt.openingComplete ? "true" : "false"],
            ["发送时行动", prompt.action || "--"]
          ])}</dl>
        </section>
        <section class="vn-debug-card">
          <h3>最近回复</h3>
          <dl>${buildDebugRows([
            ["时间", formatDebugTime(reply.at)],
            ["requestId", reply.requestId || "--"],
            ["是否接收", reply.accepted === undefined ? "--" : reply.accepted ? "是" : "否"],
            ["isFinal", reply.isFinal === undefined ? "--" : reply.isFinal ? "是" : "否"],
            ["选择来源", reply.selectedSource || "--"],
            ["text/raw/rendered", `${reply.textLength ?? "--"}/${reply.rawTextLength ?? "--"}/${reply.renderedTextLength ?? "--"}`],
            ["正文标记", reply.hasStartMarker ? "有开始" : "无开始"],
            ["结束标记", reply.hasEndMarker ? "有结束" : "无结束"],
            ["story标签", reply.hasStoryTag ? "有" : "无"],
            ["story长度", reply.storyLength ?? "--"],
            ["option数量", reply.optionCount ?? "--"],
            ["time标签", Array.isArray(reply.optionMinutes) ? reply.optionMinutes.map(v => v ?? "-").join(" / ") : "--"]
          ])}</dl>
          <pre class="vn-debug-pre">${escapeDebugHtml((reply.options || []).map((option, index) => `${index + 1}. ${option}`).join("\n") || "暂无 option")}</pre>
        </section>
        <section class="vn-debug-card">
          <h3>ACK / VN</h3>
          <dl>${buildDebugRows([
            ["ACK时间", formatDebugTime(ack.at)],
            ["ACK requestId", ack.requestId || "--"],
            ["accepted", ack.accepted === undefined ? "--" : ack.accepted ? "是" : "否"],
            ["retry", ack.retry === undefined ? "--" : ack.retry ? "是" : "否"],
            ["final", ack.isFinal === undefined ? "--" : ack.isFinal ? "是" : "否"],
            ["Overlay时间", formatDebugTime(overlay.at)],
            ["标题", overlay.title || state.lastEventTitle || "--"],
            ["结果", overlay.result || state.lastEventResult || "--"],
            ["Overlay loading", overlay.isLoading === undefined ? "--" : overlay.isLoading ? "是" : "否"],
            ["story长度", overlay.storyLength ?? liveStory.length]
          ])}</dl>
          <pre class="vn-debug-pre">${escapeDebugHtml(reply.sample || "暂无已选回复样本")}</pre>
        </section>
      </div>
      ${buildDebugOpeningHtml()}
      ${buildDebugHistoryHtml()}
    `;
  }

  function refreshVnDebugView() {
    const overlay = document.getElementById("vnDebugOverlay");
    const content = document.getElementById("vnDebugContent");
    if (!overlay || overlay.hidden || !content) return;
    content.innerHTML = buildVnDebugHtml();
  }

  function openVnDebugView() {
    const overlay = document.getElementById("vnDebugOverlay");
    const content = document.getElementById("vnDebugContent");
    if (!overlay || !content) return;
    content.innerHTML = buildVnDebugHtml();
    overlay.hidden = false;
  }

  function closeVnDebugView() {
    const overlay = document.getElementById("vnDebugOverlay");
    if (overlay) overlay.hidden = true;
  }
  function buildVnLogHtml() {
    const entries = [];
    if (vnSlides.length) {
      entries.push(...vnSlides.map((slide, index) => ({
        title: slide.speaker ? `${index + 1}. ${slide.speaker}` : `${index + 1}. 旁白`,
        text: slide.text || ""
      })));
    }
    (state.log || []).forEach((item) => {
      if (!item.aiReply) return;
      entries.push({
        title: `过往记录：第 ${item.day} 天 ${item.action || "事件"}`,
        text: item.aiReply
      });
    });
    if (!entries.length) {
      return `<div class="vn-log-empty">暂无对话记录。剧情显示后可以在这里回看文本。</div>`;
    }
    return entries.map((entry) => `
      <article class="vn-log-entry">
        <strong>${formatStoryText(entry.title)}</strong>
        <div class="vn-log-text">${formatStoryText(entry.text)}</div>
      </article>
    `).join("");
  }

  function openVnLogView() {
    const overlay = document.getElementById("vnLogOverlay");
    const content = document.getElementById("vnLogContent");
    if (!overlay || !content) return;
    content.innerHTML = buildVnLogHtml();
    overlay.hidden = false;
  }

  function closeVnLogView() {
    const overlay = document.getElementById("vnLogOverlay");
    if (overlay) overlay.hidden = true;
  }

  function triggerVnEditPrompt() {
    stopVnAuto();
    setElementHidden("eventOverlay", true);
    openAiPromptOverlay();
  }

  function closeEventOverlay() {
    stopVnAuto();
    if (vnTypewriterTimer) {
      clearInterval(vnTypewriterTimer);
      vnTypewriterTimer = 0;
    }
    if (isFreeModeActive() && (isMapLocationExploreActive() || state.freeMode?.activeLocationId)) {
      returnToFreeModeMap({ cancelled: !isChoiceResolutionMode() });
      return;
    }
    triggerWipeTransition(() => {
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
        const thresholdValue = Number(node.threshold);
        if (thresholdValue === 0) {
          markAffinityViewed(thresholdValue);
          state.affinity.openingComplete = true;
        } else if (REQUIRED_BOND_THRESHOLDS.includes(thresholdValue)) {
          completeBondEventDay(thresholdValue);
        } else {
          markAffinityViewed(thresholdValue);
        }
        if (state.activeStoryNode?.type === "affinity") state.activeStoryNode = null;
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
        completeFirstLivePostFlow();
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
    });
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

  function stripAiThinkingBlocks(value) {
    const thinkTags = "thinking|think|details|summary|sum|vars|analysis|planning|plan|konatan_planning|bginfo|bginfor|draft_notes|bginfor";
    const closedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*?<\\/\\1>", "gi");
    const unclosedRegex = new RegExp("<(" + thinkTags + ")\\b[^>]*>[\\s\\S]*$", "gi");

    return String(value || "")
      .replace(/^[\s\S]*?<!--\s*end_of_Subtext_think\s*-->/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(closedRegex, "")
      .replace(unclosedRegex, "");
  }

  function extractReplyCandidate(value) {
    const raw = String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "");

    const withoutThinking = stripAiThinkingBlocks(raw);

    // 使用【倒数匹配】查找最末尾的“初星正文开始”作为故事正文起点，彻底避开前置的样例与检查表干扰
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
      .replace(/<(?!dialogue|narration|\/dialogue|\/narration)\/?[a-zA-Z_][\w:-]*\b[^>]*>/gi, "")
      .replace(/\[\s*\{[\s\S]*?\}\s*\]\s*$/g, "")
      .replace(/^\s*\*{1,2}\s*/gm, "")
      .replace(/\s*\*{1,2}\s*$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function extractTaggedSummarySection(source, tagName) {
    const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i");
    const match = String(source || "").match(regex);
    return match ? cleanReplyText(match[1]) : "";
  }

  function extractDailySummary(source) {
    const raw = String(source || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "");
    const blockMatch = raw.match(/[【\[]\s*今日总结开始\s*[】\]]([\s\S]*?)[【\[]\s*今日总结结束\s*[】\]]/u);
    const block = blockMatch ? blockMatch[1] : raw;
    const intro = extractTaggedSummarySection(block, "summary_intro");
    const status = extractTaggedSummarySection(block, "summary_status");
    const producer = extractTaggedSummarySection(block, "summary_producer");
    const complete = Boolean(intro && status && producer);
    return {
      intro,
      status,
      producer,
      raw: block.trim(),
      complete
    };
  }

  function extractPhoneChatReply(source) {
    const raw = stripAiThinkingBlocks(String(source || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, ""));

    const strictMatches = [...raw.matchAll(/<初星私聊\s+from=["']([^"']+)["']\s*>([\s\S]*?)<\/初星私聊>/gi)];
    const looseMatches = [...raw.matchAll(/<初星私聊\s*>([\s\S]*?)<\/初星私聊>/gi)];

    let from = state.idol || "";
    let body = "";
    if (strictMatches.length) {
      const last = strictMatches[strictMatches.length - 1];
      from = canonicalIdolName(last[1].trim());
      body = last[2];
    } else if (looseMatches.length) {
      body = looseMatches[looseMatches.length - 1][1];
    } else {
      return { from, lines: [], complete: false };
    }

    const lines = String(body || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    return {
      from,
      lines,
      complete: lines.length > 0
    };
  }

  function extractChoicePayload(value) {
    let content = String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "");

    const startMatches = [...content.matchAll(/[【\[]\s*初星正文开始\s*[】\]]/g)];
    if (startMatches.length > 0) {
      const lastStartMatch = startMatches[startMatches.length - 1];
      content = content.slice(lastStartMatch.index + lastStartMatch[0].length);
      content = content.replace(/[【\[]\s*初星正文结束\s*[】\]][\s\S]*$/u, "");
    } else {
      const mainMatches = [...content.matchAll(/<maintext\b[^>]*>([\s\S]*)/gi)];
      if (mainMatches.length > 0) {
        content = mainMatches[mainMatches.length - 1][1].replace(/<\/maintext>[\s\S]*$/gi, "");
      }
    }

    const extractTaggedOption = (num) => {
      const regexes = [
        new RegExp(`<option_?${num}>([\\s\\S]*?)<\\/option_?${num}>`, "i"),
        new RegExp(`<option\\s+${num}>([\\s\\S]*?)<\\/option\\s+${num}>`, "i")
      ];
      for (const regex of regexes) {
        const match = content.match(regex);
        if (match?.[1]?.trim()) return match[1].trim();
      }
      return "";
    };

    const extractTaggedTime = (num) => {
      const regexes = [
        new RegExp(`<time_?${num}>([\\s\\S]*?)<\\/time_?${num}>`, "i"),
        new RegExp(`<time\\s+${num}>([\\s\\S]*?)<\\/time\\s+${num}>`, "i")
      ];
      for (const regex of regexes) {
        const match = content.match(regex);
        if (match?.[1]?.trim()) return match[1].trim();
      }
      return "";
    };

    let options = [1, 2, 3, 4].map(extractTaggedOption);
    const optionMinutes = [1, 2, 3, 4].map((num) => {
      const raw = extractTaggedTime(num);
      return raw ? parseMapOptionMinutes(raw) : null;
    });
    let story = content.match(/<story>([\s\S]*?)<\/story>/i)?.[1]?.trim() || "";

    if (options.every(Boolean) && !story) {
      const firstOptIndex = content.search(/<option/i);
      if (firstOptIndex !== -1) story = cleanReplyText(content.slice(0, firstOptIndex));
    }

    if (!options.every(Boolean)) {
      const quoteRegex = new RegExp("“[^”]{2,160}”|「[^」]{2,160}」|\"[^\"]{2,160}\"", "g");
      const quoteMatches = [...content.matchAll(quoteRegex)];
      if (quoteMatches.length >= 4) {
        const last4 = quoteMatches.slice(-4);
        options = last4.map((match) => match[0].trim());
        const firstChoiceIndex = last4[0].index ?? -1;
        if (!story && firstChoiceIndex >= 0) {
          story = cleanReplyText(content.slice(0, firstChoiceIndex));
        }
      }
    }

    return {
      story: cleanReplyText(story),
      options: options.map((option) => cleanReplyText(option)).filter(Boolean),
      optionMinutes
    };
  }

  function selectAiReplySource(text, rawText = "", renderedText = "") {
    const decodeSource = (value) => String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\u200b/g, "")
      .trim();
    const candidates = [rawText, text, renderedText]
      .map(decodeSource)
      .filter(Boolean);
    const pendingAction = state.pendingActionContext?.action;
    const expectsChoicePayload = isChoicePromptMode()
      || (state.eventMode === "choice_prompt" && ["outing", "companion", "intimacy", "bond", "map_location"].includes(pendingAction));

    if (expectsChoicePayload) {
      const completeChoiceSource = candidates.find((candidate) => {
        const payload = extractChoicePayload(candidate);
        return payload.story && payload.options.length === 4;
      });
      if (completeChoiceSource) return completeChoiceSource;
    }

    return candidates[0] || "";
  }
  function formatStoryText(text) {
    if (!text) return "";
    
    // Escape HTML first to prevent XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
      
    // Format escaped XML tags
    html = html.replace(/&lt;dialogue\s+char="([^"]+)"&gt;([\s\S]*?)&lt;\/dialogue&gt;/gi, (match, speaker, content) => {
      let cleanContent = content.trim();
      if ((cleanContent.startsWith("“") && cleanContent.endsWith("”")) || (cleanContent.startsWith('"') && cleanContent.endsWith('"')) || (cleanContent.startsWith('「') && cleanContent.endsWith('」'))) {
        return `<strong>${speaker}</strong>：${cleanContent}`;
      }
      return `<strong>${speaker}</strong>：“${cleanContent}”`;
    });
    
    html = html.replace(/&lt;narration&gt;([\s\S]*?)&lt;\/narration&gt;/gi, (match, content) => {
      return content.trim();
    });

    // 1. Headers: ###, ##, #
    html = html.replace(/^###\s+(.*)$/gm, '<span class="story-h4">$1</span>');
    html = html.replace(/^##\s+(.*)$/gm, '<span class="story-h3">$1</span>');
    html = html.replace(/^#\s+(.*)$/gm, '<span class="story-h2">$1</span>');

    // 2. Bold: **text**
    html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');

    // 3. Italics (Action/Monologue): *text*
    html = html.replace(/\*([^\*]+)\*/g, '<span class="story-action">$1</span>');

    // 4. Quotes (Dialogue): Wrap "..." or “...” or 「...」
    html = html.replace(/(“[^”]*”|「[^」]*」|"[^"]*")/g, '<span class="story-dialogue">$1</span>');

    // 5. Choice highlight: ▶ 制作人的选择：...
    html = html.replace(/(▶\s*制作人的选择：.*)/g, '<strong style="color:var(--violet)">$1</strong>');
    
    return html;
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
    pendingAiRequestId = "";
    state.eventMode = "none";
    state.choiceStep = 0;
    if (!state.pendingActionContext) {
      saveState();
      setEventActionsEnabled(true, false);
      return;
    }
    const { action, attribute, actionContext } = state.pendingActionContext;

    if (action === "map_location") {
      if (actionContext?.isReturn) {
        state.lastStory = reply;
        pendingAiRequestId = "";
        state.eventMode = "none";
        state.choiceStep = 0;
        state.pendingOptionTexts = [];
        state.selectedChoiceText = "";
        state.selectedChoiceRating = "";
        saveState();
        const locationName = actionContext.locationName
          || getWorldMapLocation(actionContext.locationId)?.name
          || "地图";
        openEventOverlay(`${locationName} · 离开`, "离开完成，点击返回地图", reply);
        const confirm = document.getElementById("eventConfirmBtn");
        if (confirm) {
          confirm.disabled = false;
          confirm.textContent = "返回地图";
        }
        return;
      }
      return;
    }
    
    const delta = {};
    if (action === "outing") {
      delta.stamina = 38;
      delta.stress = -5;
      delta.trust = 5; // 降级时的默认外出信赖值
    } else if (action === "companion") {
      delta.stamina = 18;
      delta.stress = -2;
      delta.trust = 15; // 降级时的默认交流信赖值
    } else if (action === "intimacy") {
      delta.stamina = 38;
      delta.stress = -10;
      if (!isNsfwIntimacyActive()) {
        delta.trust = INTIMACY_NORMAL_TRUST_GAIN;
      }
    }
    
    Object.entries(delta).forEach(([key, value]) => {
      const max = ["Vo", "Da", "Vi"].includes(key) ? Number(state.cap?.[key] || 999) : 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });
    
    refreshAffinityUnlocks();
    advanceRound();
    rollSpCandidates();
    
    const actionName = actionLabel(action, attribute);
    const resultText = formatDelta(delta);
    const locationText = action === "outing" && actionContext.destination ? `外出地点：${actionContext.destination}` : "";
    const companionText = action === "companion" && actionContext.companionTopic ? `交流主题：${actionContext.companionTopic}` : "";
    const resultSummary = [locationText, companionText, resultText].filter(Boolean).join("，");
    
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);
    
    state.lastStory = reply;
    state.pendingOptionTexts = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
    clearIntimacyRoute();
    if (state.pendingActionContext?.actionContext?.isDailyFinalAction) {
      const parsedSummary = extractDailySummary(reply);
      state.dailySummary = {
        day: state.day,
        intro: parsedSummary.intro,
        status: parsedSummary.status,
        producer: parsedSummary.producer,
        raw: parsedSummary.raw,
        complete: parsedSummary.complete
      };
    }
    if (state.log[0]) {
      state.log[0].aiReply = reply;
    }
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
    if (isNsfwIntimacyActive()) {
      handleNsfwIntimacyPresetChoice(index);
      return;
    }

    const buttons = document.querySelectorAll("#eventChoices .choice-button");
    buttons.forEach(btn => btn.disabled = true);
    
    const { action, attribute, actionContext } = state.pendingActionContext;
    if (action === "bond") {
      const threshold = state.pendingActionContext.threshold;
      const chosenOptionText = state.pendingOptionTexts[index] || "选择该选项";
      const chosenLine = `<narration>▶ 制作人的选择：${chosenOptionText}</narration>`;
      const requestId = createRequestId();
      pendingAiRequestId = requestId;
      state.selectedChoiceText = chosenOptionText;
      state.selectedChoiceRating = "羁绊选择";

      if (state.bondChoiceRound === 1) {
        state.bondFirstChoiceText = chosenOptionText;
        state.bondChoiceRound = 2;
        state.eventMode = "choice_prompt";
        state.choiceStep = 1;
        state.pendingOptionTexts = [];
        state.lastPrompt = buildSpecialBondPhase2Prompt(threshold, chosenOptionText);
        state.lastStory = `${state.lastStory}\n\n${chosenLine}`;
        state.lastDebug = `${specialBondLabel()}：第一轮已选择“${chosenOptionText}”，等待第二轮选项。`;
      } else {
        state.eventMode = "choice_resolution";
        state.choiceStep = 2;
        state.lastPrompt = buildSpecialBondFinalPrompt(threshold, state.bondFirstChoiceText, chosenOptionText);
        state.lastDebug = `${specialBondLabel()}：第二轮已选择“${chosenOptionText}”，等待最终收束。`;
      }

      saveState();
      render();
      const pendingStory = buildChoicePendingDisplayStory(state.lastStory, chosenLine);
      openEventOverlay(`好感度 ${threshold}：${affinityNodes[threshold]?.title || "羁绊事件"}`, "已发送羁绊事件后续请求，等待 AI 回复", pendingStory);
      if (!requestHostPromptSend(state.lastPrompt, requestId)) {
        openAiPromptOverlay("当前页面未连接 SillyTavern。请编辑或复制羁绊事件提示词后手动发送。");
      }
      return;
    }

    if (action === "map_location") {
      handleMapLocationChoiceSelection(index);
      return;
    }

    const trustGain = action === "intimacy"
      ? INTIMACY_NORMAL_TRUST_GAIN
      : (state.pendingChoiceRewards[index] ?? 5);
    const chosenOptionText = state.pendingOptionTexts[index] || "选择该选项";
    const ratingName = action === "intimacy"
      ? "【普通亲密】"
      : (action === "outing" && trustGain === 10) || (action === "companion" && trustGain === 20)
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
    } else if (action === "intimacy") {
      delta.stamina = 38;
      delta.stress = -10;
      delta.trust = INTIMACY_NORMAL_TRUST_GAIN;
    }
    
    Object.entries(delta).forEach(([key, value]) => {
      const max = ["Vo", "Da", "Vi"].includes(key) ? Number(state.cap?.[key] || 999) : 100;
      state[key] = clamp((state[key] || 0) + value, 0, max);
    });
    
    // 2. 推进回合与日常刷新
    refreshAffinityUnlocks();
    advanceRound();
    rollSpCandidates();
    
    // 3. 记录日志
    const actionName = actionLabel(action, attribute);
    const resultText = formatDelta(delta);
    const locationText = action === "outing" && actionContext.destination ? `外出地点：${actionContext.destination}` : "";
    const companionText = action === "companion" && actionContext.companionTopic ? `交流主题：${actionContext.companionTopic}` : "";
    const resultSummary = [locationText, companionText, resultText, ratingName].filter(Boolean).join("，");
    state.log.unshift({ day: state.day, round: state.round, phase: getPhase(), action: actionName, result: resultSummary });
    state.log = state.log.slice(0, 24);
    
    // 4. 更新选择记录状态并发起第二阶段反应生成
    state.selectedChoiceText = chosenOptionText;
    state.selectedChoiceRating = ratingName;
    state.eventMode = "choice_resolution";
    state.choiceStep = 2;
    const requestId = createRequestId();
    pendingAiRequestId = requestId;
    
    const prompt = buildChoicePhase2Prompt(action, attribute, chosenOptionText, trustGain, actionContext);
    state.lastPrompt = prompt;
    state.lastDebug = action === "intimacy"
      ? `第二阶段剧情生成：已选择“${chosenOptionText}”，普通亲密固定结算体力 +38、压力 -10、信赖 +${INTIMACY_NORMAL_TRUST_GAIN}（${ratingName}）。等待 AI 生成偶像反应。`
      : `第二阶段剧情生成：已选择“${chosenOptionText}”，获得信赖度 +${trustGain}（${ratingName}）。等待 AI 生成偶像反应。`;
    
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
    
    const chosenLine = `<narration>▶ 制作人的选择：${chosenOptionText} (${ratingName})</narration>`;
    const pendingStory = buildChoicePendingDisplayStory(state.lastStory, chosenLine);
    const storyEl = document.getElementById("eventStory");
    if (storyEl) {
      storyEl.innerHTML = formatStoryText(pendingStory);
    }
    openEventOverlay(actionName, "正在等待 SillyTavern 角色回复", pendingStory);
    
    if (!requestHostPromptSend(prompt, requestId)) {
      openAiPromptOverlay("当前页面未连接 SillyTavern。请复制提示词发送获取后续。");
    }
  }

  function applyAiReply(text, requestId = "", rawText = "", renderedText = "", isFinal = true, variableCommands = []) {
    aiBridgeDebug.lastVariableCommands = Array.isArray(variableCommands) ? variableCommands : [];
    const acceptedRequest = shouldAcceptAiReply(requestId, pendingAiRequestId);
    if (!acceptedRequest) {
      recordAiReplyDebug({ text, rawText, renderedText, requestId, isFinal, source: "", accepted: false });
      sendAiReplyAck(requestId, false, false);
      return;
    }
    // 普通剧情仍优先使用 rawText；选项剧情会优先使用能解析出完整 story + 四个 option 的候选文本。
    const source = selectAiReplySource(text, rawText, renderedText);
    recordAiReplyDebug({ text, rawText, renderedText, requestId, isFinal, source, accepted: true });

    const phonePendingRequestId = String(state.phoneChat?.pendingRequestId || "");
    const shouldRouteToPhoneChat = state.activeStoryNode?.type === "phonechat"
      && state.phoneChat?.isAwaitingReply
      && Boolean(phonePendingRequestId)
      && requestId === phonePendingRequestId;
    if (shouldRouteToPhoneChat) {
      handlePhoneChatAiReply(source, requestId, isFinal);
      return;
    }

    const choiceFallbackPayload = (() => {
      if (state.eventMode !== "choice_prompt" || isChoicePromptMode()) return null;
      const pendingAction = state.pendingActionContext?.action;
      if (!["outing", "companion", "intimacy", "bond", "map_location"].includes(pendingAction)) return null;
      const payload = extractChoicePayload(source);
      return payload.story && payload.options.length === 4 ? payload : null;
    })();

    // ==========================================
    // 交互式选项第一阶段：提取剧情和选项标签
    // ==========================================
    if (isChoicePromptMode() || choiceFallbackPayload) {
      let choiceContent = source;
      let choicePayload = choiceFallbackPayload || extractChoicePayload(source);
      let [opt1, opt2, opt3, opt4] = choicePayload.options;
      let story = choicePayload.story;

      if ((!story || !opt1 || !opt2 || !opt3 || !opt4) && state.pendingActionContext?.action === "map_location") {
        const stripped = choiceContent
          .replace(/<option[\s\S]*$/i, "")
          .replace(/<time[\d_\s>][\s\S]*$/gi, "");
        if (!story) story = cleanReplyText(stripped);
      }

      // 进一步降级：如果仍然无法解析，尝试智能按行提取段尾双引号选项/编号选项
      if (!story || !opt1 || !opt2 || !opt3 || !opt4) {
        const startMatches = [...choiceContent.matchAll(/[【\[]\s*初星正文开始\s*[】\]]/g)];
        if (startMatches.length > 0) {
          const lastStartMatch = startMatches[startMatches.length - 1];
          choiceContent = choiceContent.slice(lastStartMatch.index + lastStartMatch[0].length);
          choiceContent = choiceContent.replace(/[【\[]\s*初星正文结束\s*[】\]][\s\S]*$/u, "");
        }
        const lines = choiceContent.split('\n').map(l => l.trim()).filter(Boolean);
        if (lines.length >= 5) {
          const last4 = lines.slice(-4);
          const isNumberedChoices = last4.every(line => {
            const hasNumberPrefix = /^[1-4\u2460-\u2463\uff11-\uff14\u4e00-\u56dbA-Da-d][\.\u3002\u3001、\-\s:]/.test(line) ||
                                    /^(选项|Option|分支)[\s1-4\u4e00-\u56dbA-Da-d]/.test(line);
            return hasNumberPrefix;
          });

          if (isNumberedChoices) {
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
        syncMapOptionMinutesFromPayload(extractChoicePayload(source));
        const nsfwMode = isNsfwIntimacyActive();
        const segmentStory = story;
        
        if (!isFinal) {
          const storyEl = document.getElementById("eventStory");
          if (storyEl) {
            storyEl.innerHTML = formatStoryText(segmentStory);
          }
          setEventActionsEnabled(false, true);
          sendAiReplyAck(requestId, true, false, false);
          return;
        }

        pendingAiRequestId = "";
        state.eventMode = "choice_prompt";
        state.choiceStep = 1;
        if (nsfwMode) {
          state.lastStory = state.lastStory
            ? `${state.lastStory}\n\n${segmentStory}`
            : segmentStory;
        } else if (state.pendingActionContext?.action === "bond" && state.bondChoiceRound === 2) {
          state.lastStory = `${state.lastStory}\n\n${segmentStory}`;
        } else {
          state.lastStory = segmentStory;
        }
        saveState();

        const actionName = currentChoiceActionTitle();
        openEventOverlay(actionName, "请做出你的选择", segmentStory);

        if (!nsfwMode && state.pendingActionContext?.action !== "map_location") {
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
        } else {
          setElementHidden("eventChoices", true);
        }

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
          storyEl.innerHTML = formatStoryText(cleanReplyText(choiceContent));
        }
        setEventActionsEnabled(false, true);
        sendAiReplyAck(requestId, true, false, false);
        return;
      }

      // 完结了但选项格式缺失，保留事件等待玩家重新生成
      console.warn("[Hatsu Choices] Choice prompt incomplete. Waiting for regeneration.");
      const reply = cleanReplyText(choiceContent);
      pendingAiRequestId = "";
      state.eventMode = "choice_prompt";
      state.choiceStep = 1;
      state.pendingOptionTexts = [];
      state.lastStory = reply || "选项生成不完整，请点击重新生成。";
      saveState();
      render();
      openEventOverlay(currentChoiceActionTitle(), "选项生成不完整，请点击重新生成", state.lastStory);
      sendAiReplyAck(requestId, true, false);
      return;
    }

    // ==========================================
    // 交互式选项第二阶段：AI 反应与收尾剧情
    // ==========================================
    if (isChoiceResolutionMode()) {
      const reply = extractReplyText([source]);
      
      const storyEl = document.getElementById("eventStory");
      const isMapReturn = state.pendingActionContext?.action === "map_location"
        && Boolean(state.pendingActionContext?.actionContext?.isReturn);
      const locationName = state.pendingActionContext?.actionContext?.locationName
        || getWorldMapLocation(state.pendingActionContext?.actionContext?.locationId)?.name
        || "地图";
      const chosenLine = isMapReturn
        ? `<narration>▶ 制作人决定离开 ${locationName}，返回大地图。</narration>`
        : `<narration>▶ 制作人的选择：${state.selectedChoiceText || ""} (${state.selectedChoiceRating || ""})</narration>`;
      const displayStory = buildChoiceContinuationDisplayStory(state.lastStory, chosenLine, reply);
      if (storyEl && reply) {
        storyEl.innerHTML = formatStoryText(displayStory);
      }

      if (!isFinal) {
        setEventActionsEnabled(false, true);
        sendAiReplyAck(requestId, true, false, false);
        return;
      }

      const isDailyFinalAction = Boolean(state.pendingActionContext?.actionContext?.isDailyFinalAction);
      if (isDailyFinalAction) {
        const parsedSummary = extractDailySummary(source);
        state.dailySummary = {
          day: state.day,
          intro: parsedSummary.intro,
          status: parsedSummary.status,
          producer: parsedSummary.producer,
          raw: parsedSummary.raw,
          complete: parsedSummary.complete
        };
      }

      pendingAiRequestId = "";
      state.lastStory = `${state.lastStory}\n\n${chosenLine}\n\n${reply}`;
      if (state.pendingActionContext?.action === "bond" && state.activeStoryNode?.type === "affinity") {
        state.activeStoryNode.ready = true;
        state.bondChoiceRound = 0;
        state.bondFirstChoiceText = "";
      }
      clearIntimacyRoute();
      if (state.log[0]) {
        state.log[0].aiReply = reply;
      }
      if (state.pendingActionContext?.action === "map_location") {
        if (!isMapReturn) {
          sendAiReplyAck(requestId, true, false);
          return;
        }
        pendingAiRequestId = "";
        state.eventMode = "none";
        state.choiceStep = 0;
        state.pendingOptionTexts = [];
        state.selectedChoiceText = "";
        state.selectedChoiceRating = "";
        state.lastStory = `${state.lastStory}\n\n${chosenLine}\n\n${reply}`;
        saveState();
        openEventOverlay(`${locationName} · 离开`, "离开完成，点击返回地图", displayStory);
        const confirm = document.getElementById("eventConfirmBtn");
        if (confirm) {
          confirm.disabled = false;
          confirm.textContent = "返回地图";
        }
        sendAiReplyAck(requestId, true, false);
        return;
      }
      state.eventMode = "none";
      state.choiceStep = 0;
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
      saveState();
      render();

      const actionName = currentChoiceActionTitle();
      openEventOverlay(actionName, "已收到 SillyTavern 角色回复", displayStory);
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
        storyEl.innerHTML = formatStoryText(reply);
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
      state.eventMode = "none";
      state.choiceStep = 0;
      state.pendingOptionTexts = [];
      state.selectedChoiceText = "";
      state.selectedChoiceRating = "";
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
    state.eventMode = "none";
    state.choiceStep = 0;
    state.pendingOptionTexts = [];
    state.selectedChoiceText = "";
    state.selectedChoiceRating = "";
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
    if (node?.type === "firstLivePost" && isLiveTheaterActive()) {
      deferredLivePostReply = { title, result: "已收到 SillyTavern 角色回复", story: reply };
      sendAiReplyAck(requestId, true, false);
      return;
    }
    openEventOverlay(title, "已收到 SillyTavern 角色回复", reply);
    sendAiReplyAck(requestId, true, false);
  }

  function sendAiReplyAck(requestId, accepted, retry, isFinal = true) {
    recordAiAckDebug(requestId, accepted, retry, isFinal);
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
          ["日程", "22 天育成，每天 3 次普通行动、1 次额外行动与 1 次总结轮次；20/40/60/80 羁绊事件会占用专属剧情日。"],
          ["普通行动", "上课、训练、休息。休息回复 30 体力。"],
          ["额外行动", "外出回复较多体力并增加信赖，交流增加更多信赖并回复少量体力；信赖 60 后可选择普通亲密，信赖 100 后解锁 NSFW 亲密。"],
          ["总结轮次", "完成四轮行动后进入。可查看今日总结，或通过左下角手机入口打开小手机，或进入下一天。"]
        ],
        "育成选项": [],
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
          ["第 13-21 天", "First Live 后期，数值门槛与角色矛盾共同推向考核。"],
          ["第 22 天", "最终日程固定为 First Live，不再进行普通行动。"]
        ],
        "轮次": [
          ["普通轮次", "每天第 1、2、3 轮，只显示上课、训练和休息。"],
          ["额外轮次", "每天第 4 轮，显示外出、交流与亲密；亲密需信赖 60，进入后可选择普通或 NSFW 模式。"],
          ["总结轮次", "每天第 5 轮，提供今日总结与进入下一天；小手机从左下角入口随时打开。"],
          ["防误操作", "体力危险时仍可选择休息，避免路线被单次失误锁死。"]
        ],
        "考核": [
          ["First Live", "第 22 天点击开始最终演出，由前端判定三项数值是否达标。"],
          ["好感度80", "好感度达到 80 后，下一天进入该偶像的路线后半羁绊事件。"],
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
          ["考核剧情", "第 22 天由最终状态进入 First Live 数值判定。"]
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

    if (activeModal === "system" && activeModalTab === "育成选项") {
      const optionsPanel = document.createElement("div");
      optionsPanel.className = "dev-panel-content";
      optionsPanel.style.display = "flex";
      optionsPanel.style.flexDirection = "column";
      optionsPanel.style.gap = "14px";
      optionsPanel.style.padding = "10px";
      optionsPanel.style.width = "100%";
      const skipLessonTrainingEnabled = isSkipLessonTrainingAiStoryEnabled();
      optionsPanel.innerHTML = `
        <style>
          .produce-option-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.05); }
          .produce-option-row:last-child { border-bottom: none; }
          .produce-option-label { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
          .produce-option-title { font-weight: bold; font-size: 15px; color: var(--ink); }
          .produce-option-desc { font-size: 12px; color: var(--soft-ink); line-height: 1.5; }
          .produce-option-toggle { padding: 8px 16px; font-size: 13px; font-weight: bold; border-radius: 8px; border: 2px solid rgba(0,0,0,0.1); background: #fff; color: var(--ink); cursor: pointer; transition: all 0.2s; white-space: nowrap; }
          .produce-option-toggle.active { background: var(--pink); color: #fff; border-color: var(--pink); }
        </style>
        <div class="produce-option-row">
          <div class="produce-option-label">
            <span class="produce-option-title">上课与训练跳过 AI 叙事</span>
            <span class="produce-option-desc">开启后，上课与训练仍会正常结算数值并推进轮次，但不再打开事件界面，也不会向 SillyTavern 发送叙事提示词。</span>
          </div>
          <button id="skipLessonTrainingAiToggleBtn" type="button" class="produce-option-toggle ${skipLessonTrainingEnabled ? "active" : ""}">${skipLessonTrainingEnabled ? "已开启" : "已关闭"}</button>
        </div>
      `;
      body.appendChild(optionsPanel);
      document.getElementById("skipLessonTrainingAiToggleBtn")?.addEventListener("click", () => {
        state.produceOptions.skipLessonTrainingAiStory = !isSkipLessonTrainingAiStoryEnabled();
        saveState();
        showToast(
          state.produceOptions.skipLessonTrainingAiStory ? "已开启" : "已关闭",
          state.produceOptions.skipLessonTrainingAiStory
            ? "上课与训练将直接结算并进入下一轮，不再等待 AI 叙事。"
            : "上课与训练恢复为正常 AI 叙事流程。",
          "info"
        );
        renderModal();
      });
      return;
    }

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
          <label for="modalProdGender">制作人性别</label>
          <input type="text" id="modalProdGender" value="${state.producer?.gender || ''}">
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
          gender: document.getElementById("modalProdGender").value.trim(),
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
          <input type="number" id="devInputDay" min="1" max="${FINAL_LIVE_DAY}" value="${state.day}">
          <label>日程轮次</label>
          <input type="number" id="devInputRound" min="1" max="${SUMMARY_ROUND}" value="${state.round}">
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
        <div class="dev-btn-group" style="margin-top: 0;">
          <button type="button" id="devOpenMapLayoutEditorBtn" class="dev-action-btn secondary">打开学园地图布局编辑</button>
        </div>
      `;
      
      body.appendChild(devPanel);
      
      document.getElementById("devApplyBtn").addEventListener("click", () => {
        state.day = clamp(parseInt(document.getElementById("devInputDay").value) || 1, 1, FINAL_LIVE_DAY);
        state.round = clamp(parseInt(document.getElementById("devInputRound").value) || 1, 1, SUMMARY_ROUND);
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

      document.getElementById("devOpenMapLayoutEditorBtn").addEventListener("click", () => {
        closeModal();
        openWorldMapLayoutEditor();
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
    if (button.dataset.action === "day_summary") {
      openDaySummaryOverlay();
      return;
    }
    if (button.dataset.action === "next_day") {
      enterNextDay();
      return;
    }
    if (button.dataset.action === "outing") {
      openOutingOverlay();
      return;
    }
    if (button.dataset.action === "companion") {
      openCompanionOverlay();
      return;
    }
    if (button.dataset.action === "intimacy") {
      openIntimacyOverlay();
      return;
    }
    if (button.dataset.action === "world_map") {
      enterFreeMode();
      return;
    }
    if (button.dataset.action === "bond") {
      const threshold = pendingAffinityActionThreshold();
      if (threshold) triggerAffinityStory(threshold);
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
      document.getElementById("prodGenderInput").value = state.producer?.gender || "";
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
    const gender = document.getElementById("prodGenderInput").value.trim();
    const personality = document.getElementById("prodPersonalityInput").value.trim();
    const style = document.getElementById("prodStyleInput").value.trim();
    const settings = document.getElementById("prodSettingsInput").value.trim();
    state.producer = { name, gender, personality, style, settings };

    triggerWipeTransition(() => {
      // Start produce game
      applyIdolPreset(selectedIdol, true);
      startOpeningStory("签署合约");
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

  // Galgame 播放器控制按钮事件绑定
  document.getElementById("vnBtnSkip").addEventListener("click", skipAllVnDialogue);
  document.getElementById("vnBtnLog").addEventListener("click", openVnLogView);
  document.getElementById("vnBtnDebug").addEventListener("click", openVnDebugView);
  document.getElementById("vnBtnAuto").addEventListener("click", toggleVnAuto);
  document.getElementById("vnBtnRegen").addEventListener("click", () => {
    stopVnAuto();
    triggerRegeneration();
  });
  document.getElementById("vnBtnEdit").addEventListener("click", triggerVnEditPrompt);
  document.getElementById("closeClassicPanelBtn").addEventListener("click", closeVnLogView);
  document.getElementById("vnLogCloseBtn").addEventListener("click", closeVnLogView);
  document.getElementById("vnDebugCloseBtn").addEventListener("click", closeVnDebugView);
  document.getElementById("vnDebugOverlay").addEventListener("click", (event) => {
    if (event.target.id === "vnDebugOverlay") closeVnDebugView();
  });
  document.getElementById("vnLogOverlay").addEventListener("click", (event) => {
    if (event.target.id === "vnLogOverlay") closeVnLogView();
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
  document.getElementById("daySummaryCloseBtn").addEventListener("click", closeDaySummaryOverlay);
  document.querySelector(".day-summary-tablet")?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  document.getElementById("daySummaryOverlay").addEventListener("click", (event) => {
    if (event.target.id === "daySummaryOverlay") closeDaySummaryOverlay();
  });
  document.getElementById("phoneLaunchBtn").addEventListener("click", openPhoneOverlay);
  document.getElementById("phoneCloseBtn").addEventListener("click", closePhoneOverlay);
  document.querySelector(".mini-phone-bezel")?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  document.getElementById("phoneOverlay").addEventListener("click", (event) => {
    if (event.target.id === "phoneOverlay") closePhoneOverlay();
  });
  document.getElementById("phoneChatBackBtn").addEventListener("click", showPhoneListView);
  document.getElementById("phoneLineTabHomeBtn").addEventListener("click", showPhoneHomeView);
  document.getElementById("phoneChatMenuBtn")?.addEventListener("click", openVnDebugView);
  document.getElementById("phoneNavBackBtn").addEventListener("click", phoneNavBack);
  document.getElementById("phoneNavHomeBtn").addEventListener("click", showPhoneHomeView);
  document.getElementById("phoneNavCloseBtn").addEventListener("click", closePhoneOverlay);
  document.getElementById("phoneHomeView").addEventListener("click", (event) => {
    const button = event.target.closest("[data-phone-app]");
    if (!button) return;
    launchPhoneApp(button.dataset.phoneApp);
  });
  document.getElementById("phoneDockApps").addEventListener("click", (event) => {
    const button = event.target.closest("[data-phone-app]");
    if (!button) return;
    launchPhoneApp(button.dataset.phoneApp);
  });
  document.getElementById("phoneAddFriendOpenBtn").addEventListener("click", openPhoneAddFriendView);
  document.getElementById("phoneAddFriendBackBtn").addEventListener("click", closePhoneAddFriendView);
  document.getElementById("phoneAddFriendForm").addEventListener("submit", submitPhoneAddFriend);
  document.getElementById("phoneAddFriendSuggestions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-friend-name]");
    if (!button) return;
    const input = document.getElementById("phoneAddFriendInput");
    if (input) input.value = button.dataset.friendName || "";
    confirmPhoneAddFriend(button.dataset.friendName || "");
  });
  document.getElementById("phoneChatRetryBtn").addEventListener("click", triggerPhoneChatRegeneration);
  document.getElementById("phoneChatMessages").addEventListener("click", (event) => {
    if (event.target.closest("[data-phone-retry]")) {
      event.preventDefault();
      triggerPhoneChatRegeneration();
    }
  });
  document.getElementById("phoneChatList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-thread-id]");
    if (!button) return;
    openPhoneThread(button.dataset.threadId);
  });
  document.getElementById("phoneChatForm").addEventListener("submit", submitPhoneChatMessage);
  document.getElementById("interactionModeSpecified").addEventListener("click", () => setInteractionMode("specified"));
  document.getElementById("interactionModeAi").addEventListener("click", () => setInteractionMode("ai"));
  document.getElementById("interactionCancelBtn").addEventListener("click", closeInteractionOverlay);
  document.getElementById("interactionSendBtn").addEventListener("click", submitIdolInteraction);
  document.getElementById("interactionOverlay").addEventListener("click", (event) => {
    if (event.target.id === "interactionOverlay") closeInteractionOverlay();
  });
  document.getElementById("outingCancelBtn").addEventListener("click", closeOutingOverlay);
  bindImeSafeTextInput("outingCustomInput", submitCustomOutingDestination);
  document.getElementById("outingCustomConfirmBtn").addEventListener("click", submitCustomOutingDestination);
  document.getElementById("outingOverlay").addEventListener("click", (event) => {
    if (event.target.id === "outingOverlay") closeOutingOverlay();
  });
  document.getElementById("companionCancelBtn").addEventListener("click", closeCompanionOverlay);
  document.getElementById("companionConfirmBtn").addEventListener("click", submitCompanionTopic);
  document.getElementById("companionTopicTextarea").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitCompanionTopic();
    }
  });
  document.getElementById("companionOverlay").addEventListener("click", (event) => {
    if (event.target.id === "companionOverlay") closeCompanionOverlay();
  });
  document.getElementById("intimacyCancelBtn").addEventListener("click", closeIntimacyOverlay);
  document.getElementById("intimacyNormalBtn").addEventListener("click", () => confirmIntimacyMode("normal"));
  document.getElementById("intimacyNsfwBtn").addEventListener("click", () => confirmIntimacyMode("nsfw"));
  document.getElementById("intimacyOverlay").addEventListener("click", (event) => {
    if (event.target.id === "intimacyOverlay") closeIntimacyOverlay();
  });
  document.getElementById("freeModeStayBtn")?.addEventListener("click", () => closeFreeModeEntryOverlay(true));
  document.getElementById("freeModeEnterBtn")?.addEventListener("click", enterFreeMode);
  document.getElementById("freeModeEntryOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "freeModeEntryOverlay") closeFreeModeEntryOverlay(true);
  });
  document.getElementById("freeModePhoneBtn")?.addEventListener("click", openPhoneOverlay);
  document.getElementById("freeModeStatusBadge")?.addEventListener("click", openFreeModeTimeOverlay);
  document.getElementById("vnFreeModeClock")?.addEventListener("click", openFreeModeTimeOverlay);
  document.getElementById("freeModeTimeCloseBtn")?.addEventListener("click", closeFreeModeTimeOverlay);
  document.getElementById("freeModeTimeAdvanceBtn")?.addEventListener("click", submitFreeModeManualTimeAdvance);
  document.getElementById("freeModeAdvanceDayBtn")?.addEventListener("click", handleFreeModeAdvanceDay);
  document.getElementById("freeModeTimeOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "freeModeTimeOverlay") closeFreeModeTimeOverlay();
  });
  document.querySelectorAll(".free-mode-time-quick-btn").forEach((button) => {
    button.addEventListener("click", () => applyFreeModeManualTimeAdvance(button.dataset.minutes));
  });
  document.getElementById("freeModeTimeAdvanceInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitFreeModeManualTimeAdvance();
  });
  document.getElementById("worldMapLayoutEditBtn")?.addEventListener("click", () => {
    if (isFreeModeActive()) {
      worldMapLayoutState.editorActive = true;
      closeMapLocationOverlay();
      render();
      updateWorldMapLayoutEditorUI();
      showToast("布局编辑", "拖动热点调整位置。", "info");
      return;
    }
    openWorldMapLayoutEditor();
  });
  document.getElementById("worldMapLayoutSaveBtn")?.addEventListener("click", () => persistWorldMapLayoutToBrowser(true));
  document.getElementById("worldMapLayoutExportBtn")?.addEventListener("click", () => { exportWorldMapLayout(); });
  document.getElementById("worldMapLayoutFitBtn")?.addEventListener("click", toggleWorldMapLayoutFit);
  document.getElementById("worldMapLayoutResetBtn")?.addEventListener("click", resetWorldMapLayout);
  document.getElementById("worldMapLayoutCloseEditorBtn")?.addEventListener("click", closeWorldMapLayoutEditor);
  document.getElementById("mapLocationBackBtn")?.addEventListener("click", closeMapLocationOverlay);
  document.getElementById("mapLocationEnterWithIdolBtn")?.addEventListener("click", () => confirmMapLocationEntry("with_idol"));
  document.getElementById("mapLocationEnterAloneBtn")?.addEventListener("click", () => confirmMapLocationEntry("alone"));
  document.getElementById("mapLocationOutingBtn")?.addEventListener("click", openFreeModeOutingOverlay);
  document.getElementById("freeModeOutingCancelBtn")?.addEventListener("click", closeFreeModeOutingOverlay);
  bindImeSafeTextInput("freeModeOutingCustomInput", submitCustomFreeModeOutingDestination);
  document.getElementById("freeModeOutingCustomConfirmBtn")?.addEventListener("click", submitCustomFreeModeOutingDestination);
  document.getElementById("freeModeOutingOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "freeModeOutingOverlay") closeFreeModeOutingOverlay();
  });
  document.getElementById("mapLocationOverlay")?.addEventListener("click", (event) => {
    if (event.target.id === "mapLocationOverlay") closeMapLocationOverlay();
  });
  document.getElementById("vnCustomChoiceCancelBtn").addEventListener("click", hideVnCustomChoicePanel);
  document.getElementById("vnCustomChoiceConfirmBtn").addEventListener("click", handleVnCustomChoiceSubmit);
  const committedReplyDedupKeys = [];
  function shouldSkipCommittedReply(payload) {
    if (!payload || payload.type !== "aiReplyCommitted") return false;
    const key = [
      String(payload.requestId || ""),
      payload.isFinal === false ? "0" : "1",
      String(payload.rawText || payload.text || "").slice(0, 320)
    ].join("::");
    if (committedReplyDedupKeys.includes(key)) return true;
    committedReplyDedupKeys.push(key);
    if (committedReplyDedupKeys.length > 48) {
      committedReplyDedupKeys.splice(0, committedReplyDedupKeys.length - 48);
    }
    return false;
  }

  function routeHostAiPayload(payload) {
    if (!payload || payload.source !== "hatsuboshi-produce-host") return;
    if (payload.type === "character") {
      console.log("[app.js] Applying character payload. Name:", payload.character?.name, "SaveScope:", payload.saveScope);
      applyHostCharacter(payload.character, payload.saveScope, payload.savedState, payload.hasSavedState);
      return;
    }
    if (shouldSkipCommittedReply(payload)) return;
    if (payload.type === "aiReply" || payload.type === "aiReplyCommitted") {
      applyAiReply(
        payload.text,
        payload.requestId,
        payload.rawText,
        payload.renderedText,
        payload.isFinal,
        payload.variableCommands
      );
    }
  }

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
    
    routeHostAiPayload(data);
  });
  window.addEventListener("hatsuAssistantCommitted", (event) => {
    const detail = event?.detail || {};
    routeHostAiPayload(detail);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVnDebugView();
      closeEventOverlay();
      closeAiPromptOverlay();
      closeFreeChatOverlay();
      closeInteractionOverlay();
      closeOutingOverlay();
      closeCompanionOverlay();
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
      startOpeningStory("重置育成");
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
  if (state.round > SUMMARY_ROUND) state.round = SUMMARY_ROUND;
  if ("fatigue" in state) delete state.fatigue;
  if (typeof state.liveReady !== "boolean") state.liveReady = false;
  if (state.idol && (!state.growth || !state.cap || !state.sp)) applyIdolPreset(state.idol);
  // Expose developer commands globally
  window.produceDev = {
    setDay: (d) => { state.day = clamp(d, 1, FINAL_LIVE_DAY); saveState(); render(); return `Day set to ${state.day}`; },
    setRound: (r) => { state.round = clamp(r, 1, SUMMARY_ROUND); saveState(); render(); return `Round set to ${state.round}`; },
    setStamina: (s) => { state.stamina = clamp(s, 0, 100); saveState(); render(); return `Stamina set to ${state.stamina}`; },
    setStress: (s) => { state.stress = clamp(s, 0, 100); saveState(); render(); return `Stress set to ${state.stress}`; },
    setTrust: (t) => { state.trust = Math.max(0, t); saveState(); render(); return `Trust set to ${state.trust}`; },
    setStats: (vo, da, vi) => { state.Vo = Math.max(0, vo); state.Da = Math.max(0, da); state.Vi = Math.max(0, vi); saveState(); render(); return `Stats set to Vo: ${state.Vo}, Da: ${state.Da}, Vi: ${state.Vi}`; },
    setLiveReady: (b) => { state.liveReady = Boolean(b); saveState(); render(); return `LiveReady set to ${state.liveReady}`; },
    resetLiveState: () => { state.firstLive = { completed: false, success: false, result: null }; saveState(); render(); return "First Live state reset."; },
    triggerLive: () => { state.liveReady = true; saveState(); render(); startFirstLive(); return "First Live started."; },
    openMapLayoutEditor: () => { openWorldMapLayoutEditor(); return "World map layout editor opened."; },
    exportMapLayout: () => { exportWorldMapLayout(); return buildWorldMapLayoutEnvelope(); },
    getMapLayout: () => buildWorldMapLayoutEnvelope()
  };

  ensureStateShape();
  refreshAffinityUnlocks();
  hydrateWorldMapLayout().finally(() => {
    saveState();
    render();
    bgmManager.init();
    updateBgm();
    if (!isSillyTavernHost()) resumeOpeningIfNeeded();
    requestHostCharacter();
  });

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
