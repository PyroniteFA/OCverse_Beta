document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('graph-svg');
  const drawerEl = document.getElementById('details-drawer');

  const CanvasClass = window.RelationshipCanvas;
  const DrawerClass = window.DrawerManager;
  const characters = window.characters || [];

  let canvas;
  const drawer = new DrawerClass(drawerEl, null);

  canvas = new CanvasClass(
    svg,
    (char) => drawer.showCharacter(char),
    (rel) => drawer.showRelationship(rel),
    () => drawer.close(),
    () => drawer.showOrderLore()
  );

  drawer.canvas = canvas;

  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        canvas.clearHighlight();
        return;
      }

      const match = characters.find(c => {
        if (!canvas.enableAssociatedCharacters && canvas.isAssociatedCharacter(c)) return false;
        return c.name.toLowerCase().includes(q) || 
          c.title.toLowerCase().includes(q) ||
          (c.affinityTags && c.affinityTags.some(t => t.toLowerCase().includes(q)));
      });

      if (match) {
        canvas.focusCharacter(match.id);
      }
    });
  }

  // Filter dropdown
  const filterSelect = document.getElementById('filter-select');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      if (e.target.value === 'associated' && !canvas.enableAssociatedCharacters) {
        const toggleAssociated = document.getElementById('toggle-associated-characters');
        if (toggleAssociated) toggleAssociated.checked = true;
        canvas.setAssociatedCharactersEnabled(true);
      }
      canvas.applyFilter(e.target.value);
    });
  }

  // Lore Archive Button
  const loreArchiveBtn = document.getElementById('btn-lore-archive');
  if (loreArchiveBtn) {
    loreArchiveBtn.addEventListener('click', () => {
      drawer.showLoreArchive();
    });
  }

  // Zoom Controls
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => canvas.zoomIn());
  document.getElementById('btn-zoom-out')?.addEventListener('click', () => canvas.zoomOut());
  document.getElementById('btn-reset-zoom')?.addEventListener('click', () => canvas.resetZoom());

  // Toggle Speech Bubbles
  const toggleSpeech = document.getElementById('toggle-speech-bubbles');
  if (toggleSpeech) {
    toggleSpeech.addEventListener('change', (e) => {
      canvas.setSpeechBubblesEnabled(e.target.checked);
    });
  }

  // Toggle Random Thoughts
  const toggleRandomThoughts = document.getElementById('toggle-random-thoughts');
  if (toggleRandomThoughts) {
    if (toggleRandomThoughts.checked !== canvas.enableRandomThoughts) {
      canvas.setRandomThoughtsEnabled(toggleRandomThoughts.checked);
    }
    toggleRandomThoughts.addEventListener('change', (e) => {
      canvas.setRandomThoughtsEnabled(e.target.checked);
    });
  }

  // Toggle Associated Characters
  const toggleAssociated = document.getElementById('toggle-associated-characters');
  if (toggleAssociated) {
    if (toggleAssociated.checked !== canvas.enableAssociatedCharacters) {
      canvas.setAssociatedCharactersEnabled(toggleAssociated.checked);
    }
    toggleAssociated.addEventListener('change', (e) => {
      canvas.setAssociatedCharactersEnabled(e.target.checked);
      if (drawer && drawer.drawer.classList.contains('open') && drawer.currentView === 'order') {
        drawer.showOrderLore();
      }
    });
  }

  // Click on "Order Core Members" in Legend
  const legendOrderTerritory = document.getElementById('legend-order-territory');
  if (legendOrderTerritory) {
    legendOrderTerritory.addEventListener('click', () => {
      drawer.showOrderLore();
    });
  }

  // Toggle Legend Collapse
  const legendCard = document.getElementById('legend-card') || document.querySelector('.legend-card');
  const legendHeader = document.getElementById('legend-header') || document.querySelector('.legend-header');
  const legendToggleHint = document.getElementById('legend-toggle-hint');

  const updateLegendHint = (isCollapsed) => {
    if (!legendToggleHint) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      legendToggleHint.textContent = isCollapsed ? 'Legend ▾' : 'Close ▴';
    } else {
      legendToggleHint.textContent = isCollapsed ? 'Click to expand ▾' : 'Click to collapse ▴';
    }
  };

  // Automatically start collapsed on mobile / small screens so it never obstructs the canvas
  if (window.innerWidth <= 768 && legendCard) {
    legendCard.classList.add('collapsed');
    updateLegendHint(true);
  }

  if (legendHeader && legendCard) {
    legendHeader.addEventListener('click', () => {
      const isCollapsed = legendCard.classList.toggle('collapsed');
      updateLegendHint(isCollapsed);
    });
  }

  window.addEventListener('resize', () => {
    if (legendCard) {
      updateLegendHint(legendCard.classList.contains('collapsed'));
    }
  });

  // Acknowledgements, AI & Art Disclosure Modal
  const ackBtn = document.getElementById('btn-acknowledgements');
  const ackBackdrop = document.getElementById('ack-modal-backdrop');
  const ackModal = ackBackdrop ? ackBackdrop.querySelector('.ack-modal') : null;
  const ackExpandBtn = document.getElementById('ack-modal-expand-btn');
  const ackCloseBtn = document.getElementById('ack-modal-close');
  const ackBody = ackBackdrop ? ackBackdrop.querySelector('.ack-modal-body') : null;
  let isAckExpanded = false;

  const toggleAckExpand = (forceState = null) => {
    if (!ackBackdrop || !ackModal) return;
    isAckExpanded = forceState !== null ? forceState : !isAckExpanded;
    ackModal.classList.toggle('expanded', isAckExpanded);
    ackBackdrop.classList.toggle('expanded', isAckExpanded);
    if (ackExpandBtn) {
      ackExpandBtn.title = isAckExpanded ? 'Restore standard width (F)' : 'Expand to full page length (F)';
      const expIcon = ackExpandBtn.querySelector('.expand-icon');
      const colIcon = ackExpandBtn.querySelector('.collapse-icon');
      if (expIcon) expIcon.style.display = isAckExpanded ? 'none' : 'block';
      if (colIcon) colIcon.style.display = isAckExpanded ? 'block' : 'none';
    }
  };

  const openAckModal = () => {
    if (!ackBackdrop) return;
    ackBackdrop.classList.add('open');
    ackBackdrop.setAttribute('aria-hidden', 'false');
    if (ackBody) ackBody.scrollTop = 0;
    if (ackCloseBtn) ackCloseBtn.focus();
  };

  const closeAckModal = () => {
    if (!ackBackdrop || !ackBackdrop.classList.contains('open')) return;
    ackBackdrop.classList.remove('open');
    ackBackdrop.setAttribute('aria-hidden', 'true');
    if (ackBtn) ackBtn.focus();
  };

  if (ackBtn && ackBackdrop) {
    ackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openAckModal();
    });

    if (ackExpandBtn) {
      ackExpandBtn.addEventListener('click', () => toggleAckExpand());
    }

    if (ackCloseBtn) {
      ackCloseBtn.addEventListener('click', closeAckModal);
    }

    ackBackdrop.addEventListener('click', (e) => {
      if (e.target === ackBackdrop) {
        closeAckModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!ackBackdrop.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeAckModal();
      }
      if ((e.key === 'f' || e.key === 'F') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        toggleAckExpand();
      }
    });
  }

  // Ready! Start with the full canvas visible and all characters un-dimmed.
});
