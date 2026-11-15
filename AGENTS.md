# OCverse Project Rules

## Versioning Convention (`index.html`)

Always maintain the app version and timestamp inside `.legend-footer-meta` in `index.html`:

- **Format:** `v1.x.y-beta` (inside `<span class="legend-app-version">`).
- **Minor / Major-Update Counter (`x`):** Increment `x` by `1` **only** when the user explicitly states that a change is a **major update** (resetting `y` to `0`, e.g., `v1.7.1-beta` → `v1.8.0-beta`). Do not infer or trigger a bump to `x` automatically on remote pushes.
- **Adjustment Counter (`y`):** Always increment `y` by `1` whenever any adjustment is made to the project.
- **Timestamp:** Whenever the version is updated, also update `<span class="legend-last-updated">` to the current local date and time using the format `Updated: MMM D, YYYY, h:mm AM/PM`.
