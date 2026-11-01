# v0.04 verification

## Passed in this work session

- JavaScript syntax checks for game, model, simulation and graphics modules.
- 35 Node simulation tests: baseline/ranks; token restrictions and chronological marks; slots/reserves; duplicate overclocks; ordered Charge/Auto modes; five Blaster overclock parameters; semi-auto/cooldowns/energy; charge/burst snapshots; both-arm interlocks; scrap payouts; progressive XP; artifact exclusivity; regeneration/death; 100 reproducible map seeds; central/elevated artifact and extraction behavior; build/HP preservation; smooth-turn sign; fatal water; utilities; no automatic corruption death; shared Doppelganger model; 20-second simulation stability; real projectile hit/kill/XP; Beam penetration; Ricochet wall reflection; Homing steering; Parry interception; point-ray versus body collision height; utility overclocks; monolith landing; bare restart.
- Standalone bundling and generated-script syntax check (re-run after final source edits).

## Not passed / not claimed

- Browser render, mouse/keyboard integration, physical VR grabbing, panel layout, screenshots, controller tracking, Quest frame rate and comfort.
- Local server processes announced listening, but browser HTTP connections timed out or were refused. Network permission was requested and granted; retrying with a persistent terminal did not produce a reachable preview. A same-process local HTTP probe succeeded, but that is not evidence the game was browser-accessible.
- The browser URL policy blocked file:// navigation for the standalone build. No alternative browser surface was used to evade that restriction.
- No GitHub Pages upload or deployment verification in this update. Existing hosted version unchanged.

## Release gate

Open the standalone desktop build or run the local server from the user's ordinary terminal, then verify visible gameplay. Fix observed issues before HTTPS Quest staging. Run the headset checklist in README before promoting the main game link.
