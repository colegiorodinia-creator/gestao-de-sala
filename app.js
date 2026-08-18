// app.js — Portal Rodin v2.0
// Lógica da Aplicação alinhada perfeitamente com as Imagens de Referência do Cliente

if (!window.sb && window.supabase) {
    window.sb = window.supabase.createClient(
        'https://vjnfkaenqrprtsiuqilb.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg'
    );
}

if (!window.getClasseCondicao) {
    window.getClasseCondicao = function(cond) {
        if (!cond) return 'regular';
        return String(cond).toLowerCase().trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, '_');
    };
}

if (!window.db) {
    window.db = {
        turmas: [],
        alunos: [
            { id: "aluno_6a_1", nome: "Alice Bianchi de Paula Roccato", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Alice%20Bianchi%20de%20Paula%20Roccato.png" },
            { id: "aluno_6a_2", nome: "Alice Prudêncio Costa", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Alice%20Prud%C3%AAncio%20Costa.png" },
            { id: "aluno_6a_3", nome: "Alice Sousa Xavier Silva", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Alice%20Sousa%20Xavier%20Silva.png" },
            { id: "aluno_6a_4", nome: "André Martins Melo", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Andr%C3%A9%20Martins%20Melo.png" },
            { id: "aluno_6a_5", nome: "André Moreno do Valle", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Andr%C3%A9%20Moreno%20do%20Valle.png" },
            { id: "aluno_6a_6", nome: "Benjamin Pistoni Denny", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Benjamin%20Pistoni%20Denny.png" },
            { id: "aluno_6a_7", nome: "Cecília Lira Vieira dos Santos", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Cec%C3%ADlia%20Lira%20Vieira%20dos%20Santos.png" },
            { id: "aluno_6a_8", nome: "Davi Luiz Mendes Cabral", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Davi%20Luiz%20Mendes%20Cabral.png" },
            { id: "aluno_6a_9", nome: "Enzo Huoliver de Andrade Cardoso", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Enzo%20Huoliver%20de%20Andrade%20Cardoso.png" },
            { id: "aluno_6a_10", nome: "Enzo Scarpelli Sciotti", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Enzo%20Scarpelli%20Sciotti.png" },
            { id: "aluno_6a_11", nome: "Ester Cardozo Arantes", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Ester%20Cardozo%20Arantes.png" },
            { id: "aluno_6a_12", nome: "Esther Seabra Inocêncio", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Esther%20Seabra%20Inoc%C3%AAncio.png" },
            { id: "aluno_6a_13", nome: "Federico Trapani", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Federico%20Trapani.png" },
            { id: "aluno_6a_14", nome: "Gabriel Prada Corrêa", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Gabriel%20Prada%20Corr%C3%AAa.png" },
            { id: "aluno_6a_15", nome: "Guilherme Beccari da Silva", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Guilherme%20Beccari%20da%20Silva.png" },
            { id: "aluno_6a_16", nome: "Guilherme Ferrareto de Moraes", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Guilherme%20Ferrareto%20de%20Moraes.png" },
            { id: "aluno_6a_17", nome: "Helena Annunciato Martins", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Helena%20Annunciato%20Martins.png" },
            { id: "aluno_6a_18", nome: "Helena de Genaro Borsari", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Helena%20de%20Genaro%20Borsari.png" },
            { id: "aluno_6a_19", nome: "Isabela de Lima Monegatto", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Isabela%20de%20Lima%20Monegatto.png" },
            { id: "aluno_6a_20", nome: "Isadora Sombini Rodrigues", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Isadora%20Sombini%20Rodrigues.png" },
            { id: "aluno_6a_21", nome: "João Mateus de Oliveira", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Jo%C3%A3o%20Mateus%20de%20Oliveira.png" },
            { id: "aluno_6a_22", nome: "João Vitor Braga Reis", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Jo%C3%A3o%20Vitor%20Braga%20Reis.png" },
            { id: "aluno_6a_23", nome: "Larissa Leal Maciel", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Larissa%20Leal%20Maciel.png" },
            { id: "aluno_6a_24", nome: "Lucas Ricardo Santana Hernandez", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Lucas%20Ricardo%20Santana%20Hernandez.png" },
            { id: "aluno_6a_25", nome: "Maria Clara Frazatto Geraldo", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Maria%20Clara%20Frazatto%20Geraldo.png" },
            { id: "aluno_6a_26", nome: "Matteo Kugelmeier Biancofiori", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Matteo%20Kugelmeier%20Biancofiori.png" },
            { id: "aluno_6a_27", nome: "Melissa dos Santos Ferraraccio", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Melissa%20dos%20Santos%20Ferraraccio.png" },
            { id: "aluno_6a_28", nome: "Melissa Morandi Botini", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Melissa%20Morandi%20Botini.png" },
            { id: "aluno_6a_29", nome: "Murilo Dumette Malveze Tedeschi Novais", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Murilo%20Dumette%20Malveze%20Tedeschi%20Novais.png" },
            { id: "aluno_6a_30", nome: "Sofia Fidelis Lima dos Santos", turma_id: "t1", condicao: "Nenhuma", avatar: "/assets/alunos/6anoa/Sofia%20Fidelis%20Lima%20dos%20Santos.png" }
        ],
        disciplinas: [],
        professores: [],
        ptd: [],
        mapa_slots: [],
        grade_slots: [],
        ocorrencias: [],
        presencas: []
    };
}
if (!window.estadoApp) {
    window.estadoApp = {
        abaAtiva: 'gestao',
        subAbaAtiva: 'geral',
        turmaSelecionada: null,
        alunoSelecionadoModal: null,
        motivoSelecionadoModal: null,
        modoTablet: false
    };
}

// ==========================================
// 1. INICIALIZAÇÃO E CARREGAMENTO
// ==========================================
async function inicializarApp() {
    console.log("🚀 Inicializando Portal Rodin v2.0 (Novo Design Fiel)...");
    iniciarRelogio();
    carregarPerfilUsuario();

    if (localStorage.getItem('rodin_sidebar_collapsed') === 'true') {
        document.getElementById('sidebar-secondary')?.classList.add('collapsed');
    }

    renderizarInterface();

    await carregarDados();
    renderizarInterface();
}

// ==========================================
// 1.1 GESTÃO DO PERFIL DE USUÁRIO & PERMISSÕES DE TURMA (DIRETOR / ORIENTADORES)
// ==========================================
function obterListaUsuariosSistema() {
    try {
        const salvo = localStorage.getItem('rodin_usuarios_sistema');
        if (salvo) return JSON.parse(salvo);
    } catch (e) {}

    return [
        {
            id: 'usr_diretor',
            nome: 'Benedito Donizete Bueno da Silva',
            cargo: 'Direção Geral (Admin)',
            papel: 'diretor',
            turmas_permitidas: 'todas',
            foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 'usr_ricardo',
            nome: 'Ricardo Augusto Posso',
            cargo: 'Orientador Pedagógico (6º e 7º Anos)',
            papel: 'orientador',
            turmas_permitidas: ['6º Ano A', '6º Ano B', '7º Ano A', '7º Ano B'],
            foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        }
    ];
}

function salvarListaUsuariosSistema(lista) {
    window.safeSetLocalStorage('rodin_usuarios_sistema', lista);
    if (db) db.usuarios_sistema = lista;
}

function obterUsuarioLogado() {
    const usuarios = obterListaUsuariosSistema();
    const idSalvo = localStorage.getItem('rodin_usuario_logado_id') || 'usr_diretor';
    const achado = usuarios.find(u => u.id === idSalvo);
    return achado || usuarios[0];
}

function trocarUsuarioLogado(usuarioId) {
    const usuarios = obterListaUsuariosSistema();
    const usr = usuarios.find(u => u.id === usuarioId);
    if (!usr) return;

    localStorage.setItem('rodin_usuario_logado_id', usr.id);
    db.perfil_usuario = usr;

    carregarPerfilUsuario();
    fecharModalEditarPerfilUsuario();
    mostrarSnackbar(`Sessão alterada para: ${usr.nome} (${usr.cargo})`);

    // Atualizar relatórios e cadastros se estiver aberto
    renderizarInterface();
}

function carregarPerfilUsuario() {
    const usr = obterUsuarioLogado();
    db.perfil_usuario = usr;

    const elAvatar = document.getElementById('user-profile-avatar');
    const elNome = document.getElementById('user-profile-name');
    const elCargo = document.getElementById('user-profile-role');

    if (elAvatar) elAvatar.src = usr.foto;
    if (elNome) elNome.innerText = usr.nome;
    if (elCargo) elCargo.innerText = usr.cargo;
}

if (!window.ordenarTurmas) {
    window.ordenarTurmas = function(turmasList) {
        if (!Array.isArray(turmasList)) return [];

        function extrairInfoTurma(t) {
            const nome = typeof t === 'string' ? t : (t.nome || '');
            const nLower = nome.toLowerCase().trim()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            let pesoSerie = 99;

            if (nLower.includes('ppv') || nLower.includes('vestibular')) {
                pesoSerie = 14;
            } else if (nLower.includes('6')) {
                pesoSerie = 6;
            } else if (nLower.includes('7')) {
                pesoSerie = 7;
            } else if (nLower.includes('8')) {
                pesoSerie = 8;
            } else if (nLower.includes('9')) {
                pesoSerie = 9;
            } else if (nLower.includes('1') || nLower.includes('primeir')) {
                pesoSerie = 10;
            } else if (nLower.includes('2') || nLower.includes('segund')) {
                pesoSerie = 11;
            } else if (nLower.includes('3') || nLower.includes('terceir')) {
                pesoSerie = 12;
            }

            return { nome, pesoSerie };
        }

        return [...turmasList].sort((a, b) => {
            const infoA = extrairInfoTurma(a);
            const infoB = extrairInfoTurma(b);

            if (infoA.pesoSerie !== infoB.pesoSerie) {
                return infoA.pesoSerie - infoB.pesoSerie;
            }

            return infoA.nome.localeCompare(infoB.nome, 'pt-BR', { numeric: true, sensitivity: 'base' });
        });
    };
}

function obterTurmasPermitidasUsuario() {
    const usr = obterUsuarioLogado();
    let lista = db.turmas || [];
    const info = window.obterPermissoesESenhaUsuario(usr);
    if (usr && usr.papel === 'orientador' && Array.isArray(info.turmas) && info.turmas !== 'todas') {
        lista = (db.turmas || []).filter(t => info.turmas.some(p => t.nome.toLowerCase().includes(p.toLowerCase())));
    }
    return window.ordenarTurmas(lista);
}

function abrirModalTrocarUsuarioLogin() {
    renderizarListaUsuariosLogin();
    const modal = document.getElementById('modal-editar-perfil-usuario');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('modal-overlay');
        modal.style.zIndex = '10030';
    }
}

function fecharModalEditarPerfilUsuario() {
    const modal = document.getElementById('modal-editar-perfil-usuario');
    if (modal) modal.style.display = 'none';
}

function renderizarListaUsuariosLogin() {
    const container = document.getElementById('lista-usuarios-login-switcher');
    if (!container) return;

    const usuarios = obterListaUsuariosSistema();
    const usrLogado = obterUsuarioLogado();

    container.innerHTML = usuarios.map(u => {
        const isAtivo = u.id === usrLogado.id;
        const borderStyle = isAtivo ? 'border:2px solid var(--rodin-orange); background:#FFF7ED;' : 'border:1px solid #E2E8F0; background:#F8FAFC;';
        
        let turmasBadgeText = 'Acesso Total a Todas as Turmas';
        const info = window.obterPermissoesESenhaUsuario(u);
        if (u.papel === 'orientador' && Array.isArray(info.turmas)) {
            turmasBadgeText = `Permissão: ${info.turmas.join(', ')}`;
        }

        return `
            <div onclick="trocarUsuarioLogado('${u.id}')" 
                 style="padding:12px 14px; border-radius:14px; ${borderStyle} display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition:all 0.2s ease;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${u.foto}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid ${isAtivo ? 'var(--rodin-orange)' : '#CBD5E1'};">
                    <div>
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${u.nome} ${isAtivo ? '<span style="font-size:10px; background:var(--rodin-orange); color:#FFF; padding:2px 6px; border-radius:999px; margin-left:6px;">ATIVO</span>' : ''}</strong>
                        <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:700;">${u.cargo}</span>
                        <div style="font-size:10px; color:#4338CA; font-weight:700; margin-top:2px;">
                            <i class="ph-bold ph-key"></i> ${turmasBadgeText}
                        </div>
                    </div>
                </div>
                <button type="button" class="${isAtivo ? 'btn-primary-rodin' : 'btn-light-cancel'}" style="padding:6px 12px; font-size:11px; font-weight:800;">
                    ${isAtivo ? 'Sessão Ativa' : 'Entrar como →'}
                </button>
            </div>
        `;
    }).join('');
}

async function carregarDados() {
    try {
        if (sb && typeof sb.from === 'function') {
            const { data: turmas } = await sb.from('turmas').select('*');
            const { data: alunos } = await sb.from('alunos').select('*');
            const { data: disciplinas } = await sb.from('disciplinas').select('*');
            const { data: professores } = await sb.from('professores').select('*');
            const { data: ptd } = await sb.from('professores_turmas_disciplinas').select('*');
            const { data: mapa_slots } = await sb.from('mapa_sala_slots').select('*');
            const { data: grade_slots } = await sb.from('grade_horaria_slots').select('*');
            const { data: ocorrencias } = await sb.from('ocorrencias_alunos').select('*');

            if (turmas && turmas.length > 0) db.turmas = turmas;
            if (alunos && alunos.length > 0) db.alunos = alunos;
            if (disciplinas && disciplinas.length > 0) db.disciplinas = disciplinas;
            if (professores && professores.length > 0) {
                db.professores = professores;
                if (window.FaceSecurity && typeof window.FaceSecurity.restaurarBiometriasLocais === 'function') {
                    window.FaceSecurity.restaurarBiometriasLocais();
                }
            }
            if (ptd && ptd.length > 0) db.ptd = ptd;
            if (mapa_slots && mapa_slots.length > 0) db.mapa_slots = mapa_slots;
            if (grade_slots && grade_slots.length > 0) db.grade_slots = grade_slots;
            if (ocorrencias && ocorrencias.length > 0) db.ocorrencias = ocorrencias;
        }

        if (db.turmas.length > 0 && !estadoApp.turmaSelecionada) {
            estadoApp.turmaSelecionada = db.turmas[0].id;
        }
    } catch (e) {
        console.error("Erro ao carregar dados do Supabase:", e);
    }
}

// ==========================================
// SUPORTE INTEGRADO DE NAVEGAÇÃO E PÁGINAS (RAIO-X, SETUP, CADASTROS)
// ==========================================
async function carregarAlunosRaioX() {
    const selTurma = document.getElementById('rx-turma-select');
    const selAluno = document.getElementById('rx-aluno-select');
    if (!selTurma || !selAluno) return;

    if (!db.turmas || db.turmas.length === 0 || !db.alunos || db.alunos.length === 0) {
        await carregarDados();
    }

    const turmasPermitidas = obterTurmasPermitidasUsuario();
    if (turmasPermitidas.length === 0 && db.turmas.length > 0) {
        turmasPermitidas.push(...db.turmas);
    }

    const valorTurmaAtual = selTurma.value;

    if (selTurma.children.length === 0) {
        selTurma.innerHTML = turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const alunoUrlId = urlParams.get('aluno');

    let tId = valorTurmaAtual || selTurma.value || (turmasPermitidas[0] && turmasPermitidas[0].id);

    if (alunoUrlId && !valorTurmaAtual) {
        const alFound = db.alunos.find(a => a.id === alunoUrlId);
        if (alFound) {
            tId = alFound.turma_id;
            selTurma.value = tId;
        }
    }

    const alunosDaTurma = db.alunos.filter(a => a.turma_id === tId);
    selAluno.innerHTML = alunosDaTurma.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');

    if (alunoUrlId && !valorTurmaAtual && alunosDaTurma.some(a => a.id === alunoUrlId)) {
        selAluno.value = alunoUrlId;
    } else if (alunosDaTurma.length > 0) {
        selAluno.value = alunosDaTurma[0].id;
    }

    renderizarRaioX();
}

function carregarSetupTurma() {
    const selTurma = document.getElementById('setup-turma-select');
    if (!selTurma) return;

    const turmasPermitidas = obterTurmasPermitidasUsuario();
    if (selTurma.children.length === 0) {
        selTurma.innerHTML = turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }

    const tId = selTurma.value || (turmasPermitidas[0] && turmasPermitidas[0].id);
    renderizarSetupTurma(tId);
}

function alternarSubAbaSetup(subId) {
    const btnMapa = document.getElementById('btn-setup-tab-mapa');
    const btnGrade = document.getElementById('btn-setup-tab-grade');
    const panelMapa = document.getElementById('setup-subview-mapa');
    const panelGrade = document.getElementById('setup-subview-grade');

    if (btnMapa && btnGrade) {
        if (subId === 'mapa') {
            btnMapa.classList.add('active');
            btnGrade.classList.remove('active');
            if (panelMapa) panelMapa.style.display = 'block';
            if (panelGrade) panelGrade.style.display = 'none';
        } else {
            btnGrade.classList.add('active');
            btnMapa.classList.remove('active');
            if (panelGrade) panelGrade.style.display = 'block';
            if (panelMapa) panelMapa.style.display = 'none';
        }
    }
}

function renderizarSetupTurma(turmaId) {
    const palette = document.getElementById('setup-palette-alunos');
    const gridCarteiras = document.getElementById('setup-grid-carteiras');
    const timetableBody = document.getElementById('setup-timetable-body');

    const alunos = db.alunos.filter(a => a.turma_id === turmaId);

    if (palette) {
        palette.innerHTML = alunos.map(a => `
            <div class="pool-item-card" draggable="true" style="padding:8px 12px; background:#F8FAFC; border:1px solid #CBD5E1; border-radius:10px; margin-bottom:8px; cursor:grab;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <img src="${a.avatar}" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
                    <span style="font-size:12px; font-weight:700; color:var(--rodin-graphite);">${a.nome}</span>
                </div>
            </div>
        `).join('');
    }

    if (gridCarteiras && gridCarteiras.children.length === 0) {
        gridCarteiras.style.display = 'grid';
        gridCarteiras.style.gridTemplateColumns = 'repeat(6, 1fr)';
        gridCarteiras.style.gap = '12px';

        let html = '';
        for (let i = 0; i < 30; i++) {
            const a = alunos[i];
            html += `
                <div class="desk-slot" style="background:#FFF; border:1px dashed #CBD5E1; border-radius:14px; min-height:72px; display:flex; align-items:center; justify-content:center;">
                    ${a ? `
                        <div style="text-align:center; padding:6px;">
                            <img src="${a.avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange);">
                            <span style="display:block; font-size:10px; font-weight:800; color:var(--rodin-graphite); margin-top:2px;">${a.nome.split(' ')[0]}</span>
                        </div>
                    ` : '<span style="font-size:10px; color:#94A3B8;">Carteira Vazia</span>'}
                </div>
            `;
        }
        gridCarteiras.innerHTML = html;
    }

    if (timetableBody && timetableBody.children.length === 0) {
        const horarios = ['07:15 - 08:05', '08:05 - 08:55', '08:55 - 09:45', '10:05 - 10:55', '10:55 - 11:45', '11:45 - 12:35'];
        const materias = ['Matemática', 'Português', 'História', 'Geografia', 'Física', 'Química', 'Inglês', 'Educação Física'];

        timetableBody.innerHTML = horarios.map((h, i) => `
            <tr>
                <td style="font-size:11px; font-weight:800; color:var(--rodin-cool-gray); text-align:center;">${h}</td>
                ${[0,1,2,3,4].map(d => `
                    <td>
                        <select class="form-select" style="font-size:11px; padding:4px 6px;">
                            ${materias.map((m, idx) => `<option value="${m}" ${idx === (i + d) % materias.length ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                    </td>
                `).join('')}
            </tr>
        `).join('');
    }
}

function salvarSetupTurma() {
    mostrarSnackbar("Configurações da turma salvas com sucesso!");
}

function limparGradeSetup() {
    if (confirm("Deseja redefinir os horários da grade semanal desta turma?")) {
        const timetableBody = document.getElementById('setup-timetable-body');
        if (timetableBody) {
            const selects = timetableBody.querySelectorAll('select');
            selects.forEach(s => s.selectedIndex = 0);
        }
        mostrarSnackbar("Grade de horários redefinida.");
    }
}

function alterarLinhasCarteira(delta) {
    const el = document.getElementById('setup-rows-count');
    if (!el) return;
    let rows = parseInt(el.innerText) + delta;
    if (rows < 2) rows = 2;
    if (rows > 8) rows = 8;
    el.innerText = rows;
    mostrarSnackbar(`Grid ajustado para ${rows} linhas.`);
}

function alterarColunasCarteira(delta) {
    const el = document.getElementById('setup-cols-count');
    if (!el) return;
    let cols = parseInt(el.innerText) + delta;
    if (cols < 2) cols = 2;
    if (cols > 8) cols = 8;
    el.innerText = cols;
    mostrarSnackbar(`Grid ajustado para ${cols} colunas.`);
}

function filtrarAlunosSetup() {
    const q = document.getElementById('setup-aluno-search')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('#setup-palette-alunos .pool-item-card');
    items.forEach(it => {
        const txt = it.innerText.toLowerCase();
        it.style.display = txt.includes(q) ? 'block' : 'none';
    });
}

// ==========================================
// 2. NAVEGAÇÃO ENTRE ABAS
// ==========================================
function switchTab(tabId) {
    if (tabId === 'professor') {
        window.location.href = 'visao-professor.html';
    } else {
        window.location.href = 'analise-geral.html';
    }
}

function toggleSidebarCollapse() {
    const sidebar = document.getElementById('sidebar-secondary');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('rodin_sidebar_collapsed', isCollapsed);
    }
}

function switchSubTab(subTabId) {
    const pageMap = {
        'geral': 'analise-geral.html',
        'aluno': 'raio-x-aluno.html',
        'kanban': 'central-acolhimento.html',
        'setup': 'setup-turma.html',
        'cadastro': 'cadastros.html'
    };
    if (pageMap[subTabId]) {
        window.location.href = pageMap[subTabId];
    }
}

// ==========================================
// 3. BI GERAL & ANALYTICS (IMAGEM 1)
function alternarFiltroPeriodo(prefix) {
    const sel = document.getElementById(`${prefix}-periodo-select`);
    const customDiv = document.getElementById(`${prefix}-custom-dates`);

    if (sel && customDiv) {
        if (sel.value === 'personalizado') {
            customDiv.style.display = 'flex';
        } else {
            customDiv.style.display = 'none';
        }
    }

    if (prefix === 'bi') atualizarBiGeral();
    if (prefix === 'rx') renderizarRaioX();
}

// ==========================================
// 3. BI GERAL & ANALYTICS (IMAGEM 1)
// ==========================================
function atualizarBiGeral() {
    const selectTurma = document.getElementById('bi-foco-turma');
    const selectPeriodo = document.getElementById('bi-periodo-select');
    const selectComparar = document.getElementById('bi-comparar-select');

    if (selectTurma) {
        const valAtual = selectTurma.value || 'todas';
        const turmasPermitidas = obterTurmasPermitidasUsuario();
        const optionsHtml = '<option value="todas">Todas as Turmas</option>' + 
            turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
        if (selectTurma.innerHTML !== optionsHtml) {
            selectTurma.innerHTML = optionsHtml;
            if (Array.from(selectTurma.options).some(o => o.value === valAtual)) {
                selectTurma.value = valAtual;
            }
        }
    }

    const turmaFiltro = selectTurma ? selectTurma.value : 'todas';
    const periodoFiltro = selectPeriodo ? selectPeriodo.value : 'tudo';
    const agora = new Date();

    let ocs = db.ocorrencias;

    // Filtro de Turma
    if (turmaFiltro !== 'todas') {
        ocs = ocs.filter(o => o.turma_id === turmaFiltro);
    }

    // Filtro de Período (com Suporte a Calendário Personalizado)
    if (periodoFiltro === 'hoje') {
        ocs = ocs.filter(o => new Date(o.created_at || o.data || o.data_ocorrencia).toDateString() === agora.toDateString());
    } else if (periodoFiltro === '7d') {
        ocs = ocs.filter(o => (agora - new Date(o.created_at || o.data || o.data_ocorrencia)) <= 7 * 24 * 60 * 60 * 1000);
    } else if (periodoFiltro === '30d') {
        ocs = ocs.filter(o => (agora - new Date(o.created_at || o.data || o.data_ocorrencia)) <= 30 * 24 * 60 * 60 * 1000);
    } else if (periodoFiltro === 'personalizado') {
        const dStartVal = document.getElementById('bi-date-start')?.value;
        const dEndVal = document.getElementById('bi-date-end')?.value;

        if (dStartVal || dEndVal) {
            const dStart = dStartVal ? new Date(`${dStartVal}T00:00:00`) : new Date(0);
            const dEnd = dEndVal ? new Date(`${dEndVal}T23:59:59`) : new Date();

            ocs = ocs.filter(o => {
                const dt = new Date(o.created_at || o.data || o.data_ocorrencia);
                return dt >= dStart && dt <= dEnd;
            });
        }
    }

    // Alunos no escopo
    let alunosEscopo = db.alunos;
    if (turmaFiltro !== 'todas') {
        alunosEscopo = alunosEscopo.filter(a => a.turma_id === turmaFiltro);
    }
    const numAlunos = alunosEscopo.length || 1;

    const totalSaidas = ocs.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('BANHEIRO') || t.includes('BEBEDOURO') || t.includes('SAIDA') || t.includes('SAÍDA');
    }).length;

    const totalSonolencia = ocs.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('DORMINDO') || t.includes('SONOLENTO');
    }).length;
    
    const totalDesvios = ocs.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return !t.includes('DORMINDO') && !t.includes('SONOLENTO') && !t.includes('BANHEIRO') && !t.includes('BEBEDOURO') && !t.includes('SAIDA') && !t.includes('SAÍDA');
    }).length;

    // Atualizar números KPI nas caixas
    const elSaidas = document.getElementById('bi-stat-saidas') || document.getElementById('bi-stat-total');
    const elSonolencia = document.getElementById('bi-stat-sonolencia');
    const elDesvios = document.getElementById('bi-stat-desvios');

    if (elSaidas) elSaidas.innerText = totalSaidas;
    if (elSonolencia) elSonolencia.innerText = totalSonolencia;
    if (elDesvios) elDesvios.innerText = totalDesvios;

    // Atualizar subtextos de média por aluno
    const cardSaidasSub = document.querySelector('.stat-kpi-card:nth-child(1) .sub');
    const cardSonolenciaSub = document.querySelector('.stat-kpi-card:nth-child(2) .sub');
    const cardDesviosSub = document.querySelector('.stat-kpi-card:nth-child(3) .sub');

    if (cardSaidasSub) cardSaidasSub.innerText = `Média: ${(totalSaidas / numAlunos).toFixed(1)}/aluno`;
    if (cardSonolenciaSub) cardSonolenciaSub.innerText = `Média: ${(totalSonolencia / numAlunos).toFixed(1)}/aluno`;
    if (cardDesviosSub) cardDesviosSub.innerText = `Média: ${(totalDesvios / numAlunos).toFixed(1)}/aluno`;

    // Cálculo Dinâmico do Modo de Comparação (Período Anterior, Escola Toda, Mesma Etapa)
    const compararSelect = document.getElementById('bi-comparar-select');
    const compararModo = compararSelect ? compararSelect.value : 'periodo_anterior';

    let labelComparar = "vs Período Anterior";
    let ocsComparacao = [];

    if (compararModo === 'periodo_anterior') {
        labelComparar = "vs Período Anterior";
        const msDia = 24 * 60 * 60 * 1000;
        let msIntervalo = 7 * msDia;

        if (periodoFiltro === 'hoje') msIntervalo = 1 * msDia;
        else if (periodoFiltro === '7d') msIntervalo = 7 * msDia;
        else if (periodoFiltro === '30d') msIntervalo = 30 * msDia;
        else if (periodoFiltro === 'personalizado') {
            const dStartVal = document.getElementById('bi-date-start')?.value;
            const dEndVal = document.getElementById('bi-date-end')?.value;
            if (dStartVal && dEndVal) {
                msIntervalo = Math.max(msDia, new Date(dEndVal) - new Date(dStartVal));
            }
        }

        const dataFimAnt = new Date(agora - msIntervalo);
        const dataInicioAnt = new Date(agora - (2 * msIntervalo));

        ocsComparacao = db.ocorrencias.filter(o => {
            if (turmaFiltro !== 'todas' && o.turma_id !== turmaFiltro) return false;
            const dt = new Date(o.created_at || o.data || o.data_ocorrencia);
            return dt >= dataInicioAnt && dt < dataFimAnt;
        });
    } else if (compararModo === 'escola') {
        labelComparar = "vs Média da Escola";
        ocsComparacao = db.ocorrencias;
    } else if (compararModo === 'etapa') {
        labelComparar = "vs Mesma Etapa";
        const turmaAtual = db.turmas.find(t => t.id === turmaFiltro);
        const etapaAtual = turmaAtual ? turmaAtual.etapa : 'Ensino Fundamental Anos Finais';
        const turmasEtapaIds = db.turmas.filter(t => t.etapa === etapaAtual).map(t => t.id);
        ocsComparacao = db.ocorrencias.filter(o => turmasEtapaIds.includes(o.turma_id));
    }

    const prevSaidas = ocsComparacao.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('BANHEIRO') || t.includes('BEBEDOURO') || t.includes('SAIDA') || t.includes('SAÍDA');
    }).length;
    const diffSaidas = prevSaidas === 0 ? 0 : Math.round(((totalSaidas - prevSaidas) / prevSaidas) * 100);

    const prevSonolencia = ocsComparacao.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('DORMINDO') || t.includes('SONOLENTO');
    }).length;
    const diffSonolencia = prevSonolencia === 0 ? 0 : Math.round(((totalSonolencia - prevSonolencia) / prevSonolencia) * 100);

    const prevDesvios = ocsComparacao.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return !t.includes('DORMINDO') && !t.includes('SONOLENTO') && !t.includes('BANHEIRO') && !t.includes('BEBEDOURO') && !t.includes('SAIDA') && !t.includes('SAÍDA');
    }).length;
    const diffDesvios = prevDesvios === 0 ? 0 : Math.round(((totalDesvios - prevDesvios) / prevDesvios) * 100);

    const tagSaidas = document.querySelector('.stat-kpi-card:nth-child(1) .stat-kpi-tag');
    const tagSonolencia = document.querySelector('.stat-kpi-card:nth-child(2) .stat-kpi-tag');
    const tagDesvios = document.querySelector('.stat-kpi-card:nth-child(3) .stat-kpi-tag');

    if (tagSaidas) {
        const sinal = diffSaidas >= 0 ? '↗ +' : '↘ ';
        tagSaidas.innerText = `${sinal}${diffSaidas}% ${labelComparar}`;
        tagSaidas.className = `stat-kpi-tag ${diffSaidas >= 0 ? 'up' : 'down'}`;
    }
    if (tagSonolencia) {
        const sinal = diffSonolencia >= 0 ? '↗ +' : '↘ ';
        tagSonolencia.innerText = `${sinal}${diffSonolencia}% ${labelComparar}`;
        tagSonolencia.className = `stat-kpi-tag ${diffSonolencia >= 0 ? 'up' : 'down'}`;
    }
    if (tagDesvios) {
        const sinal = diffDesvios >= 0 ? '↗ +' : '↘ ';
        tagDesvios.innerText = `${sinal}${diffDesvios}% ${labelComparar}`;
        tagDesvios.className = `stat-kpi-tag ${diffDesvios >= 0 ? 'up' : 'down'}`;
    }

    // Atualizar título do Mapa de Sala
    const turmaObj = db.turmas.find(t => t.id === turmaFiltro);
    const nomeTurma = turmaFiltro === 'todas' ? 'Selecione uma Turma' : (turmaObj ? turmaObj.nome : turmaFiltro);
    const mapaTitulo = document.getElementById('bi-mapa-titulo');
    if (mapaTitulo) mapaTitulo.innerText = `Mapa de Sala (${nomeTurma})`;

    // Renderizar Grid de Photocards no BI (Somente quando uma turma específica for selecionada)
    const gridContainer = document.getElementById('bi-photocards-grid');
    if (gridContainer) {
        if (turmaFiltro === 'todas') {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 36px 20px; text-align: center; background: #F8FAFC; border: 1.5px dashed var(--rodin-line); border-radius: 16px;">
                    <i class="ph-bold ph-chalkboard-teacher" style="font-size: 36px; color: var(--rodin-orange); margin-bottom: 10px; display: inline-block;"></i>
                    <strong style="font-size: 15px; color: var(--rodin-graphite); display: block; margin-bottom: 6px;">Selecione uma Turma no Filtro de FOCO</strong>
                    <p style="font-size: 13px; color: var(--rodin-cool-gray); max-width: 500px; margin: 0 auto;">
                        Para preservar o desempenho e velocidade do sistema, a disposição do Mapa de Sala é exibida ao selecionar uma turma específica.
                    </p>
                </div>
            `;
        } else {
            gridContainer.innerHTML = alunosEscopo.map(a => {
                const temCondicaoEspecial = a.condicao && !['NENHUMA', 'REGULAR', 'NENHUM', 'SEM CONDIÇÃO'].includes(a.condicao.toUpperCase().trim());
                const condHtml = temCondicaoEspecial ? `<span class="condition-pill ${getClasseCondicao(a.condicao)}" style="margin-bottom:2px;">${a.condicao.toUpperCase()}</span>` : '';
                return `
                    <div class="student-photocard" onclick="abrirModalHistoricoAlunoBI('${a.id}')">
                        <img src="${a.avatar}" alt="${a.nome}">
                        <div class="photocard-gradient-overlay">
                            <div class="student-name-text">${a.nome}</div>
                            ${condHtml}
                            ${renderBadgesPhotocard(a.id, ocs)}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function renderBadgesPhotocard(alunoId, ocsLista, isProfVisao = false) {
    const ocsAluno = ocsLista.filter(o => o.aluno_id === alunoId);

    const countSaidas = ocsAluno.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('BANHEIRO') || t.includes('BEBEDOURO') || t.includes('SAIDA') || t.includes('SAÍDA');
    }).length;

    const countSonolencia = ocsAluno.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('DORMINDO') || t.includes('SONOLENTO');
    }).length;

    const countDesvios = isProfVisao ? 0 : ocsAluno.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return !t.includes('DORMINDO') && !t.includes('SONOLENTO') && !t.includes('BANHEIRO') && !t.includes('BEBEDOURO') && !t.includes('SAIDA') && !t.includes('SAÍDA');
    }).length;

    if (countSaidas === 0 && countSonolencia === 0 && countDesvios === 0) return '';

    return `
        <div class="photocard-badges-row">
            ${countSaidas > 0 ? `
                <div class="badge-stat-item saidas" title="${countSaidas} ida(s) ao banheiro/bebedouro hoje">
                    <div class="badge-icon-circle"><i class="ph-bold ph-door-open"></i></div>
                    <span>${countSaidas}</span>
                </div>
            ` : ''}
            ${countSonolencia > 0 ? `
                <div class="badge-stat-item sonolencia" title="${countSonolencia} episódio(s) de sonolência hoje">
                    <div class="badge-icon-circle"><i class="ph-bold ph-moon"></i></div>
                    <span>${countSonolencia}</span>
                </div>
            ` : ''}
            ${(!isProfVisao && countDesvios > 0) ? `
                <div class="badge-stat-item desvios" title="${countDesvios} desvio(s) de conduta">
                    <div class="badge-icon-circle"><i class="ph-bold ph-warning-circle"></i></div>
                    <span>${countDesvios}</span>
                </div>
            ` : ''}
        </div>
    `;
}

function abrirModalHistoricoAlunoBI(alunoId) {
    const aluno = db.alunos.find(a => a.id === alunoId);
    if (!aluno) return;

    const turma = db.turmas.find(t => t.id === aluno.turma_id);

    document.getElementById('modal-bi-student-avatar').src = aluno.avatar;
    document.getElementById('modal-bi-student-nome').innerText = `Ocorrências de ${aluno.nome}`;
    document.getElementById('modal-bi-student-turma').innerText = turma ? turma.nome.toUpperCase() : '';

    const ocsDoAluno = db.ocorrencias.filter(o => o.aluno_id === aluno.id);
    const container = document.getElementById('modal-bi-oc-list');

    if (!container) return;

    if (ocsDoAluno.length === 0) {
        container.innerHTML = `
            <div style="padding:24px; text-align:center; color:var(--rodin-cool-gray); font-size:13px;">
                Nenhuma ocorrência registrada para este aluno.
            </div>
        `;
    } else {
        container.innerHTML = ocsDoAluno.map(o => {
            const tipoUpper = (o.tipo || '').toUpperCase();
            const isSonolencia = tipoUpper.includes('DORMINDO') || tipoUpper.includes('SONOLENTO');
            const stripeColor = isSonolencia ? '#3B82F6' : '#EF4444';
            const iconTag = isSonolencia ? 
                `<i class="ph-bold ph-moon" style="color:#3B82F6; font-size:16px;"></i>` : 
                `<i class="ph-bold ph-warning-circle" style="color:#EF4444; font-size:16px;"></i>`;

            const dtObj = new Date(o.created_at || o.data || o.data_ocorrencia);
            const dtStr = `${dtObj.toLocaleDateString('pt-BR')} às ${dtObj.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}`;

            const isOpcaoEspecial = tipoUpper.includes('CONVIDADO A SE RETIRAR') || tipoUpper.includes('ALTERAÇÃO COMPORTAMENTAL') || tipoUpper.includes('ALTERACAO COMPORTAMENTAL');
            const temDescricaoReal = o.descricao && !o.descricao.includes('Observação comportamental') && !o.descricao.includes('Comportamento detectado') && !o.descricao.includes('Registrado via painel');
            const temAudio = !!o.audio_url;

            const relatoHtml = (isOpcaoEspecial || temDescricaoReal || temAudio) ? `
                <div style="background:#F8FAFC; border-radius:10px; padding:10px; margin-top:8px; font-size:12px; color:#475569;">
                    ${(temDescricaoReal || (isOpcaoEspecial && o.descricao)) ? `<p style="margin:0 0 4px 0;">"${o.descricao}"</p>` : ''}
                    ${temAudio ? `<span style="color:var(--rodin-orange); font-weight:700; font-size:11px;"><i class="ph-bold ph-microphone"></i> Áudio Anexado</span>` : ''}
                </div>
            ` : '';

            return `
                <div style="background:#FFF; border:1px solid var(--rodin-line); border-left:4px solid ${stripeColor}; border-radius:14px; padding:14px 16px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            ${iconTag}
                            <strong style="font-size:13px; color:var(--rodin-graphite);">${o.tipo}</strong>
                        </div>
                        <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600; display:flex; align-items:center; gap:4px;">
                            <i class="ph ph-calendar"></i> ${dtStr}
                        </div>
                    </div>
                    ${relatoHtml}
                </div>
            `;
        }).join('');
    }

    document.getElementById('modal-historico-aluno-bi').style.display = 'flex';
}

function fecharModalHistoricoAlunoBI() {
    document.getElementById('modal-historico-aluno-bi').style.display = 'none';
}

function formatarNomeCard(nome) {
    if (!nome) return '';
    const partes = nome.trim().split(/\s+/);
    if (partes.length <= 2) return nome;
    return `${partes[0]} ${partes[partes.length - 1]}`;
}

// ==========================================
// 4. RAIO-X DO ALUNO (IMAGEM 2)
// ==========================================

function abrirRaioXAlunoDirect(alunoId) {
    const aluno = db.alunos.find(a => a.id === alunoId);
    if (!aluno) return;

    switchTab('gestao');
    switchSubTab('aluno');
    const turmaSel = document.getElementById('rx-turma-select');
    if (turmaSel) turmaSel.value = aluno.turma_id;
    carregarAlunosRaioX();
    const alunoSel = document.getElementById('rx-aluno-select');
    if (alunoSel) alunoSel.value = aluno.id;
    renderizarRaioX();
}

function renderizarRaioX() {
    const alunoSel = document.getElementById('rx-aluno-select');
    const periodoSel = document.getElementById('rx-periodo-select');
    const alunoId = alunoSel ? alunoSel.value : (db.alunos[0]?.id);
    const periodoFiltro = periodoSel ? periodoSel.value : 'tudo';
    const aluno = db.alunos.find(a => a.id === alunoId);

    if (!aluno) return;

    document.getElementById('rx-avatar-img').src = aluno.avatar;
    document.getElementById('rx-nome-aluno').innerText = aluno.nome;

    const temCondicaoEspecial = aluno.condicao && !['NENHUMA', 'REGULAR', 'NENHUM'].includes(aluno.condicao.toUpperCase().trim());
    document.getElementById('rx-condicao-aluno').innerText = temCondicaoEspecial ? `Condição: ${aluno.condicao}` : '';

    const agora = new Date();
    let ocs = db.ocorrencias.filter(o => o.aluno_id === aluno.id);

    if (periodoFiltro === 'hoje') {
        ocs = ocs.filter(o => new Date(o.created_at || o.data || o.data_ocorrencia).toDateString() === agora.toDateString());
    } else if (periodoFiltro === '7d') {
        ocs = ocs.filter(o => (agora - new Date(o.created_at || o.data || o.data_ocorrencia)) <= 7 * 24 * 60 * 60 * 1000);
    } else if (periodoFiltro === '30d') {
        ocs = ocs.filter(o => (agora - new Date(o.created_at || o.data || o.data_ocorrencia)) <= 30 * 24 * 60 * 60 * 1000);
    } else if (periodoFiltro === 'personalizado') {
        const dStartVal = document.getElementById('rx-date-start')?.value;
        const dEndVal = document.getElementById('rx-date-end')?.value;

        if (dStartVal || dEndVal) {
            const dStart = dStartVal ? new Date(`${dStartVal}T00:00:00`) : new Date(0);
            const dEnd = dEndVal ? new Date(`${dEndVal}T23:59:59`) : new Date();

            ocs = ocs.filter(o => {
                const dt = new Date(o.created_at || o.data || o.data_ocorrencia);
                return dt >= dStart && dt <= dEnd;
            });
        }
    }

    // Comparativo Aluno vs Média da Turma
    const alunosDaTurma = db.alunos.filter(a => a.turma_id === aluno.turma_id);
    const nAlunos = alunosDaTurma.length || 1;
    const ocsTurma = db.ocorrencias.filter(o => alunosDaTurma.some(at => at.id === o.aluno_id));

    const totalAluno = ocs.length;
    const mediaTotalTurma = (ocsTurma.length / nAlunos).toFixed(1);

    const sonolenciaAluno = ocs.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('DORMINDO') || t.includes('SONOLENTO');
    }).length;
    const mediaSonolenciaTurma = (ocsTurma.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return t.includes('DORMINDO') || t.includes('SONOLENTO');
    }).length / nAlunos).toFixed(1);

    const desviosAluno = ocs.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return !t.includes('DORMINDO') && !t.includes('SONOLENTO') && !t.includes('FOI AO BANHEIRO');
    }).length;
    const mediaDesviosTurma = (ocsTurma.filter(o => {
        const t = (o.tipo || '').toUpperCase();
        return !t.includes('DORMINDO') && !t.includes('SONOLENTO') && !t.includes('FOI AO BANHEIRO');
    }).length / nAlunos).toFixed(1);

    const buildSingleBarWithMarker = (label, valAluno, valMediaStr, colorTheme = 'orange') => {
        const valMedia = parseFloat(valMediaStr) || 0;
        const maxVal = Math.max(valAluno, valMedia, 1.5);
        const pctAluno = Math.min(100, (valAluno / maxVal) * 100);
        const pctMedia = Math.min(95, Math.max(5, (valMedia / maxVal) * 100));

        let alunoBarColor = 'var(--rodin-orange)';
        if (colorTheme === 'blue') alunoBarColor = '#2563EB';
        if (colorTheme === 'red') alunoBarColor = '#DC2626';

        return `
            <div class="rx-bar-item" style="background:#FFF; border:1px solid #E2E8F0; border-radius:14px; padding:16px; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <strong style="font-size:13px; color:var(--rodin-graphite); font-weight:800;">${label}</strong>
                    <span style="font-size:16px; font-weight:900; color:${alunoBarColor};">${valAluno}</span>
                </div>
                
                <!-- Barra Única com Linha Preta Cortando na Média da Turma -->
                <div style="position:relative; margin-top:24px; margin-bottom:12px;">
                    <div class="rx-bar-track" style="position:relative; width:100%; height:14px; background:#F1F5F9; border-radius:999px; overflow:visible; border:1px solid #CBD5E1;">
                        <div class="rx-bar-fill" style="width:${pctAluno}%; height:100%; background:${alunoBarColor}; border-radius:999px; transition:width 0.4s ease;"></div>
                        
                        <!-- Linha Preta Cortando a Barra (Média da Turma) -->
                        <div class="rx-media-marker-line" style="position:absolute; left:${pctMedia}%; top:-6px; bottom:-6px; width:3px; background:#0F172A; z-index:10; border-radius:2px; box-shadow:0 0 4px rgba(0,0,0,0.4);" title="Média da Turma: ${valMediaStr}">
                            <div style="position:absolute; top:-22px; left:50%; transform:translateX(-50%); background:#0F172A; color:#FFF; font-size:9px; font-weight:800; padding:2px 6px; border-radius:4px; white-space:nowrap; box-shadow:0 2px 4px rgba(0,0,0,0.15);">
                                Média: ${valMediaStr}
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; justify-content:space-between; font-size:10px; font-weight:700; color:var(--rodin-cool-gray); margin-top:6px;">
                    <span>Aluno: ${valAluno} ocorrência(s)</span>
                    <span style="color:#0F172A; font-weight:800;">Média da Turma: ${valMediaStr}</span>
                </div>
            </div>
        `;
    };

    const rxBars = document.querySelector('.rx-bars-container');
    if (rxBars) {
        rxBars.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h4 style="font-size: 11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--rodin-cool-gray); margin:0;">
                    COMPARATIVO: ALUNO VS MÉDIA DA TURMA (${aluno.nome.split(' ')[0].toUpperCase()})
                </h4>
                <div style="display:flex; gap:14px; font-size:11px; font-weight:700;">
                    <span style="display:flex; align-items:center; gap:6px;"><span style="width:10px; height:10px; border-radius:50%; background:var(--rodin-orange); display:inline-block;"></span> Ocorrências do Aluno</span>
                    <span style="display:flex; align-items:center; gap:6px;"><span style="width:3px; height:12px; background:#0F172A; display:inline-block; border-radius:1px;"></span> Linha da Média da Turma</span>
                </div>
            </div>
            <div class="rx-bar-row" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
                ${buildSingleBarWithMarker('Total Ocorrências', totalAluno, mediaTotalTurma, 'orange')}
                ${buildSingleBarWithMarker('Sonolência / Dormindo', sonolenciaAluno, mediaSonolenciaTurma, 'blue')}
                ${buildSingleBarWithMarker('Desvios de Conduta', desviosAluno, mediaDesviosTurma, 'red')}
            </div>
        `;
    }

    const timelineList = document.getElementById('rx-timeline-list');
    if (timelineList) {
        const intervencoesOrientador = obterIntervencoesOrientador().filter(i => i.aluno_id === aluno.id);

        if (ocs.length === 0 && intervencoesOrientador.length === 0) {
            timelineList.innerHTML = '<p style="font-size:12px; color:var(--rodin-cool-gray);">Nenhum registro de ocorrência ou atendimento do orientador para este aluno no período.</p>';
        } else {
            timelineList.innerHTML = ocs.map(o => {
                const tipoUpper = (o.tipo || '').toUpperCase();
                const isSonolencia = tipoUpper.includes('DORMINDO') || tipoUpper.includes('SONOLENTO');
                
                const nodeClass = isSonolencia ? 'blue' : 'red';
                const nodeIcon = isSonolencia ? '<i class="ph-bold ph-moon"></i>' : '<i class="ph-bold ph-warning-circle"></i>';
                const titleColor = isSonolencia ? '#2563EB' : '#DC2626';

                const dtObj = new Date(o.created_at || o.data || o.data_ocorrencia);
                const dtStr = `${dtObj.toLocaleDateString('pt-BR')} às ${dtObj.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}`;

                const isOpcaoEspecial = tipoUpper.includes('CONVIDADO A SE RETIRAR') || tipoUpper.includes('ALTERAÇÃO COMPORTAMENTAL') || tipoUpper.includes('ALTERACAO COMPORTAMENTAL');
                const temDescricaoReal = o.descricao && !o.descricao.includes('Observação comportamental') && !o.descricao.includes('Comportamento detectado') && !o.descricao.includes('Registrado via painel');
                const temAudio = !!o.audio_url;

                const relatoHtml = (isOpcaoEspecial || temDescricaoReal || temAudio) ? `
                    <div class="timeline-card-obs" style="margin-top:6px; background:#F8FAFC; padding:8px 12px; border-radius:8px; border:1px solid #E2E8F0;">
                        ${(temDescricaoReal || (isOpcaoEspecial && o.descricao)) ? `<p style="font-size:12px; color:#475569; margin:0;">"${o.descricao}"</p>` : ''}
                        ${temAudio ? `<span style="color:var(--rodin-orange); font-weight:700; font-size:11px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;"><i class="ph-bold ph-microphone"></i> Áudio Gravado em Aula</span>` : ''}
                    </div>
                ` : '';

                // Intervenção do Orientador associada a este evento ou ao aluno
                const intervAssociada = intervencoesOrientador.find(i => i.ocorrencia_id === o.id || Math.abs(new Date(i.created_at) - dtObj) < 48 * 60 * 60 * 1000) || intervencoesOrientador[0];

                let acaoOrientadorHtml = '';
                if (intervAssociada) {
                    const dtIntervObj = new Date(intervAssociada.created_at);
                    const dtIntervStr = `${dtIntervObj.toLocaleDateString('pt-BR')} às ${dtIntervObj.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}`;
                    const colNome = formatarNomeColunaKanban(intervAssociada.coluna);

                    acaoOrientadorHtml = `
                        <div class="counselor-action-subcard" style="margin-top:10px; background:#FFF; border:1px solid #E2E8F0; border-left:4px solid var(--rodin-orange); border-radius:12px; padding:12px 14px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <i class="ph-bold ph-notebook" style="color:var(--rodin-orange); font-size:16px;"></i>
                                    <strong style="font-size:12px; color:var(--rodin-graphite);">${intervAssociada.orientador_nome || 'Mariana Medeiros'}</strong>
                                    <span style="font-size:11px; color:var(--rodin-cool-gray);">(${intervAssociada.orientador_cargo || 'Orientadora Pedagógica'})</span>
                                </div>
                                <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;"><i class="ph ph-calendar-check"></i> Conversa em: ${dtIntervStr}</span>
                            </div>
                            <div style="font-size:12px; color:#334155; line-height:1.4; background:#FFF7ED; padding:8px 10px; border-radius:8px; border:1px solid #FFEDD5; margin-top:6px;">
                                <span style="font-size:10px; font-weight:800; color:var(--rodin-orange); text-transform:uppercase; display:block; margin-bottom:2px;">[REGISTRO DO ORIENTADOR • ${colNome}]</span>
                                "${intervAssociada.anotacao}"
                            </div>
                        </div>
                    `;
                }

                const profNome = o.professor_nome || 'Prof. Marcos Antônio (História)';

                return `
                    <div class="timeline-item">
                        <div class="timeline-node-badge ${nodeClass}">
                            ${nodeIcon}
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
                            <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:700;"><i class="ph ph-calendar"></i> Ocorrência em: ${dtStr}</span>
                            <span class="teacher-author-tag" style="background:#EEF2FF; color:#4338CA; border:1px solid #C7D2FE; font-size:11px; font-weight:800; padding:2px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px;">
                                <i class="ph-bold ph-chalkboard-teacher"></i> ${profNome}
                            </span>
                        </div>
                        <strong style="font-size:14px; color:${titleColor}; font-weight:800; display:block; margin-bottom:4px;">
                            ${o.tipo}
                        </strong>
                        ${relatoHtml}
                        ${acaoOrientadorHtml}
                    </div>
                `;
            }).join('');
        }
    }
}

// ==========================================
// 5. CENTRAL DE ACOLHIMENTO (IMAGEM 3)
// ==========================================
// ==========================================
// 5. CENTRAL DE ACOLHIMENTO E INTERVENÇÃO (KANBAN & AGENDAMENTO)
// ==========================================
function obterEstadosKanban() {
    try {
        const salvo = localStorage.getItem('rodin_kanban_estados');
        if (salvo) return JSON.parse(salvo);
    } catch (e) {}

    // Estados padrão caso não haja nada no localStorage
    return {
        'a1': { coluna: 'agendada', data_conversa: new Date().toISOString().split('T')[0], horario_conversa: '10:30', data_analise: null },
        'a3': { coluna: 'analise14', data_analise: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        'a11': { coluna: 'entrada', data_analise: null },
        'a2': { coluna: 'entrada', data_analise: null }
    };
}

function salvarEstadosKanban(estados) {
    localStorage.setItem('rodin_kanban_estados', JSON.stringify(estados));
}

function obterIntervencoesOrientador() {
    try {
        const salvo = localStorage.getItem('rodin_intervencoes_orientador');
        if (salvo) return JSON.parse(salvo);
    } catch (e) {}

    return [
        {
            id: 'int_2',
            aluno_id: 'a3',
            coluna: 'analise14',
            anotacao: 'Realizada escuta ativa com a aluna. Acordado plano de foco individual nos primeiros 15 minutos de cada aula e combinado com a família.',
            orientador_nome: 'Mariana Medeiros',
            orientador_cargo: 'Orientadora Pedagógica',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];
}

function salvarIntervencoesOrientador(lista) {
    localStorage.setItem('rodin_intervencoes_orientador', JSON.stringify(lista));
    if (db) db.intervencoes_orientador = lista;
}

// DRAG & DROP HANDLERS FOR KANBAN
function iniciarArrastoKanban(event, alunoId) {
    event.dataTransfer.setData('text/plain', alunoId);
    event.dataTransfer.effectAllowed = 'move';
    const card = event.target.closest('.kanban-card-item');
    if (card) card.classList.add('dragging');
}

function permitirSoltarKanban(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const col = event.currentTarget;
    if (col) col.classList.add('drag-over');
}

function removerDestaqueColunaKanban(event) {
    const col = event.currentTarget;
    if (col) col.classList.remove('drag-over');
}

function soltarCardKanban(event, colunaDestino) {
    event.preventDefault();
    const col = event.currentTarget;
    if (col) col.classList.remove('drag-over');

    const alunoId = event.dataTransfer.getData('text/plain');
    if (!alunoId) return;

    if (colunaDestino === 'agendada') {
        // Ao arrastar para "Conversa Agendada": Abrir modal para definir Data e Horário!
        abrirModalAgendarConversa(alunoId);
    } else if (colunaDestino === 'entrada') {
        const estados = obterEstadosKanban();
        estados[alunoId] = { coluna: 'entrada', data_analise: null };
        salvarEstadosKanban(estados);
        mostrarSnackbar(`Card retornado para a Caixa de Entrada.`);
        renderizarKanban();
    } else if (colunaDestino === 'analise14') {
        // SOMENTE ao enviar para "Em Análise (14 Dias)": Exigir o que foi conversado e acordado!
        abrirModalAcaoOrientador(alunoId, colunaDestino);
    }
}

// MODAL 1: AGENDAR CONVERSA
function abrirModalAgendarConversa(alunoId) {
    const aluno = db.alunos.find(a => a.id === alunoId);
    if (!aluno) return;

    const turma = db.turmas.find(t => t.id === aluno.turma_id);
    const hoje = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    document.getElementById('modal-agenda-aluno-id').value = alunoId;
    document.getElementById('modal-agenda-aluno-avatar').src = aluno.avatar;
    document.getElementById('modal-agenda-aluno-nome').innerText = aluno.nome;
    document.getElementById('modal-agenda-aluno-turma').innerText = turma ? turma.nome.toUpperCase() : '6º ANO A';
    document.getElementById('modal-agenda-data').value = hoje;
    document.getElementById('modal-agenda-hora').value = horaAtual;

    document.getElementById('modal-agendar-conversa').style.display = 'flex';
}

function fecharModalAgendarConversa() {
    document.getElementById('modal-agendar-conversa').style.display = 'none';
}

function salvarAgendamentoConversa(event) {
    event.preventDefault();

    const alunoId = document.getElementById('modal-agenda-aluno-id').value;
    const dataVal = document.getElementById('modal-agenda-data').value;
    const horaVal = document.getElementById('modal-agenda-hora').value;

    if (!alunoId || !dataVal || !horaVal) return;

    const estados = obterEstadosKanban();
    estados[alunoId] = {
        coluna: 'agendada',
        data_conversa: dataVal,
        horario_conversa: horaVal,
        data_analise: null
    };

    salvarEstadosKanban(estados);
    fecharModalAgendarConversa();

    const dtParts = dataVal.split('-');
    const dtFormat = `${dtParts[2]}/${dtParts[1]}/${dtParts[0]}`;
    mostrarSnackbar(`Conversa agendada para ${dtFormat} às ${horaVal}!`);
    renderizarKanban();
}

// MODAL 2: REGISTRAR RESULTADO DA CONVERSA & ACORDO
function abrirModalAcaoOrientador(alunoId, destino) {
    const aluno = db.alunos.find(a => a.id === alunoId);
    if (!aluno) return;

    const turma = db.turmas.find(t => t.id === aluno.turma_id);

    document.getElementById('modal-orientador-aluno-id').value = alunoId;
    document.getElementById('modal-orientador-destino').value = destino;
    document.getElementById('modal-orientador-aluno-avatar').src = aluno.avatar;
    document.getElementById('modal-orientador-aluno-nome').innerText = aluno.nome;
    document.getElementById('modal-orientador-aluno-turma').innerText = turma ? turma.nome.toUpperCase() : '6º ANO A';
    document.getElementById('modal-orientador-texto-anotacao').value = '';

    document.getElementById('modal-anotar-acao-orientador').style.display = 'flex';
}

function fecharModalAcaoOrientador() {
    document.getElementById('modal-anotar-acao-orientador').style.display = 'none';
}

function salvarAcaoOrientador(event) {
    event.preventDefault();

    const alunoId = document.getElementById('modal-orientador-aluno-id').value;
    const destino = document.getElementById('modal-orientador-destino').value;
    const textoAnotacao = document.getElementById('modal-orientador-texto-anotacao').value.trim();

    if (!alunoId || !destino) return;

    if (!textoAnotacao || textoAnotacao.length < 5) {
        alert('Por favor, descreva o que foi conversado e acordado entre o orientador e o aluno. A anotação é obrigatória para iniciar a Análise de 14 Dias!');
        document.getElementById('modal-orientador-texto-anotacao').focus();
        return;
    }

    const estados = obterEstadosKanban();
    const agoraIso = new Date().toISOString();

    estados[alunoId] = {
        coluna: destino,
        data_analise: destino === 'analise14' ? agoraIso : null
    };

    salvarEstadosKanban(estados);

    const intervencoes = obterIntervencoesOrientador();
    const usrLogado = obterUsuarioLogado();

    const novaIntervencao = {
        id: `int_${Date.now()}`,
        aluno_id: alunoId,
        coluna: destino,
        anotacao: textoAnotacao,
        orientador_nome: usrLogado.nome,
        orientador_cargo: usrLogado.cargo,
        created_at: agoraIso
    };

    intervencoes.unshift(novaIntervencao);
    salvarIntervencoesOrientador(intervencoes);

    fecharModalAcaoOrientador();
    mostrarSnackbar(`Acordo registrado! Aluno em monitoramento inteligente de 14 dias.`);
    renderizarKanban();
    
    // Se estiver na página de Raio-X do Aluno, atualizar também
    if (document.getElementById('rx-intervencoes-list')) {
        renderizarRaioX();
    }
}

function formatarNomeColunaKanban(col) {
    const mapa = {
        'entrada': 'Caixa de Entrada',
        'agendada': 'Conversa Agendada',
        'analise14': 'Em Análise (14 Dias)'
    };
    return mapa[col] || col;
}

function renderizarKanban() {
    const colEntrada = document.getElementById('col-kanban-entrada');
    const colAgendada = document.getElementById('col-kanban-agendada');
    const colAnalise14 = document.getElementById('col-kanban-analise14');
    const turmaSel = document.getElementById('kanban-turma-select');

    if (turmaSel) {
        const valAtual = turmaSel.value || 'todas';
        const turmasPermitidas = obterTurmasPermitidasUsuario();
        const optionsHtml = '<option value="todas">Todas as Turmas</option>' + 
            turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
        if (turmaSel.innerHTML !== optionsHtml) {
            turmaSel.innerHTML = optionsHtml;
            if (Array.from(turmaSel.options).some(o => o.value === valAtual)) {
                turmaSel.value = valAtual;
            }
        }
    }

    const turmaFiltro = turmaSel ? turmaSel.value : 'todas';
    const estados = obterEstadosKanban();
    const intervencoes = obterIntervencoesOrientador();
    const agora = new Date();

    let alunosFiltrados = db.alunos;
    if (turmaFiltro !== 'todas') {
        alunosFiltrados = alunosFiltrados.filter(a => a.turma_id === turmaFiltro);
    }

    // Processamento Dinâmico de cada Aluno com Ocorrências Acumuladas
    const cardsProcessados = [];

    alunosFiltrados.forEach(aluno => {
        const ocs = db.ocorrencias.filter(o => o.aluno_id === aluno.id);
        const intervAluno = intervencoes.filter(i => i.aluno_id === aluno.id);
        const turma = db.turmas.find(t => t.id === aluno.turma_id);
        const estadoAtual = estados[aluno.id] || { coluna: 'entrada', data_analise: null };

        if (ocs.length === 0 && intervAluno.length === 0 && aluno.condicao === 'Nenhuma') {
            return; // Aluno sem histórico não entra no Kanban
        }

        const ultimaOc = ocs[ocs.length - 1];
        let colunaEfetiva = estadoAtual.coluna;

        // ----------------------------------------------------
        // REGRA DOS 14 DIAS DE ANÁLISE AUTOMÁTICA & REINCIDÊNCIA
        // ----------------------------------------------------
        let diasRestantesAnalise = 14;
        let ocsUltimas2Semanas = [];
        let reincidiuNos14d = false;

        if (colunaEfetiva === 'analise14' && estadoAtual.data_analise) {
            const dataAnaliseObj = new Date(estadoAtual.data_analise);
            const msPassados = agora - dataAnaliseObj;
            const diasPassados = Math.floor(msPassados / (1000 * 60 * 60 * 24));
            diasRestantesAnalise = 14 - diasPassados;

            // Verificar ocorrências registradas APÓS a entrada em Análise
            const novasOcsDuranteAnalise = ocs.filter(o => new Date(o.created_at || o.data || o.data_ocorrencia) > dataAnaliseObj);

            if (novasOcsDuranteAnalise.length > 0) {
                // ⚠️ ALUNO FEZ OUTRA OCORRÊNCIA NOS 14 DIAS: Volta para a Caixa de Entrada!
                colunaEfetiva = 'entrada';
                reincidiuNos14d = true;
                estados[aluno.id] = { coluna: 'entrada', data_analise: null };
                salvarEstadosKanban(estados);
                
                const limite2Semanas = new Date(agora - 14 * 24 * 60 * 60 * 1000);
                ocsUltimas2Semanas = ocs.filter(o => new Date(o.created_at || o.data || o.data_ocorrencia) >= limite2Semanas);
            } else if (diasRestantesAnalise <= 0) {
                // ✅ PASSARAM-SE 14 DIAS SEM NADA: Sai automaticamente do Kanban!
                estados[aluno.id] = { coluna: 'concluido', data_analise: null };
                salvarEstadosKanban(estados);
                return;
            }
        }

        cardsProcessados.push({
            aluno,
            turmaNome: turma ? turma.nome : '6º Ano A',
            coluna: colunaEfetiva,
            estadoAtual,
            ultimaOc,
            todasOcs: ocs,
            ocsUltimas2Semanas,
            reincidiuNos14d,
            diasRestantesAnalise,
            ultimaIntervencao: intervAluno[0]
        });
    });

    // Helper de Formatação de Data / Hora para Ocorrências e Conversas
    const formatarDataHoraOc = (dtStr) => {
        if (!dtStr) return 'Horário não informado';
        const d = new Date(dtStr);
        if (isNaN(d.getTime())) return 'Horário não informado';
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const hora = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${dia}/${mes} às ${hora}:${min}`;
    };

    // Gerador de Card HTML por Coluna
    const gerarCardKanbanHTML = (item) => {
        const ocsDoAluno = item.todasOcs.length > 0 ? item.todasOcs : [
            { tipo: 'Desvio Comportamental', descricao: 'Observação registrada em sala.', created_at: new Date().toISOString(), professor_nome: 'Prof. Marcos Antônio' }
        ];

        const intervStr = item.ultimaIntervencao ? item.ultimaIntervencao.anotacao : '';

        // 1. CARD NA CAIXA DE ENTRADA (ACÚMULO DE OCORRÊNCIAS)
        if (item.coluna === 'entrada') {
            return `
                <div class="kanban-card-item" 
                     draggable="true" 
                     ondragstart="iniciarArrastoKanban(event, '${item.aluno.id}')"
                     onclick="abrirModalHistoricoAlunoBI('${item.aluno.id}')"
                     title="Arraste ou clique abaixo para definir a data e horário da conversa">
                    
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                        <img src="${item.aluno.avatar}" alt="${item.aluno.nome}" class="kanban-card-avatar">
                        <div style="flex:1; min-width:0;">
                            <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.aluno.nome}</strong>
                            <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;">${item.turmaNome}</span>
                        </div>
                    </div>

                    <!-- Acúmulo de Ocorrências Registradas pelo Professor -->
                    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:10px; margin-bottom:8px;">
                        <div style="font-size:11px; font-weight:800; color:#DC2626; display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid #E2E8F0; padding-bottom:6px;">
                            <span><i class="ph-bold ph-warning"></i> Ocorrências Acumuladas (${ocsDoAluno.length})</span>
                            <span style="font-size:9px; background:#FEE2E2; color:#991B1B; padding:2px 6px; border-radius:999px;">Aguardando Agendamento</span>
                        </div>

                        ${ocsDoAluno.map(o => `
                            <div style="margin-bottom:8px; border-bottom:1px dashed #E2E8F0; padding-bottom:6px;">
                                <div style="font-size:11px; font-weight:800; color:var(--rodin-graphite); display:flex; justify-content:space-between; align-items:center;">
                                    <span>• ${o.tipo}</span>
                                    <span style="font-size:10px; color:#64748B; font-weight:600;"><i class="ph ph-clock"></i> ${formatarDataHoraOc(o.created_at || o.data)}</span>
                                </div>
                                <div style="font-size:10px; color:var(--rodin-orange); font-weight:700; margin-top:2px;">
                                    <i class="ph ph-user"></i> ${o.professor_nome || 'Prof. Marcos Antônio (História)'}
                                </div>
                                ${o.descricao ? `<p style="font-size:10px; color:#475569; margin:4px 0 0 0; line-height:1.3;">"${o.descricao}"</p>` : ''}
                            </div>
                        `).join('')}
                    </div>

                    <!-- Caso o aluno tenha reincidido no período de 14 dias -->
                    ${item.reincidiuNos14d ? `
                        <div style="background:#FEF2F2; border:1px solid #FCA5A5; border-radius:10px; padding:10px; margin-bottom:10px;">
                            <div style="font-size:10px; font-weight:800; color:#991B1B; display:flex; align-items:center; gap:4px; margin-bottom:4px;">
                                <i class="ph-bold ph-arrows-clockwise"></i> Reincidência no período de 14d de análise!
                            </div>
                            ${intervStr ? `
                                <div style="font-size:10px; color:#7F1D1D; background:#FFF; border:1px solid #FECACA; padding:6px; border-radius:6px;">
                                    <strong>Ação Anterior do Orientador:</strong> "${intervStr}"
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- Botão Direto para Agendar Conversa com o Aluno -->
                    <div style="display:flex; margin-top:8px;">
                        <button type="button" 
                                onclick="event.stopPropagation(); abrirModalAgendarConversa('${item.aluno.id}')" 
                                style="background:var(--rodin-orange); border:none; color:#FFF; border-radius:8px; padding:7px 12px; font-size:11px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:6px; width:100%; justify-content:center;">
                            <i class="ph-bold ph-calendar-plus"></i> Agendar Conversa com Aluno
                        </button>
                    </div>
                </div>
            `;
        }

        // 2. CARD EM CONVERSA AGENDADA
        if (item.coluna === 'agendada') {
            const dataAg = item.estadoAtual.data_conversa;
            const horaAg = item.estadoAtual.horario_conversa || '10:00';

            let dataAgFormatada = 'Data não definida';
            if (dataAg) {
                const p = dataAg.split('-');
                if (p.length === 3) dataAgFormatada = `${p[2]}/${p[1]}/${p[0]}`;
            }

            return `
                <div class="kanban-card-item" 
                     draggable="true" 
                     ondragstart="iniciarArrastoKanban(event, '${item.aluno.id}')"
                     onclick="abrirModalHistoricoAlunoBI('${item.aluno.id}')"
                     style="border-left: 4px solid #F59E0B;"
                     title="Arraste para 'Em Análise (14 Dias)' para registrar a anotação pós-conversa">
                    
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <img src="${item.aluno.avatar}" alt="${item.aluno.nome}" class="kanban-card-avatar">
                        <div style="flex:1; min-width:0;">
                            <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.aluno.nome}</strong>
                            <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;">${item.turmaNome}</span>
                        </div>
                    </div>

                    <!-- Badge de Agendamento -->
                    <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:10px; margin-bottom:8px;">
                        <div style="font-size:11px; font-weight:800; color:#D97706; display:flex; align-items:center; gap:6px;">
                            <i class="ph-bold ph-calendar-check" style="font-size:14px;"></i> Conversa Agendada para:
                        </div>
                        <div style="font-size:12px; font-weight:800; color:#92400E; margin-top:2px;">
                            ${dataAgFormatada} às ${horaAg}
                        </div>
                    </div>

                    <!-- Pauta das Ocorrências -->
                    <div style="font-size:10px; color:#475569; background:#F8FAFC; border:1px solid #E2E8F0; padding:8px; border-radius:8px; margin-bottom:10px;">
                        <strong>Pauta da Reunião (${ocsDoAluno.length} ocorrência(s)):</strong>
                        <ul style="margin:4px 0 0 0; padding-left:14px;">
                            ${ocsDoAluno.map(o => `<li>${o.tipo} (${o.professor_nome || 'Prof. Marcos Antônio'})</li>`).join('')}
                        </ul>
                    </div>

                    <div style="display:flex; justify-content:flex-end;">
                        <button type="button" 
                                onclick="event.stopPropagation(); abrirModalAcaoOrientador('${item.aluno.id}', 'analise14')" 
                                style="background:var(--rodin-orange); border:none; color:#FFF; border-radius:8px; padding:6px 12px; font-size:10px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:6px; width:100%; justify-content:center;">
                            <i class="ph-bold ph-check-circle"></i> Concluir Conversa & Registrar Acordo
                        </button>
                    </div>
                </div>
            `;
        }

        // 3. CARD EM ANÁLISE (14 DIAS)
        if (item.coluna === 'analise14') {
            const dtConversaStr = item.ultimaIntervencao ? formatarDataHoraOc(item.ultimaIntervencao.created_at) : 'Data da conversa gravada';

            return `
                <div class="kanban-card-item" 
                     draggable="true" 
                     ondragstart="iniciarArrastoKanban(event, '${item.aluno.id}')"
                     onclick="abrirModalHistoricoAlunoBI('${item.aluno.id}')"
                     style="border-left: 4px solid #3B82F6;"
                     title="Aluno em monitoramento inteligente de 14 dias">
                    
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <img src="${item.aluno.avatar}" alt="${item.aluno.nome}" class="kanban-card-avatar">
                        <div style="flex:1; min-width:0;">
                            <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.aluno.nome}</strong>
                            <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;">${item.turmaNome}</span>
                        </div>
                    </div>

                    ${intervStr ? `
                        <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:10px; margin-bottom:8px;">
                            <div style="font-size:11px; font-weight:800; color:#1D4ED8; display:flex; align-items:center; gap:4px; margin-bottom:2px;">
                                <i class="ph-bold ph-notebook"></i> O que foi conversado e acordado:
                            </div>
                            <p style="font-size:11px; color:#1E3A8A; margin:0 0 6px 0; line-height:1.35;">"${intervStr}"</p>
                            <div style="font-size:9px; color:#3B82F6; font-weight:700;">
                                <i class="ph ph-calendar-check"></i> Conversa realizada em: ${dtConversaStr}
                            </div>
                        </div>
                    ` : ''}

                    <div style="background:#F0F9FF; border:1px solid #BAE6FD; border-radius:8px; padding:6px 10px; font-size:10px; color:#0284C7; font-weight:800; display:flex; align-items:center; justify-content:space-between;">
                        <span><i class="ph-bold ph-magnifying-glass"></i> Monitoramento de 14 Dias</span>
                        <span>${item.diasRestantesAnalise}d restantes</span>
                    </div>
                </div>
            `;
        }
    };

    // Renderizar os cards nas 3 Colunas principais
    const cardsEntrada = cardsProcessados.filter(c => c.coluna === 'entrada');
    const cardsAgendada = cardsProcessados.filter(c => c.coluna === 'agendada');
    const cardsAnalise14 = cardsProcessados.filter(c => c.coluna === 'analise14');

    if (colEntrada) {
        colEntrada.innerHTML = cardsEntrada.length > 0 ? 
            cardsEntrada.map(gerarCardKanbanHTML).join('') : 
            '<p style="font-size:11px; color:var(--rodin-cool-gray); padding:10px; text-align:center;">Caixa de entrada vazia.</p>';
    }

    if (colAgendada) {
        colAgendada.innerHTML = cardsAgendada.length > 0 ? 
            cardsAgendada.map(gerarCardKanbanHTML).join('') : 
            '<p style="font-size:11px; color:var(--rodin-cool-gray); padding:10px; text-align:center;">Nenhuma conversa agendada.</p>';
    }

    if (colAnalise14) {
        colAnalise14.innerHTML = cardsAnalise14.length > 0 ? 
            cardsAnalise14.map(gerarCardKanbanHTML).join('') : 
            '<p style="font-size:11px; color:var(--rodin-cool-gray); padding:10px; text-align:center;">Nenhum caso em análise de 14d.</p>';
    }
}

// ==========================================
// 6. SETUP E CADASTROS (IMAGEM 4)
// ==========================================
function carregarSetupTurma() {
    const sel = document.getElementById('setup-turma-select');
    if (sel && sel.children.length === 0) {
        sel.innerHTML = db.turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }
}

function salvarLayoutSetup() {
    mostrarSnackbar("Layout salvo com sucesso!");
}

// ==========================================
// 7. CENTRAL DE CADASTROS
// ==========================================
let estadoCadastros = {
    abaAtiva: 'alunos'
};

// alternarSubAbaCadastros definida na linha 1616 com suporte a todas as 4 abas (alunos, professores, turmas, usuarios)

const DISCIPLINAS_POR_ETAPA = {
    "Ensino Fundamental Anos Finais": [
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
    ],
    "Ensino Médio": [
        "Prática Textual",
        "Gramática",
        "Literatura",
        "Matemática",
        "Física",
        "Química",
        "Biologia",
        "História",
        "Geografia",
        "Filosofia",
        "Sociologia",
        "Língua Inglesa",
        "Arte",
        "Estudos da Contemporaneidade",
        "Educação Física"
    ],
    "Terceirão": [
        "Língua Portuguesa - Gramática",
        "Língua Portuguesa - Literatura",
        "Língua Portuguesa - Técnica e Metodologia da Redação",
        "Matemática",
        "Física",
        "Química",
        "Biologia",
        "História",
        "Geografia",
        "Filosofia",
        "Sociologia",
        "Língua Inglesa",
        "Educação Física"
    ]
};

function atualizarDisciplinasPorEtapa() {
    const selDisc = document.getElementById('cad-prof-disciplina');
    if (!selDisc) return;

    const lista = db.disciplinas || [];
    selDisc.innerHTML = lista.length > 0 ? 
        lista.map(d => {
            const id = typeof d === 'string' ? d : d.id;
            const nome = typeof d === 'string' ? d : d.nome;
            return `<option value="${id}">${nome}</option>`;
        }).join('') : 
        '<option value="">Nenhuma disciplina no banco</option>';
}

function atualizarDisciplinasEdicaoProf(selectedDiscVal = null) {
    const selDisc = document.getElementById('edit-prof-disciplina');
    if (!selDisc) return;

    const lista = db.disciplinas || [];
    selDisc.innerHTML = lista.length > 0 ? 
        lista.map(d => {
            const id = typeof d === 'string' ? d : d.id;
            const nome = typeof d === 'string' ? d : d.nome;
            const isSelected = selectedDiscVal && (id === selectedDiscVal || nome === selectedDiscVal);
            return `<option value="${id}" ${isSelected ? 'selected' : ''}>${nome}</option>`;
        }).join('') : 
        '<option value="">Nenhuma disciplina no banco</option>';
}

function alternarSubAbaCadastros(subTabId) {
    const tabs = ['alunos', 'professores', 'turmas', 'disciplinas', 'usuarios'];
    tabs.forEach(t => {
        const btn = document.getElementById(`btn-cad-tab-${t}`);
        const panel = document.getElementById(`cad-subview-${t}`);
        if (btn) {
            if (t === subTabId) btn.classList.add('active');
            else btn.classList.remove('active');
        }
        if (panel) {
            panel.style.display = t === subTabId ? 'block' : 'none';
        }
    });

    if (subTabId === 'usuarios') {
        renderizarListaUsuariosCadastradosPainel();
        renderizarCheckboxesTurmasPermitidas();
    } else if (subTabId === 'disciplinas') {
        renderizarListaDisciplinasCadastradas();
    }
}
window.alternarSubAbaCadastros = alternarSubAbaCadastros;

function renderizarComponentesCadastros() {
    const selAlunoTurma = document.getElementById('cad-aluno-turma');
    const selFiltroTurma = document.getElementById('cad-filtro-turma');

    const turmasPermitidas = obterTurmasPermitidasUsuario();

    if (selAlunoTurma) {
        selAlunoTurma.innerHTML = turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }
    if (selFiltroTurma) {
        selFiltroTurma.innerHTML = `<option value="todas">Todas as Turmas Permitidas</option>` + turmasPermitidas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }

    atualizarDisciplinasPorEtapa();

    renderizarListaAlunosCadastrados();
    renderizarListaProfessoresCadastrados();
    renderizarListaTurmasCadastradas();
    renderizarListaDisciplinasCadastradas();
    renderizarListaUsuariosCadastradosPainel();
    renderizarCheckboxesTurmasPermitidas();
}

function carregarCadastros() {
    if (typeof window.sincronizarBancoComSupabase === 'function') {
        window.sincronizarBancoComSupabase();
    }
    renderizarComponentesCadastros();
}
window.carregarCadastros = carregarCadastros;

function renderizarCheckboxesTurmasPermitidas() {
    const container = document.getElementById('checkboxes-turmas-permitidas');
    if (!container) return;

    const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(db.turmas) : db.turmas;
    container.innerHTML = turmasOrdenadas.map(t => `
        <label style="font-size:11px; color:var(--rodin-graphite); font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
            <input type="checkbox" name="turma_permitida_chk" value="${t.nome}">
            ${t.nome}
        </label>
    `).join('');
}

function alternarOpcoesTurmasPermitidasForm() {
    const papel = document.getElementById('cad-usr-papel')?.value;
    const box = document.getElementById('box-turmas-permitidas-form');
    if (box) {
        box.style.display = papel === 'diretor' ? 'none' : 'block';
    }
}

function previewEditUsuarioFoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('edit-usr-foto-preview');
            if (preview) preview.src = e.target.result;
            window._tempEditUsuarioFotoBase64 = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
window.previewEditUsuarioFoto = previewEditUsuarioFoto;

function previewCadUsuarioFoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('cad-usr-foto-preview');
            if (preview) preview.src = e.target.result;
            window._tempCadUsuarioFotoBase64 = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
window.previewCadUsuarioFoto = previewCadUsuarioFoto;

async function cadastrarNovoUsuarioSistema(e) {
    e.preventDefault();
    const nome = document.getElementById('cad-usr-nome')?.value.trim();
    const cargo = document.getElementById('cad-usr-cargo')?.value.trim();
    const papel = document.getElementById('cad-usr-papel')?.value;

    if (!nome || !cargo) {
        alert('Preencha o nome e o cargo do usuário.');
        return;
    }

    let turmasPermitidas = 'todas';
    if (papel === 'orientador') {
        const chks = document.querySelectorAll('input[name="turma_permitida_chk"]:checked');
        turmasPermitidas = Array.from(chks).map(c => c.value);
        if (turmasPermitidas.length === 0) {
            alert('Por favor, selecione pelo menos uma turma permitida para este orientador.');
            return;
        }
    }

    const usuarios = obterListaUsuariosSistema();
    const fotoUsr = window._tempCadUsuarioFotoBase64 || `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=FF8A4C&color=fff`;
    window._tempCadUsuarioFotoBase64 = null;

    const novoUsr = {
        id: `usr_${Date.now()}`,
        nome,
        cargo,
        papel,
        turmas_permitidas: turmasPermitidas,
        foto: fotoUsr
    };

    usuarios.push(novoUsr);
    salvarListaUsuariosSistema(usuarios);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('usuarios_sistema').insert([novoUsr]);
        } catch(err) {
            console.warn("Erro ao cadastrar usuário no Supabase:", err);
        }
    }

    document.getElementById('form-cad-usuario')?.reset();
    const previewCad = document.getElementById('cad-usr-foto-preview');
    if (previewCad) previewCad.src = `https://ui-avatars.com/api/?name=User&background=FF8A4C&color=fff`;

    mostrarSnackbar(`Usuário '${nome}' cadastrado com sucesso!`);
    renderizarListaUsuariosCadastradosPainel();
    renderizarListaUsuariosLogin();
}

function renderizarListaUsuariosCadastradosPainel() {
    const container = document.getElementById('lista-usuarios-cadastrados-painel');
    if (!container) return;

    const usuarios = obterListaUsuariosSistema();
    const usrLogado = obterUsuarioLogado();

    container.innerHTML = usuarios.map(u => {
        let turmasText = 'Acesso Total (Diretoria)';
        const info = window.obterPermissoesESenhaUsuario(u);
        if (u.papel === 'orientador' && Array.isArray(info.turmas)) {
            turmasText = info.turmas.join(', ');
        }

        const eDiretor = u.id === 'usr_diretor';
        const podeEditar = usrLogado.papel === 'diretor' || usrLogado.id === u.id;

        return `
            <div style="padding:12px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:14px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${u.foto}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange);">
                    <div>
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${u.nome}</strong>
                        <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:700;">${u.cargo}</span>
                        <div style="font-size:10px; color:#4338CA; font-weight:800; margin-top:2px;">
                            <i class="ph-bold ph-key"></i> Turmas: ${turmasText}
                        </div>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center;">
                    ${podeEditar ? `
                        <button type="button" class="btn-primary-rodin" onclick="abrirModalEditarUsuarioSistema('${u.id}')" style="background:#475569; color:#FFF; font-size:10px; padding:5px 10px; border-radius:8px; gap:4px;">
                            <i class="ph-bold ph-pencil-line"></i> Editar
                        </button>
                    ` : ''}
                    ${!eDiretor && usrLogado.papel === 'diretor' ? `
                        <button type="button" class="btn-reset-pink" onclick="excluirUsuarioSistema('${u.id}')">Excluir</button>
                    ` : (eDiretor ? '<span style="font-size:10px; color:var(--rodin-orange); font-weight:800; background:#FFF7ED; padding:3px 8px; border-radius:6px; border:1px solid #FFEDD5;">DIREÇÃO GERAL</span>' : '')}
                </div>
            </div>
        `;
    }).join('');
}

function abrirModalEditarUsuarioSistema(usuarioId) {
    const usuarios = obterListaUsuariosSistema();
    const usr = usuarios.find(u => u.id === usuarioId);
    if (!usr) return;

    const usrLogado = obterUsuarioLogado();

    // Regra: Ninguém edita a Direção Geral exceto o próprio Diretor!
    if (usr.id === 'usr_diretor' && usrLogado.id !== 'usr_diretor') {
        alert('Apenas a própria Direção Geral pode alterar os dados da Diretoria.');
        return;
    }

    window._tempEditUsuarioFotoBase64 = null;
    const preview = document.getElementById('edit-usr-foto-preview');
    if (preview) {
        preview.src = usr.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usr.nome)}&background=FF8A4C&color=fff`;
    }

    document.getElementById('edit-usr-id').value = usr.id;
    document.getElementById('edit-usr-nome').value = usr.nome;
    document.getElementById('edit-usr-cargo').value = usr.cargo;
    
    const infoUsr = window.obterPermissoesESenhaUsuario(usr);
    const senhaField = document.getElementById('edit-usr-senha');
    if (senhaField) {
        senhaField.value = infoUsr.senha || '';
    }

    const selPapel = document.getElementById('edit-usr-papel');
    if (selPapel) {
        selPapel.value = usr.papel || 'orientador';
        if (usr.id === 'usr_diretor') {
            selPapel.disabled = true; // Diretor mantém sempre acesso total
        } else {
            selPapel.disabled = false;
        }
    }

    alternarOpcoesTurmasEdicaoForm();

    // Preencher checkboxes de turmas permitidas
    const chkContainer = document.getElementById('checkboxes-turmas-permitidas-edit');
    if (chkContainer) {
        const info = window.obterPermissoesESenhaUsuario(usr);
        const permitidas = Array.isArray(info.turmas) ? info.turmas : [];
        const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(db.turmas) : db.turmas;
        chkContainer.innerHTML = turmasOrdenadas.map(t => {
            const isChecked = info.turmas === 'todas' || permitidas.some(p => t.nome.toLowerCase().includes(p.toLowerCase()));
            return `
                <label style="font-size:11px; color:var(--rodin-graphite); font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" name="turma_permitida_edit_chk" value="${t.nome}" ${isChecked ? 'checked' : ''}>
                    ${t.nome}
                </label>
            `;
        }).join('');
    }

    const modal = document.getElementById('modal-editar-usuario-sistema');
    if (modal) modal.style.display = 'flex';
}

function fecharModalEditarUsuarioSistema() {
    const modal = document.getElementById('modal-editar-usuario-sistema');
    if (modal) modal.style.display = 'none';
}

function alternarOpcoesTurmasEdicaoForm() {
    const papel = document.getElementById('edit-usr-papel')?.value;
    const box = document.getElementById('box-turmas-permitidas-edit-form');
    if (box) {
        box.style.display = papel === 'diretor' ? 'none' : 'block';
    }
}

async function salvarEdicaoUsuarioSistema(e) {
    e.preventDefault();
    const usuarioId = document.getElementById('edit-usr-id').value;
    const nome = document.getElementById('edit-usr-nome').value.trim();
    const cargo = document.getElementById('edit-usr-cargo').value.trim();
    const papel = document.getElementById('edit-usr-papel').value;

    if (!usuarioId || !nome || !cargo) return;

    const usuarios = obterListaUsuariosSistema();
    const index = usuarios.findIndex(u => u.id === usuarioId);
    if (index === -1) return;

    let turmasPermitidas = 'todas';
    if (papel === 'orientador') {
        const chks = document.querySelectorAll('input[name="turma_permitida_edit_chk"]:checked');
        turmasPermitidas = Array.from(chks).map(c => c.value);
        if (turmasPermitidas.length === 0) {
            alert('Selecione pelo menos uma turma permitida para o orientador.');
            return;
        }
    }

    const senhaVal = document.getElementById('edit-usr-senha')?.value.trim() || '';

    usuarios[index].nome = nome;
    usuarios[index].cargo = cargo;
    usuarios[index].papel = papel;
    usuarios[index].turmas_permitidas = window.empacotarPermissoesESenhaUsuario(turmasPermitidas, senhaVal);

    if (window._tempEditUsuarioFotoBase64) {
        usuarios[index].foto = window._tempEditUsuarioFotoBase64;
    } else {
        const preview = document.getElementById('edit-usr-foto-preview');
        if (preview && preview.src) {
            usuarios[index].foto = preview.src;
        }
    }
    window._tempEditUsuarioFotoBase64 = null;

    salvarListaUsuariosSistema(usuarios);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('usuarios_sistema').upsert([usuarios[index]]);
        } catch(err) {
            console.warn("Erro ao atualizar usuário no Supabase:", err);
        }
    }

    // Se o usuário editado for a sessão atual, atualizar db.perfil_usuario
    const usrLogado = obterUsuarioLogado();
    if (usrLogado.id === usuarioId) {
        db.perfil_usuario = usuarios[index];
        carregarPerfilUsuario();
    }

    fecharModalEditarUsuarioSistema();
    mostrarSnackbar(`Perfil de '${nome}' atualizado com sucesso!`);
    renderizarListaUsuariosCadastradosPainel();
    renderizarListaUsuariosLogin();
}

async function excluirUsuarioSistema(usuarioId) {
    let usuarios = obterListaUsuariosSistema();
    const usr = usuarios.find(u => u.id === usuarioId);
    if (!usr) return;

    if (confirm(`Tem certeza que deseja excluir o acesso de '${usr.nome}'?`)) {
        usuarios = usuarios.filter(u => u.id !== usuarioId);
        salvarListaUsuariosSistema(usuarios);

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('usuarios_sistema').delete().eq('id', usuarioId);
            } catch(e) {
                console.warn("Erro ao excluir usuário no Supabase:", e);
            }
        }

        mostrarSnackbar(`Usuário '${usr.nome}' removido.`);
        renderizarListaUsuariosCadastradosPainel();
    }
}
window.excluirUsuarioSistema = excluirUsuarioSistema;

function renderizarListaAlunosCadastrados() {
    const lista = document.getElementById('lista-alunos-cadastrados');
    if (!lista) return;

    const turmaFiltro = document.getElementById('cad-filtro-turma')?.value || 'todas';
    const alunosFiltrados = turmaFiltro === 'todas' ? db.alunos : db.alunos.filter(a => a.turma_id === turmaFiltro);

    if (alunosFiltrados.length === 0) {
        lista.innerHTML = `<div style="padding:20px; text-align:center; color:var(--rodin-cool-gray); font-size:12px;">Nenhum aluno encontrado nesta turma.</div>`;
        return;
    }

    lista.innerHTML = alunosFiltrados.map(a => {
        const turma = db.turmas.find(t => t.id === a.turma_id);
        const nomeTurma = turma ? turma.nome : 'Turma';
        const temCondicao = a.condicao && !['NENHUMA', 'REGULAR', 'NENHUM'].includes(a.condicao.toUpperCase().trim());
        const badgeCond = temCondicao ? `<span class="condition-pill ${a.condicao.toLowerCase()}" style="font-size:9px;">${a.condicao.toUpperCase()}</span>` : '';

        return `
            <div style="padding:10px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${a.avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
                    <div>
                        <strong style="font-size:12px; color:var(--rodin-graphite); display:block;">${a.nome}</strong>
                        <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                            <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;">${nomeTurma}</span>
                            ${badgeCond}
                        </div>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center;">
                    <button class="btn-primary-rodin" onclick="abrirModalEditarAluno('${a.id}')" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px;">
                        <i class="ph-bold ph-pencil-line" style="font-size:14px;"></i> Editar
                    </button>
                    <button class="btn-reset-pink" onclick="excluirAluno('${a.id}')">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function abrirModalEditarAluno(alunoId) {
    const aluno = db.alunos.find(a => a.id === alunoId);
    if (!aluno) return;

    const modal = document.getElementById('modal-editar-aluno');
    if (!modal) return;

    document.getElementById('edit-aluno-id').value = aluno.id;
    document.getElementById('edit-aluno-nome').value = aluno.nome;

    const turmaSelect = document.getElementById('edit-aluno-turma');
    if (turmaSelect) {
        turmaSelect.innerHTML = db.turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
        turmaSelect.value = aluno.turma_id;
    }

    const condSelect = document.getElementById('edit-aluno-condicao');
    if (condSelect) {
        condSelect.value = aluno.condicao || 'Nenhuma';
    }

    const preview = document.getElementById('edit-aluno-avatar-preview');
    if (preview) {
        preview.src = aluno.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(aluno.nome)}`;
    }

    window._tempEditAlunoAvatarBase64 = null;
    modal.style.display = 'flex';
}

function fecharModalEditarAluno() {
    const modal = document.getElementById('modal-editar-aluno');
    if (modal) modal.style.display = 'none';
}

function processarUploadFotoEditAluno(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const preview = document.getElementById('edit-aluno-avatar-preview');
            if (preview) preview.src = dataUrl;
            window._tempEditAlunoAvatarBase64 = dataUrl;
        };
        reader.readAsDataURL(file);
    }
}

async function salvarEdicaoAluno(e) {
    e.preventDefault();
    const alunoId = document.getElementById('edit-aluno-id').value;
    const nome = document.getElementById('edit-aluno-nome').value.trim();
    const turma_id = document.getElementById('edit-aluno-turma').value;
    const condicao = document.getElementById('edit-aluno-condicao').value;
    const preview = document.getElementById('edit-aluno-avatar-preview');

    const aluno = db.alunos.find(a => a.id === alunoId);
    if (aluno) {
        aluno.nome = nome;
        aluno.turma_id = turma_id;
        aluno.condicao = condicao;
        if (window._tempEditAlunoAvatarBase64) {
            aluno.avatar = window._tempEditAlunoAvatarBase64;
        } else if (preview && preview.src) {
            aluno.avatar = preview.src;
        }

        window.safeSetLocalStorage('rodin_alunos', db.alunos);
        window._tempEditAlunoAvatarBase64 = null;

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('alunos').update({
                    nome: nome,
                    turma_id: turma_id,
                    condicao: condicao,
                    avatar: aluno.avatar
                }).eq('id', alunoId);
            } catch (err) {
                console.warn("Erro ao salvar edição de aluno no Supabase:", err);
            }
        }

        fecharModalEditarAluno();
        renderizarListaAlunosCadastrados();
        atualizarBiGeral();
        mostrarSnackbar(`Cadastro do aluno '${nome}' atualizado com sucesso!`);
    }
}

function renderizarListaProfessoresCadastrados() {
    const lista = document.getElementById('lista-professores-cadastrados');
    if (!lista) return;

    lista.innerHTML = db.professores.map(p => {
        const ptds = db.ptd.filter(pt => pt.professor_id === p.id);
        const turmasNomes = ptds.map(pt => {
            const t = db.turmas.find(tu => tu.id === pt.turma_id);
            return t ? t.nome : '';
        }).filter(Boolean).join(', ') || '6º Ano A';

        const temFacial = (p.facial_descriptor && p.facial_descriptor.length > 0) || (p.facial_descriptors && p.facial_descriptors.length > 0);
        const btnFacialText = temFacial ? '<i class="ph-bold ph-check" style="font-size:14px;"></i> Facial Cadastrada' : '<i class="ph-bold ph-camera" style="font-size:14px;"></i> Cadastrar Facial';
        const btnFacialBg = temFacial ? 'background:#10B981; color:#FFF;' : 'background:#F45206; color:#FFF;';
        
        let discNome = p.disciplina || 'Matemática';
        if (ptds.length > 0) {
            const dFound = (db.disciplinas || []).find(d => (typeof d === 'string' ? d : d.id) === ptds[0].disciplina_id || (typeof d === 'object' && d.nome === ptds[0].disciplina_id));
            if (dFound) discNome = typeof dFound === 'string' ? dFound : dFound.nome;
        }

        const avatarProf = p.foto_biometrica ? 
            `<img src="${p.foto_biometrica}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange);">` : 
            `<div style="width:38px; height:38px; border-radius:50%; background:var(--rodin-orange); color:#FFF; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px;">${escapeHTML(p.nome.charAt(0))}</div>`;

        return `
            <div style="padding:12px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    ${avatarProf}
                    <div>
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${escapeHTML(p.nome)}</strong>
                        <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${escapeHTML(discNome)} • Turmas: ${escapeHTML(turmasNomes)} | ${escapeHTML(p.etapa || 'Ensino Fundamental Anos Finais')}</span>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                    <button class="btn-primary-rodin" onclick="abrirModalEditarProfessor('${p.id}')" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px;">
                        <i class="ph-bold ph-pencil-line" style="font-size:14px;"></i> Editar
                    </button>
                    <button class="btn-primary-rodin" onclick="abrirModalCadastroFacial('${p.id}')" style="${btnFacialBg} font-size:11px; padding:6px 12px; border-radius:8px; gap:4px;">
                        ${btnFacialText}
                    </button>
                    <button class="btn-reset-pink" onclick="excluirProfessor('${p.id}')">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function abrirModalEditarProfessor(profId) {
    const prof = db.professores.find(p => p.id === profId);
    if (!prof) return;

    const modal = document.getElementById('modal-editar-professor');
    if (!modal) return;

    document.getElementById('edit-prof-id').value = prof.id;
    document.getElementById('edit-prof-nome').value = prof.nome;

    const etapaSelect = document.getElementById('edit-prof-etapa');
    if (etapaSelect) {
        etapaSelect.value = prof.etapa || "Ensino Fundamental Anos Finais";
    }

    const ptd = db.ptd.find(pt => pt.professor_id === prof.id);
    const discVal = ptd ? ptd.disciplina_id : (prof.disciplina || "Matemática");

    atualizarDisciplinasEdicaoProf(discVal);

    modal.style.display = 'flex';
}

function fecharModalEditarProfessor() {
    const modal = document.getElementById('modal-editar-professor');
    if (modal) modal.style.display = 'none';
}

async function salvarEdicaoProfessor(e) {
    e.preventDefault();
    const profId = document.getElementById('edit-prof-id').value;
    const nome = document.getElementById('edit-prof-nome').value;
    const etapa = document.getElementById('edit-prof-etapa').value;
    const discInputVal = document.getElementById('edit-prof-disciplina').value;

    const discObj = (db.disciplinas || []).find(d => (typeof d === 'string' ? d : d.id) === discInputVal || (typeof d === 'object' && d.nome === discInputVal));
    const realDiscId = discObj ? (typeof discObj === 'string' ? discObj : discObj.id) : discInputVal;
    const realDiscNome = discObj ? (typeof discObj === 'string' ? discObj : discObj.nome) : discInputVal;

    const prof = db.professores.find(p => p.id === profId);
    if (prof) {
        prof.nome = nome;
        prof.etapa = etapa;
        prof.disciplina = realDiscNome;

        let ptd = db.ptd.find(pt => pt.professor_id === prof.id);
        if (!ptd) {
            ptd = { id: `ptd_${Date.now()}`, professor_id: prof.id, turma_id: db.turmas[0]?.id || 't1', disciplina_id: realDiscId };
            db.ptd.push(ptd);
        } else {
            ptd.disciplina_id = realDiscId;
        }

        window.safeSetLocalStorage('rodin_professores', db.professores);
        window.safeSetLocalStorage('rodin_ptd', db.ptd);

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('professores').update({
                    nome: nome,
                    etapa: etapa
                }).eq('id', profId);

                await sbClient.from('professores_turmas_disciplinas').upsert({
                    id: ptd.id,
                    professor_id: profId,
                    turma_id: ptd.turma_id || 't1',
                    disciplina_id: realDiscId
                });
            } catch (err) {
                console.warn("Erro ao salvar edição de professor no Supabase:", err);
            }
        }

        fecharModalEditarProfessor();
        renderizarListaProfessoresCadastrados();
        mostrarSnackbar(`Perfil do Prof. '${nome}' atualizado com sucesso!`);
    }
}

function renderizarListaTurmasCadastradas() {
    const lista = document.getElementById('lista-turmas-cadastradas');
    if (!lista) return;

    const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(db.turmas) : db.turmas;

    lista.innerHTML = turmasOrdenadas.map(t => {
        const totalAlunos = db.alunos.filter(a => a.turma_id === t.id).length;

        let etapaTurma = t.etapa;
        if (!etapaTurma) {
            etapaTurma = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].some(a => t.nome.includes(a)) 
                ? 'Ensino Fundamental Anos Finais' 
                : 'Ensino Médio';
        }

        const slug = t.slug || t.nome.toLowerCase().trim()
            .replace(/º/g, '')
            .replace(/\s+/g, '-')
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\-]/g, '');
        const linkVisaoProf = `visao-professor-${slug || t.id.replace('turma_', '')}`;

        return `
            <div style="padding:12px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:36px; height:36px; border-radius:10px; background:#0F172A; color:#FFF; display:flex; align-items:center; justify-content:center; font-size:16px;">
                        <i class="ph-bold ph-chalkboard"></i>
                    </div>
                    <div>
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${t.nome}</strong>
                        <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${totalAlunos} Alunos • ${etapaTurma}</span>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <a href="${linkVisaoProf}" class="btn-primary-rodin" style="background:#4338CA; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:6px; text-decoration:none; display:inline-flex; align-items:center;" title="Abrir Visão de Sala de Aula desta turma">
                        <i class="ph-bold ph-chalkboard-teacher" style="font-size:14px;"></i> Visão de Sala
                    </a>
                    <button class="btn-reset-pink" onclick="excluirTurma('${t.id}')">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function processarUploadFotoAluno(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            const preview = document.getElementById('student-avatar-preview');
            const placeholder = document.getElementById('student-upload-placeholder');
            if (preview && placeholder) {
                preview.src = dataUrl;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
            }
            window._tempAlunoAvatarBase64 = dataUrl;
        };
        reader.readAsDataURL(file);
    }
}

async function cadastrarAluno(e) {
    e.preventDefault();
    const nome = document.getElementById('cad-aluno-nome').value;
    const turma_id = document.getElementById('cad-aluno-turma').value;
    const condicao = document.getElementById('cad-aluno-condicao').value;

    const avatarFinal = window._tempAlunoAvatarBase64 || `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=DBD4C2&color=1F2222`;

    const novoAluno = {
        id: `aluno_${Date.now()}`,
        nome,
        turma_id,
        condicao,
        avatar: avatarFinal
    };

    db.alunos.push(novoAluno);
    localStorage.setItem('rodin_alunos', JSON.stringify(db.alunos));

    if (sb && typeof sb.from === 'function') {
        try {
            await sb.from('alunos').insert([novoAluno]);
        } catch(err) {
            console.warn("Erro ao cadastrar aluno no Supabase:", err);
        }
    }

    window._tempAlunoAvatarBase64 = null;
    document.getElementById('form-cad-aluno').reset();

    const preview = document.getElementById('student-avatar-preview');
    const placeholder = document.getElementById('student-upload-placeholder');
    if (preview && placeholder) {
        preview.style.display = 'none';
        placeholder.style.display = 'flex';
    }

    renderizarListaAlunosCadastrados();
    atualizarBiGeral();
    mostrarSnackbar(`Aluno '${nome}' matriculado com sucesso!`);
}

async function excluirAluno(alunoId) {
    db.alunos = db.alunos.filter(a => a.id !== alunoId);
    db.mapa_slots = db.mapa_slots.filter(s => s.aluno_id !== alunoId);
    localStorage.setItem('rodin_alunos', JSON.stringify(db.alunos));
    localStorage.setItem('rodin_mapa_slots', JSON.stringify(db.mapa_slots));

    if (sb && typeof sb.from === 'function') {
        try {
            await sb.from('alunos').delete().eq('id', alunoId);
        } catch(err) {
            console.warn("Erro ao excluir aluno do Supabase:", err);
        }
    }

    renderizarListaAlunosCadastrados();
    atualizarBiGeral();
    mostrarSnackbar("Matrícula excluída com sucesso!");
}

async function cadastrarProfessor(e) {
    e.preventDefault();
    const nome = document.getElementById('cad-prof-nome').value;
    const etapa = document.getElementById('cad-prof-etapa').value;
    const discId = document.getElementById('cad-prof-disciplina').value;

    const novoProf = {
        id: `prof_${Date.now()}`,
        nome,
        etapa,
        disciplina: discId
    };

    db.professores.push(novoProf);
    const ptdNovo = {
        id: `ptd_${Date.now()}`,
        professor_id: novoProf.id,
        turma_id: db.turmas[0]?.id || 't1',
        disciplina_id: discId
    };
    db.ptd.push(ptdNovo);

    window.safeSetLocalStorage('rodin_professores', db.professores);
    window.safeSetLocalStorage('rodin_ptd', db.ptd);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('professores').insert([{
                id: novoProf.id,
                nome: novoProf.nome,
                etapa: novoProf.etapa,
                biometria_facial_status: false
            }]);

            await sbClient.from('professores_turmas_disciplinas').insert([ptdNovo]);
        } catch(err) {
            console.warn("Erro ao cadastrar professor no Supabase:", err);
        }
    }

    document.getElementById('form-cad-professor').reset();
    atualizarDisciplinasPorEtapa();
    renderizarListaProfessoresCadastrados();
    mostrarSnackbar(`Professor '${nome}' (${discId}) cadastrado com sucesso!`);
}

async function excluirProfessor(profId) {
    const prof = db.professores.find(p => p.id === profId);
    const nomeProf = prof ? prof.nome : profId;

    if (confirm(`Tem certeza que deseja excluir o professor '${nomeProf}'?`)) {
        db.professores = db.professores.filter(p => p.id !== profId);
        db.ptd = db.ptd.filter(pt => pt.professor_id !== profId);
        window.safeSetLocalStorage('rodin_professores', db.professores);
        window.safeSetLocalStorage('rodin_ptd', db.ptd);

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('professores_turmas_disciplinas').delete().eq('professor_id', profId);
                await sbClient.from('professores').delete().eq('id', profId);
            } catch(err) {
                console.warn("Erro ao excluir professor do Supabase:", err);
            }
        }

        renderizarListaProfessoresCadastrados();
        mostrarSnackbar(`Professor '${nomeProf}' excluído com sucesso!`);
    }
}

async function cadastrarTurma(e) {
    e.preventDefault();
    const ano = document.getElementById('cad-turma-ano').value;
    const letra = document.getElementById('cad-turma-letra').value;

    const nomeTurma = letra === 'Única' ? ano : `${ano} ${letra}`;

    // BLOQUEIO DE TURMA DUPLICADA COM O MESMO NOME
    const jaExiste = db.turmas.some(t => t.nome.toLowerCase().trim() === nomeTurma.toLowerCase().trim());
    if (jaExiste) {
        mostrarSnackbar(`⚠️ A turma '${nomeTurma}' já está cadastrada! Escolha outro ano ou letra.`);
        alert(`A turma '${nomeTurma}' já existe no sistema. Não é permitido criar turmas duplicadas com o mesmo nome.`);
        return;
    }

    // Determinação automática da etapa baseada no segmento do Colégio Rodin
    let etapa = "Ensino Médio";
    if (['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(ano)) {
        etapa = "Ensino Fundamental Anos Finais";
    }

    const slug = nomeTurma.toLowerCase().trim()
        .replace(/º/g, '')
        .replace(/\s+/g, '-')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const novaTurma = {
        id: `turma_${Date.now()}`,
        nome: nomeTurma,
        ano: ano,
        letra: letra,
        etapa: etapa,
        slug: slug,
        config_mapa: { linhas: 5, colunas: 6 }
    };

    db.turmas.push(novaTurma);
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('turmas').insert([{
                id: novaTurma.id,
                nome: novaTurma.nome,
                etapa: novaTurma.etapa,
                slug: novaTurma.slug,
                config_mapa: novaTurma.config_mapa
            }]);
        } catch(err) {
            console.warn("Erro ao cadastrar turma no Supabase:", err);
        }
    }

    document.getElementById('form-cad-turma').reset();
    carregarCadastros();
    atualizarBiGeral();
    mostrarSnackbar(`Turma '${nomeTurma}' cadastrada com sucesso (${etapa})!`);
}

async function excluirTurma(turmaId) {
    if (db.turmas.length <= 1) {
        mostrarSnackbar("Não é possível excluir a única turma cadastrada!");
        return;
    }
    const turma = db.turmas.find(t => t.id === turmaId);
    db.turmas = db.turmas.filter(t => t.id !== turmaId);
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    // Cascata local de dados associados à turma
    db.alunos = db.alunos.filter(a => a.turma_id !== turmaId);
    db.mapa_slots = db.mapa_slots.filter(m => m.turma_id !== turmaId);
    db.grade_slots = db.grade_slots.filter(g => g.turma_id !== turmaId);
    db.ptd = db.ptd.filter(pt => pt.turma_id !== turmaId);
    
    window.safeSetLocalStorage('rodin_alunos', db.alunos);
    window.safeSetLocalStorage('rodin_mapa_slots', db.mapa_slots);
    window.safeSetLocalStorage('rodin_grade_slots', db.grade_slots);
    window.safeSetLocalStorage('rodin_ptd', db.ptd);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('turmas').delete().eq('id', turmaId);
        } catch(err) {
            console.warn("Erro ao excluir turma do Supabase:", err);
        }
    }

    carregarCadastros();
    atualizarBiGeral();
    mostrarSnackbar(`Turma '${turma ? turma.nome : ''}' excluída com sucesso!`);
}

// ==========================================
// GESTÃO DE DISCIPLINAS (CADASTRO E EXCLUSÃO)
// ==========================================
function renderizarListaDisciplinasCadastradas() {
    const container = document.getElementById('lista-disciplinas-cadastradas');
    if (!container) return;

    if (!db.disciplinas || db.disciplinas.length === 0) {
        container.innerHTML = `<div style="padding:24px; text-align:center; color:var(--rodin-cool-gray); font-size:12px; background:#F8FAFC; border-radius:12px; border:1px dashed var(--rodin-line);">Nenhuma disciplina encontrada no banco de dados.</div>`;
        return;
    }

    container.innerHTML = db.disciplinas.map(d => {
        const id = typeof d === 'string' ? d : (d.id || d.nome);
        const nome = typeof d === 'string' ? d : d.nome;
        const etapa = typeof d === 'object' && d.etapa ? d.etapa : 'Todas as Etapas';

        return `
            <div style="padding:12px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:12px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:36px; height:36px; border-radius:10px; background:#FFF7ED; color:var(--rodin-orange); border:1px solid #FFEDD5; display:flex; align-items:center; justify-content:center; font-size:16px;">
                        <i class="ph-bold ph-book-open"></i>
                    </div>
                    <div>
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${nome}</strong>
                        <span style="font-size:10px; color:var(--rodin-cool-gray); font-weight:700;">${etapa}</span>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center;">
                    <button type="button" class="btn-primary-rodin" onclick="abrirModalEditarDisciplina('${id}')" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px;">
                        <i class="ph-bold ph-pencil-line" style="font-size:14px;"></i> Editar
                    </button>
                    <button type="button" class="btn-reset-pink" onclick="excluirDisciplina('${id}')">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}
window.renderizarListaDisciplinasCadastradas = renderizarListaDisciplinasCadastradas;

function abrirModalEditarDisciplina(discId) {
    let discObj = (db.disciplinas || []).find(d => (typeof d === 'string' ? d : d.id) === discId || (typeof d === 'object' && d.nome === discId));
    if (!discObj) return;

    const modal = document.getElementById('modal-editar-disciplina');
    if (!modal) return;

    const id = typeof discObj === 'string' ? discObj : discObj.id;
    const nome = typeof discObj === 'string' ? discObj : discObj.nome;
    const etapa = typeof discObj === 'object' && discObj.etapa ? discObj.etapa : 'Todas as Etapas';

    document.getElementById('edit-disc-id').value = id;
    document.getElementById('edit-disc-nome').value = nome;
    
    const selEtapa = document.getElementById('edit-disc-etapa');
    if (selEtapa) selEtapa.value = etapa;

    modal.style.display = 'flex';
}
window.abrirModalEditarDisciplina = abrirModalEditarDisciplina;

function fecharModalEditarDisciplina() {
    const modal = document.getElementById('modal-editar-disciplina');
    if (modal) modal.style.display = 'none';
}
window.fecharModalEditarDisciplina = fecharModalEditarDisciplina;

async function salvarEdicaoDisciplina(e) {
    e.preventDefault();
    const discId = document.getElementById('edit-disc-id').value;
    const novoNome = document.getElementById('edit-disc-nome').value.trim();
    const novaEtapa = document.getElementById('edit-disc-etapa').value;

    if (!discId || !novoNome) return;

    let discObj = (db.disciplinas || []).find(d => (typeof d === 'string' ? d : d.id) === discId || (typeof d === 'object' && d.nome === discId));
    const nomeAntigo = discObj ? (typeof discObj === 'string' ? discObj : discObj.nome) : discId;
    const realId = discObj && typeof discObj === 'object' ? discObj.id : discId;

    if (discObj) {
        if (typeof discObj === 'object') {
            discObj.nome = novoNome;
            discObj.etapa = novaEtapa;
        } else {
            const index = db.disciplinas.indexOf(discObj);
            if (index !== -1) {
                db.disciplinas[index] = { id: realId, nome: novoNome, etapa: novaEtapa };
            }
        }

        window.safeSetLocalStorage('rodin_disciplinas', db.disciplinas);

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('disciplinas').update({ nome: novoNome }).eq('id', realId);
                await sbClient.from('disciplinas').update({ nome: novoNome }).eq('nome', nomeAntigo);
            } catch (err) {
                console.warn("Erro ao atualizar disciplina no Supabase:", err);
            }
        }

        fecharModalEditarDisciplina();
        renderizarListaDisciplinasCadastradas();
        atualizarDisciplinasPorEtapa();
        mostrarSnackbar(`Disciplina '${novoNome}' atualizada com sucesso!`);
    }
}
window.salvarEdicaoDisciplina = salvarEdicaoDisciplina;

async function cadastrarDisciplina(e) {
    e.preventDefault();
    const nome = document.getElementById('cad-disc-nome')?.value.trim();
    const etapa = document.getElementById('cad-disc-etapa')?.value;

    if (!nome) return;

    const jaExiste = (db.disciplinas || []).some(d => (typeof d === 'string' ? d : d.nome).toLowerCase().trim() === nome.toLowerCase().trim());
    if (jaExiste) {
        mostrarSnackbar(`⚠️ A disciplina '${nome}' já está cadastrada!`);
        return;
    }

    const idDisc = `disc_${Date.now()}`;
    const novaDiscLocal = {
        id: idDisc,
        nome: nome,
        etapa: etapa || 'Todas as Etapas',
        cor: '#FF8A4C'
    };

    if (!db.disciplinas) db.disciplinas = [];
    db.disciplinas.push(novaDiscLocal);
    window.safeSetLocalStorage('rodin_disciplinas', db.disciplinas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('disciplinas').insert([{
                id: idDisc,
                nome: nome,
                cor: '#FF8A4C'
            }]);
        } catch (err) {
            console.warn("Erro ao cadastrar disciplina no Supabase:", err);
        }
    }

    document.getElementById('form-cad-disciplina')?.reset();
    renderizarListaDisciplinasCadastradas();
    atualizarDisciplinasPorEtapa();
    mostrarSnackbar(`Disciplina '${nome}' cadastrada com sucesso!`);
}
window.cadastrarDisciplina = cadastrarDisciplina;

async function excluirDisciplina(discId) {
    let discObj = (db.disciplinas || []).find(d => (typeof d === 'string' ? d : d.id) === discId || (typeof d === 'object' && d.nome === discId));
    const nomeDisc = discObj ? (typeof discObj === 'string' ? discObj : discObj.nome) : discId;
    const realId = discObj && typeof discObj === 'object' ? discObj.id : discId;

    if (confirm(`Tem certeza que deseja excluir a disciplina '${nomeDisc}'?`)) {
        db.disciplinas = (db.disciplinas || []).filter(d => {
            if (typeof d === 'string') return d !== discId && d !== nomeDisc;
            return d.id !== realId && d.nome !== nomeDisc;
        });
        window.safeSetLocalStorage('rodin_disciplinas', db.disciplinas);

        const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
        if (sbClient && typeof sbClient.from === 'function') {
            try {
                await sbClient.from('disciplinas').delete().eq('id', realId);
                await sbClient.from('disciplinas').delete().eq('nome', nomeDisc);
            } catch(err) {
                console.warn("Erro ao excluir disciplina no Supabase:", err);
            }
        }

        renderizarListaDisciplinasCadastradas();
        atualizarDisciplinasPorEtapa();
        mostrarSnackbar(`Disciplina '${nomeDisc}' excluída com sucesso!`);
    }
}
window.excluirDisciplina = excluirDisciplina;

// ==========================================
// 7. VISÃO DO PROFESSOR (DARK MODE COMPLETO - IMAGEM 5)
// ==========================================
function getClasseCondicao(cond) {
    if (!cond) return 'regular';
    return cond.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '_');
}

function obterTurmaAtualURL() {
    const params = new URLSearchParams(window.location.search);
    let tSlug = params.get('turma') || window.location.hash.replace('#', '') || '';
    
    // Se não veio por query/hash, tenta ler da URL amigável (pathname)
    if (!tSlug) {
        let pathName = window.location.pathname;
        try { pathName = decodeURIComponent(pathName); } catch(e){}
        const pathParts = pathName.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart.startsWith('visao-professor-')) {
            tSlug = lastPart.replace('visao-professor-', '');
        } else if (lastPart && lastPart !== 'visao-professor.html' && lastPart !== 'visao-professor') {
            tSlug = lastPart;
        }
    }
    
    // Fallback inicial se ainda estiver vazio
    if (!tSlug) tSlug = '6-ano-a';

    if (!db.turmas) db.turmas = [];

    // Procura primeiro pelo ID exato ou slug exato (sem sanitizar)
    let matched = db.turmas.find(t => t.id === tSlug || t.slug === tSlug);
    if (matched) return matched.id;

    // Fallback de sanitização para correspondência de slug/nome
    const cleanSlug = tSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
    let turmaMatch = db.turmas.find(t => {
        const s = t.nome.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanId = t.id.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanTId = t.slug ? t.slug.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
        return s === cleanSlug || cleanId === cleanSlug || cleanTId === cleanSlug;
    });

    if (turmaMatch) return turmaMatch.id;

    // Se a turma ainda não existe em db.turmas (ex: "6º-ano-b"), criar dinamicamente
    if (tSlug) {
        let nomeFormatado = tSlug
            .replace(/-/g, ' ')
            .replace(/(\d+)\s*ano/i, '$1º Ano')
            .replace(/(\d+)\s*serie/i, '$1ª Série')
            .replace(/\b[a-z]\b/gi, letter => letter.toUpperCase());

        nomeFormatado = nomeFormatado.split(' ').map(w => {
            if (w.length === 1) return w.toUpperCase();
            return w.charAt(0).toUpperCase() + w.slice(1);
        }).join(' ');

        const novaTurma = {
            id: `turma_${tSlug.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            nome: nomeFormatado,
            slug: tSlug,
            etapa: nomeFormatado.includes('Série') ? 'Ensino Médio' : 'Ensino Fundamental Anos Finais',
            config_mapa: { linhas: 5, colunas: 6 }
        };
        db.turmas.push(novaTurma);
        if (window.safeSetLocalStorage) {
            window.safeSetLocalStorage('rodin_turmas', db.turmas);
        }
        return novaTurma.id;
    }

    return db.turmas[0]?.id || 't1';
}

function obterAulaAtualDaGrade(turmaId) {
    const agora = new Date();
    const diaSemanaJS = agora.getDay(); // 0: Dom, 1: Seg, 2: Ter, 3: Qua, 4: Qui, 5: Sex, 6: Sáb
    
    // Se for fim de semana ou fora do horário oficial, padronizar para Segunda-feira (dia 0) ou dia útil atual
    let diaIndex = (diaSemanaJS >= 1 && diaSemanaJS <= 5) ? diaSemanaJS - 1 : 0;
    
    const hora = agora.getHours();
    const min = agora.getMinutes();
    const totalMin = hora * 60 + min;

    const horariosAulas = [
        { aulaIndex: 0, inicio: 7 * 60 + 15, fim: 8 * 60 + 5 },
        { aulaIndex: 1, inicio: 8 * 60 + 5,  fim: 8 * 60 + 55 },
        { aulaIndex: 2, inicio: 8 * 60 + 55, fim: 9 * 60 + 45 },
        { aulaIndex: 3, inicio: 10 * 60 + 15, fim: 11 * 60 + 5 },
        { aulaIndex: 4, inicio: 11 * 60 + 5, fim: 11 * 60 + 55 },
        { aulaIndex: 5, inicio: 11 * 60 + 55, fim: 12 * 60 + 45 }
    ];

    const aulaAtiva = horariosAulas.find(h => totalMin >= h.inicio && totalMin < h.fim);
    const aulaIndex = aulaAtiva ? aulaAtiva.aulaIndex : 0;

    const slot = (db.grade_slots || []).find(g => g.turma_id === turmaId && g.posicao_x === diaIndex && g.posicao_y === aulaIndex);

    if (slot) {
        const disc = (db.disciplinas || []).find(d => d.id === slot.disciplina_id);
        const prof = (db.professores || []).find(p => p.id === slot.professor_id);
        return {
            emAula: true,
            disciplina: disc ? window.abreviarNomeDisciplina(disc.nome) : 'Matemática',
            professor: prof ? prof.nome : 'Diego',
            aulaIndex: aulaIndex
        };
    }

    return { emAula: true, disciplina: 'Matemática', professor: 'Diego', aulaIndex: 0 };
}

function formatarNomeResumidoAluno(nomeFull) {
    if (!nomeFull) return '';
    const partes = nomeFull.trim().split(/\s+/);
    if (partes.length <= 2) return partes.join(' ');

    const conectivos = ['de', 'da', 'do', 'dos', 'das', 'e', "de'"];
    const partesLimpas = partes.filter((p, i) => i === 0 || !conectivos.includes(p.toLowerCase()));

    if (partesLimpas.length <= 2) return partesLimpas.join(' ');

    const compostosComuns = [
        'joão', 'maria', 'davi', 'ana', 'pedro', 'luiz', 'vitor', 'victor', 'paulo', 'carlos', 'marcos'
    ];

    const primeiroNome = partesLimpas[0];
    const segundoNome = partesLimpas[1];

    const ehComposto = compostosComuns.includes(primeiroNome.toLowerCase());
    const ultimoNome = partesLimpas[partesLimpas.length - 1];

    if (ehComposto) {
        return `${primeiroNome} ${segundoNome} ${ultimoNome}`;
    }

    return `${primeiroNome} ${ultimoNome}`;
}
window.formatarNomeResumidoAluno = formatarNomeResumidoAluno;

function carregarMapaProfessor() {
    // 1. Garantir que os dados do localStorage sejam lidos IMEDIATAMENTE no 1º frame
    try {
        const sMapa = localStorage.getItem('rodin_mapa_slots');
        if (sMapa && (!db.mapa_slots || db.mapa_slots.length === 0)) db.mapa_slots = JSON.parse(sMapa);
    } catch(e){}

    try {
        const sAlunos = localStorage.getItem('rodin_alunos');
        if (sAlunos && (!db.alunos || db.alunos.length === 0)) db.alunos = JSON.parse(sAlunos);
    } catch(e){}

    try {
        const sGrade = localStorage.getItem('rodin_grade_slots');
        if (sGrade && (!db.grade_slots || db.grade_slots.length === 0)) db.grade_slots = JSON.parse(sGrade);
    } catch(e){}

    try {
        const sTurmas = localStorage.getItem('rodin_turmas');
        if (sTurmas && (!db.turmas || db.turmas.length === 0)) db.turmas = JSON.parse(sTurmas);
    } catch(e){}

    try {
        const sOc = localStorage.getItem('rodin_ocorrencias');
        if (sOc && (!db.ocorrencias || db.ocorrencias.length === 0)) db.ocorrencias = JSON.parse(sOc);
    } catch(e){}

    const turmaId = obterTurmaAtualURL() || (db.turmas[0] && db.turmas[0].id) || 't1';
    const turmaObj = (db.turmas || []).find(t => t.id === turmaId) || (db.turmas && db.turmas[0]) || { id: 't1', nome: '6º Ano A', config_mapa: { linhas: 5, colunas: 5 } };
    
    const titleEl = document.getElementById('prof-turma-titulo');
    if (titleEl) titleEl.innerText = turmaObj.nome.toUpperCase();

    // Obter aula atual e professor de forma 100% automática
    const aulaInfo = obterAulaAtualDaGrade(turmaId);
    const materiaEl = document.getElementById('prof-materia-titulo');
    const profEl = document.getElementById('prof-nome-subtexto');

    if (materiaEl) materiaEl.innerText = aulaInfo.disciplina;
    if (profEl) {
        profEl.innerText = aulaInfo.professor ? `Prof. ${aulaInfo.professor}` : '';
        profEl.style.display = 'block';
    }

    // Busca assíncrona do Supabase para atualizar se houver dados mais recentes no banco
    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function' && !window._profMapSupabaseFetched) {
        window._profMapSupabaseFetched = true;
        Promise.all([
            sbClient.from('turmas').select('*'),
            sbClient.from('alunos').select('*'),
            sbClient.from('mapa_sala_slots').select('*'),
            sbClient.from('grade_horaria_slots').select('*'),
            sbClient.from('professores').select('*'),
            sbClient.from('disciplinas').select('*'),
            sbClient.from('ocorrencias_alunos').select('*')
        ]).then(([resT, resA, resM, resG, resP, resD, resO]) => {
            if (resT.data && resT.data.length > 0) db.turmas = window.ordenarTurmas ? window.ordenarTurmas(resT.data) : resT.data;
            if (resA.data && resA.data.length > 0) db.alunos = resA.data;
            if (resM.data && resM.data.length > 0) db.mapa_slots = resM.data;
            if (resG.data && resG.data.length > 0) db.grade_slots = resG.data;
            if (resP.data && resP.data.length > 0) db.professores = resP.data;
            if (resD.data && resD.data.length > 0) db.disciplinas = resD.data;
            if (resO.data && resO.data.length > 0) {
                const mapSb = new Map(resO.data.map(o => [o.id, o]));
                (db.ocorrencias || []).forEach(loc => {
                    if (loc && loc.id && !mapSb.has(loc.id)) mapSb.set(loc.id, loc);
                });
                db.ocorrencias = Array.from(mapSb.values());
                try { localStorage.setItem('rodin_ocorrencias', JSON.stringify(db.ocorrencias)); } catch(e){}
            }
            carregarMapaProfessor();
        }).catch(() => {});
    }

    // Ocorrências registradas estritamente no DIA DE HOJE
    const agora = new Date();
    const ocsHoje = (db.ocorrencias || []).filter(o => {
        const dt = new Date(o.created_at || o.data || o.data_ocorrencia);
        return !isNaN(dt.getTime()) && dt.toDateString() === agora.toDateString();
    });

    const grid = document.getElementById('prof-photocards-grid');
    if (!grid) return;

    const cfg = turmaObj.config_mapa || { linhas: 5, colunas: 5 };
    const rows = cfg.linhas || 5;
    const cols = cfg.colunas || 5;

    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = '14px';

    let html = '';
    let deskNum = 1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const slot = (db.mapa_slots || []).find(s => s.turma_id === turmaId && s.posicao_x === c && s.posicao_y === r);
            const aluno = slot ? (db.alunos || []).find(a => a.id === slot.aluno_id) : null;

            if (aluno) {
                deskNum++;
                const temCondicaoEspecial = aluno.condicao && !['NENHUMA', 'REGULAR', 'NENHUM', 'SEM CONDIÇÃO'].includes(aluno.condicao.toUpperCase().trim());
                const condHtml = temCondicaoEspecial ? `<span class="condition-pill ${window.getClasseCondicao(aluno.condicao)}" style="margin-bottom:2px; font-size:9px;">${aluno.condicao.toUpperCase()}</span>` : '';
                const nomeResumido = formatarNomeResumidoAluno(aluno.nome);

                html += `
                    <div class="student-photocard" onclick="abrirModalOcorrenciaRodin('${aluno.id}')" style="height:180px; position:relative; border-radius:14px; overflow:hidden; cursor:pointer; background:#1E293B; border:1px solid #334155; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s ease;">
                        <img src="${aluno.avatar}" alt="${aluno.nome}" style="width:100%; height:128px; object-fit:cover; display:block;">
                        <div class="photocard-gradient-overlay" style="padding:8px 10px; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; text-align:center;">
                            <div class="student-name-text" style="font-size:12.5px; font-weight:800; color:#FFF; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-align:center; width:100%;" title="${aluno.nome}">${nomeResumido}</div>
                            ${condHtml}
                            ${renderBadgesPhotocard(aluno.id, ocsHoje, true)}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div style="height:180px; background:#0F172A; border:1px dashed #334155; border-radius:14px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#64748B; position:relative;">
                        <i class="ph-bold ph-student" style="font-size:28px; color:#334155; margin-bottom:6px;"></i>
                        <span style="font-size:11px; font-weight:700; color:#64748B;">Carteira Vazia</span>
                    </div>
                `;
            }
        }
    }

    grid.innerHTML = html;
}

// ------------------------------------------
// LÓGICA DE TROCA DE AULA (POPUP DE CONFERÊNCIA DE MAPA DE SALA)
// ------------------------------------------
function notificarTrocaAula() {
    const modal = document.getElementById('modal-troca-aula');
    if (modal) modal.style.display = 'flex';
}

function confirmarTrocaAulaMapa() {
    const modal = document.getElementById('modal-troca-aula');
    if (modal) modal.style.display = 'none';
    carregarMapaProfessor();
    mostrarSnackbar("✅ Mapa de sala conferido! Boa aula, Professor.");
}

// ==========================================
// MODAIS DE OCORRÊNCIA E POPUP DE ÁUDIO
// ==========================================
function abrirModalOcorrenciaRodin(alunoId) {
    const aluno = (db.alunos || []).find(a => a.id === alunoId);
    if (!aluno) return;

    estadoApp.alunoSelecionadoModal = aluno;
    const turma = (db.turmas || []).find(t => t.id === aluno.turma_id);

    const avatarEl = document.getElementById('rodin-modal-avatar');
    const nomeEl = document.getElementById('rodin-modal-nome');
    const turmaEl = document.getElementById('rodin-modal-turma');

    if (avatarEl) avatarEl.src = aluno.avatar;
    if (nomeEl) nomeEl.innerText = aluno.nome;
    if (turmaEl) turmaEl.innerText = turma ? turma.nome.toUpperCase() : '6º ANO A';

    const opcoes = [
        "FOI AO BANHEIRO/BEBEDOURO",
        "SONOLENTO",
        "DORMINDO",
        "EXCESSO DE CONVERSA",
        "SAIU DO MAPA PARA CONVERSAR",
        "EXCESSO DE BRINCADEIRAS",
        "DESRESPEITOSO COM COLEGAS",
        "DESRESPEITOSO COM PROFESSOR",
        "FAZENDO TAREFA DE OUTRA MATÉRIA",
        "LINGUAJAR INADEQUADO",
        "USO CELULAR",
        "BRINCADEIRAS PERIGOSAS",
        "TEMPO EXCESSIVO NO BANHEIRO/BEBEDOURO",
        "ALUNO CONVIDADO A SE RETIRAR DA SALA DE AULA",
        "⚠️ ALTERAÇÃO COMPORTAMENTAL"
    ];

    const containerOpcoes = document.getElementById('rodin-options-list');
    if (containerOpcoes) {
        containerOpcoes.innerHTML = opcoes.map((op, idx) => {
            const isUltimasDuas = (idx === 13 || idx === 14);
            const isTop3 = (idx < 3);

            const ocsDoAluno = (db.ocorrencias || []).filter(o => o.aluno_id === aluno.id && (o.tipo || '').toUpperCase() === op.replace('⚠️ ', ''));
            const agora = new Date();
            const countHoje = ocsDoAluno.filter(o => new Date(o.created_at || o.data).toDateString() === agora.toDateString()).length;
            const count7d = ocsDoAluno.filter(o => (agora - new Date(o.created_at || o.data)) <= 7 * 24 * 60 * 60 * 1000).length;
            const count30d = ocsDoAluno.length;

            const tripleBadge = isTop3 ? `
                <div class="stats-badge-triple" title="Estatísticas do Aluno">
                    <div><span style="font-size:7px; opacity:0.8; display:block;">30D</span>${count30d}</div>
                    <div><span style="font-size:7px; opacity:0.8; display:block;">7D</span>${count7d}</div>
                    <div><span style="font-size:7px; opacity:0.8; display:block;">HOJE</span>${countHoje}</div>
                </div>
            ` : '';

            const warningClass = isUltimasDuas ? 'option-warning' : '';

            return `
                <div class="rodin-option-bar ${warningClass}" onclick="clicarOpcaoComportamento('${op}')">
                    <div class="option-text">
                        ${tripleBadge}
                        <span>${op}</span>
                    </div>
                    <div onclick="abrirInfoOcorrencia(event, '${op}')" style="padding:6px 10px; border-radius:8px; cursor:pointer;" title="Clique para ver informações e orientação pedagógica sobre esta ocorrência">
                        <i class="ph-bold ph-info info-icon" style="font-size:18px;"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    const modal = document.getElementById('modal-ocorrencia-rodin');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// ------------------------------------------
// GUIA E EXPLICAÇÃO DAS OCORRÊNCIAS (ÍCONE i)
// ------------------------------------------
const GUIA_OCORRENCIAS = {
    "FOI AO BANHEIRO/BEBEDOURO": {
        definicao: "Registro de saída momentânea da sala de aula autorizada pelo professor para uso do sanitário ou bebedouro.",
        orientacao: "💡 Útil para monitoramento preventivo de frequência e cálculo de tempo fora da sala de aula."
    },
    "SONOLENTO": {
        definicao: "Aluno apresenta sinais claros de sonolência, fadiga, dispersão severa ou dificuldade de manter os olhos abertos.",
        orientacao: "💡 Auxilia a equipe pedagógica a identificar distúrbios de sono, rotina doméstica ou cansaço acumulado."
    },
    "DORMINDO": {
        definicao: "Aluno adormeceu sobre a carteira durante a explicação ou realização de atividades.",
        orientacao: "⚠️ Requer intervenção cuidadosa do professor e notificação para acompanhamento do acolhimento."
    },
    "EXCESSO DE CONVERSA": {
        definicao: "Diálogos paralelos constantes que perturbam a explicação do professor e a atenção dos demais alunos.",
        orientacao: "💡 Registrar preferencialmente após orientações ou advertências verbais prévias em sala."
    },
    "SAIU DO MAPA PARA CONVERSAR": {
        definicao: "Aluno levantou-se da sua carteira designada no mapa de sala para conversar com colegas em outros pontos da sala.",
        orientacao: "🧠 Dado crucial para a análise de Inteligência Artificial sobre a eficácia da posição das carteiras."
    },
    "EXCESSO DE BRINCADEIRAS": {
        definicao: "Atividades lúdicas inadequada ao momento de aula, gerando distração coletiva e quebra de foco.",
        orientacao: "💡 Registrar quando a brincadeira persistir mesmo após aviso verbal."
    },
    "DESRESPEITOSO COM COLEGAS": {
        definicao: "Uso de apelidos pejorativos, zombarias, atitudes de exclusão, ofensas verbais ou empurrões com outros estudantes.",
        orientacao: "⚠️ Notificação de alta prioridade para mediação do setor de Acolhimento e Orientação Educacional."
    },
    "DESRESPEITOSO COM PROFESSOR": {
        definicao: "Respostas rudes, desafiadoras, ironias, desobediência direta ou postura agressiva direcionada ao docente.",
        orientacao: "🚨 Registro imediato para acompanhamento direto pela Coordenação Pedagógica."
    },
    "FAZENDO TAREFA DE OUTRA MATÉRIA": {
        definicao: "Aluno realizando trabalhos, tarefas de casa ou estudando para outras disciplinas durante o tempo desta aula.",
        orientacao: "💡 Permite orientar o estudante sobre gestão de tempo, prioridades e foco nas aulas vigentes."
    },
    "LINGUAJAR INADEQUADO": {
        definicao: "Uso de palavrões, termos chulos, linguagem obscena ou ofensiva dentro do ambiente escolar.",
        orientacao: "💡 Registro para reforço de regras de convivência, respeito e civilidade."
    },
    "USO CELULAR": {
        definicao: "Manuseio ou utilização de dispositivos eletrônicos pessoais (celular, jogos, fones) sem autorização pedagógica.",
        orientacao: "🚫 Em conformidade com o regulamento escolar de uso de tecnologia do Colégio Rodin."
    },
    "BRINCADEIRAS PERIGOSAS": {
        definicao: "Ações de risco físico, como arremessar objetos, empurrar cadeiras, correr entre carteiras ou simular lutas.",
        orientacao: "🚨 Alerta de segurança imediato."
    },
    "TEMPO EXCESSIVO NO BANHEIRO/BEBEDOURO": {
        definicao: "Permanência prolongada fora da sala (superior a 10 minutos) após autorização para ir ao banheiro/bebedouro.",
        orientacao: "⚠️ Crucial para identificar esquiva de aulas ou agrupamento no corredor."
    },
    "ALUNO CONVIDADO A SE RETIRAR DA SALA DE AULA": {
        definicao: "Ocorrência grave onde o estudante precisou ser encaminhado à Orientação Educacional devido ao comprometimento da aula.",
        orientacao: "🚨 Exige relato detalhado por escrito ou áudio do professor."
    },
    "ALTERAÇÃO COMPORTAMENTAL": {
        definicao: "Mudança brusca de humor ou comportamento (choro copioso, crise de ansiedade, isolamento atípico, apatia extrema).",
        orientacao: "🚨 Notificação urgente para a equipe de Psicologia/Acolhimento da escola."
    }
};

let motivoInfoAtual = null;

function abrirInfoOcorrencia(event, motivo) {
    if (event) event.stopPropagation();

    motivoInfoAtual = motivo;
    const chave = motivo.replace('⚠️ ', '');
    const info = GUIA_OCORRENCIAS[chave] || {
        definicao: `Definição pedagógica da ocorrência '${motivo}'.`,
        orientacao: "💡 Utilize para acompanhamento comportamental do aluno."
    };

    const aluno = estadoApp.alunoSelecionadoModal;
    const tituloEl = document.getElementById('info-oc-titulo');
    const defEl = document.getElementById('info-oc-definicao');
    const orientEl = document.getElementById('info-oc-orientacao');
    const statsEl = document.getElementById('info-oc-stats-box');

    if (tituloEl) tituloEl.innerText = motivo;
    if (defEl) defEl.innerText = info.definicao;
    if (orientEl) orientEl.innerText = info.orientacao;

    if (statsEl && aluno) {
        const ocs = (db.ocorrencias || []).filter(o => o.aluno_id === aluno.id && (o.tipo || '').toUpperCase() === chave);
        const agora = new Date();
        const hojeCount = ocs.filter(o => new Date(o.created_at || o.data).toDateString() === agora.toDateString()).length;
        const d7Count = ocs.filter(o => (agora - new Date(o.created_at || o.data)) <= 7 * 24 * 60 * 60 * 1000).length;
        const totalCount = ocs.length;

        statsEl.innerHTML = `
            <div style="background:#1E293B; border-radius:14px; padding:12px; border:1px solid #334155;">
                <span style="font-size:11px; font-weight:800; color:#94A3B8; text-transform:uppercase;">Histórico de <strong>${aluno.nome}</strong> nesta ocorrência:</span>
                <div style="display:flex; gap:12px; margin-top:8px;">
                    <div style="flex:1; background:#0F172A; padding:8px; border-radius:10px; text-align:center;">
                        <span style="font-size:10px; color:#94A3B8; display:block;">Hoje</span>
                        <strong style="font-size:16px; color:var(--rodin-orange);">${hojeCount}</strong>
                    </div>
                    <div style="flex:1; background:#0F172A; padding:8px; border-radius:10px; text-align:center;">
                        <span style="font-size:10px; color:#94A3B8; display:block;">Últimos 7 dias</span>
                        <strong style="font-size:16px; color:#FFF;">${d7Count}</strong>
                    </div>
                    <div style="flex:1; background:#0F172A; padding:8px; border-radius:10px; text-align:center;">
                        <span style="font-size:10px; color:#94A3B8; display:block;">Total Acumulado</span>
                        <strong style="font-size:16px; color:#FFF;">${totalCount}</strong>
                    </div>
                </div>
            </div>
        `;
    }

    const modal = document.getElementById('modal-info-ocorrencia');
    if (modal) modal.style.display = 'flex';
}

function fecharModalInfoOcorrencia() {
    const modal = document.getElementById('modal-info-ocorrencia');
    if (modal) modal.style.display = 'none';
}

function confirmarRegistroViaModalInfo() {
    fecharModalInfoOcorrencia();
    if (motivoInfoAtual) {
        clicarOpcaoComportamento(motivoInfoAtual);
    }
}

function fecharModalOcorrenciaRodin() {
    document.getElementById('modal-ocorrencia-rodin').style.display = 'none';
}

function clicarOpcaoComportamento(opcao) {
    if (opcao.includes("ALUNO CONVIDADO A SE RETIRAR") || opcao.includes("ALTERAÇÃO COMPORTAMENTAL")) {
        abrirModalDetalhesAudio(opcao);
    } else {
        salvarOcorrenciaDireta(opcao);
    }
}

async function salvarOcorrenciaDireta(motivo) {
    if (!estadoApp.alunoSelecionadoModal) return;

    const turmaId = estadoApp.alunoSelecionadoModal.turma_id;
    const gradeSlots = db.grade_slots || [];
    const agora = new Date();
    const diaSemanaJS = agora.getDay();
    let diaIndex = (diaSemanaJS >= 1 && diaSemanaJS <= 5) ? diaSemanaJS - 1 : 0;
    
    const hora = agora.getHours();
    const min = agora.getMinutes();
    const totalMin = hora * 60 + min;

    const horariosAulas = [
        { aulaIndex: 0, inicio: 7 * 60 + 15, fim: 8 * 60 + 5 },
        { aulaIndex: 1, inicio: 8 * 60 + 5,  fim: 8 * 60 + 55 },
        { aulaIndex: 2, inicio: 8 * 60 + 55, fim: 9 * 60 + 45 },
        { aulaIndex: 3, inicio: 10 * 60 + 15, fim: 11 * 60 + 5 },
        { aulaIndex: 4, inicio: 11 * 60 + 5, fim: 11 * 60 + 55 },
        { aulaIndex: 5, inicio: 11 * 60 + 55, fim: 12 * 60 + 45 }
    ];

    const aulaAtiva = horariosAulas.find(h => totalMin >= h.inicio && totalMin < h.fim);
    const aulaIndex = aulaAtiva ? aulaAtiva.aulaIndex : 0;
    
    const slot = gradeSlots.find(g => g.turma_id === turmaId && g.posicao_x === diaIndex && g.posicao_y === aulaIndex);
    const disciplinaId = slot ? slot.disciplina_id : null;
    const professorId = slot ? slot.professor_id : null;

    const novaOc = {
        id: `oc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        aluno_id: estadoApp.alunoSelecionadoModal.id,
        turma_id: turmaId,
        disciplina_id: disciplinaId,
        criado_por: professorId,
        tipo: motivo,
        descricao: `Registrado via painel rápido do professor.`,
        created_at: agora.toISOString(),
        status_kanban: 'novos'
    };

    db.ocorrencias.push(novaOc);
    try { localStorage.setItem('rodin_ocorrencias', JSON.stringify(db.ocorrencias)); } catch(e){}

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            Promise.resolve(sbClient.from('ocorrencias_alunos').insert([{
                id: novaOc.id,
                aluno_id: novaOc.aluno_id,
                turma_id: novaOc.turma_id,
                disciplina_id: novaOc.disciplina_id,
                criado_por: novaOc.criado_por,
                tipo: novaOc.tipo,
                descricao: novaOc.descricao,
                created_at: novaOc.created_at
            }])).catch(() => {});
        } catch(e){}
    }

    fecharModalOcorrenciaRodin();
    carregarMapaProfessor();
    mostrarSnackbar(`Ocorrência '${motivo}' registrada!`);
}

let gravacaoAudioAtiva = false;
let tempoGravacao = 0;
let intervaloGravacao = null;

function abrirModalDetalhesAudio(motivo) {
    estadoApp.motivoSelecionadoModal = motivo;
    
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-description');
    const popupTextarea = document.getElementById('popup-textarea');

    if (motivo.includes("ALTERAÇÃO COMPORTAMENTAL")) {
        popupTitle.innerText = "⚠️ Alteração Comportamental";
        popupDesc.innerText = "Por favor, relate brevemente os detalhes ou sintomas observados (ex: choro fácil, isolamento social, apatia extrema, irritabilidade atípica, tristeza, etc).";
        popupTextarea.placeholder = "Descreva o comportamento observado...";
    } else {
        popupTitle.innerText = "⚠️ Aluno Convidado a se Retirar";
        popupDesc.innerText = "Por favor, relate os motivos disciplinares ou incidentes que levaram à necessidade de retirar o aluno da sala.";
        popupTextarea.placeholder = "Descreva os incidentes ocorridos em sala...";
    }

    popupTextarea.value = '';
    resetarGravadorAudio();

    document.getElementById('modal-detalhes-audio').style.display = 'flex';
}

function fecharModalDetalhesAudio() {
    resetarGravadorAudio();
    document.getElementById('modal-detalhes-audio').style.display = 'none';
}

function resetarGravadorAudio() {
    gravacaoAudioAtiva = false;
    if (intervaloGravacao) clearInterval(intervaloGravacao);
    tempoGravacao = 0;

    const btnMic = document.getElementById('btn-mic-record');
    const statusText = document.getElementById('mic-status-text');

    if (btnMic) btnMic.classList.remove('recording');
    if (statusText) statusText.innerText = "Clique no microfone para iniciar";
}

function alternarGravacaoAudio() {
    const btnMic = document.getElementById('btn-mic-record');
    const statusText = document.getElementById('mic-status-text');

    if (!gravacaoAudioAtiva) {
        gravacaoAudioAtiva = true;
        btnMic.classList.add('recording');
        tempoGravacao = 0;
        
        intervaloGravacao = setInterval(() => {
            tempoGravacao++;
            const sec = String(tempoGravacao).padStart(2, '0');
            statusText.innerText = `Gravando relato... 00:${sec}`;
        }, 1000);
    } else {
        gravacaoAudioAtiva = false;
        clearInterval(intervaloGravacao);
        btnMic.classList.remove('recording');
        statusText.innerText = `Áudio gravado com sucesso (00:${String(tempoGravacao).padStart(2, '0')}) · Clique para regravar`;
    }
}

async function confirmarRegistroDetalhadoAudio() {
    if (!estadoApp.alunoSelecionadoModal || !estadoApp.motivoSelecionadoModal) return;

    const relatoTexto = document.getElementById('popup-textarea').value;
    const turmaId = estadoApp.alunoSelecionadoModal.turma_id;
    
    const gradeSlots = db.grade_slots || [];
    const agora = new Date();
    const diaSemanaJS = agora.getDay();
    let diaIndex = (diaSemanaJS >= 1 && diaSemanaJS <= 5) ? diaSemanaJS - 1 : 0;
    
    const hora = agora.getHours();
    const min = agora.getMinutes();
    const totalMin = hora * 60 + min;

    const horariosAulas = [
        { aulaIndex: 0, inicio: 7 * 60 + 15, fim: 8 * 60 + 5 },
        { aulaIndex: 1, inicio: 8 * 60 + 5,  fim: 8 * 60 + 55 },
        { aulaIndex: 2, inicio: 8 * 60 + 55, fim: 9 * 60 + 45 },
        { aulaIndex: 3, inicio: 10 * 60 + 15, fim: 11 * 60 + 5 },
        { aulaIndex: 4, inicio: 11 * 60 + 5, fim: 11 * 60 + 55 },
        { aulaIndex: 5, inicio: 11 * 60 + 55, fim: 12 * 60 + 45 }
    ];

    const aulaAtiva = horariosAulas.find(h => totalMin >= h.inicio && totalMin < h.fim);
    const aulaIndex = aulaAtiva ? aulaAtiva.aulaIndex : 0;
    
    const slot = gradeSlots.find(g => g.turma_id === turmaId && g.posicao_x === diaIndex && g.posicao_y === aulaIndex);
    const disciplinaId = slot ? slot.disciplina_id : null;
    const professorId = slot ? slot.professor_id : null;

    const novaOc = {
        id: `oc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        aluno_id: estadoApp.alunoSelecionadoModal.id,
        turma_id: turmaId,
        disciplina_id: disciplinaId,
        criado_por: professorId,
        tipo: estadoApp.motivoSelecionadoModal.replace('⚠️ ', ''),
        descricao: relatoTexto || `Relato gravado via áudio / observação em sala.`,
        audio_url: tempoGravacao > 0 ? `mock_audio_rec_${Date.now()}.webm` : null,
        created_at: agora.toISOString(),
        status_kanban: 'novos'
    };

    db.ocorrencias.push(novaOc);
    try { localStorage.setItem('rodin_ocorrencias', JSON.stringify(db.ocorrencias)); } catch(e){}

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            Promise.resolve(sbClient.from('ocorrencias_alunos').insert([{
                id: novaOc.id,
                aluno_id: novaOc.aluno_id,
                turma_id: novaOc.turma_id,
                disciplina_id: novaOc.disciplina_id,
                criado_por: novaOc.criado_por,
                tipo: novaOc.tipo,
                descricao: novaOc.descricao,
                audio_url: novaOc.audio_url,
                created_at: novaOc.created_at
            }])).catch(() => {});
        } catch(e){}
    }

    fecharModalDetalhesAudio();
    fecharModalOcorrenciaRodin();
    carregarMapaProfessor();
    mostrarSnackbar(`Registro '${novaOc.tipo}' salvo com sucesso!`);
}

function confirmarResetDados() {
    if (confirm("Esta ação irá limpar os dados em cache local. Deseja continuar?")) {
        localStorage.clear();
        location.reload();
    }
}

function fecharModalConfirmacao() {
    document.getElementById('modal-confirmacao').style.display = 'none';
}

function iniciarRelogio() {
    setInterval(() => {
        const agora = new Date();
        const str = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const el = document.getElementById('relogio-prof-dark');
        if (el) el.innerText = str;
    }, 1000);
}

// ==========================================
// 6. SETUP DE TURMA (MAPA DE SALA E GRADE HORÁRIA DRAG-AND-DROP)
// ==========================================
let estadoSetup = {
    turmaId: 't1',
    abaAtiva: 'mapa',
    draggedAlunoId: null,
    draggedSubjectData: null
};

function alternarSubAbaSetup(aba) {
    estadoSetup.abaAtiva = aba;
    
    const btnMapa = document.getElementById('btn-setup-tab-mapa');
    const btnGrade = document.getElementById('btn-setup-tab-grade');
    const viewMapa = document.getElementById('setup-subview-mapa');
    const viewGrade = document.getElementById('setup-subview-grade');

    if (aba === 'mapa') {
        if (btnMapa) btnMapa.classList.add('active');
        if (btnGrade) btnGrade.classList.remove('active');
        if (viewMapa) viewMapa.style.display = 'block';
        if (viewGrade) viewGrade.style.display = 'none';
    } else {
        if (btnGrade) btnGrade.classList.add('active');
        if (btnMapa) btnMapa.classList.remove('active');
        if (viewGrade) viewGrade.style.display = 'block';
        if (viewMapa) viewMapa.style.display = 'none';
    }
}

function renderizarComponentesSetupTurma() {
    const selTurma = document.getElementById('setup-turma-select');
    if (selTurma && selTurma.children.length === 0) {
        selTurma.innerHTML = db.turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    }
    
    if (selTurma) {
        estadoSetup.turmaId = selTurma.value || db.turmas[0]?.id || 't1';
    }

    renderizarPaletteAlunosSetup();
    renderizarGridCarteirasSetup();
    renderizarPaletteDisciplinasSetup();
    renderizarGradeHorariaSetup();
}

function carregarSetupTurma() {
    try {
        const sMapa = localStorage.getItem('rodin_mapa_slots');
        if (sMapa && db.mapa_slots.length === 0) db.mapa_slots = JSON.parse(sMapa);
    } catch(e){}

    try {
        const sGrade = localStorage.getItem('rodin_grade_slots');
        if (sGrade && db.grade_slots.length === 0) db.grade_slots = JSON.parse(sGrade);
    } catch(e){}

    try {
        const sHist = localStorage.getItem('rodin_historico_mapa_sala');
        if (sHist) db.historico_mapa_sala = JSON.parse(sHist);
    } catch(e){}

    renderizarComponentesSetupTurma();

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;

    if (sbClient && typeof sbClient.from === 'function') {
        Promise.all([
            sbClient.from('turmas').select('*'),
            sbClient.from('alunos').select('*'),
            sbClient.from('professores').select('*'),
            sbClient.from('disciplinas').select('*'),
            sbClient.from('professores_turmas_disciplinas').select('*'),
            sbClient.from('mapa_sala_slots').select('*'),
            sbClient.from('grade_horaria_slots').select('*')
        ]).then(([resTurmas, resAlunos, resProfs, resDisc, resPtd, resMapaSlots, resGradeSlots]) => {
            let alterou = false;

            if (resTurmas.data && resTurmas.data.length > 0) {
                db.turmas = window.ordenarTurmas ? window.ordenarTurmas(resTurmas.data) : resTurmas.data;
                window.safeSetLocalStorage('rodin_turmas', db.turmas);
                alterou = true;
            }
            if (resAlunos.data && resAlunos.data.length > 0) {
                db.alunos = resAlunos.data;
                window.safeSetLocalStorage('rodin_alunos', db.alunos);
                alterou = true;
            }
            if (resProfs.data && resProfs.data.length > 0) {
                db.professores = resProfs.data;
                if (window.FaceSecurity && typeof window.FaceSecurity.restaurarBiometriasLocais === 'function') {
                    window.FaceSecurity.restaurarBiometriasLocais();
                }
                window.safeSetLocalStorage('rodin_professores', db.professores);
                alterou = true;
            }
            if (resDisc.data && resDisc.data.length > 0) {
                db.disciplinas = resDisc.data;
                window.safeSetLocalStorage('rodin_disciplinas', db.disciplinas);
                alterou = true;
            }
            if (resPtd.data && resPtd.data.length > 0) {
                db.ptd = resPtd.data;
                window.safeSetLocalStorage('rodin_ptd', db.ptd);
                alterou = true;
            }
            if (resMapaSlots.data && resMapaSlots.data.length > 0) {
                db.mapa_slots = resMapaSlots.data;
                window.safeSetLocalStorage('rodin_mapa_slots', db.mapa_slots);
                alterou = true;
            }
            if (resGradeSlots.data && resGradeSlots.data.length > 0) {
                db.grade_slots = resGradeSlots.data;
                window.safeSetLocalStorage('rodin_grade_slots', db.grade_slots);
                alterou = true;
            }

            if (alterou) {
                renderizarComponentesSetupTurma();
            }
        }).catch(err => {
            console.warn("Aviso ao carregar dados de Setup do Supabase:", err);
        });
    }
}

function consultarHistoricoPosicaoAluno(alunoId, dataConsulta) {
    const dataAlvo = dataConsulta ? new Date(dataConsulta) : new Date();
    const historicosAluno = (db.historico_mapa_sala || []).filter(h => h.aluno_id === alunoId);

    if (historicosAluno.length === 0) return null;

    const slotHistorico = historicosAluno.find(h => {
        const inicio = new Date(h.data_inicio);
        const fim = h.data_fim ? new Date(h.data_fim) : new Date(8640000000000000);
        return dataAlvo >= inicio && dataAlvo <= fim;
    }) || historicosAluno[historicosAluno.length - 1];

    if (!slotHistorico) return null;

    const turma = (db.turmas || []).find(t => t.id === slotHistorico.turma_id);
    const totalLinhas = (turma && turma.config_mapa && turma.config_mapa.linhas) || 5;
    const totalCols = (turma && turma.config_mapa && turma.config_mapa.colunas) || 6;

    let zonaFila = 'Meio da Sala';
    if (slotHistorico.posicao_y === 0) zonaFila = '1ª Fileira (Frente / Lousa)';
    else if (slotHistorico.posicao_y === totalLinhas - 1) zonaFila = 'Última Fileira (Fundo)';

    let zonaColuna = 'Centro';
    if (slotHistorico.posicao_x === 0) zonaColuna = 'Canto Esquerdo (Porta)';
    else if (slotHistorico.posicao_x === totalCols - 1) zonaColuna = 'Canto Direito (Janela)';

    return {
        ...slotHistorico,
        zona_resumida: `${zonaFila} - ${zonaColuna}`,
        fileira_vertical: slotHistorico.posicao_x + 1,
        fileira_horizontal: slotHistorico.posicao_y + 1
    };
}
window.consultarHistoricoPosicaoAluno = consultarHistoricoPosicaoAluno;

async function salvarLayoutSetup() {
    window.safeSetLocalStorage('rodin_turmas', db.turmas);
    window.safeSetLocalStorage('rodin_mapa_slots', db.mapa_slots);
    window.safeSetLocalStorage('rodin_grade_slots', db.grade_slots);

    // Gerar Registros Históricos (Snapshots de Posicionamento para IA)
    if (!db.historico_mapa_sala) db.historico_mapa_sala = [];
    const agoraISO = new Date().toISOString();
    const slotsAlocados = db.mapa_slots.filter(s => s.turma_id === estadoSetup.turmaId && s.aluno_id);

    // Desativar vigência dos snapshots anteriores da mesma turma
    db.historico_mapa_sala.forEach(h => {
        if (h.turma_id === estadoSetup.turmaId && h.ativo) {
            h.ativo = false;
            h.data_fim = agoraISO;
        }
    });

    // Registrar novos snapshots para os alunos posicionados
    slotsAlocados.forEach(s => {
        db.historico_mapa_sala.push({
            id: `hist_${s.turma_id}_${s.aluno_id}_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,
            turma_id: s.turma_id,
            aluno_id: s.aluno_id,
            posicao_x: parseInt(s.posicao_x) || 0,
            posicao_y: parseInt(s.posicao_y) || 0,
            data_inicio: agoraISO,
            data_fim: null,
            ativo: true
        });
    });
    window.safeSetLocalStorage('rodin_historico_mapa_sala', db.historico_mapa_sala);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;

    if (sbClient && typeof sbClient.from === 'function') {
        try {
            // 1. Persistir dimensões de linhas e colunas (config_mapa) da turma no Supabase
            const turmaAtual = db.turmas.find(t => t.id === estadoSetup.turmaId);
            if (turmaAtual && turmaAtual.config_mapa) {
                const { error: errTurma } = await sbClient.from('turmas').upsert({
                    id: turmaAtual.id,
                    nome: turmaAtual.nome,
                    etapa: turmaAtual.etapa || 'Ensino Fundamental Anos Finais',
                    slug: turmaAtual.slug || '6o-ano-a',
                    config_mapa: turmaAtual.config_mapa
                });
                if (errTurma) console.warn("Erro ao salvar config_mapa da turma no Supabase:", errTurma);
                else console.log("✓ Config_mapa da turma salvo no Supabase:", turmaAtual.config_mapa);
            }

            // 2. Persistir slots do mapa de sala no Supabase
            const slotsTurma = db.mapa_slots.filter(s => s.turma_id === estadoSetup.turmaId);
            if (slotsTurma.length > 0) {
                const slotsLimpos = slotsTurma.map(s => ({
                    id: s.id || `m_slot_${s.turma_id}_${s.posicao_x}_${s.posicao_y}`,
                    turma_id: s.turma_id,
                    aluno_id: s.aluno_id || null,
                    posicao_x: parseInt(s.posicao_x) || 0,
                    posicao_y: parseInt(s.posicao_y) || 0
                }));

                const { error: errMapa } = await sbClient.from('mapa_sala_slots').upsert(slotsLimpos);
                if (errMapa) console.warn("Erro ao salvar mapa_sala_slots no Supabase:", errMapa);
            }

            // 3. Persistir registros de histórico no Supabase se a tabela existir
            try {
                const { error: errHist } = await sbClient.from('historico_mapa_sala').upsert(db.historico_mapa_sala);
                if (errHist) console.warn("Aviso historico_mapa_sala (armazenado localmente):", errHist.message);
                else console.log("✓ Historico de mapa salvo no Supabase!");
            } catch(e) {}

            // 4. Persistir grade horária no Supabase
            const gradeTurma = db.grade_slots.filter(s => s.turma_id === estadoSetup.turmaId);
            if (gradeTurma.length > 0) {
                const gradeLimpa = gradeTurma.map(g => ({
                    id: g.id || `g_slot_${g.turma_id}_${g.posicao_x}_${g.posicao_y}`,
                    turma_id: g.turma_id,
                    disciplina_id: g.disciplina_id || null,
                    professor_id: g.professor_id || null,
                    posicao_x: parseInt(g.posicao_x) || 0,
                    posicao_y: parseInt(g.posicao_y) || 0
                }));

                const { error: errGrade } = await sbClient.from('grade_horaria_slots').upsert(gradeLimpa);
                if (errGrade) console.warn("Erro ao salvar grade_horaria_slots no Supabase:", errGrade);
            }
        } catch(err) {
            console.warn("Erro ao salvar layout no Supabase:", err);
        }
    }

    const cfg = (db.turmas.find(t => t.id === estadoSetup.turmaId)?.config_mapa) || { linhas: 5, colunas: 6 };
    mostrarSnackbar(`✓ Layout de sala (${cfg.colunas} colunas x ${cfg.linhas} linhas), histórico e grade salvos com sucesso!`);
}

// ------------------------------------------
// PAINEL 1: MAPA DE SALA (CARTEIRAS)
// ------------------------------------------
function renderizarPaletteAlunosSetup() {
    const palette = document.getElementById('setup-palette-alunos');
    if (!palette) return;

    const searchTerm = (document.getElementById('setup-aluno-search')?.value || '').toLowerCase();
    const alunosTurma = db.alunos.filter(a => a.turma_id === estadoSetup.turmaId);
    const slotsOcupados = db.mapa_slots.filter(s => s.turma_id === estadoSetup.turmaId && s.aluno_id);

    const alocadosCount = slotsOcupados.length;
    const countEl = document.getElementById('setup-alocado-count');
    if (countEl) countEl.innerText = `${alocadosCount}/${alunosTurma.length}`;

    const alunosFiltrados = alunosTurma.filter(a => a.nome.toLowerCase().includes(searchTerm));

    palette.innerHTML = alunosFiltrados.map(a => {
        const isAlocado = slotsOcupados.some(s => s.aluno_id === a.id);
        return `
            <div class="draggable-student-chip ${isAlocado ? 'alocado' : ''}" 
                 draggable="true" 
                 ondragstart="handleAlunoDragStart(event, '${a.id}')"
                 title="${isAlocado ? 'Aluno alocado na sala' : 'Arraste para uma carteira'}">
                <img src="${a.avatar}" alt="${a.nome}">
                <span class="student-chip-name">${a.nome}</span>
                ${isAlocado ? `<span style="font-size:10px; color:#475569; font-weight:700;">✓ Alocado</span>` : `<i class="ph-bold ph-hand-grab" style="color:var(--rodin-orange);"></i>`}
            </div>
        `;
    }).join('');
}

function filtrarAlunosSetup() {
    renderizarPaletteAlunosSetup();
}

function alterarLinhasCarteira(delta) {
    const turma = db.turmas.find(t => t.id === estadoSetup.turmaId);
    if (!turma) return;
    if (!turma.config_mapa) turma.config_mapa = { linhas: 5, colunas: 6 };

    const novasLinhas = Math.max(1, Math.min(12, (turma.config_mapa.linhas || 5) + delta));
    turma.config_mapa.linhas = novasLinhas;
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    renderizarGridCarteirasSetup();
}

function alterarColunasCarteira(delta) {
    const turma = db.turmas.find(t => t.id === estadoSetup.turmaId);
    if (!turma) return;
    if (!turma.config_mapa) turma.config_mapa = { linhas: 5, colunas: 6 };

    const novasColunas = Math.max(1, Math.min(12, (turma.config_mapa.colunas || 6) + delta));
    turma.config_mapa.colunas = novasColunas;
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    renderizarGridCarteirasSetup();
}

function renderizarGridCarteirasSetup() {
    const gridContainer = document.getElementById('setup-grid-carteiras');
    if (!gridContainer) return;

    const turma = db.turmas.find(t => t.id === estadoSetup.turmaId);
    if (!turma) return;
    if (!turma.config_mapa) turma.config_mapa = { linhas: 5, colunas: 6 };

    const rows = turma.config_mapa.linhas || 5;
    const cols = turma.config_mapa.colunas || 6;

    const rowsCountEl = document.getElementById('setup-rows-count');
    const colsCountEl = document.getElementById('setup-cols-count');
    if (rowsCountEl) rowsCountEl.innerText = rows;
    if (colsCountEl) colsCountEl.innerText = cols;

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    let html = '';
    let numberDesk = 1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const slot = db.mapa_slots.find(s => s.turma_id === estadoSetup.turmaId && s.posicao_x === c && s.posicao_y === r);
            const aluno = slot ? db.alunos.find(a => a.id === slot.aluno_id) : null;

            html += `
                <div class="desk-dropzone" 
                     ondragover="handleCarteiraDragOver(event)" 
                     ondragleave="handleCarteiraDragLeave(event)" 
                     ondrop="handleCarteiraDrop(event, ${c}, ${r})">
                    <span class="desk-number-badge">${numberDesk++}</span>
                    ${aluno ? `
                        <div class="desk-occupant" draggable="true" ondragstart="handleAlunoDragStart(event, '${aluno.id}')">
                            <img src="${aluno.avatar}" alt="${aluno.nome}">
                            <span class="occupant-name">${aluno.nome}</span>
                        </div>
                        <button class="desk-remove-btn" onclick="removerAlunoCarteira('${aluno.id}')" title="Remover da carteira">&times;</button>
                    ` : `
                        <span style="font-size:11px; color:#CBD5E1; font-weight:700;">Vazia</span>
                    `}
                </div>
            `;
        }
    }

    gridContainer.innerHTML = html;
}

function handleAlunoDragStart(e, alunoId) {
    estadoSetup.draggedAlunoId = alunoId;
    e.dataTransfer.setData('text/plain', alunoId);
    e.dataTransfer.effectAllowed = 'move';
}

function handleCarteiraDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
}

function handleCarteiraDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleCarteiraDrop(e, posX, posY) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const alunoId = estadoSetup.draggedAlunoId || e.dataTransfer.getData('text/plain');
    if (!alunoId) return;

    // Verificar se já existe um slot nesta posição
    const slotExistente = db.mapa_slots.find(s => s.turma_id === estadoSetup.turmaId && s.posicao_x === posX && s.posicao_y === posY);
    const slotAntigoAluno = db.mapa_slots.find(s => s.turma_id === estadoSetup.turmaId && s.aluno_id === alunoId);

    // Troca de posição de dois alunos caso o destino já esteja ocupado
    if (slotExistente && slotExistente.aluno_id && slotAntigoAluno) {
        const alunoDestinoId = slotExistente.aluno_id;
        slotExistente.aluno_id = alunoId;
        slotAntigoAluno.aluno_id = alunoDestinoId;
    } else if (slotExistente) {
        if (slotAntigoAluno) slotAntigoAluno.aluno_id = null;
        slotExistente.aluno_id = alunoId;
    } else {
        if (slotAntigoAluno) slotAntigoAluno.aluno_id = null;
        db.mapa_slots.push({
            id: `m_slot_${Date.now()}`,
            turma_id: estadoSetup.turmaId,
            aluno_id: alunoId,
            posicao_x: posX,
            posicao_y: posY
        });
    }

    estadoSetup.draggedAlunoId = null;
    renderizarPaletteAlunosSetup();
    renderizarGridCarteirasSetup();
}

function removerAlunoCarteira(alunoId) {
    const slot = db.mapa_slots.find(s => s.turma_id === estadoSetup.turmaId && s.aluno_id === alunoId);
    if (slot) {
        slot.aluno_id = null;
    }
    renderizarPaletteAlunosSetup();
    renderizarGridCarteirasSetup();
}

function limparMapaSetup() {
    db.mapa_slots = db.mapa_slots.filter(s => s.turma_id !== estadoSetup.turmaId);
    renderizarPaletteAlunosSetup();
    renderizarGridCarteirasSetup();
}

function obterEstiloDisciplina(nome) {
    const mapa = {
        'Matemática': { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF', badge: '#3B82F6' },
        'Língua Portuguesa': { bg: '#FFF7ED', border: '#FFEDD5', text: '#C2410C', badge: '#F45206' },
        'História': { bg: '#F5F3FF', border: '#DDD6FE', text: '#6D28D9', badge: '#8B5CF6' },
        'Geografia': { bg: '#ECFDF5', border: '#A7F3D0', text: '#047857', badge: '#10B981' },
        'Ciências': { bg: '#ECFEFF', border: '#A5F3FC', text: '#0E7490', badge: '#06B6D4' },
        'Física': { bg: '#FFFBEB', border: '#FDE68A', text: '#B45309', badge: '#F59E0B' },
        'Química': { bg: '#FFF1F2', border: '#FECDD3', text: '#BE123C', badge: '#E11D48' },
        'Inglês': { bg: '#EEF2FF', border: '#C7D2FE', text: '#4338CA', badge: '#6366F1' }
    };
    return mapa[nome] || { bg: '#F8FAFC', border: '#CBD5E1', text: '#334155', badge: '#64748B' };
}

function abreviarNomeDisciplina(nome) {
    if (!nome) return '';
    const n = String(nome).trim();

    const mapaAbrevs = {
        'Língua Portuguesa - Leitura e Gramática': 'Leit. e Gramática',
        'Língua Portuguesa - Redação': 'Redação',
        'Língua Portuguesa': 'Língua Portuguesa',
        'Ciência e Tecnologia Aplicadas ao Cotidiano': 'Ciê. Aplicada',
        'Ciência e Tecnologia': 'Ciê. Aplicada',
        'Ciências Físicas e Biológicas': 'Ciências',
        'Língua Inglesa - Programa Bilíngue': 'Inglês',
        'Laboratório de Inteligência Emocional': 'Lab. Intel. Emocional',
        'Atualidades / Século XXI': 'Atualidades',
        'Projeto de Vida (PD)': 'PD',
        'Projeto de Vida': 'PD',
        'Educação Física': 'Ed. Física'
    };

    return mapaAbrevs[n] || n;
}
window.abreviarNomeDisciplina = abreviarNomeDisciplina;

function renderizarPaletteDisciplinasSetup() {
    const palette = document.getElementById('setup-palette-disciplinas');
    if (!palette) return;

    const listDisciplinas = (db.disciplinas && db.disciplinas.length > 0) ? db.disciplinas : [
        { id: 'disc_mat', nome: 'Matemática' },
        { id: 'disc_port', nome: 'Língua Portuguesa - Leitura e Gramática' },
        { id: 'disc_hist', nome: 'História' },
        { id: 'disc_geo', nome: 'Geografia' },
        { id: 'disc_cfb', nome: 'Ciências Físicas e Biológicas' }
    ];

    palette.innerHTML = listDisciplinas.map(d => {
        // Buscar vínculo na tabela relacional PTD
        const ptdMatch = (db.ptd || []).find(p => p.disciplina_id === d.id && (p.turma_id === estadoSetup.turmaId || !p.turma_id)) ||
                         (db.ptd || []).find(p => p.disciplina_id === d.id);
        
        let prof = null;
        if (ptdMatch) {
            prof = (db.professores || []).find(pr => pr.id === ptdMatch.professor_id);
        }
        if (!prof) {
            prof = (db.professores || []).find(pr => pr.disciplina && pr.disciplina.toLowerCase().includes(d.nome.toLowerCase())) || (db.professores || [])[0];
        }

        const nomeProf = prof ? prof.nome : 'Docente Alocado';
        const profId = prof ? prof.id : '';
        const nomeExibicao = abreviarNomeDisciplina(d.nome);

        return `
            <div class="draggable-subject-card" 
                 style="background:#FFF; border:1px solid #E2E8F0; border-left:4px solid var(--rodin-orange); padding:10px 12px; border-radius:12px; margin-bottom:8px; cursor:grab; box-shadow:0 2px 6px rgba(0,0,0,0.02); transition:all 0.2s ease;"
                 draggable="true" 
                 ondragstart="handleDisciplinaDragStart(event, '${d.id}', '${profId}')">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-size:12px; color:var(--rodin-graphite); font-weight:800; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${d.nome}">${nomeExibicao}</strong>
                    <i class="ph-bold ph-dots-six-vertical" style="color:var(--rodin-orange); font-size:16px; flex-shrink:0;" title="Arraste para a grade"></i>
                </div>
                <div style="font-size:10px; color:var(--rodin-cool-gray); font-weight:600; margin-top:2px; display:flex; align-items:center; gap:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    <i class="ph ph-user" style="color:var(--rodin-orange);"></i> ${nomeProf}
                </div>
            </div>
        `;
    }).join('');
}

function renderizarGradeHorariaSetup() {
    const tbody = document.getElementById('setup-timetable-body');
    if (!tbody) return;

    // Horários oficiais do Ensino Fundamental (Colégio Rodin) - Apenas o intervalo
    const horarios = [
        "07:15 - 08:05",
        "08:05 - 08:55",
        "08:55 - 09:45",
        "10:15 - 11:05",
        "11:05 - 11:55",
        "11:55 - 12:45"
    ];

    let html = '';

    for (let aula = 0; aula < 6; aula++) {
        html += `<tr>`;
        html += `<td style="font-weight:800; font-size:12px; color:var(--rodin-graphite); text-align:center; background:#F8FAFC; border-radius:12px; border:1px solid #CBD5E1; height:56px; padding:0 12px; white-space:nowrap; vertical-align:middle;">${horarios[aula]}</td>`;

        for (let dia = 0; dia < 5; dia++) {
            const slot = (db.grade_slots || []).find(g => g.turma_id === estadoSetup.turmaId && g.posicao_x === dia && g.posicao_y === aula);
            const disc = slot ? (db.disciplinas || []).find(d => d.id === slot.disciplina_id) : null;
            const prof = slot ? (db.professores || []).find(p => p.id === slot.professor_id) : null;
            const nomeExibicao = disc ? abreviarNomeDisciplina(disc.nome) : '';

            html += `
                <td class="timetable-slot-cell" 
                    ondragover="handleSlotDragOver(event)" 
                    ondragleave="handleSlotDragLeave(event)" 
                    ondrop="handleSlotDrop(event, ${dia}, ${aula})"
                    style="padding:4px; vertical-align:middle;">
                    ${disc ? `
                        <div class="timetable-slot-content" style="height:56px; background:#FFF; border:1px solid #CBD5E1; border-left:4px solid var(--rodin-orange); padding:6px 10px; border-radius:12px; position:relative; box-shadow:0 2px 6px rgba(0,0,0,0.03); display:flex; flex-direction:column; justify-content:center;">
                            <div style="font-size:12px; font-weight:800; color:var(--rodin-graphite); padding-right:16px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${disc.nome}">
                                ${nomeExibicao}
                            </div>
                            <div style="font-size:10px; color:var(--rodin-cool-gray); font-weight:600; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                ${prof ? prof.nome : ''}
                            </div>
                            <button onclick="limparSlotGrade(${dia}, ${aula})" title="Remover aula" style="position:absolute; top:6px; right:6px; background:#FEE2E2; border:none; color:#991B1B; width:18px; height:18px; border-radius:50%; font-size:11px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1;">&times;</button>
                        </div>
                    ` : `
                        <div style="height:56px; border:1px dashed #CBD5E1; border-radius:12px; display:flex; align-items:center; justify-content:center; background:#F8FAFC;">
                            <span style="font-size:11px; color:#94A3B8; font-weight:700;">Vazio</span>
                        </div>
                    `}
                </td>
            `;
        }
        html += `</tr>`;
    }

    tbody.innerHTML = html;
}

function handleDisciplinaDragStart(e, discId, profId) {
    const payload = `${discId}|${profId}`;
    estadoSetup.draggedSubjectData = payload;
    e.dataTransfer.setData('text/plain', payload);
    e.dataTransfer.effectAllowed = 'move';
}

function handleSlotDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
}

function handleSlotDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleSlotDrop(e, dia, aula) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const rawData = estadoSetup.draggedSubjectData || e.dataTransfer.getData('text/plain');
    if (!rawData) return;

    const [discId, profId] = rawData.split('|');
    const professorFinal = profId || db.professores[0]?.id || 'p1';

    let slot = db.grade_slots.find(g => g.turma_id === estadoSetup.turmaId && g.posicao_x === dia && g.posicao_y === aula);

    if (slot) {
        slot.disciplina_id = discId;
        slot.professor_id = professorFinal;
    } else {
        db.grade_slots.push({
            id: `g_slot_${estadoSetup.turmaId}_${dia}_${aula}`,
            turma_id: estadoSetup.turmaId,
            professor_id: professorFinal,
            disciplina_id: discId,
            posicao_x: dia,
            posicao_y: aula
        });
    }

    estadoSetup.draggedSubjectData = null;
    renderizarGradeHorariaSetup();
}

function limparSlotGrade(dia, aula) {
    db.grade_slots = db.grade_slots.filter(g => !(g.turma_id === estadoSetup.turmaId && g.posicao_x === dia && g.posicao_y === aula));
    renderizarGradeHorariaSetup();
}

function limparGradeSetup() {
    db.grade_slots = db.grade_slots.filter(g => g.turma_id !== estadoSetup.turmaId);
    renderizarGradeHorariaSetup();
}

function gerarGradeAutomatica() {
    limparGradeSetup();
    const discs = db.disciplinas;
    if (discs.length === 0) return;

    for (let dia = 0; dia < 5; dia++) {
        for (let aula = 0; aula < 6; aula++) {
            const discIndex = (dia + aula) % discs.length;
            const disc = discs[discIndex];
            const prof = db.professores[discIndex % db.professores.length];

            db.grade_slots.push({
                id: `g_slot_${estadoSetup.turmaId}_${dia}_${aula}`,
                turma_id: estadoSetup.turmaId,
                professor_id: prof ? prof.id : 'p1',
                disciplina_id: disc.id,
                posicao_x: dia,
                posicao_y: aula
            });
        }
    }

    renderizarGradeHorariaSetup();
    mostrarSnackbar("Grade Semanal gerada automaticamente com sucesso!");
}

async function salvarSetupTurma() {
    await salvarLayoutSetup();
}

function renderizarInterface() {
    atualizarBiGeral();
}

function mostrarSnackbar(msg) {
    const snack = document.createElement('div');
    snack.style.position = 'fixed';
    snack.style.bottom = '20px';
    snack.style.left = '50%';
    snack.style.transform = 'translateX(-50%)';
    snack.style.background = 'var(--rodin-graphite)';
    snack.style.color = '#FFF';
    snack.style.padding = '10px 20px';
    snack.style.borderRadius = '999px';
    snack.style.fontSize = '12px';
    snack.style.fontWeight = '700';
    snack.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    snack.style.zIndex = '100000';
    snack.innerText = msg;

    document.body.appendChild(snack);
    setTimeout(() => snack.remove(), 3000);
}

// ============================================================================
// INTEGRAÇÃO DE SEGURANÇA FACIAL E AUTO-LOCK DE 30 SEGUNDOS (CENÁRIOS 1, 2 E 3)
// ============================================================================
window.isVisaoProfessorBloqueada = true;
window.profIdCadastroFacial = null;

// CENÁRIO 1: Cadastro de Biometria Facial do Professor
async function abrirModalCadastroFacial(profId) {
    window.profIdCadastroFacial = profId;
    const modal = document.getElementById('modal-cadastro-facial');
    if (modal) modal.style.display = 'flex';
    
    await FaceSecurity.initModels();
    const video = document.getElementById('video-cad-facial');
    const pInst = document.getElementById('cad-facial-instruction');
    if (pInst) pInst.innerHTML = "Posicione o rosto do professor no centro da câmera para registrar a biometria multi-ângulo.";
    
    const camOk = await FaceSecurity.startCamera(video);
    if (!camOk && pInst) {
        pInst.innerHTML = `<span style="color:#F87171; font-weight:800;">⚠️ Falha ao acessar a câmera. Verifique as permissões de acesso ou se a webcam está sendo usada por outro app.</span>`;
    }
}

function fecharModalCadastroFacial() {
    const modal = document.getElementById('modal-cadastro-facial');
    if (modal) modal.style.display = 'none';
    const video = document.getElementById('video-cad-facial');
    FaceSecurity.stopCamera(video);
    window.profIdCadastroFacial = null;
}

async function processarCadastroFacialProfessor() {
    if (!window.profIdCadastroFacial) return;
    const prof = db.professores.find(p => p.id === window.profIdCadastroFacial);
    if (!prof) return;

    const video = document.getElementById('video-cad-facial');
    const pInst = document.getElementById('cad-facial-instruction');

    mostrarSnackbar("📷 Iniciando Captura Biométrica Multi-Ângulo...");

    const onStepChange = (curr, total, label) => {
        if (pInst) {
            pInst.innerHTML = `<strong style="color:var(--rodin-orange); font-size:13px;">${label}</strong>`;
        }
        mostrarSnackbar(label);
    };

    const res = await FaceSecurity.capturarBiometriaMultiAngulo(video, onStepChange);
    if (res && res.descriptors && res.descriptors.length > 0) {
        prof.facial_descriptors = res.descriptors;
        prof.facial_descriptor = res.descriptors[0];
        prof.foto_biometrica = res.fotos.frente || res.fotos.direita || null;
        prof.biometria_facial_status = true;

        window.safeSetLocalStorage('rodin_professores', db.professores);

        if (window.sb && typeof window.sb.from === 'function') {
            try {
                const { error } = await window.sb.from('professores').update({
                    biometria_facial_status: true,
                    foto_biometrica: prof.foto_biometrica
                }).eq('id', prof.id);

                if (error) {
                    console.warn("⚠️ Falha ao salvar a foto no Supabase (coluna 'foto_biometrica' pode estar ausente). Tentando salvar apenas o status...", error);
                    await window.sb.from('professores').update({
                        biometria_facial_status: true
                    }).eq('id', prof.id);
                }
            } catch(e) {
                console.warn("Erro ao atualizar biometria no Supabase:", e);
            }
        }

        fecharModalCadastroFacial();
        renderizarListaProfessoresCadastrados();
        mostrarSnackbar(`✓ Biometria e foto do Prof. '${prof.nome}' gravadas e aprovadas com sucesso!`);
    } else {
        mostrarSnackbar("⚠️ Não foi possível capturar o rosto com clareza. Tente novamente.");
    }
}

// CENÁRIO 2: Pop-up de Desbloqueio Biométrico com Prova de Vida
async function abrirModalScanFacialLogin() {
    window.isRetrySession = false;
    const modal = document.getElementById('modal-login-facial');
    if (modal) modal.style.display = 'flex';

    const statusBox = document.getElementById('face-liveness-status');
    const frame = document.getElementById('apple-faceid-frame');
    const icon = document.getElementById('apple-icon-symbol');

    if (frame) {
        frame.classList.remove('scanning', 'success');
    }
    if (icon) {
        icon.className = "ph-bold ph-smiley-wink";
    }

    if (statusBox) {
        statusBox.innerText = "Verificando biometria facial...";
        statusBox.style.color = "#94A3B8";
    }

    await FaceSecurity.initModels();
    const video = document.getElementById('video-login-facial');
    if (video) {
        const camOk = await FaceSecurity.startCamera(video);
        if (!camOk && statusBox) {
            statusBox.innerHTML = `<span style="color:#F87171; font-weight:700;">⚠️ Câmera bloqueada ou indisponível.</span>`;
            return;
        }
    }

    // Iniciar escaneamento 100% automático instantâneo estilo Apple Face ID
    setTimeout(() => {
        executarScanFacialDesbloqueio();
    }, 150);
}

function fecharModalLoginFacial() {
    const modal = document.getElementById('modal-login-facial');
    if (modal) modal.style.display = 'none';

    const frame = document.getElementById('apple-faceid-frame');
    if (frame) frame.classList.remove('scanning', 'success');

    const video = document.getElementById('video-login-facial');
    if (video) FaceSecurity.stopCamera(video);
}

function fecharAlertaSeguranca() {
    const modal = document.getElementById('modal-alerta-seguranca');
    if (modal) modal.style.display = 'none';
}

async function executarScanFacialDesbloqueio() {
    const video = document.getElementById('video-login-facial');
    const statusBox = document.getElementById('face-liveness-status');
    const btnScan = document.getElementById('btn-iniciar-scan');
    const frame = document.getElementById('apple-faceid-frame');
    const icon = document.getElementById('apple-icon-symbol');

    if (btnScan) btnScan.disabled = true;
    if (frame) {
        frame.classList.remove('success');
        frame.classList.add('scanning');
    }

    const updateStatus = (fase, msg) => {
        if (statusBox) {
            statusBox.innerText = msg;
            if (fase === 'no_face') {
                statusBox.style.color = "#F59E0B";
            } else if (fase === 'face_detected') {
                statusBox.style.color = "#38BDF8";
            }
        }
    };

    const res = await FaceSecurity.realizarScanFacial(video, updateStatus);

    if (res.success) {
        window.tentativasLoginFacial = 0;
        window.isRetrySession = false;
        if (frame) {
            frame.classList.remove('scanning');
            frame.classList.add('success');
        }
        if (icon) {
            icon.className = "ph-bold ph-check-circle";
        }
        if (statusBox) {
            statusBox.innerHTML = `<span style="color:#22C55E; font-weight:800;">✓ Autenticado: ${res.professor.nome}</span>`;
        }
        setTimeout(() => {
            fecharModalLoginFacial();
            desbloquearVisaoProfessor(res.professor);
            if (btnScan) btnScan.disabled = false;
        }, 900);
    } else {
        if (frame) frame.classList.remove('scanning');
        
        // Se for a primeira tentativa da sessão, realiza a segunda tentativa (retry) automática
        if (!window.isRetrySession) {
            window.isRetrySession = true;
            if (statusBox) {
                statusBox.innerHTML = `<span style="color:#F59E0B; font-weight:700;">⚠️ Rosto não identificado. Tentando novamente...</span>`;
            }
            setTimeout(() => {
                executarScanFacialDesbloqueio();
            }, 1500);
        } else {
            // Se o retry automático também falhar, finaliza a sessão
            window.isRetrySession = false;
            window.tentativasLoginFacial = (window.tentativasLoginFacial || 0) + 1;
            
            if (window.tentativasLoginFacial >= 3) {
                window.tentativasLoginFacial = 0;
                if (statusBox) {
                    statusBox.innerHTML = `<span style="color:#EF4444; font-weight:700;">⚠️ Bloqueio de Segurança: Monitoria Requerida</span>`;
                }
                setTimeout(() => {
                    fecharModalLoginFacial();
                    
                    // Logout completo da monitoria
                    sessionStorage.removeItem('rodin_sala_auth');
                    sessionStorage.removeItem('rodin_user_role');
                    localStorage.removeItem('rodin_sala_auth');
                    localStorage.removeItem('rodin_user_role');
                    
                    // Resetar inputs
                    const userIn = document.getElementById('sala-login-user');
                    const passIn = document.getElementById('sala-login-pass');
                    if (userIn) userIn.value = '';
                    if (passIn) passIn.value = '';
                    
                    const layout = document.getElementById('app-layout');
                    if (layout) layout.style.setProperty('display', 'none', 'important');
                    
                    const overlay = document.getElementById('sala-login-overlay');
                    if (overlay) overlay.style.display = 'flex';
                    
                    mostrarSnackbar("Segurança: Dispositivo bloqueado após 3 falhas de Face ID.");
                    
                    const alertaModal = document.getElementById('modal-alerta-seguranca');
                    if (alertaModal) alertaModal.style.display = 'flex';

                    if (btnScan) btnScan.disabled = false;
                }, 1500);
            } else {
                if (statusBox) {
                    statusBox.innerHTML = `<span style="color:#EF4444; font-weight:700;">⚠️ Rosto não identificado. Fechando...</span>`;
                }
                setTimeout(() => {
                    fecharModalLoginFacial();
                    mostrarSnackbar(`Falha no Face ID: Tentativa ${window.tentativasLoginFacial} de 3. Clique na tela para tentar de novo.`);
                    if (btnScan) btnScan.disabled = false;
                }, 1500);
            }
        }
    }
}

// CENÁRIO 3: Desbloqueio e Regra de Inatividade (Auto-Lock 30s)
function desbloquearVisaoProfessor(prof) {
    window.isVisaoProfessorBloqueada = false;
    const badge = document.getElementById('prof-security-badge');
    const statusText = document.getElementById('prof-security-status-text');

    if (badge) {
        badge.className = "prof-security-pill unlocked";
    }
    if (statusText) {
        statusText.innerHTML = `<i class="ph-bold ph-lock-key-open"></i> Liberado: ${prof ? prof.nome : 'Professor'} <small style="opacity:0.8; font-size:10px;">(Auto-lock 30s)</small>`;
    }

    InactivityLock.startTimer();
}

function bloquearVisaoProfessor() {
    window.isVisaoProfessorBloqueada = true;
    const badge = document.getElementById('prof-security-badge');
    const statusText = document.getElementById('prof-security-status-text');

    if (badge) {
        badge.className = "prof-security-pill locked";
    }
    if (statusText) {
        statusText.innerHTML = '<i class="ph-bold ph-lock-key"></i> Bloqueado (Scan Facial)';
    }

    if (typeof fecharModalOcorrenciaRodin === 'function') fecharModalOcorrenciaRodin();
    if (typeof fecharModalDetalhesAudio === 'function') fecharModalDetalhesAudio();
}

function atualizarBadgeSecurityTimer(sec) {
    const statusText = document.getElementById('prof-security-status-text');
    if (statusText && !window.isVisaoProfessorBloqueada) {
        statusText.innerHTML = `<i class="ph-bold ph-lock-key-open"></i> Painel Desbloqueado <span style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:99px; margin-left:4px;"><i class="ph-bold ph-timer"></i> ${sec}s</span>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    InactivityLock.init({
        timeoutSeconds: 30,
        onLockCallback: bloquearVisaoProfessor,
        onTickCallback: atualizarBadgeSecurityTimer
    });
    iniciarMonitorTrocaAula();
    if (window.location.pathname.includes('visao-professor.html') || window.location.pathname.includes('/visao-professor-')) {
        bloquearVisaoProfessor();
    }
});

// Listener Global de Clique na Visão do Professor: Ao clicar em QUALQUER lugar da tela estando bloqueado, dispara o Scan Facial
document.addEventListener('click', (e) => {
    // Permitir navegação amigável e cliques no overlay de login
    const isVp = window.location.pathname.includes('visao-professor.html') || window.location.pathname.includes('/visao-professor-');
    if (isVp) {
        const salaLoginOverlay = document.getElementById('sala-login-overlay');
        if (salaLoginOverlay && salaLoginOverlay.style.display !== 'none' && salaLoginOverlay.contains(e.target)) {
            return; // Permite digitação e cliques no formulário da monitoria
        }

        if (window.isVisaoProfessorBloqueada) {
            const modalLogin = document.getElementById('modal-login-facial');
            if (modalLogin && modalLogin.style.display !== 'none' && modalLogin.contains(e.target)) {
                return; // Permite cliques dentro do modal de login
            }
            e.preventDefault();
            e.stopPropagation();
            abrirModalScanFacialLogin();
        }
    }
}, true);

// Monitor Automático de Troca de Aula (Dispara 2 minutos após o término de cada aula)
let ultimaTrocaNotificada = null;

function iniciarMonitorTrocaAula() {
    setInterval(() => {
        const agora = new Date();
        const min = agora.getMinutes();
        const hhmm = `${String(agora.getHours()).padStart(2, '0')}:${String(min).padStart(2, '0')}`;

        // Horários de disparo (Exatamente 2 minutos após a troca de aula de 50min / períodos):
        const horariosSurgePopup = ['08:02', '08:52', '09:42', '10:52', '11:42', '13:52', '14:42', '15:32'];

        if (horariosSurgePopup.includes(hhmm) && ultimaTrocaNotificada !== hhmm) {
            ultimaTrocaNotificada = hhmm;
            notificarTrocaAula();
        }
    }, 10000);
}

// ------------------------------------------
// AUTENTICAÇÃO DE DISPOSITIVO NO PRIMEIRO ACESSO (PROTEÇÃO CONTRA CURIOSOS)
// ------------------------------------------
function verificarAutenticacaoDispositivo() {
    const isDevAuth = localStorage.getItem('rodin_device_authenticated');
    const fullLockScreen = document.getElementById('full-screen-device-lock');

    if (isDevAuth === 'true') {
        if (fullLockScreen) fullLockScreen.style.display = 'none';
        bloquearVisaoProfessor();
    } else {
        if (fullLockScreen) {
            fullLockScreen.style.display = 'flex';
            abrirCameraDispositivo();
        }
    }
}

async function abrirCameraDispositivo() {
    await FaceSecurity.initModels();
    const video = document.getElementById('video-device-lock');
    const statusBox = document.getElementById('device-lock-status-text');
    if (video) {
        const camOk = await FaceSecurity.startCamera(video);
        if (!camOk && statusBox) {
            statusBox.innerHTML = `<span style="color:#EF4444; font-weight:700;"><i class="ph-bold ph-x-circle"></i> Câmera bloqueada ou indisponível. Verifique as permissões de acesso.</span>`;
        }
    }
}

async function executarScanAutenticacaoDispositivo() {
    const video = document.getElementById('video-device-lock');
    const statusBox = document.getElementById('device-lock-status-text');
    const btnScan = document.getElementById('btn-device-lock-scan');

    if (btnScan) btnScan.disabled = true;

    const updateStatus = (fase, msg) => {
        if (statusBox) statusBox.innerText = msg;
    };

    const res = await FaceSecurity.realizarScanFacial(video, updateStatus);

    if (res.success) {
        if (statusBox) {
            statusBox.innerHTML = `<i class="ph-bold ph-check-circle" style="color:#10B981; font-size:18px;"></i> Dispositivo Autenticado: <strong>${res.professor.nome}</strong>`;
            statusBox.style.color = "#10B981";
        }
        localStorage.setItem('rodin_device_authenticated', 'true');
        setTimeout(() => {
            FaceSecurity.stopCamera(video);
            const fullLockScreen = document.getElementById('full-screen-device-lock');
            if (fullLockScreen) fullLockScreen.style.display = 'none';
            desbloquearVisaoProfessor(res.professor);
            if (btnScan) btnScan.disabled = false;
        }, 900);
    } else {
        if (statusBox) {
            statusBox.innerHTML = `<i class="ph-bold ph-x-circle" style="color:#EF4444; font-size:18px;"></i> ${res.reason}`;
            statusBox.style.color = "#EF4444";
        }
        if (btnScan) btnScan.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', inicializarApp);

window.alternarSubAbaCadastros = function(subTabId) {
    const tabs = ['alunos', 'professores', 'turmas', 'disciplinas', 'usuarios'];
    tabs.forEach(t => {
        const btn = document.getElementById(`btn-cad-tab-${t}`);
        const panel = document.getElementById(`cad-subview-${t}`);
        if (btn) {
            if (t === subTabId) btn.classList.add('active');
            else btn.classList.remove('active');
        }
        if (panel) {
            panel.style.display = t === subTabId ? 'block' : 'none';
        }
    });

    if (subTabId === 'usuarios') {
        if (typeof renderizarListaUsuariosCadastradosPainel === 'function') renderizarListaUsuariosCadastradosPainel();
        if (typeof renderizarCheckboxesTurmasPermitidas === 'function') renderizarCheckboxesTurmasPermitidas();
    } else if (subTabId === 'disciplinas') {
        if (typeof renderizarListaDisciplinasCadastradas === 'function') renderizarListaDisciplinasCadastradas();
    } else if (subTabId === 'professores') {
        if (typeof renderizarListaProfessoresCadastrados === 'function') renderizarListaProfessoresCadastrados();
    } else if (subTabId === 'turmas') {
        if (typeof renderizarListaTurmasCadastradas === 'function') renderizarListaTurmasCadastradas();
    } else if (subTabId === 'alunos') {
        if (typeof renderizarListaAlunosCadastrados === 'function') renderizarListaAlunosCadastrados();
    }
};

// ==========================================
// CENTRAL DE CADASTROS (TURMAS, ALUNOS, PROFESSORES, DISCIPLINAS)
// ==========================================

// 1. TURMAS
async function cadastrarTurma(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const anoEl = document.getElementById('cad-turma-ano');
    const letraEl = document.getElementById('cad-turma-letra');

    const ano = anoEl ? anoEl.value : '6º Ano';
    const letra = letraEl ? letraEl.value : 'A';
    const nomeTurma = letra === 'Única' ? ano : `${ano} ${letra}`;

    if (!db.turmas) db.turmas = [];

    const jaExiste = db.turmas.some(t => t.nome && t.nome.toLowerCase().trim() === nomeTurma.toLowerCase().trim());
    if (jaExiste) {
        if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`⚠️ A turma '${nomeTurma}' já está cadastrada!`);
        alert(`A turma '${nomeTurma}' já existe no sistema.`);
        return false;
    }

    let etapa = "Ensino Médio";
    if (['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(ano)) {
        etapa = "Ensino Fundamental Anos Finais";
    }

    const slug = nomeTurma.toLowerCase().trim()
        .replace(/º/g, '')
        .replace(/\s+/g, '-')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const novaTurma = {
        id: `turma_${Date.now()}`,
        nome: nomeTurma,
        ano: ano,
        letra: letra,
        etapa: etapa,
        slug: slug,
        config_mapa: { linhas: 5, colunas: 6 }
    };

    db.turmas.push(novaTurma);
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('turmas').insert([{
                id: novaTurma.id,
                nome: novaTurma.nome,
                etapa: novaTurma.etapa,
                slug: novaTurma.slug,
                config_mapa: novaTurma.config_mapa
            }]);
        } catch(err) {
            console.warn("Erro ao enviar turma ao Supabase:", err);
        }
    }

    const formEl = document.getElementById('form-cad-turma');
    if (formEl) formEl.reset();

    renderizarListaTurmasCadastradas();
    if (typeof renderizarComponentesCadastros === 'function') renderizarComponentesCadastros();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Turma '${nomeTurma}' cadastrada com sucesso!`);
    return false;
}
window.cadastrarTurma = cadastrarTurma;

function renderizarListaTurmasCadastradas() {
    const container = document.getElementById('lista-turmas-cadastradas');
    if (!container) return;

    if (!db.turmas) db.turmas = [];
    const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(db.turmas) : db.turmas;

    if (turmasOrdenadas.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhuma turma cadastrada.</div>`;
        return;
    }

    container.innerHTML = turmasOrdenadas.map(t => {
        const qtdAlunos = (db.alunos || []).filter(a => a.turma_id === t.id).length;
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:12px 16px; border-radius:12px; border:1px solid var(--rodin-line);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:36px; height:36px; border-radius:10px; background:#FFF7ED; color:var(--rodin-orange); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:14px; border:1px solid var(--rodin-orange);">
                        <i class="ph-bold ph-users-three"></i>
                    </div>
                    <div>
                        <strong style="font-size:14px; color:var(--rodin-graphite);">${t.nome}</strong>
                        <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${t.etapa} • ${qtdAlunos} aluno(s)</div>
                    </div>
                </div>
                <button class="btn-reset-pink" onclick="excluirTurma('${t.id}')" title="Excluir Turma" style="padding:6px 12px; font-size:11px;">
                    <i class="ph-bold ph-trash"></i> Excluir
                </button>
            </div>
        `;
    }).join('');
}
window.renderizarListaTurmasCadastradas = renderizarListaTurmasCadastradas;

async function excluirTurma(turmaId) {
    if (!db.turmas) db.turmas = [];
    if (db.turmas.length <= 1) {
        if (typeof mostrarSnackbar === 'function') mostrarSnackbar("Não é possível excluir a única turma cadastrada!");
        alert("Não é possível excluir a única turma cadastrada!");
        return;
    }
    const turma = db.turmas.find(t => t.id === turmaId);
    db.turmas = db.turmas.filter(t => t.id !== turmaId);
    window.safeSetLocalStorage('rodin_turmas', db.turmas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('turmas').delete().eq('id', turmaId);
        } catch(err) {
            console.warn("Erro ao apagar turma no Supabase:", err);
        }
    }

    renderizarListaTurmasCadastradas();
    if (typeof renderizarComponentesCadastros === 'function') renderizarComponentesCadastros();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Turma '${turma ? turma.nome : ''}' excluída!`);
}
window.excluirTurma = excluirTurma;

// 2. ALUNOS
async function cadastrarAluno(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const nomeEl = document.getElementById('cad-aluno-nome');
    const turmaEl = document.getElementById('cad-aluno-turma');
    const condicaoEl = document.getElementById('cad-aluno-condicao');

    const nome = nomeEl ? nomeEl.value.trim() : '';
    const turmaId = turmaEl ? turmaEl.value : '';
    const condicao = condicaoEl ? condicaoEl.value : 'Nenhuma';

    if (!nome || !turmaId) {
        alert("Preencha o nome do aluno e escolha uma turma.");
        return false;
    }

    if (!db.alunos) db.alunos = [];

    const novoAluno = {
        id: `aluno_${Date.now()}`,
        nome: nome,
        turma_id: turmaId,
        condicao: condicao,
        foto: window._fotoAlunoPreviewTemp || `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=FF8A4C&color=fff`
    };

    db.alunos.push(novoAluno);
    window.safeSetLocalStorage('rodin_alunos', db.alunos);
    window._fotoAlunoPreviewTemp = null;

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('alunos').insert([{
                id: novoAluno.id,
                nome: novoAluno.nome,
                turma_id: novoAluno.turma_id,
                condicao: novoAluno.condicao,
                foto: novoAluno.foto
            }]);
        } catch(err) {
            console.warn("Erro ao cadastrar aluno no Supabase:", err);
        }
    }

    const formEl = document.getElementById('form-cad-aluno');
    if (formEl) formEl.reset();

    renderizarListaAlunosCadastrados();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Aluno(a) '${nome}' matriculado(a) com sucesso!`);
    return false;
}
window.cadastrarAluno = cadastrarAluno;

function renderizarListaAlunosCadastrados() {
    const container = document.getElementById('lista-alunos-cadastrados');
    if (!container) return;

    if (!db.alunos) db.alunos = [];
    const filtroTurmaEl = document.getElementById('cad-filtro-turma');
    const filtro = filtroTurmaEl ? filtroTurmaEl.value : 'todas';

    let lista = db.alunos;
    if (filtro && filtro !== 'todas') {
        lista = lista.filter(a => a.turma_id === filtro);
    }

    if (lista.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhum aluno encontrado.</div>`;
        return;
    }

    container.innerHTML = lista.map(a => {
        const turma = (db.turmas || []).find(t => t.id === a.turma_id);
        const nomeTurma = turma ? turma.nome : 'Sem Turma';
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.nome)}&background=FF8A4C&color=fff`;
        const foto = a.avatar || a.foto || fallbackAvatar;

        return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:12px 14px; border-radius:14px; border:1px solid var(--rodin-line); gap:12px;">
                <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                    <img src="${foto}" onerror="this.onerror=null; this.src='${fallbackAvatar}';" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange); flex-shrink:0;">
                    <div style="min-width:0;">
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${a.nome}</strong>
                        <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">
                            Turma: ${nomeTurma} ${a.condicao && a.condicao !== 'Nenhuma' ? `• <span style="color:#C2410C; font-weight:800;">${a.condicao}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
                    <button type="button" class="btn-primary-rodin" onclick="window.abrirModalEditarAluno('${a.id}')" title="Editar Aluno" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px; cursor:pointer;">
                        <i class="ph-bold ph-pencil-line"></i> Editar
                    </button>
                    <button type="button" class="btn-reset-pink" onclick="window.excluirAluno('${a.id}')" title="Excluir Aluno" style="padding:6px 10px; font-size:11px; cursor:pointer;">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
window.renderizarListaAlunosCadastrados = renderizarListaAlunosCadastrados;

async function excluirAluno(alunoId) {
    if (!db.alunos) db.alunos = [];
    const aluno = db.alunos.find(a => a.id === alunoId);
    db.alunos = db.alunos.filter(a => a.id !== alunoId);
    window.safeSetLocalStorage('rodin_alunos', db.alunos);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('alunos').delete().eq('id', alunoId);
        } catch(err){}
    }

    renderizarListaAlunosCadastrados();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Aluno '${aluno ? aluno.nome : ''}' excluído!`);
}
window.excluirAluno = excluirAluno;

// 3. PROFESSORES
async function cadastrarProfessor(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const nomeEl = document.getElementById('cad-prof-nome');
    const etapaEl = document.getElementById('cad-prof-etapa');
    const discEl = document.getElementById('cad-prof-disciplina');

    const nome = nomeEl ? nomeEl.value.trim() : '';
    const etapa = etapaEl ? etapaEl.value : 'Ensino Fundamental Anos Finais';
    const disciplina = discEl ? discEl.value : 'Matemática';

    if (!nome) {
        alert("Preencha o nome do professor.");
        return false;
    }

    if (!db.professores) db.professores = [];

    const novoProf = {
        id: `prof_${Date.now()}`,
        nome: nome,
        etapa: etapa,
        disciplina: disciplina,
        foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=4F46E5&color=fff`
    };

    db.professores.push(novoProf);
    window.safeSetLocalStorage('rodin_professores', db.professores);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('professores').insert([{
                id: novoProf.id,
                nome: novoProf.nome,
                etapa: novoProf.etapa,
                disciplina: novoProf.disciplina
            }]);
        } catch(err){}
    }

    const formEl = document.getElementById('form-cad-professor');
    if (formEl) formEl.reset();

    renderizarListaProfessoresCadastrados();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Professor(a) '${nome}' cadastrado(a)!`);
    return false;
}
window.cadastrarProfessor = cadastrarProfessor;

function renderizarListaProfessoresCadastrados() {
    const container = document.getElementById('lista-professores-cadastrados');
    if (!container) return;

    const professores = (window.db && window.db.professores) ? window.db.professores : (typeof db !== 'undefined' && db.professores ? db.professores : []);

    if (professores.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhum professor cadastrado.</div>`;
        return;
    }

    container.innerHTML = professores.map(p => {
        const foto = p.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}&background=4F46E5&color=fff`;
        const temFacial = (p.facial_descriptor && p.facial_descriptor.length > 0) || (p.facial_descriptors && p.facial_descriptors.length > 0) || (p.biometria_facial_status === 'cadastrada');

        return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:12px 14px; border-radius:14px; border:1px solid var(--rodin-line); gap:12px;">
                <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                    <img src="${foto}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid #4F46E5; flex-shrink:0;">
                    <div style="min-width:0;">
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.nome}</strong>
                        <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${p.disciplina || 'Geral'} • ${p.etapa || 'Todas as Etapas'}</div>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
                    <button type="button" class="btn-primary-rodin" onclick="window.abrirModalCadastroFacial('${p.id}')" title="Scan / Cadastro Facial Face ID" style="font-size:11px; padding:6px 12px; border-radius:8px; gap:4px; cursor:pointer; background:${temFacial ? '#059669' : 'var(--rodin-orange)'}; color:#FFF;">
                        <i class="ph-bold ph-user-focus"></i> ${temFacial ? 'Biometria Ativa' : 'Scan Facial'}
                    </button>
                    <button type="button" class="btn-primary-rodin" onclick="window.abrirModalEditarProfessor('${p.id}')" title="Editar Professor" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px; cursor:pointer;">
                        <i class="ph-bold ph-pencil-line"></i> Editar
                    </button>
                    <button type="button" class="btn-reset-pink" onclick="window.excluirProfessor('${p.id}')" title="Excluir Professor" style="padding:6px 10px; font-size:11px; cursor:pointer;">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
window.renderizarListaProfessoresCadastrados = renderizarListaProfessoresCadastrados;

async function excluirProfessor(profId) {
    if (!db.professores) db.professores = [];
    const prof = db.professores.find(p => p.id === profId);
    db.professores = db.professores.filter(p => p.id !== profId);
    window.safeSetLocalStorage('rodin_professores', db.professores);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('professores').delete().eq('id', profId);
        } catch(err){}
    }

    renderizarListaProfessoresCadastrados();
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Professor '${prof ? prof.nome : ''}' excluído!`);
}
window.excluirProfessor = excluirProfessor;

// 4. DISCIPLINAS
async function cadastrarDisciplina(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const nomeEl = document.getElementById('cad-disc-nome');
    const etapaEl = document.getElementById('cad-disc-etapa');

    const nome = nomeEl ? nomeEl.value.trim() : '';
    const etapa = etapaEl ? etapaEl.value : 'Ensino Fundamental Anos Finais';

    if (!nome) {
        alert("Preencha o nome da disciplina.");
        return false;
    }

    if (!db.disciplinas) db.disciplinas = [];

    const novaDisc = {
        id: `disc_${Date.now()}`,
        nome: nome,
        etapa: etapa,
        cor: '#F45206'
    };

    db.disciplinas.push(novaDisc);
    window.safeSetLocalStorage('rodin_disciplinas', db.disciplinas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('disciplinas').insert([{
                id: novaDisc.id,
                nome: novaDisc.nome,
                cor: novaDisc.cor
            }]);
        } catch(err){}
    }

    const formEl = document.getElementById('form-cad-disciplina');
    if (formEl) formEl.reset();

    renderizarListaDisciplinasCadastradas();
    if (typeof window.atualizarDisciplinasPorEtapa === 'function') {
        window.atualizarDisciplinasPorEtapa();
    }
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Disciplina '${nome}' cadastrada!`);
    return false;
}
window.cadastrarDisciplina = cadastrarDisciplina;

function abrirModalEditarDisciplina(discId) {
    const disciplinas = (window.db && window.db.disciplinas) ? window.db.disciplinas : (db.disciplinas || []);
    const disc = disciplinas.find(d => d.id === discId);
    if (!disc) return;

    const modal = document.getElementById('modal-editar-disciplina');
    if (!modal) return;

    const idInput = document.getElementById('edit-disc-id');
    const nomeInput = document.getElementById('edit-disc-nome');
    const etapaSelect = document.getElementById('edit-disc-etapa');

    if (idInput) idInput.value = disc.id;
    if (nomeInput) nomeInput.value = disc.nome || '';
    if (etapaSelect) etapaSelect.value = disc.etapa || 'Ensino Fundamental Anos Finais';

    modal.style.display = 'flex';
}
window.abrirModalEditarDisciplina = abrirModalEditarDisciplina;

function fecharModalEditarDisciplina() {
    const modal = document.getElementById('modal-editar-disciplina');
    if (modal) modal.style.display = 'none';
}
window.fecharModalEditarDisciplina = fecharModalEditarDisciplina;

async function salvarEdicaoDisciplina(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const discId = document.getElementById('edit-disc-id')?.value;
    const nome = document.getElementById('edit-disc-nome')?.value.trim();
    const etapa = document.getElementById('edit-disc-etapa')?.value || 'Ensino Fundamental Anos Finais';

    if (!nome) {
        alert("Preencha o nome da disciplina.");
        return false;
    }

    const disciplinas = window.db?.disciplinas || db.disciplinas || [];
    const index = disciplinas.findIndex(d => d.id === discId);
    if (index === -1) return false;

    const nomeAntigo = disciplinas[index].nome;
    disciplinas[index].nome = nome;
    disciplinas[index].etapa = etapa;

    if (window.db?.professores) {
        window.db.professores.forEach(p => {
            if (p.disciplina === nomeAntigo) {
                p.disciplina = nome;
            }
        });
        window.safeSetLocalStorage('rodin_professores', window.db.professores);
    }

    window.safeSetLocalStorage('rodin_disciplinas', disciplinas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('disciplinas').update({
                nome: nome
            }).eq('id', discId);
        } catch(err) {
            console.warn("Erro ao salvar disciplina no Supabase:", err);
        }
    }

    fecharModalEditarDisciplina();
    renderizarListaDisciplinasCadastradas();
    if (typeof window.atualizarDisciplinasPorEtapa === 'function') {
        window.atualizarDisciplinasPorEtapa();
    }
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Disciplina '${nome}' atualizada com sucesso!`);
    return false;
}
window.salvarEdicaoDisciplina = salvarEdicaoDisciplina;

function renderizarListaDisciplinasCadastradas() {
    const container = document.getElementById('lista-disciplinas-cadastradas');
    if (!container) return;

    const disciplinas = (window.db && window.db.disciplinas) ? window.db.disciplinas : (db.disciplinas || []);

    if (disciplinas.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhuma disciplina cadastrada.</div>`;
        return;
    }

    container.innerHTML = disciplinas.map(d => {
        const etapaFormatada = d.etapa || 'Ensino Fundamental Anos Finais';
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:10px 14px; border-radius:12px; border:1px solid var(--rodin-line); gap:12px;">
                <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                    <i class="ph-bold ph-book" style="color:var(--rodin-orange); font-size:20px; flex-shrink:0;"></i>
                    <div style="min-width:0;">
                        <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${d.nome}</strong>
                        <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${etapaFormatada}</div>
                    </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
                    <button type="button" class="btn-primary-rodin" onclick="abrirModalEditarDisciplina('${d.id}')" title="Editar Disciplina" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px; cursor:pointer;">
                        <i class="ph-bold ph-pencil-line"></i> Editar
                    </button>
                    <button type="button" class="btn-reset-pink" onclick="excluirDisciplina('${d.id}')" title="Excluir Disciplina" style="padding:6px 10px; font-size:11px; cursor:pointer;">
                        <i class="ph-bold ph-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
window.renderizarListaDisciplinasCadastradas = renderizarListaDisciplinasCadastradas;

async function excluirDisciplina(discId) {
    const disciplinas = (window.db && window.db.disciplinas) ? window.db.disciplinas : (db.disciplinas || []);
    const disc = disciplinas.find(d => d.id === discId);
    const novasDisciplinas = disciplinas.filter(d => d.id !== discId);
    if (window.db) window.db.disciplinas = novasDisciplinas;
    db.disciplinas = novasDisciplinas;
    window.safeSetLocalStorage('rodin_disciplinas', novasDisciplinas);

    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (sbClient && typeof sbClient.from === 'function') {
        try {
            await sbClient.from('disciplinas').delete().eq('id', discId);
        } catch(err){}
    }

    renderizarListaDisciplinasCadastradas();
    if (typeof window.atualizarDisciplinasPorEtapa === 'function') {
        window.atualizarDisciplinasPorEtapa();
    }
    if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Disciplina '${disc ? disc.nome : ''}' excluída!`);
}
window.excluirDisciplina = excluirDisciplina;
