import fs from 'node:fs/promises';
const root=new URL('./',import.meta.url),read=name=>fs.readFile(new URL(name,root),'utf8');
const three=await read('three.module.js'),list=three.match(/export\s*\{([^}]+)\}\s*;?\s*$/s);if(!list)throw Error('Three export list missing');
const names=list[1].split(',').map(s=>s.trim()).filter(Boolean).map(s=>{const p=s.split(/\s+as\s+/);return p.length===2?`${p[1]}:${p[0]}`:s;}).join(',');
let bundle=`const THREE=(()=>{${three.slice(0,list.index)}\nreturn {${names}};})();\n`;
const modules={'three.module.js':'THREE','model.js':'Model','simulation.js':'Simulation','graphics.js':'Graphics'};
function rewrite(s){return s.replace(/import\s+([^;]+?)\s+from\s+['"]\.\/([^'"]+)['"];?/g,(_,binding,file)=>{if(!modules[file])throw Error('Unknown import '+file);return `const ${binding.startsWith('* as ')?binding.slice(5):binding}=${modules[file]};`;});}
for(const [file,name] of Object.entries(modules).slice(1)){const s=await read(file),exports=[...s.matchAll(/export\s+(?:function|class|const|let)\s+(\w+)/g)].map(m=>m[1]);if(file==='graphics.js')exports.push('T');bundle+=`const ${name}=(()=>{${rewrite(s).replace(/export\s*\{T\};/g,'').replace(/\bexport\s+/g,'')}\nreturn {${exports.join(',')}};})();\n`;}
bundle+=`(()=>{${rewrite(await read('game.js'))}})();`;
await fs.writeFile(new URL('bundle-check.js',root),bundle);
let html=await read('index.html');html=html.replace('<link rel="stylesheet" href="style.css">',`<style>${await read('style.css')}</style>`).replace('<script type="module" src="game.js"></script>',()=>`<script type="module">${bundle.replace(/<\/script/gi,'<\\/script')}</script>`);
await fs.writeFile(new URL('CORRUPTED-v0.04-offline.html',root),html);console.log('Created standalone desktop test build');
