# v0.03 verification — October 30, 2026

## Automated verification

23 tests pass in `systems.test.mjs`. Coverage includes the bare starting build; stable seeded Firewall/Cannon offers; selecting exactly one reward; shell marks and stats; duplicate core leveling; fire/charge speed scaling; semi-auto trigger edges; reorder validation; Split/Bounce event order; snapshots for live projectiles; level-based salvage and selected purchases; suit symbol counts; armor and delayed repair; build persistence through 32 islands; reachable objectives across 100 seeds; collision; enemy attacks; death; overrun; stable turn direction; ray selection; physical grab/reorder; missed drops; deliberate salvage confirmation; edge-triggered hood touch; aerial attack evasion; and separation of the first install socket from the salvage bin.

Syntax checks pass for game.js, core.js, build.js and bench.js.

A separate runtime smoke check executes the actual combined game against a non-rendering adapter. It checks boot, semi-auto firing, the lab preset, actual suit geometry draw ranges shrinking and restoring, delayed regeneration, reordering, salvage, shell purchases, automatic/charge firing and resetting to the bare build. This adapter is not a browser or VR performance test.

## Actual hosted browser checks

Tested on the versioned GitHub Pages build, using browser UI controls and keyboard input:

- Game initializes and renders its ASCII island, sparse suit and cannon, particles, artifacts, and cannon workbench.
- Holding base fire for 2.8 seconds produced one shot. Jump and dash correctly reported that upgrades were required on a bare run.
- Core Lab provided Automatic L1, Charge L2, Splitter L1 and Bounce L1. Normal R reset removed those grants and returned to 12 HP / empty core / no jump / no dash.
- Lab damage changed H from 12 to 8 and suit symbol readout from 240 to 160. Repair restored both.
- Core arrows reordered the chain. The UI remained live as corruption advanced.
- Selecting a nearby artifact showed Integrity versus Charge. Choosing Charge raised the installed core from L2 to L3 and its salvage value from 4 to 6. HP stayed 12, verifying the other reward was not granted.
- A second nearby artifact showed Armor versus Cycle Speed; selecting Armor increased suit density to 272 and consumed that artifact.
- Salvaging Charge L2 required YES, paid 4 scrap, and removed the core. A Multishot purchase cost 3 and left 1 scrap. Holding Automatic fire for 2.6 seconds produced three shots.
- In a later lab run, salvaging Automatic paid 2 scrap. Cycle Speed consumed those 2. Holding/releasing Charge fired a partial-charge shot; subsequent full-charge shots killed the stationary target and changed K to 001.
- The core order Charge -> Bounce -> Splitter was visible in the actual editor.
- No console errors or warnings were returned during these checks.
- In-game desktop frame counter was generally 53–60 FPS in this embedded-browser session. This is not a Quest benchmark.

The final small refinements (airborne attack avoidance, suit debug tagging, moving the salvage bin away from slot 1) also pass the unit/geometry/runtime checks. They do not change the basic browser interaction flow above.

## Not verified on hardware

Quest 2 touch-button reach, hand/controller alignment, grip dragging/dropping, left ray targeting, arm HUD readability, smooth-turn comfort, jump comfort, and performance need a headset playtest. Geometry tests cannot certify physical ergonomics. The body is inferred from headset/controller poses; there is no full-body tracking or finger tracking.

The offline HTML is a self-contained desktop build with the same game source, syntax-checked and runtime-checked with the adapter. This app's browser blocks file URLs, so opening that local file visually was not tested here. Use the HTTPS game for Quest.

Previous releases remain in local folders and Git history. v0.02 source revision: 1c540b29ddccd820af4694084bafc38a9e519806. v0.03 is staged in its own v003 folder to avoid replacing those modules.
