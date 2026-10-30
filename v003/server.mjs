import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),port=Number(process.env.PORT||8080);
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const rel=decodeURIComponent(url.pathname)==='/'?'/index.html':decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+rel);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}const body=await fs.readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.txt':'text/plain'})[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(body);}catch{res.writeHead(404).end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`CORRUPTED v0.03: http://127.0.0.1:${port}`));


