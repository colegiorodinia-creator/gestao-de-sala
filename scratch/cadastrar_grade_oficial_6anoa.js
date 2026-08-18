const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';
const sb = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Iniciando cadastro e estruturação oficial da Grade Horária do 6º Ano A...");

    // 1. Cadastrar Disciplinas Oficiais da Grade
    const disciplinasOficiais = [
        { id: 'disc_matematica', nome: 'Matemática', cor: '#3B82F6' },
        { id: 'disc_pd', nome: 'PD', cor: '#F97316' },
        { id: 'disc_leit_gramatica', nome: 'Leit. e Gramática', cor: '#059669' },
        { id: 'disc_geografia', nome: 'Geografia', cor: '#10B981' },
        { id: 'disc_historia', nome: 'História', cor: '#8B5CF6' },
        { id: 'disc_lab_intel_emoc', nome: 'Lab. Intel. Emoc.', cor: '#6366F1' },
        { id: 'disc_arte_danca', nome: 'Arte - Dança', cor: '#84CC16' },
        { id: 'disc_redacao', nome: 'Redação', cor: '#7C3AED' },
        { id: 'disc_ingles_language', nome: 'Inglês - Language', cor: '#F59E0B' },
        { id: 'disc_cie_aplicada', nome: 'Ciê. Aplicada', cor: '#0284C7' },
        { id: 'disc_ingles_clil', nome: 'Inglês - CLIL', cor: '#EAB308' },
        { id: 'disc_ciencias', nome: 'Ciências', cor: '#06B6D4' },
        { id: 'disc_hist_geo', nome: 'Hist. / Geo.*', cor: '#9333EA' },
        { id: 'disc_arte_visual', nome: 'Arte - Visual', cor: '#14B8A6' },
        { id: 'disc_ed_fisica', nome: 'Ed. Física', cor: '#EC4899' }
    ];

    for (const d of disciplinasOficiais) {
        const { error } = await sb.from('disciplinas').upsert({
            id: d.id,
            nome: d.nome,
            cor: d.cor
        });
        if (error) console.warn("Erro ao upsert disciplina:", d.nome, error);
    }
    console.log("Disciplinas cadastradas/atualizadas com sucesso.");

    // 2. Cadastrar Professores Oficiais
    const professoresOficiais = [
        { id: 'prof_diego', nome: 'Diego', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_pd', nome: 'PD', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_rita', nome: 'Rita', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_mario', nome: 'Mário', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_ricardo', nome: 'Ricardo', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_monique', nome: 'Monique', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_alice', nome: 'Alice', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_karen', nome: 'Karen', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_valeska', nome: 'Valeska', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_dani_luana', nome: 'Dani / Luana', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_renatinha', nome: 'Renatinha', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_dani_reis', nome: 'Dani Reis', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_marcia', nome: 'Márcia', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_pavarina', nome: 'Pavarina', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_ricardo_mario', nome: 'Ricardo / Mário*', etapa: 'Ensino Fundamental Anos Finais' }
    ];

    for (const p of professoresOficiais) {
        const { error } = await sb.from('professores').upsert({
            id: p.id,
            nome: p.nome,
            etapa: p.etapa
        });
        if (error) console.warn("Erro ao upsert professor:", p.nome, error);
    }
    console.log("Professores cadastrados/atualizados com sucesso.");

    // 3. Matriz da Grade Horária Semanal Exata (6º Ano A)
    // Colunas (posicao_x): 0=Segunda, 1=Terça, 2=Quarta, 3=Quinta, 4=Sexta
    // Linhas (posicao_y): 0=07h15-08h05, 1=08h05-08h55, 2=08h55-09h45, 3=10h15-11h05, 4=11h05-11h55, 5=11h55-12h45
    const gradeMatriz = [
        // Aula 0: 07h15 - 08h05
        [
            { discId: 'disc_matematica', profId: 'prof_diego' },          // Segunda: Matemática (Diego)
            { discId: 'disc_pd', profId: 'prof_pd' },                     // Terça: PD (PD)
            { discId: 'disc_matematica', profId: 'prof_diego' },          // Quarta: Matemática (Diego)
            { discId: 'disc_historia', profId: 'prof_ricardo' },          // Quinta: História (Ricardo)
            { discId: 'disc_pd', profId: 'prof_pd' }                      // Sexta: PD (PD)
        ],
        // Aula 1: 08h05 - 08h55
        [
            { discId: 'disc_matematica', profId: 'prof_diego' },          // Segunda: Matemática (Diego)
            { discId: 'disc_leit_gramatica', profId: 'prof_rita' },       // Terça: Leit. e Gramática (Rita)
            { discId: 'disc_geografia', profId: 'prof_mario' },           // Quarta: Geografia (Mário)
            { discId: 'disc_historia', profId: 'prof_ricardo' },          // Quinta: História (Ricardo)
            { discId: 'disc_lab_intel_emoc', profId: 'prof_monique' }     // Sexta: Lab. Intel. Emoc. (Monique)
        ],
        // Aula 2: 08h55 - 09h45
        [
            { discId: 'disc_arte_danca', profId: 'prof_alice' },          // Segunda: Arte - Dança (Alice)
            { discId: 'disc_leit_gramatica', profId: 'prof_rita' },       // Terça: Leit. e Gramática (Rita)
            { discId: 'disc_redacao', profId: 'prof_karen' },             // Quarta: Redação (Karen)
            { discId: 'disc_ingles_language', profId: 'prof_valeska' },   // Quinta: Inglês - Language (Valeska)
            { discId: 'disc_matematica', profId: 'prof_diego' }           // Sexta: Matemática (Diego)
        ],
        // Aula 3: 10h15 - 11h05
        [
            { discId: 'disc_cie_aplicada', profId: 'prof_dani_luana' },    // Segunda: Ciê. Aplicada (Dani / Luana)
            { discId: 'disc_ingles_clil', profId: 'prof_renatinha' },     // Terça: Inglês - CLIL (Renatinha)
            { discId: 'disc_redacao', profId: 'prof_karen' },             // Quarta: Redação (Karen)
            { discId: 'disc_matematica', profId: 'prof_diego' },          // Quinta: Matemática (Diego)
            { discId: 'disc_geografia', profId: 'prof_mario' }            // Sexta: Geografia (Mário)
        ],
        // Aula 4: 11h05 - 11h55
        [
            { discId: 'disc_ciencias', profId: 'prof_dani_reis' },        // Segunda: Ciências (Dani Reis)
            { discId: 'disc_hist_geo', profId: 'prof_ricardo_mario' },    // Terça: Hist. / Geo.* (Ricardo / Mário*)
            { discId: 'disc_arte_visual', profId: 'prof_marcia' },        // Quarta: Arte - Visual (Márcia)
            { discId: 'disc_ingles_clil', profId: 'prof_renatinha' },     // Quinta: Inglês - CLIL (Renatinha)
            { discId: 'disc_ciencias', profId: 'prof_dani_reis' }         // Sexta: Ciências (Dani Reis)
        ],
        // Aula 5: 11h55 - 12h45
        [
            { discId: 'disc_ingles_language', profId: 'prof_valeska' },   // Segunda: Inglês - Language (Valeska)
            { discId: 'disc_ingles_clil', profId: 'prof_renatinha' },     // Terça: Inglês - CLIL (Renatinha)
            { discId: 'disc_leit_gramatica', profId: 'prof_rita' },       // Quarta: Leit. e Gramática (Rita)
            { discId: 'disc_ed_fisica', profId: 'prof_pavarina' },        // Quinta: Ed. Física (Pavarina)
            { discId: 'disc_ciencias', profId: 'prof_dani_reis' }         // Sexta: Ciências (Dani Reis)
        ]
    ];

    const { data: turmas } = await sb.from('turmas').select('*');
    const turmas6A = turmas ? turmas.filter(t => t.nome && t.nome.includes('6') && t.nome.includes('A')) : [];

    for (const turma of turmas6A) {
        await sb.from('grade_horaria_slots').delete().eq('turma_id', turma.id);
        const slotsToInsert = [];
        for (let aula = 0; aula < 6; aula++) {
            for (let dia = 0; dia < 5; dia++) {
                const item = gradeMatriz[aula][dia];
                slotsToInsert.push({
                    id: `g_slot_${turma.id}_${dia}_${aula}`,
                    turma_id: turma.id,
                    disciplina_id: item.discId,
                    professor_id: item.profId,
                    posicao_x: dia,
                    posicao_y: aula
                });
            }
        }
        const { error } = await sb.from('grade_horaria_slots').insert(slotsToInsert);
        console.log(`Turma ${turma.nome} (${turma.id}): inseridos ${slotsToInsert.length} slots. Erro:`, error);
    }

    console.log("Estruturação completa da Grade Horária finalizada com sucesso!");
}

main().catch(err => {
    console.error("Erro fatal:", err);
});
