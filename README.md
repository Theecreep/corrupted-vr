# CORRUPTED v0.02 — Endless island slice

Play: https://theecreep.github.io/corrupted-vr/

One reusable ASCII island arena, regenerated with a new seed after extraction. Hunt artifacts, fight or escape pursuers, break sight behind ruins and hide, and race escalating corruption. Your build, health, appearance modifications, and kills persist between islands. Death ends the run.

## Controls

| Action | Desktop | Quest controllers |
|---|---|---|
| Move | WASD | Left stick |
| Turn | Mouse; arrows when capture unavailable | Right stick, smooth 77 degrees/second maximum |
| Fire | Hold click or F | Hold right trigger; aim right controller |
| Install artifact / extract | E within reach | Left trigger within reach |
| Dash | Space | Right grip |
| Hide | Hold C / Ctrl behind cover | Hold left grip or physically crouch behind cover |
| Run | Shift | Use dash |
| New run | R or menu NEW RUN | Both grips after death; or leave VR and use menu |
| Pause | Escape | End immersive session |

In VR the diagnostics panel follows the **inner left forearm**, using controller grip tracking. Lift and turn your wrist to read it. H = HP, C = corruption, K = run kills, I = island, A = run artifacts. `^` marks the corruption floor. Short status messages appear below it. Tracked arm orientation and text size need headset feedback; no detached face panel is used. Desktop also shows diagnostics in the lower-left corner.

## The slice

- Smaller world-space glyphs: ~0.24m terrain spacing/characters, ~0.21m ruin glyphs, smaller floating code, code stars and debris. Genuine 3D depth, no ASCII postprocessing.
- One ranged glyph weapon, a dash, one enemy archetype with patrol/chase/search, line-of-sight cover, audible-shot detection, telegraphed melee attacks, and health/death.
- Three different artifacts per island, selected from Packet Lance (damage), Phase Drive (dash cooldown/range), Leech Kernel (max HP/heal and kill leech), Fork Array (spread projectiles, capped at five).
- Artifact letters/colors accumulate on the left arm; Fork Array also changes the weapon color/width. Appearance is a simple first-person glyph modification, not a full avatar system.
- At least one artifact unlocks extraction. Other artifacts are optional risks. An extraction creates a new seeded layout using the same kit and preserves the build and current HP. No automatic full heal.
- Corruption rises 0.38 points/second. Extract subtracts 22, stopping at the floor. Floor grows 5/island up to 85. Thresholds 33, 66, and 100 increase pursuit speed, reinforcements and fog; high stages add brief localized glyph distortions. At 100 the map is overrun, not an automatic loss.
- Enemy count/HP are bounded for Quest budgets; the run itself has no island limit. Corpses and GPU resources are released on replacement. No persistence across reloads or closing the browser yet.
- Controlled generation shuffles safe artifact sockets, mirrored/variable cover, two exit sockets, entry offset, clutter and enemies. Core footprint/ruins stay recognizable. This is not a new biome generator.
- A fixed seed field in the menu repeats layouts for debugging. The HUD prints the current seed.

## Run locally

Node.js required; no dependency installation or build:

```
node server.mjs
```

Open http://127.0.0.1:8080 . Stop with Ctrl+C. Quest needs the HTTPS hosted link; the local server is loopback-only. Three.js r170 is bundled in `three.module.js` with its MIT license in `THREE-LICENSE.txt`.

## Test

```
node --test tests.mjs
node --check game.js
```

`core.js` owns deterministic maps, collision, AI, upgrades and run state; `game.js` owns rendering, input and XR. Automated checks cover generation reachability over 100 seeds, collision/dash tunneling, upgrades, extraction persistence over 32 islands, death, corruption cap, AI transitions, and turn-sign stability through all headings.

## VR verification limits

v0.01 was confirmed on Quest by the player. v0.02's smooth turning, handed controller bindings, forearm HUD, weapon aiming, grip actions, and heavier scene require a new on-headset playtest. Desktop checks cannot prove VR comfort or frame rate. Physical room-scale walking is not stopped by virtual walls; use your normal headset boundary. This slice does not yet include grappling, climbing, jumping, additional weapons/enemy types, saves, positional audio, or native storefront packaging.

Original published revision retained in Git history: `468eaf146c87747d0cc842cf19ad8ae0b216fae7`. Local v0.01 archive is also preserved.
