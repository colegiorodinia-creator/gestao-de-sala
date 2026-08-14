// supabase_mock.js
// Interceptador e Mock do Supabase para o Portal Rodin rodar localmente caso o banco em nuvem esteja inacessível.

(function() {
    const originalCreateClient = window.supabase ? window.supabase.createClient : null;
    let useMock = false;
    const officialHost = 'vjnfkaenqrprtsiuqilb.supabase.co';

    class MockSupabaseClient {
        constructor(url, key) {
            this.url = url;
            this.key = key;
            console.warn("⚠️ Banco de dados em nuvem inacessível. Utilizando Banco de Dados Fictício Local (LocalStorage) para o Portal Rodin.");
            this.showLocalModeBanner();
            this.initLocalStorage();
        }

        showLocalModeBanner() {
            document.addEventListener('DOMContentLoaded', () => {
                if (document.getElementById('supabase-local-banner')) return;
                const banner = document.createElement('div');
                banner.id = 'supabase-local-banner';
                banner.style.position = 'fixed';
                banner.style.bottom = '15px';
                banner.style.right = '15px';
                banner.style.background = '#404545';
                banner.style.color = '#FFF';
                banner.style.padding = '10px 16px';
                banner.style.borderRadius = '999px';
                banner.style.fontSize = '12px';
                banner.style.fontWeight = '700';
                banner.style.letterSpacing = '0.05em';
                banner.style.textTransform = 'uppercase';
                banner.style.border = '1px solid rgba(244, 82, 6, 0.4)';
                banner.style.boxShadow = '0 4px 16px rgba(31,34,34,.16)';
                banner.style.zIndex = '99999';
                banner.style.display = 'flex';
                banner.style.alignItems = 'center';
                banner.style.gap = '8px';

                banner.innerHTML = `
                    <span style="display:inline-block; width:8px; height:8px; background:#F45206; border-radius:50%; box-shadow: 0 0 8px #F45206; animation: pulseRodin 1.5s infinite;"></span>
                    <span>MODO LOCAL ATIVO · BANCO FICTÍCIO</span>
                    <button onclick="this.parentElement.remove()" style="background:transparent; border:none; color:#AAA38E; cursor:pointer; font-size:14px; font-weight:bold; margin-left:6px; line-height:1;">&times;</button>
                `;

                if (!document.getElementById('supabase-mock-styles')) {
                    const style = document.createElement('style');
                    style.id = 'supabase-mock-styles';
                    style.innerHTML = `
                        @keyframes pulseRodin {
                            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 82, 6, 0.7); }
                            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(244, 82, 6, 0); }
                            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244, 82, 6, 0); }
                        }
                    `;
                    document.head.appendChild(style);
                }

                document.body.appendChild(banner);
            });
        }
        
        initLocalStorage() {
            // Verificar se o localStorage já tem o formato com fotos locais do 6º Ano A
            const alunosSalvos = localStorage.getItem('rodin_alunos');
            if (alunosSalvos && alunosSalvos.includes('/alunos_6anoa/')) {
                return;
            }
            
            console.log("Populando alunos reais do 6º Ano A com fotos locais...");
            localStorage.clear();
            
            const turmas = [
                { id: "t1", nome: '6º Ano A', config_mapa: { linhas: 5, colunas: 6 }, config_grade: { linhas: 6, colunas: 5 }, etapa: 'Ensino Fundamental' }
            ];
            
            const alunos = [
                { id: "a1",  nome: "Gabriel Corrêa",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Gabriel%20Prada%20Corr%C3%AAa.png" },
                { id: "a2",  nome: "Guilherme Moraes",      turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Guilherme%20Ferrareto%20de%20Moraes.png" },
                { id: "a3",  nome: "Cecília Santos",        turma_id: "t1", condicao: "TDAH",    avatar: "/alunos_6anoa/Cec%C3%ADlia%20Lira%20Vieira%20dos%20Santos.png" },
                { id: "a4",  nome: "João Vitor Reis",       turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Jo%C3%A3o%20Vitor%20Braga%20Reis.png" },
                { id: "a5",  nome: "Helena Borsari",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Helena%20de%20Genaro%20Borsari.png" },
                { id: "a6",  nome: "Matteo Biancofiori",   turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Matteo%20Kugelmeier%20Biancofiori.png" },
                { id: "a7",  nome: "Esther Inocêncio",      turma_id: "t1", condicao: "TDAH",    avatar: "/alunos_6anoa/Esther%20Seabra%20Inoc%C3%AAncio.png" },
                { id: "a8",  nome: "Davi Luiz Cabral",      turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Davi%20Luiz%20Mendes%20Cabral.png" },
                { id: "a9",  nome: "Isadora Rodrigues",     turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Isadora%20Sombini%20Rodrigues.png" },
                { id: "a10", nome: "Federico Trapani",      turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Federico%20Trapani.png" },
                { id: "a11", nome: "Alice Silva",           turma_id: "t1", condicao: "TOD",     avatar: "/alunos_6anoa/Alice%20Sousa%20Xavier%20Silva.png" },
                { id: "a12", nome: "Sofia Santos",          turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Sofia%20Fidelis%20Lima%20dos%20Santos.png" },
                { id: "a13", nome: "Alice Roccato",         turma_id: "t1", condicao: "TEA",     avatar: "/alunos_6anoa/Alice%20Bianchi%20de%20Paula%20Roccato.png" },
                { id: "a14", nome: "Alice Costa",           turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Alice%20Prud%C3%AAncio%20Costa.png" },
                { id: "a15", nome: "Benjamin Denny",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Benjamin%20Pistoni%20Denny.png" },
                { id: "a16", nome: "Larissa Maciel",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Larissa%20Leal%20Maciel.png" },
                { id: "a17", nome: "João Mateus Oliveira",  turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Jo%C3%A3o%20Mateus%20de%20Oliveira.png" },
                { id: "a18", nome: "Enzo Cardoso",          turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Enzo%20Huoliver%20de%20Andrade%20Cardoso.png" },
                { id: "a19", nome: "Guilherme Silva",       turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Guilherme%20Beccari%20da%20Silva.png" },
                { id: "a20", nome: "Murilo Novais",         turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Murilo%20Dumette%20Malveze%20Tedeschi%20Novais.png" },
                { id: "a21", nome: "Helena Martins",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Helena%20Annunciato%20Martins.png" },
                { id: "a22", nome: "Melissa Ferraraccio",   turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Melissa%20dos%20Santos%20Ferraraccio.png" },
                { id: "a23", nome: "Enzo Sciotti",          turma_id: "t1", condicao: "TEA",     avatar: "/alunos_6anoa/Enzo%20Scarpelli%20Sciotti.png" },
                { id: "a24", nome: "Ester Arantes",         turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Ester%20Cardozo%20Arantes.png" },
                { id: "a25", nome: "André Melo",            turma_id: "t1", condicao: "TOD",     avatar: "/alunos_6anoa/Andr%C3%A9%20Martins%20Melo.png" },
                { id: "a26", nome: "Melissa Botini",        turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Melissa%20Morandi%20Botini.png" },
                { id: "a27", nome: "Lucas Hernandez",       turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Lucas%20Ricardo%20Santana%20Hernandez.png" },
                { id: "a28", nome: "André Valle",           turma_id: "t1", condicao: "TDAH",    avatar: "/alunos_6anoa/Andr%C3%A9%20Moreno%20do%20Valle.png" },
                { id: "a29", nome: "Isabela Monegatto",     turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Isabela%20de%20Lima%20Monegatto.png" },
                { id: "a30", nome: "Maria Clara Geraldo",   turma_id: "t1", condicao: "Nenhuma", avatar: "/alunos_6anoa/Maria%20Clara%20Frazatto%20Geraldo.png" }
            ];

            const disciplinas = [
                { id: "d1", nome: 'Matemática', cor: '#3B82F6' },
                { id: "d2", nome: 'Língua Portuguesa', cor: '#F45206' },
                { id: "d3", nome: 'História', cor: '#8B5CF6' },
                { id: "d4", nome: 'Geografia', cor: '#10B981' },
                { id: "d5", nome: 'Ciências', cor: '#06B6D4' }
            ];

            const professores = [
                { id: "p1", nome: 'Prof. Carlos Eduardo', user_id: 'u1', etapa: 'Ensino Fundamental Anos Finais' },
                { id: "p2", nome: 'Profa. Ana Paula', user_id: 'u2', etapa: 'Ensino Fundamental Anos Finais' },
                { id: "p3", nome: 'Prof. Marcos Silva', user_id: 'u3', etapa: 'Ensino Fundamental Anos Finais' },
                { id: "p4", nome: 'Profa. Julia Fernandes', user_id: 'u4', etapa: 'Ensino Fundamental Anos Finais' }
            ];

            const ptd = [
                { id: "ptd1", professor_id: "p1", turma_id: "t1", disciplina_id: "d1" },
                { id: "ptd2", professor_id: "p2", turma_id: "t1", disciplina_id: "d2" },
                { id: "ptd3", professor_id: "p3", turma_id: "t1", disciplina_id: "d3" },
                { id: "ptd4", professor_id: "p4", turma_id: "t1", disciplina_id: "d4" }
            ];

            const mapaSlots = [];
            turmas.forEach(turma => {
                const alunosTurma = alunos.filter(a => a.turma_id === turma.id);
                const cols = turma.config_mapa.colunas;
                const rows = turma.config_mapa.linhas;
                
                let positions = [];
                for(let r=0; r<rows; r++){
                    for(let c=0; c<cols; c++){
                        positions.push({x: c, y: r});
                    }
                }
                positions.sort(() => Math.random() - 0.5);
                
                alunosTurma.forEach((aluno, i) => {
                    if (i < positions.length) {
                        mapaSlots.push({
                            id: `m_slot_${aluno.id}`,
                            turma_id: turma.id,
                            aluno_id: aluno.id,
                            posicao_x: positions[i].x,
                            posicao_y: positions[i].y,
                            data_inicio: new Date().toISOString(),
                            data_fim: null
                        });
                    }
                });
            });

            const gradeSlots = [];
            turmas.forEach(turma => {
                for (let dia = 0; dia < 5; dia++) {
                    for (let aula = 0; aula < 6; aula++) {
                        const randIndex = Math.floor(Math.random() * disciplinas.length);
                        gradeSlots.push({
                            id: `g_slot_${turma.id}_${dia}_${aula}`,
                            turma_id: turma.id,
                            professor_id: professores[randIndex % professores.length].id,
                            disciplina_id: disciplinas[randIndex].id,
                            posicao_x: dia,
                            posicao_y: aula,
                            data_inicio: new Date().toISOString(),
                            data_fim: null
                        });
                    }
                }
            });

            const ocorrencias = [];
            const motivosNegativos = [
                "Dormindo",
                "Sonolento",
                "Fazendo tarefa de outra matéria",
                "Excesso de conversa",
                "Linguajar Inadequado",
                "Desrespeitoso com colegas",
                "Alteração comportamental"
            ];
            
            let ocCounter = 1;
            for(let i=0; i<20; i++) {
                const date = new Date();
                date.setDate(date.getDate() - (i % 10));
                
                const randAluno = alunos[Math.floor(Math.random() * alunos.length)];
                const motivo = motivosNegativos[Math.floor(Math.random() * motivosNegativos.length)];
                
                ocorrencias.push({
                    id: `oc_${ocCounter++}`,
                    aluno_id: randAluno.id,
                    turma_id: randAluno.turma_id,
                    disciplina_id: disciplinas[Math.floor(Math.random() * disciplinas.length)].id,
                    criado_por: professores[0].id,
                    tipo: motivo,
                    descricao: null,
                    audio_url: null,
                    data: date.toISOString(),
                    created_at: date.toISOString(),
                    status_kanban: i < 5 ? 'novos' : (i < 10 ? 'analise' : 'concluido')
                });
            }

            localStorage.setItem('rodin_turmas', JSON.stringify(turmas));
            localStorage.setItem('rodin_alunos', JSON.stringify(alunos));
            localStorage.setItem('rodin_disciplinas', JSON.stringify(disciplinas));
            localStorage.setItem('rodin_professores', JSON.stringify(professores));
            localStorage.setItem('rodin_professores_turmas_disciplinas', JSON.stringify(ptd));
            localStorage.setItem('rodin_mapa_sala_slots', JSON.stringify(mapaSlots));
            localStorage.setItem('rodin_grade_horaria_slots', JSON.stringify(gradeSlots));
            localStorage.setItem('rodin_ocorrencias_alunos', JSON.stringify(ocorrencias));
            localStorage.setItem('rodin_presencas_alunos', JSON.stringify([]));
        }
        
        from(tableName) {
            const storageKey = `rodin_${tableName}`;
            
            const getLocalData = () => {
                try {
                    return JSON.parse(localStorage.getItem(storageKey)) || [];
                } catch(e) {
                    console.error("Erro ao ler tabela " + tableName, e);
                    return [];
                }
            };
            
            const saveLocalData = (data) => {
                try {
                    localStorage.setItem(storageKey, JSON.stringify(data));
                } catch(e) {
                    console.error("Erro ao salvar tabela " + tableName, e);
                }
            };
            
            return {
                select(query = '*') {
                    let data = getLocalData();
                    let result = [...data];
                    
                    const chain = {
                        is(column, value) {
                            if (value === null) {
                                result = result.filter(item => item[column] === null || item[column] === undefined);
                            } else {
                                result = result.filter(item => item[column] === value);
                            }
                            return this;
                        },
                        eq(column, value) {
                            result = result.filter(item => item[column] === value);
                            return this;
                        },
                        neq(column, value) {
                            result = result.filter(item => item[column] !== value);
                            return this;
                        },
                        then(onfulfilled) {
                            return Promise.resolve({ data: result, error: null }).then(onfulfilled);
                        }
                    };
                    
                    const promise = Promise.resolve({ data: result, error: null });
                    Object.assign(promise, chain);
                    return promise;
                },
                
                insert(rows) {
                    let data = getLocalData();
                    const newRows = Array.isArray(rows) ? rows : [rows];
                    newRows.forEach(row => {
                        if (!row.id) {
                            row.id = `mock_${tableName}_${Math.random().toString(36).substr(2, 9)}`;
                        }
                        row.sync_status = 'synced';
                        data.push(row);
                    });
                    saveLocalData(data);
                    
                    const chain = {
                        select() {
                            return Promise.resolve({ data: newRows, error: null });
                        },
                        then(onfulfilled) {
                            return Promise.resolve({ data: newRows, error: null }).then(onfulfilled);
                        }
                    };
                    
                    const promise = Promise.resolve({ data: newRows, error: null });
                    Object.assign(promise, chain);
                    return promise;
                },
                
                update(values) {
                    let data = getLocalData();
                    let updatedRows = [];
                    
                    const applyUpdate = (predicate) => {
                        data = data.map(item => {
                            if (predicate(item)) {
                                const updated = { ...item, ...values };
                                updatedRows.push(updated);
                                return updated;
                            }
                            return item;
                        });
                        saveLocalData(data);
                    };

                    const chain = {
                        eq(column, value) {
                            applyUpdate(item => String(item[column]) === String(value));
                            return chain;
                        },
                        is(column, value) {
                            applyUpdate(item => (value === null ? (item[column] === null || item[column] === undefined) : item[column] === value));
                            return chain;
                        },
                        select() {
                            return Promise.resolve({ data: updatedRows, error: null });
                        },
                        then(onfulfilled) {
                            return Promise.resolve({ data: updatedRows, error: null }).then(onfulfilled);
                        }
                    };
                    
                    return chain;
                },
                
                delete() {
                    let data = getLocalData();
                    
                    const applyDelete = (predicate) => {
                        data = data.filter(item => !predicate(item));
                        saveLocalData(data);
                    };

                    const chain = {
                        eq(column, value) {
                            applyDelete(item => String(item[column]) === String(value));
                            return chain;
                        },
                        is(column, value) {
                            applyDelete(item => (value === null ? (item[column] === null || item[column] === undefined) : item[column] === value));
                            return chain;
                        },
                        then(onfulfilled) {
                            return Promise.resolve({ data: null, error: null }).then(onfulfilled);
                        }
                    };
                    return chain;
                }
            };
        }
    }
    
    if (!window.supabase) window.supabase = {};
    window.supabase.createClient = function(url, key) {
        if (originalCreateClient) {
            try {
                const client = originalCreateClient(url, key);
                return client;
            } catch(e) {
                console.warn("Conexão ao Supabase em nuvem falhou. Ativando modo local mock:", e);
                return new MockSupabaseClient(url, key);
            }
        }
        return new MockSupabaseClient(url, key);
    };
})();
