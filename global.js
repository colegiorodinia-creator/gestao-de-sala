// ==========================================
// PORTAL RODIN - MÓDULO GLOBAL (global.js)
// Sincronização em Tempo Real com Supabase, Autenticação e Utilitários
// ==========================================

// Limpeza de sessão facilitada para testes (?clear=true)
if (window.location.search.includes('clear=true')) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = window.location.pathname;
}

// Inicialização Global do Banco em Memória
window.supabase = window.supabase || {};
window.db = window.db || {
    turmas: [],
    alunos: [],
    professores: [],
    disciplinas: [],
    usuarios_sistema: []
};
var db = window.db;

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
                    } catch(e) {}
                }
            }
            valueToSave = JSON.stringify(rawData);
        } else if (typeof data !== 'string') {
            valueToSave = JSON.stringify(data);
        }

        localStorage.setItem(key, valueToSave);
    } catch (e) {
        console.warn(`[Storage Warning] Erro ao salvar chave '${key}' no localStorage:`, e);
    }
};

// 1. GESTÃO DO PERFIL DE USUÁRIO & PERMISSÕES
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

// Obter Lista de Usuários - Exclusivamente dados reais do Supabase/Cache Oficial
window.obterListaUsuariosSistema = function() {
    try {
        const salvo = localStorage.getItem('rodin_usuarios_sistema');
        if (salvo) {
            const parsed = JSON.parse(salvo);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}

    // Fallback mínimo estrito (Apenas os dois usuários reais cadastrados no Supabase)
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
};
var obterListaUsuariosSistema = window.obterListaUsuariosSistema;

window.salvarListaUsuariosSistema = function(lista) {
    window.safeSetLocalStorage('rodin_usuarios_sistema', lista);
    if (window.db) window.db.usuarios_sistema = lista;
};
var salvarListaUsuariosSistema = window.salvarListaUsuariosSistema;

window.obterUsuarioLogado = function() {
    try {
        const sessao = localStorage.getItem('rodin_active_session');
        if (sessao) {
            const parsed = JSON.parse(sessao);
            if (parsed && parsed.nome) return parsed;
        }
    } catch (e) {}

    const usuarios = window.obterListaUsuariosSistema();
    const defaultUser = usuarios[0]; // Benedito Donizete Bueno da Silva (Direção Geral)
    try {
        localStorage.setItem('rodin_active_session', JSON.stringify(defaultUser));
        localStorage.setItem('rodin_usuario_logado_id', defaultUser.id);
    } catch (e) {}
    return defaultUser;
};
var obterUsuarioLogado = window.obterUsuarioLogado;

// Carregamento Inicial do Banco Local a partir do Cache
window.carregarBancoDeDadosLocal = function() {
    try {
        const t = localStorage.getItem('rodin_turmas');
        const a = localStorage.getItem('rodin_alunos');
        const p = localStorage.getItem('rodin_professores');
        const d = localStorage.getItem('rodin_disciplinas');
        const u = localStorage.getItem('rodin_usuarios_sistema');
        const o = localStorage.getItem('rodin_ocorrencias');

        if (t) window.db.turmas = JSON.parse(t);
        if (a) window.db.alunos = JSON.parse(a);
        if (p) window.db.professores = JSON.parse(p);
        if (d) window.db.disciplinas = JSON.parse(d);
        if (u) window.db.usuarios_sistema = JSON.parse(u);
        if (o) window.db.ocorrencias = JSON.parse(o);
        else if (!window.db.ocorrencias) window.db.ocorrencias = [];
    } catch(err) {
        console.warn("[Local DB Load Warning]:", err);
    }
};
if (!window.db.ocorrencias) window.db.ocorrencias = [];
window.carregarBancoDeDadosLocal();

// 2. SINCRONIZAÇÃO COMPLETA COM O SUPABASE (SEM GERAR DADOS FAKE)
window.sincronizarBancoComSupabase = async function() {
    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (!sbClient || typeof sbClient.from !== 'function') return;

    try {
        const [resTurmas, resAlunos, resProfs, resDisc, resUsuarios] = await Promise.all([
            sbClient.from('turmas').select('*'),
            sbClient.from('alunos').select('*'),
            sbClient.from('professores').select('*'),
            sbClient.from('disciplinas').select('*'),
            sbClient.from('usuarios_sistema').select('*')
        ]);

        if (resTurmas && Array.isArray(resTurmas.data)) {
            window.db.turmas = resTurmas.data;
            window.safeSetLocalStorage('rodin_turmas', window.db.turmas);
        }

        if (resAlunos && Array.isArray(resAlunos.data)) {
            // Mapear campos de avatar se necessário
            window.db.alunos = resAlunos.data.map(al => ({
                ...al,
                foto: al.avatar || al.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(al.nome)}&background=FF8A4C&color=fff`
            }));
            window.safeSetLocalStorage('rodin_alunos', window.db.alunos);
        }

        if (resProfs && Array.isArray(resProfs.data)) {
            window.db.professores = resProfs.data;
            if (window.FaceSecurity && typeof window.FaceSecurity.restaurarBiometriasLocais === 'function') {
                window.FaceSecurity.restaurarBiometriasLocais();
            }
            window.safeSetLocalStorage('rodin_professores', window.db.professores);
        }

        if (resDisc && Array.isArray(resDisc.data)) {
            window.db.disciplinas = resDisc.data;
            window.safeSetLocalStorage('rodin_disciplinas', window.db.disciplinas);
        }

        if (resUsuarios && Array.isArray(resUsuarios.data) && resUsuarios.data.length > 0) {
            window.db.usuarios_sistema = resUsuarios.data;
            window.salvarListaUsuariosSistema(window.db.usuarios_sistema);
        }

        // Disparar atualizações nas interfaces ativas
        if (typeof window.renderizarListaUsuariosCadastradosPainel === 'function') window.renderizarListaUsuariosCadastradosPainel();
        if (typeof window.renderizarCheckboxesTurmasPermitidas === 'function') window.renderizarCheckboxesTurmasPermitidas();
        if (typeof window.renderizarListaTurmasCadastradas === 'function') window.renderizarListaTurmasCadastradas();
        if (typeof window.renderizarListaAlunosCadastrados === 'function') window.renderizarListaAlunosCadastrados();
        if (typeof window.renderizarListaProfessoresCadastrados === 'function') window.renderizarListaProfessoresCadastrados();
        if (typeof window.renderizarListaDisciplinasCadastradas === 'function') window.renderizarListaDisciplinasCadastradas();
        if (typeof window.renderizarComponentesCadastros === 'function') window.renderizarComponentesCadastros();
        if (typeof window.renderizarInterface === 'function') window.renderizarInterface();

        document.dispatchEvent(new CustomEvent('rodin_db_synced', { detail: window.db }));
    } catch (err) {
        console.warn("Aviso na sincronização do Supabase:", err);
    }
};

// 3. UPLOAD DE FOTOS PARA O SUPABASE STORAGE
window.fazerUploadFotoSupabaseStorage = async function(file, pasta = 'alunos') {
    const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
    if (!sbClient || !sbClient.storage) return null;

    try {
        const ext = file.name.split('.').pop() || 'png';
        const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filePath = `${pasta}/${Date.now()}_${cleanName}.${ext}`;

        const { data, error } = await sbClient.storage
            .from('alunos-fotos')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            console.warn("[Supabase Storage Warning]:", error.message);
            return null;
        }

        const { data: publicData } = sbClient.storage
            .from('alunos-fotos')
            .getPublicUrl(filePath);

        return publicData ? publicData.publicUrl : null;
    } catch (err) {
        console.warn("[Supabase Storage Error]:", err);
        return null;
    }
};
var fazerUploadFotoSupabaseStorage = window.fazerUploadFotoSupabaseStorage;

// Executar sincronização inicial imediatamente
window.sincronizarBancoComSupabase();

// Autenticação e Troca de Usuário
function verificarAutenticacaoRota() {
    const path = window.location.pathname;
    
    if (path.includes('login.html') || path.endsWith('index.html')) {
        return;
    }
    
    const isVisaoProfessor = path.includes('visao-professor.html') || path.includes('/visao-professor-');
    if (isVisaoProfessor) {
        const sessao = localStorage.getItem('rodin_active_session');
        const salaAuth = sessionStorage.getItem('rodin_sala_auth') === 'true' || localStorage.getItem('rodin_sala_auth') === 'true';
        if (sessao || salaAuth) return;
        return;
    }
    
    const sessao = localStorage.getItem('rodin_active_session');
    if (!sessao) {
        window.location.href = 'login.html';
    }
}
verificarAutenticacaoRota();

function trocarUsuarioLogado(usuarioId) {
    const usuarios = window.obterListaUsuariosSistema();
    const usr = usuarios.find(u => u.id === usuarioId);
    if (!usr) return;

    localStorage.setItem('rodin_active_session', JSON.stringify(usr));
    localStorage.setItem('rodin_usuario_logado_id', usr.id);
    if (window.db) window.db.perfil_usuario = usr;

    carregarPerfilUsuario();
    if (typeof mostrarSnackbar === 'function') {
        mostrarSnackbar(`Sessão alterada para: ${usr.nome} (${usr.cargo})`);
    }
    if (typeof renderizarInterface === 'function') renderizarInterface();
}

function carregarPerfilUsuario() {
    const usr = obterUsuarioLogado();
    if (window.db) window.db.perfil_usuario = usr;

    const elAvatar = document.getElementById('user-profile-avatar');
    const elNome = document.getElementById('user-profile-name');
    const elCargo = document.getElementById('user-profile-role');

    if (elAvatar) elAvatar.src = usr.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usr.nome)}&background=FF8A4C&color=fff`;
    if (elNome) elNome.innerText = usr.nome;
    if (elCargo) elCargo.innerText = usr.cargo;
}

function obterTurmasPermitidasUsuario() {
    const usr = obterUsuarioLogado();
    if (!usr || usr.papel === 'diretor' || usr.turmas_permitidas === 'todas') {
        return window.db.turmas || [];
    }

    const permitidasList = Array.isArray(usr.turmas_permitidas) ? usr.turmas_permitidas : [];
    return (window.db.turmas || []).filter(t => permitidasList.some(p => t.nome.toLowerCase().includes(p.toLowerCase())));
}

window.getClasseCondicao = function(cond) {
    if (!cond) return 'regular';
    return String(cond).toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '_');
};
function getClasseCondicao(cond) { return window.getClasseCondicao(cond); }

window.mostrarSnackbar = function(mensagem, tipo = 'sucesso') {
    let snackbar = document.getElementById('rodin-snackbar');
    if (!snackbar) {
        snackbar = document.createElement('div');
        snackbar.id = 'rodin-snackbar';
        snackbar.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #1E293B;
            color: #FFFFFF;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 700;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 999999;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(100px);
            opacity: 0;
            border-left: 4px solid var(--rodin-orange);
        `;
        document.body.appendChild(snackbar);
    }

    if (tipo === 'erro') {
        snackbar.style.borderLeftColor = '#EF4444';
    } else if (tipo === 'aviso') {
        snackbar.style.borderLeftColor = '#F59E0B';
    } else {
        snackbar.style.borderLeftColor = 'var(--rodin-orange)';
    }

    snackbar.innerHTML = `<i class="ph-bold ph-check-circle" style="color:var(--rodin-orange); font-size:18px;"></i> ${mensagem}`;
    snackbar.style.transform = 'translateY(0)';
    snackbar.style.opacity = '1';

    setTimeout(() => {
        snackbar.style.transform = 'translateY(100px)';
        snackbar.style.opacity = '0';
    }, 3500);
};

window.ordenarTurmas = function(listaTurmas) {
    if (!Array.isArray(listaTurmas)) return [];
    const ordemAnos = {
        '6º Ano': 1,
        '7º Ano': 2,
        '8º Ano': 3,
        '9º Ano': 4,
        '1ª Série': 5,
        '2ª Série': 6,
        '3ª Série': 7,
        'PPV': 8
    };

    return [...listaTurmas].sort((a, b) => {
        const pesoA = ordemAnos[a.ano] || 99;
        const pesoB = ordemAnos[b.ano] || 99;
        if (pesoA !== pesoB) return pesoA - pesoB;
        return (a.letra || '').localeCompare(b.letra || '');
    });
};

function iniciarRelogio() {
    setInterval(() => {
        const agora = new Date();
        const str = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const elRelogio = document.getElementById('top-clock');
        if (elRelogio) elRelogio.innerText = str;
    }, 1000);
}

window.confirmarResetDados = function() {
    if (confirm("Tem certeza que deseja resetar os dados locais para a base padrão do Supabase?")) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.search = '?clear=true';
    }
};

window.escapeHTML = function(str) {
    if (typeof str !== 'string') return str || '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
