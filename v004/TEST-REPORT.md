# v0.04 verification

## Terminal / dagger / encounter revision

39 automated tests now pass. Added level-10 dagger scaling, once-per-contact melee, editor interlock/kill XP, and a seeded normal-run Doppelganger hunt that kills the idle player within 60 simulated seconds.

Hosted revision 1680153946ce1601722e98c51d09f2352d45cd27 was visually checked: VT323 renders in the menu and editor; desktop no longer shows a redundant floating VR editor behind its panel; LAB DOPPELGANGER produces N=1, an approaching code-body opponent, incoming damage (HP 90 observed) and eventual player death. The existing death/restart presentation works. This verifies presence and attack behavior, not a successful full player combat playthrough or VR melee.

Follow-up source review corrected body height/leg proportions, hides the player's own head in first person, and makes LAB DOPPELGANGER close the editor immediately so the player can fight without a second close action. The same full body remains visible on enemies. Screenshot: ../corrupted-v004-terminal.jpg.

Crawler and other level-10 milestones remain deferred, as requested. Physical controller interactions and Quest performance still require a headset test.

## Hosted verification update — November 1, 2026

Published with user authorization at https://theecreep.github.io/corrupted-vr/v004/ (initial upload 2b96e465968703ab5426765ca3a280ffcb08fffe). Browser testing found a real startup failure: `renderer.xr.isPresenting` was called as a function in the paused indicator. Fixed to read the property, and versioned the entry module URL. Fix commit: 29358a561d8e67c273f9536b698019e41d8119bc.

Observed in the hosted browser after the fix:

- Island and glyph geometry render; animation, HUD and corruption advance.
- Lab exposes three active and two reserve Blaster slots, two active and one reserve Firewall slots, all initial cores/utilities, and test points.
- Power and Mobility purchases increment ranks and consume one point.
- Charge/Automatic active-slot swap appears in the updated editor.
- Scrapping Homing empties its reserve slot and adds a point.
- Lab damage reduces HP to 75; later normal regeneration restores health.
- Desktop movement changes coordinates; turning changes the view; sustained firing drains energy (45/80 observed), then energy recovers.
- Walked around a solid ruin to the central artifact. Chose Firewall Dash; owned Dash overclocked, artifact closed, extraction became available.
- Returned to the access point and extracted: island 2, new seed 7961 from seed 42, points retained at 17, corruption reduced from about 31 to 9 percent.
- Escape exposes pause menu. NEW RUN restores island 1, zero points, seven rank-one stats and empty active/reserve Blaster slots.
- No new warning/error entries after the fix during these checks; the browser log retained the earlier startup error with its original timestamp.

Screenshot: ../corrupted-v004-hosted.jpg. Existing root/main game page and v003 remain unchanged.

Still unverified: physical Quest/controller operation, VR pause chord, comfort/frame rate, complete enemy combat balance, prolonged resource stability, all physical editor gestures, full weapon-combination presentation, and direct-file operation. The simulation tests below cover rules but do not substitute for those checks.

The following records the earlier local-only verification, before hosted testing resolved the preview blocker.

## Passed in this work session

- JavaScript syntax checks for game, model, simulation and graphics modules.
- 35 Node simulation tests: baseline/ranks; token restrictions and chronological marks; slots/reserves; duplicate overclocks; ordered Charge/Auto modes; five Blaster overclock parameters; semi-auto/cooldowns/energy; charge/burst snapshots; both-arm interlocks; scrap payouts; progressive XP; artifact exclusivity; regeneration/death; 100 reproducible map seeds; central/elevated artifact and extraction behavior; build/HP preservation; smooth-turn sign; fatal water; utilities; no automatic corruption death; shared Doppelganger model; 20-second simulation stability; real projectile hit/kill/XP; Beam penetration; Ricochet wall reflection; Homing steering; Parry interception; point-ray versus body collision height; utility overclocks; monolith landing; bare restart.
- Standalone bundling and generated-script syntax check (re-run after final source edits).

## Not passed / not claimed

- Browser render, mouse/keyboard integration, physical VR grabbing, panel layout, screenshots, controller tracking, Quest frame rate and comfort.
- Local server processes announced listening, but browser HTTP connections timed out or were refused. Network permission was requested and granted; retrying with a persistent terminal did not produce a reachable preview. A same-process local HTTP probe succeeded, but that is not evidence the game was browser-accessible.
- The browser URL policy blocked file:// navigation for the standalone build. No alternative browser surface was used to evade that restriction.
- At that earlier checkpoint no GitHub Pages upload had occurred; see hosted update above for current publication status.

## Release gate

Hosted desktop smoke verification is now complete. Run the headset checklist in README against `/v004/` before promoting the main game link.
