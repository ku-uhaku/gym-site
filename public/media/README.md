# Hero media

Two files drive the hero backdrop:

- `hero.mp4` — the background clip
- `hero-poster.jpg` — **frame zero of that clip**, shown instantly while the
  video streams

Both paths are set at the top of `app/_components/hero-backdrop.tsx`.

The poster must be frame zero of the clip. If it is any other frame, you see a
visible jump the moment playback starts.

## Replacing the clip

Keep the master in `media-src/` (outside `public/`, so it is never served) and
generate the web copies from it:

    # clip: trim to the window you want, no audio, faststart for progressive play
    ffmpeg -y -ss 0 -t 8 -i media-src/hero-original.mp4 -an \
      -c:v libx264 -crf 30 -preset slow -profile:v high -pix_fmt yuv420p \
      -movflags +faststart public/media/hero.mp4

    # poster: frame zero of the SOURCE, matching the clip's start point
    ffmpeg -y -ss 0 -i media-src/hero-original.mp4 -frames:v 1 \
      -vf "scale=1280:-2" -q:v 6 public/media/hero-poster.jpg

If you change the `-ss` start on the clip, use the same `-ss` on the poster.

## What works

- 8-15 seconds, slow and wide. Fast cuts fight the type.
- No audio track. It is muted anyway, and dropping it saves weight.
- Under ~1 MB. Current clip is 0.87 MB at crf 30, which is plenty behind the scrim.
- Watch for text in frame. The scrim holds the top down, but legible signage
  still competes with the headline.

With neither file present the designed fallback (warm light, grain, scrim)
shows instead, so the section is never broken.
