const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCols() {
    const { data: profs, error: errProf } = await supabase.from('professores').select('*');
    console.log("Professores sample:", profs);

    const { data: ptd, error: errPtd } = await supabase.from('professores_turmas_disciplinas').select('*');
    console.log("PTD sample:", ptd);
}

checkCols();
