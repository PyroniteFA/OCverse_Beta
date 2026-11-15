/**
 * Pyronite OC Verse - Lore Flowchart Visualizer
 * Organized into clean storyline swimlanes showing true chronological progression,
 * fork/merge narrative paths, and direct click-through to the Lore Drawer.
 */

const LORE_FLOWCHART_ENTRIES = {
  // --- Kai'nek Genesis ---
  'lore-kainek-origin': {
    id: 'lore-kainek-origin',
    arc: 'kainek',
    step: '1',
    title: "Primordial Genesis & The Demiurge Complex",
    shortTitle: "Primordial Genesis",
    era: "Primordial Genesis / Timeless (∞)",
    characterIds: ['kainek'],
    summary: "Kai'nek awakens into eternity with no memory of his origin; presiding over his home domain above multiversal space, he shifts from aimless solitary hoarding to sharing stored energy with chosen peers.",
    nextIds: ['lore-kainek-philosophy']
  },
  'lore-kainek-philosophy': {
    id: 'lore-kainek-philosophy',
    arc: 'kainek',
    step: '2',
    title: "The Art of Ruin & The Price of Peers",
    shortTitle: "Philosophy of Ruin",
    era: "Centuries-Long Doctrine",
    characterIds: ['kainek', 'carpo', 'carnak'],
    summary: "Relishing mortal terror over sterile rocks, buffering energy within his tails, and establishing his inviolable code never to alter the minds of his circle.",
    nextIds: [],
    crossLinks: [
      { targetId: 'lore-order-pact', label: 'The Order Tactical Pact' },
      { targetId: 'lore-sanctuary-trio', label: 'The Sanctuary Haven' }
    ]
  },

  // --- The Order Core ---
  'lore-order-pact': {
    id: 'lore-order-pact',
    arc: 'order',
    step: '1',
    title: "The Order: The Sovereign's Tactical Pact",
    shortTitle: "The Tactical Pact",
    era: "Planar Foundation",
    characterIds: ['kainek', 'carnak', 'carpo', 'brutus'],
    summary: "Kai'nek establishes an informal tactical brotherhood, tearing through metropolises alongside ascended titans while siphoning life-force for his sovereign realm.",
    precededLinks: [
      { sourceId: 'lore-kainek-philosophy', label: "Kai'nek's Sovereign Philosophy" }
    ],
    nextIds: ['lore-order-targets']
  },
  'lore-order-targets': {
    id: 'lore-order-targets',
    arc: 'order',
    step: '2',
    title: "Target Selection & Campaign Protocols",
    shortTitle: "Campaign Protocols",
    era: "Multiversal Targeting",
    characterIds: ['kainek', 'carnak', 'carpo', 'brutus'],
    summary: "Claiming only unclaimed mortal realms, forward-only temporal traversal, mid-1940s to 1990s era preference, enduring architectural scars, and 50% presence guideline.",
    nextIds: ['lore-order-affiliates']
  },
  'lore-order-affiliates': {
    id: 'lore-order-affiliates',
    arc: 'order',
    step: '3',
    title: "External Affiliates & Rampage Contracts",
    shortTitle: "Affiliate Contracts",
    era: "Multiversal Outreach",
    characterIds: ['kainek', 'carpo', 'carnak', 'brutus', 'phya'],
    summary: "Contracting outside physical titans for shared planetary rampages, harvesting surged life energy for redistributed boons, and Carpo serving as friendly recruiter.",
    nextIds: ['lore-order-armor'],
    crossLinks: [
      { targetId: 'lore-regal-first-contact', label: 'Regal Contract' }
    ]
  },
  'lore-order-armor': {
    id: 'lore-order-armor',
    arc: 'order',
    step: '4',
    title: "Futuristic Combat Gear & Gadgets of the Order",
    shortTitle: "Combat Gear & Gadgets",
    era: "Order Operations & Aesthetics",
    characterIds: ['carpo', 'kainek', 'carnak', 'brutus'],
    summary: "Bespoke high-tech armor, Carpo's macro WWII ballistics, Brutus's CBRN gas tanks, Carnak's sledgehammer, and Kai'nek's telemetry—with freedom to rampage as wild beasts.",
    nextIds: []
  },
  'lore-carnak-twisted-sobek': {
    id: 'lore-carnak-twisted-sobek',
    arc: 'carnak',
    step: 'Origin',
    title: "The Twisted Sobek & The Writhing Masses",
    shortTitle: "Twisted Sobek",
    era: "Ascended Vanguard Era (150 yrs)",
    characterIds: ['carnak', 'kainek', 'carpo', 'brutus'],
    summary: "Awakened from residual Sobek power, Carnak harbors cold hatred for humans, serving as Kai'nek's disciplined frontline breaker and the Order's drama-free bro.",
    nextIds: []
  },

  // --- Sanctuary Saga ---
  'lore-brutus-zahra-origins': {
    id: 'lore-brutus-zahra-origins',
    arc: 'sanctuary',
    step: '1A',
    title: "Dynasties of Ash: The Court & Dragon Prince",
    shortTitle: "Dynasties of Ash",
    era: "Mortal Court Era (~1850s)",
    characterIds: ['brutus', 'zahra', 'kainek'],
    summary: "Rescued dragon warrior Brutus and neglected Enfield princess Zahra secretly fall in love; court execution orders trigger Brutus's vengeful beast ascension.",
    nextIds: ['lore-brutus-zahra-tragedy']
  },
  'lore-brutus-zahra-tragedy': {
    id: 'lore-brutus-zahra-tragedy',
    arc: 'sanctuary',
    step: '2A',
    title: "Ancestors, Angels & The 150-Year Sacrifice",
    shortTitle: "Ancestors & Angels",
    era: "The 150-Year Conflict",
    characterIds: ['brutus', 'zahra', 'kainek'],
    summary: "150 years of mortal wrath and angelic resurrections; mutual surrender breaks Brutus's destructive hunger and prompts Kai'nek's true haven pact.",
    nextIds: ['lore-carpo-sanctuary']
  },
  'lore-carpo-curse-broken': {
    id: 'lore-carpo-curse-broken',
    arc: 'sanctuary',
    step: '1B',
    title: "From Ambitious Centurion to Agent of Doom",
    shortTitle: "Carpo's Crucible",
    era: "2,100-Year Crucible to Veil Rescue",
    characterIds: ['carpo', 'kainek'],
    summary: "Immortal soldier across 2,100 years cursed to doom his world; Kai'nek tears him across the veil into unfamiliar realms, eventually guiding him to refuge.",
    nextIds: ['lore-carpo-sanctuary']
  },
  'lore-carpo-sanctuary': {
    id: 'lore-carpo-sanctuary',
    arc: 'sanctuary',
    step: '3 (Merge)',
    title: "Sanctuary in Exile: How Brutus & Zahra Took Carpo In",
    shortTitle: "Sanctuary in Exile",
    era: "Post-Rescue Healing Era",
    characterIds: ['carpo', 'brutus', 'zahra'],
    summary: "Sheltered in their rebuilt castle haven, Carpo heals and teaches macro growth arts, yet departs out of unresolved tension with Brutus and reverence for Zahra.",
    precededLinks: [
      { sourceId: 'lore-carpo-curse-broken', label: "Carpo's Crucible" },
      { sourceId: 'lore-brutus-zahra-tragedy', label: "Haven Hosts (Brutus & Zahra)" }
    ],
    nextIds: ['lore-sanctuary-trio']
  },
  'lore-sanctuary-trio': {
    id: 'lore-sanctuary-trio',
    arc: 'sanctuary',
    step: '4 (Haven)',
    title: "The Sanctuary Trio & Carpo's Validated Fear",
    shortTitle: "The Sanctuary Trio",
    era: "Post-Revelation Macro Era",
    characterIds: ['kainek', 'brutus', 'zahra', 'carpo'],
    summary: "Kai'nek joins Brutus and Zahra in deep reciprocal love—validating Carpo's agony of intrusion and fueling Carpo's bitter secret disdain for the sovereign.",
    precededLinks: [
      { sourceId: 'lore-carpo-sanctuary', label: "Castle Refuge" },
      { sourceId: 'lore-kainek-philosophy', label: "Kai'nek's Sovereign Philosophy" }
    ],
    nextIds: []
  },

  // --- External Affiliates & Calamities ---
  'lore-regal-origin': {
    id: 'lore-regal-origin',
    arc: 'affiliates',
    step: '1',
    title: "Primal Awakening & The Horned Devastator",
    shortTitle: "Regal's Awakening",
    era: "Primal Solitary Conquest (35 + 30)",
    associated: true,
    characterIds: ['regal'],
    summary: "Carrying 35 years of undetermined lived experience, Regal wakes already massive, spending 30 years conquering worlds alone before joining the Order for 5 years.",
    nextIds: ['lore-regal-first-contact']
  },
  'lore-regal-first-contact': {
    id: 'lore-regal-first-contact',
    arc: 'affiliates',
    step: '2',
    title: "First Contact & The Verified Extermination",
    shortTitle: "Regal's Contract",
    era: "Multiversal Convergence (5 yrs)",
    associated: true,
    characterIds: ['regal', 'carpo', 'kainek'],
    summary: "Carpo approaches bare to build primal trust; diagnostic heartbeat sensors prove high-tech gear leaves zero survivors, sealing Regal's 5-year Order covenant.",
    nextIds: [],
    crossLinks: [
      { targetId: 'lore-order-affiliates', label: 'Order Covenant' }
    ]
  },
  'lore-rathen-origin': {
    id: 'lore-rathen-origin',
    arc: 'affiliates',
    step: '1',
    title: "The Failed Bio-Weapon: Origin, Rampage & Impact",
    shortTitle: "Rathen: Bio-Weapon",
    era: "Galactic Rampage to Crustal Slumber",
    associated: true,
    characterIds: ['rathen'],
    summary: "Rapidly adapting bio-weapon outsmarts control implants and devastates worlds for 30 years before a supernova blast casts him into deep crustal slumber.",
    nextIds: ['lore-order-rathen-observation']
  },
  'lore-order-rathen-observation': {
    id: 'lore-order-rathen-observation',
    arc: 'affiliates',
    step: '2',
    title: "Keen Interest Across the Veil: Observation of Rathen",
    shortTitle: "Observing Rathen",
    era: "Post-Awakening Surveillance (Current Era)",
    associated: true,
    characterIds: ['kainek', 'rathen'],
    summary: "Awakening unprompted after 66 million years, Rathen's cunning pride and adaptive mind intrigue Kai'nek as an ideal prospective recruit.",
    nextIds: [],
    crossLinks: [
      { targetId: 'lore-order-affiliates', label: 'Prospective Outreach' }
    ]
  },
  'lore-isolated-three-telemetry': {
    id: 'lore-isolated-three-telemetry',
    arc: 'affiliates',
    step: 'Telemetry',
    title: "The Unaware Frontline: Lab Lovers & Abrax",
    shortTitle: "Lab Lovers & Abrax",
    era: "Current Cosmic Telemetry",
    associated: true,
    characterIds: ['eidos', 'rhidos', 'abrax', 'kainek'],
    summary: "Lab lovers Eidos & Rhidos and slumber-awakened Abrax rampage across isolated realms unaware of Kai'nek's surveillance prior to future divine offers.",
    nextIds: []
  },
  'lore-phya-independent-deity': {
    id: 'lore-phya-independent-deity',
    arc: 'affiliates',
    step: 'Autonomous',
    title: "The Solar Sovereign & The Unspoken Truce",
    shortTitle: "Ph'ya: Solar Sovereign",
    era: "Timeless / Primordial",
    characterIds: ['phya', 'carpo', 'kainek'],
    summary: "Autonomous primordial solar deity of infinite age befriends Carpo against orders, aids his refuge, and maintains an unspoken non-aggression truce with Kai'nek.",
    nextIds: [],
    crossLinks: [
      { targetId: 'lore-carpo-curse-broken', label: "Aided Carpo's Refuge" },
      { targetId: 'lore-order-affiliates', label: 'Autonomous Accord' }
    ]
  }
};

const STORYLINE_LANES = [
  {
    id: 'order',
    name: 'The Order: Institutional Core & Operations',
    shortName: 'The Order & Operations',
    icon: '⚔️',
    themeColor: '#38bdf8',
    description: "Kai'nek's informal tactical brotherhood of ascended titans, target selection doctrines, external affiliate network, and futuristic combat gear.",
    layout: 'linear',
    nodeIds: ['lore-order-pact', 'lore-order-targets', 'lore-order-affiliates', 'lore-order-armor']
  },
  {
    id: 'kainek',
    name: "Kai'nek: Primordial Genesis & Sovereign Philosophy",
    shortName: "Kai'nek Genesis",
    icon: '🐍',
    themeColor: '#a855f7',
    description: 'Awakening into eternity without origin memories, demiurge complex, temporary tail buffering mechanics, and code of never brainwashing peers.',
    layout: 'linear',
    nodeIds: ['lore-kainek-origin', 'lore-kainek-philosophy']
  },
  {
    id: 'sanctuary',
    name: 'The Sanctuary Saga: Exile, Haven & The Trio',
    shortName: 'Sanctuary Saga',
    icon: '🏰',
    themeColor: '#ec4899',
    description: 'Two tragic paths (the 150-year dragon/Enfield conflict and Carpo’s 2,100-year soldier crucible) merging into castle sanctuary healing and the haven trio.',
    layout: 'fork-merge',
    branches: [
      { id: 'branch-lovers', label: 'Court Betrayal & The 150-Year Conflict', nodeIds: ['lore-brutus-zahra-origins', 'lore-brutus-zahra-tragedy'] },
      { id: 'branch-carpo', label: "Carpo's 2,100-Year Soldier Crucible", nodeIds: ['lore-carpo-curse-broken'] }
    ],
    mergedNodeIds: ['lore-carpo-sanctuary', 'lore-sanctuary-trio']
  },
  {
    id: 'carnak',
    name: "Carnak: The Twisted Sobek (Personal Origin)",
    shortName: "Carnak Origin",
    icon: '🐊',
    themeColor: '#10b981',
    description: "Carnak's personal genesis from residual Sobek power, bottomless hunger, genuine hatred for humanity, and brotherly dynamic with Kai'nek and the titans.",
    layout: 'linear',
    nodeIds: ['lore-carnak-twisted-sobek']
  },
  {
    id: 'affiliates',
    name: 'Contracted Allies & Monitored Calamities',
    shortName: 'External Calamities',
    icon: '🪐',
    themeColor: '#fbbf24',
    description: 'Autonomous deities, solitary conquerors, hyper-evolving bio-weapons, and lab-created behemoths across foreign multiversal realities.',
    layout: 'parallel-tracks',
    tracks: [
      { id: 'track-regal', label: 'Regal Covenant Track', nodeIds: ['lore-regal-origin', 'lore-regal-first-contact'] },
      { id: 'track-rathen', label: 'Rathen Surveillance Track', nodeIds: ['lore-rathen-origin', 'lore-order-rathen-observation'] },
      { id: 'track-telemetry', label: 'Autonomous & Monitored Frontline', nodeIds: ['lore-isolated-three-telemetry', 'lore-phya-independent-deity'] }
    ]
  }
];

class LoreFlowchartModal {
  constructor(drawerManager) {
    this.drawer = drawerManager;
    this.currentTab = 'all';
    this.searchQuery = '';
    this.isExpanded = false;

    this.backdrop = document.getElementById('flowchart-modal-backdrop');
    this.modal = this.backdrop ? this.backdrop.querySelector('.flowchart-modal') : null;
    this.tabsContainer = document.getElementById('flowchart-tabs');
    this.canvasWrapper = document.getElementById('flowchart-canvas-wrapper');
    this.canvas = document.getElementById('flowchart-canvas');
    this.board = document.getElementById('flowchart-board');
    this.svgLayer = document.getElementById('flowchart-svg-layer');
    this.closeBtn = document.getElementById('flowchart-modal-close');
    this.expandBtn = document.getElementById('flowchart-modal-expand-btn');
    this.searchInput = document.getElementById('flowchart-search-input');

    this.init();
  }

  init() {
    if (!this.backdrop || !this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.expandBtn) {
      this.expandBtn.addEventListener('click', () => this.toggleExpand());
    }

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.highlightMatchingNodes();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!this.backdrop.classList.contains('open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
      if ((e.key === 'f' || e.key === 'F') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.toggleExpand();
      }
    });

    window.addEventListener('resize', () => {
      if (this.backdrop.classList.contains('open')) {
        this.renderConnectors();
      }
    });

    window.addEventListener('orientationchange', () => {
      if (this.backdrop.classList.contains('open')) {
        setTimeout(() => this.renderConnectors(), 150);
      }
    });

    if (this.canvasWrapper) {
      this.canvasWrapper.addEventListener('scroll', () => {
        if (this.backdrop.classList.contains('open')) {
          this.renderConnectors();
        }
      }, { passive: true });
    }

    this.renderTabs();
  }

  open(tab = 'all', targetLoreId = null) {
    if (!this.backdrop || !this.modal) return;

    this.currentTab = tab;
    this.backdrop.classList.add('open');
    this.backdrop.setAttribute('aria-hidden', 'false');

    this.renderTabs();
    this.renderLanes();

    if (this.closeBtn) {
      this.closeBtn.focus();
    }

    if (targetLoreId) {
      setTimeout(() => {
        this.scrollToLoreNode(targetLoreId);
      }, 150);
    } else {
      setTimeout(() => {
        this.renderConnectors();
      }, 180);
    }
  }

  close() {
    if (!this.backdrop || !this.backdrop.classList.contains('open')) return;
    this.backdrop.classList.remove('open');
    this.backdrop.setAttribute('aria-hidden', 'true');

    const triggerBtn = document.getElementById('btn-legend-lore-flowchart');
    if (triggerBtn) {
      triggerBtn.focus();
    }
  }

  toggleExpand(forceState = null) {
    if (!this.backdrop || !this.modal) return;
    this.isExpanded = forceState !== null ? forceState : !this.isExpanded;
    this.modal.classList.toggle('expanded', this.isExpanded);
    this.backdrop.classList.toggle('expanded', this.isExpanded);

    if (this.expandBtn) {
      this.expandBtn.title = this.isExpanded ? 'Restore standard size (F)' : 'Expand to full screen (F)';
      const expIcon = this.expandBtn.querySelector('.expand-icon');
      const colIcon = this.expandBtn.querySelector('.collapse-icon');
      if (expIcon) expIcon.style.display = this.isExpanded ? 'none' : 'block';
      if (colIcon) colIcon.style.display = this.isExpanded ? 'block' : 'none';
    }

    setTimeout(() => this.renderConnectors(), 100);
  }

  renderTabs() {
    if (!this.tabsContainer) return;

    const tabs = [
      { id: 'all', icon: '🌌', label: 'Master Flow (All Lanes)' },
      ...STORYLINE_LANES.map(lane => ({
        id: lane.id,
        icon: lane.icon,
        label: lane.shortName
      }))
    ];

    this.tabsContainer.innerHTML = tabs.map(t => `
      <button type="button" class="flowchart-tab-btn ${this.currentTab === t.id ? 'active' : ''}" data-tab="${t.id}">
        <span class="tab-icon">${t.icon}</span>
        <span class="tab-text">${t.label}</span>
      </button>
    `).join('');

    this.tabsContainer.querySelectorAll('.flowchart-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentTab = btn.getAttribute('data-tab');
        this.renderTabs();
        this.renderLanes();
        if (this.canvasWrapper) {
          this.canvasWrapper.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
      });
    });

    const activeBtn = this.tabsContainer.querySelector('.flowchart-tab-btn.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  renderNodeCard(loreId, roleBadge = null) {
    const entry = LORE_FLOWCHART_ENTRIES[loreId];
    if (!entry) return '';

    const characters = window.characters || [];
    const charMap = new Map(characters.map(c => [c.id, c]));

    const charChipsHTML = (entry.characterIds || []).map(cid => {
      const char = charMap.get(cid);
      if (!char) return '';
      return `
        <span class="node-char-chip" title="${char.name}">
          <img src="${char.avatar}" alt="${char.name}" />
          <span>${char.name}</span>
        </span>
      `;
    }).join('');

    const arcThemeMap = {
      order: { label: 'The Order', color: '#38bdf8' },
      carnak: { label: 'Carnak Origin', color: '#10b981' },
      sanctuary: { label: 'Sanctuary Saga', color: '#ec4899' },
      kainek: { label: "Kai'nek Genesis", color: '#a855f7' },
      affiliates: { label: 'External Titan', color: '#fbbf24' }
    };
    const arcMeta = arcThemeMap[entry.arc] || { label: 'Lore', color: '#94a3b8' };

    const precededLinksHTML = (entry.precededLinks || []).map(pl => `
      <span class="node-crossover-link in" data-jump-to="${pl.sourceId}" title="Preceded by: ${pl.label}">
        ⬅ ${pl.label}
      </span>
    `).join('');

    const crossLinksHTML = (entry.crossLinks || []).map(cl => `
      <span class="node-crossover-link out" data-jump-to="${cl.targetId}" title="Links to: ${cl.label}">
        🔗 ${cl.label} ➔
      </span>
    `).join('');

    const allShortcutsHTML = (precededLinksHTML || crossLinksHTML) ? `
      <div class="node-cross-links-row">
        ${precededLinksHTML}
        ${crossLinksHTML}
      </div>
    ` : '';

    return `
      <div class="flowchart-node ${entry.associated ? 'associated' : ''}" data-lore-id="${entry.id}" tabindex="0" role="button" aria-label="Open lore entry: ${entry.title}">
        <div class="node-top-bar">
          <span class="node-arc-badge" style="border-color:${arcMeta.color}44; color:${arcMeta.color};">
            ${roleBadge || arcMeta.label}
          </span>
          <span class="node-seq-badge">Step ${entry.step}</span>
        </div>

        <div class="node-title">${entry.title}</div>
        <div class="node-era">⏳ ${entry.era}</div>
        <div class="node-summary">${entry.summary}</div>

        <div class="node-chars-row">
          ${charChipsHTML}
        </div>

        ${allShortcutsHTML}

        <div class="node-footer">
          <span class="node-instruction">Click node to open</span>
          <span class="node-action-pill">
            <span>Read Dossier</span>
            <span class="arrow-indicator">↗</span>
          </span>
        </div>
      </div>
    `;
  }

  renderLanes() {
    if (!this.board) return;

    const visibleLanes = this.currentTab === 'all'
      ? STORYLINE_LANES
      : STORYLINE_LANES.filter(l => l.id === this.currentTab);

    let lanesHTML = '';

    visibleLanes.forEach(lane => {
      let contentHTML = '';

      if (lane.layout === 'linear') {
        const nodesHTML = lane.nodeIds.map(id => this.renderNodeCard(id)).join('');
        const companionsHTML = (lane.companionIds || []).map(id => `
          <div class="companion-wrapper">
            <div class="companion-label">Frontline Vanguard Companion:</div>
            ${this.renderNodeCard(id, 'Vanguard Breaker')}
          </div>
        `).join('');

        contentHTML = `
          <div class="lane-track-row linear-row">
            ${nodesHTML}
            ${companionsHTML}
          </div>
        `;
      } else if (lane.layout === 'fork-merge') {
        const branchRowsHTML = lane.branches.map(branch => `
          <div class="lane-sub-branch">
            <div class="sub-branch-label">${branch.label}</div>
            <div class="lane-track-row branch-row">
              ${branch.nodeIds.map(id => this.renderNodeCard(id)).join('')}
            </div>
          </div>
        `).join('');

        const mergedNodesHTML = lane.mergedNodeIds.map(id => this.renderNodeCard(id, 'Sanctuary Haven')).join('');

        contentHTML = `
          <div class="fork-merge-layout">
            <div class="fork-branches-col">
              ${branchRowsHTML}
            </div>
            <div class="merge-divider-sign">
              <span class="merge-sign-badge">➔ Haven Shelter Convergence ➔</span>
            </div>
            <div class="merge-stream-col">
              <div class="sub-branch-label">Shared Castle Haven & The Haven Trio</div>
              <div class="lane-track-row merge-row">
                ${mergedNodesHTML}
              </div>
            </div>
          </div>
        `;
      } else if (lane.layout === 'parallel-tracks') {
        const tracksHTML = lane.tracks.map(track => `
          <div class="lane-sub-branch">
            <div class="sub-branch-label">${track.label}</div>
            <div class="lane-track-row track-row">
              ${track.nodeIds.map(id => this.renderNodeCard(id)).join('')}
            </div>
          </div>
        `).join('');

        contentHTML = `
          <div class="parallel-tracks-layout">
            ${tracksHTML}
          </div>
        `;
      }

      lanesHTML += `
        <section class="flowchart-swimlane" data-lane="${lane.id}" style="border-left-color: ${lane.themeColor};">
          <div class="lane-header">
            <div class="lane-title-group">
              <span class="lane-icon">${lane.icon}</span>
              <h3 class="lane-title" style="color: ${lane.themeColor};">${lane.name}</h3>
            </div>
            <div class="lane-description">${lane.description}</div>
          </div>
          <div class="lane-body">
            ${contentHTML}
          </div>
        </section>
      `;
    });

    this.board.innerHTML = lanesHTML;

    // Bind click events on lore nodes
    this.board.querySelectorAll('.flowchart-node').forEach(node => {
      const loreId = node.getAttribute('data-lore-id');
      const handleSelect = (e) => {
        // If clicking on a jump crossover link, do not open drawer; jump to card instead
        if (e.target.closest('.node-crossover-link')) return;
        e.stopPropagation();
        this.selectLoreEntry(loreId);
      };

      node.addEventListener('click', handleSelect);
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(e);
        }
      });
    });

    // Bind jump crossover links
    this.board.querySelectorAll('.node-crossover-link[data-jump-to]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = link.getAttribute('data-jump-to');
        this.scrollToLoreNode(targetId);
      });
    });

    // Highlight search matches
    this.highlightMatchingNodes();

    // Re-draw arrows
    setTimeout(() => this.renderConnectors(), 80);
  }

  scrollToLoreNode(targetLoreId) {
    // If target node is in another tab and we are not in 'all', switch to 'all' or that tab
    const entry = LORE_FLOWCHART_ENTRIES[targetLoreId];
    if (entry && this.currentTab !== 'all' && this.currentTab !== entry.arc) {
      this.currentTab = 'all';
      this.renderTabs();
      this.renderLanes();
    }

    setTimeout(() => {
      const targetNode = this.board.querySelector(`.flowchart-node[data-lore-id="${targetLoreId}"]`);
      if (targetNode) {
        targetNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        targetNode.classList.add('node-pulse');
        setTimeout(() => targetNode.classList.remove('node-pulse'), 2500);
      }
    }, 120);
  }

  selectLoreEntry(loreId) {
    if (!loreId) return;

    this.close();

    if (this.drawer) {
      if (typeof this.drawer.showLoreDetail === 'function') {
        this.drawer.showLoreDetail(loreId, true);
      } else {
        this.drawer.showLoreArchive();
        setTimeout(() => {
          const card = this.drawer.contentEl.querySelector(`.lore-card[data-lore-id="${loreId}"]`);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            card.classList.add('highlight-pulse');
            setTimeout(() => card.classList.remove('highlight-pulse'), 2500);
          }
        }, 120);
      }
    }
  }

  highlightMatchingNodes() {
    if (!this.board) return;
    const query = this.searchQuery;

    this.board.querySelectorAll('.flowchart-node').forEach(node => {
      if (!query) {
        node.classList.remove('search-dimmed', 'search-match');
        return;
      }

      const text = node.textContent.toLowerCase();
      if (text.includes(query)) {
        node.classList.add('search-match');
        node.classList.remove('search-dimmed');
      } else {
        node.classList.add('search-dimmed');
        node.classList.remove('search-match');
      }
    });
  }

  renderConnectors() {
    if (!this.svgLayer || !this.board) return;

    const boardWidth = Math.max(this.board.scrollWidth, this.board.offsetWidth);
    const boardHeight = Math.max(this.board.scrollHeight, this.board.offsetHeight);

    this.svgLayer.setAttribute('width', boardWidth);
    this.svgLayer.setAttribute('height', boardHeight);
    this.svgLayer.style.width = boardWidth + 'px';
    this.svgLayer.style.height = boardHeight + 'px';

    const svgRect = this.svgLayer.getBoundingClientRect();

    let pathsHTML = `
      <defs>
        <marker id="flow-arrow-seq" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
        </marker>
        <marker id="flow-arrow-merge" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#ec4899" />
        </marker>
      </defs>
    `;

    // Draw direct sequential connectors inside each lane
    Object.values(LORE_FLOWCHART_ENTRIES).forEach(entry => {
      const sourceNode = this.board.querySelector(`.flowchart-node[data-lore-id="${entry.id}"]`);
      if (!sourceNode) return;

      const r1 = sourceNode.getBoundingClientRect();

      (entry.nextIds || []).forEach(targetId => {
        const targetNode = this.board.querySelector(`.flowchart-node[data-lore-id="${targetId}"]`);
        if (!targetNode) return;

        const r2 = targetNode.getBoundingClientRect();

        // Exact coordinates relative to svgLayer
        const x1 = r1.right - svgRect.left;
        const y1 = r1.top + (r1.height / 2) - svgRect.top;
        const x2 = r2.left - svgRect.left;
        const y2 = r2.top + (r2.height / 2) - svgRect.top;

        const isMerge = entry.arc === 'sanctuary' && targetId === 'lore-carpo-sanctuary';
        const strokeColor = isMerge ? '#ec4899' : '#38bdf8';
        const marker = isMerge ? 'url(#flow-arrow-merge)' : 'url(#flow-arrow-seq)';

        let pathData = '';
        if (x2 > x1) {
          const dx = Math.max(30, (x2 - x1) * 0.45);
          pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        } else {
          // Wrapped connector
          pathData = `M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x1 + 40} ${y2}, ${x2} ${y2}`;
        }

        pathsHTML += `
          <g class="flow-edge-group">
            <path d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="2.5" marker-end="${marker}" opacity="0.85" class="flow-path" />
          </g>
        `;
      });
    });

    this.svgLayer.innerHTML = pathsHTML;
  }
}

window.LoreFlowchartModal = LoreFlowchartModal;
