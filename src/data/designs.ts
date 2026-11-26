// Design work lives here, one record per project. The index reads the cover,
// the detail page lays out the brief, the numbers and the plates group by group.

export type DesignBrief = { label: string; lines: string[] };

export type DesignStat = { value: string; label: string };

/** 两张画面各拆一套词，交叉处落成题眼 */
export type DesignKeywords = {
  left: string[];
  right: string[];
  cross: string[];
  /** 左圈 / 右圈的名字，压在圈顶 */
  leftLabel?: string;
  rightLabel?: string;
};

/** 手绘方向草稿：一个机位一版，标出最后定的那版 */
export type DesignDirection = {
  image: string;
  label: string;
  note: string;
  chosen?: boolean;
};

/** 黑白稿：看结构的线稿，或者压成黑白的光位 */
export type DesignMonoShot = {
  image: string;
  label: string;
  note: string;
};

/** 从层结构倒推出来的一步：这一版合成到哪儿了 */
export type DesignStep = {
  label: string;
  note: string;
  shot: string;
};

/** 字标单独拎出来展示，附带被毙掉的几稿 */
export type DesignSloganVariant = {
  image: string;
  title: string;
  note: string;
};

export type DesignSlogan = {
  image: string;
  headline: string;
  /** 字标下面那一行小字 */
  line?: string;
  note?: string;
  variants?: DesignSloganVariant[];
};

export type DesignPlateGroup = {
  label: string;
  shots: string[];
  /** how dense the grid runs: 2 / 3 for posters, 4 / 6 for small assets */
  cols?: 2 | 3 | 4 | 6;
  /** a link out to the full set, shown at the end of the group heading */
  more?: { href: string; label: string };
};

export type DesignData = {
  slug: string;
  title: string;
  /** one line under the title, what the thing is */
  sub?: string;
  /** small line beside the title, set in the typewriter face */
  en?: string;
  desc?: string;
  /** who made the work */
  credit?: string;
  group: "游戏项目" | "其他项目";
  /** portrait or landscape plate, decides how the grid hangs it */
  shape?: "portrait" | "landscape";
  /** big print at the top of the detail page, defaults to the cover */
  hero?: string;
  /** 不在页顶置顶自己的物料，官方 KV 先行，作品从 plates 开始 */
  heroHidden?: boolean;
  /** a small caption under that print, marks the stage it belongs to */
  heroNote?: string;
  /** narrow-screen variant of the hero, offered alongside it in the srcset */
  heroSmall?: string;
  /** cover shown in the polaroid grid */
  cover?: string;
  /** -600 variant of the cover, served to narrow screens */
  thumb?: string;
  /** the brand mark shown instead of a cover on the index, when the project reads better as a logo */
  logo?: string;
  /** which board the mark is printed on: paper-white or ink */
  logoPlate?: "paper" | "ink";
  /** a softened crop of the project's key visual, laid under the mark on the index */
  logoBg?: string;
  /** the tone pulled out of that key visual, the far end of the wash */
  logoTone?: string;
  /** 游戏介绍：一段世界观的话，配一张官方 KV，摆在自己的物料前面 */
  intro?: {
    label: string;
    note?: string;
    source?: string;
    text?: string;
    image: string;
    imageSmall?: string;
  };
  /** 项目 / 主题 / 定位 / 思路, laid out as a cross */
  brief?: DesignBrief[];
  /** the numbers the campaign landed */
  stats?: DesignStat[];
  /** platforms the material shipped on */
  platforms?: string[];
  /** store ranking screenshots, opened at full size */
  boards?: string[];
  /** 关键词提取的交叉图 */
  keywords?: DesignKeywords;
  /** 上色前的黑白稿 */
  mono?: { intro?: string; shots: DesignMonoShot[]; points?: string[] };
  /** 四个方向的手绘草图 */
  directions?: DesignDirection[];
  directionNote?: string;
  /** 过程稿：环境、人物、字标、收尾，一张一张合成上来 */
  steps?: DesignStep[];
  /** 字标 / slogan 独立展示 */
  slogan?: DesignSlogan;
  meta?: string[];
  /** one section per folder the material came from */
  plates?: DesignPlateGroup[];
};

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

/** a run of plates that ship inside the repo, under /public/design */
const local = (slug: string, key: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `/design/${slug}/${key}-${String(i + 1).padStart(2, "0")}.webp`,
  );

/** a run of plates uploaded as <slug>/<key>-01.webp, -02.webp ... */
const series = (slug: string, key: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    `${MEDIA}/design/${slug}/${key}-${String(i + 1).padStart(2, "0")}.webp`,
  );

/** 驱入虚空：重出的大图在 design/quzhu/hd/ 下，编号同样是两位数 */
const hd = (key: string, n: number | number[]) =>
  (Array.isArray(n) ? n : Array.from({ length: n }, (_, i) => i + 1)).map(
    (i) => `${MEDIA}/design/quzhu/hd/${key}-${String(i).padStart(2, "0")}.webp`,
  );

export const designs: Record<string, DesignData> = {
  quzhu: {
    slug: "quzhu",
    title: "《驱入虚空》",
    sub: "近未来科幻题材第三人称射击游戏",
    en: "INTO THE VOID · PROMOTIONAL ART",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "版本 KV 定调，海报和公告跟着赛季节奏走，月历、表情包和周边把世界观铺到屏幕外。",
    meta: ["主视觉 / 版本宣发", "海报 / 公告 / 月历", "表情包 / 周边 / 线下"],
    hero: `${MEDIA}/design/quzhu/hd/hero.webp`,
    heroSmall: `${MEDIA}/design/quzhu/hd/hero-1200.webp`,
    cover: `${MEDIA}/design/quzhu/hd/cover.webp`,
    thumb: `${MEDIA}/design/quzhu/hd/cover-600.webp`,
    brief: [
      {
        label: "项目",
        lines: ["科幻悬疑叙事游戏", "虚空侵蚀世界观", "强氛围沉浸体验", "探索 / 生存 / 解谜结合"],
      },
      { label: "主题", lines: ["INTO THE VOID", "IF YOU SEE IT, IT SEES YOU"] },
      {
        label: "定位",
        lines: [
          "科幻心理压迫感",
          "现实感未来美学",
          "强视觉风格化",
          "偏情绪与沉浸体验",
          "非传统爽感战斗",
        ],
      },
      {
        label: "思路",
        lines: [
          "近未来背景，文明高度数字化后，现实世界开始出现无法解释的「虚空渗透」。",
          "世界表面正常，底层秩序已经逐渐失控。",
        ],
      },
    ],
    stats: [
      { value: "30W", label: "TapTap 预约" },
      { value: "5W", label: "B 站预约" },
      { value: "1W", label: "好游快爆预约" },
      { value: "100+", label: "首发版本 APPU" },
    ],
    platforms: [
      "Google Play",
      "WeGame",
      "STEAM",
      "TapTap",
      "4399",
      "联想应用商店",
      "顺网游戏",
      "云更新",
      "HONOR",
      "HUAWEI",
      "小米应用商店",
      "360 软件宝库",
      "vivo",
      "OPPO",
    ],
    boards: [`${MEDIA}/design/quzhu/board-01.webp`],
    plates: [
      { label: "赛季战令宣传封面", shots: hd("pass", 4) },
      { label: "社区更新公告", shots: hd("notice", 4) },
      { label: "KV · 主视觉", shots: hd("kv", [7, 2]) },
      { label: "角色展示海报系列", shots: hd("char", 6) },
      { label: "节日活动海报系列", shots: hd("festival", 4) },
      { label: "游戏月历系列", shots: hd("calendar", 7) },
      {
        label: "游戏内部美术资源 · 表情包 & 聊天表情",
        shots: hd("sticker", 12),
        cols: 6,
      },
      { label: "头像框", shots: hd("frame", 3), cols: 4 },
      { label: "称号", shots: hd("title", 3), cols: 2 },
      { label: "游戏周边产品上架", shots: hd("goods", 4), cols: 4 },
      {
        label: "期刊 & 漫画",
        shots: ["zine-01", "zine-03"].map((k) => `${MEDIA}/design/quzhu/${k}.webp`),
        cols: 2,
        more: { href: "/works/design/quzhu/journal", label: "全 7 件" },
      },
      { label: "线下物料", shots: hd("offline", 4), cols: 4 },
    ],
  },
  bluearchive: {
    slug: "bluearchive",
    title: "蔚蓝档案",
    sub: "Bilibili World 2026 展陈物料",
    en: "EXHIBITION DESIGN · BW2026",
    group: "游戏项目",
    credit: "展陈物料独立设计 / 制作 · 官方素材引自游戏官网",
    desc: "2026 Bilibili World 的蔚蓝档案展台。主视觉、场内导视，七位少女的立牌，一路做到展位搭建的效果图和现场落地，印刷、结构和灯光都要对得上。",
    meta: ["主视觉 / 场内导视", "立牌 / 搭建效果图 / 现场"],
    cover: `${MEDIA}/design/bluearchive/hero-01.webp`,
    thumb: `${MEDIA}/design/bluearchive/hero-01-600.webp`,
    heroNote: "展位主视觉 · Bilibili World 2026",
    logo: `${MEDIA}/design/logos/bluearchive.webp`,
    logoPlate: "paper",
    logoBg: "/design/bluearchive/logo-bg.webp",
    logoTone: "#9ea9e8",
    intro: {
      label: "官方 KV · 基沃托斯 · 黄昏",
      note: "© NEXON Games / Yostar",
      source: "官方资料 · bluearchive-cn.com",
      text: "基沃托斯，头上顶着光环的少女们生活的学园都市。联邦理事会的会长不辞而别，城市陷入群龙无首的混乱，会长留下的搜查社「沙勒」和从外面来的老师接下了这座城。阿拜多斯的沙暴、废部危机、还不完的欠款——故事从五名少女的社团开始。",
      image: "/design/bluearchive/kv-official-dusk.webp",
      imageSmall: "/design/bluearchive/kv-official-dusk-900.webp",
    },
    brief: [
      {
        label: "游戏",
        lines: ["学园 · 青春 · 战术 RPG", "NEXON Games 开发 · 悠星国服发行", "2023 国服上线，现版本 3.0.2"],
      },
      {
        label: "世界观",
        lines: ["基沃托斯：光环少女的学园都市", "联邦理事会失序，沙勒与老师接手", "阿拜多斯：沙暴吞城，只剩五名少女"],
      },
      {
        label: "玩法",
        lines: ["编队推进 · 掩体射击 · 自动战斗", "EX 技能、好感度与社团剧情"],
      },
      {
        label: "展台",
        lines: ["Bilibili World 2026 展陈物料", "主视觉 / 导视 / 立牌 / 搭建方案", "效果图到现场，一件件落地"],
      },
    ],
    plates: [
      { label: "展陈主视觉", shots: series("bluearchive", "hero", 3) },
      {
        label: "展台搭建 · 效果图与现场",
        shots: ["/design/bluearchive/booth-render.webp", "/design/bluearchive/live-booth.webp"],
        cols: 2,
      },
      {
        label: "现场实拍 · 列车与展台",
        shots: ["/design/bluearchive/live-train.webp", "/design/bluearchive/live-front.webp"],
        cols: 2,
      },
      { label: "人物立牌", shots: ["/design/bluearchive/standee-sheet.webp"], cols: 2 },
      {
        label: "官方视觉 · 学园与街景",
        shots: ["/design/bluearchive/official-abydos.webp", "/design/bluearchive/official-street.webp"],
        cols: 2,
      },
    ],
  },
  xiaobingbing: {
    slug: "xiaobingbing",
    title: "小冰冰传奇",
    sub: "XG 战队 2026 赛季应援物料",
    en: "ESPORTS SUPPORT KIT",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "小冰冰传奇成为 XG 战队 2026 赛季官方赞助商，围绕这件事做了一整套应援物料：选手横幅、双面手举牌、稀有收藏卡、角色冰箱贴。",
    meta: ["应援 KV / 选手横幅", "收藏卡 / 冰箱贴"],
    cover: "/design/xiaobingbing/xbb-01.webp",
    thumb: "/design/xiaobingbing/xbb-01-600.webp",
    logo: `${MEDIA}/design/logos/xiaobingbing.webp`,
    logoPlate: "paper",
    logoBg: "/design/xiaobingbing/logo-bg.webp",
    logoTone: "#e6c79b",
    plates: [
      { label: "应援 KV & 手举牌", shots: ["/design/xiaobingbing/xbb-01.webp", "/design/xiaobingbing/xbb-02.webp"] },
      { label: "选手应援横幅", shots: local("xiaobingbing", "xbb", 7).slice(2) },
      { label: "稀有收藏卡", shots: local("xiaobingbing", "xbb", 11).slice(7) },
      { label: "周边", shots: local("xiaobingbing", "xbb", 13).slice(11) },
      { label: "品牌标识", shots: ["/design/xiaobingbing/xbb-14.webp"] },
    ],
  },
  snk: {
    slug: "snk",
    title: "SNK",
    sub: "ChinaJoy 展台视觉",
    en: "KEY VISUAL · CHINAJOY",
    group: "游戏项目",
    credit: "全部物料独立设计 / 制作",
    desc: "SNK 在 ChinaJoy 2026 的展台视觉，夜色街区的「格斗街区 · 热血正燃」与橙色底的热血开战版，定稿落在竖版参展确认海报上。",
    meta: ["关键词 / 过程稿 / 字标", "KV 两版方向", "参展确认海报 · 竖版"],
    heroNote: "定稿成品 · 6967 × 3921",
    cover: "/design/snk/snk-01.webp",
    thumb: "/design/snk/snk-01-600.webp",
    logo: "/design/snk/logo.webp",
    logoPlate: "ink",
    logoBg: "/design/snk/logo-bg.webp",
    logoTone: "#2b2724",
    keywords: {
      leftLabel: "人物",
      rightLabel: "街区",
      left: ["拳皇", "饿狼传说", "侍魂", "合金弹头", "八神庵"],
      right: ["夜街", "霓虹招牌", "警戒线", "街机厅", "火焰"],
      cross: ["游戏街区", "热血开战", "玩心", "ChinaJoy 2026"],
    },
    directions: [
      {
        image: "/design/snk/snk-dir1.webp",
        label: "方案1·平视",
        note: "九人横排站街心，对称，稳，但没什么冲劲。",
      },
      {
        image: "/design/snk/snk-dir2.webp",
        label: "方案2·仰视",
        note: "人高过招牌，字标沉到画面下沿，压过来。",
        chosen: true,
      },
      {
        image: "/design/snk/snk-dir3.webp",
        label: "方案3·斜侧",
        note: "街区往深里退，人缩成中景一簇。",
      },
      {
        image: "/design/snk/snk-dir4.webp",
        label: "方案4·俯拍",
        note: "先看摊位和大关系，人不当主角。",
      },
    ],
    directionNote: "机位先在纸上试了四版，定的是仰视这张：九个人一起压向镜头。",
    mono: {
      intro: "定稿那张竖版确认海报的底稿：展台、招牌、警戒带先在黑白里立住。",
      shots: [
        {
          image: "/design/snk/snk-mono-line.webp",
          label: "黑白稿 · 展台结构",
          note: "照着空镜重画的结构稿：透视拉直、地平线摆平，彩色、灯效和人物都先摘掉。",
        },
      ],
      points: [
        "招牌从两侧往中间收，视线被挤回街心。",
        "远处横梁压低，天空只剩一道缝。",
        "中间整块留白，等九个人填进去。",
      ],
    },
    steps: [
      {
        label: "空镜",
        note: "街区、招牌、灯都铺满，人物还没进场，地面那点亮光留给九个人。",
        shot: "/design/snk/snk-step1.webp",
      },
      {
        label: "群像落位",
        note: "角色原画逐个合进来，前后景分层，肩线、手势都对着站位调。",
        shot: "/design/snk/snk-step2.webp",
      },
      {
        label: "字标压屏",
        note: "标题板、电光、色相对齐，重心从人物挪到中间那块牌子。",
        shot: "/design/snk/snk-step3.webp",
      },
      {
        label: "氛围收尾",
        note: "火焰、ChinaJoy 警戒线、压暗与颗粒，出 6967×3921 定稿。",
        shot: "/design/snk/snk-step4.webp",
      },
    ],
    slogan: {
      image: "/design/snk/snk-slogan.webp",
      headline: "格斗街区 · Fighting for Fun · 热血正燃",
      line: "ChinaJoy 2026　N1 馆 G302　07.31 — 08.03",
      note: "字标前后出过三版，两版留在 PSD 里没启用，最后落在斜切的金属牌上，电光从牌面穿过去。",
      variants: [
        {
          image: "/design/snk/snk-slogan-alt1.webp",
          title: "SNK 游戏街区",
          note: "初版 · 未采用",
        },
        {
          image: "/design/snk/snk-slogan-alt2.webp",
          title: "游戏发生中",
          note: "二版 · 未采用",
        },
        {
          image: "/design/snk/snk-slogan-orange.webp",
          title: "欢聚街区 · 热血开战",
          note: "橙色方向 · 并行",
        },
      ],
    },
    plates: [
      {
        label: "KV · 两版方向",
        shots: ["/design/snk/snk-01.webp", "/design/snk/snk-02.webp"],
        cols: 2,
      },
      {
        label: "参展确认 · 竖版海报",
        shots: ["/design/snk/snk-03.webp"],
        cols: 2,
      },
    ],
  },
  ro3: {
    slug: "ro3",
    title: "仙境传说 3",
    sub: "线下展台物料",
    en: "OFFLINE BOOTH KIT · RO3",
    group: "游戏项目",
    credit: "展台物料独立设计 / 制作 · 官方立绘与宣传图引自游戏官网",
    desc: "仙境传说 3 的线下展台物料。从展台规则牌、通缉令集章、手举牌到一米栏插牌和 logo 贴，玩家从排队到领周边，每一步都有对应的牌子接住。",
    meta: ["展台规则牌 / 通缉令", "手举牌 / 插牌 / 展台标识"],
    heroHidden: true,
    cover: "/design/ro3/ro3-09.webp",
    thumb: "/design/ro3/ro3-09-600.webp",
    logo: "/design/ro3/logo.webp",
    logoPlate: "paper",
    logoBg: "/design/ro3/logo-bg.webp",
    logoTone: "#c9dbe2",
    intro: {
      label: "官方 KV · 米德加尔特 · 晴日草原",
      note: "© Gravity / 欢乐互娱 · bilibili 游戏",
      source: "官方资料 · game.bilibili.com/ro3",
      text: "米德加尔特大陆，普隆德拉的城门重新打开。《仙境传说3》是二十余年经典 IP 的全球正统续作，Gravity 与欢乐互娱联合开发、bilibili 游戏发行，PC 原生开发、多端互通。经典职业、MVP 挑战和自由交易保留了下来，画面、战斗手感与公会攻城一并翻新，是一片熟悉又焕然一新的冒险大陆。",
      image: "/design/ro3/kv-official.webp",
      imageSmall: "/design/ro3/kv-official-900.webp",
    },
    plates: [
      { label: "展台规则牌", shots: local("ro3", "ro3", 4) },
      {
        label: "通缉令 · 集章",
        shots: ["/design/ro3/wanted-sheet.webp"],
        cols: 2,
      },
      { label: "手举牌", shots: local("ro3", "ro3", 12).slice(8) },
      { label: "一米栏插牌", shots: local("ro3", "ro3", 14).slice(12) },
      {
        label: "官方角色立绘",
        shots: [
          "/design/ro3/official-c1.webp",
          "/design/ro3/official-c2.webp",
          "/design/ro3/official-c3.webp",
          "/design/ro3/official-c4.webp",
        ],
        cols: 4,
      },
      {
        label: "官方宣传图",
        shots: ["/design/ro3/official-p1.webp", "/design/ro3/official-p2.webp"],
        cols: 2,
      },
    ],
  },
  silvercity: {
    slug: "silvercity",
    title: "白银之城",
    sub: "2026 广州萤火虫 · 展台物料",
    en: "FIREFLY 2026 · BOOTH KIT",
    group: "游戏项目",
    credit: "展台物料独立设计 / 制作",
    desc: "《白银之城》是乐元素的复古幻想悬疑 RPG。萤火虫展台上的物料由我做：一张易拉宝把打卡、预约、领礼包排成一条动线，一张试玩券从正面的票根接到背面的试玩须知。",
    meta: ["展台易拉宝 / 打卡动线", "试玩券 94×58mm · 双面"],
    hero: "/design/silvercity/banner-top.webp",
    heroNote: "易拉宝上半 · 角色主画面与字标",
    cover: "/design/silvercity/ticket-front.webp",
    thumb: "/design/silvercity/ticket-front-600.webp",
    logo: "/design/silvercity/logo.webp",
    logoPlate: "ink",
    logoBg: "/design/silvercity/logo-bg.webp",
    logoTone: "#2a2f5e",
    brief: [
      {
        label: "游戏",
        lines: ["复古幻想 · 侦探悬疑 ARPG", "维多利亚风格，一座开放城市", "乐元素 · 2026.12.14 全球公测"],
      },
      {
        label: "世界观",
        lines: ["菲莉亚娜 3 年，侦探回到白银城。", "城市停在繁华和衰落的交界，现实与寓言混在一起。"],
      },
      {
        label: "玩法",
        lines: ["交际 · 侦察 · 判断 · 战斗", "顺着那颗子弹的源头，决定自己和他人的命运。"],
      },
      {
        label: "展台",
        lines: ["2026 广州萤火虫漫展", "易拉宝：打卡 / 预约 / 领礼包", "试玩券：94×58mm，双面，2mm 出血"],
      },
    ],
    plates: [
      {
        label: "易拉宝 · 打卡 / 预约 / 领礼包",
        shots: [
          "/design/silvercity/banner-checkin.webp",
          "/design/silvercity/banner-booking.webp",
          "/design/silvercity/banner-gift.webp",
        ],
      },
      {
        label: "试玩券 · 正面 / 背面",
        shots: ["/design/silvercity/ticket-front.webp", "/design/silvercity/ticket-back.webp"],
        cols: 2,
      },
    ],
  },
  promo: {
    slug: "promo",
    title: "剧本宣发系列",
    en: "KEY VISUAL",
    group: "其他项目",
  },
};

/** the design index reads in exactly this order, grouped the same way */
export const designOrder = [
  "quzhu",
  "bluearchive",
  "xiaobingbing",
  "ro3",
  "snk",
  "silvercity",
  "promo",
] as const;
