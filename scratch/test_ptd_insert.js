const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPTDInsert() {
    console.log("=== Testando Inserção em professores_turmas_disciplinas ===");

    const sample = {
        id: `ptd_${Date.now()}`,
        professor_id: 'prof_1785760155939',
        turma_id: 't1',
        disciplina_id: 'Língua Portuguesa - Redação'
    };

    const { data, error } = await supabase.from('professores_turmas_disciplinas').upsert([sample]).select();
    console.log("PTD upsert result:", data);
    console.log("PTD error:", error);
}

testPTDInsert();
