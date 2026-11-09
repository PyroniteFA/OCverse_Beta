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

      const match = characters.find(c => 
        c.name.toLowerCase().includes(q) || 
        c.title.toLowerCase().includes(q) ||
        (c.affinityTags && c.affinityTags.some(t => t.toLowerCase().includes(q)))
      );

      if (match) {
        canvas.focusCharacter(match.id);
      }
    });
  }

  // Filter dropdown
  const filterSelect = document.getElementById('filter-select');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
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
    toggleRandomThoughts.addEventListener('change', (e) => {
      canvas.setRandomThoughtsEnabled(e.target.checked);
    });
  }

  // Click on "Order Membership Territory" in Legend
  const legendOrderTerritory = document.getElementById('legend-order-territory');
  if (legendOrderTerritory) {
    legendOrderTerritory.addEventListener('click', () => {
      drawer.showOrderLore();
    });
  }

  // Toggle Legend Collapse
  const legendHeader = document.querySelector('.legend-header');
  const legendBody = document.querySelector('.legend-body');
  const legendNotes = document.querySelector('.legend-notes');
  if (legendHeader && legendBody) {
    legendHeader.addEventListener('click', () => {
      const isHidden = legendBody.style.display === 'none';
      legendBody.style.display = isHidden ? 'flex' : 'none';
      if (legendNotes) legendNotes.style.display = isHidden ? 'block' : 'none';
    });
  }

  // Ready! Start with the full canvas visible and all characters un-dimmed.
});
