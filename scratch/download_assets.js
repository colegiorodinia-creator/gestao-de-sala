const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function main() {
    console.log("Starting downloads...");

    // 1. Phosphor Icons
    console.log("Downloading Phosphor Icons...");
    try {
        await download("https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/index.js", path.join(__dirname, "../assets/js/phosphor.js"));
        console.log("Saved assets/js/phosphor.js");
    } catch(e) { console.error("Phosphor js err:", e.message); }

    try {
        await download("https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css", path.join(__dirname, "../assets/css/phosphor-regular.css"));
        await download("https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/bold/style.css", path.join(__dirname, "../assets/css/phosphor-bold.css"));
        await download("https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css", path.join(__dirname, "../assets/css/phosphor-fill.css"));
        console.log("Saved phosphor CSS files");
    } catch(e) { console.error("Phosphor css err:", e.message); }

    // 2. face-api.js
    console.log("Downloading face-api.min.js...");
    try {
        await download("https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js", path.join(__dirname, "../assets/js/face-api.min.js"));
        console.log("Saved assets/js/face-api.min.js");
    } catch(e) { console.error("face-api err:", e.message); }

    // 3. Face API Models
    console.log("Downloading face-api models...");
    const modelFiles = [
        "tiny_face_detector_model-weights_manifest.json",
        "tiny_face_detector_model-shard1",
        "face_landmark_68_model-weights_manifest.json",
        "face_landmark_68_model-shard1",
        "face_recognition_model-weights_manifest.json",
        "face_recognition_model-shard1",
        "face_recognition_model-shard2"
    ];
    for (const f of modelFiles) {
        try {
            await download(`https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/${f}`, path.join(__dirname, `../assets/models/${f}`));
            console.log(`Saved assets/models/${f}`);
        } catch(e) { console.error(`Model ${f} err:`, e.message); }
    }

    // 4. Inter Fonts
    console.log("Downloading Inter Font files...");
    const fontUrls = [
        { name: "Inter-Regular.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
        { name: "Inter-Medium.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2" },
        { name: "Inter-SemiBold.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyAZ9hiA.woff2" },
        { name: "Inter-Bold.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2" },
        { name: "Inter-ExtraBold.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYAZ9hiA.woff2" },
        { name: "Inter-Black.woff2", url: "https://fonts.gstatic.com/s/inter/v18/UcaC3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hiA.woff2" }
    ];
    for (const font of fontUrls) {
        try {
            await download(font.url, path.join(__dirname, `../assets/fonts/${font.name}`));
            console.log(`Saved assets/fonts/${font.name}`);
        } catch(e) { console.error(`Font ${font.name} err:`, e.message); }
    }

    console.log("All downloads completed!");
}

main();
