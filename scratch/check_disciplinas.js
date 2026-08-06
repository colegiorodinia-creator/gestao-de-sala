const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDisciplinas() {
    const { data, error } = await supabase.from('disciplinas').select('*');
    console.log("Supabase disciplinas count:", data ? data.length : 0);
    console.log("Supabase disciplinas data:", JSON.stringify(data, null, 2));
    console.log("Error:", error);
}

checkDisciplinas();
