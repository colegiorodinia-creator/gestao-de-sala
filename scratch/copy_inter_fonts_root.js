const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../node_modules/@fontsource/inter/files');
const destDir = path.join(__dirname, '../assets/fonts');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const fontMap = [
    { src: 'inter-latin-400-normal.woff2', dest: 'Inter-Regular.woff2' },
    { src: 'inter-latin-500-normal.woff2', dest: 'Inter-Medium.woff2' },
    { src: 'inter-latin-600-normal.woff2', dest: 'Inter-SemiBold.woff2' },
    { src: 'inter-latin-700-normal.woff2', dest: 'Inter-Bold.woff2' },
    { src: 'inter-latin-800-normal.woff2', dest: 'Inter-ExtraBold.woff2' },
    { src: 'inter-latin-900-normal.woff2', dest: 'Inter-Black.woff2' }
];

fontMap.forEach(item => {
    const sPath = path.join(srcDir, item.src);
    const dPath = path.join(destDir, item.dest);
    if (fs.existsSync(sPath)) {
        fs.copyFileSync(sPath, dPath);
        console.log(`Copied ${item.src} -> ${item.dest} (${fs.statSync(dPath).size} bytes)`);
    } else {
        console.warn(`File not found: ${item.src}`);
    }
});
