const CANONICAL_LORE_TAGS = new Set([
  "Kai'nek", "Carnak", "Carpo", "Brutus", "Zahra", "Abrax", "Ph'ya", "Eidos", "Rhidos", "Regal",
  "The Order", "The Sanctuary Trio", "Committed Lovers", "Friendship", "Facilitation", "Observation", "Contracted"
]);

class DrawerManager {
  constructor(drawerElement, canvas) {
    this.drawer = drawerElement;
    this.canvas = canvas;
    this.contentEl = this.drawer.querySelector('.drawer-content');
    this.closeBtn = this.drawer.querySelector('.drawer-close');
    this.expandBtn = this.drawer.querySelector('#drawer-expand-btn');
    this.isExpanded = false;

    this.init();
  }

  getCharacters() {
    const chars = window.characters || [];
    if (this.canvas && !this.canvas.enableAssociatedCharacters) {
      return chars.filter(c => !this.canvas.isAssociatedCharacter(c));
    }
    return chars;
  }

  getRelationships() {
    const rels = window.relationships || [];
    if (this.canvas && !this.canvas.enableAssociatedCharacters) {
      const allChars = window.characters || [];
      const charMap = new Map(allChars.map(c => [c.id, c]));
      return rels.filter(r => {
        const src = charMap.get(r.source);
        const tgt = charMap.get(r.target);
        return !(this.canvas.isAssociatedCharacter(src) || this.canvas.isAssociatedCharacter(tgt));
      });
    }
    return rels;
  }

  getSharedLore() {
    const lores = window.sharedLore || [];
    if (this.canvas && !this.canvas.enableAssociatedCharacters) {
      const allChars = window.characters || [];
      const charMap = new Map(allChars.map(c => [c.id, c]));
      return lores.filter(lore => {
        if (lore.associated) return false;
        if (lore.characterIds && lore.characterIds.some(id => {
          const c = charMap.get(id);
          return c && this.canvas.isAssociatedCharacter(c);
        })) {
          return false;
        }
        return true;
      });
    }
    return lores;
  }

  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    if (this.expandBtn) {
      this.expandBtn.addEventListener('click', () => this.toggleExpand());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if ((e.key === 'f' || e.key === 'F') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (this.drawer.classList.contains('open')) {
          this.toggleExpand();
        }
      }
    });
  }

  toggleExpand(forceState = null) {
    this.isExpanded = forceState !== null ? forceState : !this.isExpanded;
    if (this.isExpanded) {
      this.drawer.classList.add('expanded');
      if (this.expandBtn) {
        this.expandBtn.title = 'Restore standard width (F)';
        const expIcon = this.expandBtn.querySelector('.expand-icon');
        const colIcon = this.expandBtn.querySelector('.collapse-icon');
        if (expIcon) expIcon.style.display = 'none';
        if (colIcon) colIcon.style.display = 'block';
      }
    } else {
      this.drawer.classList.remove('expanded');
      if (this.expandBtn) {
        this.expandBtn.title = 'Expand to full page length (F)';
        const expIcon = this.expandBtn.querySelector('.expand-icon');
        const colIcon = this.expandBtn.querySelector('.collapse-icon');
        if (expIcon) expIcon.style.display = 'block';
        if (colIcon) colIcon.style.display = 'none';
      }
    }
  }

  open() {
    this.drawer.classList.add('open');
  }

  close() {
    this.drawer.classList.remove('open');
    if (this.canvas && (this.canvas.selectedNodeId || this.canvas.selectedEdgeId)) {
      this.canvas.resetSelection();
    }
  }

  getCharacterAccentColor(char) {
    if (!char) return '#38bdf8';
    if (char.orderMember || (char.affinityTags && char.affinityTags.includes('The Order'))) return '#38bdf8';
    if (char.id === 'phya') return '#fbbf24';
    if (char.id === 'zahra') return '#ec4899';
    if (char.id === 'abrax') return '#a855f7';
    if (char.id === 'eidos' || char.id === 'rhidos') return '#34d399';
    return '#94a3b8';
  }

  renderLoreCard(lore, activeChar = null) {
    const characters = this.getCharacters();
    const charMap = new Map(characters.map(c => [c.id, c]));

    const otherChars = (lore.characterIds || [])
      .filter(id => !activeChar || id !== activeChar.id)
      .map(id => charMap.get(id))
      .filter(Boolean);

    const otherCharsHTML = otherChars.length > 0 ? `
      <div class="linked-chars">
        <span>${activeChar ? 'Also tagged:' : 'Characters involved:'}</span>
        ${otherChars.map(oc => `
          <span class="char-mini-pill" data-char-id="${oc.id}">
            <img src="${oc.avatar}" alt="${oc.name}"> ${oc.name}
          </span>
        `).join('')}
      </div>
    ` : '';

    const tagsHTML = (lore.tags || [])
      .filter(t => CANONICAL_LORE_TAGS.has(t))
      .map(t => `<span class="tag-pill" data-tag="${t}">#${t}</span>`)
      .join('');

    return `
      <div class="lore-card" data-lore-id="${lore.id}">
        <div class="lore-card-header">
          <span class="lore-card-title">${lore.title}</span>
          <span class="lore-card-era">${lore.era}</span>
        </div>
        <p class="lore-card-content">${lore.content}</p>
        <div class="tag-pills">${tagsHTML}</div>
        ${otherCharsHTML}
      </div>
    `;
  }

  showCharacter(char) {
    this.open();
    const characters = this.getCharacters();
    const relationships = this.getRelationships();
    const sharedLore = this.getSharedLore();
    const charMap = new Map(characters.map(c => [c.id, c]));

    const taggedLore = sharedLore.filter(l => l.characterIds && l.characterIds.includes(char.id));
    const charRels = relationships.filter(r => r.source === char.id || r.target === char.id);

    // Distinguish between the character's personal arc lore vs collective Order institutional lore
    const orderInstitutionalIds = new Set(['lore-order-pact', 'lore-order-affiliates', 'lore-order-armor']);
    const personalLore = taggedLore.filter(l => !orderInstitutionalIds.has(l.id));
    const orderLore = taggedLore.filter(l => orderInstitutionalIds.has(l.id));

    let timelineHTML = '';
    if (char.livedExperience.breakdown && char.livedExperience.breakdown.length > 0) {
      timelineHTML = char.livedExperience.breakdown.map(stage => `
        <div class="timeline-item ${stage.isMacro ? 'macro' : ''}">
          <span class="label">${stage.label} ${stage.isMacro ? '(Macro)' : ''}</span>
          <span class="val">${stage.value}</span>
        </div>
      `).join('');
    } else {
      timelineHTML = `
        <div class="timeline-item">
          <span class="label">Lived Experience</span>
          <span class="val">${char.livedExperience.display}</span>
        </div>
      `;
    }

    let traversalDesc = 'Standard physical mobility within current reality. Unable to traverse universes on their own.';
    if (char.universeTraversal === 'effortless') {
      traversalDesc = '🌐 <strong>Effortless Traversal:</strong> Crosses universes on their own effortlessly without fatigue.';
    } else if (char.universeTraversal === 'some_exertion') {
      traversalDesc = '🌐 <strong>Some Exertion:</strong> Crosses universes on their own with some exertion (needing to take a nap).';
    } else if (char.universeTraversal === 'great_exertion' || char.universeTraversal === 'exertion') {
      traversalDesc = '🌐 <strong>Great Exertion:</strong> Crosses universes on their own with great exertion (knocked out for one solid day at least).';
    }

    const connsHTML = charRels.map(rel => {
      const isSource = rel.source === char.id;
      const partnerId = isSource ? rel.target : rel.source;
      const partner = charMap.get(partnerId);
      if (!partner) return '';

      let badgeText = rel.typeLabel;
      let badgeBg = 'rgba(255,255,255,0.1)';
      let badgeColor = '#fff';

      if (rel.type === 'facil') {
        badgeText = isSource ? `Rise: ${rel.modifier}` : `Elevated by Kai'nek`;
        badgeBg = 'rgba(56, 189, 248, 0.15)';
        badgeColor = '#38bdf8';
      } else if (rel.type === 'friendship') {
        badgeText = `Friendship (${rel.score})`;
        badgeBg = 'rgba(34, 197, 94, 0.15)';
        badgeColor = '#22c55e';
      } else if (rel.type === 'lovers') {
        badgeText = `Committed Lovers ❤️`;
        badgeBg = 'rgba(244, 63, 94, 0.15)';
        badgeColor = '#f43f5e';
      } else if (rel.type === 'observation') {
        badgeText = rel.bidirectional ? `Mutual Observation (∞)` : (isSource ? `Observes` : `Observed by`);
        badgeBg = 'rgba(148, 163, 184, 0.15)';
        badgeColor = '#94a3b8';
      }

      return `
        <div class="conn-row" data-rel-id="${rel.id}">
          <div class="conn-partner" data-char-id="${partner.id}">
            <img src="${partner.avatar}" alt="${partner.name}">
            <span>${partner.name}</span>
          </div>
          <span class="conn-badge" style="background:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeColor}33;">
            ${badgeText}
          </span>
        </div>
      `;
    }).join('');

    const personalLoreHTML = personalLore.length > 0 
      ? personalLore.map(l => this.renderLoreCard(l, char)).join('')
      : `<p style="font-size:12px; color:var(--text-dim); font-style:italic;">(No individual historical records logged yet)</p>`;

    const orderLoreHTML = orderLore.length > 0
      ? orderLore.map(l => this.renderLoreCard(l, char)).join('')
      : '';

    let randomThoughtsHTML = '';
    if (char.randomThoughts && char.randomThoughts.length > 0) {
      const accentColor = this.getCharacterAccentColor(char);
      randomThoughtsHTML = `
        <div class="section-box" style="border-left: 3px solid ${accentColor}; background: rgba(15, 23, 42, 0.65);">
          <div class="section-label" style="color: ${accentColor}; display:flex; align-items:center; gap:6px;">
            <span>💭</span>
            <span>Character Monologues & Random Thoughts (${char.randomThoughts.length})</span>
          </div>
          <div style="font-size:11.5px; color:var(--text-dim); margin-top:-6px; margin-bottom:6px; font-style:italic;">
            Internal reflections, private convictions, and lived philosophies spoken across planar campaigns.
          </div>
          <div style="display: flex; flex-direction: column; gap: 9px;">
            ${char.randomThoughts.map((thought, idx) => {
              const text = typeof thought === 'object' ? thought.text : thought;
              return `
              <div class="thought-item" style="display: flex; gap: 10px; align-items: flex-start; background: rgba(0, 0, 0, 0.28); padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05);">
                <span class="thought-idx" style="font-size: 11.5px; font-weight: 800; color: ${accentColor}; flex-shrink: 0; min-width: 20px; margin-top: 1px;">#${idx + 1}</span>
                <div class="thought-quote" style="font-size: 13px; font-style: italic; color: #f8fafc; line-height: 1.55;">
                  “${text}”
                </div>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      `;
    }

    this.contentEl.innerHTML = `
      <div class="char-hero">
        <img class="char-hero-avatar" src="${char.avatar}" alt="${char.name}">
        <div class="char-hero-info">
          <div class="char-hero-name">
            ${char.name} 
            ${char.orderMember ? '<span class="brand-tag">The Order</span>' : ''}
            ${(char.associated || char.isAssociated || char.external || char.guest) ? '<span class="brand-tag" style="background: rgba(168, 85, 247, 0.18); color: #c084fc; border-color: rgba(168, 85, 247, 0.4);">Associated</span>' : ''}
          </div>
          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:6px; margin: 4px 0;">
            <span style="font-size:11.5px; font-weight:700; background:rgba(56, 189, 248, 0.18); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.35); padding:2px 8px; border-radius:6px;">${char.species || 'Anthro'}</span>
            <span class="char-hero-title" style="margin:0;">${char.title}</span>
          </div>
          <div class="char-hero-status">${char.archetype}</div>
        </div>
      </div>

      <div class="section-box">
        <div class="section-label">Overview & Bio</div>
        <div class="char-bio-body">
          ${char.bio.split(/\n\s*\n/).filter(Boolean).map(p => `<p class="char-bio-p">${p.trim()}</p>`).join('')}
        </div>
      </div>

      ${char.gearsAndTactics ? `
      <div class="section-box" style="border-left: 3px solid #38bdf8;">
        <div class="section-label" style="color: #38bdf8;">Gears and tactics</div>
        <div class="char-bio-body">
          ${char.gearsAndTactics.split(/\n\s*\n/).filter(Boolean).map(p => `<p class="char-bio-p">${p.trim()}</p>`).join('')}
        </div>
      </div>
      ` : ''}

      <div class="section-box">
        <div class="section-label">Lived Experience Breakdown</div>
        <div class="timeline-list">${timelineHTML}</div>
        <div style="font-size:11.5px; color:#94a3b8; font-style:italic; margin-top:4px;">
          ${char.livedExperience.description}
        </div>
      </div>

      <div class="section-box">
        <div class="section-label">Dimensional Mobility</div>
        <div style="font-size:12px; color:#cbd5e1; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px;">
          ${traversalDesc}
        </div>
      </div>

      ${char.fullArt ? `
      <div class="section-box">
        <div class="section-label">Master Character Artwork</div>
        <div style="border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#000;">
          <a href="${char.fullArt}" target="_blank" title="Click to view full image">
            <img src="${char.fullArt}" alt="${char.name}" style="width:100%; display:block; object-fit:contain; max-height:280px; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
          </a>
        </div>
        <div style="font-size:11px; color:var(--text-dim); text-align:right;">Click image to view high-res in new tab</div>
      </div>
      ` : ''}

      <!-- Personal Arc & Relational History (Positioned higher, prioritizing the individual) -->
      <div class="section-box">
        <div class="section-label">Personal Arc & Relational History (${personalLore.length})</div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${personalLoreHTML}
        </div>
      </div>

      <!-- Character Monologues & Random Thoughts (Documented below lore, above active bonds) -->
      ${randomThoughtsHTML}

      <div class="section-box">
        <div class="section-label">Active Bonds & Dynamics (${charRels.length})</div>
        <div class="conn-list">${connsHTML}</div>
      </div>

      ${orderLore.length > 0 ? `
      <!-- Order Collective Lore (Positioned lower in drawer than personal arc) -->
      <div class="section-box" style="border-left: 3px solid #38bdf8; background: rgba(15, 23, 42, 0.65);">
        <div class="section-label" style="color: #38bdf8; display:flex; justify-content:space-between; align-items:center;">
          <span>The Order: Collective Pact & Combat Gear (${orderLore.length})</span>
          <span class="order-lore-link" style="font-size:10.5px; font-weight:700; color:#38bdf8; cursor:pointer; text-transform:none; letter-spacing:normal;">View Order Core Members ➔</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${orderLoreHTML}
        </div>
      </div>
      ` : ''}
    `;

    this.bindDynamicLinks();
  }

  showRelationship(rel) {
    this.open();
    const characters = this.getCharacters();
    const sharedLore = this.getSharedLore();
    const charMap = new Map(characters.map(c => [c.id, c]));
    const src = charMap.get(rel.source);
    const tgt = charMap.get(rel.target);

    const taggedLore = sharedLore.filter(l => 
      (l.relationshipIds && l.relationshipIds.includes(rel.id)) ||
      (l.characterIds && l.characterIds.includes(rel.source) && l.characterIds.includes(rel.target))
    );

    const orderInstitutionalIds = new Set(['lore-order-pact', 'lore-order-affiliates', 'lore-order-armor']);
    const personalRelLore = taggedLore.filter(l => !orderInstitutionalIds.has(l.id));
    const orderRelLore = taggedLore.filter(l => orderInstitutionalIds.has(l.id));

    let arrowSymbol = '➔';
    let typeName = rel.typeLabel;
    if (rel.bidirectional) arrowSymbol = '⇄';
    if (rel.type === 'lovers') arrowSymbol = '❤️';
    if (rel.type === 'contracted') arrowSymbol = '⚡';

    const tagsHTML = (rel.tags || []).filter(t => CANONICAL_LORE_TAGS.has(t)).map(t => `<span class="tag-pill" data-tag="${t}">#${t}</span>`).join('');

    const personalRelLoreHTML = personalRelLore.map(l => this.renderLoreCard(l, null)).join('');
    const orderRelLoreHTML = orderRelLore.map(l => this.renderLoreCard(l, null)).join('');

    this.contentEl.innerHTML = `
      <div class="rel-hero">
        <div class="rel-node" data-char-id="${src.id}">
          <img src="${src.avatar}" alt="${src.name}">
          <span>${src.name}</span>
        </div>

        <div class="rel-middle-arrow">
          <span class="arrow-symbol" style="color:${rel.color};">${arrowSymbol}</span>
          <span class="rel-tag-badge" style="background:${rel.color}22; color:${rel.color}; border:1px solid ${rel.color};">
            ${rel.modifier || (rel.score ? `Level ${rel.score}` : typeName)}
          </span>
        </div>

        <div class="rel-node" data-char-id="${tgt.id}">
          <img src="${tgt.avatar}" alt="${tgt.name}">
          <span>${tgt.name}</span>
        </div>
      </div>

      <div class="section-box">
        <div class="section-label">Relationship Classification</div>
        <div style="font-size:15px; font-weight:700; color:${rel.color};">
          ${rel.typeLabel} ${rel.modifier ? `— ${rel.modifier}` : ''}
        </div>
        <p style="font-size:13px; line-height:1.6; color:#cbd5e1;">${rel.summary}</p>
        <div class="tag-pills">${tagsHTML}</div>
      </div>

      ${rel.speechBubbles && rel.speechBubbles.length > 0 ? `
        <div class="section-box" style="border-left: 3px solid ${rel.color}; background: rgba(15, 23, 42, 0.7);">
          <div class="section-label">Dialogue & Voice Excerpt</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${rel.speechBubbles.map(b => {
              const spk = characters.find(c => c.id === b.speakerId);
              const spkName = spk ? spk.name : b.speakerId;
              const spkAvatar = spk ? spk.avatar : '';
              return `
                <div class="rel-dialogue-item" style="display: flex; gap: 12px; align-items: center;">
                  ${spkAvatar ? `<img class="rel-dialogue-avatar" src="${spkAvatar}" style="width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid ${rel.color}; object-fit: cover;" alt="${spkName}">` : ''}
                  <div>
                    <div class="rel-dialogue-speaker" style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${rel.color}; margin-bottom: 2px;">${spkName}</div>
                    <div class="rel-dialogue-text" style="font-size: 13.5px; font-style: italic; color: #f8fafc; line-height: 1.5;">“${b.text}”</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <div class="section-box">
        <div class="section-label">In-Depth Dynamic Details</div>
        <div class="char-bio-body">
          ${rel.details.split(/\n\s*\n/).filter(Boolean).map(p => `<p class="char-bio-p">${p.trim()}</p>`).join('')}
        </div>
      </div>

      <!-- Specific Relationship & Dynamic Lore (Positioned above general Order lore) -->
      ${personalRelLore.length > 0 ? `
      <div class="section-box">
        <div class="section-label">Specific Dynamic & Historical Lore (${personalRelLore.length})</div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${personalRelLoreHTML}
        </div>
      </div>
      ` : ''}

      <!-- Order Institutional Lore (Positioned lower down in drawer for Order relationships) -->
      ${orderRelLore.length > 0 ? `
      <div class="section-box" style="border-left: 3px solid #38bdf8; background: rgba(15, 23, 42, 0.65);">
        <div class="section-label" style="color: #38bdf8; display:flex; justify-content:space-between; align-items:center;">
          <span>The Order: Collective Pact & Combat Gear (${orderRelLore.length})</span>
          <span class="order-lore-link" style="font-size:10.5px; font-weight:700; color:#38bdf8; cursor:pointer; text-transform:none; letter-spacing:normal;">View Order Core Members ➔</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${orderRelLoreHTML}
        </div>
      </div>
      ` : ''}

      ${taggedLore.length === 0 ? `
      <div class="section-box">
        <div class="section-label">Shared Historical Lore & Events (0)</div>
        <p style="font-size:12px; color:var(--text-dim); font-style:italic;">(No direct shared historical records logged yet)</p>
      </div>
      ` : ''}
    `;

    this.bindDynamicLinks();
  }

  showOrderLore() {
    this.open();
    if (this.canvas) {
      this.canvas.highlightOrder();
    }

    const characters = this.getCharacters();
    const sharedLore = this.getSharedLore();
    const orderMembers = characters.filter(c => c.orderMember);

    // Primary Order lore chapters
    const orderLoreIds = ['lore-order-pact', 'lore-order-affiliates', 'lore-order-armor', 'lore-kainek-philosophy', 'lore-carnak-twisted-sobek'];
    const orderLores = sharedLore.filter(l => orderLoreIds.includes(l.id) || (l.tags && l.tags.includes('The Order')));

    const cardsHTML = orderLores.map(lore => this.renderLoreCard(lore, null)).join('');

    this.contentEl.innerHTML = `
      <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(15, 23, 42, 0.92)); border: 1.5px solid rgba(56, 189, 248, 0.45); border-radius: 14px; padding: 18px; margin-bottom: 14px; position:relative; overflow:hidden;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <div class="legend-triangle-badge" style="width:20px; height:20px;"></div>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #38bdf8;">Tactical Pact & Sovereignty</span>
        </div>
        <h2 style="font-size: 22px; font-weight: 800; color: #f8fafc; margin: 0 0 4px 0;">The Order</h2>
        <div style="font-size: 13px; font-weight: 600; color: #38bdf8; margin-bottom: 8px;">The Order Core Members</div>
        <p style="font-size: 12.5px; line-height: 1.6; color: #cbd5e1; margin: 0;">
          An informal tactical pact centered around Kai'nek. Rejecting mindless sycophants and blind worshipers, the cosmic sovereign coordinates chosen, capable peers across the multiverse—outfitting them in bespoke futuristic combat gear and specialized gadgets to assist planetary campaigns, while harvesting life-force energy from worlds they extinguish.
        </p>
      </div>

      <div class="section-box">
        <div class="section-label">Order Core Members Roster (${orderMembers.length} Titans)</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${orderMembers.map(m => `
            <div class="conn-row" data-char-id="${m.id}" style="cursor:pointer;" title="Click to view ${m.name}'s Dossier">
              <div class="conn-partner">
                <img src="${m.avatar}" alt="${m.name}">
                <div>
                  <div style="font-weight:700; color:#f8fafc;">${m.name}</div>
                  <div style="font-size:11px; color:#38bdf8;">${m.archetype}</div>
                </div>
              </div>
              <span class="conn-badge" style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">
                ${m.livedExperience.display}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="section-box" style="border-left: 3px solid #38bdf8;">
        <div class="section-label">Order Foundation Lore & Doctrines (${orderLores.length})</div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${cardsHTML}
        </div>
      </div>

      <div style="text-align:center; padding: 10px 0 16px 0;">
        <button class="tag-pill" data-lore-filter="__all" style="cursor:pointer; padding: 8px 16px; font-weight: 600; font-size: 12px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color);">
          📖 Browse Full Multi-Tagged Lore Archive
        </button>
      </div>
    `;

    this.bindDynamicLinks();
  }

  showLoreArchive(selectedTag = null) {
    this.open();
    const characters = this.getCharacters();
    const sharedLore = this.getSharedLore();
    const charMap = new Map(characters.map(c => [c.id, c]));

    const allTags = Array.from(new Set(sharedLore.flatMap(l => l.tags))).filter(t => CANONICAL_LORE_TAGS.has(t));
    const bondOrder = ['The Order', 'The Sanctuary Trio', 'Committed Lovers', 'Friendship', 'Facilitation', 'Observation'];
    const charTags = characters.map(c => c.name).filter(name => allTags.includes(name));
    const bondTags = bondOrder.filter(b => allTags.includes(b));
    const otherTags = allTags.filter(t => !charTags.includes(t) && !bondTags.includes(t));

    const filteredLore = selectedTag 
      ? sharedLore.filter(l => l.tags.includes(selectedTag))
      : sharedLore;

    const cardsHTML = filteredLore.map(lore => {
      const linkedChars = (lore.characterIds || []).map(id => charMap.get(id)).filter(Boolean);

      return `
        <div class="lore-card" data-lore-id="${lore.id}">
          <div class="lore-card-header">
            <span class="lore-card-title">${lore.title}</span>
            <span class="lore-card-era">${lore.era}</span>
          </div>
          <p class="lore-card-content">${lore.content}</p>
          <div class="tag-pills">
            ${(lore.tags || []).filter(t => CANONICAL_LORE_TAGS.has(t)).map(t => `<span class="tag-pill ${t === selectedTag ? 'active' : ''}" data-lore-filter="${t}">#${t}</span>`).join('')}
          </div>
          <div class="linked-chars" style="margin-top:8px;">
            <span>Characters involved:</span>
            ${linkedChars.map(c => `
              <span class="char-mini-pill" data-char-id="${c.id}">
                <img src="${c.avatar}" alt="${c.name}"> ${c.name}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    this.contentEl.innerHTML = `
      <div style="margin-bottom:8px;">
        <h2 style="font-size:20px; font-weight:700;">Multi-Tagged Lore Archive</h2>
        <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">
          Shared historical events, ascension records, and relational backstories.
        </p>
      </div>

      <div class="section-box">
        <div class="section-label">Browse by Lore Tag ${selectedTag ? `(Active: #${selectedTag})` : ''}</div>
        <div style="margin-bottom:10px;">
          <span class="tag-pill ${!selectedTag ? 'active' : ''}" data-lore-filter="__all" style="font-weight:700;">All Records</span>
        </div>

        <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-dim); margin-bottom:6px; font-weight:700;">
          Characters Involved
        </div>
        <div class="tag-pills" style="margin-bottom:12px;">
          ${charTags.map(tag => `
            <span class="tag-pill ${tag === selectedTag ? 'active' : ''}" data-lore-filter="${tag}">
              #${tag}
            </span>
          `).join('')}
        </div>

        <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-dim); margin-bottom:6px; font-weight:700;">
          Type of Bonds
        </div>
        <div class="tag-pills">
          ${bondTags.map(tag => `
            <span class="tag-pill ${tag === selectedTag ? 'active' : ''}" data-lore-filter="${tag}" style="border-color:rgba(56, 189, 248, 0.35);">
              #${tag}
            </span>
          `).join('')}
          ${otherTags.map(tag => `
            <span class="tag-pill ${tag === selectedTag ? 'active' : ''}" data-lore-filter="${tag}">
              #${tag}
            </span>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        ${cardsHTML}
      </div>
    `;

    this.contentEl.querySelectorAll('[data-lore-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-lore-filter');
        this.showLoreArchive(tag === '__all' ? null : tag);
      });
    });

    this.bindDynamicLinks();
  }

  bindDynamicLinks() {
    const characters = this.getCharacters();
    const relationships = this.getRelationships();

    this.contentEl.querySelectorAll('[data-char-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.getAttribute('data-char-id');
        const char = characters.find(c => c.id === id);
        if (char) {
          if (this.canvas) this.canvas.focusCharacter(id);
          this.showCharacter(char);
        }
      });
    });

    this.contentEl.querySelectorAll('[data-rel-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('[data-char-id]')) return;
        const relId = el.getAttribute('data-rel-id');
        const rel = relationships.find(r => r.id === relId);
        if (rel) {
          if (this.canvas) this.canvas.selectEdge(relId);
          this.showRelationship(rel);
        }
      });
    });

    this.contentEl.querySelectorAll('.tag-pill[data-tag]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const tag = el.getAttribute('data-tag');
        this.showLoreArchive(tag);
      });
    });

    this.contentEl.querySelectorAll('.lore-cross-link[data-lore-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const loreId = el.getAttribute('data-lore-id');
        this.showLoreArchive();
        setTimeout(() => {
          const targetCard = this.contentEl.querySelector(`.lore-card[data-lore-id="${loreId}"]`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('highlight-pulse');
            setTimeout(() => targetCard.classList.remove('highlight-pulse'), 2500);
          }
        }, 80);
      });
    });
    this.contentEl.querySelectorAll('.order-lore-link').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showOrderLore();
      });
    });
  }
}

window.DrawerManager = DrawerManager;
