import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as serialize from 'serialize-javascript';

import App from './server/render';

const app = express();

const server = http.createServer(app);

const staticFiles = [
  '/static/*',
  '/asset-manifest.json',
  '/manifest.json',
  '/service-worker.js',
  '/favicon.ico',
  '/assets/*',
];

staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, '../build', req.url);
    res.sendFile(filePath);
  });
});

app.get('*', async (req, res) => {
  const template = path.join(__dirname, '../build/index.html');
  const htmlData = fs.readFileSync(template).toString();
  const rendered = App(req.url);
  const { html, helmet, state } = await rendered;
  const renderedHtml = htmlData
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div><script>window.__PRELOADED_STATE__=${serialize(state)}</script>`
    )
    .replace(
      '<meta helmet>',
      `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
    );
  res.status(200).send(renderedHtml);
});

server.listen(3000);