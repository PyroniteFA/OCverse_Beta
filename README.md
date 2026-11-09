# ⚡ Pyronite OC Verse — Interactive Relationship Web

An interactive, visual character relationship sheet and multi-tagged lore archive for the **Pyronite OC Verse**.

Replicated directly from the Canva relationship diagram with full interactive features: clickable characters, clickable arrows, multi-tagged shared history blocks, pan/zoom canvas, and live filtering.

---

## 🚀 Quick Start (Zero Dependencies)

**No installation, Node.js, or build step required!**

1. Simply double-click **`index.html`** in this folder to open it in Chrome, Edge, Firefox, or any modern web browser.
2. That's it! Everything runs directly on your machine.

---

## 🌐 How to Host on GitHub Pages (Free, 2 Minutes)

Because this web app uses pure HTML5, modern CSS, and vanilla JavaScript without complex build tools, GitHub Pages can host it natively for free:

### Step 1: Create a GitHub Repository
1. Log into your GitHub account.
2. Click **New Repository** (call it `OCverse` or whatever you prefer).
3. Leave it public (or private if you have GitHub Pro). Do **not** initialize with README or license.

### Step 2: Push your code
Open PowerShell or Git Bash in this `OCverse` folder and run:

```bash
git init
git add .
git commit -m "Initial commit of Pyronite OC Verse interactive sheet"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Turn on GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top) ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 30 seconds, your interactive web app will be live at:
   `https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 🎨 Interactive Features

* **Click any Character Node**: Opens the slide-over **Dossier Drawer** with:
  * Avatar & Archetype.
  * Lived experience breakdown (Mortal, Stasis, Macro years highlighted in bold).
  * Universe-crossing mobility badge (`effortless` vs `exertion`).
  * **Multi-Tagged Lore Blocks**: Automatically pulls any historical event from `data/lore.js` that mentions this character.
  * **Active Bonds Matrix**: Direct links to all their connected relationships and partner characters.
* **Click any Relationship Arrow**: Opens the **Dynamic Inspector** with:
  * Relationship classification (Facilitation, Friendship level, Committed Lovers, Observation).
  * Modifiers (`Direct - Simple`, `Direct - Complex`, `Rescued`, `Generational`).
  * Footnotes (e.g., `*still definitely will funk`).
  * **Shared Historical Lore**: Automatically shows any backstory event where both characters are tagged.
* **Multi-Tagged Lore Archive**:
  * Click the **📖 Lore Archive** button in the navbar to open all shared lore entries.
  * Filter lore by tags (`#The Order`, `#Macro`, `#Rescue`, `#Romance`, `#Generational`, etc.).
  * Clicking any character pill inside a lore block automatically centers them on the canvas.
* **Canvas Controls**:
  * Drag to pan around the universe.
  * Mouse wheel to zoom in/out.
  * Use the floating `+` / `−` / `⟲` buttons to control the view.
  * Dynamic Filter dropdown: View only Friendships, Committed Lovers, Order Members, etc.

---

## ✍️ How to Add or Edit Lore & Characters

All data is separated into clean, readable JavaScript files in the `data/` folder:

### 1. Multi-Tagged Lore Entries (`data/lore.js`)
To add a new shared event or story block that appears across multiple characters and arrows:
```javascript
{
  id: 'lore-unique-id',
  title: 'Event or Backstory Title',
  era: 'Timeline / Era Label',
  tags: ['Order', 'Romance', 'Macro'],
  characterIds: ['kainek', 'carpo'], // Any character tagged here will display this block!
  relationshipIds: ['rel-kainek-carpo-friend'], // Any arrow tagged here will display this block!
  summary: 'Short one-sentence summary.',
  content: `Full multi-paragraph backstory text describing what happened...`
}
```

### 2. Characters (`data/characters.js`)
Edit names, titles, lived experiences, avatar images, and universe traversal badges:
* `universeTraversal`: `'effortless'` (solid black globe) or `'exertion'` (dashed outline globe).
* `orderMember`: `true` or `false`.

### 3. Relationships (`data/relationships.js`)
Add new connecting lines:
* `type`: `'facil'` (sky blue), `'friendship'` (emerald green), `'lovers'` (rose red), or `'observation'` (slate grey).
* `score`: `'1'`, `'2'`, `'3'`, `'?'`, `'∞'`, etc.
* `bidirectional`: `true` or `false`.
* `modifier`: e.g. `'Direct - Simple'`, `'Direct - Complex'`, `'Rescued'`, `'Generational'`.
