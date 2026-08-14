// =============================================================
// SCRIPT DE MIGRAÇÃO: FOTOS LOCAIS -> SUPABASE STORAGE (BUCKET: alunos-fotos)
// =============================================================

const https = require('https');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';
const BUCKET_NAME = 'alunos-fotos';

const PASTA_ALUNOS = path.join(__dirname, '../assets/alunos/6anoa');

async function migrar() {
    console.log('🚀 Iniciando verificação e migração de fotos para o Supabase Storage...');

    if (!fs.existsSync(PASTA_ALUNOS)) {
        console.error('❌ Pasta de alunos não encontrada:', PASTA_ALUNOS);
        return;
    }

    const arquivos = fs.readdirSync(PASTA_ALUNOS).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    console.log(`📁 Encontradas ${arquivos.length} fotos na pasta.`);

    for (const arquivo of arquivos) {
        const filePath = path.join(PASTA_ALUNOS, arquivo);
        const fileData = fs.readFileSync(filePath);
        const storagePath = `6anoa/${encodeURIComponent(arquivo)}`;

        console.log(`⬆️ Enviando ${arquivo} para o Storage...`);

        await new Promise((resolve) => {
            const req = https.request({
                hostname: 'vjnfkaenqrprtsiuqilb.supabase.co',
                path: `/storage/v1/object/${BUCKET_NAME}/${storagePath}`,
                method: 'POST',
                headers: {
                    'apikey': ANON_KEY,
                    'Authorization': 'Bearer ' + ANON_KEY,
                    'Content-Type': 'image/png',
                    'x-upsert': 'true',
                    'Content-Length': fileData.length
                }
            }, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    console.log(`   Resultado ${arquivo}: Status ${res.statusCode}`);
                    resolve();
                });
            });
            req.on('error', (err) => {
                console.error(`   Erro ao enviar ${arquivo}:`, err.message);
                resolve();
            });
            req.write(fileData);
            req.end();
        });
    }

    console.log('✅ Processo de envio finalizado!');
}

migrar();
