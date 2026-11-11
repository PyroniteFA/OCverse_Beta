/**
 * Pyronite OC Verse - Character Database
 * Character records and dossiers across the multiverse.
 * 
 * Note: External / non-own guest characters can be flagged with `associated: true` (or `isAssociated: true`).
 * They will be controlled by the "Associated characters" toggle on the UI (kept ON for now).
 */

const characters = [
  {
    id: 'kainek',
    name: "Kai'nek",
    species: "Kaiju Cobra",
    title: "Sovereign of the Order / Cosmic Harvester",
    avatar: 'assets/avatars/kainek_v3.png',
    fullArt: 'assets/full_art/kainek_v3.jpg',
    orderMember: true,
    universeTraversal: 'effortless',
    livedExperience: {
      display: '∞',
      raw: '∞',
      breakdown: [
        { label: 'Primordial Genesis', value: '∞', isMacro: true }
      ],
      description: "Infinite lived experience. Exists without remembering his own origin, knowing only what he wants and exploiting it across universes."
    },
    canvasPos: { x: 900, y: 750 },
    bio: `A towering, enigmatic deity-level entity with a red-queen complex who presides as the sovereign architect of the Order. Emanating a terrifying light blue aura, Kai'nek possesses a controllable cool-toned bioluminescent glow visible across his intricate markings, tongue, and intimate anatomy. He came to exist without memory of his own origin; while feeling as old as time itself, he senses that reality unfolded outside and despite of him. Incapable of generating life from scratch, ascending candidates across the multiverse is the closest act of creation available to him.

He operates under a chilling philosophy where efficiency is strictly secondary to personal enjoyment: while technically capable of effortlessly siphoning raw energy from sterile planetary cores or nuclear stars, he finds zero fun in barren power. Instead, he craves the life-force of panicking, dominated lesser beings, finding the terror and collapse of struggling civilizations uniquely 'delicious.' When destroying worlds, he leaves before wiping out every last soul—deriving no artistic thrill from eradicating people huddled in underground bunkers compared to watching everyday routines crumble mid-stride. Strategically, Kai'nek and his Order only target worlds that are unclaimed and unprotected by other macro or deity entities, preferring to focus their campaigns on exploiting planets and civilizations that lack any real ability to mount resistance against him.

When harvesting metropolises, he tears apart city infrastructure while simultaneously siphoning both high-voltage electrical grids and mortal life-forces. As this siphoning occurs, his tails visibly lengthen to channel and store the raw energy within his celestial anatomy; these reserves are not instantly transported to his realm, but are held within him and deposited later when he withdraws to rest in his sovereign sanctum.

He wields high-level psychic dominance—casually reading, editing, and broadcasting into minds across interstellar distances, executing mass manipulation, projecting visceral waking visions, and infiltrating the dream layers of doomed worlds. Depending on his whim, he can forcefully breach mental resistance or demand voluntary surrender. Crucially, Kai'nek strictly adheres to an inviolable personal code: never edit the memories of his Order candidates, peers, or ascended companions. He demands that his circle cooperates with him willingly, deriving zero fun from controlling mindless drones—a moral boundary that explains why he constantly wrestles and negotiates with independent peers like Carpo rather than subjugating them psychically, driven by genuine respect for their authentic will.

In the physical realm, Kai'nek commands devastating telekinesis, effortless spatial phasing through solid matter, the power to relocate massive intact structures across distance, and the ability to warp across dimensions to retrieve physical objects. He consciously explores alternate timelines, retrieving multiversal records and lost histories (though transferring such foreign timeline knowledge into a mortal recipient carries a measurable draining cost). Furthermore, he maintains passive long-range observational sampling over vast populations without continuous active presence, transmitting live sensory feeds directly into the minds of others. Endowed with extreme physical resilience and rapid cellular regeneration, conventional and high-yield weaponry produce zero lasting damage, allowing him to fight at enlarged scale for indefinite periods while shrugging off battlefield trauma. Rejecting groveling worshipers, Kai'nek cultivates chosen titan peers across millennia, crafting an elite pact to make eternity interesting. Beyond his core circle, he also contracts independent physical macro entities who share a craving for destruction, trading incentives, favors, or cosmic knowledge for pledged mortal life energy harvested during their rampages, which he redistributes back to empower them. Kai'nek does not mind joining these rampages directly from time to time, though he gathers their released energy discreetly so as not to divide mortal attention away from the macros as the world's primary immediate threat.`,
    gearsAndTactics: `Deploys encased in dark, bespoke futuristic combat armor equipped with cyan luminescent power conduits, leg harnesses, and an advanced forearm wrist console for multiversal telemetry. Yet unlike his vanguard titans who wield heavy firearms or breaching tools, Kai'nek's mode of attack remains fundamentally grounded in his terrifying innate celestial powers: radiating a crackling light blue aura, tearing through reality with sovereign telekinesis, and phasing effortlessly through incoming artillery and fortified bunkers.

He can relocate intact city blocks across distance or rip down skyscrapers in a gesture, simultaneously siphoning power from municipal power grids and the life-force of panicking populations. As the siphoning takes place, his tails lengthen dramatically to store the surging electrical and vital current, holding the harvest until he deposits it into his home realm during rest. He projects paralyzing psychic visions directly into enemy command networks, effortlessly ignoring conventional and high-yield orbital strikes through near-instant cellular regeneration.

When not employing his exoskeleton, he can freely shed all attire to unleash as a colossal, bioluminescent primordial cobra titan operating at enlarged scale for extended campaigns with untamed celestial ferocity.`,
    randomThoughts: [
      { text: "Mindless worship bores me. Eternity is only bearable with peers who challenge the void.", category: "personal" },
      { text: "Planetary cores and burning stars are overflowing with energy, yet utterly devoid of taste. There is no thrill in feeding on sterile rock—the life force of a panicking, dominated civilization is far more delicious.", category: "rampage" },
      { text: "As their power grids shatter and the life-force surges into me, my tails lengthen with the current. I will hold this vintage within me until I rest in my realm.", category: "rampage" },
      { text: "I could rewrite Carpo's thoughts in a heartbeat, but where is the fun in commanding a hollow drone? I want peers who stand beside me willingly, even when we clash.", category: "relationship" },
      { text: "Enemy minds are open corridors to shatter and rewrite before their artillery even finds its range—yet my circle's memories remain strictly their own. A puppet master has no peers, only toys.", category: "personal" },
      { text: "I slipped through their defensive bunker walls like smoke. Watching their commander realize that solid matter cannot halt telekinesis or celestial will never ceases to amuse me.", category: "rampage" },
      { text: "There is no art in obliterating bunkers. The true beauty of ruin is watching daily routines crumble in an afternoon.", category: "rampage" },
      { text: "I cannot birth life from scratch, yet in ascending them, I sculpt the nearest thing to creation.", category: "personal" },
      { text: "Time unfolded outside of me, indifferent and cold. I simply take what reality offers and bend it to my design.", category: "personal" },
      { text: "Scouting alternate timelines is effortless enough; the true calculation is choosing which multiversal records to pull across, even if imparting that knowledge leaves a heavy drain.", category: "personal" },
      { text: "Sever their transit arteries first. A single sweep across the bridges turns an orderly evacuation into total, beautiful panic.", category: "rampage" },
      { text: "Carpo bristles every time I summon him from his quiet roost, scowling with two millennia of Roman discipline. Most beings cringe before a cosmic sovereign; watching that winged soldier debate me toe-to-toe is sheer delight.", category: "relationship" },
      { text: "I promised the gryphon his peaceful haven far from my harvested wastelands, and I keep my word. A warrior who chooses to dive into the storm under his own conviction hits far harder than any thrall I could ever enslave.", category: "relationship" },
      { text: "When I cast off the exoskeleton, my cool-toned bioluminescent markings ignite against the dark, cloaking the storm clouds in a radiant light blue aura. Let their spotlights scramble to find me—the glow of a primordial cobra sovereign is the only illumination their doomed skies require.", category: "rampage" },
      { text: "Before my vanguards make landfall, I drift through the dream-layers of their sleeping cities, weaving visions of imminent ruin into their subconscious. Waking up in terror is an art form—especially when I broadcast live sensory feeds of their collapsing bastions directly behind their generals' eyelids.", category: "rampage" },
      { text: "Their heavy artillery batteries fired a coordinated salvo dead-center into my chest; the smoke cleared to find my scales already unblemished. Mortal weaponry cannot fathom cellular regeneration of this caliber. To me, a high-yield warhead is nothing more than a warm, passing breeze.", category: "rampage" },
      { text: "I monitor prospective candidates across the multiversal void through passive observational sampling, studying their raw instincts without disturbing a single synapse. My code is non-negotiable: a candidate must earn ascension through their own untainted ambition. If I had to alter a mind to make them worthy, they were never worthy at all.", category: "personal" },
      { text: "I set their tragedy in motion eons ago to forge an avenging vanguard, yet in their sanctuary, it was their devotion that disarmed me. Brutus’s unyielding fire and Zahra’s quiet wisdom pierced my celestial indifference—becoming the only haven in the multiverse where I am welcomed not as a terrifying sovereign, but as their beloved.", category: "relationship" },
      { text: "I know watching me take my place between Brutus and Zahra cut Carpo deep. It was never my intention to hurt him—I genuinely respect the gryphon and value his unbowed spirit. But make no mistake: I am the alpha here. I take what reality offers, and I was never going to withhold myself or walk away from their warmth simply for Carpo's sake.", category: "relationship" }
    ],
    archetype: "Cosmic Architect & Harvester",
    status: "Active Sovereign of the Order"
  },
  {
    id: 'carnak',
    name: 'Carnak',
    species: "Crocodile",
    title: "Vanguard Bulwark of the Order",
    avatar: 'assets/avatars/carnak_v2.png',
    fullArt: 'assets/full_art/carnak_v2.jpg',
    orderMember: true,
    universeTraversal: 'great_exertion',
    livedExperience: {
      display: '150',
      raw: '150',
      breakdown: [
        { label: 'Ascended Titan Era', value: '150 yrs', isMacro: true }
      ],
      description: "150 years of relative lived experience serving as Kai'nek's disciplined 'good soldier' and primary energy harvester."
    },
    canvasPos: { x: 350, y: 580 },
    bio: `A colossal crocodilian behemoth—donning Kai'nek's custom armor for selected operations or unleashing in his raw predatory form—and the premier vanguard soldier of the Order, carrying 150 years of ascended lived experience. Carnak was brought forth from unknown residual power native to his world, with Kai'nek facilitating the components that awakened him—channeling elements equivalent to the ancient deity Sobek and twisting them into a disciplined, devastating force.

Carnak awoke consumed by an intense, bottomless hunger and a cold, deep-seated hatred for humanity, driven by visceral disgust at mortals as squirming, writhing masses. Unlike frenzied beasts driven by blind rage, his hostility is lucid, conscious, and unrelenting: devouring millions in a single day to sate his appetite while methodically funneling vast stores of harvested life-force energy into the Order.

Interpersonally, Carnak maintains a cool, likable 'bro' persona among his titan peers—dependable, relaxed, and refreshingly drama-free, untroubled by complex emotional baggage. He executes Kai'nek's planar campaigns with absolute tactical discipline, taking immense pleasure in the crunch of metropolises while remaining an easygoing comrade to Brutus and Carpo.`,
    gearsAndTactics: `Serves as the Order's heavy frontline physical bruiser. Outfitted in camouflage combat trousers, heavy combat boots, combat gloves, and a webbed tactical chest harness built to withstand titanic kinetic shock.

In battle, he wields a massive, two-handed breaching sledgehammer inscribed with the mockingly polite words 'KNOCK KNOCK' tipped with a heavy pry bar chisel to batter through hardened fortifications, bridges, and city gates before devouring millions with his bone-crushing jaws. Can freely discard all equipment to rampage as a raw, naked crocodilian apex predator.`,
    randomThoughts: [
      { text: "Millions scurrying through concrete canyons... they look like squirming ants, and they taste even better.", category: "rampage" },
      { text: "Sobek's ancient blood flows through my jaws, but this hunger? This hunger is all mine.", category: "personal" },
      { text: "Nothing beats the crunch of a high-rise at dawn. Pure life-force, straight down the gullet.", category: "rampage" },
      { text: "People think I'm angry. I'm not angry at all—I just genuinely despise humanity with every fiber of my being.", category: "personal" },
      { text: "Good fight, good meal, no drama. That’s how an Order soldier gets things done.", category: "personal" },
      { text: "One clean swing of the sledgehammer into their seawall floodgates, and the entire lower district is underwater before they can even sound the sirens. Watching them scramble on rooftops just makes sorting the meal easier.", category: "rampage" },
      { text: "Clamped my jaws around the midsection of their suspension bridge and went into a full death-roll. Four thousand tons of reinforced steel twisted like a soda can, dropping the entire rush-hour grid straight into my gullet.", category: "rampage" }
    ],
    archetype: "Twisted Sobek / Ascended Vanguard Soldier",
    status: "Vanguard Titan of the Order"
  },
  {
    id: 'carpo',
    name: 'Carpo',
    species: "Gryphon",
    title: "Skyward Sentinel of the Order",
    avatar: 'assets/avatars/carpo_v2.png',
    fullArt: 'assets/full_art/carpo_v2.png',
    orderMember: true,
    universeTraversal: 'some_exertion',
    livedExperience: {
      display: '25 + 2100 + 200',
      raw: '25+2100+200',
      breakdown: [
        { label: 'Romanesque Centurion Youth', value: '25 yrs', isMacro: false },
        { label: 'Immortal Soldier Across Cultures', value: '~2100 yrs', isMacro: false },
        { label: 'Post-Rescue Macro Era', value: '200 yrs', isMacro: true }
      ],
      description: "Lived 25 mortal years as an ambitious Romanesque centurion before being killed and cursed; fought as an immortal soldier across nations and cultures for ~2,100 years, growing to love his world before Kai'nek rescued him into a 200-year Macro era spanning multiversal rampages, temporary sanctuary recovery, and Order service."
    },
    canvasPos: { x: 1450, y: 580 },
    bio: `The aerial sentinel of the Order, carrying over two millennia of lived experience: 25 mortal years, ~2,100 years as an immortal wandering soldier, and 200 years of Macro growth. Carpo began life as an ambitious, self-interested warrior who attained the rank of centurion at age 25 before being slain. Bound by forgotten lesser deities to a sadistic two-phase curse, he was granted immortality while biologically frozen with the physical brain of a 25-year-old.

For roughly 2,100 years, he served as a soldier across countless nations, kingdoms, and cultures, gradually maturing into a reasonable, grounded man who grew to deeply love his homeworld. However, the curse's cruel second phase engineered him to become the deities' agent of doom—destined to awaken with an insatiable, frenzied hunger to destroy the very world he loved once mortal memory of those deities faded. Kai'nek tore Carpo across the dimensional veil just before this cataclysm could trigger.

Within his 200-year Macro era, Carpo endured years of blind rampage in a strange realm, decades of multiversal wandering, and temporary sanctuary with Brutus and Zahra where he regained his faculties before deciding to leave out of hesitation and guilt.

Fiercely protective of his autonomy, he now serves the Order under an informal pact while insisting cosmic ruin be kept far from his haven, maintaining an emotionally guarded distance born of centuries of trauma. Across his wanderings, Carpo proved remarkably adept at discovering and befriending like-minded physical macro entities across the cosmos who would not mind rampaging with him—a gift he honed long before Kai'nek revealed himself, and which famously led him to befriend the solar sovereign Ph'ya rather than obeying orders to attack. Consequently, Kai'nek values Carpo as the Order's premier pathfinder and recruiter, relying on his charisma as the friendliest face to bring independent titan allies into association with the Order—notably employing a deliberate modus operandi of approaching unarmored physical macros completely bare with no gears, reserving geared encounters for entities that already field tech or after proving their loyalty.`,
    gearsAndTactics: `Serves as the Order's high-altitude aerial gunner. Equipped with sleek black futuristic combat gear—featuring reinforced armored plating, tactical chest webbing and pouches, elbow and knee guards, talon boots, a glowing neon-green wrist diagnostics interface, and a tactical monocular targeting eyepiece headset.

In combat, Carpo fields macro-scaled titan equivalents of World War II guns and heavy firearms—aerial cannons, anti-materiel artillery, and heavy ballistics—to conduct devastating strafing runs upon cities and defense grids from the clouds. Can freely shed his combat gear and firearms to unleash as a raw, untamed Gryphon beast at will.`,
    randomThoughts: [
      { text: "Twenty-five mortal years as a centurion, two millennia wandering as an immortal sword... yet this armor still feels like home.", category: "personal" },
      { text: "I spent centuries under a cursed hunger that almost consumed the world I loved. I will never surrender my lucidity again.", category: "personal" },
      { text: "My quiet haven lies far from the wastelands Kai'nek carves. That distance is the only thing keeping my peace intact.", category: "personal" },
      { text: "Watching them in the sanctuary from afar... perhaps my withdrawal was for the best, even if the sting remains.", category: "relationship" },
      { text: "The skies of a hundred conquered empires blur together, but the wind against my wings never lies.", category: "personal" },
      { text: "Diving from the stratosphere with wings tucked tight, then snapping them open right above the avenue—the supersonic shockwave alone levels five city blocks.", category: "rampage" },
      { text: "Two thousand years as a soldier taught me where to strike: snap the suspension bridges with my talons, downdraft their airfields with a single wing beat, and the city falls helpless.", category: "rampage" },
      { text: "Catching a thermal draft to stay aloft without burning a drop of stamina. From high above, circling over their panicked skyline is pure predatory exhilaration.", category: "rampage" },
      { text: "Kai'nek tore me through the veil before my curse devoured the world I loved. I owe him my sanity and my wings, but that will never make me an obedient hound to his cosmic whims.", category: "relationship" },
      { text: "The serpent deity could rewrite my mind in a breath, yet he chooses to argue with me like an equal. We butt heads over every campaign, but as long as he respects my boundaries and leaves my haven in peace, I will fly for his Order.", category: "relationship" },
      { text: "Watching Kai'nek bed down in their sanctuary as their beloved third is a bitter dagger between my ribs. I agonized for decades over whether my presence would ruin their love, only for a cosmic serpent to prove that there was room for a third all along—just not for me.", category: "relationship" },
      { text: "I still remember that coastal capital—banking hard through their sea-fog on towering wings, sinking both front talons deep into the copper dome of their parliament, and wrenching the entire roof off with my beak before raking the harbor flat with a single wing-stroke.", category: "rampage" },
      { text: "That hunt over the sprawling skyscraper valley remains etched in my claws. Diving through the updrafts with pure gryphon ferocity, I pinned their flagship dreadnought against their tallest tower with my hind talons, snapped its spine in mid-air, and let out an apex screech that shattered every window for miles.", category: "rampage" },
      { text: "Nothing matched that night run over their fortified mountain redoubt. Locked my combat gear telemetry to the cloud ceiling, leveled the dual macro-scaled aerial cannons strapped across my rig, and unloaded a continuous high-explosive barrage. Watching an entire fortress basin ignite into a sea of craters under disciplined ballistics was sheer perfection.", category: "rampage" },
      { text: "That desert metropolis thought their anti-aircraft radar grid could box me in. I calibrated my monocular eyepiece, feathered my wings at sixty thousand feet, and dropped into a steep supersonic dive—shredding their interceptor squadrons with heavy autocannons before turning their command complex to dust on the pull-up.", category: "rampage" }
    ],
    archetype: "Accursed & Rescued Vanguard",
    status: "Aerial Sentinel of the Order"
  },
  {
    id: 'brutus',
    name: 'Brutus',
    species: "Dragon",
    title: "Dragon Successor & Destroyer of Humanity",
    avatar: 'assets/avatars/brutus_v2.png',
    fullArt: 'assets/full_art/brutus_v2.png',
    orderMember: true,
    universeTraversal: 'great_exertion',
    livedExperience: {
      display: '22 + 150 + 150',
      raw: '22+150+150',
      breakdown: [
        { label: 'Mortal Court Youth', value: '22 yrs', isMacro: false },
        { label: 'Ancestral Deception & Burning Hunger Conflict', value: '150 yrs', isMacro: true },
        { label: 'Sanctuary Macro Era', value: '150 yrs', isMacro: true }
      ],
      description: "22 mortal court years, 150 years fighting under false ancestral guise where a periodic burning hunger forced him to destroy despite his love for Zahra, and 150 years thriving in their reconstructed sanctuary—rampaging for their status quo when Kai'nek calls while mastering external energy drawing."
    },
    canvasPos: { x: 900, y: 1300 },
    bio: `The last surviving dragon of a race erased by humanity, carrying 322 years of lived experience. Rescued as the last dragon egg and kept by the king for status, Brutus grew up as a formidable court warrior, unaware of his heritage. He secretly fell in love with Princess Zahra, but after being caught intimate by court servants, the court blamed Brutus to protect her and the King sentenced him to death.

Escaping during execution escort, he was drawn to his ancestral homeland, where Kai'nek's ancestral apparitions revealed humanity's systematic genocide of dragonkind and imbued Brutus with a periodic burning hunger for destruction. Ascending as an avenging dragon beast, Brutus wiped out the royal court, sparing only Zahra and fleeing into the wilderness.

For the next 150 grueling years, Brutus waged war on humanity, driven by that burning hunger even when it tore violently against his love for Zahra. His devastation was repeatedly held off by Zahra, who offered herself intimately to stay his wrath, even returning after being mortally wounded in his frenzy.

When Zahra finally broke and chose to surrender, Brutus's love eclipsed his vengeance: he laid down his arms to waste away with her, even as the unfulfilled hunger burned and actively harmed him. This ultimate devotion forced Kai'nek to step in, reveal his true form, and strike a new deal: lifting the compulsive burning hunger so Brutus now rampages for their status quo and preserved life when Kai'nek calls upon him (though he still genuinely enjoys rampaging, like the other titans). In his downtime, Brutus spends as much time as possible with Zahra in their sanctuary—a partially modernized rebuild of the old royal castle where they were born and spent their youth.`,
    gearsAndTactics: `Trained and outfitted as the Order's specialized CBRN (Chemical, Biological, Radiological, and Nuclear) warfare expert. Deploys in a heavy, hermetically sealed hazmat-style combat suit, combat boots, reinforced knee pads, and a snouted dual-canister tactical gas mask. Bolted across his chest harness are pressurized chemical filtration and delivery tanks, complemented by tactical pouches loaded with macro-sized toxic smoke and chemical canisters.

In battle, he blankets fortified defenses and underground shelters in dense, suffocating yellow chemical fog to flush out mortal forces before pulverizing the landscape beneath his massive frame. Can freely shed his CBRN suit and canisters to rampage as a raw, untamed dragon titan at will.`,
    randomThoughts: [
      { text: "For one hundred and fifty years that burning hunger tore at my gut, but Zahra’s love was the only thing that kept me anchored.", category: "relationship" },
      { text: "They wiped out my entire dragonkin race for royal pride... stepping on their cities is the least of what they deserve.", category: "rampage" },
      { text: "Our sanctuary castle is quiet today. When Kai'nek calls, I'll gladly unleash hell—for our peace.", category: "personal" },
      { text: "Rampaging alongside Carnak and Carpo... it’s reassuring knowing other titans share this hunger and strength.", category: "relationship" },
      { text: "Kai'nek lifted the burning curse, but the thrill of crushing skyscrapers underfoot? That’s pure dragon blood.", category: "rampage" },
      { text: "Carpo taught me well—drawing ambient energy straight from the air keeps my dragon bulk fueled for hours of non-stop stomping without breaking a sweat.", category: "personal" },
      { text: "A low tail-whip through their financial district levels four city blocks at once. Watching glass and steel shatter under raw dragon scales never gets old.", category: "rampage" },
      { text: "Plant both claws firmly into the boulevard, dig in deep, and plow forward. The entire avenue crumples like parchment beneath my tread.", category: "rampage" },
      { text: "Carpo was terrible at hiding how much he stared at my build—the old soldier would freeze up, look away, and apologize to Zahra like he committed a mortal crime. I told him a dozen times he was family and had nothing to apologize for, but his Roman honor was too stubborn to let him relax.", category: "relationship" },
      { text: "He was so terrified of becoming a third wheel between Zahra and me that he ended up exiling himself from our sanctuary. I hated watching him leave. There was plenty of room in our lives for a giant winged brother, if only he hadn't let his own guilt chase him off.", category: "relationship" }
    ],
    archetype: "Avenging Dragonkin Titan of the Order",
    status: "Ascended Vanguard Destroyer of the Order"
  },
  {
    id: 'zahra',
    name: 'Zahra',
    species: "Enfield with human form",
    title: "Princess & Enfield Counter-Anchor",
    avatar: 'assets/avatars/zahra.png',
    fullArt: 'assets/full_art/zahra.png',
    orderMember: false,
    universeTraversal: 'great_exertion',
    livedExperience: {
      display: '22 + 150 + 150',
      raw: '22+150+150',
      breakdown: [
        { label: 'Mortal Court Youth', value: '22 yrs', isMacro: false },
        { label: 'Angelic Deception Conflict', value: '150 yrs', isMacro: false },
        { label: 'Sanctuary Macro Era', value: '150 yrs', isMacro: true }
      ],
      description: "22 years as a neglected court princess, 150 years countering Brutus's hunger under angelic visions before surrendering to waste away together, and 150 years thriving as his macro anchor in their rebuilt castle sanctuary."
    },
    canvasPos: { x: 1450, y: 1180 },
    bio: `A former royal princess endowed with the secret ancestral gift of the Enfield form, carrying 322 years of lived experience. Neglected in the royal court after her mother died birthing her, and overshadowed by male heirs, Zahra grew up buried in research and books, quietly suppressed when her Enfield form was discovered. She found true connection in a secret romance with Brutus.

When court servants caught them being intimate, the court blamed Brutus, sentencing him to death; after Brutus escaped and returned as an avenging dragon beast who wiped out the court, he spared Zahra. But when she warned a nearby village of his impending attack, an enraged Brutus struck her down and left her to die in the snow. Miraculously healed and resurrected out of sight through angelic visions, Zahra returned to a mournful Brutus, who joyfully embraced her without question.

For 150 years, Zahra endured the agonizing burden of countering his periodic destructive hunger—staying his wrath by offering herself to him intimately, repeatedly regenerating after being mortally wounded in his frenzy—until she confessed her bargain and chose to give up. After Kai'nek stepped in and struck a deal that extinguished Brutus's burning hunger, the couple established their sanctuary in a partially modernized rebuild of the very castle where they were born and spent their youth.

Notably, Zahra is the only figure across the circle who is not the rampaging type; having learned to make peace with her lover's violent actions and turn a blind eye to the planetary destruction he inflicts for Kai'nek, she prioritizes the devotion and quiet haven they share. This profound, non-judgmental acceptance was precisely what suited her to welcome and care for Carpo with deep compassion and zero judgment about his bloody past when the battered Gryphon sought shelter. In their Macro era, Zahra learned from Carpo how to sustain her towering Enfield form by channeling ambient energy, serving as the cherished anchor and sage of their sanctuary.`,
    randomThoughts: [
      { text: "In the royal court, I was hidden away in dusty archives. As an Enfield beside Brutus, I finally found my true horizon.", category: "personal" },
      { text: "Carpo taught us well: true giant strength does not bleed your internal flame, it breathes with the cosmos itself.", category: "personal" },
      { text: "No matter how many times I died in the snow, I would always return to keep Brutus from losing himself to the dark.", category: "relationship" },
      { text: "I am the only one among them who is not the rampaging type. I made my peace with the fire in Brutus long ago and learned to look away from the ash—which is why when Carpo arrived at our castle broken by his own past, I had no judgment to offer him, only shelter.", category: "personal" },
      { text: "I saw how Carpo looked at Brutus—the flustered stammering, the flushed cheeks he tried so hard to hide beneath soldier's discipline. He thought his desire was a betrayal to me, never realizing that after centuries of blood and resurrection, my heart had long since grown past petty possessiveness.", category: "relationship" },
      { text: "Carpo carried such a heavy guilt, terrified that staying in our castle would drive a wedge between Brutus and me. It broke my heart watching him pack his gear and take to the skies; he fled from the very love that would have gladly sheltered him.", category: "relationship" }
    ],
    archetype: "Enfield Shifter & Emotional Anchor",
    status: "Committed Partner & Anchor"
  },
  {
    id: 'abrax',
    name: 'Abrax',
    species: "Reptilian",
    title: "The Awakened Extraterrestrial Colossus",
    avatar: 'assets/avatars/abrax_v2.png',
    fullArt: 'assets/full_art/abrax_v2.png',
    orderMember: false,
    universeTraversal: 'none',
    livedExperience: {
      display: '50 + 1',
      raw: '50+1',
      breakdown: [
        { label: 'Lived Experience from Elsewhere', value: '50 yrs', isMacro: false },
        { label: 'Dormancy on Earth (Unconscious)', value: 'Thousands of yrs', isMacro: false },
        { label: 'Above-Ground Macro Rampage', value: '1 yr', isMacro: true }
      ],
      description: "Carried 50 years of lived experience from elsewhere across the cosmos before falling into Earth in his universe, lying dormant for thousands of years until Kai'nek awakened him into 1 year of above-ground Macro rampaging."
    },
    canvasPos: { x: 620, y: 240 },
    bio: `A primal extraterrestrial reptilian titan, carrying 50 years of lived experience from elsewhere across the cosmos and 1 year of unleashed above-ground Macro rampaging on Earth. Long ago, Abrax fell into Earth within his home universe after decades of life elsewhere, sinking into a deep dormancy that lasted for thousands of years.

His millennia-long slumber ended when Kai'nek orchestrated subtle cosmic shifts to awaken him, recognizing his immense biological potential as an apex candidate. Since waking, Abrax has spent the past year rampaging across the Earth above ground in relentless, solitary dominance.

Endowed with terrifying brute strength, near-impenetrable reptilian scales, rapid growth, rapid controllable digestion, and super production, he pulverizes urban landscapes and crushes all opposition with raw physical power. Primal, aggressive, and fiercely territorial, Abrax demolishes civilizations in solitary fury, completely oblivious to the broader multiverse or the cosmic sovereign observing his path of devastation from across the veil.`,
    randomThoughts: [
      { text: "Fifty cycles across foreign stars, millennia buried in bedrock... now this brittle world belongs to my claws.", category: "personal" },
      { text: "Concrete shatters like chalk under my tread. Let them bring their armies—they only make sweeter fuel.", category: "rampage" },
      { text: "No deities, no masters across this sky. Only the apex predator reclaiming the surface.", category: "personal" },
      { text: "Every skyscraper I plow through only fuels the furnace inside. Their tank divisions fire point-blank into my chest; their shells ricochet into dust while my accelerated growth doubles my stride, crushing their armored columns into paste.", category: "rampage" },
      { text: "Burrowed my claws through four layers of reinforced subterranean bunker steel, ripping the ceiling open like tinfoil. Hiding underground doesn't save a prey species—it just concentrates the feast into a single bowl.", category: "rampage" }
    ],
    archetype: "Awakened Extraterrestrial Colossus",
    status: "Isolated / Under Observation"
  },
  {
    id: 'phya',
    name: "Ph'ya",
    species: "Nagataur",
    title: "Solar Primordial Sovereign",
    avatar: 'assets/avatars/phya.png',
    fullArt: 'assets/full_art/phya.png',
    orderMember: false,
    universeTraversal: 'effortless',
    livedExperience: {
      display: '∞',
      raw: '∞',
      breakdown: [
        { label: 'Primordial Existence', value: '∞', isMacro: true }
      ],
      description: "Infinite lived experience. Existed independently before and outside Kai'nek's influence, keeping his true origins to himself."
    },
    canvasPos: { x: 1180, y: 240 },
    bio: `An autonomous, primordial solar deity of infinite lived experience (∞), crossing universes effortlessly on his own accord completely independent of other cosmic entities. Wielding supreme solar and serpentine power, Ph'ya chooses not to wage wars of multiversal conquest, keeping his true primordial origins entirely to himself.

Instead, he relishes a lavish, hedonistic existence as an untouchable living legend in his home realm, deliberately maintaining his domain at a pre-renaissance technological level so mortal civilizations remain bound to ancient myth and faith. While indifferent to mortal casualties—having casually wiped out millions over eons without remorse—he lacks the unrelenting malice of warmongering titans, preferring pleasure, theatrical divinity, and personal amusement.

He fiercely values true personal autonomy, maintaining an unspoken mutual truce of non-interference with other deities. Bound by mutual respect and independent power, both sovereigns understand the boundaries of each other's realms.`,
    randomThoughts: [
      { text: "Why conquer endless barren universes when you can be worshipped as a living sun in luxury and theatrical splendor?", category: "personal" },
      { text: "Kai'nek knows better than to infringe upon my realm. An unspoken truce keeps celestial company civilized.", category: "relationship" },
      { text: "Mortals rise and fall like desert dust. The only thing truly worth pursuing across infinity is pleasure and autonomy.", category: "personal" },
      { text: "They erected a hundred-meter golden monument to mock the heavens; a single casual breath of condensed solar corona turned it into a puddle of slag, taking six surrounding city plazas with it. The fireworks were simply exquisite.", category: "rampage" },
      { text: "Uncoiling my golden serpentine lower body through their imperial capital, radiating pure thermonuclear heat. The granite roadways liquefied into glass beneath my scales while their armies could do nothing but drop to their knees and weep in awe.", category: "rampage" }
    ],
    archetype: "Localized Solar Deity & Hedonist",
    status: "Autonomous Sovereign"
  },
  {
    id: 'eidos',
    name: 'Eidos',
    species: "Elephant",
    title: "The Pachyderm Crusher",
    avatar: 'assets/avatars/eidos_v2.png',
    fullArt: 'assets/full_art/eidos_v2.png',
    orderMember: false,
    universeTraversal: 'none',
    livedExperience: {
      display: '35 + 1',
      raw: '35+1',
      breakdown: [
        { label: 'Lab/Experimental Life', value: '35 yrs', isMacro: false },
        { label: 'Macro Rampage Era', value: '1 yr', isMacro: true }
      ],
      description: "Equivalent to a 35-year-old human mortal before unleashing 1 year of Macro scale and strength."
    },
    canvasPos: { x: 240, y: 960 },
    bio: `A colossal pachyderm juggernaut and superhuman mortal, possessing 35 years of experimental life and 1 year of rapid Macro rampage. Originating from a catastrophic laboratory experiment gone wrong in an isolated universe, Eidos was transformed into a colossal physical titan endowed with immense destructive might, rapid controllable digestion, super production, and accelerated growth to macro scale.

A ferocious powerhouse in his own right, he pulverizes urban centers and flattens civilizational infrastructure with crushing force. Left to their own devices alongside his life partner Rhidos to learn the ropes of destruction, the two heavyweight titans live in destructive harmony, treating urban demolition and planetary ruin as their personal romantic dates while remaining blissfully oblivious to external cosmic observers.`,
    randomThoughts: [
      { text: "Crushing suspension bridges with Rhidos... honestly, the best romantic dates are the loudest ones.", category: "relationship" },
      { text: "They built that laboratory to contain our growth. Look at us now—stomping whole metropolitan skylines flat.", category: "rampage" },
      { text: "Heavy steps, heavy appetites, and my favorite horned juggernaut by my side. What more could a pachyderm want?", category: "relationship" },
      { text: "Planted my front foot right onto their central transit interchange. The seismic shockwave cracked the subway tunnels underneath and toppled three surrounding office towers in a chain reaction of beautiful, deafening rubble.", category: "rampage" },
      { text: "Wrapped my trunk around the support pylon of their broadcasting spire, hauled back, and used the whole tower as a broom to sweep their armored battalions into the bay. Nothing withstands ten thousand tons of pachyderm mass in motion.", category: "rampage" }
    ],
    archetype: "Superhuman Pachyderm Rampager",
    status: "Isolated / Under Observation"
  },
  {
    id: 'rhidos',
    name: 'Rhidos',
    species: "Rhino",
    title: "The Horned Battering Ram",
    avatar: 'assets/avatars/rhidos.png',
    fullArt: 'assets/full_art/rhidos.jpg',
    orderMember: false,
    universeTraversal: 'none',
    livedExperience: {
      display: '35 + 1',
      raw: '35+1',
      breakdown: [
        { label: 'Lab/Experimental Life', value: '35 yrs', isMacro: false },
        { label: 'Macro Rampage Era', value: '1 yr', isMacro: true }
      ],
      description: "Equivalent to a 35-year-old human mortal before unleashing 1 year of Macro destructive power."
    },
    canvasPos: { x: 240, y: 1300 },
    bio: `An unstoppable rhinoceros powerhouse and superhuman mortal, carrying 35 years of experimental life and 1 year of unleashed Macro destruction. Born of the same disastrous laboratory experiment gone wrong that transformed his partner Eidos, Rhidos was gifted with devastating kinetic momentum, rapid macro growth, rapid controllable digestion, and super production.

A relentless juggernaut in his own right, he thrives on charging through skyscrapers and fortified infrastructure with reckless glee. Left to their own devices in their isolated realm to learn the ropes of devastation, Rhidos and his devoted life partner Eidos are completely in sync in love and ruin, turning the destruction of mortal worlds into personal romantic celebrations while remaining unaware of Kai'nek's distant gaze.`,
    randomThoughts: [
      { text: "Lower the horn, build up the kinetic momentum, and nothing in this city can stop the battering ram.", category: "rampage" },
      { text: "Watching the skyline topple right behind Eidos's stomp... we were truly made for each other.", category: "relationship" },
      { text: "They thought their reinforced steel bunkers would hold. They never calculated our accelerated growth rate.", category: "rampage" },
      { text: "Lined up three consecutive glass skyscrapers down the main commercial avenue and built up full kinetic speed. Punched straight through the first, burst clean out of the second, and brought down the third in a single unbroken charge. That's real momentum.", category: "rampage" },
      { text: "Drove my horn into the foundation of their elevated highway overpass and tossed the whole concrete span into the air like a toy. Their supply trucks rained down in sparks while I plowed right through the dust cloud without slowing a step.", category: "rampage" }
    ],
    archetype: "Superhuman Horned Rampager",
    status: "Isolated / Under Observation"
  },
  {
    id: 'regal',
    name: 'Regal',
    species: "Equine / Changeling",
    title: "The Changeling Colossus & Horned Devastator",
    avatar: 'assets/avatars/regal.png',
    fullArt: 'assets/full_art/regal.png',
    orderMember: false,
    associated: true,
    universeTraversal: 'some_exertion',
    livedExperience: {
      display: '?',
      raw: '?',
      breakdown: [
        { label: 'Colossal Awakening & Planetary Domination', value: 'Unknown', isMacro: true }
      ],
      description: "Woke up already massive with zero memory of his past origin, conquering his first world within weeks before honing horn magic, mass levitation, and multiversal teleportation."
    },
    canvasPos: { x: 1180, y: -60 },
    bio: `A colossal equine changeling titan and muscular powerhouse, possessing unknown lived experience (?) with zero memory of his origin or past. Regal woke up one day already massive, his mind devoid of recollections but consumed by a singular, overwhelming drive: total and complete domination of the world beneath him. Acting upon this instinct immediately, his first world fell to his wrath within mere weeks.

As he experimented with his innate magical powers, he learned to channel devastating abilities sourced directly from his horn—mastering mass levitation, scorching extreme heat beams, quick teleportation, and mind alteration. Endowed with corrosive acidic body fluids and form-shifting capabilities, Regal periodically assumes the form of a terrifying Kaiju crowned with colossal shoulder crystals, unleashing cataclysmic beams of extreme heat and nuclear radiation from his mouth at will.

Interplanetary conquests soon became routine, with multiversal travel following as an afterthought. During a post-rampage rest after thoroughly exterminating a planetary metropolis, Regal met Carpo. True to his recruiter modus operandi, Carpo approached him completely bare without gear, putting the unarmored equine giant at ease. Finding immediate camaraderie in their shared destructive scale, the two embarked on joint rampages in their primal forms. After several successful campaigns proved Regal's devastating power and steadfast reliability, Carpo received Kai'nek's approval to arrive in full futuristic combat gear. Though Regal initially scoffed at an all-powerful titan wearing high-tech combat gear, Carpo proved the telemetry benefits by deploying population counters and heartbeat sensors to reveal survivors hiding in deep bunkers beneath the rubble. Won over by the lethal precision, Regal readily entered a formal association with the Order, contracting his destructive might under Kai'nek's multiversal banner.`,
    gearsAndTactics: `Operates primarily through his immense muscular physical build and devastating horn magic—wielding extreme heat beams, mass levitation, rapid teleportation, mind manipulation, and corrosive acidic body fluids. Can shapeshift into a crystalline Kaiju form equipped with massive shoulder crystals to discharge wide-area beams of extreme heat and nuclear radiation from his jaws.

Under his Order contract, Regal partners with Carpo's high-tech diagnostic sensor suite—specifically population counters and acoustic heartbeat telemetry—to guarantee zero survivors escape his planetary exterminations. Can freely alternate between his equine juggernaut form and radiant crystal Kaiju beast at will.`,
    randomThoughts: [
      { text: "Waking up already massive with an empty mind and a world beneath my hooves... I didn't need a past when I had an entire civilization to grind into dust.", category: "personal" },
      { text: "The extreme heat beam from my horn cuts through their planetary defense grid like hot iron through grease. Once the sky burns, their will crumbles.", category: "rampage" },
      { text: "Shifted into my crystal-shouldered Kaiju form and let loose the radiation beam straight through their capital continent. Watching miles of granite vitrify in seconds never gets old.", category: "rampage" },
      { text: "I laughed at Carpo's combat suit at first—until he switched on those heartbeat sensors and proved survivors were still breathing under the slag. Zero means zero; the gear proved its worth.", category: "relationship" },
      { text: "The serpent sovereign Kai'nek wanted a contract; I wanted an endless line of worlds to extinguish. Pledging the harvest energy is a bargain when every hunt leaves nothing alive.", category: "relationship" }
    ],
    archetype: "Changeling Colossus / Contracted Devastator",
    status: "Contracted Order Associate",
    contracted: true
  }
];

window.characters = characters;
