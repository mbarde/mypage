const baseUrl = 'https://mbarde.de';
const urls = ['/', '/#web', '/#fun', '/#more', '/#turtle'];

const now = new Date();
const dateStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;

const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `
    <url>
      <loc>${baseUrl + url}</loc>
      <lastmod>${dateStr}</lastmod>
    </url>
  `).join('') }
</urlset>`;

const fs = require('fs');
fs.writeFile('sitemap.xml', content, err => {
  if (err) {
    console.error(err);
  }
  console.log('done generating sitemap!');
});