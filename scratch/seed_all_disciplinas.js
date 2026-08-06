const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

const supabase = createClient(supabaseUrl, supabaseKey);

const disciplinasDesejadas = [
    "Matemática",
    "Ciências Físicas e Biológicas",
    "História",
    "Geografia",
    "Ciências Sociais",
    "Educação Física",
    "Língua Inglesa - Programa Bilíngue",
    "Laboratório de Inteligência Emocional",
    "Arte-Visual",
    "Arte-Dança",
    "Arte-Música",
    "Arte-Teatro",
    "Ciência e Tecnologia Aplicadas ao Cotidiano",
    "Atualidades / Século XXI",
    "Língua Portuguesa - Leitura e Gramática",
    "Língua Portuguesa - Redação"
];

const cores = [
    "#3B82F6", "#F45206", "#8B5CF6", "#10B981", "#06B6D4", "#EC4899", 
    "#F59E0B", "#6366F1", "#14B8A6", "#84CC16", "#A855F7", "#E11D48", 
    "#0284C7", "#D97706", "#059669", "#7C3AED"
];

async function seedDisciplinas() {
    console.log("=== Cadastrando Disciplinas no Supabase ===");

    const { data: existentes, error: errFetch } = await supabase.from('disciplinas').select('*');
    if (errFetch) {
        console.error("Erro ao buscar disciplinas existentes:", errFetch);
        return;
    }

    console.log("Disciplinas atualmente no Supabase:", existentes ? existentes.length : 0);

    const nomesExistentes = new Set((existentes || []).map(d => d.nome.toLowerCase().trim()));

    const novasParaInserir = [];
    let count = Date.now();

    disciplinasDesejadas.forEach((nome, index) => {
        if (!nomesExistentes.has(nome.toLowerCase().trim())) {
            novasParaInserir.push({
                id: `disc_${count++}_${index}`,
                nome: nome,
                cor: cores[index % cores.length]
            });
        }
    });

    if (novasParaInserir.length === 0) {
        console.log("Todas as 16 disciplinas já existem no banco de dados!");
        return;
    }

    console.log(`Inserindo ${novasParaInserir.length} novas disciplinas...`);
    const { data: inseridas, error: errInsert } = await supabase.from('disciplinas').insert(novasParaInserir).select();

    if (errInsert) {
        console.error("Erro ao inserir disciplinas:", errInsert);
    } else {
        console.log(`✅ ${inseridas ? inseridas.length : novasParaInserir.length} disciplinas cadastradas com sucesso no Supabase!`);
    }

    const { data: final } = await supabase.from('disciplinas').select('*');
    console.log("Total final de disciplinas no Supabase:", final ? final.length : 0);
}

seedDisciplinas();
