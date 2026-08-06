const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("=== Verificando Tabelas Supabase ===");

    const { data: turmas } = await supabase.from('turmas').select('*');
    const { data: alunos } = await supabase.from('alunos').select('*');
    const { data: disciplinas } = await supabase.from('disciplinas').select('*');
    const { data: professores } = await supabase.from('professores').select('*');
    const { data: ocorrencias } = await supabase.from('ocorrencias_alunos').select('*');

    console.log(`Turmas: ${turmas?.length || 0}`);
    console.log(`Alunos: ${alunos?.length || 0}`);
    console.log(`Disciplinas: ${disciplinas?.length || 0}`);
    console.log(`Professores: ${professores?.length || 0}`);
    console.log(`Ocorrências: ${ocorrencias?.length || 0}`);

    if (ocorrencias && ocorrencias.length === 0 && alunos && alunos.length > 0) {
        console.log("Seeding ocorrências...");
        const motivosNegativos = [
            "Dormindo",
            "Sonolento",
            "Fazendo tarefa de outra matéria",
            "Excesso de conversa",
            "Linguajar Inadequado",
            "Desrespeitoso com colegas",
            "Alteração comportamental",
            "Uso indevido de celular"
        ];
        
        const novasOcorrencias = [];
        let ocCounter = Date.now();

        for (let i = 0; i < 25; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (i % 14));
            
            const randAluno = alunos[Math.floor(Math.random() * alunos.length)];
            const motivo = motivosNegativos[Math.floor(Math.random() * motivosNegativos.length)];
            const discId = (disciplinas && disciplinas.length > 0) ? disciplinas[Math.floor(Math.random() * disciplinas.length)].id : null;
            const profNome = (professores && professores.length > 0) ? professores[0].nome : 'Prof. Marcos Antônio';
            
            novasOcorrencias.push({
                id: `oc_${ocCounter++}_${i}`,
                aluno_id: randAluno.id,
                turma_id: randAluno.turma_id || (turmas && turmas[0] ? turmas[0].id : 't1'),
                disciplina_id: discId,
                criado_por: 'prof_1',
                professor_nome: profNome,
                tipo: motivo,
                descricao: `Ocorrência registrada automaticamente no acompanhamento pedagógico (${motivo}).`,
                audio_url: null,
                created_at: date.toISOString()
            });
        }

        const { data: inserted, error: insertErr } = await supabase.from('ocorrencias_alunos').insert(novasOcorrencias).select();
        if (insertErr) {
            console.error("Erro ao inserir ocorrências:", insertErr);
        } else {
            console.log(`✅ Inseridas ${inserted?.length || novasOcorrencias.length} ocorrências com sucesso!`);
        }
    }
}

seed();
