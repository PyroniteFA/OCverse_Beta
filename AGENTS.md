# OCverse Project Rules

## Versioning Convention (`index.html`)

Always maintain the app version and timestamp inside `.legend-footer-meta` in `index.html`:

- **Format:** `v1.x.y-beta` (inside `<span class="legend-app-version">`).
- **Minor / Major-Update Counter (`x`):** Increment `x` by `1` **only** when the user explicitly states that a change is a **major update** (resetting `y` to `0`, e.g., `v1.7.1-beta` → `v1.8.0-beta`). Do not infer or trigger a bump to `x` automatically on remote pushes.
- **Adjustment Counter (`y`):** Always increment `y` by `1` whenever any adjustment is made to the project.
- **Timestamp:** Whenever the version is updated, also update `<span class="legend-last-updated">` to the current local date and time using the format `Updated: MMM D, YYYY, h:mm AM/PM`.

## UI Copy & Visual Restraint

- **No Eyebrow Headers:** Do not place small uppercase/letter-spaced kicker labels or `.brand-tag` pills directly above headings or modal/card titles.
- **No Decorative or Flavour Text:** Do not add atmospheric subtitles, explanatory filler paragraphs under self-evident headings, or redundant instructional microcopy (e.g., `"Click node to open"` next to an action link).
- **Preserve Authored Lore:** Keep all user-authored character bios, monologues, relationship summaries, lore entries, and Canva legend notes intact—apply restraint strictly to UI chrome.
