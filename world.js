// Pure world and collision functions, shared with the automated checks.
export const SPAWN={x:0,z:15};
export const ECHOES=[{x:-9,z:2,text:'I / THE SHORE REMEMBERS YOUR FOOTSTEPS.'},{x:10,z:-7,text:'II / WE DID NOT BUILD THE DOOR. WE FOUND IT OPEN.'},{x:-3,z:-17,text:'III / IT IS NOT CALLING. IT IS ANSWERING.'}];
export const BREACH={x:0,z:-6};
export function height(x,z){const r=Math.hypot(x,z);return 1.25-r*r*.0028+Math.sin(x*.23)*.32+Math.cos(z*.28)*.25;}
export function shore(x,z){return Math.hypot(x,z)<22+1.5*Math.sin(Math.atan2(z,x)*5)+.8*Math.cos(x*.4);}
export const walls=[{x:-6,z:-7,w:1,d:8,h:3.8},{x:6,z:-7,w:1,d:8,h:3.8},{x:0,z:-11,w:11,d:1,h:4.5},{x:-12,z:1,w:1,d:5,h:2.8},{x:11,z:-11,w:5,d:1,h:2.2}];
export function canStand(x,z){return shore(x,z)&&!walls.some(a=>Math.abs(x-a.x)<a.w/2+.3&&Math.abs(z-a.z)<a.d/2+.3);}
export function move(p,dx,dz){if(canStand(p.x+dx,p.z))p.x+=dx;if(canStand(p.x,p.z+dz))p.z+=dz;return p;}
export function nearestEcho(p,found){return ECHOES.findIndex((e,i)=>!found.has(i)&&Math.hypot(p.x-e.x,p.z-e.z)<2.4);}
