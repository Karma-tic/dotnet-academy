import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const distDir = path.resolve('site/dist');
const qaDir = path.resolve('docs/qa');

if (!fs.existsSync(qaDir)) {
  fs.mkdirSync(qaDir, { recursive: true });
}

const mimeTypes = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.html': 'text/html',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || !path.extname(reqPath)) {
    reqPath = '/index.html';
  }
  const filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

server.listen(4173, async () => {
  console.log('Preview server running on http://localhost:4173');
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--hide-scrollbars',
    'http://localhost:4173/'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.type === 'page') || tabs[0];

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (msg) => {
          const res = JSON.parse(msg.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const tasks = [
      { name: 'viewport-360px-mobile.png', width: 360, height: 800, mobile: true },
      { name: 'viewport-768px-tablet.png', width: 768, height: 1024, mobile: false },
      { name: 'viewport-1024px-laptop.png', width: 1024, height: 768, mobile: false },
      { name: 'viewport-1440px-desktop.png', width: 1440, height: 900, mobile: false },
    ];

    for (const t of tasks) {
      console.log(`Capturing ${t.width}x${t.height} -> ${t.name}...`);
      await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: t.width,
        height: t.height,
        deviceScaleFactor: 1,
        mobile: t.mobile
      });

      await new Promise(r => setTimeout(r, 350));

      const screenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
      if (screenshot && screenshot.data) {
        const outPath = path.join(qaDir, t.name);
        fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
        console.log(`Saved ${outPath}`);
      }
    }

    ws.close();
    chrome.kill();
    server.close();
    console.log('QA screenshot automation completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error during CDP execution:', err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
});
