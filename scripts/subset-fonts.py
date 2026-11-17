#!/usr/bin/env python3
"""Regenerate the subset font after copy changes.

The site ships a 359-glyph subset of "标小智无界黑" (47KB instead of 1.3MB).
If you add new Chinese text that renders in WujieHei, new glyphs will fall
back to PingFang SC until you re-run this script.

    python3 scripts/subset-fonts.py

Requires: pip install fonttools brotli
"""
import pathlib
import string
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
FULL = ROOT / "scripts/fonts/wujie-full.woff2"
TEXT = ROOT / "scripts/subset-text.txt"
OUT = ROOT / "public/fonts/wujie.woff2"

chars = set()
for f in (ROOT / "src").rglob("*"):
    if f.suffix in {".tsx", ".ts", ".css"}:
        chars.update(f.read_text(encoding="utf-8"))
chars.update(string.printable)
# punctuation that shows up in hand-written labels but not in source strings
chars.update("，。！？、；：“”‘’（）《》—…·～")
chars.discard("\n"), chars.discard("\r"), chars.discard("\t")

TEXT.write_text("".join(sorted(chars)), encoding="utf-8")
subprocess.run(
    [
        "pyftsubset", str(FULL),
        f"--text-file={TEXT}",
        "--flavor=woff2",
        "--layout-features=*",
        f"--output-file={OUT}",
    ],
    check=True,
)
print(f"{len(chars)} glyphs -> {OUT.stat().st_size / 1024:.1f}KB")
