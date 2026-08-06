const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log("=== Testando Inserção em Disciplinas ===");
    const nova = {
        id: `disc_${Date.now()}`,
        nome: 'Robótica e IA',
        cor: '#FF8A4C'
    };

    const { data, error } = await supabase.from('disciplinas').insert([nova]).select();
    console.log("Inserted data:", data);
    console.log("Error:", error);
}

testInsert();
