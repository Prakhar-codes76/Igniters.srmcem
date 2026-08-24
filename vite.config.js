import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyBrainAssets() {
  const brainDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\272ce1a1-d5de-4f7a-8b76-246d5ad7950a';
  const publicImgDir = path.resolve('public', 'images');

  if (!fs.existsSync(publicImgDir)) {
    fs.mkdirSync(publicImgDir, { recursive: true });
  }

  const assets = [
    { src: 'india_2026_digital_space_1787584628900.jpg', dest: 'india-2026-digital-space.jpg' },
    { src: 'india_2047_futuristic_city_1787584652649.jpg', dest: 'india-2047-futuristic-city.jpg' },
    { src: 'india_2047_space_station_1787584704166.jpg', dest: 'india-2047-space-station.jpg' },
    { src: 'india_2047_quantum_ai_1787584728565.jpg', dest: 'india-2047-quantum-ai.jpg' },
    { src: 'india_2047_fusion_energy_1787584760995.jpg', dest: 'india-2047-fusion-energy.jpg' },
    { src: 'india_2047_digital_metaverse_1787584787327.jpg', dest: 'india-2047-digital-metaverse.jpg' }
  ];

  assets.forEach(({ src, dest }) => {
    const srcPath = path.join(brainDir, src);
    const destPath = path.join(publicImgDir, dest);
    try {
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    } catch (e) {
      // ignore
    }
  });
}

copyBrainAssets();

export default defineConfig({
  root: './',
  plugins: [
    {
      name: 'sync-brain-assets',
      buildStart() {
        copyBrainAssets();
      }
    }
  ],
  server: {
    port: 5173,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext'
  }
});

