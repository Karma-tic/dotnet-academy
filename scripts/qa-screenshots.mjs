import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('site/dist');
const qaDir = path.resolve('docs/qa');

if (!fs.existsSync(qaDir)) {
  fs.mkdirSync(qaDir, { recursive: true });
}

// Simple MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Start static file server
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
    // Single page app fallback
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

server.listen(4173, async () => {
  console.log('Preview server started on http://localhost:4173');

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const resolutions = [
    { width: 360, height: 800, name: 'viewport-360px-mobile.png' },
    { width: 768, height: 1024, name: 'viewport-768px-tablet.png' },
    { width: 1024, height: 768, name: 'viewport-1024px-laptop.png' },
    { width: 1440, height: 900, name: 'viewport-1440px-desktop.png' },
  ];

  for (const res of resolutions) {
    const targetFile = path.join(qaDir, res.name);
    console.log(`Capturing ${res.width}x${res.height} -> ${res.name}...`);
    try {
      execSync(
        `"${chromePath}" --headless=new --disable-gpu --screenshot="${targetFile}" --window-size=${res.width},${res.height} --virtual-time-budget=3000 "http://localhost:4173/"`,
        { stdio: 'inherit' }
      );
      console.log(`Saved ${targetFile}`);
    } catch (err) {
      console.error(`Error capturing ${res.name}:`, err.message);
    }
  }

  // Also capture Career Hub & Certifications views
  const additionalViews = [
    { url: 'http://localhost:4173/#career', width: 1440, height: 900, name: 'view-career-hub-1440px.png' },
    { url: 'http://localhost:4173/#certifications', width: 1440, height: 900, name: 'view-certifications-1440px.png' },
    { url: 'http://localhost:4173/#cheatsheets', width: 1440, height: 900, name: 'view-cheatsheets-1440px.png' },
  ];

  for (const view of additionalViews) {
    const targetFile = path.join(qaDir, view.name);
    console.log(`Capturing ${view.url} -> ${view.name}...`);
    try {
      execSync(
        `"${chromePath}" --headless=new --disable-gpu --screenshot="${targetFile}" --window-size=${view.width},${view.height} --virtual-time-budget=3000 "${view.url}"`,
        { stdio: 'inherit' }
      );
      console.log(`Saved ${targetFile}`);
    } catch (err) {
      console.error(`Error capturing ${view.name}:`, err.message);
    }
  }

  server.close(() => {
    console.log('QA screenshot automation completed successfully.');
    process.exit(0);
  });
});
