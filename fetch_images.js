// Simple image downloader (CommonJS). Works with Node 14+.
// Usage: node fetch_images.js
// Downloads images listed in images/images.json into images/ folder.
// If an image already exists, it's skipped.

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imagesDir = path.join(__dirname, 'images');
const manifestPath = path.join(imagesDir, 'images.json');

function fetchWithRedirects(url, depth = 0) {
  const maxRedirects = 5;
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'fixnow-downloader', 'Accept': 'image/*' } }, (res) => {
      const code = res.statusCode || 0;
      // Handle redirects (3xx)
      if (code >= 300 && code < 400 && res.headers.location) {
        if (depth >= maxRedirects) {
          res.resume();
          return reject(new Error('Too many redirects'));
        }
        const next = new URL(res.headers.location, url).toString();
        res.resume();
        return fetchWithRedirects(next, depth + 1).then(resolve, reject);
      }
      if (code !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${code}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
  });
}

async function downloadBuffer(url) {
  // Prefer global fetch if available (Node 18+), else fallback to manual https/http with redirects
  if (typeof fetch === 'function') {
    const res = await fetch(url, { headers: { 'User-Agent': 'fixnow-downloader', 'Accept': 'image/*' }, redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return fetchWithRedirects(url);
}

async function main() {
  if (!fs.existsSync(manifestPath)) {
    console.error('Manifest not found:', manifestPath);
    process.exit(1);
  }
  const list = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  for (const item of list) {
    const target = path.join(imagesDir, item.filename);
    if (fs.existsSync(target)) {
      console.log('Skip existing', item.filename);
      continue;
    }
    try {
      console.log('Downloading', item.filename);
      const buffer = await downloadBuffer(item.url);
      fs.writeFileSync(target, buffer);
    } catch (e) {
      console.error('Failed', item.filename, '-', e.message);
    }
  }
  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });
