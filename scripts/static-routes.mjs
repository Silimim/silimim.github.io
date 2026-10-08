// GitHub Pages answers any path without a matching file with HTTP 404, even when
// 404.html then boots the SPA. Crawlers (e.g. the Google Play policy checker) stop
// at the status code, so every deep-linkable route gets a real copy of index.html.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const dist = 'dist';
const routes = [
  'projects/myfit',
  'projects/myfit/privacy',
  'projects/myfit/terms',
];

for (const route of routes) {
  // <route>.html serves /route, <route>/index.html serves /route/
  for (const target of [`${route}.html`, join(route, 'index.html')]) {
    const file = join(dist, target);
    mkdirSync(dirname(file), { recursive: true });
    copyFileSync(join(dist, 'index.html'), file);
  }
}
