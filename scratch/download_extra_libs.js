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
    console.log("Downloading extra libraries for self-hosting...");
    try {
        await download("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2", path.join(__dirname, "../assets/js/supabase.js"));
        console.log("Saved assets/js/supabase.js");
    } catch(e) { console.error("Supabase js download error:", e.message); }

    try {
        await download("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", path.join(__dirname, "../assets/js/html2pdf.bundle.min.js"));
        console.log("Saved assets/js/html2pdf.bundle.min.js");
    } catch(e) { console.error("html2pdf js download error:", e.message); }

    console.log("Extra libraries downloaded!");
}

main();
