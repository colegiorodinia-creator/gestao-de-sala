const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'node_modules/@fontsource/inter/files');
const destDir = path.join(__dirname, '../assets/fonts');

if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    console.log("Found fontsource files count:", files.length);
    files.filter(f => f.endsWith('.woff2')).forEach(f => {
        fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
        console.log(`Copied ${f} (${fs.statSync(path.join(destDir, f)).size} bytes)`);
    });
}
