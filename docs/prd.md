# PRD — Portal Rodin com IA v2.0 (Documento Oficial de Requisitos do Produto)
### Versão Atualizada & Consolidada conforme Especificações do Sistema

| Campo | Valor |
|---|---|
| **Produto** | Portal Rodin — Gestão Escolar Inteligente com IA |
| **Versão** | 2.0 (Totalmente Atualizada com Rotas por Turma, Biometria por IP, Kanban de 3 Colunas, Agendamento e Rastreabilidade) |
| **Instituição** | Colégio Rodin |
| **Domínio Previsto** | `sala.colegiorodin.tech` |
| **Stack** | HTML5 + CSS3 (Vanilla + Custom Tokens) + JavaScript (Vanilla com Store Reativo e LocalStorage Cache) + Node.js (Servidor de Rotas Dinâmicas) + Supabase (PostgreSQL + Auth + Storage + RLS) |
| **Data de Atualização** | Julho de 2026 |

---

## 1. Visão Geral do Produto

O **Portal Rodin** é uma plataforma web e tablet de gestão pedagógica e comportamental em tempo real, desenvolvida sob medida para o Colégio Rodin. Seu objetivo é unir **tecnologia preditiva, biometria facial, rastreabilidade pedagógica completa e acolhimento humano** para alunos do Ensino Fundamental (Anos Finais) e Ensino Médio.

### 1.1 Problemas Resolvidos & Inovações

| Problema Tradicional | Solução do Portal Rodin |
|---|---|
| Troca de turma manual e vulnerabilidade em telas de sala | Link individual por turma (`/visao-professor/6-ano-a`) com bloqueio e autenticação facial por IP |
| Falta de controle de horários de aula em tempo real | Troca automática de disciplinas na tela de sala via banco de dados da grade horária + aviso de "Fora do Período de Aulas" |
| Ocorrências dispersas e sem acompanhamento dos 14 dias | Central de Acolhimento com Kanban de 3 colunas, acúmulo de ocorrências no mesmo card e monitoramento inteligente de 14 dias |
| Dificuldade no agendamento e registro de combinados | Coluna de Conversa Agendada com modal de Data/Horário + Registro Obrigatório do Acordo entre Orientador e Aluno |
| Falta de clareza no histórico do aluno | Raio-X do Aluno com diferenciação visual por ícone/cor (vermelho para desvios, azul para sonolência) + nome do professor e timestamp exato |
| Inexistência de apoio a neurodivergências e altas habilidades | Suporte nativo a Superdotação (AH-SD), TDAH, TEA e TOD no perfil, filtros e analytics |

---

## 2. Perfis de Usuário & Níveis de Acesso

| Perfil | Escopo e Funcionalidades |
|---|---|
| **Professor (Sala de Aula)** | Acessa a Visão de Sala da sua turma via link direto (`/visao-professor/:turma-slug`). Visualiza o mapa de carteiras, faz chamada, registra ocorrências rápidas ou detalhadas com áudio. |
| **Orientador Pedagógico** | Gerencia a Central de Acolhimento (Kanban), agenda conversas com data/hora, registra os acordos firmados, analisa históricos de reincidência e acompanha o monitoramento de 14 dias. |
| **Coordenação / Diretoria** | Visualiza o BI Geral com heatmap comportamental, acessa o Raio-X do Aluno, gera relatórios diários em PDF e gerencia os setups de turma e cadastros. |
| **Monitoria / Inspetoria** | Acompanha o Live Feed dos corredores em tempo real e gerencia o retorno de alunos da saída de sala. |

---

## 3. Módulos do Sistema e Regras de Negócio

### 3.1 — Visão de Sala do Professor (`/visao-professor/:turma-slug`)

> **Propósito:** Interface exclusiva para uso em tablets/telas fixas das salas de aula.

#### Regras de Negócio & Funcionalidades:
1. **Links Diretos por Turma:** Cada turma cadastrada possui seu próprio link direto único (Ex: `sala.colegiorodin.tech/visao-professor/6-ano-a`). Não há opção de trocar de turma clicando no menu para evitar visualizações indevidas por pessoas aleatórias.
2. **Autenticação Facial no 1º Acesso por IP:**
   - Na primeira execução em um novo dispositivo/IP, a aplicação exibe uma tela obrigatória de **Scan Facial Biométrico**.
   - Após o login facial bem-sucedido, o estado fica salvo no cache/localStorage do aparelho. Em acessos futuros, a tela de sala carrega normalmente, mantendo o botão de bloqueio de segurança rápido.
3. **Gestão Dinâmica de Horários e Grade:**
   - Fora do período escolar (ex: após as 14h ou nos finais de semana), o topo exibe a mensagem **"Fora do período de aulas"** ou **"Sem aulas no momento"**.
   - Durante o período de aulas, a matéria atual, o nome do professor e o horário são puxados **diretamente da grade horária no banco de dados** (eliminando nomes estáticos).
4. **Design Visual Limpo & Tipografia Otimizada:**
   - A matéria e o nome do professor aparecem em destaque ampliado (idêntico ao padrão "6º Ano A").
   - A matéria é exibida exclusivamente no título da aula para evitar duplicidade. Ícones desnecessários (como o livrinho) foram removidos.
5. **Mapa de Carteiras Interativo & Lançamento de Ocorrências:**
   - Permite lançamento com 1 clique para motivos comuns (Sonolento, Celular, Conversa) ou registro detalhado com gravador de áudio integrado.

---

### 3.2 — Central de Acolhimento e Intervenção (`central-acolhimento.html`)

> **Propósito:** Pipeline de acolhimento e monitoramento comportamental em 3 colunas de largura total (sem pontuação de pontos).

#### Estrutura do Kanban em 3 Colunas:

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
│  📬 CAIXA DE ENTRADA    │  📅 CONVERSA AGENDADA   │  🔍 EM ANÁLISE (14D)    │
│                         │                         │                         │
│ • Ocorrências do Prof.  │ • Data e Hora Agendada  │ • Acordo Registrado     │
│ • Acúmulo de Registros  │ • Pauta das Ocorrências │ • Contador (14d rest.)  │
│ • Card Limpo sem Botões │ • Botão de Conclusão    │ • Auto-resolução / Reinc│
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

#### Funcionalidades & Regras Detalhadas:

1. **📬 Coluna 1: Caixa de Entrada**
   - Recebe em tempo real as ocorrências registradas pelos professores na sala de aula.
   - **Acúmulo de Ocorrências:** Se um aluno cometer mais de uma ocorrência no mesmo dia ou período antes do atendimento, **todas as ocorrências são acumuladas e listadas dentro do mesmo card**, exibindo: tipo da ocorrência, nome do professor (ex: `Prof. Marcos Antônio (História)`) e horário exato. O orientador resolve todas de uma vez em um único atendimento.
   - **Card Limpo:** Card limpo e direto, sem botões de "Iniciar conversa" ou instruções redundantes, mantendo a experiência fluida via arraste (drag and drop).

2. **📅 Coluna 2: Conversa Agendada**
   - Ao arrastar um card da Caixa de Entrada para esta coluna, o modal `#modal-agendar-conversa` é acionado automaticamente.
   - O orientador informa a **Data da Conversa** e o **Horário**.
   - No card, é exibido o destaque visual: `📅 Conversa Agendada para: DD/MM/YYYY às HH:MM` juntamente com a pauta das ocorrências acumuladas.
   - Apresenta o botão **"Concluir Conversa & Registrar Acordo"**.

3. **🔍 Coluna 3: Em Análise (14 Dias) & Obrigatoriedade do Acordo**
   - Ao enviar o card para esta coluna (via arraste ou botão), o modal `#modal-anotar-acao-orientador` é ativado com preenchimento **OBRIGATÓRIO** do campo:
     - *"O que foi conversado e acordado entre o orientador e o aluno?"*
   - O card passa a exibir a anotação do acordo, a data/horário de realização da conversa e o badge de monitoramento `14d restantes`.

4. **Motor de Monitoramento Preditivo de 14 Dias:**
   - **Resolução Automática:** Se o aluno permanecer 14 dias consecutivos sem novas ocorrências, o sistema conclui o caso e remove o card do Kanban.
   - **Retorno por Reincidência:** Se o aluno cometer uma **nova ocorrência dentro dos 14 dias**, o card **retorna automaticamente para a Caixa de Entrada** exibindo a nova ocorrência + o aviso de reincidência + a **Ação Anterior Registrada pelo Orientador**, fornecendo todo o contexto para a nova intervenção.

---

### 3.3 — Raio-X do Aluno (`raio-x-aluno.html`)

> **Propósito:** Prontuário individual 360º com inteligência pedagógica e visual refinado.

#### Funcionalidades:
1. **Condições Educacionais & Neurodivergências:**
   - Filtros avançados e badges para **Superdotação / Altas Habilidades (AH-SD)**, **TOD**, **TDAH**, **TEA** ou Nenhuma.
2. **Diferenciação Visual das Ocorrências:**
   - 🔴 **Vermelho + Ícone de Alerta (`ph-warning-circle`):** Aplicado estritamente para **Desvios de Conduta**.
   - 🔵 **Azul + Ícone de Lua (`ph-moon`):** Aplicado estritamente para **Sonolência & Dormindo**.
   - Barras de progresso comparativas com o histórico da turma respeitando as cores institucionais.
3. **Rastreabilidade Pedagógica Completa:**
   - **Timeline Pedagógica:** Cada evento detalha a data, o horário exato (`DD/MM/YYYY às HH:MM`) e o **Nome do Professor** autor do registro (ex: `Prof. Marcos Antônio (História)`).
   - **Registros de Ações do Orientador (`#rx-intervencoes-list`):** Exibe a lista histórica de todos os acordos firmados pelo orientador pós-conversa, com a data/hora exata da reunião e identificação da orientação (`Mariana Medeiros - Orientadora Pedagógica`).

---

### 3.4 — Setup de Turma: Grade Escolar & Mapa de Sala (`setup-turma.html`)

> **Propósito:** Construtor interativo para gerenciamento espacial e temporal das turmas.

#### Funcionalidades:
- **Construtor da Grade Escolar:** Drag & Drop de disciplinas em grade (1º ao 8º tempo x Segunda a Sexta), suporte a trocas por permuta (swap) e validação de disponibilidade de professores.
- **Construtor do Mapa de Sala:** Drag & Drop de carteiras com dimensões ajustáveis (até 10x10), auto-acomodação de alunos sem carteira e alertas para alunos com condições especiais nas primeiras fileiras.
- **Modais de Confirmação:** Validações de segurança para limpar grade ou sala.

---

### 3.5 — BI Geral & Analytics (`analise-geral.html`)

> **Propósito:** Dashboard estratégico para coordenação e diretoria.

#### Funcionalidades:
- Stat cards com métricas agregadas de ocorrências e tendências.
- Heatmap de sala em tempo real para identificação de zonas de calor comportamentais.
- Filtros por período (presets e calendário customizado) e comparativos entre turmas.

---

### 3.6 — Cadastros (`cadastros.html`) & Relatório Diário (`relatorio-diario.html`)

- **CRUD Completo:** Matrícula de Alunos (com foto e condições), Gestão de Professores (vínculo de disciplinas/turmas e cadastro de biometria facial) e Gestão de Turmas.
- **Relatórios PDF:** Geração de PDF do relatório diário em formato A4 padronizado via `html2pdf.js` e CSS print.

---

## 4. Arquitetura Técnica & Banco de Dados (Supabase + Local Storage Cache)

### 4.1 Principais Entidades e Atributos de Banco de Dados

- **`turmas`**: `id`, `nome`, `etapa`, `slug` (`6-ano-a`), `config_mapa`, `config_grade`.
- **`alunos`**: `id`, `nome`, `turma_id`, `condicao` (`Superdotação`, `TDAH`, `TEA`, `TOD`, `Nenhuma`), `avatar`.
- **`professores`**: `id`, `user_id`, `nome`, `etapa`, `biometria_facial_status`.
- **`disciplinas`**: `id`, `nome`, `cor`.
- **`professores_turmas_disciplinas`**: Junction table relacionando docente, turma e matéria lecionada.
- **`grade_horaria_slots`**: `id`, `turma_id`, `disciplina_id`, `professor_id`, `posicao_x` (dia), `posicao_y` (horário).
- **`mapa_sala_slots`**: `id`, `turma_id`, `aluno_id`, `posicao_x`, `posicao_y`.
- **`ocorrencias_alunos`**: `id`, `aluno_id`, `disciplina_id`, `criado_por`, `professor_nome`, `tipo`, `descricao`, `audio_url`, `created_at`.
- **`kanban_estados` (LocalStorage/Supabase)**: `aluno_id`, `coluna` (`entrada` | `agendada` | `analise14` | `concluido`), `data_conversa`, `horario_conversa`, `data_analise`.
- **`intervencoes_orientador` (LocalStorage/Supabase)**: `id`, `aluno_id`, `coluna`, `anotacao`, `orientador_nome`, `orientador_cargo`, `created_at`.

---

## 5. Mapeamento de Rotas do Servidor HTTP (`server.js`)

| Rota HTTP | Arquivo / Handler | Descrição |
|---|---|---|
| `GET /` | `index.html` | Redirecionamento para o Dashboard de Gestão |
| `GET /visao-professor/:turmaSlug` | `visao-professor.html` | Rota direta da turma (Ex: `/visao-professor/6-ano-a`) |
| `GET /central-acolhimento.html` | `central-acolhimento.html` | Central de Acolhimento (Kanban em 3 Colunas) |
| `GET /raio-x-aluno.html` | `raio-x-aluno.html` | Prontuário 360º do Aluno |
| `GET /analise-geral.html` | `analise-geral.html` | BI Geral & Heatmap |
| `GET /setup-turma.html` | `setup-turma.html` | Construtor de Grade e Mapa de Sala |
| `GET /cadastros.html` | `cadastros.html` | Gestão de Alunos, Professores e Turmas |
| `GET /relatorio-diario.html` | `relatorio-diario.html` | Emissão de PDF e Relatório Operacional |

---

## 6. Métricas de Sucesso & LGPD

- **Conformidade LGPD (Lei 13.709/2018):** Proteção estrita de dados de saúde/condições neurodivergentes e imagens faciais biométricas. As informações de biometria são armazenadas localmente no hash do dispositivo/dispositivo autenticado.
- **Eficiência Operacional:** Redução do tempo de agendamento e registro de combinados pedagógicos para menos de 10 segundos por aluno.
- **Rastreabilidade 100% Digital:** Eliminação total do uso de papel e cadernos físicos para ocorrências no Colégio Rodin.

---
*Documento aprovado e em execução na versão 2.0 do Portal Rodin com IA.*
