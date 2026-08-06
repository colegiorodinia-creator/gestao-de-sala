const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
    'https://vjnfkaenqrprtsiuqilb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg'
);

async function main() {
    console.log("🚀 Criando / Verificando tabela historico_mapa_sala no Supabase...");

    // Testar se a tabela historico_mapa_sala existe ou pode receber registros
    const { data: testData, error: testErr } = await sb.from('historico_mapa_sala').select('*').limit(1);

    if (testErr) {
        console.log("Aviso ao consultar historico_mapa_sala (tabela pode precisar ser criada via API ou fallback local):", testErr.message);
    } else {
        console.log("✓ Tabela historico_mapa_sala existe e está operacional no Supabase!");
    }

    // Gerar snapshots históricos iniciais com base nos mapa_sala_slots atuais
    const { data: slots } = await sb.from('mapa_sala_slots').select('*');
    if (slots && slots.length > 0) {
        const agora = new Date().toISOString();
        const historicos = slots.filter(s => s.aluno_id).map(s => ({
            id: `hist_${s.turma_id}_${s.aluno_id}_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
            turma_id: s.turma_id,
            aluno_id: s.aluno_id,
            posicao_x: s.posicao_x,
            posicao_y: s.posicao_y,
            data_inicio: agora,
            data_fim: null,
            ativo: true
        }));

        const { error: insertErr } = await sb.from('historico_mapa_sala').upsert(historicos);
        if (insertErr) {
            console.warn("Aviso ao registrar snapshots históricos no Supabase:", insertErr.message);
        } else {
            console.log(`✓ ${historicos.length} registros de snapshot histórico criados no Supabase!`);
        }
    }
}

main();
