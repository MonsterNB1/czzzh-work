/**
 * 纸声：整站点击的音效都在这里。
 * 只用浏览器原生的 Audio 元素，避免 WebAudio 在 R2 上的 CORS 限制；
 * 文件很小（2~8KB），进站时就预取一次，点下去不会等。
 */

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

export type PaperKind = "turn" | "tab";

const SRC: Record<PaperKind, string> = {
  turn: `${MEDIA}/sfx/paper-turn.mp3`,
  tab: `${MEDIA}/sfx/paper-tab.mp3`,
};

// 翻页本来就比拍一下重，音量分开给
const VOLUME: Record<PaperKind, number> = {
  turn: 0.30,
  tab: 0.20,
};

let lastAt = 0;
let prefetched = false;
const pool: HTMLAudioElement[] = [];
const playing: HTMLAudioElement[] = [];

/** 进站后先把两条音频拉进 HTTP 缓存，首次点击才不会空一拍 */
export function prefetchPaperSfx() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  (Object.keys(SRC) as PaperKind[]).forEach((kind) => {
    const a = new Audio(SRC[kind]);
    a.preload = "auto";
    a.muted = true;
    pool.push(a); // 留住引用，不然可能还没下完就被回收
    a.load();
  });
}

export function playPaper(kind: PaperKind = "turn") {
  if (typeof window === "undefined") return;

  // 连点两下只响一次，免得叠成噪音
  const now = performance.now();
  if (now - lastAt < 110) return;
  lastAt = now;

  const audio = new Audio(SRC[kind]);
  audio.volume = VOLUME[kind];
  // 每一下的速率略有差别，听起来不像同一个样本反复播
  audio.playbackRate = 0.94 + Math.random() * 0.12;
  playing.push(audio);
  audio.addEventListener("ended", () => {
    const i = playing.indexOf(audio);
    if (i >= 0) playing.splice(i, 1);
  });
  void audio.play().catch(() => {
    const i = playing.indexOf(audio);
    if (i >= 0) playing.splice(i, 1);
    /* 自动播放被拦、或还没交互过，静默跳过就好 */
  });
}
