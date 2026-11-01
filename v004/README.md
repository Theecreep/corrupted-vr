# CORRUPTED v0.04 — local systems test

**Status: source assembled; 35 simulation tests passed. Rendered browser operation and Quest acceptance are NOT verified. Not published.** The browser preview could not connect to the local server in this automation session. Its URL policy also disallowed opening a file URL. This build must pass a visible browser check before replacing the hosted demo.

## Run

- Desktop: open `CORRUPTED-v0.04-offline.html` in your normal desktop browser. This standalone file includes Three.js and styles; no download service or installation is required. Direct-file operation has not been visually tested here.
- Development: install/use Node.js, open a terminal in this folder, run `npm start`, then visit http://127.0.0.1:8080/. If 8080 is occupied, set the PORT environment variable to another port before starting.
- Automated checks: `npm test`.
- Rebuild standalone after changes: `node bundle.mjs`. The generated `bundle-check.js` can be checked with `node --check bundle-check.js`.
- Quest: use an HTTPS-hosted copy of this folder and choose ENTER VR. A localhost URL on the PC is not a Quest link. GitHub Pages remains the intended host; nothing has been uploaded in this update. Do not replace the existing main page until desktop and Quest checks pass.

Three.js r170 and its MIT license are bundled. The normal web build uses relative ES-module imports. No CDN, framework install, external API, backend, login or analytics. The offline file is for desktop convenience; it does not replace an HTTPS Quest deployment.

## Implemented rules

- Seven rank-one stats: HP, Mobility (walk speed and starting jump), Regen; Power, Clock, Capacity, Recovery. Centralized adjustable numerical tuning in `model.js`.
- Code body and arm frames; one acquired colored glyph per stat point, chronological layout, damage hides and regeneration restores code. Numeric inner-left-arm diagnostics remain for testing.
- One Blaster: three ordered active cores, two reserves. Charge, Automatic, Beam, Homing, Ricochet; duplicate overclocks. Charge→Automatic is a charged burst; reversed order is short-range spray. Beam/Homing travels and steers; Ricochet and Homing coexist.
- Energy costs, recovery, semi-auto trigger behavior, automatic output, energy-limited charging with diminishing gains. An exhausted charge stays at its accumulated amount until release; opening either arm cancels it. Recovery is adjustable and currently runs during firing/charging.
- Firewall: two active utilities, one reserve. Hold Grapple on solid geometry; Dash adds movement-direction momentum (aim direction from rest); hold Parry Dagger to physically intercept and return projectiles along left-hand aim. Duplicates extend grapple reach, shorten dash cooldown or lengthen the blade.
- Both live arm editors: direct-near or ray-assisted grip selection and dropping, active/reserve swaps, point tokens, stat sockets, scrapping. Editing disables firing/utilities, detaches grapple and cancels charge, while movement and enemies continue.
- Artifacts offer one Firewall core versus one Blaster core. Accept, scrap incoming for one corresponding point, or scrap/replace an owned core when full. Owned duplicates overclock. Scrapping level N returns N arm-specific points. Kill XP awards universal points; first basic kill levels once.
- Seeded Small/Medium/Large islands, irregular terrain/coast, randomized monoliths, coast access point, central ground artifact and elevated optional artifact. Central artifact resolution spawns extraction at the access point.
- Fatal water, jumping and landing on ruins, shared velocity-based movement, smooth turning. No forced camera rotation or snap turn.
- Shared-rule Doppelgangers with random stats/cores, roaming, detection, shooting, cover seeking, normal health/energy recovery, movement and utilities. Navigation is a simple bounded grid, not a production navigation system.
- Endless islands preserve the current run's body/build/HP. Extraction lowers corruption partly while its floor rises. 100% corruption does not itself kill you. Death starts a bare new run.
- Localized code-water/particle glitches and rising visual atmosphere, without forced camera effects. Deep code-water, ground clutter, stars, particles, monoliths and bodies use actual glyph geometry.

## Controls

Desktop: WASD move; mouse (after ENTER) or arrows look; Space jump; click/F fire; E interact; Tab Blaster; V Firewall; Q rear utility; Shift front utility; C crouch; Escape pause; R after death restart. Use the desktop editor buttons to select a core then its destination slot, or select a token then a stat. Closing the editor does not force mouse recapture; arrows remain usable.

Quest: left stick move, right stick smooth turn; right A jump, B Blaster, trigger fire; left Y Firewall, X rear utility, trigger front utility. Either grip interacts with the world; the opposing hand grips parts inside an open arm. Hold B+Y together for about 0.6 seconds to pause/resume. Physical crouching reduces detection. Grip after death restarts.

SYSTEMS LAB supplies all cores/utilities and stat points; normal runs do not. Its purpose is arm/core experimentation. Return to NEW RUN for survival.

## Acceptance sequence

1. Desktop: load, enter, walk/turn/jump, open both editors, spend tokens, reorder active/reserve cores, scrap, fire every mode. Check browser console and memory stability.
2. Quest: confirm each named hand/button, smooth-turn sign, arm-panel orientation, grip reach/drop behavior, HUD placement, pause/resume, headset frame rate, and no unintended grip action. Desktop checks cannot certify this.
3. Combat: fight a baseline Doppelganger, break line of sight, watch retreat/regen, test Beam/Homing/Ricochet and parry at different distances.
4. Loop: resolve central artifact, verify extraction appears, extract with upgrades and partial corruption, reach elevated artifact with mobility/Grapple, fall into water, die and restart.

## Boundaries and unfinished verification

This is a mechanics skeleton, not the complete game or a visually approved release. Beam trails, spray presentation, core reach, body proportions, enemy navigation/traversal, balance and Quest performance need actual playtesting. No persistent discovery/achievement storage, new biomes, water stalker, leviathan, narrative secrets, native Steam/Quest package, or finished audio/art pass. Those remain future work rather than invented content in this slice. Room-scale collision at the headset's physical offset is not fully solved: locomotion collision uses the player rig.

The test report distinguishes simulation evidence from unverified rendering and hardware behavior.
