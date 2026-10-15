# Hero clip

Drop the background video here as `hero.mp4`. The hero reads it from
`/media/hero.mp4` (see `CLIP` in `app/_components/hero-backdrop.tsx`).

What works well:
- 8–15 seconds, seamless loop, no cuts.
- 1920×1080, H.264, **no audio track** (it is muted anyway; dropping audio saves weight).
- Target under ~4 MB so it is not fighting the first paint.
- Slow, wide footage — a rack, chalk in the air, one lift. Fast cuts fight the type.

Compress with ffmpeg:

    ffmpeg -i source.mov -t 12 -an -vf "scale=1920:-2" \
      -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4

Until a file is here, the designed fallback (warm light, grain, scrim) shows
instead — the section is not broken without it.
