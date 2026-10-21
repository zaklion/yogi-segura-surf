# Image & video slots

To swap one in, **overwrite the file with the same name** (export as JPG, ~80% quality, sRGB). No HTML edit is needed
as long as the aspect ratio is close. Keep files under ~300 KB (use squoosh.app or `cwebp`/`jpegoptim`).

Footage rule from the launch plan: use Yogi's **existing archive first** (♻️). Only use photos of identifiable clients with a **signed likeness release**.

**Real photos are now in place** (from Yogi's Instagram, cropped by `../../tools/process_photos.py` from `../../ig-photos/`; it never upscales). Re-run that script to re-crop. `tools/make_placeholders.py` now only fills *missing* slots.

| File | Size (px) | Where it shows | Source |
|---|---|---|---|
| `hero.jpg` | 1440×1170 | Home hero | `01-airborne-action-turquoise-wave.jpg` (full width, air + wave) |
| `trailer-poster.jpg` | 1200×675 | Home trailer slot | `01` tighter crop on the air. Swap for a real trailer frame later |
| `about-yogi.jpg` | 512×640 (4:5) | Home "Meet your coach" | `02-flag-celebration-portrait.jpg` (Yogi with the Costa Rica flag). Low-res, so the photo is capped at 520px wide |
| `lineup-drone.jpg` | 512×384 | Home gallery #1 (Ocean IQ) | `04-beach-horse-rider-coast.jpg` |
| `surf-turn.jpg` | 360×270 | Home gallery #2 (First turns) | `03-surf-action-cutback-reel-cover.jpg` (small slot only; soft) |
| `trip-lifestyle.jpg` | 360×270 | Home gallery #3 (Surf-trip playbook) | `06-surfer-walking-to-water-reel-cover.jpg`, top part only, cropped above its text overlay |
| `waitlist-hero.jpg` | 1440×900 | Waitlist page (EN + ES) | `01`, 16:10 crop |
| `og-image.jpg` / `og-image-es.jpg` | 1200×630 | Link previews (EN / ES) | `01` + "Surf Like You Live Here." / "Surfea como si vivieras aquí." overlay |

Not used: `05` (possibly a student, has text overlay) and `07` (large Spanish text overlay).
Removed slots (no suitable photo yet): the coaching-with-a-student inset in "Meet your coach" (HTML comment marks where to add it back) and the pop-up drill gallery photo (replaced by `surf-turn.jpg`).

**Still wanted, at higher resolution** (the Instagram files are 360–640px, fine for small slots only): original full-size files of the photos above, Yogi coaching a student (with release), a pop-up drill on the beach, and a trailer frame.

Optional, to add later:
- **Trailer video** (`trailer.mp4` H.264 + `trailer.webm`, 1080p, <15 MB, with captions): replace the `<figure class="video-frame">` in `index.html` with
  ```html
  <video class="video-frame" controls preload="none" poster="images/trailer-poster.jpg" style="width:100%;border-radius:22px">
    <source src="images/trailer.webm" type="video/webm"><source src="images/trailer.mp4" type="video/mp4">
  </video>
  ```
  Or embed a YouTube/Vimeo/Gumroad video instead to save bandwidth.
- **Testimonial photos** (`testimonial-1.jpg` … `testimonial-3.jpg`, 200×200 square): faces of real past clients **with written permission**, replacing the `?` avatars in the testimonials section.
- **3 short loops** (GIF/WebM, 9:16 or 1:1) from the plan can replace the gallery images later.

Always update the `alt` text in `index.html` / `waitlist.html` to describe the real photo.
