const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
    'https://vjnfkaenqrprtsiuqilb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg'
);

async function main() {
    console.log("🚀 Sincronizando Professores, Disciplinas e Grade Horária no Supabase...");

    // 1. Garantir disciplina Projeto de Vida (PD)
    const discPd = {
        id: 'disc_pd',
        nome: 'Projeto de Vida (PD)',
        cor: '#F97316'
    };
    await sb.from('disciplinas').upsert([discPd]);

    // Mapeamento de IDs de Disciplinas
    const mapDisc = {
        'Matemática': 'd1',
        'Leitura e Gramática': 'disc_1785762109450_14',
        'Redação': 'disc_1785762109451_15',
        'História': 'd3',
        'Geografia': 'd4',
        'Ciências Sociais': 'disc_1785762109440_4',
        'Ciências Físicas e Biológicas': 'disc_1785762109439_1',
        'Ciência e Tecnologia': 'disc_1785762109448_12',
        'Arte-Dança': 'disc_1785762109445_9',
        'Arte-Visual': 'disc_1785762109444_8',
        'Inteligência Emocional': 'disc_1785762109443_7',
        'Inglês': 'disc_1785762109442_6',
        'Educação Física': 'disc_1785762109441_5',
        'PD': 'disc_pd'
    };

    // 2. Lista oficial de professores
    const professoresData = [
        { id: 'prof_diego', nome: 'Diego', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_rita', nome: 'Rita', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_karen', nome: 'Karen', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_ricardo', nome: 'Ricardo', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_mario', nome: 'Mário', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_dani_reis', nome: 'Dani Reis', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_dani_luana', nome: 'Dani / Luana', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_alice', nome: 'Alice', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_marcia', nome: 'Márcia', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_monique', nome: 'Monique', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_valeska', nome: 'Valeska', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_renatinha', nome: 'Renatinha', etapa: 'Ensino Fundamental Anos Finais' },
        { id: 'prof_pavarina', nome: 'Pavarina', etapa: 'Ensino Fundamental Anos Finais' }
    ];

    const { error: errProf } = await sb.from('professores').upsert(professoresData);
    if (errProf) {
        console.error("Erro ao salvar professores:", errProf);
        return;
    }
    console.log("✓ 13 Professores salvos com sucesso no Supabase!");

    // 3. Vincular PTD (professores_turmas_disciplinas) para 6º Ano A (t1)
    const ptdData = [
        { id: 'ptd_diego_mat', professor_id: 'prof_diego', turma_id: 't1', disciplina_id: mapDisc['Matemática'] },
        { id: 'ptd_rita_lg', professor_id: 'prof_rita', turma_id: 't1', disciplina_id: mapDisc['Leitura e Gramática'] },
        { id: 'ptd_karen_red', professor_id: 'prof_karen', turma_id: 't1', disciplina_id: mapDisc['Redação'] },
        { id: 'ptd_ricardo_hist', professor_id: 'prof_ricardo', turma_id: 't1', disciplina_id: mapDisc['História'] },
        { id: 'ptd_mario_geo', professor_id: 'prof_mario', turma_id: 't1', disciplina_id: mapDisc['Geografia'] },
        { id: 'ptd_dani_cfb', professor_id: 'prof_dani_reis', turma_id: 't1', disciplina_id: mapDisc['Ciências Físicas e Biológicas'] },
        { id: 'ptd_dani_luana_ct', professor_id: 'prof_dani_luana', turma_id: 't1', disciplina_id: mapDisc['Ciência e Tecnologia'] },
        { id: 'ptd_alice_ad', professor_id: 'prof_alice', turma_id: 't1', disciplina_id: mapDisc['Arte-Dança'] },
        { id: 'ptd_marcia_av', professor_id: 'prof_marcia', turma_id: 't1', disciplina_id: mapDisc['Arte-Visual'] },
        { id: 'ptd_monique_ie', professor_id: 'prof_monique', turma_id: 't1', disciplina_id: mapDisc['Inteligência Emocional'] },
        { id: 'ptd_valeska_ing', professor_id: 'prof_valeska', turma_id: 't1', disciplina_id: mapDisc['Inglês'] },
        { id: 'ptd_renatinha_ing', professor_id: 'prof_renatinha', turma_id: 't1', disciplina_id: mapDisc['Inglês'] },
        { id: 'ptd_pavarina_ef', professor_id: 'prof_pavarina', turma_id: 't1', disciplina_id: mapDisc['Educação Física'] }
    ];

    const { error: errPtd } = await sb.from('professores_turmas_disciplinas').upsert(ptdData);
    if (errPtd) console.error("Erro ao salvar PTD:", errPtd);
    else console.log("✓ Vínculos PTD salvos no Supabase!");

    // 4. Grade Horária Oficial (6 Aulas x 5 Dias = 30 Slots)
    // Segunda=0, Terça=1, Quarta=2, Quinta=3, Sexta=4
    const gradeMatriz = [
        // AULA 1 (07:15 - 08:05)
        [ { disc: mapDisc['Matemática'], prof: 'prof_diego' }, { disc: mapDisc['PD'], prof: 'prof_diego' }, { disc: mapDisc['Matemática'], prof: 'prof_diego' }, { disc: mapDisc['História'], prof: 'prof_ricardo' }, { disc: mapDisc['PD'], prof: 'prof_diego' } ],
        // AULA 2 (08:05 - 08:55)
        [ { disc: mapDisc['Matemática'], prof: 'prof_diego' }, { disc: mapDisc['Leitura e Gramática'], prof: 'prof_rita' }, { disc: mapDisc['Geografia'], prof: 'prof_mario' }, { disc: mapDisc['História'], prof: 'prof_ricardo' }, { disc: mapDisc['Inteligência Emocional'], prof: 'prof_monique' } ],
        // AULA 3 (08:55 - 09:45)
        [ { disc: mapDisc['Arte-Dança'], prof: 'prof_alice' }, { disc: mapDisc['Leitura e Gramática'], prof: 'prof_rita' }, { disc: mapDisc['Redação'], prof: 'prof_karen' }, { disc: mapDisc['Inglês'], prof: 'prof_valeska' }, { disc: mapDisc['Matemática'], prof: 'prof_diego' } ],
        // AULA 4 (10:15 - 11:05)
        [ { disc: mapDisc['Ciência e Tecnologia'], prof: 'prof_dani_luana' }, { disc: mapDisc['Inglês'], prof: 'prof_renatinha' }, { disc: mapDisc['Redação'], prof: 'prof_karen' }, { disc: mapDisc['Matemática'], prof: 'prof_diego' }, { disc: mapDisc['Geografia'], prof: 'prof_mario' } ],
        // AULA 5 (11:05 - 11:55)
        [ { disc: mapDisc['Ciências Físicas e Biológicas'], prof: 'prof_dani_reis' }, { disc: mapDisc['História'], prof: 'prof_ricardo' }, { disc: mapDisc['Arte-Visual'], prof: 'prof_marcia' }, { disc: mapDisc['Inglês'], prof: 'prof_renatinha' }, { disc: mapDisc['Ciências Físicas e Biológicas'], prof: 'prof_dani_reis' } ],
        // AULA 6 (11:55 - 12:45)
        [ { disc: mapDisc['Inglês'], prof: 'prof_valeska' }, { disc: mapDisc['Inglês'], prof: 'prof_renatinha' }, { disc: mapDisc['Leitura e Gramática'], prof: 'prof_rita' }, { disc: mapDisc['Educação Física'], prof: 'prof_pavarina' }, { disc: mapDisc['Ciências Físicas e Biológicas'], prof: 'prof_dani_reis' } ]
    ];

    const gradeSlots = [];
    for (let aula = 0; aula < 6; aula++) {
        for (let dia = 0; dia < 5; dia++) {
            const item = gradeMatriz[aula][dia];
            gradeSlots.push({
                id: `g_slot_t1_${dia}_${aula}`,
                turma_id: 't1',
                disciplina_id: item.disc,
                professor_id: item.prof,
                posicao_x: dia,
                posicao_y: aula
            });
        }
    }

    const { error: errGrade } = await sb.from('grade_horaria_slots').upsert(gradeSlots);
    if (errGrade) console.error("Erro ao salvar grade_horaria_slots:", errGrade);
    else console.log("✓ Todas as 30 Aulas da Grade Horária Semanal salvos no Supabase!");

    console.log("🎉 TODAS AS INFORMAÇÕES SINCRONIZADAS COM SUCESSO NO SUPABASE!");
}

main();
