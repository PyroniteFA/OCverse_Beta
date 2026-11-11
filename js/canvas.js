const THOUGHT_WEIGHTS = {
  rampage: 1.0,
  personal: 0.7,
  relationship: 0.5
};

class RelationshipCanvas {
  constructor(svgElement, onNodeClick, onEdgeClick, onDeselect, onOrderClick) {
    this.svg = svgElement;
    this.onNodeClick = onNodeClick;
    this.onEdgeClick = onEdgeClick;
    this.onDeselect = onDeselect;
    this.onOrderClick = onOrderClick;

    // Viewport transform state scaled for 150px+ nodes with tighter default framing
    this.viewBox = { x: 70, y: -220, width: 1580, height: 1840 };
    this.initialViewBox = { ...this.viewBox };
    this.isPanning = false;
    this.startPan = { x: 0, y: 0 };
    this.activeFilter = 'all';
    this.selectedNodeId = null;
    this.selectedEdgeId = null;
    this.enableSpeechBubbles = true;
    this.enableRandomThoughts = true;
    this.enableAssociatedCharacters = true;
    this.randomThoughtTimer = null;
    this.randomThoughtDismissTimer = null;
    this.activeThoughtSpeakerId = null;
    this.lastThoughtSpeakerId = null;
    this.lastThoughtText = {};
    this.isThoughtHovered = false;

    this.init();
  }

  isAssociatedCharacter(char) {
    if (!char) return false;
    if (char.associated !== undefined) return Boolean(char.associated);
    if (char.isAssociated !== undefined) return Boolean(char.isAssociated);
    if (char.external !== undefined) return Boolean(char.external);
    if (char.guest !== undefined) return Boolean(char.guest);
    if (char.own !== undefined) return !char.own;
    if (char.isOwn !== undefined) return !char.isOwn;
    if (Array.isArray(char.tags)) {
      return char.tags.some(t => typeof t === 'string' && ['associated', 'external', 'guest'].includes(t.toLowerCase()));
    }
    return false;
  }

  getCharacters() {
    return window.characters || [];
  }

  getRelationships() {
    return window.relationships || [];
  }

  init() {
    this.setupDefs();
    this.render();
    this.setupEvents();
    if (this.enableRandomThoughts) {
      this.startRandomThoughts();
    }
  }

  setupDefs() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    defs.innerHTML = `
      <!-- Arrow Markers (orient="auto" with dedicated forward & backward paths) -->
      <marker id="marker-facil" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
      <marker id="marker-friend-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#22c55e" />
      </marker>
      <marker id="marker-friend-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#22c55e" />
      </marker>
      <marker id="marker-lovers-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f43f5e" />
      </marker>
      <marker id="marker-lovers-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#f43f5e" />
      </marker>
      <marker id="marker-obs" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#94a3b8" />
      </marker>
      <marker id="marker-obs-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#94a3b8" />
      </marker>
      <marker id="marker-contracted-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#c084fc" />
      </marker>
      <marker id="marker-contracted-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="9.5" markerHeight="9.5" orient="auto">
        <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#c084fc" />
      </marker>

      <!-- Glow & Shadow Filters -->
      <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="shadow-bubble" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
        <feOffset dx="0" dy="6" result="offsetblur" />
        <feFlood flood-color="#000000" flood-opacity="0.75" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    `;

    this.svg.appendChild(defs);
  }

  render() {
    const existingContent = this.svg.querySelector('#canvas-content');
    if (existingContent) existingContent.remove();

    const container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    container.setAttribute('id', 'canvas-content');

    // 1. Order Core Members Background Hull (Triangle Background)
    this.renderOrderHull(container);

    // 2. Edges Layer
    const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    edgesGroup.setAttribute('id', 'edges-layer');
    this.renderEdges(edgesGroup);
    container.appendChild(edgesGroup);

    // 3. Order Core Members Label Layer (Rendered OVER edges so words and badge always appear above relation lines)
    this.renderOrderLabel(container);

    // 4. Nodes Layer
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('id', 'nodes-layer');
    this.renderNodes(nodesGroup);
    container.appendChild(nodesGroup);

    // 4. Speech Bubbles Layer (Topmost for interactive dialogue callouts)
    const speechGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    speechGroup.setAttribute('id', 'speech-bubbles-layer');
    container.appendChild(speechGroup);

    // 5. Random Thoughts Layer (Topmost for ambient character monologue thoughts)
    const thoughtsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    thoughtsGroup.setAttribute('id', 'random-thoughts-layer');
    container.appendChild(thoughtsGroup);

    this.svg.appendChild(container);
    this.updateViewBox();
    this.updateVisibility();
  }

  renderOrderHull(container) {
    const characters = this.getCharacters();
    const carnak = characters.find(c => c.id === 'carnak');
    const carpo = characters.find(c => c.id === 'carpo');
    const brutus = characters.find(c => c.id === 'brutus');

    if (!carnak || !carpo || !brutus) return;

    // Encompass all three outer Order vertices (Carnak, Carpo, Brutus) with dedicated multi-point crest wraps
    // Top boundary spanning from Carnak to Carpo above their top name labels
    const topY = carnak.canvasPos.y - 145;
    const p1 = `${carnak.canvasPos.x - 80},${topY}`;
    const p2 = `${carpo.canvasPos.x + 80},${topY}`;
    // Carpo outer corner wrap (top-right chamfer, outer flank)
    const p3 = `${carpo.canvasPos.x + 140},${carpo.canvasPos.y - 110}`;
    const p4 = `${carpo.canvasPos.x + 140},${carpo.canvasPos.y + 80}`;
    // Brutus bottom corner wrap (right flank, bottom apex, left flank)
    const p5 = `${brutus.canvasPos.x + 140},${brutus.canvasPos.y + 90}`;
    const p6 = `${brutus.canvasPos.x},${brutus.canvasPos.y + 145}`;
    const p7 = `${brutus.canvasPos.x - 140},${brutus.canvasPos.y + 90}`;
    // Carnak outer corner wrap (lower flank, outer chamfer)
    const p8 = `${carnak.canvasPos.x - 140},${carnak.canvasPos.y + 80}`;
    const p9 = `${carnak.canvasPos.x - 140},${carnak.canvasPos.y - 110}`;

    const hullGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    hullGroup.setAttribute('class', 'order-hull');

    hullGroup.innerHTML = `
      <polygon points="${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7} ${p8} ${p9}" 
               fill="rgba(56, 189, 248, 0.08)" 
               stroke="rgba(56, 189, 248, 0.35)" 
               stroke-width="3" 
               stroke-dasharray="10 8" />
    `;

    container.appendChild(hullGroup);
  }

  renderOrderLabel(container) {
    const characters = this.getCharacters();
    const carnak = characters.find(c => c.id === 'carnak');
    const carpo = characters.find(c => c.id === 'carpo');

    if (!carnak || !carpo) return;

    const topY = carnak.canvasPos.y - 145;
    const centerX = (carnak.canvasPos.x + carpo.canvasPos.x) / 2;
    const centerY = topY;
    const boxW = 470;
    const boxH = 44;

    const labelWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelWrap.setAttribute('class', 'order-hull order-label-wrap');

    labelWrap.innerHTML = `
      <g class="order-territory-label" title="Click to view The Order Core Members lore & roster">
        <rect x="${centerX - boxW / 2}" y="${centerY - boxH / 2}" 
              width="${boxW}" height="${boxH}" rx="22" 
              fill="#0b172a" 
              stroke="rgba(56, 189, 248, 0.65)" 
              stroke-width="2.5" />
        <text x="${centerX}" 
              y="${centerY + 6.5}" 
              fill="#38bdf8" 
              font-size="20" 
              font-weight="900" 
              letter-spacing="0.16em" 
              text-anchor="middle"
              pointer-events="none">
          THE ORDER CORE MEMBERS
        </text>
      </g>
    `;

    const label = labelWrap.querySelector('.order-territory-label');
    if (label) {
      label.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onOrderClick) this.onOrderClick();
      });
    }

    container.appendChild(labelWrap);
  }

  /**
   * Compute display and anchor geometry for a character node on the canvas.
   * Kai'nek renders 20% larger than standard nodes to reflect his sovereign stature.
   */
  getNodeMetrics(char) {
    const scale = char && char.id === 'kainek' ? 1.2 : 1;
    const boxSize = Math.round(150 * scale);
    const half = boxSize / 2;
    const imgSize = boxSize - 2;
    const imgHalf = imgSize / 2;
    const rxOuter = Math.round(24 * scale);
    const rxClip = rxOuter - 2;
    const extraHalf = half - 75;
    return {
      scale,
      boxSize,
      half,
      imgSize,
      imgHalf,
      rxOuter,
      rxClip,
      edgeRadius: 96 + extraHalf,
      traversalOffset: 68 + extraHalf,
      nameLabelY: -(98 + extraHalf),
      livedBadgeY: 104 + extraHalf,
      bubbleTailTipY: -(124 + extraHalf)
    };
  }

  renderEdges(group) {
    const characters = this.getCharacters();
    const relationships = this.getRelationships();
    const charMap = new Map(characters.map(c => [c.id, c]));

    relationships.forEach(rel => {
      const src = charMap.get(rel.source);
      const tgt = charMap.get(rel.target);
      if (!src || !tgt) return;

      const edgeEl = this.createEdgeElement(rel, src.canvasPos, tgt.canvasPos, src, tgt);
      const isAssocEdge = this.isAssociatedCharacter(src) || this.isAssociatedCharacter(tgt);
      if (isAssocEdge) {
        edgeEl.setAttribute('data-associated', 'true');
        edgeEl.classList.add('associated-edge');
        if (!this.enableAssociatedCharacters) {
          edgeEl.classList.add('associated-hidden');
        }
      }
      group.appendChild(edgeEl);
    });
  }

  createEdgeElement(rel, p1, p2, srcChar = null, tgtChar = null) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `graph-edge edge-${rel.type}`);
    g.setAttribute('data-id', rel.id);
    g.setAttribute('data-source', rel.source);
    g.setAttribute('data-target', rel.target);
    g.setAttribute('data-type', rel.type);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    if (len === 0) return g;

    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;

    // Scale parallel line offset proportionally for 150px+ nodes
    const offset = (rel.offset || 0) * 1.5;
    const srcRadius = this.getNodeMetrics(srcChar).edgeRadius;
    const tgtRadius = this.getNodeMetrics(tgtChar).edgeRadius;

    const sx = p1.x + ux * srcRadius + nx * offset;
    const sy = p1.y + uy * srcRadius + ny * offset;
    const tx = p2.x - ux * tgtRadius + nx * offset;
    const ty = p2.y - uy * tgtRadius + ny * offset;

    const pathData = `M ${sx} ${sy} L ${tx} ${ty}`;

    const hitPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hitPath.setAttribute('d', pathData);
    hitPath.setAttribute('stroke', 'transparent');
    hitPath.setAttribute('stroke-width', '36');
    hitPath.setAttribute('fill', 'none');
    hitPath.setAttribute('pointer-events', 'stroke');

    const visPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    visPath.setAttribute('class', 'edge-visible');
    visPath.setAttribute('d', pathData);
    visPath.setAttribute('stroke', rel.color);
    visPath.setAttribute('stroke-width', '4');
    visPath.setAttribute('fill', 'none');
    visPath.setAttribute('stroke-linecap', 'round');

    if (rel.style === 'dashed' || rel.type === 'contracted' || rel.type === 'contract') {
      visPath.setAttribute('stroke-dasharray', '8 6');
    }

    if (rel.type === 'facil') {
      visPath.setAttribute('marker-end', 'url(#marker-facil)');
    } else if (rel.type === 'friendship') {
      visPath.setAttribute('marker-end', 'url(#marker-friend-end)');
      if (rel.bidirectional) {
        visPath.setAttribute('marker-start', 'url(#marker-friend-start)');
      }
    } else if (rel.type === 'lovers') {
      visPath.setAttribute('marker-end', 'url(#marker-lovers-end)');
      if (rel.bidirectional) {
        visPath.setAttribute('marker-start', 'url(#marker-lovers-start)');
      }
    } else if (rel.type === 'observation') {
      visPath.setAttribute('marker-end', 'url(#marker-obs)');
      if (rel.bidirectional) {
        visPath.setAttribute('marker-start', 'url(#marker-obs-start)');
      }
    } else if (rel.type === 'contracted' || rel.type === 'contract') {
      visPath.setAttribute('marker-end', 'url(#marker-contracted-end)');
      if (rel.bidirectional) {
        visPath.setAttribute('marker-start', 'url(#marker-contracted-start)');
      }
    }

    g.appendChild(hitPath);
    g.appendChild(visPath);

    const mx = (sx + tx) / 2;
    const my = (sy + ty) / 2;
    const labelGroup = this.createEdgeLabel(rel, mx, my);
    if (labelGroup) g.appendChild(labelGroup);

    g.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.selectedEdgeId === rel.id) {
        this.resetSelection();
        return;
      }
      this.selectEdge(rel.id);
      if (this.onEdgeClick) this.onEdgeClick(rel);
    });

    return g;
  }

  createEdgeLabel(rel, x, y) {
    const lg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    lg.setAttribute('class', 'edge-label-group');

    let labelText = '';
    let bgColor = 'rgba(15, 23, 42, 0.96)';
    let textColor = '#fff';
    let borderColor = rel.color;

    if (rel.type === 'facil' && rel.modifier) {
      labelText = rel.modifier;
      textColor = '#38bdf8';
    } else if (rel.type === 'friendship') {
      labelText = rel.score || '';
      textColor = '#22c55e';
    } else if (rel.type === 'contracted' || rel.type === 'contract') {
      labelText = rel.modifier || 'Contracted';
      textColor = '#c084fc';
    } else if (rel.symbol) {
      labelText = rel.symbol;
      textColor = '#cbd5e1';
    }

    if (!labelText) return null;

    const isShort = labelText.length <= 2;

    if (isShort) {
      const circleR = 20;
      lg.innerHTML = `
        <circle cx="${x}" cy="${y}" r="${circleR}" 
                fill="${bgColor}" stroke="${borderColor}" stroke-width="2.5" />
        <text x="${x}" y="${y + 7.5}" 
              fill="${textColor}" font-size="22" font-weight="800" 
              text-anchor="middle" pointer-events="none">
          ${labelText}
        </text>
      `;
    } else {
      const paddingX = 18;
      const boxW = Math.max(90, labelText.length * 11 + paddingX * 2);
      const boxH = 34;

      lg.innerHTML = `
        <rect x="${x - boxW / 2}" y="${y - boxH / 2}" 
              width="${boxW}" height="${boxH}" rx="17" 
              fill="${bgColor}" stroke="${borderColor}" stroke-width="2.2" />
        <text x="${x}" y="${y + 6.5}" 
              fill="${textColor}" font-size="18" font-weight="800" 
              text-anchor="middle" pointer-events="none">
          ${labelText}
        </text>
      `;
    }

    return lg;
  }

  renderNodes(group) {
    const characters = this.getCharacters();
    characters.forEach(char => {
      const nodeEl = this.createNodeElement(char);
      group.appendChild(nodeEl);
    });
  }

  createNodeElement(char) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'graph-node');
    g.setAttribute('data-id', char.id);
    const isAssoc = this.isAssociatedCharacter(char);
    if (isAssoc) {
      g.setAttribute('data-associated', 'true');
      g.classList.add('associated-node');
      if (!this.enableAssociatedCharacters) {
        g.classList.add('associated-hidden');
      }
    }
    g.setAttribute('transform', `translate(${char.canvasPos.x}, ${char.canvasPos.y})`);

    const borderColor = char.orderMember ? '#38bdf8' : (isAssoc ? '#c084fc' : '#64748b');
    const borderGlow = char.orderMember ? 'filter="url(#glow-cyan)"' : '';
    const livedText = this.formatLivedExperienceSVG(char);
    const rawDisplay = char.livedExperience.display || '';
    const badgeW = rawDisplay === '∞' ? 100 : Math.max(160, rawDisplay.length * 11 + 40);

    const {
      boxSize,
      half,
      imgSize,
      imgHalf,
      rxOuter,
      rxClip,
      traversalOffset,
      nameLabelY,
      livedBadgeY
    } = this.getNodeMetrics(char);

    // Universe Traversal Glyph (3 Tiers)
    let traversalGlyph = '';
    if (char.universeTraversal === 'effortless') {
      traversalGlyph = `
        <g transform="translate(${traversalOffset}, -${traversalOffset})" class="traversal-badge" title="Effortless Traversal">
          <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#38bdf8" stroke-width="3"/>
          <text x="0" y="7" font-size="20" text-anchor="middle" fill="#fff">🌐</text>
        </g>
      `;
    } else if (char.universeTraversal === 'some_exertion') {
      traversalGlyph = `
        <g transform="translate(${traversalOffset}, -${traversalOffset})" class="traversal-badge" title="Some Exertion (needs a nap)">
          <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#22c55e" stroke-width="2.5" stroke-dasharray="6 4"/>
          <text x="0" y="7" font-size="19" text-anchor="middle" fill="#22c55e">🌐</text>
        </g>
      `;
    } else if (char.universeTraversal === 'great_exertion' || char.universeTraversal === 'exertion') {
      traversalGlyph = `
        <g transform="translate(${traversalOffset}, -${traversalOffset})" class="traversal-badge" title="Great Exertion (knocked out for a day)">
          <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4 4"/>
          <text x="0" y="7" font-size="19" text-anchor="middle" fill="#94a3b8">🌐</text>
        </g>
      `;
    }

    // Square Node with Rounded Corners (150px standard, 180px for Kai'nek)
    g.innerHTML = `
      <defs>
        <clipPath id="clip-${char.id}">
          <rect x="-${imgHalf}" y="-${imgHalf}" width="${imgSize}" height="${imgSize}" rx="${rxClip}" ry="${rxClip}" />
        </clipPath>
      </defs>

      <!-- Glow & Outer Avatar Frame -->
      <rect x="-${half}" y="-${half}" width="${boxSize}" height="${boxSize}" rx="${rxOuter}" ry="${rxOuter}" 
            fill="#0f172a" stroke="${borderColor}" stroke-width="3.5" ${borderGlow} />

      <!-- High-Res Portrait Image -->
      <image href="${char.avatar}" xlink:href="${char.avatar}" x="-${imgHalf}" y="-${imgHalf}" width="${imgSize}" height="${imgSize}" 
             clip-path="url(#clip-${char.id})" preserveAspectRatio="xMidYMid slice" />

      <!-- Top Name Label -->
      <g transform="translate(0, ${nameLabelY})">
        <rect x="-95" y="-19" width="190" height="38" rx="19" 
              fill="rgba(15, 23, 42, 0.96)" stroke="${borderColor}" stroke-width="2"/>
        <text x="0" y="7" text-anchor="middle" fill="#f8fafc" font-size="22" font-weight="800">
          ${char.name}
        </text>
      </g>

      <!-- Traversal Badge -->
      ${traversalGlyph}

      <!-- Bottom Lived Experience Badge -->
      <g transform="translate(0, ${livedBadgeY})">
        <rect x="${-badgeW / 2}" y="-19" width="${badgeW}" height="38" rx="19" 
              fill="rgba(15, 23, 42, 0.96)" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2"/>
        <text x="0" y="7" text-anchor="middle" fill="#cbd5e1" font-size="20" font-weight="700">
          ${livedText}
        </text>
      </g>
    `;

    g.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.selectedNodeId === char.id) {
        this.resetSelection();
        return;
      }
      this.selectNode(char.id);
      if (this.onNodeClick) this.onNodeClick(char);
    });

    g.addEventListener('mouseenter', () => {
      if (!this.selectedNodeId && !this.selectedEdgeId) {
        this.highlightConnected(char.id);
      }
    });

    g.addEventListener('mouseleave', () => {
      if (!this.selectedNodeId && !this.selectedEdgeId) {
        this.clearHighlight();
      }
    });

    return g;
  }

  formatLivedExperienceSVG(char) {
    if (!char || !char.livedExperience) return '';
    const display = char.livedExperience.display || '';
    if (display === '∞') {
      return `<tspan font-size="28" font-weight="900" fill="#fbbf24" dy="2">∞</tspan>`;
    }

    const breakdown = char.livedExperience.breakdown;
    if (breakdown && breakdown.length > 0) {
      const parts = display.split('+').map(p => p.trim());
      if (parts.length === breakdown.length) {
        return parts.map((val, idx) => {
          const isMacro = breakdown[idx].isMacro;
          return isMacro 
            ? `<tspan font-weight="900" fill="#fbbf24">${val}</tspan>`
            : `<tspan fill="#cbd5e1">${val}</tspan>`;
        }).join(' + ');
      }
    }

    const parts = display.split('+').map(p => p.trim());
    if (parts.length > 1) {
      const normalParts = parts.slice(0, -1).map(p => `<tspan fill="#cbd5e1">${p}</tspan>`).join(' + ');
      const macroPart = parts[parts.length - 1];
      return `${normalParts} + <tspan font-weight="900" fill="#fbbf24">${macroPart}</tspan>`;
    }
    return `<tspan fill="#cbd5e1">${display}</tspan>`;
  }

  highlightConnected(charId) {
    const characters = this.getCharacters();
    const char = characters.find(c => c.id === charId);
    const relationships = this.getRelationships();
    const connectedEdges = relationships.filter(r => r.source === charId || r.target === charId);
    const connectedNodeIds = new Set([charId, ...connectedEdges.map(r => r.source === charId ? r.target : r.source)]);

    this.svg.querySelectorAll('.graph-node').forEach(node => {
      const id = node.getAttribute('data-id');
      if (connectedNodeIds.has(id)) {
        node.classList.remove('dimmed');
      } else {
        node.classList.add('dimmed');
      }
    });

    this.svg.querySelectorAll('.graph-edge').forEach(edge => {
      const src = edge.getAttribute('data-source');
      const tgt = edge.getAttribute('data-target');
      if (src === charId || tgt === charId) {
        edge.classList.remove('dimmed');
        edge.classList.add('active');
      } else {
        edge.classList.add('dimmed');
        edge.classList.remove('active');
      }
    });

    const hulls = this.svg.querySelectorAll('.order-hull');
    hulls.forEach(hull => {
      if (char && char.orderMember) {
        hull.classList.remove('dimmed');
      } else {
        hull.classList.add('dimmed');
      }
    });
  }

  clearHighlight() {
    this.svg.querySelectorAll('.graph-node').forEach(n => n.classList.remove('dimmed'));
    this.svg.querySelectorAll('.graph-edge').forEach(e => {
      e.classList.remove('dimmed');
      e.classList.remove('active');
    });
    const hulls = this.svg.querySelectorAll('.order-hull');
    hulls.forEach(hull => {
      hull.classList.remove('dimmed');
    });
  }

  highlightOrder() {
    const characters = this.getCharacters();
    this.selectedNodeId = null;
    this.selectedEdgeId = null;
    this.clearSpeechBubbles();
    this.clearRandomThoughtBubble(false);

    this.svg.querySelectorAll('.graph-node').forEach(node => {
      const id = node.getAttribute('data-id');
      const char = characters.find(c => c.id === id);
      if (char && char.orderMember) {
        node.classList.remove('dimmed');
      } else {
        node.classList.add('dimmed');
      }
    });

    this.svg.querySelectorAll('.graph-edge').forEach(edge => {
      const src = edge.getAttribute('data-source');
      const tgt = edge.getAttribute('data-target');
      const srcChar = characters.find(c => c.id === src);
      const tgtChar = characters.find(c => c.id === tgt);
      if (srcChar && srcChar.orderMember && tgtChar && tgtChar.orderMember) {
        edge.classList.remove('dimmed');
        edge.classList.add('active');
      } else {
        edge.classList.add('dimmed');
        edge.classList.remove('active');
      }
    });

    const hulls = this.svg.querySelectorAll('.order-hull');
    hulls.forEach(hull => {
      hull.classList.remove('dimmed');
    });
  }

  selectNode(charId) {
    this.selectedNodeId = charId;
    this.selectedEdgeId = null;
    this.highlightConnected(charId);
    this.clearSpeechBubbles();

    if (this.enableRandomThoughts) {
      if (this.activeThoughtSpeakerId && this.activeThoughtSpeakerId !== charId) {
        this.clearRandomThoughtBubble(false);
      }
      if (!this.activeThoughtSpeakerId) {
        this.scheduleNextRandomThought(1800);
      }
    }
  }

  selectEdge(edgeId) {
    const relationships = this.getRelationships();
    this.selectedEdgeId = edgeId;
    this.selectedNodeId = null;

    // Immediately clear and suppress any random thoughts while inspecting a relationship
    this.clearRandomThoughtBubble(false);
    this.cancelRandomThoughtTimers();

    const rel = relationships.find(r => r.id === edgeId);
    if (!rel) return;

    this.svg.querySelectorAll('.graph-node').forEach(node => {
      const id = node.getAttribute('data-id');
      if (id === rel.source || id === rel.target) {
        node.classList.remove('dimmed');
      } else {
        node.classList.add('dimmed');
      }
    });

    this.svg.querySelectorAll('.graph-edge').forEach(edge => {
      if (edge.getAttribute('data-id') === edgeId) {
        edge.classList.remove('dimmed');
        edge.classList.add('active');
      } else {
        edge.classList.add('dimmed');
        edge.classList.remove('active');
      }
    });

    const hulls = this.svg.querySelectorAll('.order-hull');
    hulls.forEach(hull => {
      hull.classList.add('dimmed');
    });

    if (this.enableSpeechBubbles) {
      this.renderSpeechBubbles(rel);

      // If dialogue is present or connection is near the right edge, auto-pan so it's not hidden behind the drawer
      if (rel.speechBubbles && rel.speechBubbles.length > 0) {
        this.panToRelationship(rel);
      }
    } else {
      this.clearSpeechBubbles();
    }
  }

  setSpeechBubblesEnabled(enabled) {
    this.enableSpeechBubbles = !!enabled;
    if (!this.enableSpeechBubbles) {
      this.clearSpeechBubbles();
    } else if (this.selectedEdgeId) {
      const relationships = this.getRelationships();
      const rel = relationships.find(r => r.id === this.selectedEdgeId);
      if (rel && rel.speechBubbles && rel.speechBubbles.length > 0) {
        this.renderSpeechBubbles(rel);
        this.panToRelationship(rel);
      }
    }
  }

  panToRelationship(rel) {
    const characters = this.getCharacters();
    const src = characters.find(c => c.id === rel.source);
    const tgt = characters.find(c => c.id === rel.target);
    if (!src || !tgt) return;

    let focusX = (src.canvasPos.x + tgt.canvasPos.x) / 2;
    let focusY = (src.canvasPos.y + tgt.canvasPos.y) / 2;

    if (rel.speechBubbles && rel.speechBubbles.length === 1) {
      const spk = characters.find(c => c.id === rel.speechBubbles[0].speakerId);
      if (spk) {
        focusX = spk.canvasPos.x;
        focusY = spk.canvasPos.y - 100; // Frame bubble above head
      }
    } else if (rel.speechBubbles && rel.speechBubbles.length > 1) {
      const speakers = rel.speechBubbles
        .map(b => characters.find(c => c.id === b.speakerId))
        .filter(c => c && c.canvasPos);
      if (speakers.length > 0) {
        const minX = Math.min(...speakers.map(s => s.canvasPos.x));
        const maxX = Math.max(...speakers.map(s => s.canvasPos.x));
        const minY = Math.min(...speakers.map(s => s.canvasPos.y - 100));
        const maxY = Math.max(...speakers.map(s => s.canvasPos.y));
        focusX = (minX + maxX) / 2;
        focusY = (minY + maxY) / 2;
      }
    }

    // Since drawer opens on the right (taking 480px on desktop, 100vw on mobile), frame focus point
    const isMobile = window.innerWidth <= 768;
    const targetX = Math.max(0, focusX - this.viewBox.width * (isMobile ? 0.5 : 0.38));
    const targetY = Math.max(-60, focusY - this.viewBox.height / 2);

    this.smoothPanTo(targetX, targetY);
  }

  smoothPanTo(targetX, targetY, duration = 300) {
    const startX = this.viewBox.x;
    const startY = this.viewBox.y;
    const dx = targetX - startX;
    const dy = targetY - startY;

    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      this.viewBox.x = targetX;
      this.viewBox.y = targetY;
      this.updateViewBox();
      return;
    }

    const startTime = performance.now();
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      this.viewBox.x = startX + dx * ease;
      this.viewBox.y = startY + dy * ease;
      this.updateViewBox();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  resetSelection() {
    this.selectedNodeId = null;
    this.selectedEdgeId = null;
    this.clearHighlight();
    this.clearSpeechBubbles();
    this.clearRandomThoughtBubble(false);
    if (this.onDeselect) this.onDeselect();
    if (this.enableRandomThoughts) {
      this.scheduleNextRandomThought(2500);
    }
  }

  clearSpeechBubbles(fade = false) {
    const speechLayer = this.svg.querySelector('#speech-bubbles-layer');
    if (!speechLayer) return;

    if (fade) {
      const bubbles = speechLayer.querySelectorAll('.speech-bubble-group');
      if (bubbles.length > 0) {
        bubbles.forEach(b => b.classList.add('fade-out'));
        setTimeout(() => {
          speechLayer.innerHTML = '';
        }, 850);
        return;
      }
    }

    speechLayer.innerHTML = '';
  }

  renderSpeechBubbles(rel) {
    this.clearSpeechBubbles();
    if (!rel || !rel.speechBubbles || !Array.isArray(rel.speechBubbles) || rel.speechBubbles.length === 0) {
      return;
    }

    const speechLayer = this.svg.querySelector('#speech-bubbles-layer');
    if (!speechLayer) return;

    const characters = this.getCharacters();

    rel.speechBubbles.forEach(bubble => {
      const char = characters.find(c => c.id === bubble.speakerId);
      if (!char || !char.canvasPos) return;

      const bubbleEl = this.createSpeechBubbleElement(char, bubble, rel.color || '#22c55e');
      if (bubbleEl) {
        speechLayer.appendChild(bubbleEl);
      }
    });
  }

  wrapSpeechText(text, maxChars = 27) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxChars) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  createSpeechBubbleElement(char, bubble, accentColor) {
    // Outer group holds absolute SVG coordinate translation
    const outerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    outerG.setAttribute('class', 'speech-bubble-group');
    outerG.setAttribute('transform', `translate(${char.canvasPos.x}, ${char.canvasPos.y})`);

    // Inner group handles entrance pop animation without overriding coordinates
    const innerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    innerG.setAttribute('class', 'speech-bubble-inner');
    outerG.appendChild(innerG);

    const lines = this.wrapSpeechText(bubble.text, 27);
    const lineHeight = 24;
    const paddingX = 22;
    const headerH = 20;
    const contentH = lines.length * lineHeight;
    const boxH = headerH + contentH + 20;
    
    const maxLineLen = Math.max(...lines.map(l => l.length), (char.name || '').length + 6);
    const boxW = Math.max(160, Math.min(360, maxLineLen * 10.5 + paddingX * 2));

    const tailTipX = 0;
    const tailTipY = this.getNodeMetrics(char).bubbleTailTipY; // Points down toward the top of character's name badge
    const bubbleGap = 12;
    const boxBottom = tailTipY - bubbleGap; // e.g. -136
    const boxTop = boxBottom - boxH;

    let boxX0 = -boxW / 2;
    let boxX1 = boxW / 2;
    const absLeft = char.canvasPos.x + boxX0;
    const absRight = char.canvasPos.x + boxX1;

    // Viewport clamp between x = 90 and x = 1580
    if (absRight > 1580) {
      const shift = absRight - 1580;
      boxX0 -= shift;
      boxX1 -= shift;
    } else if (absLeft < 90) {
      const shift = 90 - absLeft;
      boxX0 += shift;
      boxX1 += shift;
    }

    const r = 16;
    const tailBaseHalfW = 12;
    const tailBaseCenterX = 0;
    const tL = Math.max(boxX0 + r + 2, Math.min(boxX1 - r - tailBaseHalfW * 2, tailBaseCenterX - tailBaseHalfW));
    const tR = Math.min(boxX1 - r - 2, Math.max(boxX0 + r + tailBaseHalfW * 2, tailBaseCenterX + tailBaseHalfW));

    const pathData = `
      M ${boxX0 + r} ${boxTop}
      L ${boxX1 - r} ${boxTop}
      Q ${boxX1} ${boxTop} ${boxX1} ${boxTop + r}
      L ${boxX1} ${boxBottom - r}
      Q ${boxX1} ${boxBottom} ${boxX1 - r} ${boxBottom}
      L ${tR} ${boxBottom}
      L ${tailTipX} ${tailTipY}
      L ${tL} ${boxBottom}
      L ${boxX0 + r} ${boxBottom}
      Q ${boxX0} ${boxBottom} ${boxX0} ${boxBottom - r}
      L ${boxX0} ${boxTop + r}
      Q ${boxX0} ${boxTop} ${boxX0 + r} ${boxTop}
      Z
    `;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'rgba(15, 23, 42, 0.96)');
    path.setAttribute('stroke', accentColor);
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('filter', 'url(#shadow-bubble)');
    innerG.appendChild(path);

    const centerX = (boxX0 + boxX1) / 2;
    const speakerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    speakerText.setAttribute('x', centerX);
    speakerText.setAttribute('y', boxTop + 20);
    speakerText.setAttribute('text-anchor', 'middle');
    speakerText.setAttribute('fill', accentColor);
    speakerText.setAttribute('font-size', '12');
    speakerText.setAttribute('font-weight', '800');
    speakerText.setAttribute('letter-spacing', '1.2');
    speakerText.textContent = char.name.toUpperCase();
    innerG.appendChild(speakerText);

    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textGroup.setAttribute('x', centerX);
    textGroup.setAttribute('y', boxTop + headerH + 18);
    textGroup.setAttribute('text-anchor', 'middle');
    textGroup.setAttribute('fill', '#f8fafc');
    textGroup.setAttribute('font-size', '16');
    textGroup.setAttribute('font-weight', '600');
    textGroup.setAttribute('font-style', 'italic');

    lines.forEach((line, idx) => {
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('x', centerX);
      if (idx > 0) tspan.setAttribute('dy', lineHeight);
      let formattedLine = line;
      if (idx === 0) formattedLine = `“${formattedLine}`;
      if (idx === lines.length - 1) formattedLine = `${formattedLine}”`;
      tspan.textContent = formattedLine;
      textGroup.appendChild(tspan);
    });

    innerG.appendChild(textGroup);

    outerG.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearSpeechBubbles();
    });

    return outerG;
  }

  /* ==========================================================================
     Random Thoughts Feature
     - Ambient monologue dialogue consistent with character persona & lore
     - Toggleable in legends bar (OFF by default)
     - Suppressed when relationship line is clicked
     - Scoped to character if character is clicked
     - Visible for comfortable reading duration, with at least 5s breaks between
     - Only one character can speak at a time
     ========================================================================== */

  getCharacterAccentColor(char) {
    if (!char) return '#38bdf8';
    if (char.orderMember || (char.affinityTags && char.affinityTags.includes('The Order'))) return '#38bdf8';
    if (char.id === 'phya') return '#fbbf24';
    if (char.id === 'brutus') return '#f97316';
    if (char.id === 'zahra') return '#ec4899';
    if (char.id === 'abrax') return '#a855f7';
    if (char.id === 'eidos' || char.id === 'rhidos') return '#34d399';
    return '#94a3b8';
  }

  setRandomThoughtsEnabled(enabled) {
    this.enableRandomThoughts = !!enabled;
    if (this.enableRandomThoughts) {
      this.startRandomThoughts();
    } else {
      this.stopRandomThoughts();
    }
  }

  startRandomThoughts() {
    this.cancelRandomThoughtTimers();
    this.scheduleNextRandomThought(1500);
  }

  stopRandomThoughts() {
    this.cancelRandomThoughtTimers();
    this.clearRandomThoughtBubble(false);
  }

  scheduleNextRandomThought(delay = 3000) {
    this.cancelRandomThoughtTimers();
    if (!this.enableRandomThoughts) return;

    this.randomThoughtTimer = setTimeout(() => {
      this.triggerRandomThought();
    }, delay);
  }

  cancelRandomThoughtTimers() {
    if (this.randomThoughtTimer) {
      clearTimeout(this.randomThoughtTimer);
      this.randomThoughtTimer = null;
    }
    if (this.randomThoughtDismissTimer) {
      clearTimeout(this.randomThoughtDismissTimer);
      this.randomThoughtDismissTimer = null;
    }
    this.isThoughtHovered = false;
  }

  triggerRandomThought() {
    if (!this.enableRandomThoughts) return;
    if (this.selectedEdgeId) {
      // If a relationship connection is currently active, random thoughts must not occur
      this.scheduleNextRandomThought(3000);
      return;
    }

    const characters = this.getCharacters();
    let candidates = [];

    if (this.selectedNodeId) {
      const selectedChar = characters.find(c => c.id === this.selectedNodeId);
      if (selectedChar && (this.enableAssociatedCharacters || !this.isAssociatedCharacter(selectedChar)) && selectedChar.randomThoughts && selectedChar.randomThoughts.length > 0) {
        candidates = [selectedChar];
      }
    } else {
      candidates = characters.filter(c => {
        if (!this.enableAssociatedCharacters && this.isAssociatedCharacter(c)) return false;
        return c.randomThoughts && c.randomThoughts.length > 0;
      });
    }

    if (candidates.length === 0) {
      this.scheduleNextRandomThought(3000);
      return;
    }

    // Pick character (prevent consecutive duplicate speaker if multiple choices available)
    let chosenChar;
    if (candidates.length > 1) {
      const variedPool = candidates.filter(c => c.id !== this.lastThoughtSpeakerId);
      const pool = variedPool.length > 0 ? variedPool : candidates;
      chosenChar = pool[Math.floor(Math.random() * pool.length)];
    } else {
      chosenChar = candidates[0];
    }

    // Pick thought using weighted random selection (rampage: 1.0, personal: 0.7, relationship: 0.5)
    const thoughts = chosenChar.randomThoughts;
    let chosenThoughtObj;
    if (thoughts.length > 1) {
      const variedThoughts = thoughts.filter(t => {
        const text = typeof t === 'object' ? t.text : t;
        return text !== this.lastThoughtText[chosenChar.id];
      });
      const tPool = variedThoughts.length > 0 ? variedThoughts : thoughts;
      chosenThoughtObj = this.pickWeightedThought(tPool);
    } else {
      chosenThoughtObj = thoughts[0];
    }

    const chosenThought = typeof chosenThoughtObj === 'object' ? chosenThoughtObj.text : chosenThoughtObj;

    this.lastThoughtSpeakerId = chosenChar.id;
    this.lastThoughtText[chosenChar.id] = chosenThought;

    this.showRandomThoughtBubble(chosenChar, chosenThought);
  }

  getThoughtWeight(thought) {
    if (typeof thought === 'object' && thought.category) {
      const cat = thought.category.toLowerCase();
      if (THOUGHT_WEIGHTS[cat] !== undefined) {
        return THOUGHT_WEIGHTS[cat];
      }
    }
    return 1.0;
  }

  pickWeightedThought(thoughtPool) {
    if (!thoughtPool || thoughtPool.length === 0) return null;
    if (thoughtPool.length === 1) return thoughtPool[0];

    const totalWeight = thoughtPool.reduce((sum, t) => sum + this.getThoughtWeight(t), 0);
    if (totalWeight <= 0) return thoughtPool[Math.floor(Math.random() * thoughtPool.length)];

    let rand = Math.random() * totalWeight;
    for (const t of thoughtPool) {
      const weight = this.getThoughtWeight(t);
      if (rand <= weight) {
        return t;
      }
      rand -= weight;
    }
    return thoughtPool[thoughtPool.length - 1];
  }

  showRandomThoughtBubble(char, thought) {
    if (!this.enableRandomThoughts || this.selectedEdgeId) return;

    const thoughtLayer = this.svg.querySelector('#random-thoughts-layer');
    if (!thoughtLayer) return;

    // Clear any previous thought bubble so only one character can speak at a time
    thoughtLayer.innerHTML = '';

    const accentColor = this.getCharacterAccentColor(char);
    const bubbleEl = this.createThoughtBubbleElement(char, thought, accentColor);
    if (!bubbleEl) return;

    thoughtLayer.appendChild(bubbleEl);
    this.activeThoughtSpeakerId = char.id;

    // Reading duration calculation: comfortable natural reading speed + baseline
    const wordCount = thought.trim().split(/\s+/).length;
    // Generous reading allocation: 4.5s baseline for orientation + 360ms per word (~166 WPM), min 7.5s, up to 28s
    const readDuration = Math.max(7500, Math.min(28000, Math.round(4500 + wordCount * 360)));

    if (this.randomThoughtDismissTimer) {
      clearTimeout(this.randomThoughtDismissTimer);
    }

    this.randomThoughtDismissTimer = setTimeout(() => {
      if (!this.isThoughtHovered) {
        this.clearRandomThoughtBubble(true);
      }
    }, readDuration);
  }

  clearRandomThoughtBubble(scheduleNext = false) {
    if (this.randomThoughtDismissTimer) {
      clearTimeout(this.randomThoughtDismissTimer);
      this.randomThoughtDismissTimer = null;
    }
    this.isThoughtHovered = false;

    const thoughtLayer = this.svg.querySelector('#random-thoughts-layer');
    if (thoughtLayer) {
      const activeBubble = thoughtLayer.querySelector('.speech-bubble-group');
      if (activeBubble) {
        // Slowly fade out in place (no upward flying motion)
        activeBubble.classList.add('fade-out');
        setTimeout(() => {
          if (activeBubble.parentNode) activeBubble.parentNode.removeChild(activeBubble);
        }, 850);
      } else {
        thoughtLayer.innerHTML = '';
      }
    }

    this.activeThoughtSpeakerId = null;

    // The 3-second break begins immediately on fade onset, not on complete disappearance
    if (scheduleNext && this.enableRandomThoughts) {
      this.scheduleNextRandomThought(3000);
    }
  }

  createThoughtBubbleElement(char, text, accentColor) {
    const outerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    outerG.setAttribute('class', 'speech-bubble-group thought-bubble-group');
    outerG.setAttribute('transform', `translate(${char.canvasPos.x}, ${char.canvasPos.y})`);

    const innerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    innerG.setAttribute('class', 'speech-bubble-inner');
    outerG.appendChild(innerG);

    const lines = this.wrapSpeechText(text, 28);
    const lineHeight = 24;
    const paddingX = 22;
    const headerH = 22;
    const contentH = lines.length * lineHeight;
    const boxH = headerH + contentH + 20;

    const maxLineLen = Math.max(...lines.map(l => l.length), (char.name || '').length + 12);
    const boxW = Math.max(180, Math.min(380, maxLineLen * 10 + paddingX * 2));

    const bubbleGap = 16;
    const tailTipY = this.getNodeMetrics(char).bubbleTailTipY; // Just above top of character badge
    const boxBottom = tailTipY - bubbleGap; // e.g. -140
    const boxTop = boxBottom - boxH;

    let boxX0 = -boxW / 2;
    let boxX1 = boxW / 2;
    const absLeft = char.canvasPos.x + boxX0;
    const absRight = char.canvasPos.x + boxX1;

    // Viewport clamp between x = 90 and x = 1580
    if (absRight > 1580) {
      const shift = absRight - 1580;
      boxX0 -= shift;
      boxX1 -= shift;
    } else if (absLeft < 90) {
      const shift = 90 - absLeft;
      boxX0 += shift;
      boxX1 += shift;
    }

    // Main rounded rectangle body
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', boxX0);
    rect.setAttribute('y', boxTop);
    rect.setAttribute('width', boxW);
    rect.setAttribute('height', boxH);
    rect.setAttribute('rx', '18');
    rect.setAttribute('ry', '18');
    rect.setAttribute('fill', 'rgba(15, 23, 42, 0.96)');
    rect.setAttribute('stroke', accentColor);
    rect.setAttribute('stroke-width', '2.5');
    rect.setAttribute('filter', 'url(#shadow-bubble)');
    innerG.appendChild(rect);

    // Thought trail circles descending from box bottom toward character
    const trailData = [
      { cx: 0, cy: boxBottom + 5, r: 6 },
      { cx: -4, cy: boxBottom + 13, r: 4.2 },
      { cx: -7, cy: boxBottom + 20, r: 2.8 }
    ];

    trailData.forEach(circleDef => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', circleDef.cx);
      circle.setAttribute('cy', circleDef.cy);
      circle.setAttribute('r', circleDef.r);
      circle.setAttribute('fill', 'rgba(15, 23, 42, 0.96)');
      circle.setAttribute('stroke', accentColor);
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('filter', 'url(#shadow-bubble)');
      innerG.appendChild(circle);
    });

    const centerX = (boxX0 + boxX1) / 2;

    // Thought header badge
    const headerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    headerText.setAttribute('x', centerX);
    headerText.setAttribute('y', boxTop + 20);
    headerText.setAttribute('text-anchor', 'middle');
    headerText.setAttribute('fill', accentColor);
    headerText.setAttribute('font-size', '11');
    headerText.setAttribute('font-weight', '800');
    headerText.setAttribute('letter-spacing', '1.2');
    headerText.textContent = `💭 THOUGHT · ${char.name.toUpperCase()}`;
    innerG.appendChild(headerText);

    // Thought content lines
    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textGroup.setAttribute('x', centerX);
    textGroup.setAttribute('y', boxTop + headerH + 18);
    textGroup.setAttribute('text-anchor', 'middle');
    textGroup.setAttribute('fill', '#f8fafc');
    textGroup.setAttribute('font-size', '15.5');
    textGroup.setAttribute('font-weight', '500');
    textGroup.setAttribute('font-style', 'italic');

    lines.forEach((line, idx) => {
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('x', centerX);
      if (idx > 0) tspan.setAttribute('dy', lineHeight);
      tspan.textContent = line;
      textGroup.appendChild(tspan);
    });

    innerG.appendChild(textGroup);

    outerG.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearRandomThoughtBubble(true);
    });

    outerG.addEventListener('mouseenter', () => {
      this.isThoughtHovered = true;
      if (this.randomThoughtDismissTimer) {
        clearTimeout(this.randomThoughtDismissTimer);
        this.randomThoughtDismissTimer = null;
      }
    });

    outerG.addEventListener('mouseleave', () => {
      this.isThoughtHovered = false;
      if (this.enableRandomThoughts && this.activeThoughtSpeakerId) {
        if (this.randomThoughtDismissTimer) clearTimeout(this.randomThoughtDismissTimer);
        this.randomThoughtDismissTimer = setTimeout(() => {
          this.clearRandomThoughtBubble(true);
        }, 4500);
      }
    });

    return outerG;
  }

  setAssociatedCharactersEnabled(enabled) {
    this.enableAssociatedCharacters = Boolean(enabled);

    if (!this.enableAssociatedCharacters) {
      const characters = this.getCharacters();
      if (this.selectedNodeId) {
        const char = characters.find(c => c.id === this.selectedNodeId);
        if (this.isAssociatedCharacter(char)) {
          this.resetSelection();
        }
      }
      if (this.selectedEdgeId) {
        const relationships = this.getRelationships();
        const rel = relationships.find(r => r.id === this.selectedEdgeId);
        if (rel) {
          const srcChar = characters.find(c => c.id === rel.source);
          const tgtChar = characters.find(c => c.id === rel.target);
          if (this.isAssociatedCharacter(srcChar) || this.isAssociatedCharacter(tgtChar)) {
            this.resetSelection();
          }
        }
      }
      if (this.activeThoughtSpeakerId) {
        const speaker = characters.find(c => c.id === this.activeThoughtSpeakerId);
        if (this.isAssociatedCharacter(speaker)) {
          this.clearRandomThoughtBubble(false);
        }
      }
      this.clearSpeechBubbles(true);
    }

    this.updateVisibility();
  }

  applyFilter(filterType) {
    this.activeFilter = filterType;
    this.resetSelection();
    this.updateVisibility();
  }

  updateVisibility() {
    const characters = this.getCharacters();
    const relationships = this.getRelationships();
    const charMap = new Map(characters.map(c => [c.id, c]));
    const filterType = this.activeFilter || 'all';

    // 1. Nodes
    this.svg.querySelectorAll('.graph-node').forEach(node => {
      const id = node.getAttribute('data-id');
      const char = charMap.get(id);
      if (!char) return;

      const isAssoc = this.isAssociatedCharacter(char);
      if (isAssoc) {
        if (!this.enableAssociatedCharacters) {
          node.classList.add('associated-hidden');
        } else {
          node.classList.remove('associated-hidden');
        }
      }

      if (filterType === 'all') {
        node.style.display = 'block';
      } else if (filterType === 'order') {
        node.style.display = char.orderMember ? 'block' : 'none';
      } else if (filterType === 'associated') {
        node.style.display = isAssoc ? 'block' : 'none';
      } else {
        const hasRel = relationships.some(r => r.type === filterType && (r.source === char.id || r.target === char.id));
        node.style.display = hasRel ? 'block' : 'none';
      }
    });

    // 2. Edges
    this.svg.querySelectorAll('.graph-edge').forEach(edge => {
      const type = edge.getAttribute('data-type');
      const srcId = edge.getAttribute('data-source');
      const tgtId = edge.getAttribute('data-target');
      const srcChar = charMap.get(srcId);
      const tgtChar = charMap.get(tgtId);

      const isAssocEdge = this.isAssociatedCharacter(srcChar) || this.isAssociatedCharacter(tgtChar);
      if (isAssocEdge) {
        if (!this.enableAssociatedCharacters) {
          edge.classList.add('associated-hidden');
        } else {
          edge.classList.remove('associated-hidden');
        }
      }

      if (filterType === 'all') {
        edge.style.display = 'block';
      } else if (filterType === 'order') {
        const isOrderEdge = srcChar && srcChar.orderMember && tgtChar && tgtChar.orderMember;
        edge.style.display = isOrderEdge ? 'block' : 'none';
      } else if (filterType === 'associated') {
        edge.style.display = isAssocEdge ? 'block' : 'none';
      } else {
        edge.style.display = (filterType === type) ? 'block' : 'none';
      }
    });

    // 3. Order Hull
    const hulls = this.svg.querySelectorAll('.order-hull');
    hulls.forEach(hull => {
      if (filterType === 'all' || filterType === 'order') {
        hull.classList.remove('dimmed');
        hull.style.display = 'block';
      } else {
        hull.classList.add('dimmed');
      }
    });
  }

  setupEvents() {
    let hasMoved = false;

    this.svg.addEventListener('mousedown', (e) => {
      if (e.target.closest('.graph-node') || e.target.closest('.graph-edge') || e.target.closest('.speech-bubble-group') || e.target.closest('.order-territory-label')) return;
      this.isPanning = true;
      hasMoved = false;
      this.startPan = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      const dist = Math.hypot(e.clientX - this.startPan.x, e.clientY - this.startPan.y);
      if (dist > 5) hasMoved = true;
      const dx = (e.clientX - this.startPan.x) * (this.viewBox.width / this.svg.clientWidth);
      const dy = (e.clientY - this.startPan.y) * (this.viewBox.height / this.svg.clientHeight);

      this.viewBox.x -= dx;
      this.viewBox.y -= dy;
      this.startPan = { x: e.clientX, y: e.clientY };
      this.updateViewBox();
    });

    window.addEventListener('mouseup', () => {
      this.isPanning = false;
    });

    this.svg.addEventListener('click', (e) => {
      if (hasMoved) return; // Prevent deselecting when releasing a pan drag
      if (e.target.closest('.graph-node') || e.target.closest('.graph-edge') || e.target.closest('.speech-bubble-group') || e.target.closest('.order-territory-label')) return;
      this.resetSelection();
    });

    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.08 : 0.92;
      this.zoom(zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Touch Event Handling for Mobile & Tablet Devices (Pan & Pinch-to-Zoom)
    let touchStartDist = 0;
    let isTouchPanning = false;
    let touchStartPan = { x: 0, y: 0 };

    this.svg.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (e.target.closest('.graph-node') || e.target.closest('.graph-edge') || e.target.closest('.speech-bubble-group') || e.target.closest('.order-territory-label')) {
          return;
        }
        isTouchPanning = true;
        hasMoved = false;
        touchStartPan = { x: touch.clientX, y: touch.clientY };
      } else if (e.touches.length === 2) {
        isTouchPanning = false;
        hasMoved = true;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isTouchPanning) {
        e.preventDefault();
        const touch = e.touches[0];
        const dist = Math.hypot(touch.clientX - touchStartPan.x, touch.clientY - touchStartPan.y);
        if (dist > 6) hasMoved = true;

        const dx = (touch.clientX - touchStartPan.x) * (this.viewBox.width / this.svg.clientWidth);
        const dy = (touch.clientY - touchStartPan.y) * (this.viewBox.height / this.svg.clientHeight);

        this.viewBox.x -= dx;
        this.viewBox.y -= dy;
        touchStartPan = { x: touch.clientX, y: touch.clientY };
        this.updateViewBox();
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        if (currentDist > 8 && touchStartDist > 8) {
          const factor = touchStartDist / currentDist;
          const midX = (t1.clientX + t2.clientX) / 2;
          const midY = (t1.clientY + t2.clientY) / 2;
          this.zoom(factor, midX, midY);
          touchStartDist = currentDist;
        }
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        isTouchPanning = false;
        touchStartDist = 0;
      } else if (e.touches.length === 1) {
        isTouchPanning = true;
        touchStartPan = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartDist = 0;
      }
    });
  }

  zoom(factor, clientX, clientY) {
    const rect = this.svg.getBoundingClientRect();
    const cursorX = this.viewBox.x + ((clientX - rect.left) / rect.width) * this.viewBox.width;
    const cursorY = this.viewBox.y + ((clientY - rect.top) / rect.height) * this.viewBox.height;

    const newWidth = this.viewBox.width * factor;
    const newHeight = this.viewBox.height * factor;

    if (newWidth < 600 || newWidth > 4500) return;

    this.viewBox.x = cursorX - (cursorX - this.viewBox.x) * factor;
    this.viewBox.y = cursorY - (cursorY - this.viewBox.y) * factor;
    this.viewBox.width = newWidth;
    this.viewBox.height = newHeight;

    this.updateViewBox();
  }

  zoomIn() {
    const center = this.getViewportCenter();
    this.zoom(0.85, center.x, center.y);
  }

  zoomOut() {
    const center = this.getViewportCenter();
    this.zoom(1.15, center.x, center.y);
  }

  resetZoom() {
    this.viewBox = { ...this.initialViewBox };
    this.updateViewBox();
    this.resetSelection();
  }

  getViewportCenter() {
    const rect = this.svg.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  updateViewBox() {
    this.svg.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
  }

  focusCharacter(charId) {
    const characters = this.getCharacters();
    const char = characters.find(c => c.id === charId);
    if (!char) return;

    this.selectNode(charId);
    this.viewBox.x = char.canvasPos.x - this.viewBox.width / 2;
    this.viewBox.y = char.canvasPos.y - this.viewBox.height / 2;
    this.updateViewBox();
  }
}

window.RelationshipCanvas = RelationshipCanvas;
