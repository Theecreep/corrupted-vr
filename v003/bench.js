import * as T from './three.module.js';
import {FIREWALL,SHELL,CORES,upgradeLabel,salvageValue} from './build.js?v=003';
// One interaction model for physical VR parts and desktop controls.
export class Workbench{
 constructor(mount,callbacks){this.mount=mount;this.callbacks=callbacks;this.group=new T.Group();mount.add(this.group);this.open=false;this.choice=null;this.pending=null;this.drag=null;this.hovered=null;this.raycaster=new T.Raycaster();this.targets=[];this.panel=document.querySelector('#workbench');this.panel.addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(b)this.act(b.dataset.action,b.dataset.value);});this.rebuild();}
 get run(){return this.callbacks.run();}
 clear(){this.group.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose();}});this.group.clear();this.targets=[];}
 label(text,x,y,z,w,h,action,value,kind='button'){const canvas=document.createElement('canvas');canvas.width=768;canvas.height=256;const c=canvas.getContext('2d');c.fillStyle='#081815ee';c.fillRect(0,0,768,256);c.strokeStyle=kind==='core'?'#deb27d':'#6eb2a1';c.lineWidth=6;c.strokeRect(3,3,762,250);c.fillStyle=kind==='core'?'#f5c68f':'#c3efdb';c.font='30px monospace';c.textBaseline='top';const rows=text.split('\n');rows.forEach((row,i)=>c.fillText(row,18,18+i*47));const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));m.position.set(x,y,z);m.userData={action,value,kind};this.group.add(m);if(action)this.targets.push(m);return m;}
 rebuild(){if(this.drag){this.group.remove(this.drag.mesh);this.drag.mesh.geometry.dispose();this.drag.mesh.material.map.dispose();this.drag.mesh.material.dispose();this.drag=null;}this.clear();const b=this.run?.build;if(!b)return;
 this.hood=this.label(this.open?'[-] CLOSE':'[+] HOOD',-.10,.075,-.04,.09,.033,'toggle');this.hood.rotation.x=-Math.PI/2;
 this.panel.hidden=!this.open&&!this.choice;let html='';
 if(this.choice){const a=this.choice;html='<b>ARTIFACT / PICK ONE</b><p>World remains live. Other offer is discarded.</p>';a.offers.forEach((offer,i)=>{const def=offer.kind==='firewall'?FIREWALL[offer.key]:offer.kind==='shell'?SHELL[offer.key]:CORES[offer.key];this.label(`${i===0?'1 FIREWALL':'2 CANNON'}\n${def.name}\n${def.detail.slice(0,37)}`,i===0?-.24:.10,.30,-.32,.31,.13,'choose',i);html+=`<button data-action="choose" data-value="${i}">${i+1} / ${upgradeLabel(offer)}<small>${def.detail}</small></button>`;});this.label('[X] LATER',-.06,.16,-.32,.16,.05,'dismiss');html+='<button data-action="dismiss">LATER</button>';}
 else if(this.open){html='<b>CANNON / CORE PROGRAM</b><p>Drag parts in VR. Desktop: move arrows. Firing is interlocked while the hood is open; the world stays live.</p>';this.label(`CORE / SCRAP ${b.scrap}\nLEFT GRIP: GRAB / RELEASE: INSTALL`,-.10,.48,-.34,.54,.075);
 b.cores.forEach((core,i)=>{const x=-.34+i*.16;this.label(`${i+1} [${CORES[core.type].symbol}] L${core.level}\n${CORES[core.type].name}`,x,.32,-.32,.14,.075,'core',core.id,'core');this.label(`[${i+1}]`,x,.23,-.32,.13,.035,'slot',i,'slot');html+=`<div class="core-row"><span>${i+1} [${CORES[core.type].symbol}] ${CORES[core.type].name} L${core.level}</span><button data-action="left" data-value="${core.id}" ${i===0?'disabled':''}>←</button><button data-action="right" data-value="${core.id}" ${i===b.cores.length-1?'disabled':''}>→</button><button data-action="salvage" data-value="${core.id}">SALVAGE +${salvageValue(core)}</button></div>`;});
 if(!b.cores.length){this.label('[ EMPTY CORE ]\nSEMI-AUTO / ONE SHOT PER PULL',-.10,.32,-.32,.48,.10);html+='<p>[ EMPTY CORE ] / one shot per pull</p>';}
 this.label('[X] SALVAGE\nDROP CORE HERE',-.37,.12,-.32,.19,.08,'salvageDrop');html+=`<p>SCRAP ${b.scrap} / SHELL: +${b.shell.damage} DAMAGE / +${b.shell.rate} SPEED / +${b.shell.count} COUNT</p>`;
 Object.entries(SHELL).forEach(([key,def],i)=>{this.label(`${def.symbol} ${def.name}\n${def.cost} SCRAP`,-.10+i*.17,.07,-.32,.15,.075,'buy',key);html+=`<button data-action="buy" data-value="${key}" ${b.scrap<def.cost?'disabled':''}>${def.symbol} ${def.name} / ${def.cost} scrap</button>`;});
 if(this.pending!==null){const core=b.cores.find(c=>c.id===this.pending);if(core){this.label(`SALVAGE ${CORES[core.type].symbol} L${core.level}?\n[YES] +${salvageValue(core)} SCRAP`,-.08,.57,-.32,.34,.09,'confirm');this.label('[NO]',.22,.57,-.32,.12,.06,'cancel');html+=`<p>Salvage ${CORES[core.type].name} L${core.level} for ${salvageValue(core)} scrap?</p><button data-action="confirm">YES / SALVAGE</button><button data-action="cancel">CANCEL</button>`;}}
 if(this.callbacks.lab?.()){this.label('[LAB] DAMAGE',-.30,.65,-.32,.22,.05,'labDamage');this.label('[LAB] REPAIR',.0,.65,-.32,.22,.05,'labRepair');html+='<p>LAB PRESET / NO SURVIVAL PROGRESSION</p><button data-action="labDamage">LAB: DAMAGE SUIT</button><button data-action="labRepair">LAB: REPAIR SUIT</button>';}
 html+='<button data-action="toggle">CLOSE HOOD [TAB]</button>';}
 this.panel.innerHTML=html;this.group.updateMatrixWorld(true);}
 toggle(){if(this.choice){this.choice=null;this.open=true;}else this.open=!this.open;this.pending=null;this.callbacks.interlock();this.rebuild();}
 act(action,value){const n=Number(value),b=this.run.build;if(this.run.dead)return;if(action==='toggle')return this.toggle();if(action==='dismiss'){this.choice=null;this.rebuild();return;}if(action==='choose'){if(this.choice&&this.callbacks.choose(this.choice,n)){this.choice=null;this.open=false;}this.rebuild();return;}
 if(action==='left'||action==='right'){const i=b.cores.findIndex(c=>c.id===n);this.callbacks.reorder(n,i+(action==='left'?-1:1));}
 if(action==='core'){this.selected=n;return;}
 if(action==='slot'&&this.selected){this.callbacks.reorder(this.selected,n);this.selected=null;}
 if(action==='salvage'){this.pending=n;}
 if(action==='confirm'&&this.pending!==null){this.callbacks.salvage(this.pending);this.pending=null;}
 if(action==='cancel')this.pending=null;
 if(action==='buy')this.callbacks.buy(value);
 if(action==='labDamage'&&this.callbacks.lab?.())this.callbacks.labDamage();
 if(action==='labRepair'&&this.callbacks.lab?.())this.callbacks.labRepair();
 this.rebuild();}
 offer(a){this.choice=a;this.open=false;this.pending=null;this.callbacks.interlock();this.rebuild();}
 rayHit(origin,direction){this.group.updateWorldMatrix(true,true);this.raycaster.set(origin,direction);this.raycaster.far=1.8;const hit=this.raycaster.intersectObjects(this.targets,false)[0];return hit?.object||null;}
 hover(origin,direction){const target=this.rayHit(origin,direction);if(this.hovered?.material)this.hovered.material.color.set('#ffffff');this.hovered=target;if(target)target.material.color.set('#a3f4c2');return target;}
 click(origin,direction){const target=this.rayHit(origin,direction);if(!target)return false;this.act(target.userData.action,target.userData.value);return true;}
 touch(hand,time){const near=this.hood.getWorldPosition(new T.Vector3()).distanceTo(hand)<.045;if(near&&!this.touchInside&&time-(this.lastTouch??-10)>1){this.lastTouch=time;this.toggle();}this.touchInside=near;}
 grab(hand,origin,direction){if(!this.open||this.choice||this.drag)return false;let target=this.targets.find(m=>m.userData.kind==='core'&&m.getWorldPosition(new T.Vector3()).distanceTo(hand)<.14);target??=this.rayHit(origin,direction);if(target?.userData.kind!=='core')return false;this.drag={id:target.userData.value,mesh:target};return true;}
 dragTo(hand){if(this.drag){const local=this.group.worldToLocal(hand.clone());this.drag.mesh.position.copy(local);}}
 release(hand){if(!this.drag)return;const id=this.drag.id;const bin=this.targets.find(m=>m.userData.action==='salvageDrop');if(bin&&bin.getWorldPosition(new T.Vector3()).distanceTo(hand)<.14)this.pending=id;else{const slots=this.targets.filter(m=>m.userData.kind==='slot').sort((a,b)=>a.getWorldPosition(new T.Vector3()).distanceTo(hand)-b.getWorldPosition(new T.Vector3()).distanceTo(hand));if(slots[0]?.getWorldPosition(new T.Vector3()).distanceTo(hand)<.19)this.callbacks.reorder(id,slots[0].userData.value);}this.rebuild();}
 reset(){this.open=false;this.choice=null;this.pending=null;this.rebuild();}
}
