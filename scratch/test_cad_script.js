
        window.renderizarComponentesCadastros = function() {
            // 1. Preencher Selects de Turmas
            const selAlunoTurma = document.getElementById('cad-aluno-turma');
            const selFiltroTurma = document.getElementById('cad-filtro-turma');
            let turmas = (window.db && window.db.turmas && window.db.turmas.length > 0) 
                ? window.db.turmas 
                : [];
            
            if (turmas.length === 0) {
                try {
                    const raw = localStorage.getItem('rodin_turmas');
                    if (raw) turmas = JSON.parse(raw);
                } catch(e){}
            }

            const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(turmas) : turmas;

            if (selAlunoTurma) {
                selAlunoTurma.innerHTML = turmasOrdenadas.length > 0 
                    ? turmasOrdenadas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('')
                    : '<option value="">Nenhuma turma cadastrada</option>';
            }

            if (selFiltroTurma) {
                const valorAtual = selFiltroTurma.value || 'todas';
                selFiltroTurma.innerHTML = `
                    <option value="todas">Todas as Turmas Permitidas</option>
                    ${turmasOrdenadas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('')}
                `;
                selFiltroTurma.value = valorAtual;
            }

            // 2. Preencher Select de Disciplinas
            if (typeof window.atualizarDisciplinasPorEtapa === 'function') {
                window.atualizarDisciplinasPorEtapa();
            }

            // 3. Renderizar Checkboxes de Turmas Permitidas
            if (typeof window.renderizarCheckboxesTurmasPermitidas === 'function') {
                window.renderizarCheckboxesTurmasPermitidas();
            }

            // 4. Renderizar Lista de Usuários e Permissões
            if (typeof window.renderizarListaUsuariosCadastradosPainel === 'function') {
                window.renderizarListaUsuariosCadastradosPainel();
            }

            // 5. Renderizar Listas das outras abas
            if (typeof window.renderizarListaTurmasCadastradas === 'function') window.renderizarListaTurmasCadastradas();
            if (typeof window.renderizarListaAlunosCadastrados === 'function') window.renderizarListaAlunosCadastrados();
            if (typeof window.renderizarListaProfessoresCadastrados === 'function') window.renderizarListaProfessoresCadastrados();
            if (typeof window.renderizarListaDisciplinasCadastradas === 'function') window.renderizarListaDisciplinasCadastradas();
        };

        function alternarSubAbaCadastros(subTabId) {
            const tabs = ['alunos', 'professores', 'turmas', 'disciplinas', 'usuarios'];
            tabs.forEach(t => {
                const btn = document.getElementById(`btn-cad-tab-${t}`);
                const panel = document.getElementById(`cad-subview-${t}`);
                if (btn) {
                    if (t === subTabId) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                }
                if (panel) {
                    if (t === subTabId) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                    } else {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    }
                }
            });

            if (typeof window.renderizarComponentesCadastros === 'function') {
                window.renderizarComponentesCadastros();
            }
        }
        window.alternarSubAbaCadastros = alternarSubAbaCadastros;

        // 5. USUÁRIOS E PERMISSÕES
        window.renderizarCheckboxesTurmasPermitidas = function() {
            const container = document.getElementById('checkboxes-turmas-permitidas');
            if (!container) return;

            let turmas = (window.db && window.db.turmas && window.db.turmas.length > 0) ? window.db.turmas : [];
            if (turmas.length === 0) {
                try {
                    const raw = localStorage.getItem('rodin_turmas');
                    if (raw) turmas = JSON.parse(raw);
                } catch(e){}
            }

            const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(turmas) : turmas;
            if (turmasOrdenadas.length === 0) {
                container.innerHTML = `<span style="font-size:11px; color:var(--rodin-cool-gray);">Nenhuma turma cadastrada. Crie turmas na aba 'Gestão de Turmas'.</span>`;
                return;
            }
            container.innerHTML = turmasOrdenadas.map(t => `
                <label style="font-size:12px; color:var(--rodin-graphite); font-weight:700; display:flex; align-items:center; gap:8px; cursor:pointer; background:#F8FAFC; padding:6px 10px; border-radius:8px; border:1px solid var(--rodin-line);">
                    <input type="checkbox" name="turma_permitida_chk" value="${t.nome}" style="width:16px; height:16px; accent-color:var(--rodin-orange);">
                    <span>${t.nome}</span>
                </label>
            `).join('');
        };

        window.alternarOpcoesTurmasPermitidasForm = function() {
            const papel = document.getElementById('cad-usr-papel')?.value;
            const box = document.getElementById('box-turmas-permitidas-form');
            if (box) {
                box.style.display = papel === 'diretor' ? 'none' : 'block';
            }
        };

        window.renderizarListaUsuariosCadastradosPainel = function() {
            const container = document.getElementById('lista-usuarios-cadastrados-painel');
            if (!container) return;

            let usuarios = (window.db && window.db.usuarios_sistema && window.db.usuarios_sistema.length > 0)
                ? window.db.usuarios_sistema
                : (window.obterListaUsuariosSistema ? window.obterListaUsuariosSistema() : []);

            if (!usuarios || usuarios.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhum usuário cadastrado no sistema.</div>`;
                return;
            }

            container.innerHTML = usuarios.map(u => {
                let turmasText = 'Acesso Total (Diretoria)';
                const info = window.obterPermissoesESenhaUsuario ? window.obterPermissoesESenhaUsuario(u) : { turmas: u.turmas_permitidas || 'todas' };
                if (u.papel === 'orientador') {
                    if (Array.isArray(info.turmas)) {
                        if (info.turmas.length === 0) {
                            turmasText = 'Nenhuma turma atribuída';
                        } else {
                            turmasText = info.turmas.map(tid => {
                                const achada = (window.db && window.db.turmas ? window.db.turmas : []).find(t => t.id === tid || t.slug === tid || t.nome === tid);
                                return achada ? achada.nome : tid;
                            }).join(', ');
                        }
                    } else if (info.turmas && info.turmas !== 'todas') {
                        turmasText = String(info.turmas);
                    }
                }

                const eDiretor = u.id === 'usr_diretor' || u.papel === 'diretor';
                const foto = u.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.nome)}&background=FF8A4C&color=fff`;

                return `
                    <div style="padding:12px 14px; background:#F8FAFC; border:1px solid var(--rodin-line); border-radius:14px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
                        <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                            <img src="${foto}" style="width:42px; height:42px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange); flex-shrink:0;">
                            <div style="min-width:0;">
                                <strong style="font-size:13px; color:var(--rodin-graphite); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.nome}</strong>
                                <span style="font-size:11px; color:var(--rodin-cool-gray); font-weight:700;">${u.cargo}</span>
                                <div style="font-size:10px; color:#4338CA; font-weight:800; margin-top:2px;">
                                    <i class="ph-bold ph-key"></i> Turmas: ${turmasText}
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;">
                            <button type="button" class="btn-primary-rodin" onclick="window.abrirModalEditarUsuarioSistema('${u.id}')" style="background:#475569; color:#FFF; font-size:11px; padding:6px 12px; border-radius:8px; gap:4px; cursor:pointer;">
                                <i class="ph-bold ph-pencil-line"></i> Editar
                            </button>
                            ${!eDiretor ? `
                                <button type="button" class="btn-reset-pink" onclick="window.excluirUsuarioSistema('${u.id}')" title="Excluir Usuário" style="padding:6px 10px; font-size:11px; cursor:pointer;">
                                    <i class="ph-bold ph-trash"></i>
                                </button>
                            ` : '<span style="font-size:10px; color:var(--rodin-orange); font-weight:800; background:#FFF7ED; padding:4px 8px; border-radius:6px; border:1px solid #FFEDD5;">DIRETORIA</span>'}
                        </div>
                    </div>
                `;
            }).join('');
        };

        window.cadastrarNovoUsuarioSistema = function(e) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            const nome = document.getElementById('cad-usr-nome')?.value.trim();
            const cargo = document.getElementById('cad-usr-cargo')?.value.trim();
            const papel = document.getElementById('cad-usr-papel')?.value || 'orientador';

            if (!nome || !cargo) {
                alert('Preencha o nome e o cargo do usuário.');
                return false;
            }

            let turmasPermitidas = 'todas';
            if (papel === 'orientador') {
                const chks = document.querySelectorAll('input[name="turma_permitida_chk"]:checked');
                turmasPermitidas = Array.from(chks).map(c => c.value);
                if (turmasPermitidas.length === 0) {
                    alert('Por favor, selecione pelo menos uma turma permitida para este orientador.');
                    return false;
                }
            }

            const usuarios = window.obterListaUsuariosSistema ? window.obterListaUsuariosSistema() : [];
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
            if (typeof window.salvarListaUsuariosSistema === 'function') {
                window.salvarListaUsuariosSistema(usuarios);
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('usuarios_sistema').insert([novoUsr]).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            document.getElementById('form-cad-usuario')?.reset();
            const previewCad = document.getElementById('cad-usr-foto-preview');
            if (previewCad) previewCad.src = `https://ui-avatars.com/api/?name=User&background=FF8A4C&color=fff`;

            window.renderizarListaUsuariosCadastradosPainel();
            window.renderizarCheckboxesTurmasPermitidas();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Usuário '${nome}' cadastrado com sucesso!`);
            return false;
        };

        window.abrirModalEditarUsuarioSistema = function(usuarioId) {
            const usuarios = window.obterListaUsuariosSistema ? window.obterListaUsuariosSistema() : [];
            const usr = usuarios.find(u => u.id === usuarioId);
            if (!usr) return;

            window._tempEditUsuarioFotoBase64 = null;
            const preview = document.getElementById('edit-usr-foto-preview');
            if (preview) {
                preview.src = usr.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usr.nome)}&background=FF8A4C&color=fff`;
            }

            const elId = document.getElementById('edit-usr-id');
            const elNome = document.getElementById('edit-usr-nome');
            const elCargo = document.getElementById('edit-usr-cargo');
            if (elId) elId.value = usr.id;
            if (elNome) elNome.value = usr.nome;
            if (elCargo) elCargo.value = usr.cargo;
            
            const infoUsr = window.obterPermissoesESenhaUsuario ? window.obterPermissoesESenhaUsuario(usr) : { turmas: usr.turmas_permitidas || 'todas', senha: '' };
            const senhaField = document.getElementById('edit-usr-senha');
            if (senhaField) {
                senhaField.value = infoUsr.senha || '';
            }

            const selPapel = document.getElementById('edit-usr-papel');
            if (selPapel) {
                selPapel.value = usr.papel || 'orientador';
            }

            window.alternarOpcoesTurmasEdicaoForm();

            // Preencher checkboxes de turmas permitidas na edição
            const chkContainer = document.getElementById('checkboxes-turmas-permitidas-edit');
            if (chkContainer) {
                const permitidas = Array.isArray(infoUsr.turmas) ? infoUsr.turmas : [];
                if (!window.db) window.db = { turmas: [] };
                if (!window.db.turmas || window.db.turmas.length === 0) {
                    try {
                        const raw = localStorage.getItem('rodin_turmas');
                        if (raw) window.db.turmas = JSON.parse(raw);
                    } catch(e){}
                }
                const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(window.db.turmas || []) : (window.db.turmas || []);
                
                chkContainer.innerHTML = turmasOrdenadas.map(t => {
                    const isChecked = infoUsr.turmas === 'todas' || permitidas.some(p => String(p).toLowerCase().trim() === String(t.nome).toLowerCase().trim());
                    return `
                        <label style="font-size:12px; color:var(--rodin-graphite); font-weight:700; display:flex; align-items:center; gap:8px; cursor:pointer; background:#F8FAFC; padding:6px 10px; border-radius:8px; border:1px solid var(--rodin-line);">
                            <input type="checkbox" name="turma_permitida_edit_chk" value="${t.nome}" ${isChecked ? 'checked' : ''} style="width:16px; height:16px; accent-color:var(--rodin-orange);">
                            <span>${t.nome}</span>
                        </label>
                    `;
                }).join('');
            }

            const modal = document.getElementById('modal-editar-usuario-sistema');
            if (modal) modal.style.display = 'flex';
        };

        window.fecharModalEditarUsuarioSistema = function() {
            const modal = document.getElementById('modal-editar-usuario-sistema');
            if (modal) modal.style.display = 'none';
        };

        window.alternarOpcoesTurmasEdicaoForm = function() {
            const papel = document.getElementById('edit-usr-papel')?.value;
            const box = document.getElementById('box-turmas-permitidas-edit-form');
            if (box) {
                box.style.display = papel === 'diretor' ? 'none' : 'block';
            }
        };

        window.salvarEdicaoUsuarioSistema = function(e) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            const usuarioId = document.getElementById('edit-usr-id').value;
            const nome = document.getElementById('edit-usr-nome').value.trim();
            const cargo = document.getElementById('edit-usr-cargo').value.trim();
            const papel = document.getElementById('edit-usr-papel').value;

            if (!usuarioId || !nome || !cargo) return false;

            const usuarios = window.obterListaUsuariosSistema ? window.obterListaUsuariosSistema() : [];
            const index = usuarios.findIndex(u => u.id === usuarioId);
            if (index === -1) return false;

            let turmasPermitidas = 'todas';
            if (papel === 'orientador') {
                const chks = document.querySelectorAll('input[name="turma_permitida_edit_chk"]:checked');
                turmasPermitidas = Array.from(chks).map(c => c.value);
                if (turmasPermitidas.length === 0) {
                    alert('Selecione pelo menos uma turma permitida para o orientador.');
                    return false;
                }
            }

            const senhaVal = document.getElementById('edit-usr-senha')?.value.trim() || '';

            usuarios[index].nome = nome;
            usuarios[index].cargo = cargo;
            usuarios[index].papel = papel;
            usuarios[index].turmas_permitidas = window.empacotarPermissoesESenhaUsuario ? window.empacotarPermissoesESenhaUsuario(turmasPermitidas, senhaVal) : turmasPermitidas;

            if (window._tempEditUsuarioFotoBase64) {
                usuarios[index].foto = window._tempEditUsuarioFotoBase64;
            } else {
                const preview = document.getElementById('edit-usr-foto-preview');
                if (preview && preview.src) {
                    usuarios[index].foto = preview.src;
                }
            }
            window._tempEditUsuarioFotoBase64 = null;

            if (typeof window.salvarListaUsuariosSistema === 'function') {
                window.salvarListaUsuariosSistema(usuarios);
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('usuarios_sistema').upsert([usuarios[index]]).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            window.fecharModalEditarUsuarioSistema();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Perfil de '${nome}' atualizado com sucesso!`);
            window.renderizarListaUsuariosCadastradosPainel();
            return false;
        };

        window.excluirUsuarioSistema = async function(usuarioId) {
            if (usuarioId === 'usr_diretor') {
                alert("O usuário da Direção Geral não pode ser excluído.");
                return;
            }
            let usuarios = window.obterListaUsuariosSistema ? window.obterListaUsuariosSistema() : [];
            const usr = usuarios.find(u => u.id === usuarioId);
            if (!usr) return;

            if (confirm(`Tem certeza que deseja excluir o acesso de '${usr.nome}'?`)) {
                usuarios = usuarios.filter(u => u.id !== usuarioId);
                if (typeof window.salvarListaUsuariosSistema === 'function') {
                    window.salvarListaUsuariosSistema(usuarios);
                }

                const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
                if (sbClient && typeof sbClient.from === 'function') {
                    try {
                        await sbClient.from('usuarios_sistema').delete().eq('id', usuarioId);
                    } catch(e){
                        console.warn("Erro ao excluir usuário no Supabase:", e);
                    }
                }

                if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Usuário '${usr.nome}' removido com sucesso.`);
                window.renderizarListaUsuariosCadastradosPainel();
            }
        };

        window.previewEditUsuarioFoto = function(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('edit-usr-foto-preview');
                    if (preview) preview.src = e.target.result;
                    window._tempEditUsuarioFotoBase64 = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        };

        window.previewCadUsuarioFoto = function(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('cad-usr-foto-preview');
                    if (preview) preview.src = e.target.result;
                    window._tempCadUsuarioFotoBase64 = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        };

        window.atualizarDisciplinasPorEtapa = function() {
            const selDisc = document.getElementById('cad-prof-disciplina');
            if (!selDisc) return;
            const dbRef = window.db || {};
            const lista = dbRef.disciplinas || [];
            selDisc.innerHTML = lista.length > 0 ? 
                lista.map(d => {
                    const id = typeof d === 'string' ? d : d.id;
                    const nome = typeof d === 'string' ? d : (d.nome || d.id);
                    return `<option value="${nome}">${nome}</option>`;
                }).join('') : 
                '<option value="">Nenhuma disciplina no banco</option>';
        };

        // 1. TURMAS
        window.cadastrarTurma = function(e) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            const anoEl = document.getElementById('cad-turma-ano');
            const letraEl = document.getElementById('cad-turma-letra');

            const ano = anoEl ? anoEl.value : '6º Ano';
            const letra = letraEl ? letraEl.value : 'A';
            const nomeTurma = letra === 'Única' ? ano : `${ano} ${letra}`;

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.turmas) window.db.turmas = [];

            const jaExiste = window.db.turmas.some(t => t.nome && t.nome.toLowerCase().trim() === nomeTurma.toLowerCase().trim());
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

            window.db.turmas.push(novaTurma);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_turmas', window.db.turmas);
            } else {
                localStorage.setItem('rodin_turmas', JSON.stringify(window.db.turmas));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('turmas').insert([{
                        id: novaTurma.id,
                        nome: novaTurma.nome,
                        etapa: novaTurma.etapa,
                        slug: novaTurma.slug,
                        config_mapa: novaTurma.config_mapa
                    }]).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            const formEl = document.getElementById('form-cad-turma');
            if (formEl) formEl.reset();

            window.renderizarListaTurmasCadastradas();
            if (typeof renderizarComponentesCadastros === 'function') renderizarComponentesCadastros();
            if (typeof window.renderizarCheckboxesTurmasPermitidas === 'function') window.renderizarCheckboxesTurmasPermitidas();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Turma '${nomeTurma}' cadastrada com sucesso!`);
            return false;
        };

        window.renderizarListaTurmasCadastradas = function() {
            const container = document.getElementById('lista-turmas-cadastradas');
            if (!container) return;

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.turmas) window.db.turmas = [];

            const turmasOrdenadas = window.ordenarTurmas ? window.ordenarTurmas(window.db.turmas) : window.db.turmas;

            if (turmasOrdenadas.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhuma turma cadastrada.</div>`;
                return;
            }

            container.innerHTML = turmasOrdenadas.map(t => {
                const qtdAlunos = (window.db.alunos || []).filter(a => a.turma_id === t.id).length;
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
                        <button class="btn-reset-pink" onclick="window.excluirTurma('${t.id}')" title="Excluir Turma" style="padding:6px 12px; font-size:11px;">
                            <i class="ph-bold ph-trash"></i> Excluir
                        </button>
                    </div>
                `;
            }).join('');
        };

        window.excluirTurma = function(turmaId) {
            if (!window.db) return;
            if (!window.db.turmas) window.db.turmas = [];
            if (window.db.turmas.length <= 1) {
                if (typeof mostrarSnackbar === 'function') mostrarSnackbar("Não é possível excluir a única turma cadastrada!");
                alert("Não é possível excluir a única turma cadastrada!");
                return;
            }
            const turma = window.db.turmas.find(t => t.id === turmaId);
            window.db.turmas = window.db.turmas.filter(t => t.id !== turmaId);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_turmas', window.db.turmas);
            } else {
                localStorage.setItem('rodin_turmas', JSON.stringify(window.db.turmas));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('turmas').delete().eq('id', turmaId).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            window.renderizarListaTurmasCadastradas();
            if (typeof renderizarComponentesCadastros === 'function') renderizarComponentesCadastros();
            if (typeof window.renderizarCheckboxesTurmasPermitidas === 'function') window.renderizarCheckboxesTurmasPermitidas();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Turma '${turma ? turma.nome : ''}' excluída!`);
        };

        // 2. ALUNOS
        window.cadastrarAluno = function(e) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            const nomeEl = document.getElementById('cad-aluno-nome');
            const turmaEl = document.getElementById('cad-aluno-turma');
            const condicaoEl = document.getElementById('cad-aluno-condicao');

            const nome = nomeEl ? nomeEl.value.trim() : '';
            const turmaId = turmaEl ? turmaEl.value : '';
            const condicao = condicaoEl ? condicaoEl.value : 'Nenhuma';

        window.processarUploadFotoAluno = function(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            window._fotoAlunoFileTemp = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('student-avatar-preview');
                const placeholder = document.getElementById('student-upload-placeholder');
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                if (placeholder) placeholder.style.display = 'none';
                window._fotoAlunoPreviewTemp = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        window.processarUploadFotoEditAluno = function(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            window._fotoAlunoEditFileTemp = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('edit-aluno-avatar-preview');
                if (preview) preview.src = e.target.result;
                window._fotoAlunoEditPreviewTemp = e.target.result;
            };
            reader.readAsDataURL(file);
        };

        // 2. ALUNOS
        window.cadastrarAluno = async function(e) {
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

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.alunos) window.db.alunos = [];

            let fotoUrlFinal = window._fotoAlunoPreviewTemp || `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=FF8A4C&color=fff`;

            // Tentar upload para o Supabase Storage se houver arquivo selecionado
            if (window._fotoAlunoFileTemp && typeof window.fazerUploadFotoSupabaseStorage === 'function') {
                const storageUrl = await window.fazerUploadFotoSupabaseStorage(window._fotoAlunoFileTemp, '6anoa');
                if (storageUrl) {
                    fotoUrlFinal = storageUrl;
                }
            }

            const novoAluno = {
                id: `aluno_${Date.now()}`,
                nome: nome,
                turma_id: turmaId,
                condicao: condicao,
                avatar: fotoUrlFinal,
                foto: fotoUrlFinal
            };

            window.db.alunos.push(novoAluno);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_alunos', window.db.alunos);
            } else {
                localStorage.setItem('rodin_alunos', JSON.stringify(window.db.alunos));
            }
            window._fotoAlunoPreviewTemp = null;
            window._fotoAlunoFileTemp = null;

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    await sbClient.from('alunos').insert([{
                        id: novoAluno.id,
                        nome: novoAluno.nome,
                        turma_id: novoAluno.turma_id,
                        condicao: novoAluno.condicao,
                        avatar: novoAluno.avatar
                    }]);
                } catch(err){
                    console.warn("Aviso ao salvar aluno no Supabase:", err);
                }
            }

            const formEl = document.getElementById('form-cad-aluno');
            if (formEl) formEl.reset();

            const preview = document.getElementById('student-avatar-preview');
            const placeholder = document.getElementById('student-upload-placeholder');
            if (preview) preview.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';

            window.renderizarListaAlunosCadastrados();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Aluno(a) '${nome}' matriculado(a) com sucesso!`);
            return false;
        };

        window.renderizarListaAlunosCadastrados = function() {
            const container = document.getElementById('lista-alunos-cadastrados');
            if (!container) return;

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.alunos) window.db.alunos = [];
            const filtroTurmaEl = document.getElementById('cad-filtro-turma');
            const filtro = filtroTurmaEl ? filtroTurmaEl.value : 'todas';

            let lista = window.db.alunos;
            if (filtro && filtro !== 'todas') {
                lista = lista.filter(a => a.turma_id === filtro);
            }

            if (lista.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhum aluno encontrado.</div>`;
                return;
            }

            container.innerHTML = lista.map(a => {
                const turma = (window.db.turmas || []).find(t => t.id === a.turma_id);
                const nomeTurma = turma ? turma.nome : 'Sem Turma';
                const rawFoto = a.avatar || a.foto || '';
                const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.nome)}&background=FF8A4C&color=fff`;
                const foto = rawFoto || fallbackAvatar;

                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:10px 14px; border-radius:12px; border:1px solid var(--rodin-line);">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <img src="${foto}" onerror="this.onerror=null; this.src='${fallbackAvatar}';" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid var(--rodin-orange);">
                            <div>
                                <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${a.nome}</strong>
                                <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">
                                    Turma: ${nomeTurma} ${a.condicao && a.condicao !== 'Nenhuma' ? `• <span style="color:#C2410C; font-weight:800;">${a.condicao}</span>` : ''}
                                </div>
                            </div>
                        </div>
                        <button class="btn-reset-pink" onclick="window.excluirAluno('${a.id}')" style="padding:6px 12px; font-size:11px; cursor:pointer;">
                            <i class="ph-bold ph-trash"></i> Excluir
                        </button>
                    </div>
                `;
            }).join('');
        };

        window.excluirAluno = function(alunoId) {
            if (!window.db) return;
            if (!window.db.alunos) window.db.alunos = [];
            const aluno = window.db.alunos.find(a => a.id === alunoId);
            window.db.alunos = window.db.alunos.filter(a => a.id !== alunoId);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_alunos', window.db.alunos);
            } else {
                localStorage.setItem('rodin_alunos', JSON.stringify(window.db.alunos));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('alunos').delete().eq('id', alunoId).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            window.renderizarListaAlunosCadastrados();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Aluno '${aluno ? aluno.nome : ''}' excluído!`);
        };

        // 3. PROFESSORES
        window.cadastrarProfessor = function(e) {
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

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.professores) window.db.professores = [];

            const novoProf = {
                id: `prof_${Date.now()}`,
                nome: nome,
                etapa: etapa,
                disciplina: disciplina,
                foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=4F46E5&color=fff`
            };

            window.db.professores.push(novoProf);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_professores', window.db.professores);
            } else {
                localStorage.setItem('rodin_professores', JSON.stringify(window.db.professores));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('professores').insert([{
                        id: novoProf.id,
                        nome: novoProf.nome,
                        etapa: novoProf.etapa,
                        disciplina: novoProf.disciplina
                    }]).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            const formEl = document.getElementById('form-cad-professor');
            if (formEl) formEl.reset();

            window.renderizarListaProfessoresCadastrados();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Professor(a) '${nome}' cadastrado(a)!`);
            return false;
        };

        window.renderizarListaProfessoresCadastrados = function() {
            const container = document.getElementById('lista-professores-cadastrados');
            if (!container) return;

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.professores) window.db.professores = [];

            if (window.db.professores.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhum professor cadastrado.</div>`;
                return;
            }

            container.innerHTML = window.db.professores.map(p => {
                const foto = p.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}&background=4F46E5&color=fff`;
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:10px 14px; border-radius:12px; border:1px solid var(--rodin-line);">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <img src="${foto}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #4F46E5;">
                            <div>
                                <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${p.nome}</strong>
                                <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${p.disciplina || 'Geral'} • ${p.etapa || 'Todas as Etapas'}</div>
                            </div>
                        </div>
                        <button class="btn-reset-pink" onclick="window.excluirProfessor('${p.id}')" style="padding:6px 12px; font-size:11px;">
                            <i class="ph-bold ph-trash"></i> Excluir
                        </button>
                    </div>
                `;
            }).join('');
        };

        window.excluirProfessor = function(profId) {
            if (!window.db) return;
            if (!window.db.professores) window.db.professores = [];
            const prof = window.db.professores.find(p => p.id === profId);
            window.db.professores = window.db.professores.filter(p => p.id !== profId);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_professores', window.db.professores);
            } else {
                localStorage.setItem('rodin_professores', JSON.stringify(window.db.professores));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('professores').delete().eq('id', profId).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            window.renderizarListaProfessoresCadastrados();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Professor '${prof ? prof.nome : ''}' excluído!`);
        };

        // 4. DISCIPLINAS
        window.cadastrarDisciplina = function(e) {
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            const nomeEl = document.getElementById('cad-disc-nome');
            const etapaEl = document.getElementById('cad-disc-etapa');

            const nome = nomeEl ? nomeEl.value.trim() : '';
            const etapa = etapaEl ? etapaEl.value : 'Todas as Etapas';

            if (!nome) {
                alert("Preencha o nome da disciplina.");
                return false;
            }

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.disciplinas) window.db.disciplinas = [];

            const novaDisc = {
                id: `disc_${Date.now()}`,
                nome: nome,
                etapa: etapa
            };

            window.db.disciplinas.push(novaDisc);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_disciplinas', window.db.disciplinas);
            } else {
                localStorage.setItem('rodin_disciplinas', JSON.stringify(window.db.disciplinas));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('disciplinas').insert([{
                        id: novaDisc.id,
                        nome: novaDisc.nome,
                        etapa: novaDisc.etapa
                    }]).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            const formEl = document.getElementById('form-cad-disciplina');
            if (formEl) formEl.reset();

            window.renderizarListaDisciplinasCadastradas();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Disciplina '${nome}' cadastrada!`);
            return false;
        };

        window.renderizarListaDisciplinasCadastradas = function() {
            const container = document.getElementById('lista-disciplinas-cadastradas');
            if (!container) return;

            if (!window.db) window.db = { turmas: [], alunos: [], professores: [], disciplinas: [], usuarios_sistema: [] };
            if (!window.db.disciplinas) window.db.disciplinas = [];

            if (window.db.disciplinas.length === 0) {
                container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--rodin-cool-gray); font-size:13px;">Nenhuma disciplina cadastrada.</div>`;
                return;
            }

            container.innerHTML = window.db.disciplinas.map(d => {
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:10px 14px; border-radius:12px; border:1px solid var(--rodin-line);">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <i class="ph-bold ph-book" style="color:var(--rodin-orange); font-size:20px;"></i>
                            <div>
                                <strong style="font-size:13px; color:var(--rodin-graphite); display:block;">${d.nome}</strong>
                                <div style="font-size:11px; color:var(--rodin-cool-gray); font-weight:600;">${d.etapa}</div>
                            </div>
                        </div>
                        <button class="btn-reset-pink" onclick="window.excluirDisciplina('${d.id}')" style="padding:6px 12px; font-size:11px;">
                            <i class="ph-bold ph-trash"></i> Excluir
                        </button>
                    </div>
                `;
            }).join('');
        };

        window.excluirDisciplina = function(discId) {
            if (!window.db) return;
            if (!window.db.disciplinas) window.db.disciplinas = [];
            const disc = window.db.disciplinas.find(d => d.id === discId);
            window.db.disciplinas = window.db.disciplinas.filter(d => d.id !== discId);
            if (typeof window.safeSetLocalStorage === 'function') {
                window.safeSetLocalStorage('rodin_disciplinas', window.db.disciplinas);
            } else {
                localStorage.setItem('rodin_disciplinas', JSON.stringify(window.db.disciplinas));
            }

            const sbClient = window.obterClienteSupabase ? window.obterClienteSupabase() : window.sb;
            if (sbClient && typeof sbClient.from === 'function') {
                try {
                    sbClient.from('disciplinas').delete().eq('id', discId).then(()=>{}).catch(()=>{});
                } catch(err){}
            }

            window.renderizarListaDisciplinasCadastradas();
            if (typeof mostrarSnackbar === 'function') mostrarSnackbar(`Disciplina '${disc ? disc.nome : ''}' excluída!`);
        };
    