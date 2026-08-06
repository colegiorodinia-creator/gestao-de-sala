// ==========================================
// PORTAL RODIN - MÓDULO GLOBAL (global.js)
// Inicialização do Banco, Autenticação, Usuários, Permissões e Utilitários Globais
// ==========================================

// Limpeza de sessão facilitada para testes (?clear=true)
if (window.location.search.includes('clear=true')) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = window.location.pathname;
}

window.escapeHTML = function(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, function(match) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return map[match];
    });
};

window.supabaseUrl = 'https://vjnfkaenqrprtsiuqilb.supabase.co';
window.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbmZrYWVucXJwcnRzaXVxaWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MTEsImV4cCI6MjEwMDkzODgxMX0.n0LW0qZXQhUaaHaXSy-3QPzoGVsS8SJc9-gDNcvzGhg';

window.obterClienteSupabase = function() {
    if (!window.sb && window.supabase && typeof window.supabase.createClient === 'function') {
        window.sb = window.supabase.createClient(window.supabaseUrl, window.supabaseKey);
    }
    return window.sb;
};
window.sb = window.obterClienteSupabase();

window.safeSetLocalStorage = function(key, data) {
    try {
        let valueToSave = data;
        
        // Proteção especial para a tabela de professores: nunca perder biometrias salvas localmente
        if (key === 'rodin_professores') {
            const rawData = typeof data === 'string' ? JSON.parse(data) : data;
            if (Array.isArray(rawData)) {
                const oldRaw = localStorage.getItem('rodin_professores');
                if (oldRaw) {
                    try {
                        const oldProfs = JSON.parse(oldRaw);
                        if (Array.isArray(oldProfs)) {
                            // Mesclar biometrias antigas para os novos dados antes de salvar
                            const merged = rawData.map(p => {
                                const oldP = oldProfs.find(op => op.id === p.id);
                                if (oldP && (oldP.facial_descriptor || oldP.facial_descriptors)) {
                                    return {
                                        ...p,
                                        facial_descriptor: oldP.facial_descriptor || p.facial_descriptor,
                                        facial_descriptors: oldP.facial_descriptors || p.facial_descriptors,
                                        foto_biometrica: oldP.foto_biometrica || p.foto_biometrica,
                                        biometria_facial_status: oldP.biometria_facial_status || p.biometria_facial_status
                                    };
                                }
                                return p;
                            });
                            valueToSave = merged;
                        }
                    } catch(e) {
                        console.warn("Erro ao mesclar biometrias durante safeSetLocalStorage:", e);
                    }
                }
            }
        }

        localStorage.setItem(key, typeof valueToSave === 'string' ? valueToSave : JSON.stringify(valueToSave));
    } catch(e) {
        console.warn(`[LocalStorage] Quota excedida ao salvar '${key}', mantido em memória/Supabase.`, e);
    }
};

window.getClasseCondicao = function(cond) {
    if (!cond) return 'regular';
    return String(cond).toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '_');
};

window.obterPermissoesESenhaUsuario = function(usr) {
    if (!usr) return { turmas: 'todas', senha: '' };
    if (usr.turmas_permitidas && typeof usr.turmas_permitidas === 'object' && !Array.isArray(usr.turmas_permitidas)) {
        return {
            turmas: usr.turmas_permitidas.turmas || 'todas',
            senha: usr.turmas_permitidas.senha || ''
        };
    }
    return {
        turmas: usr.turmas_permitidas || 'todas',
        senha: ''
    };
};

window.empacotarPermissoesESenhaUsuario = function(turmas, senha) {
    if (senha) {
        return {
            turmas: turmas,
            senha: senha
        };
    }
    return turmas;
};
if (!window.db) {
    window.db = {
        turmas: [],
        alunos: [],
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

// 1. GESTÃO DO PERFIL DE USUÁRIO & PERMISSÕES DE TURMA
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
    localStorage.setItem('rodin_usuarios_sistema', JSON.stringify(lista));
    if (db) db.usuarios_sistema = lista;
}

function obterUsuarioLogado() {
    try {
        const sessao = localStorage.getItem('rodin_active_session');
        if (sessao) return JSON.parse(sessao);
    } catch (e) {}

    const usuarios = obterListaUsuariosSistema();
    return usuarios[0];
}

function verificarAutenticacaoRota() {
    const path = window.location.pathname;
    
    // Permitir páginas de login e index sem autenticação inicial
    if (path.includes('login.html') || path.endsWith('index.html')) {
        return;
    }
    
    // Se for o link amigável de visão do professor ou visao-professor.html
    const isVisaoProfessor = path.includes('visao-professor.html') || path.includes('/visao-professor-');
    if (isVisaoProfessor) {
        const sessao = localStorage.getItem('rodin_active_session');
        const salaAuth = sessionStorage.getItem('rodin_sala_auth') === 'true' || localStorage.getItem('rodin_sala_auth') === 'true';
        
        // Se tem qualquer uma das sessões válidas (Admin ou Monitoria), permite o acesso
        if (sessao || salaAuth) {
            return;
        }
        
        // Caso contrário, não redirecionamos imediatamente, permitindo que a própria tela
        // do professor exiba o overlay de login seguro de monitoria
        return;
    }
    
    // Para todas as outras rotas (cadastros, relatórios), exige a sessão administrativa normal
    const sessao = localStorage.getItem('rodin_active_session');
    if (!sessao) {
        window.location.href = 'login.html';
    }
}

async function fazerLogoutSistema() {
    try {
        if (window.sb && window.sb.auth) {
            await window.sb.auth.signOut();
        }
    } catch(e){}
    localStorage.removeItem('rodin_active_session');
    window.location.href = 'login.html';
}

verificarAutenticacaoRota();

function trocarUsuarioLogado(usuarioId) {
    const usuarios = obterListaUsuariosSistema();
    const usr = usuarios.find(u => u.id === usuarioId);
    if (!usr) return;

    localStorage.setItem('rodin_active_session', JSON.stringify(usr));
    db.perfil_usuario = usr;

    carregarPerfilUsuario();
    if (typeof mostrarSnackbar === 'function') {
        mostrarSnackbar(`Sessão alterada para: ${usr.nome} (${usr.cargo})`);
    }
    if (typeof renderizarInterface === 'function') renderizarInterface();
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

function obterTurmasPermitidasUsuario() {
    const usr = obterUsuarioLogado();
    if (!usr || usr.papel === 'diretor' || usr.turmas_permitidas === 'todas') {
        return db.turmas || [];
    }

    const permitidasList = Array.isArray(usr.turmas_permitidas) ? usr.turmas_permitidas : [];
    return (db.turmas || []).filter(t => permitidasList.some(p => t.nome.toLowerCase().includes(p.toLowerCase())));
}

window.getClasseCondicao = function(cond) {
    if (!cond) return 'regular';
    return cond.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '_');
};
function getClasseCondicao(cond) { return window.getClasseCondicao(cond); }

// Toast Utilitário Global
function mostrarSnackbar(mensagem) {
    let snackbar = document.getElementById('rodin-toast-snackbar');
    if (!snackbar) {
        snackbar = document.createElement('div');
        snackbar.id = 'rodin-toast-snackbar';
        document.body.appendChild(snackbar);
    }

    snackbar.innerHTML = `<i class="ph-bold ph-check-circle" style="color:var(--rodin-orange); font-size:18px;"></i> ${mensagem}`;
    snackbar.classList.add('show');

    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3500);
}

// Relógio Digital Global
function iniciarRelogio() {
    setInterval(() => {
        const agora = new Date();
        const str = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const elRelogio = document.getElementById('top-clock');
        if (elRelogio) elRelogio.innerText = str;
    }, 1000);
}

// Função para escapar caracteres HTML e prevenir ataques XSS
window.escapeHTML = function(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
function escapeHTML(str) { return window.escapeHTML(str); }
