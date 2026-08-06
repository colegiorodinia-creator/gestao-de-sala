const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("--- Testando Conexão Supabase ---");
    const { data: turmas, error: errTurmas } = await supabase.from('turmas').select('*');
    console.log("Turmas:", turmas ? turmas.length : null, "Err:", errTurmas);

    const { data: alunos, error: errAlunos } = await supabase.from('alunos').select('*');
    console.log("Alunos:", alunos ? alunos.length : null, "Err:", errAlunos);

    const { data: ocorrencias, error: errOc } = await supabase.from('ocorrencias_alunos').select('*');
    console.log("Ocorrências:", ocorrencias ? ocorrencias.length : null, "Err:", errOc);

    if (ocorrencias) {
        console.log("Primeiras ocorrencias:", ocorrencias.slice(0, 3));
    }
}

test();
