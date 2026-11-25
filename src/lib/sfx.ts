/**
 * 纸声：只在「进入项目」那一下响。
 * 两段真实的翻纸录音（CC0：freesound 的 Book Turn Page 1 / PageTurn），
 * 各自裁到 0.7~0.9 秒、对齐响度，轮流播，听不出是同一条样本。
 */

const MEDIA = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://pub-99c53aec3f634300b636798977401e47.r2.dev"
).replace(/\/monster-diner$/, "");

const TURNS = [`${MEDIA}/sfx/paper-turn-1.mp3`, `${MEDIA}/sfx/paper-turn-2.mp3`];

// 真实录音的峰值比合成音低，音量给得比之前大一点
const VOLUME = 0.5;

let lastAt = 0;
let lastIndex = -1;
let prefetched = false;
const pool: HTMLAudioElement[] = [];
const playing: HTMLAudioElement[] = [];

/** 进站后先把两条音频拉进 HTTP 缓存，首次点击才不会空一拍 */
export function prefetchPaperSfx() {
  if (prefetched || typeof window === "undefined") return;
  prefetched = true;
  TURNS.forEach((src) => {
    const a = new Audio(src);
    a.preload = "auto";
    a.muted = true;
    pool.push(a); // 留住引用，不然可能还没下完就被回收
    a.load();
  });
}

export function playPaper() {
  if (typeof window === "undefined") return;

  // 连点两下只响一次，免得叠成噪音
  const now = performance.now();
  if (now - lastAt < 120) return;
  lastAt = now;

  // 两条轮流，避免连着同一条
  let i = Math.random() < 0.5 ? 0 : 1;
  if (i === lastIndex) i = 1 - i;
  lastIndex = i;

  const audio = new Audio(TURNS[i]);
  audio.volume = VOLUME;
  // 每一下的速率略有差别，听起来不像同一个样本反复播
  audio.playbackRate = 0.96 + Math.random() * 0.08;
  playing.push(audio);
  audio.addEventListener("ended", () => {
    const k = playing.indexOf(audio);
    if (k >= 0) playing.splice(k, 1);
  });
  void audio.play().catch(() => {
    const k = playing.indexOf(audio);
    if (k >= 0) playing.splice(k, 1);
    /* 自动播放被拦、或还没交互过，静默跳过就好 */
  });
}
