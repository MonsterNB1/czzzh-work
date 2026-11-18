#!/usr/bin/env bash
# Turn the 7Mbps master episodes into something a phone can actually stream.
# 1080p / 6.8Mbps  ->  720p / ~1.1Mbps  (about 47MB for a 5:50 episode)
#
# Usage:
#   ./scripts/web-videos.sh                     # all 12, read straight from R2
#   ./scripts/web-videos.sh 1 3 5               # only those episodes
#   ./scripts/web-videos.sh --local ~/Desktop/ep-src 2   # from local files instead
#   CRF=23 ./scripts/web-videos.sh 1            # smaller, slightly softer
#
# Output lands in $OUT (default: ~/Desktop/作品集网站搭建/web-videos).
# Upload each epN-720.mp4 back over epN.mp4 on R2 and the site needs no code change.

set -euo pipefail

BASE="${BASE:-https://pub-99c53aec3f634300b636798977401e47.r2.dev/monster-diner}"
OUT="${OUT:-$HOME/Desktop/作品集网站搭建/web-videos}"
FF="${FF:-$HOME/bin/ffmpeg}"
CRF="${CRF:-20}"
PRESET="${PRESET:-medium}"
HEIGHT="${HEIGHT:-720}"

LOCAL_SRC=""
if [[ "${1:-}" == "--local" ]]; then
  LOCAL_SRC="$2"
  shift 2
fi

if ! "$FF" -version >/dev/null 2>&1; then
  echo "ffmpeg not found at $FF" >&2
  exit 1
fi

EPISODES=("$@")
if [[ ${#EPISODES[@]} -eq 0 ]]; then
  EPISODES=(1 2 3 4 5 6 7 8 9 10 11 12)
fi

mkdir -p "$OUT"

for n in "${EPISODES[@]}"; do
  src=""
  if [[ -n "$LOCAL_SRC" ]]; then
    src="$LOCAL_SRC/ep$n.mp4"
    [[ -f "$src" ]] || { echo "skip ep$n: $src not found"; continue; }
  else
    src="$BASE/ep$n.mp4"
  fi

  dest="$OUT/ep$n-720.mp4"
  if [[ -s "$dest" ]]; then
    echo "skip ep$n: already encoded"
    continue
  fi

  echo "=== ep$n ==="
  "$FF" -y -hide_banner -loglevel warning -stats \
    -i "$src" \
    -vf "scale=-2:${HEIGHT}" \
    -c:v libx264 -preset "$PRESET" -crf "$CRF" -pix_fmt yuv420p \
    -c:a aac -b:a 96k \
    -movflags +faststart \
    "$dest"
done

echo
echo "--- results ---"
for n in "${EPISODES[@]}"; do
  dest="$OUT/ep$n-720.mp4"
  [[ -s "$dest" ]] && printf "ep%-3s %6s\n" "$n" "$(ls -lh "$dest" | awk '{print $5}')"
done
