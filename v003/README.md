# CORRUPTED v0.03 — Firewall / Cannon

Normal runs start at 12 HP, 2.4m/s walking, 1 projectile, 1 damage, a maximum of 1 shot/second, semi-automatic. No jump, dash, armor, regeneration, shell upgrades or cores are granted initially.

## Artifacts

Approach an amber artifact and press E / left trigger. Choose exactly one of the two offers: Firewall or Cannon. The choice is discarded if you leave it, without consuming the artifact. Offers are stable for the seeded map. Cannon can be either a shell stat or a core. Existing core types level up on duplicate selection; they do not occupy additional slots.

Firewall pool: max HP, armor, repair, walk speed, jump, air jump (only offered after jump), dash. Suit density grows with max HP and upgrades. Damage removes symbols across the arms/chest; repair restores them. The torso position is inferred from the headset; arms use the controllers. This is a first-person representation, not tracked full-body animation.

Shell pool: damage (+1), cycle speed (+20%), initial projectile count (+1; six maximum). Each upgrade adds a mark to the cannon. Cycle speed lowers the semi-auto cooldown, increases automatic firing speed, and reduces full-charge time. It never grants automatic fire by itself.

## Four test cores

- Automatic: hold trigger to fire. Duplicate levels increase repeat speed.
- Charge: hold to charge, release to fire. Duplicate levels raise maximum power/size. Automatic plus Charge repeats full-charge shots while held; release fires a partial charge.
- Splitter: after 0.28 seconds split into children and continue the chain. Duplicate levels add children, capped at eight.
- Bounce: reflect off a solid wall and then continue the chain. Duplicate levels add bounces, capped at twelve.

**Order:** Split -> Bounce creates bouncing children after the split. Bounce -> Split waits for the parent's wall contact, then schedules its split. Automatic and Charge affect the firing cycle regardless of position; they are not wall/timer events. A shot snapshots its program at launch, so editing cannot alter bullets already in flight. Total live projectiles are capped at 96.

## Opening and editing the cannon

VR: touch [+] on the cannon with your left controller or press right B. Aim the left controller and use left trigger to select UI. Grab a core with left grip (directly or via pointing), drag it, and release near a numbered socket to reorder. Release near [X] SALVAGE to stage salvage, then select YES. A missed drop leaves the core installed. Cancel keeps it.

Each core level yields 2 scrap. Spend scrap on Damage (2), Cycle Speed (2), or Multishot (3). You choose the shell stat. The world and corruption stay live while editing. The open hood interlocks firing. After closing, release and pull the trigger again.

Desktop: Tab opens/closes the workbench. Move cores with arrows. Use SALVAGE, then YES, then choose a shell purchase. Artifact offers can also be selected with 1 / 2.

## Movement / input

- WASD / left stick: walk. No free sprint.
- Mouse or arrows / right stick: look and smooth turn.
- Click or F / right trigger: trigger press/release. Base weapon is semi-auto.
- Space / right A: jump, once unlocked.
- Q / right grip: dash, once unlocked.
- C / left grip outside editor: hide. Crouching physically also counts in VR.
- Escape: desktop pause. VR session exit pauses; no time freeze in the workbench.
- R / both grips after death: fresh bare run.

Jump is vertical traversal with ground landing and additional jumps from upgrades. Ruin collision remains conservative (walls block horizontally at any height). This release does not add climbing or grappling.

## Core Lab

CORE LAB / TEST PRESET is a separate practice mode. It supplies the four cores (Charge level 2), jump/dash/repair, a stationary target, and three nearby test artifacts. It opens the hood immediately and provides LAB: DAMAGE SUIT / REPAIR SUIT controls. This is deliberately not the normal starting build. R or NEW RUN restores a bare survival run.

## Verification and limits

Run `node --test systems.test.mjs` and `node --check game.js`. Twenty-three automated tests cover starting state, offer rules, duplicates, shell stats/marks, trigger semantics, cycle speed, order semantics, projectile snapshots, salvage, health density, armor/repair, persistence, generation, collision, enemies, smooth-turn direction, physical core picking, safe dropping, hood touch, and airborne evasion.

New physical VR interactions require Quest testing: touch distance, core reach/drop zones, left-ray targeting, inner-arm HUD angle, jump comfort and performance. Desktop tests cannot certify those. No save system or native app package. Three.js r170 is bundled with its MIT license. `node server.mjs` serves the folder for desktop when local server permissions are available.


