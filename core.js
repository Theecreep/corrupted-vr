// Deterministic simulation. Rendering and XR never own run state.
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function rng(seed){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}
export function height(x,z){return 1.2-.0025*(x*x+z*z)+Math.sin(x*.22)*.22+Math.cos(z*.24)*.2;}
export function shore(x,z){return Math.hypot(x,z)<22+Math.sin(Math.atan2(z,x)*5)*1.2;}
export function stand(map,x,z,r=.3){return shore(x,z)&&!map.walls.some(w=>Math.abs(x-w.x)<w.w/2+r&&Math.abs(z-w.z)<w.d/2+r);}
export function move(map,p,dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));for(let i=0;i<steps;i++){if(stand(map,p.x+dx/steps,p.z))p.x+=dx/steps;if(stand(map,p.x,p.z+dz/steps))p.z+=dz/steps;}return p;}
export function sight(map,a,b){const n=Math.ceil(dist(a,b)/.25);for(let i=1;i<n;i++){const t=i/n;if(!stand(map,a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t,.08))return false;}return true;}
export function makeMap(seed,island=1){const random=rng(seed),flip=random()<.5?-1:1;
 const walls=[{x:-6,z:-6,w:1,d:7,h:3.3},{x:6,z:-6,w:1,d:7,h:3.8},{x:0,z:-10,w:11,d:1,h:4},{x:-11*flip,z:3,w:1,d:6,h:2.7},{x:11*flip,z:-12,w:5,d:1,h:2.4},{x:(random()<.5?-1:1)*9,z:10,w:4,d:1,h:2.2}];
 const spawn={x:(random()-.5)*4,z:16},exit={x:0,z:random()<.5?-6:4},spots=[{x:-9,z:-3},{x:10,z:3},{x:-3,z:-16},{x:12,z:-6},{x:-13,z:9},{x:3,z:8}];
 // Shuffle safe hand-authored sockets; no ability-gated objective placements.
 for(let i=spots.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[spots[i],spots[j]]=[spots[j],spots[i]];}
 const types=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(random()*(i+1));[types[i],types[j]]=[types[j],types[i]];}
 const artifacts=spots.slice(0,3).map((p,i)=>({...p,id:i,type:types[i],taken:false}));
 const map={seed,spawn,exit,walls,artifacts,enemies:[],random};
 const count=Math.min(9,3+Math.floor(island/2));let attempts=0;
 while(map.enemies.length<count&&attempts++<500){const a=random()*Math.PI*2,r=8+random()*10,p={x:Math.cos(a)*r,z:Math.sin(a)*r};if(stand(map,p.x,p.z)&&dist(p,spawn)>10)map.enemies.push({...p,id:map.enemies.length,hp:45+Math.min(75,island*3),mode:'patrol',target:{...p},timer:random()*2,attack:1,windup:0,alert:0});}
 map.nextEnemyId=map.enemies.length;return map;
}
export const ARTIFACTS=[{code:'P',name:'PACKET LANCE',detail:'+12 damage / cyan arm',color:'#70e4ed'},{code:'D',name:'PHASE DRIVE',detail:'faster dash / violet arm',color:'#d59cff'},{code:'H',name:'LEECH KERNEL',detail:'+20 max HP / heal on kills',color:'#86e5a2'},{code:'F',name:'FORK ARRAY',detail:'+1 projectile / amber arm',color:'#ffc783'}];
export function newRun(seed=Date.now()>>>0){return {seed,island:1,hp:100,maxHp:100,kills:0,artifacts:0,levels:[0,0,0,0],corruption:0,floor:0,time:0,dead:false,damage:24,shotTimer:0,dashTimer:0,dashTime:0,noise:0,hurt:0,spawnTimer:15,event:'ACCESS GRANTED',map:makeMap(seed,1)};}
export function collect(run,a){if(a.taken||run.dead)return false;a.taken=true;run.artifacts++;run.levels[a.type]++;if(a.type===0)run.damage+=12;if(a.type===2){run.maxHp+=20;run.hp=Math.min(run.maxHp,run.hp+35);}run.event=`${ARTIFACTS[a.type].name} / INSTALLED`;return true;}
export function extract(run){if(run.dead||!run.map.artifacts.some(a=>a.taken))return false;run.island++;run.floor=Math.min(85,(run.island-1)*5);run.corruption=Math.max(run.floor,run.corruption-22);run.map=makeMap((run.seed+Math.imul(run.island-1,7919))>>>0,run.island);run.spawnTimer=15;run.event=`ISLAND ${run.island} / CORRUPTION PURGED TO ${Math.round(run.corruption)}%`;return true;}
export function kill(run,e){if(e.hp>0||e.counted)return;e.counted=true;run.kills++;if(run.levels[2])run.hp=Math.min(run.maxHp,run.hp+3*run.levels[2]);run.event='HOSTILE / DEREFERENCED';}
export function hurt(run,amount){if(run.dead||run.hurt>0)return;run.hp=Math.max(0,run.hp-amount);run.hurt=.65;if(run.hp===0){run.dead=true;run.event='PROCESS TERMINATED / R OR BOTH GRIPS TO REBOOT';}else run.event='H / INTEGRITY BREACH';}
export function stage(run){return run.corruption>=100?3:run.corruption>=66?2:run.corruption>=33?1:0;}
export function smoothTurn(yaw,axis,dt,rate=1.35){const v=Math.abs(axis)<.18?0:Math.sign(axis)*(Math.abs(axis)-.18)/.82;return yaw-v*rate*dt;}
// Low-resolution navigation grid around the reusable ruin kit. Recomputed only
// when an enemy's route expires, so pursuers can actually search around cover.
export function route(map,start,end){const a={x:Math.round(start.x),z:Math.round(start.z)},b={x:Math.round(end.x),z:Math.round(end.z)},key=p=>`${p.x},${p.z}`,q=[a],seen=new Map([[key(a),null]]);let goal=null;for(let i=0;i<q.length&&i<2200;i++){const p=q[i];if(Math.hypot(p.x-b.x,p.z-b.z)<1.1){goal=p;break;}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const n={x:p.x+dx,z:p.z+dz},k=key(n);if(!seen.has(k)&&stand(map,n.x,n.z)){seen.set(k,p);q.push(n);}}}if(!goal)return [];const path=[];while(seen.get(key(goal))){path.unshift(goal);goal=seen.get(key(goal));}return path;}
export function step(run,p,dt,{hidden=false}={}){if(run.dead)return;run.time+=dt;run.corruption=clamp(run.corruption+dt*.38,run.floor,100);run.shotTimer=Math.max(0,run.shotTimer-dt);run.dashTimer=Math.max(0,run.dashTimer-dt);run.dashTime=Math.max(0,run.dashTime-dt);run.noise=Math.max(0,run.noise-dt);run.hurt=Math.max(0,run.hurt-dt);
 const map=run.map,s=stage(run);
 for(const e of map.enemies){if(e.hp<=0)continue;const d=dist(e,p),visible=d<(hidden?4:14)&&sight(map,e,p),heard=run.noise>0&&d<17;e.attack=Math.max(0,e.attack-dt);
 if(visible||heard){e.target={x:p.x,z:p.z};e.mode='chase';e.alert=4;}else if(e.mode==='chase'){e.alert-=dt;if(e.alert<=0){e.mode='search';e.timer=4;}}
 if(e.windup>0){e.windup-=dt;if(e.windup<=0&&d<1.8&&sight(map,e,p))hurt(run,10+s*3);continue;}
 if(e.mode==='chase'&&d<1.4&&e.attack<=0){e.windup=.55;e.attack=1.7;continue;}
 if(e.mode==='search'){e.timer-=dt;if(e.timer<=0){e.mode='patrol';e.timer=0;}}
 if(e.mode==='patrol'){e.timer-=dt;if(e.timer<=0){const a=map.random()*Math.PI*2;e.target={x:e.x+Math.cos(a)*4,z:e.z+Math.sin(a)*4};e.timer=3;}}
 let destination=e.target;e.routeTime=(e.routeTime||0)-dt;if(!sight(map,e,e.target)){if(e.routeTime<=0){e.path=route(map,e,e.target);e.routeTime=1;}if(e.path?.length){if(dist(e,e.path[0])<.3)e.path.shift();destination=e.path[0]||e.target;}}else e.path=[];
 const td=dist(e,destination);if(td>.2){const speed=e.mode==='chase'?1.45+s*.24+Math.min(.5,run.island*.025):.65;move(map,e,(destination.x-e.x)/td*speed*dt,(destination.z-e.z)/td*speed*dt);}
 }
 run.spawnTimer-=dt;if(run.spawnTimer<=0){run.spawnTimer=s===3?4:Math.max(7,18-s*4);map.enemies=map.enemies.filter(e=>e.hp>0);const alive=map.enemies.length;if(alive<Math.min(14,5+s*3+Math.floor(run.island/3))){for(let i=0;i<20;i++){const a=map.random()*Math.PI*2,q={x:Math.cos(a)*18,z:Math.sin(a)*18};if(stand(map,q.x,q.z)&&dist(q,p)>9){map.enemies.push({...q,id:map.nextEnemyId++,hp:45+Math.min(75,run.island*3),mode:'search',target:{x:p.x,z:p.z},timer:4,attack:1,windup:0,alert:0});break;}}}}
}
