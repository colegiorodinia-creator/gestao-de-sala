const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 1. Copy Inter fonts from @fontsource/inter
const fontSourceDir = path.join(__dirname, 'node_modules/@fontsource/inter/files');
const fontDestDir = path.join(__dirname, '../assets/fonts');
if (!fs.existsSync(fontDestDir)) fs.mkdirSync(fontDestDir, { recursive: true });

if (fs.existsSync(fontSourceDir)) {
    const files = fs.readdirSync(fontSourceDir);
    files.filter(f => f.endsWith('.woff2') && (f.includes('latin-400') || f.includes('latin-500') || f.includes('latin-600') || f.includes('latin-700') || f.includes('latin-800') || f.includes('latin-900'))).forEach(f => {
        fs.copyFileSync(path.join(fontSourceDir, f), path.join(fontDestDir, f));
        console.log(`Copied font: ${f}`);
    });
}

// 2. Copy Phosphor Icons
const phosphorSourceDir = path.join(__dirname, 'node_modules/@phosphor-icons/web/src');
const phosphorJsDest = path.join(__dirname, '../assets/js/phosphor.js');
const phosphorCssDest = path.join(__dirname, '../assets/css/phosphor.css');
const phosphorFontsDest = path.join(__dirname, '../assets/fonts/phosphor');

if (fs.existsSync(phosphorSourceDir)) {
    // Copy index.js to assets/js/phosphor.js
    if (fs.existsSync(path.join(phosphorSourceDir, 'index.js'))) {
        fs.copyFileSync(path.join(phosphorSourceDir, 'index.js'), phosphorJsDest);
        console.log('Copied phosphor.js');
    }
    // Copy style.css or src directory
    copyDir(phosphorSourceDir, path.join(__dirname, '../assets/icons/phosphor'));
    console.log('Copied Phosphor icons bundle to assets/icons/phosphor');
}

// 3. Copy face-api.min.js
const faceApiSource = path.join(__dirname, 'node_modules/face-api.js/dist/face-api.min.js');
const faceApiDest = path.join(__dirname, '../assets/js/face-api.min.js');
if (fs.existsSync(faceApiSource)) {
    fs.copyFileSync(faceApiSource, faceApiDest);
    console.log('Copied face-api.min.js');
}

console.log('Assets copy completed successfully!');
