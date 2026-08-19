// ==========================================
// PORTAL RODIN - COMPONENTE DE MENU LATERAL REUTILIZÁVEL (sidebar.js)
// ==========================================

window.fazerLogoutSistema = function() {
    localStorage.removeItem('rodin_active_session');
    localStorage.removeItem('rodin_usuario_logado_id');
    localStorage.removeItem('rodin_sala_auth');
    localStorage.removeItem('rodin_user_role');
    sessionStorage.clear();
    window.location.href = 'login.html';
};
function fazerLogoutSistema() { window.fazerLogoutSistema(); }

function toggleSidebarCollapse() {
    const sidebar = document.getElementById('sidebar-secondary');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('rodin_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    }
}
window.toggleSidebarCollapse = toggleSidebarCollapse;

function renderizarSidebarModelo(activePageId) {
    const sidebarContainer = document.getElementById('sidebar-secondary');
    if (!sidebarContainer) return;

    // Se estiver na visão de sala / monitoria restrita em tablet, não renderizar
    if (window.location.pathname.includes('visao-professor.html') || window.location.pathname.includes('visao-professor-')) {
        const isSalaAuth = sessionStorage.getItem('rodin_sala_auth') === 'true' || localStorage.getItem('rodin_sala_auth') === 'true';
        if (isSalaAuth) {
            sidebarContainer.style.setProperty('display', 'none', 'important');
            return;
        }
    }

    sidebarContainer.style.setProperty('display', 'flex', 'important');

    if (!activePageId) {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('analise-geral')) activePageId = 'analise-geral';
        else if (path.includes('raio-x-aluno')) activePageId = 'raio-x-aluno';
        else if (path.includes('setup-turma')) activePageId = 'setup-turma';
        else if (path.includes('cadastros')) activePageId = 'cadastros';
        else if (path.includes('central-acolhimento')) activePageId = 'central-acolhimento';
        else if (path.includes('visao-professor')) activePageId = 'visao-professor';
        else activePageId = 'cadastros';
    }

    const navItems = [
        { id: 'analise-geral', url: 'analise-geral.html', icon: 'ph-chart-bar', label: 'Análise Geral' },
        { id: 'raio-x-aluno', url: 'raio-x-aluno.html', icon: 'ph-user-focus', label: 'Raio-X do Aluno' },
        { id: 'setup-turma', url: 'setup-turma.html', icon: 'ph-wrench', label: 'Setup de Turma' },
        { id: 'cadastros', url: 'cadastros.html', icon: 'ph-user-plus', label: 'Cadastros' }
    ];

    const esc = window.escapeHTML || (s => String(s || ''));

    const navHtml = navItems.map(item => {
        const isActive = item.id === activePageId ? 'active' : '';
        const extraClass = item.isSpecial ? 'btn-prof-sala-link' : '';
        const safeLabel = esc(item.label);
        const safeUrl = esc(item.url);
        const safeIcon = esc(item.icon);
        return `
            <a href="${safeUrl}" class="menu-link ${isActive} ${extraClass}" title="${safeLabel}">
                <i class="ph-bold ${safeIcon}"></i>
                <span class="menu-link-text">${safeLabel}</span>
            </a>
        `;
    }).join('');

    const usr = (typeof window.obterUsuarioLogado === 'function') ? window.obterUsuarioLogado() : {
        nome: 'Benedito Donizete Bueno da Silva',
        cargo: 'Direção Geral (Admin)',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
    };

    sidebarContainer.innerHTML = `
        <!-- TOPO DA SIDEBAR: LOGO HORIZONTAL OFICIAL + BOTÃO DE COLAPSO -->
        <div class="sidebar-header">
            <div class="brand-logo-box">
                <img src="logotipo-colegio-rodin.png" alt="Colégio Rodin" class="brand-logo-img">
            </div>
            <button class="sidebar-toggle-btn" onclick="window.toggleSidebarCollapse()" title="Recolher / Expandir Menu">
                <i class="ph-bold ph-sidebar-simple"></i>
            </button>
        </div>

        <!-- NAVEGAÇÃO CENTRAL -->
        <div class="menu-tree">
            <h4 class="menu-title">GESTÃO OPERACIONAL</h4>
            <div class="sub-nav">
                ${navHtml}
            </div>
        </div>

        <!-- RODAPÉ DA SIDEBAR: PERFIL DO USUÁRIO LOGADO + BOTÃO DE SAIR -->
        <div class="sidebar-footer-profile" style="cursor:default;" title="Usuário Autenticado: ${esc(usr.nome)}">
            <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:0; overflow:hidden;">
                <img id="user-profile-avatar" src="${esc(usr.foto)}" alt="Foto do Usuário" class="avatar-user-img">
                <div class="user-info">
                    <h3 id="user-profile-name">${esc(usr.nome)}</h3>
                    <span id="user-profile-role">${esc(usr.cargo)}</span>
                </div>
            </div>
            <button class="btn-profile-options" onclick="window.fazerLogoutSistema()" title="Sair do Gestão de Mapa" style="color:#EF4444; background:transparent; border:none; cursor:pointer; padding:6px; display:flex; align-items:center; justify-content:center;">
                <i class="ph-bold ph-sign-out" style="font-size:18px;"></i>
            </button>
        </div>
    `;

    if (localStorage.getItem('rodin_sidebar_collapsed') === 'true') {
        sidebarContainer.classList.add('collapsed');
    } else {
        sidebarContainer.classList.remove('collapsed');
    }
}
window.renderizarSidebarModelo = renderizarSidebarModelo;

// Auto-inicialização imediata quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderizarSidebarModelo());
} else {
    renderizarSidebarModelo();
}
